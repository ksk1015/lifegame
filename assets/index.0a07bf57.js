var z=Object.defineProperty;var g=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var f=(l,e,t)=>e in l?z(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,_=(l,e)=>{for(var t in e||(e={}))p.call(e,t)&&f(l,t,e[t]);if(g)for(var t of g(e))y.call(e,t)&&f(l,t,e[t]);return l};var C=(l,e)=>{var t={};for(var s in l)p.call(l,s)&&e.indexOf(s)<0&&(t[s]=l[s]);if(l!=null&&g)for(var s of g(l))e.indexOf(s)<0&&y.call(l,s)&&(t[s]=l[s]);return t};var d=(l,e,t)=>(f(l,typeof e!="symbol"?e+"":e,t),t);import{l as A,y as w,j as E,a as j,g as m,s as k,A as x,h as O,S as F}from"./vendor.60f3588c.js";const N=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}};N();const v=()=>({width:window.innerWidth,height:window.innerHeight}),R=(l=250)=>{const[e,t]=A(v());return w(()=>{let s=0;const n=()=>{s&&clearTimeout(s),s=window.setTimeout(()=>{s=0,t(v())},l)};return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[]),e};class U{constructor(e,t){d(this,"_cols");d(this,"_rows");d(this,"_cells");d(this,"_onChange",()=>{});d(this,"_playId",0);d(this,"_playInterval",200);this._cols=e,this._rows=t,this._cells=this.createCells()}createCells(e=this.length){return new Uint8Array(e)}setCells(e){this._cells=e,this._onChange()}setSize(e,t){const s=this.createCells(e*t),n=Math.min(e,this.cols),o=Math.min(t,this.rows);for(let i=0;i<o;i++)for(let r=0;r<n;r++)this._cells[r+i*this.cols]&&(s[r+i*e]=1);this._cols=e,this._rows=t,this.setCells(s)}get cols(){return this._cols}set cols(e){this.setSize(e,this.rows)}get rows(){return this._rows}set rows(e){this.setSize(this.cols,e)}get length(){return this._cols*this._rows}get liveLength(){return this._cells.reduce((e,t)=>e+t)}get deadLength(){return this.length-this.liveLength}set onChange(e){this._onChange=e}set playInterval(e){e!==this._playInterval&&(this._playInterval=e,this.isPlaying&&(this.pause(),this.play()))}get playInterval(){return this._playInterval}get isPlaying(){return!!this._playId}coord2index(e,t){const s=e+t*this.cols;return typeof this._cells[s]!="undefined"?s:-1}cellsForEach(e){for(let t=0;t<this._rows;t++)for(let s=0;s<this._cols;s++)e(s,t,!!this._cells[s+t*this._cols])}next(){const{cols:e,rows:t,_cells:s}=this,n=this.createCells();for(let o=0;o<t;o++)for(let i=0;i<e;i++){let r=0;o-1>=0&&(r+=i-1>=0?s[i-1+(o-1)*e]:0,r+=s[i+(o-1)*e],r+=i+1<e?s[i+1+(o-1)*e]:0),r+=i-1>=0?s[i-1+o*e]:0,r+=i+1<e?s[i+1+o*e]:0,o+1<t&&(r+=i-1>=0?s[i-1+(o+1)*e]:0,r+=s[i+(o+1)*e],r+=i+1<e?s[i+1+(o+1)*e]:0),n[i+o*e]=r===3||r===2&&s[i+o*e]?1:0}this._cells=n,this._onChange()}clear(){for(let e=0,t=this._cells.length;e<t;e++)this._cells[e]=0;this._onChange()}random(e=.2){for(let t=0,s=this._cells.length;t<s;t++)this._cells[t]=Math.random()<e?1:0;this._onChange()}getCell(e,t){const s=this.coord2index(e,t);return this._cells[s]}setCell(e,t,s){const n=this.coord2index(e,t);n>=0&&(this._cells[n]=s,this._onChange())}touchCell(e,t){this.setCell(e,t,1)}killCell(e,t){this.setCell(e,t,0)}toggleCell(e,t){const s=this.getCell(e,t);this.setCell(e,t,s?0:1)}touchCells(e){for(let t=0;t<e.length;t++){const[s,n]=e[t],o=this.coord2index(s,n);o>=0&&(this._cells[o]=1)}this._onChange()}createFromMatrix(e,t=0,s=0){const n=[];for(let o=0;o<e.length;o++)for(let i=0;i<e[o].length;i++)e[o][i]&&n.push([i+t,o+s]);this.touchCells(n)}play(){this.isPlaying||(this._playId=window.setInterval(()=>{this.next()},this.playInterval))}pause(){!this.isPlaying||(clearInterval(this._playId),this._playId=0)}togglePlay(){this.isPlaying?this.pause():this.play()}}const a=E,I=j,$=m(l=>{console.log("Canvas");const o=l,{onMount:e,onUnmount:t}=o,s=C(o,["onMount","onUnmount"]),n=k(null);return w(()=>{const i=n.current,r=i==null?void 0:i.getContext("2d");if(i&&r)return console.log("CanvasOnMount"),e&&e(i,r),()=>{console.log("CanvasOnUnMount"),t&&t(i,r)}},[]),a("canvas",_({ref:n},s))}),L=(l,e,t,s,n)=>{const o=t.cols*(s+n)+n,i=t.rows*(s+n)+n;l.width=o,l.height=i,e.fillStyle="black",e.fillRect(0,0,o,i),e.fillStyle="green",t.cellsForEach((r,M,P)=>{if(P){const b=n+r*(s+n),S=n+M*(s+n);e.fillRect(b,S,s,s)}})},V=m(({lifeGame:l,cellSize:e=4,gutter:t=1,style:s={}})=>{console.log("LifeGameCanvas");const n=x((i,r)=>{l.onChange=()=>{console.log("onChange"),L(i,r,l,e,t)},L(i,r,l,e,t)},[e]),o=x(()=>{l.onChange=()=>{}},[]);return a($,{onMount:n,onUnmount:o,style:s})}),h=new U(1,1),u=5,c=1,G=()=>{const l=R(),e=Math.ceil((l.width-c)/(u+c)),t=Math.ceil((l.height-c)/(u+c)),s=c+e*(u+c),n=c+t*(u+c);return{cols:e,rows:t,width:s,height:n}};function T(){console.log("App");const l=G();return O(()=>{console.log("useLayoutEffect in App");const e=h.length===1;h.setSize(l.cols,l.rows),e&&(h.random(),h.play())},[l]),I("div",{children:[a(V,{lifeGame:h,cellSize:u,gutter:c,style:`width: ${l.width}px; height: ${l.height}px`}),I("div",{style:"position: absolute; bottom: 5px; right: 5px",children:[a("button",{onClick:()=>h.togglePlay(),children:"Play/Pause"}),a("button",{onClick:()=>h.next(),children:"Next"}),a("button",{onClick:()=>h.random(),children:"Random"}),a("button",{onClick:()=>{h.clear(),h.createFromMatrix([[0,1,0],[0,0,1],[1,1,1]],5,5)},children:"Glider"})]})]})}F(a(T,{}),document.getElementById("App"));