import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1a91c06a.js";const F=JSON.parse('{"title":"JSON RPC","description":"","frontmatter":{"id":"json-rpc","title":"JSON RPC","head":[["meta",{"property":"og:title","content":"JSON RPC | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/json-rpc.md","filePath":"architecture/json-rpc.md","lastUpdated":1739729557000}'),p={name:"architecture/json-rpc.md"},o=l(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <strong>JSON RPC</strong> module implements the <strong>JSON RPC API layer</strong>, something that dApp developers use to interact with the blockchain.</p><p>It includes support for standard <strong><a href="https://eth.wiki/json-rpc/API" target="_blank" rel="noreferrer">json-rpc endpoints</a></strong>, as well as websocket endpoints.</p><h2 id="blockchain-interface" tabindex="-1">Blockchain Interface <a class="header-anchor" href="#blockchain-interface" aria-label="Permalink to &quot;Blockchain Interface&quot;">​</a></h2><p>Lyfebloc Network uses the <em><strong>blockchain interface</strong></em> to define all the methods that the JSON RPC module needs to use, in order to deliver its endpoints.</p><p>The blockchain interface is implemented by the <strong><a href="/docs/architecture/modules/minimal">Minimal</a></strong> server. It is the base implementation that&#39;s passed into the JSON RPC layer.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">blockchainInterface</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Header returns the current header of the chain (genesis if empty)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">Header</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// GetReceiptsByHash returns the receipts for a hash</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">GetReceiptsByHash</span><span style="color:#E1E4E8;">(hash types.Hash) ([]</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Receipt, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Subscribe subscribes for chain head events</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">SubscribeEvents</span><span style="color:#E1E4E8;">() blockchain.Subscription</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// GetHeaderByNumber returns the header by number</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">GetHeaderByNumber</span><span style="color:#E1E4E8;">(block </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">) (</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// GetAvgGasPrice returns the average gas price</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">GetAvgGasPrice</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">big.Int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// AddTx adds a new transaction to the tx pool</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">AddTx</span><span style="color:#E1E4E8;">(tx </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Transaction) </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// State returns a reference to the state</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">() state.State</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// BeginTxn starts a transition object</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">BeginTxn</span><span style="color:#E1E4E8;">(parentRoot types.Hash, header </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header) (</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">state.Transition, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// GetBlockByHash gets a block using the provided hash</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">GetBlockByHash</span><span style="color:#E1E4E8;">(hash types.Hash, full </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">) (</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Block, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// ApplyTxn applies a transaction object to the blockchain</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">ApplyTxn</span><span style="color:#E1E4E8;">(header </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Header, txn </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Transaction) ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	stateHelperInterface</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">blockchainInterface</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Header returns the current header of the chain (genesis if empty)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">Header</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// GetReceiptsByHash returns the receipts for a hash</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">GetReceiptsByHash</span><span style="color:#24292E;">(hash types.Hash) ([]</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Receipt, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Subscribe subscribes for chain head events</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">SubscribeEvents</span><span style="color:#24292E;">() blockchain.Subscription</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// GetHeaderByNumber returns the header by number</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">GetHeaderByNumber</span><span style="color:#24292E;">(block </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">) (</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// GetAvgGasPrice returns the average gas price</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">GetAvgGasPrice</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">big.Int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// AddTx adds a new transaction to the tx pool</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">AddTx</span><span style="color:#24292E;">(tx </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Transaction) </span><span style="color:#D73A49;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// State returns a reference to the state</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">State</span><span style="color:#24292E;">() state.State</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// BeginTxn starts a transition object</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">BeginTxn</span><span style="color:#24292E;">(parentRoot types.Hash, header </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header) (</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">state.Transition, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// GetBlockByHash gets a block using the provided hash</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">GetBlockByHash</span><span style="color:#24292E;">(hash types.Hash, full </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">) (</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Block, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// ApplyTxn applies a transaction object to the blockchain</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">ApplyTxn</span><span style="color:#24292E;">(header </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Header, txn </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Transaction) ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	stateHelperInterface</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="eth-endpoints" tabindex="-1">ETH Endpoints <a class="header-anchor" href="#eth-endpoints" aria-label="Permalink to &quot;ETH Endpoints&quot;">​</a></h2><p>All the standard JSON RPC endpoints are implemented in:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">jsonrpc/eth_endpoint.go</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">jsonrpc/eth_endpoint.go</span></span></code></pre></div><h2 id="filter-manager" tabindex="-1">Filter Manager <a class="header-anchor" href="#filter-manager" aria-label="Permalink to &quot;Filter Manager&quot;">​</a></h2><p>The <strong>Filter Manager</strong> is a service that runs alongside the JSON RPC server.</p><p>It provides support for filtering blocks on the blockchain.<br> Specifically, it includes both a <strong>log</strong> and a <strong>block</strong> level filter.</p><p>The Filter Manager relies heavily on Subscription Events, mentioned in the <a href="./blockchain#blockchain-subscriptions">Blockchain</a> section</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Filter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id </span><span style="color:#F97583;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// block filter</span></span>
<span class="line"><span style="color:#E1E4E8;">	block </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">headElem</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// log cache</span></span>
<span class="line"><span style="color:#E1E4E8;">	logs []</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// log filter</span></span>
<span class="line"><span style="color:#E1E4E8;">	logFilter </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">LogFilter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// index of the filter in the timer array</span></span>
<span class="line"><span style="color:#E1E4E8;">	index </span><span style="color:#F97583;">int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// next time to timeout</span></span>
<span class="line"><span style="color:#E1E4E8;">	timestamp time.Time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// websocket connection</span></span>
<span class="line"><span style="color:#E1E4E8;">	ws wsConn</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FilterManager</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	logger hclog.Logger</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	store   blockchainInterface</span></span>
<span class="line"><span style="color:#E1E4E8;">	closeCh </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	subscription blockchain.Subscription</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	filters </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Filter</span></span>
<span class="line"><span style="color:#E1E4E8;">	lock    sync.Mutex</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	updateCh </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	timer    timeHeapImpl</span></span>
<span class="line"><span style="color:#E1E4E8;">	timeout  time.Duration</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	blockStream </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">blockStream</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Filter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id </span><span style="color:#D73A49;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// block filter</span></span>
<span class="line"><span style="color:#24292E;">	block </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">headElem</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// log cache</span></span>
<span class="line"><span style="color:#24292E;">	logs []</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// log filter</span></span>
<span class="line"><span style="color:#24292E;">	logFilter </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">LogFilter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// index of the filter in the timer array</span></span>
<span class="line"><span style="color:#24292E;">	index </span><span style="color:#D73A49;">int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// next time to timeout</span></span>
<span class="line"><span style="color:#24292E;">	timestamp time.Time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// websocket connection</span></span>
<span class="line"><span style="color:#24292E;">	ws wsConn</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FilterManager</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	logger hclog.Logger</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	store   blockchainInterface</span></span>
<span class="line"><span style="color:#24292E;">	closeCh </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	subscription blockchain.Subscription</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	filters </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Filter</span></span>
<span class="line"><span style="color:#24292E;">	lock    sync.Mutex</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	updateCh </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">	timer    timeHeapImpl</span></span>
<span class="line"><span style="color:#24292E;">	timeout  time.Duration</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	blockStream </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">blockStream</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Filter Manager events get dispatched in the <em>Run</em> method:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (f </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">FilterManager) </span><span style="color:#B392F0;">Run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// watch for new events in the blockchain</span></span>
<span class="line"><span style="color:#E1E4E8;">	watchCh </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">blockchain.Event)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			evnt </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> f.subscription.</span><span style="color:#79B8FF;">GetEvent</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> evnt </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			watchCh </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;"> evnt</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> timeoutCh </span><span style="color:#F97583;">&lt;-chan</span><span style="color:#E1E4E8;"> time.Time</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// check for the next filter to be removed</span></span>
<span class="line"><span style="color:#E1E4E8;">		filter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> f.</span><span style="color:#79B8FF;">nextTimeoutFilter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> filter </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			timeoutCh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			timeoutCh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.</span><span style="color:#79B8FF;">After</span><span style="color:#E1E4E8;">(filter.timestamp.</span><span style="color:#79B8FF;">Sub</span><span style="color:#E1E4E8;">(time.</span><span style="color:#79B8FF;">Now</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> evnt </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">watchCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// new blockchain event</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> f.</span><span style="color:#79B8FF;">dispatchEvent</span><span style="color:#E1E4E8;">(evnt); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				f.logger.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;failed to dispatch event&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;err&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">timeoutCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// timeout for filter</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">f.</span><span style="color:#79B8FF;">Uninstall</span><span style="color:#E1E4E8;">(filter.id) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				f.logger.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;failed to uninstall filter&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">, filter.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">f.updateCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// there is a new filter, reset the loop to start the timeout timer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">f.closeCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// stop the filter manager</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (f </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">FilterManager) </span><span style="color:#6F42C1;">Run</span><span style="color:#24292E;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// watch for new events in the blockchain</span></span>
<span class="line"><span style="color:#24292E;">	watchCh </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">blockchain.Event)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			evnt </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> f.subscription.</span><span style="color:#005CC5;">GetEvent</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> evnt </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			watchCh </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;"> evnt</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> timeoutCh </span><span style="color:#D73A49;">&lt;-chan</span><span style="color:#24292E;"> time.Time</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// check for the next filter to be removed</span></span>
<span class="line"><span style="color:#24292E;">		filter </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> f.</span><span style="color:#005CC5;">nextTimeoutFilter</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> filter </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			timeoutCh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			timeoutCh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.</span><span style="color:#005CC5;">After</span><span style="color:#24292E;">(filter.timestamp.</span><span style="color:#005CC5;">Sub</span><span style="color:#24292E;">(time.</span><span style="color:#005CC5;">Now</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> evnt </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">watchCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// new blockchain event</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> f.</span><span style="color:#005CC5;">dispatchEvent</span><span style="color:#24292E;">(evnt); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				f.logger.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;failed to dispatch event&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;err&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">timeoutCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// timeout for filter</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">f.</span><span style="color:#005CC5;">Uninstall</span><span style="color:#24292E;">(filter.id) {</span></span>
<span class="line"><span style="color:#24292E;">				f.logger.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;failed to uninstall filter&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">, filter.id)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">f.updateCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// there is a new filter, reset the loop to start the timeout timer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">f.closeCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// stop the filter manager</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="📜-resources" tabindex="-1">📜 Resources <a class="header-anchor" href="#📜-resources" aria-label="Permalink to &quot;📜 Resources&quot;">​</a></h2><ul><li><strong><a href="https://eth.wiki/json-rpc/API" target="_blank" rel="noreferrer">Ethereum JSON-RPC</a></strong></li></ul>`,19),e=[o];function t(c,r,E,y,i,h){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
