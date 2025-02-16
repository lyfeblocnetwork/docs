import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1a91c06a.js";const F=JSON.parse('{"title":"Consensus","description":"","frontmatter":{"id":"consensus","title":"Consensus","head":[["meta",{"property":"og:title","content":"Consensus | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/consensus.md","filePath":"architecture/consensus.md","lastUpdated":1739729557000}'),p={name:"architecture/consensus.md"},o=l(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <strong>Consensus</strong> module provides an interface for consensus mechanisms.</p><p>Lyfebloc Network uses the most efficient blockchain consensus protocol</p><ul><li><strong>Lyfebloc PoS</strong></li></ul><p>Lyfebloc Network wants to maintain a state of modularity and pluggability. <br> This is why the core consensus logic has been abstracted away, so new consensus mechanisms can be built on top, without compromising on usability and ease of use.</p><h2 id="consensus-interface" tabindex="-1">Consensus Interface <a class="header-anchor" href="#consensus-interface" aria-label="Permalink to &quot;Consensus Interface&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Consensus is the interface for consensus</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Consensus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// VerifyHeader verifies the header is correct</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">VerifyHeader</span><span style="color:#E1E4E8;">(parent, header </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Start starts the consensus</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">Start</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Close closes the connection</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">Close</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Consensus is the interface for consensus</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Consensus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// VerifyHeader verifies the header is correct</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">VerifyHeader</span><span style="color:#24292E;">(parent, header </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) </span><span style="color:#D73A49;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Start starts the consensus</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">Start</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Close closes the connection</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">Close</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">error</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The <em><strong>Consensus</strong></em> interface is the core of the mentioned abstraction. <br></p><ul><li>The <strong>VerifyHeader</strong> method represents a helper function which the consensus layer exposes to the <strong>blockchain</strong> layer It is there to handle header verification</li><li>The <strong>Start</strong> method simply starts the consensus process, and everything associated with it. This includes synchronization, sealing, everything that needs to be done</li><li>The <strong>Close</strong> method closes the consensus connection</li></ul><h2 id="consensus-configuration" tabindex="-1">Consensus Configuration <a class="header-anchor" href="#consensus-configuration" aria-label="Permalink to &quot;Consensus Configuration&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Config is the configuration for the consensus</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Config</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Logger to be used by the backend</span></span>
<span class="line"><span style="color:#E1E4E8;">	Logger </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">log.Logger</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Params are the params of the chain and the consensus</span></span>
<span class="line"><span style="color:#E1E4E8;">	Params </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">chain.Params</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Specific configuration parameters for the backend</span></span>
<span class="line"><span style="color:#E1E4E8;">	Config </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Path for the consensus protocol to store information</span></span>
<span class="line"><span style="color:#E1E4E8;">	Path </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Config is the configuration for the consensus</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Config</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Logger to be used by the backend</span></span>
<span class="line"><span style="color:#24292E;">	Logger </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">log.Logger</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Params are the params of the chain and the consensus</span></span>
<span class="line"><span style="color:#24292E;">	Params </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">chain.Params</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Specific configuration parameters for the backend</span></span>
<span class="line"><span style="color:#24292E;">	Config </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Path for the consensus protocol to store information</span></span>
<span class="line"><span style="color:#24292E;">	Path </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>There may be times when you might want to pass in a custom location for the consensus protocol to store data, or perhaps a custom key-value map that you want the consensus mechanism to use. This can be achieved through the <em><strong>Config</strong></em> struct, which gets read when a new consensus instance is created.</p><h2 id="ibft" tabindex="-1">IBFT <a class="header-anchor" href="#ibft" aria-label="Permalink to &quot;IBFT&quot;">​</a></h2><h3 id="extradata" tabindex="-1">ExtraData <a class="header-anchor" href="#extradata" aria-label="Permalink to &quot;ExtraData&quot;">​</a></h3><p>The blockchain header object, among other fields, has a field called <strong>ExtraData</strong>. <br> To review the fields present in the block header, please check out the <strong><a href="/docs/concepts/ethereum-state#blocks">State in Ethereum</a></strong> section.</p><p>IBFT uses this extra field to store operational information regarding the block, answering questions like:</p><ul><li>&quot;Who signed this block?&quot;</li><li>&quot;Who are the validators for this block?&quot;</li></ul><p>These extra fields for IBFT are defined as follows:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IstanbulExtra</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Validators    []types.Address</span></span>
<span class="line"><span style="color:#E1E4E8;">	Seal          []</span><span style="color:#F97583;">byte</span></span>
<span class="line"><span style="color:#E1E4E8;">	CommittedSeal [][]</span><span style="color:#F97583;">byte</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IstanbulExtra</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	Validators    []types.Address</span></span>
<span class="line"><span style="color:#24292E;">	Seal          []</span><span style="color:#D73A49;">byte</span></span>
<span class="line"><span style="color:#24292E;">	CommittedSeal [][]</span><span style="color:#D73A49;">byte</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="signing-data" tabindex="-1">Signing Data <a class="header-anchor" href="#signing-data" aria-label="Permalink to &quot;Signing Data&quot;">​</a></h3><p>In order for the node to sign information in IBFT, it leverages the <em>signHash</em> method:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">signHash</span><span style="color:#E1E4E8;">(h </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//hash := istambulHeaderHash(h)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//return hash.Bytes(), nil</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	h </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> h.</span><span style="color:#79B8FF;">Copy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// make a copy since we update the extra field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	arena </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> fastrlp.DefaultArenaPool.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> fastrlp.DefaultArenaPool.</span><span style="color:#79B8FF;">Put</span><span style="color:#E1E4E8;">(arena)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// when hashign the block for signing we have to remove from</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// the extra field the seal and commitedseal items</span></span>
<span class="line"><span style="color:#E1E4E8;">	extra, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">getIbftExtra</span><span style="color:#E1E4E8;">(h)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">putIbftExtraValidators</span><span style="color:#E1E4E8;">(h, extra.Validators)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	vv </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> arena.</span><span style="color:#79B8FF;">NewArray</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.ParentHash.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.Sha3Uncles.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.Miner.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.StateRoot.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.TxRoot.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.ReceiptsRoot.</span><span style="color:#79B8FF;">Bytes</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewBytes</span><span style="color:#E1E4E8;">(h.LogsBloom[:]))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewUint</span><span style="color:#E1E4E8;">(h.Difficulty))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewUint</span><span style="color:#E1E4E8;">(h.Number))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewUint</span><span style="color:#E1E4E8;">(h.GasLimit))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewUint</span><span style="color:#E1E4E8;">(h.GasUsed))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewUint</span><span style="color:#E1E4E8;">(h.Timestamp))</span></span>
<span class="line"><span style="color:#E1E4E8;">	vv.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(arena.</span><span style="color:#79B8FF;">NewCopyBytes</span><span style="color:#E1E4E8;">(h.ExtraData))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	buf </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> keccak.</span><span style="color:#79B8FF;">Keccak256Rlp</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, vv)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> buf, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">signHash</span><span style="color:#24292E;">(h </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//hash := istambulHeaderHash(h)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//return hash.Bytes(), nil</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	h </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> h.</span><span style="color:#005CC5;">Copy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// make a copy since we update the extra field</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	arena </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> fastrlp.DefaultArenaPool.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> fastrlp.DefaultArenaPool.</span><span style="color:#005CC5;">Put</span><span style="color:#24292E;">(arena)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// when hashign the block for signing we have to remove from</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// the extra field the seal and commitedseal items</span></span>
<span class="line"><span style="color:#24292E;">	extra, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">getIbftExtra</span><span style="color:#24292E;">(h)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">putIbftExtraValidators</span><span style="color:#24292E;">(h, extra.Validators)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	vv </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> arena.</span><span style="color:#005CC5;">NewArray</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.ParentHash.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.Sha3Uncles.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.Miner.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.StateRoot.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.TxRoot.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.ReceiptsRoot.</span><span style="color:#005CC5;">Bytes</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewBytes</span><span style="color:#24292E;">(h.LogsBloom[:]))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewUint</span><span style="color:#24292E;">(h.Difficulty))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewUint</span><span style="color:#24292E;">(h.Number))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewUint</span><span style="color:#24292E;">(h.GasLimit))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewUint</span><span style="color:#24292E;">(h.GasUsed))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewUint</span><span style="color:#24292E;">(h.Timestamp))</span></span>
<span class="line"><span style="color:#24292E;">	vv.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(arena.</span><span style="color:#005CC5;">NewCopyBytes</span><span style="color:#24292E;">(h.ExtraData))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	buf </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> keccak.</span><span style="color:#005CC5;">Keccak256Rlp</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, vv)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> buf, </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Another notable method is the <em>VerifyCommittedFields</em> method, which verifies that the committed seals are from valid validators:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">verifyCommitedFields</span><span style="color:#E1E4E8;">(snap </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Snapshot, header </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	extra, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">getIbftExtra</span><span style="color:#E1E4E8;">(header)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(extra.CommittedSeal) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;empty committed seals&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// get the message that needs to be signed</span></span>
<span class="line"><span style="color:#E1E4E8;">	signMsg, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">signHash</span><span style="color:#E1E4E8;">(header)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	signMsg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commitMsg</span><span style="color:#E1E4E8;">(signMsg)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	visited </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[types.Address]</span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, seal </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> extra.CommittedSeal {</span></span>
<span class="line"><span style="color:#E1E4E8;">		addr, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ecrecoverImpl</span><span style="color:#E1E4E8;">(seal, signMsg)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> _, ok </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> visited[addr]; ok {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;repeated seal&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">snap.Set.</span><span style="color:#79B8FF;">Includes</span><span style="color:#E1E4E8;">(addr) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;signed by non validator&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			visited[addr] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}{}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	validSeals </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(visited)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> validSeals </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">snap.Set.</span><span style="color:#79B8FF;">MinFaultyNodes</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;not enough seals to seal block&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">verifyCommitedFields</span><span style="color:#24292E;">(snap </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Snapshot, header </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	extra, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">getIbftExtra</span><span style="color:#24292E;">(header)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(extra.CommittedSeal) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;empty committed seals&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// get the message that needs to be signed</span></span>
<span class="line"><span style="color:#24292E;">	signMsg, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">signHash</span><span style="color:#24292E;">(header)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	signMsg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commitMsg</span><span style="color:#24292E;">(signMsg)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	visited </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[types.Address]</span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}{}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, seal </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> extra.CommittedSeal {</span></span>
<span class="line"><span style="color:#24292E;">		addr, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ecrecoverImpl</span><span style="color:#24292E;">(seal, signMsg)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> _, ok </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> visited[addr]; ok {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;repeated seal&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">snap.Set.</span><span style="color:#005CC5;">Includes</span><span style="color:#24292E;">(addr) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;signed by non validator&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			visited[addr] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}{}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	validSeals </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(visited)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> validSeals </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">snap.Set.</span><span style="color:#005CC5;">MinFaultyNodes</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;not enough seals to seal block&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="snapshots" tabindex="-1">Snapshots <a class="header-anchor" href="#snapshots" aria-label="Permalink to &quot;Snapshots&quot;">​</a></h3><p>Snapshots, as the name implies, are there to provide a <em>snapshot</em>, or the <em>state</em> of a system at any block height (number).</p><p>Snapshots contain a set of nodes who are validators, as well as voting information (validators can vote for other validators). Validators include voting information in the <strong>Miner</strong> header filed, and change the value of the <strong>nonce</strong>:</p><ul><li>Nonce is <strong>all 1s</strong> if the node wants to remove a validator</li><li>Nonce is <strong>all 0s</strong> if the node wants to add a validator</li></ul><p>Snapshots are calculated using the <em><strong>processHeaders</strong></em> method:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Ibft) </span><span style="color:#B392F0;">processHeaders</span><span style="color:#E1E4E8;">(headers []</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(headers) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	parentSnap, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> i.</span><span style="color:#79B8FF;">getSnapshot</span><span style="color:#E1E4E8;">(headers[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].Number </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	snap </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> parentSnap.</span><span style="color:#79B8FF;">Copy</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	saveSnap </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(h </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> snap.</span><span style="color:#79B8FF;">Equal</span><span style="color:#E1E4E8;">(parentSnap) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		snap.Number </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> h.Number</span></span>
<span class="line"><span style="color:#E1E4E8;">		snap.Hash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> h.Hash.</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		i.store.</span><span style="color:#79B8FF;">add</span><span style="color:#E1E4E8;">(snap)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		parentSnap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> snap</span></span>
<span class="line"><span style="color:#E1E4E8;">		snap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parentSnap.</span><span style="color:#79B8FF;">Copy</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, h </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> headers {</span></span>
<span class="line"><span style="color:#E1E4E8;">		number </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> h.Number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		validator, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ecrecoverFromHeader</span><span style="color:#E1E4E8;">(h)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">snap.Set.</span><span style="color:#79B8FF;">Includes</span><span style="color:#E1E4E8;">(validator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;unauthroized validator&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> number</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">i.epochSize </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// during a checkpoint block, we reset the voles</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// and there cannot be any proposals</span></span>
<span class="line"><span style="color:#E1E4E8;">			snap.Votes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">saveSnap</span><span style="color:#E1E4E8;">(h); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// remove in-memory snaphots from two epochs before this one</span></span>
<span class="line"><span style="color:#E1E4E8;">			epoch </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">int</span><span style="color:#E1E4E8;">(number</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">i.epochSize) </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> epoch </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				purgeBlock </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">uint64</span><span style="color:#E1E4E8;">(epoch) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> i.epochSize</span></span>
<span class="line"><span style="color:#E1E4E8;">				i.store.</span><span style="color:#79B8FF;">deleteLower</span><span style="color:#E1E4E8;">(purgeBlock)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// if we have a miner address, this might be a vote</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> h.Miner </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> types.ZeroAddress {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// the nonce selects the action</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> authorize </span><span style="color:#F97583;">bool</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> h.Nonce </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> nonceAuthVote {</span></span>
<span class="line"><span style="color:#E1E4E8;">			authorize </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> h.Nonce </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> nonceDropVote {</span></span>
<span class="line"><span style="color:#E1E4E8;">			authorize </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;incorrect vote nonce&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// validate the vote</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> authorize {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// we can only authorize if they are not on the validators list</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> snap.Set.</span><span style="color:#79B8FF;">Includes</span><span style="color:#E1E4E8;">(h.Miner) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// we can only remove if they are part of the validators list</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">snap.Set.</span><span style="color:#79B8FF;">Includes</span><span style="color:#E1E4E8;">(h.Miner) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		count </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> snap.</span><span style="color:#79B8FF;">Count</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(v </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Vote) </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> v.Validator </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> validator </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> v.Address </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> h.Miner</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// there can only be one vote per validator per address</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#79B8FF;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;more than one proposal per validator per address found&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// cast the new vote since there is no one yet</span></span>
<span class="line"><span style="color:#E1E4E8;">			snap.Votes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">append</span><span style="color:#E1E4E8;">(snap.Votes, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Vote{</span></span>
<span class="line"><span style="color:#E1E4E8;">				Validator: validator,</span></span>
<span class="line"><span style="color:#E1E4E8;">				Address:   h.Miner,</span></span>
<span class="line"><span style="color:#E1E4E8;">				Authorize: authorize,</span></span>
<span class="line"><span style="color:#E1E4E8;">			})</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// check the tally for the proposed validator</span></span>
<span class="line"><span style="color:#E1E4E8;">		tally </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> snap.</span><span style="color:#79B8FF;">Count</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(v </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Vote) </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> v.Address </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> h.Miner</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> tally </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> snap.Set.</span><span style="color:#79B8FF;">Len</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> authorize {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// add the proposal to the validator list</span></span>
<span class="line"><span style="color:#E1E4E8;">				snap.Set.</span><span style="color:#79B8FF;">Add</span><span style="color:#E1E4E8;">(h.Miner)</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// remove the proposal from the validators list</span></span>
<span class="line"><span style="color:#E1E4E8;">				snap.Set.</span><span style="color:#79B8FF;">Del</span><span style="color:#E1E4E8;">(h.Miner)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// remove any votes casted by the removed validator</span></span>
<span class="line"><span style="color:#E1E4E8;">				snap.</span><span style="color:#79B8FF;">RemoveVotes</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(v </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Vote) </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> v.Validator </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> h.Miner</span></span>
<span class="line"><span style="color:#E1E4E8;">				})</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// remove all the votes that promoted this validator</span></span>
<span class="line"><span style="color:#E1E4E8;">			snap.</span><span style="color:#79B8FF;">RemoveVotes</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(v </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Vote) </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> v.Address </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> h.Miner</span></span>
<span class="line"><span style="color:#E1E4E8;">			})</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">saveSnap</span><span style="color:#E1E4E8;">(h); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// update the metadata</span></span>
<span class="line"><span style="color:#E1E4E8;">	i.store.</span><span style="color:#79B8FF;">updateLastBlock</span><span style="color:#E1E4E8;">(headers[</span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(headers)</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].Number)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Ibft) </span><span style="color:#6F42C1;">processHeaders</span><span style="color:#24292E;">(headers []</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(headers) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	parentSnap, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> i.</span><span style="color:#005CC5;">getSnapshot</span><span style="color:#24292E;">(headers[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].Number </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	snap </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> parentSnap.</span><span style="color:#005CC5;">Copy</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	saveSnap </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(h </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> snap.</span><span style="color:#005CC5;">Equal</span><span style="color:#24292E;">(parentSnap) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		snap.Number </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> h.Number</span></span>
<span class="line"><span style="color:#24292E;">		snap.Hash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> h.Hash.</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		i.store.</span><span style="color:#005CC5;">add</span><span style="color:#24292E;">(snap)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		parentSnap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> snap</span></span>
<span class="line"><span style="color:#24292E;">		snap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parentSnap.</span><span style="color:#005CC5;">Copy</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, h </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> headers {</span></span>
<span class="line"><span style="color:#24292E;">		number </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> h.Number</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		validator, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ecrecoverFromHeader</span><span style="color:#24292E;">(h)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">snap.Set.</span><span style="color:#005CC5;">Includes</span><span style="color:#24292E;">(validator) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;unauthroized validator&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> number</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">i.epochSize </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// during a checkpoint block, we reset the voles</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// and there cannot be any proposals</span></span>
<span class="line"><span style="color:#24292E;">			snap.Votes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">saveSnap</span><span style="color:#24292E;">(h); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// remove in-memory snaphots from two epochs before this one</span></span>
<span class="line"><span style="color:#24292E;">			epoch </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">int</span><span style="color:#24292E;">(number</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">i.epochSize) </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> epoch </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				purgeBlock </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">uint64</span><span style="color:#24292E;">(epoch) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> i.epochSize</span></span>
<span class="line"><span style="color:#24292E;">				i.store.</span><span style="color:#005CC5;">deleteLower</span><span style="color:#24292E;">(purgeBlock)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// if we have a miner address, this might be a vote</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> h.Miner </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> types.ZeroAddress {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// the nonce selects the action</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> authorize </span><span style="color:#D73A49;">bool</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> h.Nonce </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> nonceAuthVote {</span></span>
<span class="line"><span style="color:#24292E;">			authorize </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> h.Nonce </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> nonceDropVote {</span></span>
<span class="line"><span style="color:#24292E;">			authorize </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;incorrect vote nonce&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// validate the vote</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> authorize {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// we can only authorize if they are not on the validators list</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> snap.Set.</span><span style="color:#005CC5;">Includes</span><span style="color:#24292E;">(h.Miner) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// we can only remove if they are part of the validators list</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">snap.Set.</span><span style="color:#005CC5;">Includes</span><span style="color:#24292E;">(h.Miner) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		count </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> snap.</span><span style="color:#005CC5;">Count</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(v </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Vote) </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> v.Validator </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> validator </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> v.Address </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> h.Miner</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// there can only be one vote per validator per address</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fmt.</span><span style="color:#005CC5;">Errorf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;more than one proposal per validator per address found&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// cast the new vote since there is no one yet</span></span>
<span class="line"><span style="color:#24292E;">			snap.Votes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">append</span><span style="color:#24292E;">(snap.Votes, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Vote{</span></span>
<span class="line"><span style="color:#24292E;">				Validator: validator,</span></span>
<span class="line"><span style="color:#24292E;">				Address:   h.Miner,</span></span>
<span class="line"><span style="color:#24292E;">				Authorize: authorize,</span></span>
<span class="line"><span style="color:#24292E;">			})</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// check the tally for the proposed validator</span></span>
<span class="line"><span style="color:#24292E;">		tally </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> snap.</span><span style="color:#005CC5;">Count</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(v </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Vote) </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> v.Address </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> h.Miner</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> tally </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> snap.Set.</span><span style="color:#005CC5;">Len</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> authorize {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// add the proposal to the validator list</span></span>
<span class="line"><span style="color:#24292E;">				snap.Set.</span><span style="color:#005CC5;">Add</span><span style="color:#24292E;">(h.Miner)</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// remove the proposal from the validators list</span></span>
<span class="line"><span style="color:#24292E;">				snap.Set.</span><span style="color:#005CC5;">Del</span><span style="color:#24292E;">(h.Miner)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// remove any votes casted by the removed validator</span></span>
<span class="line"><span style="color:#24292E;">				snap.</span><span style="color:#005CC5;">RemoveVotes</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(v </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Vote) </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> v.Validator </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> h.Miner</span></span>
<span class="line"><span style="color:#24292E;">				})</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// remove all the votes that promoted this validator</span></span>
<span class="line"><span style="color:#24292E;">			snap.</span><span style="color:#005CC5;">RemoveVotes</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(v </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Vote) </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> v.Address </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> h.Miner</span></span>
<span class="line"><span style="color:#24292E;">			})</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">saveSnap</span><span style="color:#24292E;">(h); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// update the metadata</span></span>
<span class="line"><span style="color:#24292E;">	i.store.</span><span style="color:#005CC5;">updateLastBlock</span><span style="color:#24292E;">(headers[</span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(headers)</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].Number)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>This method is usually called with 1 header, but the flow is the same even with multiple headers. <br> For each passed-in header, IBFT needs to verify that the proposer of the header is the validator. This can be done easily by grabbing the latest snapshot, and checking if the node is in the validator set.</p><p>Next, the nonce is checked. The vote is included, and tallied - and if there are enough votes a node is added/removed from the validator set, following which the new snapshot is saved.</p><h4 id="snapshot-store" tabindex="-1">Snapshot Store <a class="header-anchor" href="#snapshot-store" aria-label="Permalink to &quot;Snapshot Store&quot;">​</a></h4><p>The snapshot service manages and updates an entity called the <strong>snapshotStore</strong>, which stores the list of all available snapshots. Using it, the service is able to quickly figure out which snapshot is associated with which block height.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">snapshotStore</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	lastNumber </span><span style="color:#F97583;">uint64</span></span>
<span class="line"><span style="color:#E1E4E8;">	lock       sync.Mutex</span></span>
<span class="line"><span style="color:#E1E4E8;">	list       snapshotSortedList</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">snapshotStore</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	lastNumber </span><span style="color:#D73A49;">uint64</span></span>
<span class="line"><span style="color:#24292E;">	lock       sync.Mutex</span></span>
<span class="line"><span style="color:#24292E;">	list       snapshotSortedList</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="ibft-startup" tabindex="-1">IBFT Startup <a class="header-anchor" href="#ibft-startup" aria-label="Permalink to &quot;IBFT Startup&quot;">​</a></h3><p>To start up IBFT, Lyfebloc Network firstly needs to set up the IBFT transport:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Ibft) </span><span style="color:#B392F0;">setupTransport</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// use a gossip protocol</span></span>
<span class="line"><span style="color:#E1E4E8;">	topic, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> i.network.</span><span style="color:#79B8FF;">NewTopic</span><span style="color:#E1E4E8;">(ibftProto, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">proto.MessageReq{})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> topic.</span><span style="color:#79B8FF;">Subscribe</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(obj </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		msg </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> obj.(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">proto.MessageReq)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">i.</span><span style="color:#79B8FF;">isSealing</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// if we are not sealing we do not care about the messages</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// but we need to subscribe to propagate the messages</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// decode sender</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">validateMsg</span><span style="color:#E1E4E8;">(msg); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			i.logger.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;failed to validate msg&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;err&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> msg.From </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> i.validatorKeyAddr.</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// we are the sender, skip this message since we already</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// relay our own messages internally.</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">pushMessage</span><span style="color:#E1E4E8;">(msg)</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	i.transport </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">gossipTransport{topic: topic}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Ibft) </span><span style="color:#6F42C1;">setupTransport</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// use a gossip protocol</span></span>
<span class="line"><span style="color:#24292E;">	topic, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> i.network.</span><span style="color:#005CC5;">NewTopic</span><span style="color:#24292E;">(ibftProto, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">proto.MessageReq{})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> topic.</span><span style="color:#005CC5;">Subscribe</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(obj </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;">{}) {</span></span>
<span class="line"><span style="color:#24292E;">		msg </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> obj.(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">proto.MessageReq)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">i.</span><span style="color:#005CC5;">isSealing</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// if we are not sealing we do not care about the messages</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// but we need to subscribe to propagate the messages</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// decode sender</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">validateMsg</span><span style="color:#24292E;">(msg); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			i.logger.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;failed to validate msg&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;err&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> msg.From </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> i.validatorKeyAddr.</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// we are the sender, skip this message since we already</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// relay our own messages internally.</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">pushMessage</span><span style="color:#24292E;">(msg)</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	i.transport </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">gossipTransport{topic: topic}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>It essentially creates a new topic with IBFT proto, with a new proto buff message.<br> The messages are meant to be used by validators. Lyfebloc Network then subscribes to the topic and handles messages accordingly.</p><h4 id="messagereq" tabindex="-1">MessageReq <a class="header-anchor" href="#messagereq" aria-label="Permalink to &quot;MessageReq&quot;">​</a></h4><p>The message exchanged by validators:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">message MessageReq {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// type is the type of the message</span></span>
<span class="line"><span style="color:#E1E4E8;">    Type type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// from is the address of the sender</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> from </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// seal is the committed seal if message is commit</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> seal </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// signature is the crypto signature of the message</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> signature </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// view is the view assigned to the message</span></span>
<span class="line"><span style="color:#E1E4E8;">    View view </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// hash of the locked block</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> digest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// proposal is the rlp encoded block in preprepare messages</span></span>
<span class="line"><span style="color:#E1E4E8;">    google.protobuf.Any proposal </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    enum Type {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Preprepare </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Prepare </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Commit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        RoundChange </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">message View {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;"> round </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;"> sequence </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">message MessageReq {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// type is the type of the message</span></span>
<span class="line"><span style="color:#24292E;">    Type type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// from is the address of the sender</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> from </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// seal is the committed seal if message is commit</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> seal </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// signature is the crypto signature of the message</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> signature </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// view is the view assigned to the message</span></span>
<span class="line"><span style="color:#24292E;">    View view </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// hash of the locked block</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> digest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// proposal is the rlp encoded block in preprepare messages</span></span>
<span class="line"><span style="color:#24292E;">    google.protobuf.Any proposal </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    enum Type {</span></span>
<span class="line"><span style="color:#24292E;">        Preprepare </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        Prepare </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        Commit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        RoundChange </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">message View {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;"> round </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;"> sequence </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The <strong>View</strong> field in the <strong>MessageReq</strong> represents the current node position inside the chain. It has a <em>round</em>, and a <em>sequence</em> attribute.</p><ul><li><strong>round</strong> represents the proposer round for the height</li><li><strong>sequence</strong> represents the height of the blockchain</li></ul><p>The <em>msgQueue</em> filed in the IBFT implementation has the purpose of storing message requests. It orders messages by the <em>View</em> (firstly by sequence, then by round). The IBFT implementation also possesses different queues for different states in the system.</p><h3 id="ibft-states" tabindex="-1">IBFT States <a class="header-anchor" href="#ibft-states" aria-label="Permalink to &quot;IBFT States&quot;">​</a></h3><p>After the consensus mechanism is started using the <strong>Start</strong> method, it runs into an infinite loop which simulates a state machine:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Ibft) </span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// consensus always starts in SyncState mode in case it needs</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// to sync with other nodes.</span></span>
<span class="line"><span style="color:#E1E4E8;">	i.</span><span style="color:#79B8FF;">setState</span><span style="color:#E1E4E8;">(SyncState)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	header </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> i.blockchain.</span><span style="color:#79B8FF;">Header</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	i.logger.</span><span style="color:#79B8FF;">Debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;current sequence&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;sequence&quot;</span><span style="color:#E1E4E8;">, header.Number</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">i.closeCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">runCycle</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (i </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Ibft) </span><span style="color:#B392F0;">runCycle</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i.state.view </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.logger.</span><span style="color:#79B8FF;">Debug</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		    </span><span style="color:#9ECBFF;">&quot;cycle&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">		    </span><span style="color:#9ECBFF;">&quot;state&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">		    i.</span><span style="color:#79B8FF;">getState</span><span style="color:#E1E4E8;">(), </span></span>
<span class="line"><span style="color:#E1E4E8;">		    </span><span style="color:#9ECBFF;">&quot;sequence&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">		    i.state.view.Sequence, </span></span>
<span class="line"><span style="color:#E1E4E8;">		    </span><span style="color:#9ECBFF;">&quot;round&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">		    i.state.view.Round,</span></span>
<span class="line"><span style="color:#E1E4E8;">	    )</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> i.</span><span style="color:#79B8FF;">getState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> AcceptState:</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">runAcceptState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> ValidateState:</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">runValidateState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> RoundChangeState:</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">runRoundChangeState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> SyncState:</span></span>
<span class="line"><span style="color:#E1E4E8;">		i.</span><span style="color:#79B8FF;">runSyncState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Ibft) </span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// consensus always starts in SyncState mode in case it needs</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// to sync with other nodes.</span></span>
<span class="line"><span style="color:#24292E;">	i.</span><span style="color:#005CC5;">setState</span><span style="color:#24292E;">(SyncState)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	header </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> i.blockchain.</span><span style="color:#005CC5;">Header</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	i.logger.</span><span style="color:#005CC5;">Debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;current sequence&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;sequence&quot;</span><span style="color:#24292E;">, header.Number</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">i.closeCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">runCycle</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (i </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Ibft) </span><span style="color:#6F42C1;">runCycle</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i.state.view </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		i.logger.</span><span style="color:#005CC5;">Debug</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">		    </span><span style="color:#032F62;">&quot;cycle&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">		    </span><span style="color:#032F62;">&quot;state&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">		    i.</span><span style="color:#005CC5;">getState</span><span style="color:#24292E;">(), </span></span>
<span class="line"><span style="color:#24292E;">		    </span><span style="color:#032F62;">&quot;sequence&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">		    i.state.view.Sequence, </span></span>
<span class="line"><span style="color:#24292E;">		    </span><span style="color:#032F62;">&quot;round&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">		    i.state.view.Round,</span></span>
<span class="line"><span style="color:#24292E;">	    )</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> i.</span><span style="color:#005CC5;">getState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> AcceptState:</span></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">runAcceptState</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> ValidateState:</span></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">runValidateState</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> RoundChangeState:</span></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">runRoundChangeState</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> SyncState:</span></span>
<span class="line"><span style="color:#24292E;">		i.</span><span style="color:#005CC5;">runSyncState</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="syncstate" tabindex="-1">SyncState <a class="header-anchor" href="#syncstate" aria-label="Permalink to &quot;SyncState&quot;">​</a></h4><p>All nodes initially start in the <strong>Sync</strong> state.</p><p>This is because fresh data needs to be fetched from the blockchain. The client needs to find out if it&#39;s the validator, find the current snapshot. This state resolves any pending blocks.</p><p>After the sync finishes, and the client determines it is indeed a validator, it needs to transfer to <strong>AcceptState</strong>. If the client is <strong>not</strong> a validator, it will continue syncing, and stay in <strong>SyncState</strong></p><h4 id="acceptstate" tabindex="-1">AcceptState <a class="header-anchor" href="#acceptstate" aria-label="Permalink to &quot;AcceptState&quot;">​</a></h4><p>The <strong>Accept</strong> state always check the snapshot and the validator set. If the current node is not in the validators set, it moves back to the <strong>Sync</strong> state.</p><p>On the other hand, if the node <strong>is</strong> a validator, it calculates the proposer. If it turns out that the current node is the proposer, it builds a block, and sends preprepare and then prepare messages.</p><ul><li>Preprepare messages - messages sent by proposers to validators, to let them know about the proposal</li><li>Prepare messages - messages where validators agree on a proposal. All nodes receive all prepare messages</li><li>Commit messages - messages containing commit information for the proposal</li></ul><p>If the current node <strong>is not</strong> a validator, it uses the <em>getNextMessage</em> method to read a message from the previously shown queue. <br> It waits for the preprepare messages. Once it is confirmed everything is correct, the node moves to the <strong>Validate</strong> state.</p><h4 id="validatestate" tabindex="-1">ValidateState <a class="header-anchor" href="#validatestate" aria-label="Permalink to &quot;ValidateState&quot;">​</a></h4><p>The <strong>Validate</strong> state is rather simple - all nodes do in this state is read messages and add them to their local snapshot state.</p>`,59),e=[o];function t(r,c,E,y,i,h){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
