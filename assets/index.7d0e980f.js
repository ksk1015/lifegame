var z=Object.defineProperty;var p=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var C=(l,t,e)=>t in l?z(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e,x=(l,t)=>{for(var e in t||(t={}))_.call(t,e)&&C(l,e,t[e]);if(p)for(var e of p(t))v.call(t,e)&&C(l,e,t[e]);return l};var P=(l,t)=>{var e={};for(var n in l)_.call(l,n)&&t.indexOf(n)<0&&(e[n]=l[n]);if(l!=null&&p)for(var n of p(l))t.indexOf(n)<0&&v.call(l,n)&&(e[n]=l[n]);return e};var u=(l,t,e)=>(C(l,typeof t!="symbol"?t+"":t,e),e);import{l as M,y as A,j as k,a as O,g as I,s as U,A as j,h as E,S as G}from"./vendor.60f3588c.js";const N=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};N();const L=()=>({width:window.innerWidth,height:window.innerHeight}),R=(l=250)=>{const[t,e]=M(L());return A(()=>{let n=0;const s=()=>{n&&clearTimeout(n),n=window.setTimeout(()=>{n=0,e(L())},l)};return window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),t};class S{constructor(t=0,e=0){u(this,"_cols");u(this,"_rows");u(this,"_data");this._cols=t,this._rows=e,this._data=new Uint8Array(t*e)}setSize(t,e){const n=new Uint8Array(t*e);this._cols=t,this._rows=e,this._data=n}set cols(t){this._cols=t}set rows(t){this._rows=t}get cols(){return this._cols}get rows(){return this._rows}get length(){return this._data.length}get data(){return this._data}}let w=new Uint8Array(1);const T=l=>{const{cols:t,rows:e,length:n,data:s}=l;w.length!==n&&(w=new Uint8Array(n));for(let o=0;o<e;o++)for(let i=0;i<t;i++){let r=0;o-1>=0&&(r+=i-1>=0?s[i-1+(o-1)*t]:0,r+=s[i+(o-1)*t],r+=i+1<t?s[i+1+(o-1)*t]:0),r+=i-1>=0?s[i-1+o*t]:0,r+=i+1<t?s[i+1+o*t]:0,o+1<e&&(r+=i-1>=0?s[i-1+(o+1)*t]:0,r+=s[i+(o+1)*t],r+=i+1<t?s[i+1+(o+1)*t]:0),w[i+o*t]=r===3||r===2&&s[i+o*t]?1:0}for(let o=0;o<n;o++)s[o]=w[o]},$=l=>{const{length:t,data:e}=l;for(let n=0;n<t;n++)e[n]=0},q=(l,t)=>{const{length:e,data:n}=l;for(let s=0;s<e;s++)n[s]=Math.random()<t?1:0};class F{constructor(t=0,e=0){u(this,"_cells");u(this,"_playId",0);u(this,"playInterval",200);this._cells=new S(t,e)}setSize(t,e){return this._cells=new S(t,e),this}set cols(t){this.setSize(t,this.rows)}set rows(t){this.setSize(this.cols,t)}get cols(){return this._cells.cols}get rows(){return this._cells.rows}get length(){return this._cells.length}getCell(t,e){return this._cells.data[t+e*this.cols]}forEachCells(t){const{cols:e,rows:n,data:s}=this._cells;for(let o=0;o<n;o++)for(let i=0;i<e;i++)t(i,o,s[i+o*e])}setCell(t,e,n){return this._cells.data[t+e*this.cols]=n,this}touchCell(t,e){return this.setCell(t,e,1),this}killCell(t,e){return this.setCell(t,e,0),this}toggleCell(t,e){return this.setCell(t,e,this.getCell(t,e)?0:1),this}setCells(t,e){this._cells;for(let n=0;n<t.length;n++){const[s,o]=t[n];this.setCell(s,o,e)}return this}touchCells(t){return this.setCells(t,1),this}killCells(t){return this.setCells(t,0),this}touchPlane(t,e=0,n=0){for(let s=0;s<t.length;s++)for(let o=0;o<t[s].length;o++)this.setCell(o+e,s+n,t[s][o]);return this}clear(){return $(this._cells),this}random(t=.2){return q(this._cells,t),this}next(){return T(this._cells),this}get isPlaying(){return!!this._playId}play(){if(this.isPlaying)return;const t=()=>{this._playId=self.setTimeout(()=>{this.next(),t()},this.playInterval)};t()}pause(){!this.isPlaying||(clearTimeout(this._playId),this._playId=0)}togglePlay(){this.isPlaying?this.pause():this.play()}}const a=k,b=O,V=I(l=>{console.log("Canvas");const o=l,{onMount:t,onUnmount:e}=o,n=P(o,["onMount","onUnmount"]),s=U(null);return A(()=>{const i=s.current,r=i==null?void 0:i.getContext("2d");if(i&&r){console.log("CanvasOnMount");const h=t?t(i,r):null;return()=>{console.log("CanvasOnUnMount"),h&&h(i,r),e&&e(i,r)}}},[]),a("canvas",x({ref:s},n))}),D=(l,t,e,n,s)=>{const o=e.cols*(n+s)+s,i=e.rows*(n+s)+s;l.width=o,l.height=i,t.fillStyle="black",t.fillRect(0,0,o,i),t.fillStyle="green",e.forEachCells((r,h,g)=>{if(g){const y=s+r*(n+s),m=s+h*(n+s);t.fillRect(y,m,n,n)}})},B=I(({lifeGame:l,cellSize:t=5,gutter:e=1,style:n={},updateFps:s=o=>{}})=>{console.log("LifeGameCanvas");const o=j((i,r)=>{let h=0;const g=()=>{const y=performance.now();h=requestAnimationFrame(()=>{D(i,r,l,t,e);const m=performance.now();s(1e3/(m-y)),g()})};return g(),()=>{cancelAnimationFrame(h)}},[]);return a(V,{onMount:o,style:n})}),d=new F(1,1),f=5,c=1,H=()=>{const l=R(),t=Math.ceil((l.width-c)/(f+c)),e=Math.ceil((l.height-c)/(f+c)),n=c+t*(f+c),s=c+e*(f+c);return{cols:t,rows:e,width:n,height:s}};function K(){console.log("App");const{cols:l,rows:t,width:e,height:n}=H();return E(()=>{d.setSize(l,t).random().play()},[l,t]),b("div",{children:[a(B,{lifeGame:d,cellSize:f,gutter:c,style:`width: ${e}px; height: ${n}px`}),b("div",{style:"position: absolute; bottom: 5px; right: 5px; display: flex; gap: 5px;",children:[a("button",{onClick:()=>d.togglePlay(),children:"Play/Pause"}),a("button",{onClick:()=>d.next(),children:"Next"}),a("button",{onClick:()=>d.random(),children:"Random"}),a("button",{onClick:()=>{d.clear().touchPlane([[0,1,0],[0,0,1],[1,1,1]],5,5)},children:"Glider"})]})]})}G(a(K,{}),document.getElementById("App"));
