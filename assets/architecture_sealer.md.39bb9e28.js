import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1a91c06a.js";const u=JSON.parse('{"title":"Sealer","description":"","frontmatter":{"id":"sealer","title":"Sealer","head":[["meta",{"property":"og:title","content":"Sealer | Lyfebloc Docs"}],["meta",{"property":"og:description","content":"Lyfebloc Network is a highly scalable modular blockchain powering dynamic applications with extensive full-stack adaptability."}]]},"headers":[],"relativePath":"architecture/sealer.md","filePath":"architecture/sealer.md","lastUpdated":1739729557000}'),p={name:"architecture/sealer.md"},e=l(`<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <strong>Sealer</strong> is an entity that gathers the transactions, and creates a new block.<br> Then, that block is sent to the <strong>Consensus</strong> module to seal it.</p><p>The final sealing logic is located within the <strong>Consensus</strong> module.</p><h2 id="run-method" tabindex="-1">Run Method <a class="header-anchor" href="#run-method" aria-label="Permalink to &quot;Run Method&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (s </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Sealer) </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(ctx context.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	sub </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> s.blockchain.</span><span style="color:#79B8FF;">SubscribeEvents</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	eventCh </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> sub.</span><span style="color:#79B8FF;">GetEventCh</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> s.config.DevMode {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// In dev-mode we wait for new transactions to seal blocks</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">s.wakeCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">ctx.</span><span style="color:#79B8FF;">Done</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// start sealing</span></span>
<span class="line"><span style="color:#E1E4E8;">		subCtx, cancel </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">WithCancel</span><span style="color:#E1E4E8;">(ctx)</span></span>
<span class="line"><span style="color:#E1E4E8;">		done </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> s.</span><span style="color:#79B8FF;">sealAsync</span><span style="color:#E1E4E8;">(subCtx)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// wait for the sealing to be done</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">done:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// the sealing process has finished</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">ctx.</span><span style="color:#79B8FF;">Done</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// the sealing routine has been canceled</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">eventCh:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// there is a new head, reset sealer</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// cancel the sealing process context</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">cancel</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#79B8FF;">Err</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (s </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Sealer) </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(ctx context.Context) {</span></span>
<span class="line"><span style="color:#24292E;">	sub </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> s.blockchain.</span><span style="color:#005CC5;">SubscribeEvents</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	eventCh </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> sub.</span><span style="color:#005CC5;">GetEventCh</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> s.config.DevMode {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// In dev-mode we wait for new transactions to seal blocks</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">s.wakeCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">ctx.</span><span style="color:#005CC5;">Done</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// start sealing</span></span>
<span class="line"><span style="color:#24292E;">		subCtx, cancel </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">WithCancel</span><span style="color:#24292E;">(ctx)</span></span>
<span class="line"><span style="color:#24292E;">		done </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> s.</span><span style="color:#005CC5;">sealAsync</span><span style="color:#24292E;">(subCtx)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// wait for the sealing to be done</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">done:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// the sealing process has finished</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">ctx.</span><span style="color:#005CC5;">Done</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// the sealing routine has been canceled</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">eventCh:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// there is a new head, reset sealer</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// cancel the sealing process context</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">cancel</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ctx.</span><span style="color:#005CC5;">Err</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The <strong>Sealer</strong> and the <strong>Consensus</strong> modules will be combined into a single entity in the future.</p><p>:::</p>`,7),o=[e];function t(c,r,E,y,i,h){return n(),a("div",null,o)}const D=s(p,[["render",t]]);export{u as __pageData,D as default};
