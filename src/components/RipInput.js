!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=11)}([function(t,e,s){"use strict";s.d(e,"f",function(){return i}),s.d(e,"g",function(){return n}),s.d(e,"b",function(){return r}),s.d(e,"a",function(){return l}),s.d(e,"d",function(){return c}),s.d(e,"c",function(){return a}),s.d(e,"e",function(){return u});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${n}`),r="$lit$";class l{constructor(t,e){this.parts=[],this.element=e;let s=-1,n=0;const l=[],c=e=>{const h=e.content,d=document.createTreeWalker(h,133,null,!1);let p,f;for(;d.nextNode();){s++,p=f;const e=f=d.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const l=e.attributes;let c=0;for(let t=0;t<l.length;t++)l[t].value.indexOf(i)>=0&&c++;for(;c-- >0;){const i=t.strings[n],l=u.exec(i)[2],c=l.toLowerCase()+r,a=e.getAttribute(c).split(o);this.parts.push({type:"attribute",index:s,name:l,strings:a}),e.removeAttribute(c),n+=a.length-1}}"TEMPLATE"===e.tagName&&c(e)}else if(3===e.nodeType){const t=e.nodeValue;if(t.indexOf(i)<0)continue;const r=e.parentNode,c=t.split(o),u=c.length-1;n+=u;for(let t=0;t<u;t++)r.insertBefore(""===c[t]?a():document.createTextNode(c[t]),e),this.parts.push({type:"node",index:s++});r.insertBefore(""===c[u]?a():document.createTextNode(c[u]),e),l.push(e)}else if(8===e.nodeType)if(e.nodeValue===i){const t=e.parentNode,i=e.previousSibling;null===i||i!==p||i.nodeType!==Node.TEXT_NODE?t.insertBefore(a(),e):s--,this.parts.push({type:"node",index:s++}),l.push(e),null===e.nextSibling?t.insertBefore(a(),e):s--,f=p,n++}else{let t=-1;for(;-1!==(t=e.nodeValue.indexOf(i,t+1));)this.parts.push({type:"node",index:-1})}}};c(e);for(const t of l)t.parentNode.removeChild(t)}}const c=t=>-1!==t.index,a=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/},function(t,e,s){"use strict";s.d(e,"f",function(){return a}),s.d(e,"a",function(){return u}),s.d(e,"d",function(){return d}),s.d(e,"b",function(){return p}),s.d(e,"e",function(){return f}),s.d(e,"c",function(){return b});var i=s(7),n=s(2),o=s(3),r=s(10),l=s(5),c=s(0);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const a=t=>null===t||!("object"==typeof t||"function"==typeof t);class u{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new h(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class h{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o.a||a(t)&&t===this.value||(this.value=t,Object(i.b)(t)||(this.committer.dirty=!0))}commit(){for(;Object(i.b)(this.value);){const t=this.value;this.value=o.a,t(this)}this.value!==o.a&&this.committer.commit()}}class d{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(Object(c.c)()),this.endNode=t.appendChild(Object(c.c)())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=Object(c.c)()),t._insert(this.endNode=Object(c.c)())}insertAfterPart(t){t._insert(this.startNode=Object(c.c)()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;Object(i.b)(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o.a,t(this)}const t=this._pendingValue;t!==o.a&&(a(t)?t!==this.value&&this._commitText(t):t instanceof l.b?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&e.nodeType===Node.TEXT_NODE?e.textContent=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value&&this.value.template===e)this.value.update(t.values);else{const s=new r.a(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new d(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){Object(n.b)(this.startNode.parentNode,t.nextSibling,this.endNode)}}class p{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;Object(i.b)(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o.a,t(this)}if(this._pendingValue===o.a)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=o.a}}class f extends u{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new m(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class m extends h{}let y=!1;try{const t={get capture(){return y=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class b{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;Object(i.b)(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o.a,t(this)}if(this._pendingValue===o.a)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=g(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=o.a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const g=t=>t&&(y?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)},function(t,e,s){"use strict";s.d(e,"a",function(){return i}),s.d(e,"c",function(){return n}),s.d(e,"b",function(){return o});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,s=null,i=null)=>{let n=e;for(;n!==s;){const e=n.nextSibling;t.insertBefore(n,i),n=e}},o=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}}},function(t,e,s){"use strict";s.d(e,"a",function(){return i});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i={}},function(t,e,s){"use strict";var i=s(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const n=new class{handleAttributeExpressions(t,e,s,n){const o=e[0];return"."===o?new i.e(t,e.slice(1),s).parts:"@"===o?[new i.c(t,e.slice(1),n.eventContext)]:"?"===o?[new i.b(t,e.slice(1),s)]:new i.a(t,e,s).parts}handleTextExpression(t){return new i.d(t)}};var o=s(5),r=s(7);s(2),s(3),s(8),s(6),s(10),s(0);s.d(e,"d",function(){return l}),s.d(e,"c",function(){return r.a}),s.d(e,"e",function(){return i.f}),s.d(e,"a",function(){return i.d}),s.d(e,"b",function(){return o.b});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const l=(t,...e)=>new o.b(t,e,"html",n)},function(t,e,s){"use strict";s.d(e,"b",function(){return o}),s.d(e,"a",function(){return r});var i=s(2),n=s(0);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class o{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s];let i=!1;e+=t.replace(n.e,(t,e,s,o)=>(i=!0,e+s+n.b+o+n.f)),i||(e+=n.g)}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class r extends o{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,s=e.firstChild;return e.removeChild(s),Object(i.c)(e,s.firstChild),t}}},function(t,e,s){"use strict";s.d(e,"b",function(){return n}),s.d(e,"a",function(){return o});var i=s(0);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function n(t){let e=o.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},o.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(i.f);return void 0===(s=e.keyString.get(n))&&(s=new i.a(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const o=new Map},function(t,e,s){"use strict";s.d(e,"a",function(){return n}),s.d(e,"b",function(){return o});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,n=t=>(...e)=>{const s=t(...e);return i.set(s,!0),s},o=t=>"function"==typeof t&&i.has(t)},function(t,e,s){"use strict";s.d(e,"a",function(){return r}),s.d(e,"b",function(){return l});var i=s(2),n=s(1),o=s(6);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const r=new WeakMap,l=(t,e,s)=>{let l=r.get(e);void 0===l&&(Object(i.b)(e,e.firstChild),r.set(e,l=new n.d(Object.assign({templateFactory:o.b},s))),l.appendInto(e)),l.setValue(t),l.commit()}},function(t,e,s){"use strict";var i=s(4),n=s(2),o=s(0);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const r=NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT|NodeFilter.SHOW_TEXT;function l(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,r,null,!1);let o=a(i),l=i[o],c=-1,u=0;const h=[];let d=null;for(;n.nextNode();){c++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(h.push(t),null===d&&(d=t)),null!==d&&u++;void 0!==l&&l.index===c;)l.index=null!==d?-1:l.index-u,l=i[o=a(i,o)]}h.forEach(t=>t.parentNode.removeChild(t))}const c=t=>{let e=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?0:1;const s=document.createTreeWalker(t,r,null,!1);for(;s.nextNode();)e++;return e},a=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(Object(o.d)(e))return s}return-1};var u=s(8),h=s(6),d=s(10),p=s(5);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const f=(t,e)=>`${t}--${e}`;let m=!0;void 0===window.ShadyCSS?m=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),m=!1);const y=t=>e=>{const s=f(e.type,t);let i=h.a.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},h.a.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o.f);if(void 0===(n=i.keyString.get(r))){const s=e.getTemplateElement();m&&window.ShadyCSS.prepareTemplateDom(s,t),n=new o.a(e,s),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n},b=["html","svg"],g=new Set,_=(t,e,s)=>{g.add(s);const i=t.querySelectorAll("style");if(0===i.length)return;const n=document.createElement("style");for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{b.forEach(e=>{const s=h.a.get(f(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),l(t,s)})})})(s),function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const o=document.createTreeWalker(i,r,null,!1);let l=a(n),u=0,h=-1;for(;o.nextNode();)for(h++,o.currentNode===s&&(u=c(e),s.parentNode.insertBefore(e,s));-1!==l&&n[l].index===h;){if(u>0){for(;-1!==l;)n[l].index+=u,l=a(n,l);return}l=a(n,l)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),l(e,t)}},v=t=>null!==t,w=t=>t?"":null,x=(t,e)=>e!==t&&(e==e||t==t),S={attribute:!0,type:String,reflect:!1,hasChanged:x},P=new Promise(t=>t(!0)),N=1,C=4,O=8;class E extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=P,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const t=[];for(const[e,s]of this._classProperties){const i=this._attributeNameForProperty(e,s);void 0!==i&&(this._attributeToPropertyMap.set(i,e),t.push(i))}return t}static createProperty(t,e=S){if(!this.hasOwnProperty("_classProperties")){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}if(this._classProperties.set(t,e),this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(i){const n=this[t];this[s]=i,this._requestPropertyUpdate(t,n,e)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty("_finalized")&&this._finalized)return;const t=Object.getPrototypeOf(this);"function"==typeof t._finalize&&t._finalize(),this._finalized=!0,this._attributeToPropertyMap=new Map;const e=this.properties,s=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const t of s)this.createProperty(t,e[t])}static _attributeNameForProperty(t,e){const s=void 0!==e&&e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=x){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e&&e.type;if(void 0===s)return t;const i=s===Boolean?v:"function"==typeof s?s:s.fromAttribute;return i?i(t):t}static _propertyValueToAttribute(t,e){if(void 0===e||void 0===e.reflect)return;return(e.type===Boolean?w:e.type&&e.type.toAttribute||String)(t)}initialize(){this.renderRoot=this.createRenderRoot(),this._saveInstanceProperties()}_saveInstanceProperties(){for(const[t]of this.constructor._classProperties)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}_applyInstanceProperties(){for(const[t,e]of this._instanceProperties)this[t]=e;this._instanceProperties=void 0}createRenderRoot(){return this.attachShadow({mode:"open"})}connectedCallback(){this._updateState&N?void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=S){const i=this.constructor,n=i._propertyValueToAttribute(e,s);if(void 0!==n){const e=i._attributeNameForProperty(t,s);void 0!==e&&(this._updateState=this._updateState|O,null===n?this.removeAttribute(e):this.setAttribute(e,n),this._updateState=this._updateState&~O)}}_attributeToProperty(t,e){if(!(this._updateState&O)){const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i);this[i]=s._propertyValueFromAttribute(e,t)}}}requestUpdate(t,e){if(void 0!==t){const s=this.constructor._classProperties.get(t)||S;return this._requestPropertyUpdate(t,e,s)}return this._invalidate()}_requestPropertyUpdate(t,e,s){return this.constructor._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0===s.reflect&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s)),this._invalidate()):this.updateComplete}async _invalidate(){if(!this._hasRequestedUpdate){let t;this._updateState=this._updateState|C;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._validate(),t(!this._hasRequestedUpdate)}return this.updateComplete}get _hasRequestedUpdate(){return this._updateState&C}_validate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&N||(this._updateState=this._updateState|N,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~C}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[t,e]of this._reflectingProperties)this._propertyToAttribute(t,this[t],e);this._reflectingProperties=void 0}}updated(t){}firstUpdated(t){}}E._attributeToPropertyMap=new Map,E._finalized=!0,E._classProperties=new Map,E.properties={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const T=t=>e=>(window.customElements.define(t,e),e),j=t=>(e,s)=>{e.constructor.createProperty(s,t)};V((t,e)=>t.querySelector(e)),V((t,e)=>t.querySelectorAll(e));function V(t){return e=>(s,i)=>{Object.defineProperty(s,i,{get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0})}}s.d(e,"a",function(){return z}),s.d(e,"b",function(){return T}),s.d(e,"d",function(){return j}),s.d(e,"c",function(){return i.d});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class z extends E{update(t){super.update(t);const e=this.render();e instanceof i.b&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this})}render(){}}z.render=((t,e,s)=>{const i=s.scopeName,o=u.a.has(e),r=e instanceof ShadowRoot&&m&&t instanceof p.b,l=r&&!g.has(i),c=l?document.createDocumentFragment():e;if(Object(u.b)(t,c,Object.assign({templateFactory:y(i)},s)),l){const t=u.a.get(c);u.a.delete(c),t.value instanceof d.a&&_(c,t.value.template,i),Object(n.b)(e,e.firstChild),e.appendChild(c),u.a.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)})},function(t,e,s){"use strict";s.d(e,"a",function(){return o});var i=s(2),n=s(0);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class o{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=i.a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,o=0;const r=t=>{const i=document.createTreeWalker(t,133,null,!1);let l=i.nextNode();for(;s<e.length&&null!==l;){const t=e[s];if(Object(n.d)(t))if(o===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(l,t.name,t.strings,this.options));s++}else o++,"TEMPLATE"===l.nodeName&&r(l.content),l=i.nextNode();else this._parts.push(void 0),s++}};return r(t),i.a&&(document.adoptNode(t),customElements.upgrade(t)),t}}},function(t,e,s){"use strict";s.r(e);var i=s(9);customElements.define("rip-input",class extends i.a{static get properties(){return{label:{type:String},title:{type:String},hasValue:{type:Boolean},value:{type:String,reflect:!0},type:{type:String},dark:{type:Boolean}}}constructor(){super(),this.label="",this.title="",this.value="",this.dark=!1,this.type="text"}render(){return i.c`
            <style>
            :host {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                display:block;
            }
            label {
                letter-spacing:1.2px;
                user-select: none;
                cursor:text;
                position:relative;
                top:-15px;
                font-size:18pt;
                color:${this.dark?"rgba(250,250,250, .5)":"#78909c"};
                padding:0;
                margin:0;
                transition:font-size .3s, color .3s, top .3s;
            }
            input {
                position:relative;
                top:16px;
                border:none;
                background:transparent;
                color:${this.dark?"rgba(250,250,250, .8)":"#424242"};
                width:100%;
                font-size:14pt;
                outline-width:0;
                transition:font-size .3s, width .3s;
                margin-top:4px;
            }
            .input-box {
                cursor:text;
                height:49px;
                -webkit-box-shadow:inset 0px -1.3px 0px 0px #b0bec5;
                -moz-box-shadow:inset 0px -1.3px 0px 0px #b0bec5;
                box-shadow:inset 0px -1.3px 0px 0px #b0bec5;
                background-color:${this.dark?"rgba(200,200,200, .2)":"rgba(250,250,250, .4)"};
                padding:2px 5px 0px 14px;
                transition:box-shadow 1s, width .3s;
            }
            .input-box:hover {
                background-color:${this.dark?"rgba(250,250,250, .1)":"rgba(250,250,250, 1)"};
                transition:background-color .3s
            }
            @media screen and (min-width: 0px) {
                .input-box {
                    height:40px;
                    margin:auto;
                    transition: height .7s;
                }
                input {
                    font-size:12pt;
                }
                label {
                    font-size:14pt;
                }
            }
            @media screen and (min-width: 899px) {
                .input-box {
                    height:45px;
                    margin:auto;
                    transition: height .4s;
                }
                input {
                    font-size:13pt;
                    transition: font-size .3s;
                }
                label {
                    font-size:16pt;
                    transition: font-size .3s;
                }
            }
            @media screen and (min-width: 1500px) {
                .input-box {
                    height:50px;
                    margin:auto;
                    transition: height .7s;
                }
                input {
                    font-size:14pt;
                    transition: font-size .3s;
                }
                label {
                    font-size:18pt;
                    transition: font-size .3s;

                }
            }
            </style>
            <div class="input-box" .title=${this.title} aria-label="${this.label}">
                
                <input
                    value="${this.value}"
                    type="${this.type}" 
                    aria-label="${this.label}"
                    @input=${this._handleInput} 
                >
                <label>${this.label}</label>
            </div>
        `}_handleInput(t){this.value=t.target.value.trim()&&"string"==typeof t.target.value.trim()&&t.target.value.trim().length>0?t.target.value.trim():""}firstUpdated(){const t=this.shadowRoot.querySelector(".input-box"),e=this.shadowRoot.querySelector("input"),s=this.shadowRoot.querySelector("label");this.value&&(s.style.top="-24px",s.style.fontSize="9pt"),e.addEventListener("focus",()=>{t.style.backgroundColor=this.dark?"rgba(189,189,189, .1)":"rgba(189,189,189, .3)",t.style.boxShadow=this.dark?"inset 0px -2px 0px 0px rgb(144,202,249)":"inset 0px -2px 0px 0px #3949ab",s.style.top="-24px",s.style.fontSize="9pt",s.style.color=this.dark?"rgb(144,202,249)":"#3949ab"}),e.addEventListener("blur",()=>{this.value.trim()||(s.style.top="",s.style.fontSize=""),s.style.color="",t.style.backgroundColor="",t.style.boxShadow=""}),t.addEventListener("click",()=>{e.focus()})}disconnectedCallback(){this.shadowRoot.querySelector(".input-box").cloneNode(!0),this.shadowRoot.querySelector("input").cloneNode(!0)}})}]);