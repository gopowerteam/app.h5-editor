import{S as t,i as e,h as s,J as a,y as n,a7 as o,O as r,Q as c,x as l,a8 as i,a9 as $,L as u,j as m,P as p,m as d,t as f,k as g,V as h,l as x,aa as w,ab as v,ac as y,U as b,ad as k,M as j,ae as q,af as P,ag as W,ah as E}from"./vendor.6ac7b93b.js";import{u as H,C as z,o as A}from"./index.b49b0ef4.js";import{P as C}from"./page-container.8523c8ac.js";import{F as U,a as _}from"./form-item.b65ba572.js";function F(t){let e,s,i,$;return{c(){e=a("img"),n(e,"class","image-background absolute inset-0 w-full h-full svelte-a0kiaq"),n(e,"alt",""),o(e.src,s="https://source.unsplash.com/random/"+t[0].clientWidth+"x"+t[0].clientHeight)||n(e,"src",s)},m(s,a){r(s,e,a),i||($=c(e,"load",t[3]),i=!0)},p(t,a){1&a&&!o(e.src,s="https://source.unsplash.com/random/"+t[0].clientWidth+"x"+t[0].clientHeight)&&n(e,"src",s)},d(t){t&&l(e),i=!1,$()}}}function I(t){let e,s,o;return{c(){e=a("div"),n(e,"class","absolute inset-0 color-background svelte-a0kiaq")},m(t,s){r(t,e,s),o=!0},i(t){o||(i((()=>{s||(s=$(e,v,{},!0)),s.run(1)})),o=!0)},o(t){s||(s=$(e,v,{},!1)),s.run(0),o=!1},d(t){t&&l(e),t&&s&&s.end()}}}function J(t){let e,s,a;function n(e){t[8](e)}let o={};return void 0!==t[2].email&&(o.value=t[2].email),e=new q({props:o}),k.push((()=>P(e,"value",n))),{c(){m(e.$$.fragment)},m(t,s){d(e,t,s),a=!0},p(t,a){const n={};!s&&4&a&&(s=!0,n.value=t[2].email,W((()=>s=!1))),e.$set(n)},i(t){a||(f(e.$$.fragment,t),a=!0)},o(t){g(e.$$.fragment,t),a=!1},d(t){x(e,t)}}}function L(t){let e,s,a;function n(e){t[9](e)}let o={};return void 0!==t[2].password&&(o.value=t[2].password),e=new E({props:o}),k.push((()=>P(e,"value",n))),{c(){m(e.$$.fragment)},m(t,s){d(e,t,s),a=!0},p(t,a){const n={};!s&&4&a&&(s=!0,n.value=t[2].password,W((()=>s=!1))),e.$set(n)},i(t){a||(f(e.$$.fragment,t),a=!0)},o(t){g(e.$$.fragment,t),a=!1},d(t){x(e,t)}}}function M(t){let e,s,a,n;return e=new _({props:{label:"邮箱",$$slots:{default:[J]},$$scope:{ctx:t}}}),a=new _({props:{label:"密码",$$slots:{default:[L]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),s=u(),m(a.$$.fragment)},m(t,o){d(e,t,o),r(t,s,o),d(a,t,o),n=!0},p(t,s){const n={};4100&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n);const o={};4100&s&&(o.$$scope={dirty:s,ctx:t}),a.$set(o)},i(t){n||(f(e.$$.fragment,t),f(a.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),g(a.$$.fragment,t),n=!1},d(t){x(e,t),t&&l(s),x(a,t)}}}function O(t){let e;return{c(){e=j("注册")},m(t,s){r(t,e,s)},d(t){t&&l(e)}}}function Q(t){let e;return{c(){e=j("登录")},m(t,s){r(t,e,s)},d(t){t&&l(e)}}}function S(t){let e,s,o,c,i,$,h,w,v,b,k,j;return $=new U({props:{layout:"float",$$slots:{default:[M]},$$scope:{ctx:t}}}),v=new y({props:{kind:"secondary",size:"small",$$slots:{default:[O]},$$scope:{ctx:t}}}),v.$on("click",t[4]),k=new y({props:{kind:"primary",size:"small",$$slots:{default:[Q]},$$scope:{ctx:t}}}),k.$on("click",t[5]),{c(){e=a("div"),s=a("div"),o=a("div"),o.textContent="H5 Editor",c=u(),i=a("div"),m($.$$.fragment),h=u(),w=a("div"),m(v.$$.fragment),b=u(),m(k.$$.fragment),n(o,"class","welcome text-center svelte-a0kiaq"),n(i,"class","form p-5"),n(w,"class","flex justify-center pt-10 space-x-10"),n(s,"class","form-container svelte-a0kiaq"),n(e,"class","login-container absolute inset-0 flex items-center justify-end")},m(t,a){r(t,e,a),p(e,s),p(s,o),p(s,c),p(s,i),d($,i,null),p(s,h),p(s,w),d(v,w,null),p(w,b),d(k,w,null),j=!0},p(t,e){const s={};4100&e&&(s.$$scope={dirty:e,ctx:t}),$.$set(s);const a={};4096&e&&(a.$$scope={dirty:e,ctx:t}),v.$set(a);const n={};4096&e&&(n.$$scope={dirty:e,ctx:t}),k.$set(n)},i(t){j||(f($.$$.fragment,t),f(v.$$.fragment,t),f(k.$$.fragment,t),j=!0)},o(t){g($.$$.fragment,t),g(v.$$.fragment,t),g(k.$$.fragment,t),j=!1},d(t){t&&l(e),x($),x(v),x(k)}}}function V(t){let e,s,o,c,i,$=t[0]&&F(t),w=!t[1]&&I();return c=new C({props:{title:"登录",layout:"default",header:!1,$$slots:{default:[S]},$$scope:{ctx:t}}}),{c(){e=a("div"),$&&$.c(),s=u(),w&&w.c(),o=u(),m(c.$$.fragment),n(e,"class","absolute inset-0")},m(a,n){r(a,e,n),$&&$.m(e,null),p(e,s),w&&w.m(e,null),t[7](e),r(a,o,n),d(c,a,n),i=!0},p(t,[a]){t[0]?$?$.p(t,a):($=F(t),$.c(),$.m(e,s)):$&&($.d(1),$=null),t[1]?w&&(b(),g(w,1,1,(()=>{w=null})),h()):w?2&a&&f(w,1):(w=I(),w.c(),f(w,1),w.m(e,null));const n={};4100&a&&(n.$$scope={dirty:a,ctx:t}),c.$set(n)},i(t){i||(f(w),f(c.$$.fragment,t),i=!0)},o(t){g(w),g(c.$$.fragment,t),i=!1},d(s){s&&l(e),$&&$.d(),w&&w.d(),t[7](null),s&&l(o),x(c,s)}}}function B(t,e,s){let a,{router:n}=e,o=!1,r={email:"2037630@163.com",password:"password123456"};const{userid:c,dispatch:l}=H((t=>t.user));return w((()=>{})),t.$$set=t=>{"router"in t&&s(6,n=t.router)},[a,o,r,function(){s(1,o=!0)},function(){const t=z.get(),{email:e,password:s}=r;t.auth({persistence:"local"}).signUpWithEmailAndPassword(e,s).then((()=>{A({type:"success",message:"验证邮件已发送"})})).catch((()=>{A({type:"error",message:"注册失败,请检查邮箱地址或是否已注册"})}))},function(){const t=z.get(),{email:e,password:s}=r;t.auth({persistence:"local"}).signInWithEmailAndPassword(e,s).then((()=>{A({type:"success",message:"登录成功"}),l("login","admin"),n.push("/page-center")})).catch((()=>{A({type:"error",message:"登录失败"})}))},n,function(t){k[t?"unshift":"push"]((()=>{a=t,s(0,a)}))},function(e){t.$$.not_equal(r.email,e)&&(r.email=e,s(2,r))},function(e){t.$$.not_equal(r.password,e)&&(r.password=e,s(2,r))}]}class D extends t{constructor(t){super(),e(this,t,B,V,s,{router:6})}}export{D as default};
