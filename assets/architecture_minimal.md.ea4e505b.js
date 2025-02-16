import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1a91c06a.js";const g=JSON.parse('{"title":"Minimal","description":"","frontmatter":{"id":"minimal","title":"Minimal","head":[["meta",{"property":"og:title","content":"Minimal | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/minimal.md","filePath":"architecture/minimal.md","lastUpdated":1739729557000}'),p={name:"architecture/minimal.md"},o=l(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>As mentioned before, Lyfebloc Network is a set of different modules, all connected to each other.<br> The <strong>Blockchain</strong> is connected to the <strong>State</strong>, or for example, <strong>Synchronization</strong>, which pipes new blocks into the <strong>Blockchain</strong>.</p><p><strong>Minimal</strong> is the cornerstone for these inter-connected modules. <br> It acts as a central hub for all the services that run on Lyfebloc Network.</p><h2 id="startup-magic" tabindex="-1">Startup Magic <a class="header-anchor" href="#startup-magic" aria-label="Permalink to &quot;Startup Magic&quot;">​</a></h2><p>Among other things, Minimal is responsible for:</p><ul><li>Setting up data directories</li><li>Creating a keystore for libp2p communication</li><li>Creating storage</li><li>Setting up consensus</li><li>Setting up the blockchain object with GRPC, JSON RPC, and Synchronization</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NewServer</span><span style="color:#E1E4E8;">(logger hclog.Logger, config </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Config) (</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Server, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	m </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Server{</span></span>
<span class="line"><span style="color:#E1E4E8;">		logger: logger,</span></span>
<span class="line"><span style="color:#E1E4E8;">		config: config,</span></span>
<span class="line"><span style="color:#E1E4E8;">		chain:      config.Chain,</span></span>
<span class="line"><span style="color:#E1E4E8;">		grpcServer: grpc.</span><span style="color:#79B8FF;">NewServer</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	m.logger.</span><span style="color:#79B8FF;">Info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Data dir&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">, config.DataDir)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Generate all the paths in the dataDir</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">setupDataDir</span><span style="color:#E1E4E8;">(config.DataDir, dirPaths); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;failed to create data directories: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Get the private key for the node</span></span>
<span class="line"><span style="color:#E1E4E8;">	keystore </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> keystore.</span><span style="color:#79B8FF;">NewLocalKeystore</span><span style="color:#E1E4E8;">(filepath.</span><span style="color:#79B8FF;">Join</span><span style="color:#E1E4E8;">(config.DataDir, </span><span style="color:#9ECBFF;">&quot;keystore&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">	key, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> keystore.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;failed to read private key: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	storage, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> leveldb.</span><span style="color:#79B8FF;">NewLevelDBStorage</span><span style="color:#E1E4E8;">(filepath.</span><span style="color:#79B8FF;">Join</span><span style="color:#E1E4E8;">(config.DataDir, </span><span style="color:#9ECBFF;">&quot;blockchain&quot;</span><span style="color:#E1E4E8;">), logger)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.storage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> storage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup consensus</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#79B8FF;">setupConsensus</span><span style="color:#E1E4E8;">(); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	stateStorage, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> itrie.</span><span style="color:#79B8FF;">NewLevelDBStorage</span><span style="color:#E1E4E8;">(filepath.</span><span style="color:#79B8FF;">Join</span><span style="color:#E1E4E8;">(m.config.DataDir, </span><span style="color:#9ECBFF;">&quot;trie&quot;</span><span style="color:#E1E4E8;">), logger)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	st </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> itrie.</span><span style="color:#79B8FF;">NewState</span><span style="color:#E1E4E8;">(stateStorage)</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> st</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	executor </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> state.</span><span style="color:#79B8FF;">NewExecutor</span><span style="color:#E1E4E8;">(config.Chain.Params, st)</span></span>
<span class="line"><span style="color:#E1E4E8;">	executor.</span><span style="color:#79B8FF;">SetRuntime</span><span style="color:#E1E4E8;">(precompiled.</span><span style="color:#79B8FF;">NewPrecompiled</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	executor.</span><span style="color:#79B8FF;">SetRuntime</span><span style="color:#E1E4E8;">(evm.</span><span style="color:#79B8FF;">NewEVM</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Blockchain object</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.blockchain, err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> blockchain.</span><span style="color:#79B8FF;">NewBlockchain</span><span style="color:#E1E4E8;">(logger, storage, config.Chain, m.consensus, executor)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	executor.GetHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m.blockchain.GetHashHelper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup sealer</span></span>
<span class="line"><span style="color:#E1E4E8;">	sealerConfig </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">sealer.Config{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Coinbase: crypto.</span><span style="color:#79B8FF;">PubKeyToAddress</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">m.key.PublicKey),</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.Sealer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sealer.</span><span style="color:#79B8FF;">NewSealer</span><span style="color:#E1E4E8;">(sealerConfig, logger, m.blockchain, m.consensus, executor)</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.Sealer.</span><span style="color:#79B8FF;">SetEnabled</span><span style="color:#E1E4E8;">(m.config.Seal)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup the libp2p server</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#79B8FF;">setupLibP2P</span><span style="color:#E1E4E8;">(); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup the GRPC server</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#79B8FF;">setupGRPC</span><span style="color:#E1E4E8;">(); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup jsonrpc</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#79B8FF;">setupJSONRPC</span><span style="color:#E1E4E8;">(); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Setup the syncer protocol</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.syncer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> protocol.</span><span style="color:#79B8FF;">NewSyncer</span><span style="color:#E1E4E8;">(logger, m.blockchain)</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.syncer.</span><span style="color:#79B8FF;">Register</span><span style="color:#E1E4E8;">(m.libp2pServer.</span><span style="color:#79B8FF;">GetGRPCServer</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	m.syncer.</span><span style="color:#79B8FF;">Start</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Register the libp2p GRPC endpoints</span></span>
<span class="line"><span style="color:#E1E4E8;">	proto.</span><span style="color:#79B8FF;">RegisterHandshakeServer</span><span style="color:#E1E4E8;">(m.libp2pServer.</span><span style="color:#79B8FF;">GetGRPCServer</span><span style="color:#E1E4E8;">(), </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">handshakeService{s: m})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	m.libp2pServer.</span><span style="color:#79B8FF;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> m, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NewServer</span><span style="color:#24292E;">(logger hclog.Logger, config </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Config) (</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Server, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	m </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Server{</span></span>
<span class="line"><span style="color:#24292E;">		logger: logger,</span></span>
<span class="line"><span style="color:#24292E;">		config: config,</span></span>
<span class="line"><span style="color:#24292E;">		chain:      config.Chain,</span></span>
<span class="line"><span style="color:#24292E;">		grpcServer: grpc.</span><span style="color:#005CC5;">NewServer</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	m.logger.</span><span style="color:#005CC5;">Info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Data dir&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">, config.DataDir)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Generate all the paths in the dataDir</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">setupDataDir</span><span style="color:#24292E;">(config.DataDir, dirPaths); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;failed to create data directories: </span><span style="color:#005CC5;">%v</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Get the private key for the node</span></span>
<span class="line"><span style="color:#24292E;">	keystore </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> keystore.</span><span style="color:#005CC5;">NewLocalKeystore</span><span style="color:#24292E;">(filepath.</span><span style="color:#005CC5;">Join</span><span style="color:#24292E;">(config.DataDir, </span><span style="color:#032F62;">&quot;keystore&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">	key, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> keystore.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;failed to read private key: </span><span style="color:#005CC5;">%v</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	m.key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	storage, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> leveldb.</span><span style="color:#005CC5;">NewLevelDBStorage</span><span style="color:#24292E;">(filepath.</span><span style="color:#005CC5;">Join</span><span style="color:#24292E;">(config.DataDir, </span><span style="color:#032F62;">&quot;blockchain&quot;</span><span style="color:#24292E;">), logger)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	m.storage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> storage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup consensus</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> m.</span><span style="color:#005CC5;">setupConsensus</span><span style="color:#24292E;">(); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	stateStorage, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> itrie.</span><span style="color:#005CC5;">NewLevelDBStorage</span><span style="color:#24292E;">(filepath.</span><span style="color:#005CC5;">Join</span><span style="color:#24292E;">(m.config.DataDir, </span><span style="color:#032F62;">&quot;trie&quot;</span><span style="color:#24292E;">), logger)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	st </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> itrie.</span><span style="color:#005CC5;">NewState</span><span style="color:#24292E;">(stateStorage)</span></span>
<span class="line"><span style="color:#24292E;">	m.state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> st</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	executor </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> state.</span><span style="color:#005CC5;">NewExecutor</span><span style="color:#24292E;">(config.Chain.Params, st)</span></span>
<span class="line"><span style="color:#24292E;">	executor.</span><span style="color:#005CC5;">SetRuntime</span><span style="color:#24292E;">(precompiled.</span><span style="color:#005CC5;">NewPrecompiled</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	executor.</span><span style="color:#005CC5;">SetRuntime</span><span style="color:#24292E;">(evm.</span><span style="color:#005CC5;">NewEVM</span><span style="color:#24292E;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Blockchain object</span></span>
<span class="line"><span style="color:#24292E;">	m.blockchain, err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> blockchain.</span><span style="color:#005CC5;">NewBlockchain</span><span style="color:#24292E;">(logger, storage, config.Chain, m.consensus, executor)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	executor.GetHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m.blockchain.GetHashHelper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup sealer</span></span>
<span class="line"><span style="color:#24292E;">	sealerConfig </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">sealer.Config{</span></span>
<span class="line"><span style="color:#24292E;">		Coinbase: crypto.</span><span style="color:#005CC5;">PubKeyToAddress</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">m.key.PublicKey),</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	m.Sealer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sealer.</span><span style="color:#005CC5;">NewSealer</span><span style="color:#24292E;">(sealerConfig, logger, m.blockchain, m.consensus, executor)</span></span>
<span class="line"><span style="color:#24292E;">	m.Sealer.</span><span style="color:#005CC5;">SetEnabled</span><span style="color:#24292E;">(m.config.Seal)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup the libp2p server</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> m.</span><span style="color:#005CC5;">setupLibP2P</span><span style="color:#24292E;">(); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup the GRPC server</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> m.</span><span style="color:#005CC5;">setupGRPC</span><span style="color:#24292E;">(); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup jsonrpc</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> m.</span><span style="color:#005CC5;">setupJSONRPC</span><span style="color:#24292E;">(); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Setup the syncer protocol</span></span>
<span class="line"><span style="color:#24292E;">	m.syncer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> protocol.</span><span style="color:#005CC5;">NewSyncer</span><span style="color:#24292E;">(logger, m.blockchain)</span></span>
<span class="line"><span style="color:#24292E;">	m.syncer.</span><span style="color:#005CC5;">Register</span><span style="color:#24292E;">(m.libp2pServer.</span><span style="color:#005CC5;">GetGRPCServer</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	m.syncer.</span><span style="color:#005CC5;">Start</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Register the libp2p GRPC endpoints</span></span>
<span class="line"><span style="color:#24292E;">	proto.</span><span style="color:#005CC5;">RegisterHandshakeServer</span><span style="color:#24292E;">(m.libp2pServer.</span><span style="color:#005CC5;">GetGRPCServer</span><span style="color:#24292E;">(), </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">handshakeService{s: m})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	m.libp2pServer.</span><span style="color:#005CC5;">Serve</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> m, </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,7),e=[o];function t(r,c,E,y,i,F){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{g as __pageData,u as default};
