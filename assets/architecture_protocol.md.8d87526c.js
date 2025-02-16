import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.1a91c06a.js";const g=JSON.parse('{"title":"Protocol","description":"","frontmatter":{"id":"protocol","title":"Protocol","head":[["meta",{"property":"og:title","content":"Protocol | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/protocol.md","filePath":"architecture/protocol.md","lastUpdated":1739729557000}'),o={name:"architecture/protocol.md"},l=e(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <strong>Protocol</strong> module contains the logic for the synchronization protocol.</p><p>Lyfebloc Network uses <strong>libp2p</strong> as the networking layer, and on top of that runs <strong>gRPC</strong>.</p><h2 id="grpc-for-other-nodes" tabindex="-1">GRPC for Other Nodes <a class="header-anchor" href="#grpc-for-other-nodes" aria-label="Permalink to &quot;GRPC for Other Nodes&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line highlighted"><span style="color:#E1E4E8;">service V1 {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Returns status information regarding the specific point in time</span></span>
<span class="line"><span style="color:#E1E4E8;">    rpc </span><span style="color:#79B8FF;">GetCurrent</span><span style="color:#E1E4E8;">(google.protobuf.Empty) returns (V1Status);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Returns any type of object (Header, Body, Receipts...)</span></span>
<span class="line"><span style="color:#E1E4E8;">    rpc </span><span style="color:#79B8FF;">GetObjectsByHash</span><span style="color:#E1E4E8;">(HashRequest) returns (Response);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Returns a range of headers</span></span>
<span class="line"><span style="color:#E1E4E8;">    rpc </span><span style="color:#79B8FF;">GetHeaders</span><span style="color:#E1E4E8;">(GetHeadersRequest) returns (Response);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Watches what new blocks get included</span></span>
<span class="line"><span style="color:#E1E4E8;">    rpc </span><span style="color:#79B8FF;">Watch</span><span style="color:#E1E4E8;">(google.protobuf.Empty) returns (stream V1Status);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line highlighted"><span style="color:#24292E;">service V1 {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Returns status information regarding the specific point in time</span></span>
<span class="line"><span style="color:#24292E;">    rpc </span><span style="color:#005CC5;">GetCurrent</span><span style="color:#24292E;">(google.protobuf.Empty) returns (V1Status);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Returns any type of object (Header, Body, Receipts...)</span></span>
<span class="line"><span style="color:#24292E;">    rpc </span><span style="color:#005CC5;">GetObjectsByHash</span><span style="color:#24292E;">(HashRequest) returns (Response);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Returns a range of headers</span></span>
<span class="line"><span style="color:#24292E;">    rpc </span><span style="color:#005CC5;">GetHeaders</span><span style="color:#24292E;">(GetHeadersRequest) returns (Response);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Watches what new blocks get included</span></span>
<span class="line"><span style="color:#24292E;">    rpc </span><span style="color:#005CC5;">Watch</span><span style="color:#24292E;">(google.protobuf.Empty) returns (stream V1Status);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="status-object" tabindex="-1">Status Object <a class="header-anchor" href="#status-object" aria-label="Permalink to &quot;Status Object&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark has-highlighted-lines has-diff vp-code-dark"><code><span class="line highlighted"><span style="color:#E1E4E8;">message V1Status {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> difficulty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> hash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;"> number </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-highlighted-lines has-diff vp-code-light"><code><span class="line highlighted"><span style="color:#24292E;">message V1Status {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> difficulty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">string</span><span style="color:#24292E;"> hash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;"> number </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,7),p=[l];function t(r,c,i,E,y,h){return a(),n("div",null,p)}const u=s(o,[["render",t]]);export{g as __pageData,u as default};
