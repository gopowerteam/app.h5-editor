import{S as t,i as e,j as s,k as n,m as a,t as o,l as c,q as r,aa as l,J as i,L as $,M as u,z as f,an as g,O as p,P as d,Q as m,a3 as h,y as x,U as b,V as k,W as v,ac as y}from"./vendor.289f5275.js";import{P as w}from"./page-container.9e7ce3bc.js";import{a as j,C as z}from"./index.83b66864.js";function _(t,e,s){const n=t.slice();return n[10]=e[s],n}function P(t){let e;return{c(){e=u("编辑")},m(t,s){p(t,e,s)},d(t){t&&x(e)}}}function q(t){let e;return{c(){e=u("删除")},m(t,s){p(t,e,s)},d(t){t&&x(e)}}}function B(t){let e,s,l,b,k,v,w,j,z,_,B,C,J,L,M=t[10].page.title+"";function O(){return t[6](t[10])}return j=new y({props:{size:"small",kind:"ghost",class:"flex-1",$$slots:{default:[P]},$$scope:{ctx:t}}}),j.$on("click",(function(){return t[7](t[10])})),_=new y({props:{size:"small",kind:"ghost",class:"flex-1",$$slots:{default:[q]},$$scope:{ctx:t}}}),_.$on("click",(function(){return t[8](t[10])})),{c(){e=i("div"),s=i("div"),l=$(),b=i("div"),k=u(M),v=$(),w=i("div"),n(j.$$.fragment),z=$(),n(_.$$.fragment),B=$(),f(s,"class","image svelte-1fbypeg"),g(s,"background-image","url("+t[10].page.background+")"),f(b,"class","title svelte-1fbypeg"),f(w,"class","action flex svelte-1fbypeg"),f(e,"class","page-item svelte-1fbypeg")},m(t,n){p(t,e,n),d(e,s),d(e,l),d(e,b),d(b,k),d(e,v),d(e,w),a(j,w,null),d(w,z),a(_,w,null),d(e,B),C=!0,J||(L=m(s,"click",O),J=!0)},p(e,n){t=e,(!C||2&n)&&g(s,"background-image","url("+t[10].page.background+")"),(!C||2&n)&&M!==(M=t[10].page.title+"")&&h(k,M);const a={};8192&n&&(a.$$scope={dirty:n,ctx:t}),j.$set(a);const o={};8192&n&&(o.$$scope={dirty:n,ctx:t}),_.$set(o)},i(t){C||(o(j.$$.fragment,t),o(_.$$.fragment,t),C=!0)},o(t){c(j.$$.fragment,t),c(_.$$.fragment,t),C=!1},d(t){t&&x(e),r(j),r(_),J=!1,L()}}}function C(t){let e,s,n=t[1],a=[];for(let o=0;o<n.length;o+=1)a[o]=B(_(t,n,o));const r=t=>c(a[t],1,1,(()=>{a[t]=null}));return{c(){e=i("div");for(let t=0;t<a.length;t+=1)a[t].c();f(e,"class","container")},m(t,n){p(t,e,n);for(let s=0;s<a.length;s+=1)a[s].m(e,null);s=!0},p(t,s){if(30&s){let c;for(n=t[1],c=0;c<n.length;c+=1){const r=_(t,n,c);a[c]?(a[c].p(r,s),o(a[c],1)):(a[c]=B(r),a[c].c(),o(a[c],1),a[c].m(e,null))}for(b(),c=n.length;c<a.length;c+=1)r(c);k()}},i(t){if(!s){for(let t=0;t<n.length;t+=1)o(a[t]);s=!0}},o(t){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)c(a[e]);s=!1},d(t){t&&x(e),v(a,t)}}}function J(t){let e;return{c(){e=u("新建")},m(t,s){p(t,e,s)},d(t){t&&x(e)}}}function L(t){let e,s;return e=new y({props:{size:"small",$$slots:{default:[J]},$$scope:{ctx:t}}}),e.$on("click",t[5]),{c(){n(e.$$.fragment)},m(t,n){a(e,t,n),s=!0},p(t,s){const n={};8192&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){c(e.$$.fragment,t),s=!1},d(t){r(e,t)}}}function M(t){let e,s;return e=new w({props:{title:"页面中心",layout:"workspace",$$slots:{action:[L],default:[C]},$$scope:{ctx:t}}}),{c(){n(e.$$.fragment)},m(t,n){a(e,t,n),s=!0},p(t,[s]){const n={};8195&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){c(e.$$.fragment,t),s=!1},d(t){r(e,t)}}}function O(t,e,s){let{router:n}=e,a=[];function o(){z.get().database().collection("pages").get().then((({data:t})=>{s(1,a=t)}))}function c(t){n.push(`/editor?id=${t}`)}function r(t){j({type:"success",message:"是否确定删除该项目"}).then((e=>{z.get().database().collection("pages").doc(t).remove().then((()=>{o()}))}))}function i(t){n.push(`/page-preview?id=${t}`)}l((()=>{o()}));return t.$$set=t=>{"router"in t&&s(0,n=t.router)},[n,a,c,r,i,()=>n.push("/editor"),t=>i(t._id),t=>c(t._id),t=>r(t._id)]}class Q extends t{constructor(t){super(),e(this,t,O,M,s,{router:0})}}export{Q as default};
