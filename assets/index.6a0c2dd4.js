var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,i=(e,t)=>{for(var n in t||(t={}))r.call(t,n)&&s(e,n,t[n]);if(o)for(var n of o(t))a.call(t,n)&&s(e,n,t[n]);return e},c=(e,o)=>t(e,n(o));import{T as l,c as d,K as u,o as f,a as g,p,s as h,b as m,d as w,e as y,f as $,u as b,g as v,S as x,i as k,h as E,R as O,j as P,m as S,n as j,t as L,k as M,l as I,q as z,r as C,v as _,w as T,x as A,y as X,z as B,A as D,B as W,C as Y,D as R,E as N,F as U,G as V,H as F,I as H,J as K,L as Z,M as q,N as G,O as J,P as Q,Q as ee,U as te,V as ne,W as oe,X as re,Y as ae,Z as se,_ as ie,$ as ce,a0 as le,a1 as de,a2 as ue,a3 as fe,a4 as ge,a5 as pe,a6 as he}from"./vendor.6ce12853.js";const me={ready:!1,layout:"default"},we={keys:Object.keys(me),module:e=>{e.on("@init",(()=>me)),e.on("ready",(()=>({ready:!0}))),e.on("updateLayout",((e,t)=>c(i({},e),{layout:t})))}};var ye,$e,be,ve,xe,ke;($e=ye||(ye={})).image="IMAGE",$e.text="TEXT",(be||(be={})).username="USERNAME",(ve||(ve={})).input="input",(ke=xe||(xe={})).stage="stage",ke.widget="widget";const Ee=[{label:"左对齐",value:"left"},{label:"居中",value:"center"},{label:"右对齐",value:"right"}],Oe=[{label:"正常",value:"normal"},{label:"粗体",value:"bold"},{label:"斜体",value:"italic"},{label:"斜粗",value:"italic bold"}];class Pe{}class Se{}var je=Object.defineProperty,Le=Object.getOwnPropertyDescriptor;class Me{get id(){return this.property.id}}((e,t,n,o)=>{for(var r,a=o>1?void 0:o?Le(t,n):t,s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o?r(t,n,a):r(a))||a);o&&a&&je(t,n,a)})([l((()=>Se))],Me.prototype,"property",2);var Ie=Object.defineProperty,ze=Object.getOwnPropertyDescriptor;class Ce extends Me{constructor(){super(...arguments),this.widgetType=ye.image}}((e,t,n,o)=>{for(var r,a=o>1?void 0:o?ze(t,n):t,s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o?r(t,n,a):r(a))||a);o&&a&&Ie(t,n,a)})([l((()=>Pe))],Ce.prototype,"imageProperty",2);class _e{}var Te=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor;class Xe extends Me{constructor(){super(...arguments),this.widgetType=ye.text}}((e,t,n,o)=>{for(var r,a=o>1?void 0:o?Ae(t,n):t,s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o?r(t,n,a):r(a))||a);o&&a&&Te(t,n,a)})([l((()=>_e))],Xe.prototype,"textProperty",2);const Be={[ye.text]:function(e="请输入文本"){const t=new Xe;return t.property=function(){const e=new Se;return e.id=Math.random().toString(32).slice(2),e.height=60,e.width=200,e.opacity=1,e.rotation=0,e.scaleX=1,e.scaleY=1,e.x=0,e.y=0,e}(),t.textProperty=function(e){const t=new _e;return t.fill="#000",t.fontFamily="Arial",t.align="left",t.fontSize=32,t.fontStyle="normal",t.text=e,t}(e),t},[ye.image]:function(e){const t=new Ce;return t.property=function(){const e=new Se;return e.id=Math.random().toString(32).slice(2),e.height=100,e.width=100,e.opacity=1,e.rotation=0,e.scaleX=1,e.scaleY=1,e.x=0,e.y=0,e}(),t.imageProperty=function(e){const t=new Pe;return t.url=e,t}(e),t}};function De(e,t){const n=Be[e];if(!n)throw Error("不存在该组件类型");return n(t)}function We(e){const t=d(e);return t.property.id=Math.random().toString(32).slice(2),t}const Ye={cloudbase:{env:"test-4glnlr77348551c8",region:"ap-shanghai"},editor:{content:{scale:3,width:1080,height:1920}}},Re={Text:function(e){e.on(ve.input,(()=>{!function(e,t){const{widgets:n}=kt.get(),o=n.find((t=>t.id===e.id()));if(!o)return;kt.dispatch("updateWidget",{id:o.id,textProperty:i(i({},o.textProperty),t)})}(e,{text:e.text()})}))},Image:function(){}};function Ne(e,t){const{widgets:n}=kt.get(),o=n.find((t=>t.id===e.id()));o&&kt.dispatch("updateWidget",{id:o.id,property:i(i({},o.property),t)})}function Ue(e){const t=e.container(),{content:n}=Fe(),{width:o,height:r}=Ye.editor.content;e.width(t.offsetWidth),e.height(t.offsetHeight),n.x(t.offsetWidth/2-o*n.scaleX()/2),n.y(t.offsetHeight/2-r*n.scaleY()/2),n.draw()}function Ve(e){const t=e.clientWidth,n=e.clientHeight,o=new u.Stage({container:e,width:t,height:n}),{content:r,background:a}=function(e){const{width:t,height:n,scale:o}=Ye.editor.content,r=new u.Layer({name:"content",x:e.width()/2-t/2,y:e.height()/2-n/2,scaleX:1/o,scaleY:1/o,clip:{x:0,y:0,width:t,height:n}});kt.dispatch("updateSize",{width:t,height:n});const a=new u.Layer({name:"background"});return{content:r,background:a}}(o);return o.add(r),o.add(a),r.draw(),a.draw(),kt.dispatch("updateStage",o),o}function Fe(){const{stage:e}=kt.get();if(!e)throw"请初始化Stage";const t=e.getLayers();return{content:t.find((e=>"content"===e.name())),background:t.find((e=>"background"===e.name()))}}const He=["background"],Ke={Text:["top-center","bottom-center","middle-right","middle-left"],Image:["top-left","top-right","bottom-left","bottom-right"],default:["top-left","top-right","bottom-left","bottom-right"]};function Ze(e){return e.find("Transformer").find((e=>"selected"===e.name()))}function qe(e,t){return e.find("Transformer").find((e=>e.nodes().includes(t)))}function Ge(e,t,n=!1){const o=new u.Transformer({keepRatio:!0,resizeEnabled:n,rotateEnabled:n});if(1===t.length){const[e]=t;o.enabledAnchors((r=e.getClassName(),Ke[r]||Ke.default))}var r;return o.nodes(t),e.add(o),e.draw(),(n||t.length>1)&&o.name("selected"),o}function Je(e){e.find("Transformer").forEach((e=>e.destroy())),e.draw()}function Qe(e){const{content:t}=Fe();e.on("mousedown",(n=>{if(n.target===e)return Je(e),void kt.dispatch("updateSelected",[]);return t.findOne((e=>He.includes(n.target.name())))?(Je(e),void kt.dispatch("updateSelected",[])):void 0}))}async function et(e){const t=await fetch(e),n=await t.blob();return new Promise((e=>{const t=new FileReader;t.readAsDataURL(n),t.onloadend=()=>{const n=t.result;e(n)}}))}function tt(e){const t=e.getLayer(),n=t.getLayer(),o=n.offsetX()+e.absolutePosition().x,r=n.offsetY()+e.absolutePosition().y,a=document.createElement("textarea");document.getElementById("canvas-container").appendChild(a),a.value=e.text(),a.style.position="absolute",a.style.top=r+"px",a.style.left=o+"px",a.style.width=e.width()-2*e.padding()+"px",a.style.height=e.height()-2*e.padding()+5+"px",a.style.fontSize=`${e.fontSize()}px`,a.style.border="none",a.style.padding="0px",a.style.margin="0px",a.style.overflow="hidden",a.style.background="none",a.style.outline="none",a.style.resize="none",a.style.wordBreak="break-all",a.style.fontFamily=e.fontFamily(),a.style.transformOrigin="left top",a.style.textAlign=e.align(),a.style.color=e.fill(),a.style.transform=`rotateZ(${e.rotation()}deg) scale(${t.scaleX()})`,a.focus(),a.addEventListener("keydown",(function(e){"Enter"!==e.key||e.shiftKey||a.blur()})),a.addEventListener("blur",(function(t){e.text(a.value),e.fire(ve.input),a.parentNode.removeChild(a),e.show()}))}const nt={[ye.text]:function(e){const{preview:t}=kt.get(),n=new u.Text(i(i({},f(["zIndex"],e.property)),e.textProperty));return t||function(e){e.on("dblclick dbltap",(()=>{e.hide(),tt(e)}))}(n),function(e){e.on("transform",(t=>{e.setAttrs({width:Math.max(e.width()*e.scaleX(),100),height:Math.max(e.height()*e.scaleY(),50),scaleX:1,scaleY:1})}))}(n),n},[ye.image]:function(e){const t=new Image,n=new u.Image(c(i({},f(["zIndex"],e.property)),{image:t}));return et(e.imageProperty.url).then((e=>{t.src=e})),function(e){e.on("transform",(t=>{e.setAttrs({width:Math.max(e.width()*e.scaleX()),height:Math.max(e.height()*e.scaleY()),scaleX:1,scaleY:1})}))}(n),n}};function ot(e){const t=nt[e.widgetType],{preview:n}=kt.get();if(!t)throw Error("组件类型不存在");const o=t(e);return o.draggable(!n),o}function rt(e,t,n=!0){const{content:o,background:r}=Fe(),{preview:a}=kt.get();a||function(e,t){const{background:n}=Fe();t.on("mouseenter",(o=>{qe(e,t)||Ge(n,[t],!1)})),t.on("mouseout",(n=>{const o=qe(e,t);o&&"selected"!==o.name()&&o.destroy()})),t.on("mousedown",(o=>{const r=Ze(e),a=qe(e,t);if(a&&a===r)return;const s=o.evt.ctrlKey&&r?[...r.nodes(),t]:[t];Je(e),Ge(n,s,1===s.length),kt.dispatch("updateSelected",s.map((e=>e.id())))}))}(e,t),Je(e),n&&!a&&Ge(r,[t],!0),function(e){e.on("transformend",(()=>{Ne(e,{x:Math.round(e.x()),y:Math.round(e.y()),width:Math.round(e.width()),height:Math.round(e.height()),scaleX:Math.round(e.scaleX()),scaleY:Math.round(e.scaleY()),rotation:Math.round(e.rotation())})})),e.on("dragend",(()=>{Ne(e,{x:Math.round(e.x()),y:Math.round(e.y())})}));const t=Re[e.getClassName()];t&&t(e)}(t),o.add(t)}function at(e){const t=Ze(e);if(!t)return;return t.getNodes().filter((e=>e.visible()))}function st(){const{content:e}=Fe(),{width:t,height:n}=Ye.editor.content,o=new u.Rect({width:t,height:n,fill:"#fff",name:"background"});e.add(o)}function it(e){const t=g(e.widgets);e.stage.width(),e.stage.height();return{widgets:t,selected:[...e.selected],page:{size:{width:e.stage.width(),height:e.stage.height()},background:e.page.background,title:e.page.title}}}function ct(e){return{widgets:p(Me,e.widgets),page:i({},e.page),selected:e.selected}}function lt(e){return e.history.forward=[],e.history.backward.push(it(e)),{history:{forward:e.history.forward,backward:e.history.backward}}}function dt(e){const t=e.history.backward.pop();if(t)return c(i({},ct(t)),{history:{backward:[...e.history.backward],forward:[...e.history.forward,it(e)]}})}function ut(e){const t=e.history.forward.pop();if(t)return c(i({},ct(t)),{history:{backward:[...e.history.backward,it(e)],forward:[...e.history.forward]}})}const ft={stage:void 0,page:{size:{width:Ye.editor.content.width,height:Ye.editor.content.height},title:"未命名",background:""},selected:[],copied:[],zoom:1,widgets:[],history:{backward:[],forward:[]},preview:!1},gt={keys:Object.keys(ft),module:e=>{e.on("@init",(()=>ft)),e.on("updateStage",((e,t)=>c(i({},e),{stage:t}))),e.on("updateSize",((e,t)=>c(i({},e),{size:t}))),e.on("updatePreview",((e,t)=>c(i({},e),{preview:t}))),e.on("updatePage",((e,t)=>c(i({},e),{page:t}))),e.on("updateWidgets",((e,t)=>c(i({},e),{widgets:t}))),e.on("updateSelected",((e,t)=>c(i({},e),{selected:t}))),e.on("updateCopied",((e,t)=>c(i({},e),{copied:t}))),e.on("updateWidget",Ot(ht,{before:[lt]})),e.on("updateZoom",Ot(pt)),e.on("backward",Ot(dt,{after:[bt]})),e.on("forward",Ot(ut,{after:[bt]})),e.on("createWidget",Ot(mt,{before:[lt]})),e.on("deleteWidget",Ot(wt,{before:[lt]})),e.on("updateBackground",Ot(yt,{before:[lt]})),e.on("updateZindex",Ot($t,{before:[lt]})),e.on("renderStage",(e=>(bt(e),e)))}};function pt(e,t){const{scale:n}=Ye.editor.content,{content:o}=Fe();return o.scaleX(1/n*t),o.scaleY(1/n*t),Ue(e.stage),{zoom:t}}function ht(e,t){const n=e.widgets.find((e=>e.id===t.id));return n&&Object.entries(t).forEach((([e,o])=>{"id"!==e&&(n[e]=i(i({},n[e]),t[e]))})),{widgets:e.widgets}}function mt(e,t){const{stage:n,widgets:o}=e,r=t instanceof Me?t:De(t),a=ot(r);return rt(n,a),{widgets:[...o,r],selected:[a.id()]}}function wt(e,t){const{stage:n}=e,o=t instanceof Array?t:[t];return o.forEach((e=>{!function(e,t){const{content:n}=Fe(),[o]=n.getChildren((e=>e.id()===t));o&&(o.destroy(),Je(e))}(n,e)})),{selected:[],widgets:e.widgets.filter((e=>!o.includes[e.id]))}}function yt(e,t){const{stage:n,page:o}=e,r=n.findOne(".background"),a=new Image;return a.onload=()=>{r.fill(""),r.fillPatternImage(a)},a.src=t,{page:{size:e.page.size,title:e.page.title,background:t}}}function $t(e){const{widgets:t,stage:n}=e;return{widgets:t.map((e=>{const t=n.findOne(`#${e.id}`);return e.property.zIndex=t.zIndex(),e}))}}function bt(e){const{stage:t,widgets:n,selected:o,page:r,preview:a}=e,{content:s,background:i}=Fe();var c;if(s.destroyChildren(),Je(t),st(),(c=h([m(w(["property","zIndex"]))])(n),c.map((e=>ot(e)))).forEach((e=>rt(t,e,!1))),!a&&o.length&&Ge(i,o.map((e=>t.findOne(`#${e}`))),1===o.length),r&&r.background){const e=t.findOne(".background"),n=new Image;n.onload=()=>{e.fill(""),e.fillPatternImage(n)},et(r.background).then((e=>{n.src=e}))}}const vt={userid:"",username:""},xt={user:{keys:Object.keys(vt),module:e=>{e.on("@init",(()=>vt)),e.on("login",((e,t)=>c(i({},e),{userid:t,username:t+":name"})))},persist:["userid"]},app:we,editor:gt},kt=y([...Object.values(xt).map((e=>e.module)),$(Object.values(xt).filter((e=>e.persist)).map((e=>e.persist)).flat())]);function Et(e){return b(...e(xt).keys)}function Ot(e,t={after:[],before:[]}){return(n,o)=>{const{before:r=[],after:a=[]}=t,s=r.reduce(((e,t)=>i(i({},e),t(e)||{})),n),c=i(i({},n),e(n,o)),l=a.reduce(((e,t)=>i(i({},e),t(e)||{})),c);return i(i(i({},s),c),l)}}const Pt={"interactive-01":"#1890ff","interactive-04":"#1890ff","layer-selected-inverse":"#1890ff"};function St(e){let t,n;return t=new O({}),{c(){P(t.$$.fragment)},m(e,o){S(t,e,o),n=!0},p:j,i(e){n||(L(t.$$.fragment,e),n=!0)},o(e){M(t.$$.fragment,e),n=!1},d(e){I(t,e)}}}let jt;const Lt={},Mt=function(e,t){if(!t||0===t.length)return e();if(void 0===jt){const e=document.createElement("link").relList;jt=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/app.h5-editor/${e}`)in Lt)return;Lt[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":jt,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))};function It(e){let t,n,o=[{class:"icon"},{viewBox:"0 0 1024 1024"},{xmlns:"http://www.w3.org/2000/svg"},{width:"200"},{height:"200"},e[0]],r={};for(let a=0;a<o.length;a+=1)r=z(r,o[a]);return{c(){t=C("svg"),n=C("path"),this.h()},l(e){t=_(e,"svg",{class:!0,viewBox:!0,xmlns:!0,width:!0,height:!0},1);var o=T(t);n=_(o,"path",{d:!0,fill:!0},1),T(n).forEach(A),o.forEach(A),this.h()},h(){X(n,"d","m544 82.464 323.968 187.072a64 64 0 0 1 32 55.424v374.08a64 64 0 0 1-32 55.424L544 941.536a64 64 0 0 1-64 0L156.032 754.464a64 64 0 0 1-32-55.424V324.96a64 64 0 0 1 32-55.424L480 82.464a64 64 0 0 1 64 0zM810.56 336a32 32 0 0 0-40.384-13.408l-3.328 1.696L512 471.392 257.184 324.288a32 32 0 0 0-35.136 53.376l3.136 2.048L480 526.848V816a32 32 0 0 0 63.776 3.744L544 816V526.848l254.848-147.136A32 32 0 0 0 810.56 336z"),X(n,"fill","#B19C4A"),B(t,r)},m(e,o){D(e,t,o),W(t,n)},p(e,[n]){B(t,r=Y(o,[{class:"icon"},{viewBox:"0 0 1024 1024"},{xmlns:"http://www.w3.org/2000/svg"},{width:"200"},{height:"200"},1&n&&e[0]]))},i:j,o:j,d(e){e&&A(t)}}}function zt(e,t,n){return e.$$set=e=>{n(0,t=z(z({},t),R(e)))},[t=R(t)]}const Ct=[{path:"/",component:()=>Mt((()=>import("./login.4a8393a1.js")),["assets/login.4a8393a1.js","assets/login.0a1b7451.css","assets/vendor.6ce12853.js","assets/vendor.11618b7d.css","assets/page-container.a7021ce2.js","assets/page-container.3a1c8316.css","assets/form-item.eec47ff0.js","assets/form-item.a0cf0e49.css"]),name:"login",auth:!1},{path:"/page-center",component:()=>Mt((()=>import("./page-center.7d5937e6.js")),["assets/page-center.7d5937e6.js","assets/page-center.cd746336.css","assets/vendor.6ce12853.js","assets/vendor.11618b7d.css","assets/page-container.a7021ce2.js","assets/page-container.3a1c8316.css"]),name:"page-center",meta:{menu:{title:"页面中心",icon:class extends x{constructor(e){super(),k(this,e,zt,It,E,{})}}}}},{path:"/page-preview",component:()=>Mt((()=>import("./page-preview.4860f0e9.js")),["assets/page-preview.4860f0e9.js","assets/page-preview.69452742.css","assets/vendor.6ce12853.js","assets/vendor.11618b7d.css","assets/page-container.a7021ce2.js","assets/page-container.3a1c8316.css"]),name:"page-preview"},{path:"/editor",component:()=>Mt((()=>import("./editor.f0c112e6.js")),["assets/editor.f0c112e6.js","assets/editor.f78378ac.css","assets/vendor.6ce12853.js","assets/vendor.11618b7d.css","assets/page-container.a7021ce2.js","assets/page-container.3a1c8316.css","assets/form-item.eec47ff0.js","assets/form-item.a0cf0e49.css"]),name:"editor"}];class _t extends N{constructor(){super(...arguments),this.before=e=>{e.options.header=e.options.header||{},e.options.header["X-UserID"]="001"},this.after=(e,t)=>{}}}class Tt{static init(){Tt.app||(Tt.app=V.init({env:Ye.cloudbase.env,region:Ye.cloudbase.region}),console.log("CLOUDBASE SDK 初始化成功"))}static get(){return Tt.app||Tt.init(),Tt.app}static getUser(){return Tt.get().auth({persistence:"local"}).currentUser}}async function At(){Tt.init()}async function Xt(){U.setConfig({server:"http://api.test.com/",timeout:3e3}),U.interceptors.status.use((e=>!0)),U.interceptors.success.use((e=>e.data)),U.interceptors.error.use((e=>e)),U.requestCatchHandle=e=>{e&&((e.data||{}).message||e.status,403===e.status&&console.error(e.data))},U.installExtendService(new _t),await Promise.all([Promise.resolve(),At()])}const Bt=new F({mode:H,omitTrailingSlash:!0,base:"/app.h5-editor/",routes:Ct});Bt.beforeEach((async(e,t,n)=>{const{ready:o}=kt.get();o||(await Xt(),kt.dispatch("ready")),!e.meta.auth||Tt.getUser()?n():n("/login")}));function Dt(e,t,n){const o=e.slice();return o[4]=t[n],o}function Wt(e){let t,n,o,r,a,s,i,c,l,d=e[4].title+"";var u=e[4].icon;function f(){return e[3](e[4])}return u&&(n=new u({props:{width:28,height:28}})),{c(){t=K("div"),n&&P(n.$$.fragment),o=Z(),r=K("div"),a=q(d),s=Z(),X(r,"class","title text-xs pt-1"),X(t,"class","menu-item m-3 py-2 cursor-pointer active:bg-gray-100 hover:bg-gray-200 flex flex-col justify-center items-center rounded svelte-6ff0y4"),G(t,"active",e[4].name===e[0])},m(e,d){J(e,t,d),n&&S(n,t,null),Q(t,o),Q(t,r),Q(r,a),Q(t,s),i=!0,c||(l=ee(t,"click",f),c=!0)},p(r,a){if(u!==(u=(e=r)[4].icon)){if(n){te();const e=n;M(e.$$.fragment,1,0,(()=>{I(e,1)})),ne()}u?(n=new u({props:{width:28,height:28}}),P(n.$$.fragment),L(n.$$.fragment,1),S(n,t,o)):n=null}3&a&&G(t,"active",e[4].name===e[0])},i(e){i||(n&&L(n.$$.fragment,e),i=!0)},o(e){n&&M(n.$$.fragment,e),i=!1},d(e){e&&A(t),n&&I(n),c=!1,l()}}}function Yt(e){let t,n,o,r,a,s,i,c=e[1],l=[];for(let u=0;u<c.length;u+=1)l[u]=Wt(Dt(e,c,u));const d=e=>M(l[e],1,1,(()=>{l[e]=null}));return{c(){t=K("section"),n=K("div");for(let e=0;e<l.length;e+=1)l[e].c();o=Z(),r=K("div"),r.textContent="2",a=Z(),s=K("div"),s.textContent="3",X(n,"class","menu flex-auto svelte-6ff0y4"),X(r,"class","toolbar svelte-6ff0y4"),X(s,"class","user"),X(t,"class","shadow-lg absolute inset-0 flex flex-col")},m(e,c){J(e,t,c),Q(t,n);for(let t=0;t<l.length;t+=1)l[t].m(n,null);Q(t,o),Q(t,r),Q(t,a),Q(t,s),i=!0},p(e,[t]){if(7&t){let o;for(c=e[1],o=0;o<c.length;o+=1){const r=Dt(e,c,o);l[o]?(l[o].p(r,t),L(l[o],1)):(l[o]=Wt(r),l[o].c(),L(l[o],1),l[o].m(n,null))}for(te(),o=c.length;o<l.length;o+=1)d(o);ne()}},i(e){if(!i){for(let e=0;e<c.length;e+=1)L(l[e]);i=!0}},o(e){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)M(l[t]);i=!1},d(e){e&&A(t),oe(l,e)}}}function Rt(e,t,n){let o;const r=Ct.filter((e=>{var t;return null===(t=null==e?void 0:e.meta)||void 0===t?void 0:t.menu})).map((e=>({name:e.name,path:e.path,title:e.meta.menu.title,icon:e.meta.menu.icon})));function a(e){Bt.push(e)}Bt.currentMatched.subscribe((e=>{if(e&&e.length){const[t]=e;n(0,o=t.name)}}));return[o,r,a,e=>a(e.path)]}class Nt extends x{constructor(e){super(),k(this,e,Rt,Yt,E,{})}}function Ut(e){let t,n,o,r,a,s,i;return o=new Nt({}),s=new O({}),{c(){t=K("main"),n=K("div"),P(o.$$.fragment),r=Z(),a=K("div"),P(s.$$.fragment),X(n,"class","sidebar relative"),X(a,"class","content relative"),X(t,"class","absolute inset-0 grid grid-cols-2 svelte-15go9i5")},m(e,c){J(e,t,c),Q(t,n),S(o,n,null),Q(t,r),Q(t,a),S(s,a,null),i=!0},p:j,i(e){i||(L(o.$$.fragment,e),L(s.$$.fragment,e),i=!0)},o(e){M(o.$$.fragment,e),M(s.$$.fragment,e),i=!1},d(e){e&&A(t),I(o),I(s)}}}const Vt={default:class extends x{constructor(e){super(),k(this,e,null,St,E,{})}},workspace:class extends x{constructor(e){super(),k(this,e,null,Ut,E,{})}}};function Ft(e,t,n){const o=e.slice();return o[1]=t[n],o}function Ht(e,t,n){const o=e.slice();return o[4]=t[n],o}function Kt(e){let t,n,o=e[1].actions,r=[];for(let s=0;s<o.length;s+=1)r[s]=qt(Ht(e,o,s));const a=e=>M(r[e],1,1,(()=>{r[e]=null}));return{c(){for(let e=0;e<r.length;e+=1)r[e].c();t=re()},m(e,o){for(let t=0;t<r.length;t+=1)r[t].m(e,o);J(e,t,o),n=!0},p(e,n){if(1&n){let s;for(o=e[1].actions,s=0;s<o.length;s+=1){const a=Ht(e,o,s);r[s]?(r[s].p(a,n),L(r[s],1)):(r[s]=qt(a),r[s].c(),L(r[s],1),r[s].m(t.parentNode,t))}for(te(),s=o.length;s<r.length;s+=1)a(s);ne()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)L(r[e]);n=!0}},o(e){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)M(r[t]);n=!1},d(e){oe(r,e),e&&A(t)}}}function Zt(e){let t,n=e[4].title+"";return{c(){t=q(n)},m(e,n){J(e,t,n)},p(e,o){1&o&&n!==(n=e[4].title+"")&&fe(t,n)},d(e){e&&A(t)}}}function qt(e){let t,n;return t=new ue({props:{$$slots:{default:[Zt]},$$scope:{ctx:e}}}),t.$on("click",(function(){le(e[4].onclick)&&e[4].onclick.apply(this,arguments)})),{c(){P(t.$$.fragment)},m(e,o){S(t,e,o),n=!0},p(n,o){e=n;const r={};129&o&&(r.$$scope={dirty:o,ctx:e}),t.$set(r)},i(e){n||(L(t.$$.fragment,e),n=!0)},o(e){M(t.$$.fragment,e),n=!1},d(e){I(t,e)}}}function Gt(e){let t,n,o,r=e[1].actions&&Kt(e);return{c(){t=K("div"),r&&r.c(),n=Z(),X(t,"slot","actions")},m(e,a){J(e,t,a),r&&r.m(t,null),Q(t,n),o=!0},p(e,o){e[1].actions?r?(r.p(e,o),1&o&&L(r,1)):(r=Kt(e),r.c(),L(r,1),r.m(t,n)):r&&(te(),M(r,1,1,(()=>{r=null})),ne())},i(e){o||(L(r),o=!0)},o(e){M(r),o=!1},d(e){e&&A(t),r&&r.d()}}}function Jt(e,t){let n,o,r;return o=new ce({props:{kind:t[1].type,title:t[1].title+":",subtitle:t[1].message,timeout:t[1].timeout,hideCloseButton:t[1].hideClose,$$slots:{actions:[Gt]},$$scope:{ctx:t}}}),o.$on("close",(function(){le(rn(t[1]))&&rn(t[1]).apply(this,arguments)})),{key:e,first:null,c(){n=re(),P(o.$$.fragment),this.first=n},m(e,t){J(e,n,t),S(o,e,t),r=!0},p(e,n){t=e;const r={};1&n&&(r.kind=t[1].type),1&n&&(r.title=t[1].title+":"),1&n&&(r.subtitle=t[1].message),1&n&&(r.timeout=t[1].timeout),1&n&&(r.hideCloseButton=t[1].hideClose),129&n&&(r.$$scope={dirty:n,ctx:t}),o.$set(r)},i(e){r||(L(o.$$.fragment,e),r=!0)},o(e){M(o.$$.fragment,e),r=!1},d(e){e&&A(n),I(o,e)}}}function Qt(e){let t,n,o=[],r=new Map,a=e[0];const s=e=>e[1].id;for(let i=0;i<a.length;i+=1){let t=Ft(e,a,i),n=s(t);r.set(n,o[i]=Jt(n,t))}return{c(){t=K("div");for(let e=0;e<o.length;e+=1)o[e].c();X(t,"class","toast-container flex flex-col items-center")},m(e,r){J(e,t,r);for(let n=0;n<o.length;n+=1)o[n].m(t,null);n=!0},p(e,[n]){1&n&&(a=e[0],te(),o=ae(o,n,s,1,e,a,r,t,de,Jt,null,Ft),ne())},i(e){if(!n){for(let e=0;e<a.length;e+=1)L(o[e]);n=!0}},o(e){for(let t=0;t<o.length;t+=1)M(o[t]);n=!1},d(e){e&&A(t);for(let t=0;t<o.length;t+=1)o[t].d()}}}const en=se([]),tn={success:"成功",warning:"警告",error:"错误",info:"确认"};function nn(e){en.update((t=>[...t,{id:Math.random().toString(32).slice(2),title:tn[e.type],type:e.type,message:e.message,timeout:e.timeout||2e3}]))}function on(e){const t=e=>{en.update((t=>t.filter((t=>t.id!==e))))},n=Math.random().toString(32).slice(2);return new Promise(((o,r)=>{en.update((a=>[...a,{id:n,title:tn.info,type:"info",message:e.message,timeout:0,hideClose:!0,actions:[{onclick:()=>{t(n),o(!0)},title:"确定"},{onclick:()=>{t(n),r(!1)},title:"取消"}]}]))}))}function rn(e){return()=>{en.update((t=>t.filter((t=>t.id!==e.id))))}}function an(e,t,n){let o;return ie(e,en,(e=>n(0,o=e))),[o]}class sn extends x{constructor(e){super(),k(this,e,an,Qt,E,{})}}function cn(e){let t,n,o;var r=e[0];return r&&(t=new r({})),{c(){t&&P(t.$$.fragment),n=re()},m(e,r){t&&S(t,e,r),J(e,n,r),o=!0},p(e,o){if(r!==(r=e[0])){if(t){te();const e=t;M(e.$$.fragment,1,0,(()=>{I(e,1)})),ne()}r?(t=new r({}),P(t.$$.fragment),L(t.$$.fragment,1),S(t,n.parentNode,n)):t=null}},i(e){o||(t&&L(t.$$.fragment,e),o=!0)},o(e){t&&M(t.$$.fragment,e),o=!1},d(e){e&&A(n),t&&I(t,e)}}}function ln(e){let t,n;return t=new he({props:{minWidth:100,$$slots:{default:[cn]},$$scope:{ctx:e}}}),{c(){P(t.$$.fragment)},m(e,o){S(t,e,o),n=!0},p(e,n){const o={};17&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(L(t.$$.fragment,e),n=!0)},o(e){M(t.$$.fragment,e),n=!1},d(e){I(t,e)}}}function dn(e){let t,n,o,r,a,s;return t=new ge({props:{router:Bt,$$slots:{default:[ln]},$$scope:{ctx:e}}}),o=new sn({}),a=new pe({props:{theme:"white",tokens:e[1]}}),{c(){P(t.$$.fragment),n=Z(),P(o.$$.fragment),r=Z(),P(a.$$.fragment)},m(e,i){S(t,e,i),J(e,n,i),S(o,e,i),J(e,r,i),S(a,e,i),s=!0},p(e,[n]){const o={};17&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){s||(L(t.$$.fragment,e),L(o.$$.fragment,e),L(a.$$.fragment,e),s=!0)},o(e){M(t.$$.fragment,e),M(o.$$.fragment,e),M(a.$$.fragment,e),s=!1},d(e){I(t,e),e&&A(n),I(o,e),e&&A(r),I(a,e)}}}function un(e,t,n){let o,r;v(kt);const a=Pt,{layout:s}=Et((e=>e.app));return ie(e,s,(e=>n(3,r=e))),e.$$.update=()=>{8&e.$$.dirty&&n(0,o=Vt[r])},[o,a,s,r]}new class extends x{constructor(e){super(),k(this,e,un,dn,E,{})}}({target:document.getElementById("app")});export{Tt as C,Me as W,on as a,Ye as b,Ve as c,st as d,ye as e,De as f,Fe as g,Ze as h,We as i,at as j,Qe as k,Oe as l,nn as o,Ue as r,kt as s,Ee as t,Et as u};