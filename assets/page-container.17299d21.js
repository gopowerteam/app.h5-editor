import{S as t,i as e,h as s,J as a,M as l,L as i,y as n,O as c,P as o,a3 as u,ai as d,aj as r,ak as p,t as m,k as f,x,al as $,U as h,V as v}from"./vendor.6ce12853.js";import{u as y}from"./index.ca06c950.js";const j=t=>({}),w=t=>({});function b(t){let e,s,h,v,y,b;const k=t[4].action,L=$(k,t,t[3],w);return{c(){e=a("div"),s=a("div"),h=l(t[1]),v=i(),y=a("div"),L&&L.c(),n(s,"class","title text-xl"),n(y,"class","action pr-10"),n(e,"class","header pl-5 py-5 flex items-center justify-between svelte-1i4ditw")},m(t,a){c(t,e,a),o(e,s),o(s,h),o(e,v),o(e,y),L&&L.m(y,null),b=!0},p(t,e){(!b||2&e)&&u(h,t[1]),L&&L.p&&(!b||8&e)&&d(L,k,t,t[3],b?p(k,t[3],e,j):r(t[3]),w)},i(t){b||(m(L,t),b=!0)},o(t){f(L,t),b=!1},d(t){t&&x(e),L&&L.d(t)}}}function k(t){let e,s,l,u,y,j;document.title=e=t[1];let w=t[0]&&b(t);const k=t[4].default,L=$(k,t,t[3],null);return{c(){s=i(),l=a("div"),w&&w.c(),u=i(),y=a("div"),L&&L.c(),n(y,"class","content p-5 flex-auto svelte-1i4ditw"),n(l,"class","absolute inset-0 flex flex-col")},m(t,e){c(t,s,e),c(t,l,e),w&&w.m(l,null),o(l,u),o(l,y),L&&L.m(y,null),j=!0},p(t,[s]){(!j||2&s)&&e!==(e=t[1])&&(document.title=e),t[0]?w?(w.p(t,s),1&s&&m(w,1)):(w=b(t),w.c(),m(w,1),w.m(l,u)):w&&(h(),f(w,1,1,(()=>{w=null})),v()),L&&L.p&&(!j||8&s)&&d(L,k,t,t[3],j?p(k,t[3],s,null):r(t[3]),null)},i(t){j||(m(w),m(L,t),j=!0)},o(t){f(w),f(L,t),j=!1},d(t){t&&x(s),t&&x(l),w&&w.d(),L&&L.d(t)}}}function L(t,e,s){let{$$slots:a={},$$scope:l}=e,{header:i=!0}=e,{layout:n}=e,{title:c=""}=e;const{dispatch:o}=y((t=>t.app));return n&&o("updateLayout",n),t.$$set=t=>{"header"in t&&s(0,i=t.header),"layout"in t&&s(2,n=t.layout),"title"in t&&s(1,c=t.title),"$$scope"in t&&s(3,l=t.$$scope)},[i,c,n,l,a]}class P extends t{constructor(t){super(),e(this,t,L,k,s,{header:0,layout:2,title:1})}}export{P};
