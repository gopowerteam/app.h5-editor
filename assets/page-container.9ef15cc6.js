import{S as t,i as e,s,D as l,G as a,F as n,r as i,I as o,J as c,Y as u,Z as d,_ as r,$ as p,t as f,g as m,q as $,a0 as x,M as v,N as h}from"./vendor.e6f185d8.js";import{u as y}from"./index.ff24cbf9.js";const b=t=>({}),j=t=>({});function w(t){let e,s,v,h,y,w;const g=t[4].action,q=x(g,t,t[3],j);return{c(){e=l("div"),s=l("div"),v=a(t[1]),h=n(),y=l("div"),q&&q.c(),i(s,"class","title text-xl"),i(y,"class","action pr-10"),i(e,"class","header pl-5 py-5 flex items-center justify-between svelte-1i4ditw")},m(t,l){o(t,e,l),c(e,s),c(s,v),c(e,h),c(e,y),q&&q.m(y,null),w=!0},p(t,e){(!w||2&e)&&u(v,t[1]),q&&q.p&&(!w||8&e)&&d(q,g,t,t[3],w?p(g,t[3],e,b):r(t[3]),j)},i(t){w||(f(q,t),w=!0)},o(t){m(q,t),w=!1},d(t){t&&$(e),q&&q.d(t)}}}function g(t){let e,s,a,u,y,b;document.title=e=t[1];let j=t[0]&&w(t);const g=t[4].default,q=x(g,t,t[3],null);return{c(){s=n(),a=l("div"),j&&j.c(),u=n(),y=l("div"),q&&q.c(),i(y,"class","content p-5 flex-auto svelte-1i4ditw"),i(a,"class","absolute inset-0 flex flex-col")},m(t,e){o(t,s,e),o(t,a,e),j&&j.m(a,null),c(a,u),c(a,y),q&&q.m(y,null),b=!0},p(t,[s]){(!b||2&s)&&e!==(e=t[1])&&(document.title=e),t[0]?j?(j.p(t,s),1&s&&f(j,1)):(j=w(t),j.c(),f(j,1),j.m(a,u)):j&&(v(),m(j,1,1,(()=>{j=null})),h()),q&&q.p&&(!b||8&s)&&d(q,g,t,t[3],b?p(g,t[3],s,null):r(t[3]),null)},i(t){b||(f(j),f(q,t),b=!0)},o(t){m(j),m(q,t),b=!1},d(t){t&&$(s),t&&$(a),j&&j.d(),q&&q.d(t)}}}function q(t,e,s){let{$$slots:l={},$$scope:a}=e,{header:n=!0}=e,{layout:i}=e,{title:o=""}=e;const{dispatch:c}=y((t=>t.app));return i&&c("updateLayout",i),t.$$set=t=>{"header"in t&&s(0,n=t.header),"layout"in t&&s(2,i=t.layout),"title"in t&&s(1,o=t.title),"$$scope"in t&&s(3,a=t.$$scope)},[n,o,i,a,l]}class D extends t{constructor(t){super(),e(this,t,q,g,s,{header:0,layout:2,title:1})}}export{D as P};
