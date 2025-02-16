import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.1a91c06a.js";const h=JSON.parse('{"title":"Query JSON RPC endpoints","description":"","frontmatter":{"id":"query-json-rpc","title":"Query JSON RPC endpoints","head":[["meta",{"property":"og:title","content":"Query JSON RPC endpoints | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"get-started/json-rpc.md","filePath":"get-started/json-rpc.md","lastUpdated":1739729557000}'),o={name:"get-started/json-rpc.md"},l=e(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The JSON-RPC layer of the Lyfebloc Network provides developers with the functionality of easily interacting with the blockchain, through HTTP requests.</p><p>This example covers using tools like <strong>curl</strong> to query information, as well as starting the chain with a premined account, and sending a transaction.</p><h2 id="step-1-create-a-genesis-file-with-a-premined-account" tabindex="-1">Step 1: Create a genesis file with a premined account <a class="header-anchor" href="#step-1-create-a-genesis-file-with-a-premined-account" aria-label="Permalink to &quot;Step 1: Create a genesis file with a premined account&quot;">​</a></h2><p>To generate a genesis file, run the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">lyfebloc-core</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genesis</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--premine</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x1010101010101010101010101010101010101010</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">lyfebloc-core</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genesis</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--premine</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x1010101010101010101010101010101010101010</span></span></code></pre></div><p>The <strong>premine</strong> flag sets the address that should be included with a starting balance in the <strong>genesis</strong> file.<br> In this case, the address <code>0x1010101010101010101010101010101010101010</code> will have a starting <strong>default balance</strong> of <code>0x3635C9ADC5DEA00000 wei</code>.</p><p>If we wanted to specify a balance, we can separate out the balance and address with a <code>:</code>, like so:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">lyfebloc-core</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genesis</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--premine</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x1010101010101010101010101010101010101010</span><span style="color:#9ECBFF;">:0x123123</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">lyfebloc-core</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genesis</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--premine</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x1010101010101010101010101010101010101010</span><span style="color:#032F62;">:0x123123</span></span></code></pre></div><p>The balance can be either a <code>hex</code> or <code>uint256</code> value.</p><div class="warning custom-block"><p class="custom-block-title">Only premine accounts for which you have a private key!</p><p>If you premine accounts and do not have a private key to access them, you premined balance will not be usable</p></div><h2 id="step-2-start-lyfebloc-network-in-dev-mode" tabindex="-1">Step 2: Start Lyfebloc Network in dev mode <a class="header-anchor" href="#step-2-start-lyfebloc-network-in-dev-mode" aria-label="Permalink to &quot;Step 2: Start Lyfebloc Network in dev mode&quot;">​</a></h2><p>To start Lyfebloc Network in development mode, which is explained in the <a href="/docs/get-started/cli-commands">CLI Commands</a> section, run the following:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">lyfebloc-core</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--chain</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genesis.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dev</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--log-level</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">debug</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">lyfebloc-core</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--chain</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genesis.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dev</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--log-level</span><span style="color:#24292E;"> </span><span style="color:#032F62;">debug</span></span></code></pre></div><h2 id="step-3-query-the-account-balance" tabindex="-1">Step 3: Query the account balance <a class="header-anchor" href="#step-3-query-the-account-balance" aria-label="Permalink to &quot;Step 3: Query the account balance&quot;">​</a></h2><p>Now that the client is up and running in dev mode, using the genesis file generated in <strong>step 1</strong>, we can use a tool like <strong>curl</strong> to query the account balance:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-X</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">POST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--data</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;,&quot;method&quot;:&quot;eth_getBalance&quot;,&quot;params&quot;:[&quot;0x1010101010101010101010101010101010101010&quot;, &quot;latest&quot;],&quot;id&quot;:1}&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost:8545</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-X</span><span style="color:#24292E;"> </span><span style="color:#032F62;">POST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;,&quot;method&quot;:&quot;eth_getBalance&quot;,&quot;params&quot;:[&quot;0x1010101010101010101010101010101010101010&quot;, &quot;latest&quot;],&quot;id&quot;:1}&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost:8545</span></span></code></pre></div><p>The command should return the following output:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;id&quot;</span><span style="color:#B392F0;">:1,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;result&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;0x100000000000000000000000000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;id&quot;</span><span style="color:#6F42C1;">:1,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;result&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;0x100000000000000000000000000&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="step-4-send-a-transfer-transaction" tabindex="-1">Step 4: Send a transfer transaction <a class="header-anchor" href="#step-4-send-a-transfer-transaction" aria-label="Permalink to &quot;Step 4: Send a transfer transaction&quot;">​</a></h2><p>Now that we&#39;ve confirmed the account we set up as premined has the correct balance, we can transfer some ether:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> Web3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;web3&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">web3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Web3</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;provider&#39;s websocket jsonrpc address&gt;&quot;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">//example: ws://localhost:10002/ws</span></span>
<span class="line"><span style="color:#E1E4E8;">web3.eth.accounts</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">signTransaction</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      to: </span><span style="color:#9ECBFF;">&quot;&lt;recipient address&gt;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      value: web3.utils.</span><span style="color:#B392F0;">toWei</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;value in ETH&gt;&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      gas: </span><span style="color:#79B8FF;">21000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;&lt;private key from premined account&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">signedTxData</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    web3.eth</span></span>
<span class="line"><span style="color:#E1E4E8;">      .</span><span style="color:#B392F0;">sendSignedTransaction</span><span style="color:#E1E4E8;">(signedTxData.rawTransaction)</span></span>
<span class="line"><span style="color:#E1E4E8;">      .</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;receipt&quot;</span><span style="color:#E1E4E8;">, console.log);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> Web3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;web3&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">web3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Web3</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;provider&#39;s websocket jsonrpc address&gt;&quot;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">//example: ws://localhost:10002/ws</span></span>
<span class="line"><span style="color:#24292E;">web3.eth.accounts</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">signTransaction</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      to: </span><span style="color:#032F62;">&quot;&lt;recipient address&gt;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      value: web3.utils.</span><span style="color:#6F42C1;">toWei</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;value in ETH&gt;&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      gas: </span><span style="color:#005CC5;">21000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;&lt;private key from premined account&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">signedTxData</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    web3.eth</span></span>
<span class="line"><span style="color:#24292E;">      .</span><span style="color:#6F42C1;">sendSignedTransaction</span><span style="color:#24292E;">(signedTxData.rawTransaction)</span></span>
<span class="line"><span style="color:#24292E;">      .</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;receipt&quot;</span><span style="color:#24292E;">, console.log);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span></code></pre></div>`,22),p=[l];function t(c,r,i,y,E,d){return a(),n("div",null,p)}const g=s(o,[["render",t]]);export{h as __pageData,g as default};
