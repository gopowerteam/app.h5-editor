import{S as e,i as t,h as s,J as a,y as n,a7 as o,O as r,Q as c,x as l,a8 as i,a9 as $,L as u,j as m,P as p,m as d,t as f,k as g,V as h,l as x,aa as w,ab as v,ac as y,U as k,ad as b,M as j,ae as q,af as P,ag as W,ah as E}from"./vendor.6ce12853.js";import{u as H,C as z,o as A}from"./index.ca06c950.js";import{P as C}from"./page-container.17299d21.js";import{F as U,a as _}from"./form-item.eec47ff0.js";function F(e){let t,s,i,$;return{c(){t=a("img"),n(t,"class","image-background absolute inset-0 w-full h-full svelte-a0kiaq"),n(t,"alt",""),o(t.src,s="https://source.unsplash.com/random/"+e[0].clientWidth+"x"+e[0].clientHeight)||n(t,"src",s)},m(s,a){r(s,t,a),i||($=c(t,"load",e[3]),i=!0)},p(e,a){1&a&&!o(t.src,s="https://source.unsplash.com/random/"+e[0].clientWidth+"x"+e[0].clientHeight)&&n(t,"src",s)},d(e){e&&l(t),i=!1,$()}}}function I(e){let t,s,o;return{c(){t=a("div"),n(t,"class","absolute inset-0 color-background svelte-a0kiaq")},m(e,s){r(e,t,s),o=!0},i(e){o||(i((()=>{s||(s=$(t,v,{},!0)),s.run(1)})),o=!0)},o(e){s||(s=$(t,v,{},!1)),s.run(0),o=!1},d(e){e&&l(t),e&&s&&s.end()}}}function J(e){let t,s,a;function n(t){e[8](t)}let o={};return void 0!==e[2].email&&(o.value=e[2].email),t=new q({props:o}),b.push((()=>P(t,"value",n))),{c(){m(t.$$.fragment)},m(e,s){d(t,e,s),a=!0},p(e,a){const n={};!s&&4&a&&(s=!0,n.value=e[2].email,W((()=>s=!1))),t.$set(n)},i(e){a||(f(t.$$.fragment,e),a=!0)},o(e){g(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function L(e){let t,s,a;function n(t){e[9](t)}let o={};return void 0!==e[2].password&&(o.value=e[2].password),t=new E({props:o}),b.push((()=>P(t,"value",n))),{c(){m(t.$$.fragment)},m(e,s){d(t,e,s),a=!0},p(e,a){const n={};!s&&4&a&&(s=!0,n.value=e[2].password,W((()=>s=!1))),t.$set(n)},i(e){a||(f(t.$$.fragment,e),a=!0)},o(e){g(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function M(e){let t,s,a,n;return t=new _({props:{label:"邮箱",$$slots:{default:[J]},$$scope:{ctx:e}}}),a=new _({props:{label:"密码",$$slots:{default:[L]},$$scope:{ctx:e}}}),{c(){m(t.$$.fragment),s=u(),m(a.$$.fragment)},m(e,o){d(t,e,o),r(e,s,o),d(a,e,o),n=!0},p(e,s){const n={};4100&s&&(n.$$scope={dirty:s,ctx:e}),t.$set(n);const o={};4100&s&&(o.$$scope={dirty:s,ctx:e}),a.$set(o)},i(e){n||(f(t.$$.fragment,e),f(a.$$.fragment,e),n=!0)},o(e){g(t.$$.fragment,e),g(a.$$.fragment,e),n=!1},d(e){x(t,e),e&&l(s),x(a,e)}}}function O(e){let t;return{c(){t=j("注册")},m(e,s){r(e,t,s)},d(e){e&&l(t)}}}function Q(e){let t;return{c(){t=j("登录")},m(e,s){r(e,t,s)},d(e){e&&l(t)}}}function S(e){let t,s,o,c,i,$,h,w,v,k,b,j;return $=new U({props:{layout:"float",$$slots:{default:[M]},$$scope:{ctx:e}}}),v=new y({props:{kind:"secondary",size:"small",$$slots:{default:[O]},$$scope:{ctx:e}}}),v.$on("click",e[4]),b=new y({props:{kind:"primary",size:"small",$$slots:{default:[Q]},$$scope:{ctx:e}}}),b.$on("click",e[5]),{c(){t=a("div"),s=a("div"),o=a("div"),o.textContent="H5 Editor",c=u(),i=a("div"),m($.$$.fragment),h=u(),w=a("div"),m(v.$$.fragment),k=u(),m(b.$$.fragment),n(o,"class","welcome text-center svelte-a0kiaq"),n(i,"class","form p-5"),n(w,"class","flex justify-center pt-10 space-x-10"),n(s,"class","form-container svelte-a0kiaq"),n(t,"class","login-container absolute inset-0 flex items-center justify-end")},m(e,a){r(e,t,a),p(t,s),p(s,o),p(s,c),p(s,i),d($,i,null),p(s,h),p(s,w),d(v,w,null),p(w,k),d(b,w,null),j=!0},p(e,t){const s={};4100&t&&(s.$$scope={dirty:t,ctx:e}),$.$set(s);const a={};4096&t&&(a.$$scope={dirty:t,ctx:e}),v.$set(a);const n={};4096&t&&(n.$$scope={dirty:t,ctx:e}),b.$set(n)},i(e){j||(f($.$$.fragment,e),f(v.$$.fragment,e),f(b.$$.fragment,e),j=!0)},o(e){g($.$$.fragment,e),g(v.$$.fragment,e),g(b.$$.fragment,e),j=!1},d(e){e&&l(t),x($),x(v),x(b)}}}function V(e){let t,s,o,c,i,$=e[0]&&F(e),w=!e[1]&&I();return c=new C({props:{title:"登录",layout:"default",header:!1,$$slots:{default:[S]},$$scope:{ctx:e}}}),{c(){t=a("div"),$&&$.c(),s=u(),w&&w.c(),o=u(),m(c.$$.fragment),n(t,"class","absolute inset-0")},m(a,n){r(a,t,n),$&&$.m(t,null),p(t,s),w&&w.m(t,null),e[7](t),r(a,o,n),d(c,a,n),i=!0},p(e,[a]){e[0]?$?$.p(e,a):($=F(e),$.c(),$.m(t,s)):$&&($.d(1),$=null),e[1]?w&&(k(),g(w,1,1,(()=>{w=null})),h()):w?2&a&&f(w,1):(w=I(),w.c(),f(w,1),w.m(t,null));const n={};4100&a&&(n.$$scope={dirty:a,ctx:e}),c.$set(n)},i(e){i||(f(w),f(c.$$.fragment,e),i=!0)},o(e){g(w),g(c.$$.fragment,e),i=!1},d(s){s&&l(t),$&&$.d(),w&&w.d(),e[7](null),s&&l(o),x(c,s)}}}function B(e,t,s){let a,{router:n}=t,o=!1,r={email:"2037630@163.com",password:"password123456"};const{userid:c,dispatch:l}=H((e=>e.user));return w((()=>{})),e.$$set=e=>{"router"in e&&s(6,n=e.router)},[a,o,r,function(){s(1,o=!0)},function(){const e=z.get(),{email:t,password:s}=r;e.auth({persistence:"local"}).signUpWithEmailAndPassword(t,s).then((()=>{A({type:"success",message:"验证邮件已发送"})})).catch((()=>{A({type:"error",message:"注册失败,请检查邮箱地址或是否已注册"})}))},function(){const e=z.get(),{email:t,password:s}=r;e.auth({persistence:"local"}).signInWithEmailAndPassword(t,s).then((()=>{A({type:"success",message:"登录成功"}),l("login","admin"),n.push("/page-center")})).catch((()=>{A({type:"error",message:"登录失败"})}))},n,function(e){b[e?"unshift":"push"]((()=>{a=e,s(0,a)}))},function(t){e.$$.not_equal(r.email,t)&&(r.email=t,s(2,r))},function(t){e.$$.not_equal(r.password,t)&&(r.password=t,s(2,r))}]}class D extends e{constructor(e){super(),t(this,e,B,V,s,{router:6})}}export{D as default};