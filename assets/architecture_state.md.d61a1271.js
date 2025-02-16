import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1a91c06a.js";const d=JSON.parse('{"title":"State","description":"","frontmatter":{"id":"state","title":"State","head":[["meta",{"property":"og:title","content":"State | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/state.md","filePath":"architecture/state.md","lastUpdated":1739729557000}'),p={name:"architecture/state.md"},o=l(`<p>To truly understand how <strong>State</strong> works, you must understand some basic Ethereum concepts.<br></p><p>We highly recommend reading the <strong><a href="/docs/concepts/ethereum-state">State in Ethereum guide</a></strong>.</p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Now that we&#39;ve familiarized ourselves with basic Ethereum concepts, the next overview should be easy.</p><p>We mentioned that the <strong>World state trie</strong> has all the Ethereum accounts that exist. <br> These accounts are the leaves of the Merkle trie. Each leaf has encoded <strong>Account State</strong> information.</p><p>This enables Lyfebloc Network to get a specific Merkle trie, for a specific point in time. <br> For example, we can get the hash of the state at block 10.</p><p>The Merkle trie, at any point in time, is called a <em><strong>Snapshot</strong></em>.</p><p>We can have <em><strong>Snapshots</strong></em> for the <strong>state trie</strong>, or for the <strong>storage trie</strong> - they are basically the same. <br> The only difference is in what the leaves represent:</p><ul><li>In the case of the storage trie, the leaves contain an arbitrary state, which we cannot process or know what&#39;s in there</li><li>In the case of the state trie, the leaves represent accounts</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">State</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Gets a snapshot for a specific hash</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">NewSnapshotAt</span><span style="color:#E1E4E8;">(types.Hash) (Snapshot, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Gets the latest snapshot</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">NewSnapshot</span><span style="color:#E1E4E8;">() Snapshot</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Gets the codeHash</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">GetCode</span><span style="color:#E1E4E8;">(hash types.Hash) ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">State</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Gets a snapshot for a specific hash</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">NewSnapshotAt</span><span style="color:#24292E;">(types.Hash) (Snapshot, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Gets the latest snapshot</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">NewSnapshot</span><span style="color:#24292E;">() Snapshot</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Gets the codeHash</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">GetCode</span><span style="color:#24292E;">(hash types.Hash) ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The <strong>Snapshot</strong> interface is defined as such:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Snapshot</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Gets a specific value for a leaf</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">(k []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">) ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Commits new information</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">Commit</span><span style="color:#E1E4E8;">(objs []</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Object) (Snapshot, []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Snapshot</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Gets a specific value for a leaf</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">(k []</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">) ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Commits new information</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">Commit</span><span style="color:#24292E;">(objs []</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Object) (Snapshot, []</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The information that can be committed is defined by the <em>Object struct</em>:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Object is the serialization of the radix object</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Address  types.Address</span></span>
<span class="line"><span style="color:#E1E4E8;">	CodeHash types.Hash</span></span>
<span class="line"><span style="color:#E1E4E8;">	Balance  </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">big.Int</span></span>
<span class="line"><span style="color:#E1E4E8;">	Root     types.Hash</span></span>
<span class="line"><span style="color:#E1E4E8;">	Nonce    </span><span style="color:#F97583;">uint64</span></span>
<span class="line"><span style="color:#E1E4E8;">	Deleted  </span><span style="color:#F97583;">bool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	DirtyCode </span><span style="color:#F97583;">bool</span></span>
<span class="line"><span style="color:#E1E4E8;">	Code      []</span><span style="color:#F97583;">byte</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	Storage []</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">StorageObject</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Object is the serialization of the radix object</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	Address  types.Address</span></span>
<span class="line"><span style="color:#24292E;">	CodeHash types.Hash</span></span>
<span class="line"><span style="color:#24292E;">	Balance  </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">big.Int</span></span>
<span class="line"><span style="color:#24292E;">	Root     types.Hash</span></span>
<span class="line"><span style="color:#24292E;">	Nonce    </span><span style="color:#D73A49;">uint64</span></span>
<span class="line"><span style="color:#24292E;">	Deleted  </span><span style="color:#D73A49;">bool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	DirtyCode </span><span style="color:#D73A49;">bool</span></span>
<span class="line"><span style="color:#24292E;">	Code      []</span><span style="color:#D73A49;">byte</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	Storage []</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">StorageObject</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The implementation for the Merkle trie is in the <em>state/immutable-trie</em> folder. <br><em>state/immutable-trie/state.go</em> implements the <strong>State</strong> interface.</p><p><em>state/immutable-trie/trie.go</em> is the main Merkle trie object. It represents an optimized version of the Merkle trie, which reuses as much memory as possible.</p><h2 id="executor" tabindex="-1">Executor <a class="header-anchor" href="#executor" aria-label="Permalink to &quot;Executor&quot;">​</a></h2><p><em>state/executor.go</em> includes all the information needed for Lyfebloc Network to decide how a block changes the current state. The implementation of <em>ProcessBlock</em> is located here.</p><p>The <em>apply</em> method does the actual state transition. The executor calls the EVM.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (t </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Transition) </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(msg </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">types.Transaction) ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">uint64</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// check if there is enough gas in the pool</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> t.</span><span style="color:#79B8FF;">subGasPool</span><span style="color:#E1E4E8;">(msg.Gas); err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	txn </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> t.state</span></span>
<span class="line"><span style="color:#E1E4E8;">	s </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> txn.</span><span style="color:#79B8FF;">Snapshot</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	gas, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> t.</span><span style="color:#79B8FF;">preCheck</span><span style="color:#E1E4E8;">(msg)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> gas </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> msg.Gas {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, errorVMOutOfGas</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	gasPrice </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">SetBytes</span><span style="color:#E1E4E8;">(msg.</span><span style="color:#79B8FF;">GetGasPrice</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	value </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">SetBytes</span><span style="color:#E1E4E8;">(msg.Value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Set the specific transaction fields in the context</span></span>
<span class="line"><span style="color:#E1E4E8;">	t.ctx.GasPrice </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> types.</span><span style="color:#79B8FF;">BytesToHash</span><span style="color:#E1E4E8;">(msg.</span><span style="color:#79B8FF;">GetGasPrice</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	t.ctx.Origin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> msg.From</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> subErr </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> gasLeft </span><span style="color:#F97583;">uint64</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> returnValue []</span><span style="color:#F97583;">byte</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> msg.</span><span style="color:#79B8FF;">IsContractCreation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">		_, gasLeft, subErr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> t.</span><span style="color:#79B8FF;">Create2</span><span style="color:#E1E4E8;">(msg.From, msg.Input, value, gas)</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		txn.</span><span style="color:#79B8FF;">IncrNonce</span><span style="color:#E1E4E8;">(msg.From)</span></span>
<span class="line"><span style="color:#E1E4E8;">		returnValue, gasLeft, subErr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> t.</span><span style="color:#79B8FF;">Call2</span><span style="color:#E1E4E8;">(msg.From, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">msg.To, msg.Input, value, gas)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> subErr </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> subErr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> runtime.ErrNotEnoughFunds {</span></span>
<span class="line"><span style="color:#E1E4E8;">			txn.</span><span style="color:#79B8FF;">RevertToSnapshot</span><span style="color:#E1E4E8;">(s)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, subErr</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	gasUsed </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> msg.Gas </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> gasLeft</span></span>
<span class="line"><span style="color:#E1E4E8;">	refund </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gasUsed </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> refund </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> txn.</span><span style="color:#79B8FF;">GetRefund</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">		refund </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> txn.</span><span style="color:#79B8FF;">GetRefund</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	gasLeft </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> refund</span></span>
<span class="line"><span style="color:#E1E4E8;">	gasUsed </span><span style="color:#F97583;">-=</span><span style="color:#E1E4E8;"> refund</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// refund the sender</span></span>
<span class="line"><span style="color:#E1E4E8;">	remaining </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">Mul</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">SetUint64</span><span style="color:#E1E4E8;">(gasLeft), gasPrice)</span></span>
<span class="line"><span style="color:#E1E4E8;">	txn.</span><span style="color:#79B8FF;">AddBalance</span><span style="color:#E1E4E8;">(msg.From, remaining)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// pay the coinbase</span></span>
<span class="line"><span style="color:#E1E4E8;">	coinbaseFee </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">Mul</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(big.Int).</span><span style="color:#79B8FF;">SetUint64</span><span style="color:#E1E4E8;">(gasUsed), gasPrice)</span></span>
<span class="line"><span style="color:#E1E4E8;">	txn.</span><span style="color:#79B8FF;">AddBalance</span><span style="color:#E1E4E8;">(t.ctx.Coinbase, coinbaseFee)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// return gas to the pool</span></span>
<span class="line"><span style="color:#E1E4E8;">	t.</span><span style="color:#79B8FF;">addGasPool</span><span style="color:#E1E4E8;">(gasLeft)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> returnValue, gasUsed, subErr </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (t </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Transition) </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(msg </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">types.Transaction) ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">uint64</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// check if there is enough gas in the pool</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> t.</span><span style="color:#005CC5;">subGasPool</span><span style="color:#24292E;">(msg.Gas); err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	txn </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> t.state</span></span>
<span class="line"><span style="color:#24292E;">	s </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> txn.</span><span style="color:#005CC5;">Snapshot</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	gas, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> t.</span><span style="color:#005CC5;">preCheck</span><span style="color:#24292E;">(msg)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> gas </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> msg.Gas {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, errorVMOutOfGas</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	gasPrice </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">SetBytes</span><span style="color:#24292E;">(msg.</span><span style="color:#005CC5;">GetGasPrice</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	value </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">SetBytes</span><span style="color:#24292E;">(msg.Value)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Set the specific transaction fields in the context</span></span>
<span class="line"><span style="color:#24292E;">	t.ctx.GasPrice </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> types.</span><span style="color:#005CC5;">BytesToHash</span><span style="color:#24292E;">(msg.</span><span style="color:#005CC5;">GetGasPrice</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	t.ctx.Origin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> msg.From</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> subErr </span><span style="color:#D73A49;">error</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> gasLeft </span><span style="color:#D73A49;">uint64</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> returnValue []</span><span style="color:#D73A49;">byte</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> msg.</span><span style="color:#005CC5;">IsContractCreation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">		_, gasLeft, subErr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> t.</span><span style="color:#005CC5;">Create2</span><span style="color:#24292E;">(msg.From, msg.Input, value, gas)</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		txn.</span><span style="color:#005CC5;">IncrNonce</span><span style="color:#24292E;">(msg.From)</span></span>
<span class="line"><span style="color:#24292E;">		returnValue, gasLeft, subErr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> t.</span><span style="color:#005CC5;">Call2</span><span style="color:#24292E;">(msg.From, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">msg.To, msg.Input, value, gas)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> subErr </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> subErr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> runtime.ErrNotEnoughFunds {</span></span>
<span class="line"><span style="color:#24292E;">			txn.</span><span style="color:#005CC5;">RevertToSnapshot</span><span style="color:#24292E;">(s)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, subErr</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	gasUsed </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> msg.Gas </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> gasLeft</span></span>
<span class="line"><span style="color:#24292E;">	refund </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gasUsed </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> refund </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> txn.</span><span style="color:#005CC5;">GetRefund</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">		refund </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> txn.</span><span style="color:#005CC5;">GetRefund</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	gasLeft </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> refund</span></span>
<span class="line"><span style="color:#24292E;">	gasUsed </span><span style="color:#D73A49;">-=</span><span style="color:#24292E;"> refund</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// refund the sender</span></span>
<span class="line"><span style="color:#24292E;">	remaining </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">Mul</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">SetUint64</span><span style="color:#24292E;">(gasLeft), gasPrice)</span></span>
<span class="line"><span style="color:#24292E;">	txn.</span><span style="color:#005CC5;">AddBalance</span><span style="color:#24292E;">(msg.From, remaining)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// pay the coinbase</span></span>
<span class="line"><span style="color:#24292E;">	coinbaseFee </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">Mul</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(big.Int).</span><span style="color:#005CC5;">SetUint64</span><span style="color:#24292E;">(gasUsed), gasPrice)</span></span>
<span class="line"><span style="color:#24292E;">	txn.</span><span style="color:#005CC5;">AddBalance</span><span style="color:#24292E;">(t.ctx.Coinbase, coinbaseFee)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// return gas to the pool</span></span>
<span class="line"><span style="color:#24292E;">	t.</span><span style="color:#005CC5;">addGasPool</span><span style="color:#24292E;">(gasLeft)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> returnValue, gasUsed, subErr </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="runtime" tabindex="-1">Runtime <a class="header-anchor" href="#runtime" aria-label="Permalink to &quot;Runtime&quot;">​</a></h2><p>When a state transition is executed, the main module that executes the state transition is the EVM (located in state/runtime/evm).</p><p>The <strong>dispatch table</strong> does a match between the <strong>opcode</strong> and the instruction.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// unsigned arithmetic operations</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(STOP, handler{opStop, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(ADD, handler{opAdd, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(SUB, handler{opSub, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(MUL, handler{opMul, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(DIV, handler{opDiv, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(SDIV, handler{opSDiv, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(MOD, handler{opMod, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(SMOD, handler{opSMod, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(EXP, handler{opExp, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// jumps</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(JUMP, handler{opJump, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(JUMPI, handler{opJumpi, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">register</span><span style="color:#E1E4E8;">(JUMPDEST, handler{opJumpDest, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// unsigned arithmetic operations</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(STOP, handler{opStop, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(ADD, handler{opAdd, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(SUB, handler{opSub, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(MUL, handler{opMul, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(DIV, handler{opDiv, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(SDIV, handler{opSDiv, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(MOD, handler{opMod, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(SMOD, handler{opSMod, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(EXP, handler{opExp, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// jumps</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(JUMP, handler{opJump, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(JUMPI, handler{opJumpi, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">register</span><span style="color:#24292E;">(JUMPDEST, handler{opJumpDest, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The core logic that powers the EVM is the <em>Run</em> loop. <br></p><p>This is the main entry point for the EVM. It does a loop and checks the current opcode, fetches the instruction, checks if it can be executed, consumes gas and executes the instruction until it either fails or stops.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Run executes the virtual machine</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">state) </span><span style="color:#B392F0;">Run</span><span style="color:#E1E4E8;">() ([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> vmerr </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	codeSize </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(c.code)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">c.stop {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> c.ip </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> codeSize {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">halt</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		op </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">OpCode</span><span style="color:#E1E4E8;">(c.code[c.ip])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		inst </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> dispatchTable[op]</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> inst.inst </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;">(errOpCodeNotFound)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// check if the depth of the stack is enough for the instruction</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> c.sp </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> inst.stack {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;">(errStackUnderflow)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// consume the gas of the instruction</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">c.</span><span style="color:#79B8FF;">consumeGas</span><span style="color:#E1E4E8;">(inst.gas) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;">(errOutOfGas)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// execute the instruction</span></span>
<span class="line"><span style="color:#E1E4E8;">		inst.</span><span style="color:#79B8FF;">inst</span><span style="color:#E1E4E8;">(c)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// check if stack size exceeds the max size</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> c.sp </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> stackSize {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;">(errStackOverflow)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">		c.ip</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> c.err; err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		vmerr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c.ret, vmerr</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Run executes the virtual machine</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">state) </span><span style="color:#6F42C1;">Run</span><span style="color:#24292E;">() ([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> vmerr </span><span style="color:#D73A49;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	codeSize </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(c.code)</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">c.stop {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> c.ip </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> codeSize {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">halt</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		op </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">OpCode</span><span style="color:#24292E;">(c.code[c.ip])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		inst </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> dispatchTable[op]</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> inst.inst </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">exit</span><span style="color:#24292E;">(errOpCodeNotFound)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// check if the depth of the stack is enough for the instruction</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> c.sp </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> inst.stack {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">exit</span><span style="color:#24292E;">(errStackUnderflow)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// consume the gas of the instruction</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">c.</span><span style="color:#005CC5;">consumeGas</span><span style="color:#24292E;">(inst.gas) {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">exit</span><span style="color:#24292E;">(errOutOfGas)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// execute the instruction</span></span>
<span class="line"><span style="color:#24292E;">		inst.</span><span style="color:#005CC5;">inst</span><span style="color:#24292E;">(c)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// check if stack size exceeds the max size</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> c.sp </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> stackSize {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">exit</span><span style="color:#24292E;">(errStackOverflow)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">		c.ip</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> c.err; err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		vmerr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c.ret, vmerr</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,27),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const C=s(p,[["render",t]]);export{d as __pageData,C as default};
