import{S as t,i as e,h as s,J as a,M as l,L as i,y as n,O as o,P as c,a3 as u,ai as d,aj as r,ak as p,t as f,k as m,x,al as $,U as h,V as v}from"./vendor.6ce12853.js";import{u as y}from"./index.0f84b0f6.js";const j=t=>({}),b=t=>({});function w(t){let e,s,h,v,y,w;const k=t[4].action,L=$(k,t,t[3],b);return{c(){e=a("div"),s=a("div"),h=l(t[1]),v=i(),y=a("div"),L&&L.c(),n(s,"class","title text-xl"),n(y,"class","action pr-10"),n(e,"class","header pl-5 py-5 flex items-center justify-between svelte-1i4ditw")},m(t,a){o(t,e,a),c(e,s),c(s,h),c(e,v),c(e,y),L&&L.m(y,null),w=!0},p(t,e){(!w||2&e)&&u(h,t[1]),L&&L.p&&(!w||8&e)&&d(L,k,t,t[3],w?p(k,t[3],e,j):r(t[3]),b)},i(t){w||(f(L,t),w=!0)},o(t){m(L,t),w=!1},d(t){t&&x(e),L&&L.d(t)}}}function k(t){let e,s,l,u,y,j;document.title=e=t[1];let b=t[0]&&w(t);const k=t[4].default,L=$(k,t,t[3],null);return{c(){s=i(),l=a("div"),b&&b.c(),u=i(),y=a("div"),L&&L.c(),n(y,"class","content p-5 flex-auto svelte-1i4ditw"),n(l,"class","absolute inset-0 flex flex-col")},m(t,e){o(t,s,e),o(t,l,e),b&&b.m(l,null),c(l,u),c(l,y),L&&L.m(y,null),j=!0},p(t,[s]){(!j||2&s)&&e!==(e=t[1])&&(document.title=e),t[0]?b?(b.p(t,s),1&s&&f(b,1)):(b=w(t),b.c(),f(b,1),b.m(l,u)):b&&(h(),m(b,1,1,(()=>{b=null})),v()),L&&L.p&&(!j||8&s)&&d(L,k,t,t[3],j?p(k,t[3],s,null):r(t[3]),null)},i(t){j||(f(b),f(L,t),j=!0)},o(t){m(b),m(L,t),j=!1},d(t){t&&x(s),t&&x(l),b&&b.d(),L&&L.d(t)}}}function L(t,e,s){let{$$slots:a={},$$scope:l}=e,{header:i=!0}=e,{layout:n}=e,{title:o=""}=e;const{dispatch:c}=y((t=>t.app));return n&&c("updateLayout",n),t.$$set=t=>{"header"in t&&s(0,i=t.header),"layout"in t&&s(2,n=t.layout),"title"in t&&s(1,o=t.title),"$$scope"in t&&s(3,l=t.$$scope)},[i,o,n,l,a]}class P extends t{constructor(t){super(),e(this,t,L,k,s,{header:0,layout:2,title:1})}}export{P};
