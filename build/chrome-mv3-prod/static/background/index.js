var e,t;"function"==typeof(e=globalThis.define)&&(t=e,e=null),function(t,r,n,i,s){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof a[i]&&a[i],l=o.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function h(e,r){if(!l[e]){if(!t[e]){var n="function"==typeof a[i]&&a[i];if(!r&&n)return n(e,!0);if(o)return o(e,!0);if(u&&"string"==typeof e)return u(e);var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}d.resolve=function(r){var n=t[e][1][r];return null!=n?n:r},d.cache={};var c=l[e]=new h.Module(e);t[e][0].call(c.exports,d,c,c.exports,this)}return l[e].exports;function d(e){var t=d.resolve(e);return!1===t?{}:h(t)}}h.isParcelRequire=!0,h.Module=function(e){this.id=e,this.bundle=h,this.exports={}},h.modules=t,h.cache=l,h.parent=o,h.register=function(e,r){t[e]=[function(e,t){t.exports=r},{}]},Object.defineProperty(h,"root",{get:function(){return a[i]}}),a[i]=h;for(var c=0;c<r.length;c++)h(r[c]);if(n){var d=h(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=d:"function"==typeof e&&e.amd?e(function(){return d}):s&&(this[s]=d)}}({kgW6q:[function(e,t,r){e("./messaging"),e("../../../src/background/index")},{"./messaging":"iG3ww","../../../src/background/index":"iqY5N"}],iG3ww:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js"),i=e("~background/messages/addInfluencer"),s=n.interopDefault(i),a=e("~background/messages/copyVideo"),o=n.interopDefault(a),l=e("~background/messages/downloadVideo"),u=n.interopDefault(l),h=e("~background/messages/removeAuth"),c=n.interopDefault(h),d=e("~background/messages/saveAuth"),f=n.interopDefault(d);globalThis.__plasmoInternalPortMap=new Map,chrome.runtime.onMessageExternal.addListener((e,t,r)=>(e?.name,!0)),chrome.runtime.onMessage.addListener((e,t,r)=>{switch(e.name){case"addInfluencer":(0,s.default)({...e,sender:t},{send:e=>r(e)});break;case"copyVideo":(0,o.default)({...e,sender:t},{send:e=>r(e)});break;case"downloadVideo":(0,u.default)({...e,sender:t},{send:e=>r(e)});break;case"removeAuth":(0,c.default)({...e,sender:t},{send:e=>r(e)});break;case"saveAuth":(0,f.default)({...e,sender:t},{send:e=>r(e)})}return!0}),chrome.runtime.onConnect.addListener(function(e){globalThis.__plasmoInternalPortMap.set(e.name,e),e.onMessage.addListener(function(t){e.name})})},{"~background/messages/addInfluencer":"aegZX","~background/messages/copyVideo":"5hSnW","~background/messages/downloadVideo":"4w7DT","~background/messages/removeAuth":"7CRnJ","~background/messages/saveAuth":"aP7rB","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],aegZX:[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("@plasmohq/storage"),i=e("../../utils/refreshAuthToken");let s=async(e,t)=>{try{let{authorLink:r}=e.body??{};if(!r){t.send({ok:!1,error:"missing_author_link"});return}let s=new n.Storage,a=await s.get("firebaseToken"),o=await s.get("firebaseRefreshToken");if(!a){t.send({ok:!1,error:"user_not_authenticated"});return}if((0,i.isTokenExpired)(a)){if(o){console.log("Token expired, refreshing...");let e=await (0,i.refreshAuthToken)(o);if(e)a=e.id_token,await s.set("firebaseToken",e.id_token),await s.set("firebaseRefreshToken",e.refresh_token),console.log("Token refreshed successfully");else{console.error("Failed to refresh token"),t.send({ok:!1,error:"auth_expired_refresh_failed"});return}}else{console.error("Token expired and no refresh token found"),t.send({ok:!1,error:"auth_expired_no_refresh_token"});return}}console.log("Sending request to add-influencer API:",r);let l=await fetch("https://c7cbaf2e80c1.ngrok-free.app/api/add-influencer",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({username:r.replace("/@","")})}),u=null;try{u=await l.json()}catch{let e=await l.text();t.send({ok:!1,error:`Invalid JSON response: ${e.substring(0,100)}`});return}if(!l.ok){t.send({ok:!1,error:u?.error||u?.message||`API error: ${l.status}`});return}t.send({ok:!0,data:u})}catch(e){console.error(e),t.send({ok:!1,error:e.message})}};r.default=s},{"@plasmohq/storage":"luF8G","../../utils/refreshAuthToken":"9ZsDl","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],luF8G:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"BaseStorage",()=>o),n.export(r,"Storage",()=>l);var i=e("pify"),s=n.interopDefault(i),a=()=>{try{let e=globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if("Chrome"===e[1])return 100>parseInt(e[2])||globalThis.chrome.runtime?.getManifest()?.manifest_version===2}catch{}return!1},o=class{#e;#t;get primaryClient(){return this.#t}#r;get secondaryClient(){return this.#r}#n;get area(){return this.#n}get hasWebApi(){try{return"u">typeof window&&!!window.localStorage}catch(e){return console.error(e),!1}}#i=new Map;#s;get copiedKeySet(){return this.#s}isCopied=e=>this.hasWebApi&&(this.allCopied||this.copiedKeySet.has(e));#a=!1;get allCopied(){return this.#a}getExtStorageApi=()=>globalThis.browser?.storage||globalThis.chrome?.storage;get hasExtensionApi(){try{return!!this.getExtStorageApi()}catch(e){return console.error(e),!1}}isWatchSupported=()=>this.hasExtensionApi;keyNamespace="";isValidKey=e=>e.startsWith(this.keyNamespace);getNamespacedKey=e=>`${this.keyNamespace}${e}`;getUnnamespacedKey=e=>e.slice(this.keyNamespace.length);serde={serializer:JSON.stringify,deserializer:JSON.parse};constructor({area:e="sync",allCopied:t=!1,copiedKeyList:r=[],serde:n={}}={}){this.setCopiedKeySet(r),this.#n=e,this.#a=t,this.serde={...this.serde,...n};try{this.hasWebApi&&(t||r.length>0)&&(this.#r=window.localStorage)}catch{}try{this.hasExtensionApi&&(this.#e=this.getExtStorageApi(),a()?this.#t=(0,s.default)(this.#e[this.area],{exclude:["getBytesInUse"],errorFirst:!1}):this.#t=this.#e[this.area])}catch{}}setCopiedKeySet(e){this.#s=new Set(e)}rawGetAll=()=>this.#t?.get();getAll=async()=>Object.entries(await this.rawGetAll()).filter(([e])=>this.isValidKey(e)).reduce((e,[t,r])=>(e[this.getUnnamespacedKey(t)]=r,e),{});copy=async e=>{let t=void 0===e;if(!t&&!this.copiedKeySet.has(e)||!this.allCopied||!this.hasExtensionApi)return!1;let r=this.allCopied?await this.rawGetAll():await this.#t.get((t?[...this.copiedKeySet]:[e]).map(this.getNamespacedKey));if(!r)return!1;let n=!1;for(let e in r){let t=r[e],i=this.#r?.getItem(e);this.#r?.setItem(e,t),n||=t!==i}return n};rawGet=async e=>(await this.rawGetMany([e]))[e];rawGetMany=async e=>this.hasExtensionApi?await this.#t.get(e):e.filter(this.isCopied).reduce((e,t)=>(e[t]=this.#r?.getItem(t),e),{});rawSet=async(e,t)=>await this.rawSetMany({[e]:t});rawSetMany=async e=>(this.#r&&Object.entries(e).filter(([e])=>this.isCopied(e)).forEach(([e,t])=>this.#r.setItem(e,t)),this.hasExtensionApi&&await this.#t.set(e),null);clear=async(e=!1)=>{e&&this.#r?.clear(),await this.#t.clear()};rawRemove=async e=>{await this.rawRemoveMany([e])};rawRemoveMany=async e=>{this.#r&&e.filter(this.isCopied).forEach(e=>this.#r.removeItem(e)),this.hasExtensionApi&&await this.#t.remove(e)};removeAll=async()=>{let e=Object.keys(await this.getAll());await this.removeMany(e)};watch=e=>{let t=this.isWatchSupported();return t&&this.#o(e),t};#o=e=>{for(let t in e){let r=this.getNamespacedKey(t),n=this.#i.get(r)?.callbackSet||new Set;if(n.add(e[t]),n.size>1)continue;let i=(e,t)=>{if(t!==this.area||!e[r])return;let n=this.#i.get(r);if(!n)throw Error(`Storage comms does not exist for nsKey: ${r}`);Promise.all([this.parseValue(e[r].newValue),this.parseValue(e[r].oldValue)]).then(([e,r])=>{for(let i of n.callbackSet)i({newValue:e,oldValue:r},t)})};this.#e.onChanged.addListener(i),this.#i.set(r,{callbackSet:n,listener:i})}};unwatch=e=>{let t=this.isWatchSupported();return t&&this.#l(e),t};#l(e){for(let t in e){let r=this.getNamespacedKey(t),n=e[t],i=this.#i.get(r);i&&(i.callbackSet.delete(n),0===i.callbackSet.size&&(this.#i.delete(r),this.#e.onChanged.removeListener(i.listener)))}}unwatchAll=()=>this.#u();#u(){this.#i.forEach(({listener:e})=>this.#e.onChanged.removeListener(e)),this.#i.clear()}async getItem(e){return this.get(e)}async getItems(e){return await this.getMany(e)}async setItem(e,t){await this.set(e,t)}async setItems(e){await await this.setMany(e)}async removeItem(e){return this.remove(e)}async removeItems(e){return await this.removeMany(e)}},l=class extends o{get=async e=>{let t=this.getNamespacedKey(e),r=await this.rawGet(t);return this.parseValue(r)};getMany=async e=>{let t=e.map(this.getNamespacedKey),r=await this.rawGetMany(t),n=await Promise.all(Object.values(r).map(this.parseValue));return Object.keys(r).reduce((e,t,r)=>(e[this.getUnnamespacedKey(t)]=n[r],e),{})};set=async(e,t)=>{let r=this.getNamespacedKey(e),n=this.serde.serializer(t);return this.rawSet(r,n)};setMany=async e=>{let t=Object.entries(e).reduce((e,[t,r])=>(e[this.getNamespacedKey(t)]=this.serde.serializer(r),e),{});return await this.rawSetMany(t)};remove=async e=>{let t=this.getNamespacedKey(e);return this.rawRemove(t)};removeMany=async e=>{let t=e.map(this.getNamespacedKey);return await this.rawRemoveMany(t)};setNamespace=e=>{this.keyNamespace=e};parseValue=async e=>{try{if(void 0!==e)return this.serde.deserializer(e)}catch(e){console.error(e)}}}},{pify:"9arDK","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"9arDK":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"default",()=>a);let i=(e,t,r,n)=>function(...i){let s=t.promiseModule;return new s((s,a)=>{t.multiArgs?i.push((...e)=>{t.errorFirst?e[0]?a(e):(e.shift(),s(e)):s(e)}):t.errorFirst?i.push((e,t)=>{e?a(e):s(t)}):i.push(s),Reflect.apply(e,this===r?n:this,i)})},s=new WeakMap;function a(e,t){t={exclude:[/.+(?:Sync|Stream)$/],errorFirst:!0,promiseModule:Promise,...t};let r=typeof e;if(!(null!==e&&("object"===r||"function"===r)))throw TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${null===e?"null":r}\``);let n=(e,r)=>{let n=s.get(e);if(n||(n={},s.set(e,n)),r in n)return n[r];let i=e=>"string"==typeof e||"symbol"==typeof r?r===e:e.test(r),a=Reflect.getOwnPropertyDescriptor(e,r),o=void 0===a||a.writable||a.configurable,l=t.include?t.include.some(e=>i(e)):!t.exclude.some(e=>i(e)),u=l&&o;return n[r]=u,u},a=new WeakMap,o=new Proxy(e,{apply(e,r,n){let s=a.get(e);if(s)return Reflect.apply(s,r,n);let l=t.excludeMain?e:i(e,t,o,e);return a.set(e,l),Reflect.apply(l,r,n)},get(e,r){let s=e[r];if(!n(e,r)||s===Function.prototype[r])return s;let l=a.get(s);if(l)return l;if("function"==typeof s){let r=i(s,t,o,e);return a.set(s,r),r}return s}});return o}},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],hbR2Q:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}],"9ZsDl":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"refreshAuthToken",()=>s),n.export(r,"isTokenExpired",()=>a);var i=e("../firebase/firebaseClient");let s=async e=>{try{let t=new URLSearchParams({grant_type:"refresh_token",refresh_token:e}),r=await fetch(`https://securetoken.googleapis.com/v1/token?key=${i.firebaseConfig.apiKey}`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:t.toString()});if(!r.ok)return console.error("Failed to refresh token:",await r.text()),null;let n=await r.json();return n}catch(e){return console.error("Error refreshing token:",e),null}},a=e=>{if(!e)return!0;try{let t=e.split(".")[1],r=t.replace(/-/g,"+").replace(/_/g,"/"),n=atob(r),i=JSON.parse(n),s=i.exp,a=Date.now()/1e3;return s<a+300}catch(e){return!0}}},{"../firebase/firebaseClient":"3tHHI","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"3tHHI":[function(e,t,r){let n;var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"firebaseConfig",()=>u),i.export(r,"storage",()=>h),i.export(r,"auth",()=>c),i.export(r,"db",()=>d),i.export(r,"googleAuth",()=>f);var s=e("firebase/app"),a=e("firebase/auth"),o=e("firebase/firestore"),l=e("firebase/storage");let u={apiKey:"AIzaSyAjju5SrGHKrZBP1A05WIt6MClmehvf6xY",authDomain:"bc-ads-tester.firebaseapp.com",projectId:"bc-ads-tester",storageBucket:"bc-ads-tester.firebasestorage.app",messagingSenderId:"270877086688",appId:"1:270877086688:web:fe3c00c18e9a0492bb5185",measurementId:"G-49BZ07V8QJ"};n=(0,s.getApps)().length?(0,s.getApps)()[0]:(0,s.initializeApp)(u);let h=(0,l.getStorage)(n),c=(0,a.getAuth)(n),d=(0,o.getFirestore)(n),f=new a.GoogleAuthProvider;r.default=n},{"firebase/app":"l9tu0","firebase/auth":"bq9SB","firebase/firestore":"73OW7","firebase/storage":"kmmhB","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],l9tu0:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r);var i=e("@firebase/app");n.exportAll(i,r),/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,i.registerVersion)("firebase","12.6.0","app")},{"@firebase/app":"bfE4h","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],bfE4h:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"FirebaseError",()=>a.FirebaseError),n.export(r,"SDK_VERSION",()=>N),n.export(r,"_DEFAULT_ENTRY_NAME",()=>d),n.export(r,"_addComponent",()=>y),n.export(r,"_addOrOverwriteComponent",()=>w),n.export(r,"_apps",()=>p),n.export(r,"_clearComponents",()=>S),n.export(r,"_components",()=>g),n.export(r,"_getProvider",()=>_),n.export(r,"_isFirebaseApp",()=>I),n.export(r,"_isFirebaseServerApp",()=>T),n.export(r,"_isFirebaseServerAppSettings",()=>E),n.export(r,"_registerComponent",()=>v),n.export(r,"_removeServiceInstance",()=>b),n.export(r,"_serverApps",()=>m),n.export(r,"deleteApp",()=>L),n.export(r,"getApp",()=>O),n.export(r,"getApps",()=>P),n.export(r,"initializeApp",()=>R),n.export(r,"initializeServerApp",()=>D),n.export(r,"onLog",()=>F),n.export(r,"registerVersion",()=>M),n.export(r,"setLogLevel",()=>U);var i=e("@firebase/component"),s=e("@firebase/logger"),a=e("@firebase/util"),o=e("idb");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return t?.type==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let u="@firebase/app",h="0.14.6",c=new s.Logger("@firebase/app"),d="[DEFAULT]",f={[u]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/ai":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},p=new Map,m=new Map,g=new Map;function y(e,t){try{e.container.addComponent(t)}catch(r){c.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function w(e,t){e.container.addOrOverwriteComponent(t)}function v(e){let t=e.name;if(g.has(t))return c.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(g.set(t,e),p.values()))y(r,e);for(let t of m.values())y(t,e);return!0}function _(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}function b(e,t,r=d){_(e,t).clearInstance(r)}function I(e){return void 0!==e.options}function E(e){return!I(e)&&("authIdToken"in e||"appCheckToken"in e||"releaseOnDeref"in e||"automaticDataCollectionEnabled"in e)}function T(e){return null!=e&&void 0!==e.settings}function S(){g.clear()}let A=new a.ErrorFactory("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new i.Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw A.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e,t){let r=(0,a.base64Decode)(e.split(".")[1]);if(null===r){console.error(`FirebaseServerApp ${t} is invalid: second part could not be parsed.`);return}let n=JSON.parse(r).exp;if(void 0===n){console.error(`FirebaseServerApp ${t} is invalid: expiration claim could not be parsed`);return}let i=1e3*JSON.parse(r).exp,s=new Date().getTime();i-s<=0&&console.error(`FirebaseServerApp ${t} is invalid: the token has expired.`)}class k extends x{constructor(e,t,r,n){let i=void 0===t.automaticDataCollectionEnabled||t.automaticDataCollectionEnabled,s={name:r,automaticDataCollectionEnabled:i};void 0!==e.apiKey?super(e,s,n):super(e.options,s,n),this._serverConfig={automaticDataCollectionEnabled:i,...t},this._serverConfig.authIdToken&&C(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&C(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,"undefined"!=typeof FinalizationRegistry&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,M(u,h,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,void 0!==e&&null!==this._finalizationRegistry&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){L(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw A.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let N="12.6.0";function R(e,t={}){let r=e;if("object"!=typeof t){let e=t;t={name:e}}let n={name:d,automaticDataCollectionEnabled:!0,...t},s=n.name;if("string"!=typeof s||!s)throw A.create("bad-app-name",{appName:String(s)});if(r||(r=(0,a.getDefaultAppConfig)()),!r)throw A.create("no-options");let o=p.get(s);if(o){if((0,a.deepEqual)(r,o.options)&&(0,a.deepEqual)(n,o.config))return o;throw A.create("duplicate-app",{appName:s})}let l=new i.ComponentContainer(s);for(let e of g.values())l.addComponent(e);let u=new x(r,n,l);return p.set(s,u),u}function D(e,t={}){let r;if((0,a.isBrowser)()&&!(0,a.isWebWorker)())throw A.create("invalid-server-app-environment");let n=t||{};if(e&&(I(e)?r=e.options:E(e)?n=e:r=e),void 0===n.automaticDataCollectionEnabled&&(n.automaticDataCollectionEnabled=!0),r||(r=(0,a.getDefaultAppConfig)()),!r)throw A.create("no-options");let s={...n,...r};if(void 0!==s.releaseOnDeref&&delete s.releaseOnDeref,void 0!==n.releaseOnDeref&&"undefined"==typeof FinalizationRegistry)throw A.create("finalization-registry-not-supported",{});let o=""+[...JSON.stringify(s)].reduce((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0,0),l=m.get(o);if(l)return l.incRefCount(n.releaseOnDeref),l;let u=new i.ComponentContainer(o);for(let e of g.values())u.addComponent(e);let h=new k(r,n,o,u);return m.set(o,h),h}function O(e=d){let t=p.get(e);if(!t&&e===d&&(0,a.getDefaultAppConfig)())return R();if(!t)throw A.create("no-app",{appName:e});return t}function P(){return Array.from(p.values())}async function L(e){let t=!1,r=e.name;p.has(r)?(t=!0,p.delete(r)):m.has(r)&&0>=e.decRefCount()&&(m.delete(r),t=!0),t&&(await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function M(e,t,r){let n=f[e]??e;r&&(n+=`-${r}`);let s=n.match(/\s|\//),a=t.match(/\s|\//);if(s||a){let e=[`Unable to register library "${n}" with version "${t}":`];s&&e.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),c.warn(e.join(" "));return}v(new i.Component(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}function F(e,t){if(null!==e&&"function"!=typeof e)throw A.create("invalid-log-argument");(0,s.setUserLogHandler)(e,t)}function U(e){(0,s.setLogLevel)(e)}let V="firebase-heartbeat-store",B=null;function j(){return B||(B=(0,o.openDB)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(V)}catch(e){console.warn(e)}}}).catch(e=>{throw A.create("idb-open",{originalErrorMessage:e.message})})),B}async function q(e){try{let t=await j(),r=t.transaction(V),n=await r.objectStore(V).get(G(e));return await r.done,n}catch(e){if(e instanceof a.FirebaseError)c.warn(e.message);else{let t=A.create("idb-get",{originalErrorMessage:e?.message});c.warn(t.message)}}}async function z(e,t){try{let r=await j(),n=r.transaction(V,"readwrite"),i=n.objectStore(V);await i.put(t,G(e)),await n.done}catch(e){if(e instanceof a.FirebaseError)c.warn(e.message);else{let t=A.create("idb-set",{originalErrorMessage:e?.message});c.warn(t.message)}}}function G(e){return`${e.name}!${e.options.appId}`}class ${constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new H(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),r=K();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>30){let e=function(e){if(0===e.length)return -1;let t=0,r=e[0].date;for(let n=1;n<e.length;n++)e[n].date<r&&(r=e[n].date,t=n);return t}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){c.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||0===this._heartbeatsCache.heartbeats.length)return"";let e=K(),{heartbeatsToSend:t,unsentEntries:r}=function(e,t=1024){let r=[],n=e.slice();for(let i of e){let e=r.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),W(r)>t){e.dates.pop();break}}else if(r.push({agent:i.agent,dates:[i.date]}),W(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),n=(0,a.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}catch(e){return c.warn(e),""}}}function K(){let e=new Date;return e.toISOString().substring(0,10)}class H{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,a.isIndexedDBAvailable)()&&(0,a.validateIndexedDBOpenable)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await q(this.app);return e?.heartbeats?e:{heartbeats:[]}}}async overwrite(e){let t=await this._canUseIndexedDBPromise;if(t){let t=await this.read();return z(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){let t=await this._canUseIndexedDBPromise;if(t){let t=await this.read();return z(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function W(e){return(0,a.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:e})).length}v(new i.Component("platform-logger",e=>new l(e),"PRIVATE")),v(new i.Component("heartbeat",e=>new $(e),"PRIVATE")),M(u,h,""),M(u,h,"esm2020"),M("fire-js","")},{"@firebase/component":"iJpFd","@firebase/logger":"6iQx5","@firebase/util":"cFyzG",idb:"bF9bp","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],iJpFd:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"Component",()=>s),n.export(r,"ComponentContainer",()=>l),n.export(r,"Provider",()=>o);var i=e("@firebase/util");class s{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let a="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new i.Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:a})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e=a){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=a){return this.instances.has(e)}getOptions(e=a){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[e,t]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);r===i&&t.resolve(n)}return n}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),n=this.onInitCallbacks.get(r)??new Set;n.add(e),this.onInitCallbacks.set(r,n);let i=this.instances.get(r);return i&&e(i,r),()=>{n.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let n of r)try{n(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===a?void 0:e,options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=a){return this.component?this.component.multipleInstances?e:a:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},{"@firebase/util":"cFyzG","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],cFyzG:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"CONSTANTS",()=>o),n.export(r,"DecodeBase64StringError",()=>f),n.export(r,"Deferred",()=>C),n.export(r,"ErrorFactory",()=>Z),n.export(r,"FirebaseError",()=>X),n.export(r,"MAX_VALUE_MILLIS",()=>ek),n.export(r,"RANDOM_FACTOR",()=>eN),n.export(r,"Sha1",()=>ey),n.export(r,"areCookiesEnabled",()=>Y),n.export(r,"assert",()=>l),n.export(r,"assertionError",()=>u),n.export(r,"async",()=>e_),n.export(r,"base64",()=>d),n.export(r,"base64Decode",()=>g),n.export(r,"base64Encode",()=>p),n.export(r,"base64urlEncodeWithoutPadding",()=>m),n.export(r,"calculateBackoffMillis",()=>eR),n.export(r,"contains",()=>el),n.export(r,"createMockUserToken",()=>R),n.export(r,"createSubscribe",()=>ew),n.export(r,"decode",()=>en),n.export(r,"deepCopy",()=>y),n.export(r,"deepEqual",()=>function e(t,r){if(t===r)return!0;let n=Object.keys(t),i=Object.keys(r);for(let s of n){if(!i.includes(s))return!1;let n=t[s],a=r[s];if(ed(n)&&ed(a)){if(!e(n,a))return!1}else if(n!==a)return!1}for(let e of i)if(!n.includes(e))return!1;return!0}),n.export(r,"deepExtend",()=>w),n.export(r,"errorPrefix",()=>eE),n.export(r,"extractQuerystring",()=>eg),n.export(r,"getDefaultAppConfig",()=>A),n.export(r,"getDefaultEmulatorHost",()=>T),n.export(r,"getDefaultEmulatorHostnameAndPort",()=>S),n.export(r,"getDefaults",()=>E),n.export(r,"getExperimentalSetting",()=>x),n.export(r,"getGlobal",()=>v),n.export(r,"getModularInstance",()=>eO),n.export(r,"getUA",()=>L),n.export(r,"isAdmin",()=>eo),n.export(r,"isBrowser",()=>U),n.export(r,"isBrowserExtension",()=>j),n.export(r,"isCloudWorkstation",()=>k),n.export(r,"isCloudflareWorker",()=>B),n.export(r,"isElectron",()=>z),n.export(r,"isEmpty",()=>eh),n.export(r,"isIE",()=>G),n.export(r,"isIndexedDBAvailable",()=>Q),n.export(r,"isMobileCordova",()=>M),n.export(r,"isNode",()=>F),n.export(r,"isNodeSdk",()=>K),n.export(r,"isReactNative",()=>q),n.export(r,"isSafari",()=>H),n.export(r,"isSafariOrWebkit",()=>W),n.export(r,"isUWP",()=>$),n.export(r,"isValidFormat",()=>ea),n.export(r,"isValidTimestamp",()=>ei),n.export(r,"isWebWorker",()=>V),n.export(r,"issuedAtTime",()=>es),n.export(r,"jsonEval",()=>et),n.export(r,"map",()=>ec),n.export(r,"ordinal",()=>eD),n.export(r,"pingServer",()=>N),n.export(r,"promiseWithTimeout",()=>ef),n.export(r,"querystring",()=>ep),n.export(r,"querystringDecode",()=>em),n.export(r,"safeGet",()=>eu),n.export(r,"stringLength",()=>eC),n.export(r,"stringToByteArray",()=>ex),n.export(r,"stringify",()=>er),n.export(r,"updateEmulatorBanner",()=>P),n.export(r,"validateArgCount",()=>eI),n.export(r,"validateCallback",()=>eS),n.export(r,"validateContextObject",()=>eA),n.export(r,"validateIndexedDBOpenable",()=>J),n.export(r,"validateNamespace",()=>eT);var i=e("./postinstall.mjs"),s=arguments[3],a=e("9b8eb3df8709f05f");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let o={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},l=function(e,t){if(!e)throw u(t)},u=function(e){return Error("Firebase Database ("+o.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},h=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:((64512&i)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[r++]=i>>18|240,t[r++]=i>>12&63|128):t[r++]=i>>12|224,t[r++]=i>>6&63|128),t[r++]=63&i|128)}return t},c=function(e){let t=[],r=0,n=0;for(;r<e.length;){let i=e[r++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[r++];t[n++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=e[r++],a=e[r++],o=e[r++],l=((7&i)<<18|(63&s)<<12|(63&a)<<6|63&o)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(1023&l))}else{let s=e[r++],a=e[r++];t[n++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return t.join("")},d={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,a=s?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,u=i>>2,h=(3&i)<<4|a>>4,c=(15&a)<<2|l>>6,d=63&l;o||(d=64,s||(c=64)),n.push(r[u],r[h],r[c],r[d])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(h(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):c(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){let i=r[e.charAt(t++)],s=t<e.length,a=s?r[e.charAt(t)]:0;++t;let o=t<e.length,l=o?r[e.charAt(t)]:64;++t;let u=t<e.length,h=u?r[e.charAt(t)]:64;if(++t,null==i||null==a||null==l||null==h)throw new f;let c=i<<2|a>>4;if(n.push(c),64!==l){let e=a<<4&240|l>>2;if(n.push(e),64!==h){let e=l<<6&192|h;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class f extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let p=function(e){let t=h(e);return d.encodeByteArray(t,!0)},m=function(e){return p(e).replace(/\./g,"")},g=function(e){try{return d.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e){return w(void 0,e)}function w(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(let r in t)t.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=w(e[r],t[r]));return e}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==s)return s;throw Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _=()=>v().__FIREBASE_DEFAULTS__,b=()=>{if(void 0===a||void 0===a.env)return;let e=void 0;if(e)return JSON.parse(e)},I=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&g(e[1]);return t&&JSON.parse(t)},E=()=>{try{return(0,i.getDefaultsFromPostinstall)()||_()||b()||I()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},T=e=>E()?.emulatorHosts?.[e],S=e=>{let t=T(e);if(!t)return;let r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let n=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),n]:[t.substring(0,r),n]},A=()=>E()?.config,x=e=>E()?.[`_${e}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e){try{let t=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return t.endsWith(".cloudworkstations.dev")}catch{return!1}}async function N(e){let t=await fetch(e,{credentials:"include"});return t.ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let r=t||"demo-project",n=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s={iss:`https://securetoken.google.com/${r}`,aud:r,iat:n,exp:n+3600,auth_time:n,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[m(JSON.stringify({alg:"none",type:"JWT"})),m(JSON.stringify(s)),""].join(".")}let D={},O=!1;function P(e,t){if("undefined"==typeof window||"undefined"==typeof document||!k(window.location.host)||D[e]===t||D[e]||O)return;function r(e){return`__firebase__banner__${e}`}D[e]=t;let n="__firebase__banner",i=function(){let e={prod:[],emulator:[]};for(let t of Object.keys(D))D[t]?e.emulator.push(t):e.prod.push(t);return e}(),s=i.prod.length>0;function a(){let e,t;let i=(e=document.getElementById(n),t=!1,e||((e=document.createElement("div")).setAttribute("id",n),t=!0),{created:t,element:e}),a=r("text"),o=document.getElementById(a)||document.createElement("span"),l=r("learnmore"),u=document.getElementById(l)||document.createElement("a"),h=r("preprendIcon"),c=document.getElementById(h)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(i.created){let e=i.element;e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center",u.setAttribute("id",l),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline";let t=function(){let e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{O=!0,function(){let e=document.getElementById(n);e&&e.remove()}()},e}();c.setAttribute("width","24"),c.setAttribute("id",h),c.setAttribute("height","24"),c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none"),c.style.marginLeft="-6px",e.append(c,o,u,t),document.body.appendChild(e)}s?(o.innerText="Preview backend disconnected.",c.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(c.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,o.innerText="Preview backend running in this workspace."),o.setAttribute("id",a)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",a):a()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function M(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(L())}function F(){let e=E()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(s.process)}catch(e){return!1}}function U(){return"undefined"!=typeof window||V()}function V(){return"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function B(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function j(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function q(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function z(){return L().indexOf("Electron/")>=0}function G(){let e=L();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function $(){return L().indexOf("MSAppHost/")>=0}function K(){return!0===o.NODE_CLIENT||!0===o.NODE_ADMIN}function H(){return!F()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function W(){return!F()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Q(){try{return"object"==typeof indexedDB}catch(e){return!1}}function J(){return new Promise((e,t)=>{try{let r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},i.onupgradeneeded=()=>{r=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}function Y(){return"undefined"!=typeof navigator&&!!navigator.cookieEnabled}class X extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,X.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Z.prototype.create)}}class Z{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},n=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(ee,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`}):"Error",a=`${this.serviceName}: ${s} (${n}).`,o=new X(n,a,r);return o}}let ee=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(e){return JSON.parse(e)}function er(e){return JSON.stringify(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en=function(e){let t={},r={},n={},i="";try{let s=e.split(".");t=et(g(s[0])||""),r=et(g(s[1])||""),i=s[2],n=r.d||{},delete r.d}catch(e){}return{header:t,claims:r,data:n,signature:i}},ei=function(e){let t=en(e).claims,r=Math.floor(new Date().getTime()/1e3),n=0,i=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?n=t.nbf:t.hasOwnProperty("iat")&&(n=t.iat),i=t.hasOwnProperty("exp")?t.exp:n+86400),!!r&&!!n&&!!i&&r>=n&&r<=i},es=function(e){let t=en(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null},ea=function(e){let t=en(e),r=t.claims;return!!r&&"object"==typeof r&&r.hasOwnProperty("iat")},eo=function(e){let t=en(e).claims;return"object"==typeof t&&!0===t.admin};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function eu(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function eh(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function ec(e,t,r){let n={};for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=t.call(r,e[i],i,e));return n}function ed(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(e,t=2e3){let r=new C;return setTimeout(()=>r.reject("timeout!"),t),e.then(r.resolve,r.reject),r.promise}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ep(e){let t=[];for(let[r,n]of Object.entries(e))Array.isArray(n)?n.forEach(e=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function em(e){let t={},r=e.replace(/^\?/,"").split("&");return r.forEach(e=>{if(e){let[r,n]=e.split("=");t[decodeURIComponent(r)]=decodeURIComponent(n)}}),t}function eg(e){let t=e.indexOf("?");if(!t)return"";let r=e.indexOf("#",t);return e.substring(t,r>0?r:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){let r,n;t||(t=0);let i=this.W_;if("string"==typeof e)for(let r=0;r<16;r++)i[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)i[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){let t=i[e-3]^i[e-8]^i[e-14]^i[e-16];i[e]=(t<<1|t>>>31)&4294967295}let s=this.chain_[0],a=this.chain_[1],o=this.chain_[2],l=this.chain_[3],u=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(r=l^a&(o^l),n=1518500249):(r=a^o^l,n=1859775393):e<60?(r=a&o|l&(a|o),n=2400959708):(r=a^o^l,n=3395469782);let t=(s<<5|s>>>27)+r+u+n+i[e]&4294967295;u=l,l=o,o=(a<<30|a>>>2)&4294967295,a=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+a&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);let r=t-this.blockSize,n=0,i=this.buf_,s=this.inbuf_;for(;n<t;){if(0===s)for(;n<=r;)this.compress_(e,n),n+=this.blockSize;if("string"==typeof e){for(;n<t;)if(i[s]=e.charCodeAt(n),++s,++n,s===this.blockSize){this.compress_(i),s=0;break}}else for(;n<t;)if(i[s]=e[n],++s,++n,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){let e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let r=0;for(let t=0;t<5;t++)for(let n=24;n>=0;n-=8)e[r]=this.chain_[t]>>n&255,++r;return e}}function ew(e,t){let r=new ev(e,t);return r.subscribe.bind(r)}class ev{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let n;if(void 0===e&&void 0===t&&void 0===r)throw Error("Missing Observer.");void 0===(n=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:r}:e).next&&(n.next=eb),void 0===n.error&&(n.error=eb),void 0===n.complete&&(n.complete=eb);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch(e){}}),this.observers.push(n),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function e_(e,t){return(...r)=>{Promise.resolve(!0).then(()=>{e(...r)}).catch(e=>{t&&t(e)})}}function eb(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eI=function(e,t,r,n){let i;if(n<t?i="at least "+t:n>r&&(i=0===r?"none":"no more than "+r),i){let t=e+" failed: Was called with "+n+(1===n?" argument.":" arguments.")+" Expects "+i+".";throw Error(t)}};function eE(e,t){return`${e} failed: ${t} argument `}function eT(e,t,r){if((!r||t)&&"string"!=typeof t)throw Error(eE(e,"namespace")+"must be a valid firebase namespace.")}function eS(e,t,r,n){if((!n||r)&&"function"!=typeof r)throw Error(eE(e,t)+"must be a valid function.")}function eA(e,t,r,n){if((!n||r)&&("object"!=typeof r||null===r))throw Error(eE(e,t)+"must be a valid context object.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ex=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);if(i>=55296&&i<=56319){let t=i-55296;l(++n<e.length,"Surrogate pair missing trail surrogate.");let r=e.charCodeAt(n)-56320;i=65536+(t<<10)+r}i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:(i<65536?t[r++]=i>>12|224:(t[r++]=i>>18|240,t[r++]=i>>12&63|128),t[r++]=i>>6&63|128),t[r++]=63&i|128)}return t},eC=function(e){let t=0;for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);n<128?t++:n<2048?t+=2:n>=55296&&n<=56319?(t+=4,r++):t+=3}return t},ek=144e5,eN=.5;function eR(e,t=1e3,r=2){let n=t*Math.pow(r,e);return Math.min(ek,n+Math.round(eN*n*(Math.random()-.5)*2))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eD(e){return Number.isFinite(e)?e+function(e){e=Math.abs(e);let t=e%100;if(t>=10&&t<=20)return"th";let r=e%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"}(e):`${e}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eO(e){return e&&e._delegate?e._delegate:e}},{"9b8eb3df8709f05f":"jDYfS","./postinstall.mjs":"gFY8N","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],jDYfS:[function(e,t,r){var n,i,s,a,o=Object.create,l=Object.defineProperty,u=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyNames,c=Object.getPrototypeOf,d=Object.prototype.hasOwnProperty,f=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of h(t))d.call(e,i)||i===r||l(e,i,{get:()=>t[i],enumerable:!(n=u(t,i))||n.enumerable});return e},p=(e,t,r)=>(r=null!=e?o(c(e)):{},f(!t&&e&&e.__esModule?r:l(r,"default",{value:e,enumerable:!0}),e)),m=(n=(e,t)=>{var r,n,i=t.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var l,u=[],h=!1,c=-1;function d(){h&&l&&(h=!1,l.length?u=l.concat(u):c=-1,u.length&&f())}function f(){if(!h){var e=o(d);h=!0;for(var t=u.length;t;){for(l=u,u=[];++c<t;)l&&l[c].run();c=-1,t=u.length}l=null,h=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new p(e,t)),1!==u.length||h||o(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}},()=>(i||n((i={exports:{}}).exports,i),i.exports)),g={};((e,t)=>{for(var r in t)l(e,r,{get:t[r],enumerable:!0})})(g,{default:()=>w}),t.exports=f(l({},"__esModule",{value:!0}),g);var y=p(m());s=p(m()),a=t.exports,f(g,s,"default"),a&&f(a,s,"default");var w=y.default},{}],gFY8N:[function(e,t,r){/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"getDefaultsFromPostinstall",()=>i);let i=()=>void 0},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"6iQx5":[function(e,t,r){/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var n,i,s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(r),s.export(r,"LogLevel",()=>i),s.export(r,"Logger",()=>c),s.export(r,"setLogLevel",()=>d),s.export(r,"setUserLogHandler",()=>f);let a=[];(n=i||(i={}))[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT";let o={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},l=i.INFO,u={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},h=(e,t,...r)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),i=u[t];if(i)console[i](`[${n}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class c{constructor(e){this.name=e,this._logLevel=l,this._logHandler=h,this._userLogHandler=null,a.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}function d(e){a.forEach(t=>{t.setLogLevel(e)})}function f(e,t){for(let r of a){let n=null;t&&t.level&&(n=o[t.level]),null===e?r.userLogHandler=null:r.userLogHandler=(t,r,...s)=>{let a=s.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");r>=(n??t.logLevel)&&e({level:i[r].toLowerCase(),message:a,args:s,type:t.name})}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],bF9bp:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"unwrap",()=>i.u),n.export(r,"wrap",()=>i.w),n.export(r,"deleteDB",()=>a),n.export(r,"openDB",()=>s);var i=e("./wrap-idb-value.js");function s(e,t,{blocked:r,upgrade:n,blocking:s,terminated:a}={}){let o=indexedDB.open(e,t),l=(0,i.w)(o);return n&&o.addEventListener("upgradeneeded",e=>{n((0,i.w)(o.result),e.oldVersion,e.newVersion,(0,i.w)(o.transaction),e)}),r&&o.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),l.then(e=>{a&&e.addEventListener("close",()=>a()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),l}function a(e,{blocked:t}={}){let r=indexedDB.deleteDatabase(e);return t&&r.addEventListener("blocked",e=>t(e.oldVersion,e)),(0,i.w)(r).then(()=>void 0)}let o=["get","getKey","getAll","getAllKeys","count"],l=["put","add","delete","clear"],u=new Map;function h(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(u.get(t))return u.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,i=l.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(i||o.includes(r)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return n&&(a=a.index(t.shift())),(await Promise.all([a[r](...t),i&&s.done]))[0]};return u.set(t,s),s}(0,i.r)(e=>({...e,get:(t,r,n)=>h(t,r)||e.get(t,r,n),has:(t,r)=>!!h(t,r)||e.has(t,r)}))},{"./wrap-idb-value.js":"bi0fX","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],bi0fX:[function(e,t,r){let n,i;var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(r),s.export(r,"a",()=>c),s.export(r,"i",()=>a),s.export(r,"r",()=>f),s.export(r,"u",()=>m),s.export(r,"w",()=>p);let a=(e,t)=>t.some(t=>e instanceof t),o=new WeakMap,l=new WeakMap,u=new WeakMap,h=new WeakMap,c=new WeakMap,d={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return l.get(e);if("objectStoreNames"===t)return e.objectStoreNames||u.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return p(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function f(e){d=e(d)}function p(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(p(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&o.set(t,e)}).catch(()=>{}),c.set(t,e),t}(e);if(h.has(e))return h.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(m(this),e),p(o.get(this))}:function(...e){return p(t.apply(m(this),e))}:function(e,...r){let n=t.call(m(this),e,...r);return u.set(n,e.sort?e.sort():[e]),p(n)}:(t instanceof IDBTransaction&&function(e){if(l.has(e))return;let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),n()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});l.set(e,t)}(t),a(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,d):t;return r!==e&&(h.set(e,r),c.set(r,e)),r}let m=e=>c.get(e)},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],bq9SB:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r);var i=e("@firebase/auth");n.exportAll(i,r)},{"@firebase/auth":"eLNmf","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],eLNmf:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"ActionCodeOperation",()=>i.A),n.export(r,"ActionCodeURL",()=>i.aj),n.export(r,"AuthCredential",()=>i.M),n.export(r,"AuthErrorCodes",()=>i.J),n.export(r,"EmailAuthCredential",()=>i.N),n.export(r,"EmailAuthProvider",()=>i.W),n.export(r,"FacebookAuthProvider",()=>i.X),n.export(r,"FactorId",()=>i.F),n.export(r,"GithubAuthProvider",()=>i.Z),n.export(r,"GoogleAuthProvider",()=>i.Y),n.export(r,"OAuthCredential",()=>i.Q),n.export(r,"OAuthProvider",()=>i._),n.export(r,"OperationType",()=>i.O),n.export(r,"PhoneAuthCredential",()=>i.U),n.export(r,"PhoneAuthProvider",()=>i.P),n.export(r,"PhoneMultiFactorGenerator",()=>i.n),n.export(r,"ProviderId",()=>i.q),n.export(r,"RecaptchaVerifier",()=>i.R),n.export(r,"SAMLAuthProvider",()=>i.$),n.export(r,"SignInMethod",()=>i.S),n.export(r,"TotpMultiFactorGenerator",()=>i.T),n.export(r,"TotpSecret",()=>i.o),n.export(r,"TwitterAuthProvider",()=>i.a0),n.export(r,"applyActionCode",()=>i.a8),n.export(r,"beforeAuthStateChanged",()=>i.y),n.export(r,"browserCookiePersistence",()=>i.a),n.export(r,"browserLocalPersistence",()=>i.b),n.export(r,"browserPopupRedirectResolver",()=>i.m),n.export(r,"browserSessionPersistence",()=>i.c),n.export(r,"checkActionCode",()=>i.a9),n.export(r,"confirmPasswordReset",()=>i.a7),n.export(r,"connectAuthEmulator",()=>i.L),n.export(r,"createUserWithEmailAndPassword",()=>i.ab),n.export(r,"debugErrorMap",()=>i.H),n.export(r,"deleteUser",()=>i.G),n.export(r,"fetchSignInMethodsForEmail",()=>i.ag),n.export(r,"getAdditionalUserInfo",()=>i.ar),n.export(r,"getAuth",()=>i.p),n.export(r,"getIdToken",()=>i.ao),n.export(r,"getIdTokenResult",()=>i.ap),n.export(r,"getMultiFactorResolver",()=>i.at),n.export(r,"getRedirectResult",()=>i.k),n.export(r,"inMemoryPersistence",()=>i.V),n.export(r,"indexedDBLocalPersistence",()=>i.i),n.export(r,"initializeAuth",()=>i.K),n.export(r,"initializeRecaptchaConfig",()=>i.v),n.export(r,"isSignInWithEmailLink",()=>i.ae),n.export(r,"linkWithCredential",()=>i.a3),n.export(r,"linkWithPhoneNumber",()=>i.l),n.export(r,"linkWithPopup",()=>i.e),n.export(r,"linkWithRedirect",()=>i.h),n.export(r,"multiFactor",()=>i.au),n.export(r,"onAuthStateChanged",()=>i.z),n.export(r,"onIdTokenChanged",()=>i.x),n.export(r,"parseActionCodeURL",()=>i.ak),n.export(r,"prodErrorMap",()=>i.I),n.export(r,"reauthenticateWithCredential",()=>i.a4),n.export(r,"reauthenticateWithPhoneNumber",()=>i.r),n.export(r,"reauthenticateWithPopup",()=>i.f),n.export(r,"reauthenticateWithRedirect",()=>i.j),n.export(r,"reload",()=>i.as),n.export(r,"revokeAccessToken",()=>i.E),n.export(r,"sendEmailVerification",()=>i.ah),n.export(r,"sendPasswordResetEmail",()=>i.a6),n.export(r,"sendSignInLinkToEmail",()=>i.ad),n.export(r,"setPersistence",()=>i.t),n.export(r,"signInAnonymously",()=>i.a1),n.export(r,"signInWithCredential",()=>i.a2),n.export(r,"signInWithCustomToken",()=>i.a5),n.export(r,"signInWithEmailAndPassword",()=>i.ac),n.export(r,"signInWithEmailLink",()=>i.af),n.export(r,"signInWithPhoneNumber",()=>i.s),n.export(r,"signInWithPopup",()=>i.d),n.export(r,"signInWithRedirect",()=>i.g),n.export(r,"signOut",()=>i.D),n.export(r,"unlink",()=>i.aq),n.export(r,"updateCurrentUser",()=>i.C),n.export(r,"updateEmail",()=>i.am),n.export(r,"updatePassword",()=>i.an),n.export(r,"updatePhoneNumber",()=>i.u),n.export(r,"updateProfile",()=>i.al),n.export(r,"useDeviceLanguage",()=>i.B),n.export(r,"validatePassword",()=>i.w),n.export(r,"verifyBeforeUpdateEmail",()=>i.ai),n.export(r,"verifyPasswordResetCode",()=>i.aa);var i=e("./index-1970027f.js");e("@firebase/app"),e("@firebase/util"),e("@firebase/logger"),e("@firebase/component")},{"./index-1970027f.js":"3HUMY","@firebase/app":"bfE4h","@firebase/util":"cFyzG","@firebase/logger":"6iQx5","@firebase/component":"iJpFd","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"3HUMY":[function(e,t,r){var n,i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(r),i.export(r,"$",()=>tS),i.export(r,"A",()=>f),i.export(r,"B",()=>ry),i.export(r,"C",()=>rw),i.export(r,"D",()=>rv),i.export(r,"E",()=>r_),i.export(r,"F",()=>u),i.export(r,"G",()=>rb),i.export(r,"H",()=>m),i.export(r,"I",()=>g),i.export(r,"J",()=>w),i.export(r,"K",()=>eZ),i.export(r,"L",()=>e0),i.export(r,"M",()=>e4),i.export(r,"N",()=>ta),i.export(r,"O",()=>d),i.export(r,"P",()=>no),i.export(r,"Q",()=>tl),i.export(r,"R",()=>r7),i.export(r,"S",()=>c),i.export(r,"T",()=>n5),i.export(r,"U",()=>tp),i.export(r,"V",()=>e_),i.export(r,"W",()=>ty),i.export(r,"X",()=>tb),i.export(r,"Y",()=>tI),i.export(r,"Z",()=>tE),i.export(r,"_",()=>t_),i.export(r,"a",()=>rM),i.export(r,"a0",()=>tA),i.export(r,"a1",()=>tN),i.export(r,"a2",()=>tV),i.export(r,"a3",()=>tB),i.export(r,"a4",()=>tj),i.export(r,"a5",()=>tz),i.export(r,"a6",()=>tQ),i.export(r,"a7",()=>tJ),i.export(r,"a8",()=>tY),i.export(r,"a9",()=>tX),i.export(r,"aA",()=>nV),i.export(r,"aB",()=>eD),i.export(r,"aC",()=>I),i.export(r,"aD",()=>x),i.export(r,"aE",()=>nM),i.export(r,"aF",()=>ew),i.export(r,"aG",()=>eb),i.export(r,"aH",()=>nP),i.export(r,"aI",()=>nT),i.export(r,"aJ",()=>nE),i.export(r,"aK",()=>eV),i.export(r,"aL",()=>eg),i.export(r,"aM",()=>eU),i.export(r,"aN",()=>eP),i.export(r,"aO",()=>rB),i.export(r,"aP",()=>nY),i.export(r,"aQ",()=>L),i.export(r,"aR",()=>tT),i.export(r,"aa",()=>tZ),i.export(r,"ab",()=>t0),i.export(r,"ac",()=>t1),i.export(r,"ad",()=>t2),i.export(r,"ae",()=>t4),i.export(r,"af",()=>t6),i.export(r,"ag",()=>t9),i.export(r,"ah",()=>t3),i.export(r,"ai",()=>t8),i.export(r,"aj",()=>tm),i.export(r,"ak",()=>tg),i.export(r,"al",()=>re),i.export(r,"am",()=>rt),i.export(r,"an",()=>rr),i.export(r,"ao",()=>et),i.export(r,"ap",()=>er),i.export(r,"aq",()=>tP),i.export(r,"ar",()=>rh),i.export(r,"as",()=>eh),i.export(r,"at",()=>rT),i.export(r,"au",()=>rC),i.export(r,"av",()=>k),i.export(r,"aw",()=>eR),i.export(r,"ax",()=>eC),i.export(r,"ay",()=>b),i.export(r,"az",()=>nZ),i.export(r,"b",()=>rD),i.export(r,"c",()=>rU),i.export(r,"d",()=>nm),i.export(r,"e",()=>ny),i.export(r,"f",()=>ng),i.export(r,"g",()=>nx),i.export(r,"h",()=>nR),i.export(r,"i",()=>r1),i.export(r,"j",()=>nk),i.export(r,"k",()=>nO),i.export(r,"l",()=>nr),i.export(r,"m",()=>n1),i.export(r,"n",()=>n6),i.export(r,"o",()=>n3),i.export(r,"p",()=>ia),i.export(r,"q",()=>h),i.export(r,"r",()=>nn),i.export(r,"s",()=>nt),i.export(r,"t",()=>rc),i.export(r,"u",()=>ns),i.export(r,"v",()=>rd),i.export(r,"w",()=>rf),i.export(r,"x",()=>rp),i.export(r,"y",()=>rm),i.export(r,"z",()=>rg);var s=e("@firebase/app"),a=e("@firebase/util"),o=e("@firebase/logger"),l=e("@firebase/component");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let u={PHONE:"phone",TOTP:"totp"},h={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},c={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},d={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},f={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};function p(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let m=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}},g=p,y=new a.ErrorFactory("auth","Firebase",p()),w={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"},v=new o.Logger("@firebase/auth");function _(e,...t){v.logLevel<=o.LogLevel.ERROR&&v.error(`Auth (${s.SDK_VERSION}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e,...t){throw A(e,...t)}function I(e,...t){return A(e,...t)}function E(e,t,r){let n={...g(),[t]:r},i=new a.ErrorFactory("auth","Firebase",n);return i.create(t,{appName:e.name})}function T(e){return E(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function S(e,t,r){if(!(t instanceof r))throw r.name!==t.constructor.name&&b(e,"argument-error"),E(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function A(e,...t){if("string"!=typeof e){let r=t[0],n=[...t.slice(1)];return n[0]&&(n[0].appName=e.name),e._errorFactory.create(r,...n)}return y.create(e,...t)}function x(e,t,...r){if(!e)throw A(t,...r)}function C(e){let t="INTERNAL ASSERTION FAILED: "+e;throw _(t),Error(t)}function k(e,t){e||C(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(){return"undefined"!=typeof self&&self.location?.href||""}function R(){return"http:"===D()||"https:"===D()}function D(){return"undefined"!=typeof self&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t){this.shortDelay=e,this.longDelay=t,k(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,a.isMobileCordova)()||(0,a.isReactNative)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(R()||(0,a.isBrowserExtension)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e,t){k(e.emulator,"Emulator should always be set here");let{url:r}=e.emulator;return t?`${r}${t.startsWith("/")?t.slice(1):t}`:r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void C("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void C("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void C("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let M={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},F=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],U=new O(3e4,6e4);function V(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function B(e,t,r,n,i={}){return j(e,i,async()=>{let i={},s={};n&&("GET"===t?s=n:i={body:JSON.stringify(n)});let o=(0,a.querystring)({key:e.config.apiKey,...s}).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);let u={method:t,headers:l,...i};return(0,a.isCloudflareWorker)()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,a.isCloudWorkstation)(e.emulatorConfig.host)&&(u.credentials="include"),L.fetch()(await z(e,e.config.apiHost,r,o),u)})}async function j(e,t,r){e._canInitEmulator=!1;let n={...M,...t};try{let t=new G(e),i=await Promise.race([r(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw $(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let t=i.ok?s.errorMessage:s.error.message,[r,a]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===r)throw $(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===r)throw $(e,"email-already-in-use",s);if("USER_DISABLED"===r)throw $(e,"user-disabled",s);let o=n[r]||r.toLowerCase().replace(/[_\s]+/g,"-");if(a)throw E(e,o,a);b(e,o)}}catch(t){if(t instanceof a.FirebaseError)throw t;b(e,"network-request-failed",{message:String(t)})}}async function q(e,t,r,n,i={}){let s=await B(e,t,r,n,i);return"mfaPendingCredential"in s&&b(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function z(e,t,r,n){let i=`${t}${r}?${n}`,s=e.config.emulator?P(e.config,i):`${e.config.apiScheme}://${i}`;if(F.includes(r)&&(await e._persistenceManagerAvailable,"COOKIE"===e._getPersistenceType())){let t=e._getPersistence();return t._getFinalTarget(s).toString()}return s}class G{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(I(this.auth,"network-request-failed")),U.get())})}}function $(e,t,r){let n={appName:e.name};r.email&&(n.email=r.email),r.phoneNumber&&(n.phoneNumber=r.phoneNumber);let i=I(e,t,n);return i.customData._tokenResponse=r,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e){return void 0!==e&&void 0!==e.getResponse}function H(e){return void 0!==e&&void 0!==e.enterprise}class W{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(e){return(await B(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function J(e,t){return B(e,"GET","/v2/recaptchaConfig",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y(e,t){return B(e,"POST","/v1/accounts:delete",t)}async function X(e,t){return B(e,"POST","/v1/accounts:update",t)}async function Z(e,t){return B(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(e,t=!1){return(0,a.getModularInstance)(e).getIdToken(t)}async function er(e,t=!1){let r=(0,a.getModularInstance)(e),n=await r.getIdToken(t),i=ei(n);x(i&&i.exp&&i.auth_time&&i.iat,r.auth,"internal-error");let s="object"==typeof i.firebase?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:n,authTime:ee(en(i.auth_time)),issuedAtTime:ee(en(i.iat)),expirationTime:ee(en(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function en(e){return 1e3*Number(e)}function ei(e){let[t,r,n]=e.split(".");if(void 0===t||void 0===r||void 0===n)return _("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,a.base64Decode)(r);if(!e)return _("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return _("Caught error parsing JWT payload as JSON",e?.toString()),null}}function es(e){let t=ei(e);return x(t,"internal-error"),x(void 0!==t.exp,"internal-error"),x(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea(e,t,r=!1){if(r)return t;try{return await t}catch(t){throw t instanceof a.FirebaseError&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;let e=this.user.stsTokenManager.expirationTime??0,t=e-Date.now()-3e5;return Math.max(0,t)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ee(this.lastLoginAt),this.creationTime=ee(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eu(e){let t=e.auth,r=await e.getIdToken(),n=await ea(e,Z(t,{idToken:r}));x(n?.users.length,t,"internal-error");let i=n.users[0];e._notifyReloadListener(i);let s=i.providerUserInfo?.length?ec(i.providerUserInfo):[],a=function(e,t){let r=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...r,...t]}(e.providerData,s),o=e.isAnonymous,l=!(e.email&&i.passwordHash)&&!a?.length,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new el(i.createdAt,i.lastLoginAt),isAnonymous:!!o&&l};Object.assign(e,u)}async function eh(e){let t=(0,a.getModularInstance)(e);await eu(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function ec(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ed(e,t){let r=await j(e,{},async()=>{let r=(0,a.querystring)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:i}=e.config,s=await z(e,n,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";let l={method:"POST",headers:o,body:r};return e.emulatorConfig&&(0,a.isCloudWorkstation)(e.emulatorConfig.host)&&(l.credentials="include"),L.fetch()(s,l)});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function ef(e,t){return B(e,"POST","/v2/accounts:revokeToken",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(void 0!==e.idToken,"internal-error"),x(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):es(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(0!==e.length,"internal-error");let t=es(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(x(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:n,expiresIn:i}=await ed(e,t);this.updateTokensAndExpiration(r,n,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*r}static fromJSON(e,t){let{refreshToken:r,accessToken:n,expirationTime:i}=t,s=new ep;return r&&(x("string"==typeof r,"internal-error",{appName:e}),s.refreshToken=r),n&&(x("string"==typeof n,"internal-error",{appName:e}),s.accessToken=n),i&&(x("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ep,this.toJSON())}_performRefresh(){return C("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(e,t){x("string"==typeof e||void 0===e,"internal-error",{appName:t})}class eg{constructor({uid:e,auth:t,stsTokenManager:r,...n}){this.providerId="firebase",this.proactiveRefresh=new eo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new el(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(e){let t=await ea(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return er(this,e)}reload(){return eh(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new eg({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await eu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,s._isFirebaseServerApp)(this.auth.app))return Promise.reject(T(this.auth));let e=await this.getIdToken();return await ea(this,Y(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,n=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,a=t.tenantId??void 0,o=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:h,emailVerified:c,isAnonymous:d,providerData:f,stsTokenManager:p}=t;x(h&&p,e,"internal-error");let m=ep.fromJSON(this.name,p);x("string"==typeof h,e,"internal-error"),em(r,e.name),em(n,e.name),x("boolean"==typeof c,e,"internal-error"),x("boolean"==typeof d,e,"internal-error"),em(i,e.name),em(s,e.name),em(a,e.name),em(o,e.name),em(l,e.name),em(u,e.name);let g=new eg({uid:h,auth:e,email:n,emailVerified:c,displayName:r,isAnonymous:d,photoURL:s,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),o&&(g._redirectEventId=o),g}static async _fromIdTokenResponse(e,t,r=!1){let n=new ep;n.updateFromServerResponse(t);let i=new eg({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:r});return await eu(i),i}static async _fromGetAccountInfoResponse(e,t,r){let n=t.users[0];x(void 0!==n.localId,"internal-error");let i=void 0!==n.providerUserInfo?ec(n.providerUserInfo):[],s=!(n.email&&n.passwordHash)&&!i?.length,a=new ep;a.updateFromIdToken(r);let o=new eg({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s}),l={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:i,metadata:new el(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!i?.length};return Object.assign(o,l),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ey=new Map;function ew(e){k(e instanceof Function,"Expected a class definition");let t=ey.get(e);return t?k(t instanceof e,"Instance stored in cache mismatched with class"):(t=new e,ey.set(e,t)),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ev.type="NONE";let e_=ev;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eb(e,t,r){return`firebase:${e}:${t}:${r}`}class eI{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:n,name:i}=this.auth;this.fullUserKey=eb(this.userKey,n.apiKey,i),this.fullPersistenceKey=eb("persistence",n.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){let t=await Z(this.auth,{idToken:e}).catch(()=>void 0);return t?eg._fromGetAccountInfoResponse(this.auth,t,e):null}return eg._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new eI(ew(e_),e,r);let n=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=n[0]||ew(e_),s=eb(r,e.config.apiKey,e.name),a=null;for(let r of t)try{let t=await r._get(s);if(t){let n;if("string"==typeof t){let r=await Z(e,{idToken:t}).catch(()=>void 0);if(!r)break;n=await eg._fromGetAccountInfoResponse(e,r,t)}else n=eg._fromJSON(e,t);r!==i&&(a=n),i=r;break}}catch{}let o=n.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&o.length&&(i=o[0],a&&await i._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}}))),new eI(i,e,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eE(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";{if(ex(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(eT(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ek(t))return"Blackberry";if(eN(t))return"Webos";if(eS(t))return"Safari";if((t.includes("chrome/")||eA(t))&&!t.includes("edge/"))return"Chrome";if(eC(t))return"Android";let r=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(r?.length===2)return r[1]}return"Other"}function eT(e=(0,a.getUA)()){return/firefox\//i.test(e)}function eS(e=(0,a.getUA)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function eA(e=(0,a.getUA)()){return/crios\//i.test(e)}function ex(e=(0,a.getUA)()){return/iemobile/i.test(e)}function eC(e=(0,a.getUA)()){return/android/i.test(e)}function ek(e=(0,a.getUA)()){return/blackberry/i.test(e)}function eN(e=(0,a.getUA)()){return/webos/i.test(e)}function eR(e=(0,a.getUA)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function eD(e=(0,a.getUA)()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(e)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(e)}function eO(e=(0,a.getUA)()){return eR(e)||eC(e)||eN(e)||ek(e)||/windows phone/i.test(e)||ex(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eP(e,t=[]){let r;switch(e){case"Browser":r=eE((0,a.getUA)());break;case"Worker":r=`${eE((0,a.getUA)())}-${e}`;break;default:r=e}let n=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${s.SDK_VERSION}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eL{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=t=>new Promise((r,n)=>{try{let n=e(t);r(n)}catch(e){n(e)}});r.onAbort=t,this.queue.push(r);let n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:e?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eM(e,t={}){return B(e,"GET","/v2/passwordPolicy",V(e,t))}class eF{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),n&&(t.meetsMaxPasswordLength=e.length<=n)}validatePasswordCharacterOptions(e,t){let r;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let n=0;n<e.length;n++)r=e.charAt(n),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,n,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eU{constructor(e,t,r,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eB(this),this.idTokenSubscription=new eB(this),this.beforeStateQueue=new eL(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=y,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ew(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await eI.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Z(this,{idToken:e}),r=await eg._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,s._isFirebaseServerApp)(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,n=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=r?._redirectEventId,s=await this.tryRedirectSignIn(e);(!t||t===i)&&s?.user&&(r=s.user,n=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(n)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await eu(e)}catch(e){if(e?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,s._isFirebaseServerApp)(this.app))return Promise.reject(T(this));let t=e?(0,a.getModularInstance)(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,s._isFirebaseServerApp)(this.app)?Promise.reject(T(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,s._isFirebaseServerApp)(this.app)?Promise.reject(T(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ew(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await eM(this),t=new eF(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new a.ErrorFactory("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(r.tenantId=this.tenantId),await ef(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return null===e?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ew(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await eI.create(this,[ew(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return(this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e)?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,n){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(a,this,"internal-error"),a.then(()=>{s||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,r,n);return()=>{s=!0,i()}}{let r=e.addObserver(t);return()=>{s=!0,r()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eP(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if((0,s._isFirebaseServerApp)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&function(e,...t){v.logLevel<=o.LogLevel.WARN&&v.warn(`Auth (${s.SDK_VERSION}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function eV(e){return(0,a.getModularInstance)(e)}class eB{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,a.createSubscribe)(e=>this.observer=e)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ej={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eq(e){return ej.loadJS(e)}function ez(e){return`__${e}${Math.floor(1e6*Math.random())}`}class eG{constructor(e){this.auth=e,this.counter=1e12,this._widgets=new Map}render(e,t){let r=this.counter;return this._widgets.set(r,new eH(e,this.auth.name,t||{})),this.counter++,r}reset(e){let t=e||1e12;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){return this._widgets.get(e||1e12)?.getResponse()||""}async execute(e){return this._widgets.get(e||1e12)?.execute(),""}}class e${constructor(){this.enterprise=new eK}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class eK{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class eH{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};let n="string"==typeof e?document.getElementById(e):e;x(n,"argument-error",{appName:t}),this.container=n,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=function(e){let t=[],r="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let e=0;e<50;e++)t.push(r.charAt(Math.floor(Math.random()*r.length)));return t.join("")}(0);let{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(e){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(e){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw Error("reCAPTCHA mock was already deleted!")}}let eW="NO_RECAPTCHA";class eQ{constructor(e){this.type="recaptcha-enterprise",this.auth=eV(e)}async verify(e="verify",t=!1){async function r(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,r)=>{J(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(n=>{if(void 0===n.recaptchaKey)r(Error("recaptcha Enterprise site key undefined"));else{let r=new W(n);return null==e.tenantId?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,t(r.siteKey)}}).catch(e=>{r(e)})})}function n(t,r,n){let i=window.grecaptcha;H(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{r(e)}).catch(()=>{r(eW)})}):n(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){let e=new e$;return e.execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{r(this.auth).then(r=>{if(!t&&H(window.grecaptcha))n(r,e,i);else{if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=ej.recaptchaEnterpriseScript;0!==t.length&&(t+=r),eq(t).then(()=>{n(r,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function eJ(e,t,r,n=!1,i=!1){let s;let a=new eQ(e);if(i)s=eW;else try{s=await a.verify(r)}catch(e){s=await a.verify(r,!0)}let o={...t};if("mfaSmsEnrollment"===r||"mfaSmsSignIn"===r){if("phoneEnrollmentInfo"in o){let e=o.phoneEnrollmentInfo.phoneNumber,t=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){let e=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function eY(e,t,r,n,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(!e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return n(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await eJ(e,t,r,"getOobCode"===r);return n(e,i)}});{let i=await eJ(e,t,r,"getOobCode"===r);return n(e,i)}}if("PHONE_PROVIDER"!==i)return Promise.reject(i+" provider is not supported.");if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await eJ(e,t,r);return n(e,i).catch(async i=>{if(e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${r} flow.`);let i=await eJ(e,t,r,!1,!0);return n(e,i)}return Promise.reject(i)})}{let i=await eJ(e,t,r,!1,!0);return n(e,i)}}async function eX(e){let t=eV(e),r=await J(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new W(r);if(null==t.tenantId?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isAnyProviderEnabled()){let e=new eQ(t);e.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eZ(e,t){let r=(0,s._getProvider)(e,"auth");if(r.isInitialized()){let e=r.getImmediate(),n=r.getOptions();if((0,a.deepEqual)(n,t??{}))return e;b(e,"already-initialized")}let n=r.initialize({options:t});return n}function e0(e,t,r){let n=eV(e);x(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");let i=!!r?.disableWarnings,s=e1(t),{host:o,port:l}=function(e){let t=e1(e),r=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!r)return{host:"",port:null};let n=r[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){let e=i[1];return{host:e,port:e2(n.substr(e.length+1))}}{let[e,t]=n.split(":");return{host:e,port:e2(t)}}}(t),u=null===l?"":`:${l}`,h={url:`${s}//${o}${u}/`},c=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!n._canInitEmulator){x(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),x((0,a.deepEqual)(h,n.config.emulator)&&(0,a.deepEqual)(c,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=c,n.settings.appVerificationDisabledForTesting=!0,(0,a.isCloudWorkstation)(o)?((0,a.pingServer)(`${s}//${o}${u}`),(0,a.updateEmulatorBanner)("Auth",!0)):i||function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}function e1(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function e2(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e4{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return C("not implemented")}_getIdTokenResponse(e){return C("not implemented")}_linkToIdToken(e,t){return C("not implemented")}_getReauthenticationResolver(e){return C("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6(e,t){return B(e,"POST","/v1/accounts:resetPassword",V(e,t))}async function e5(e,t){return B(e,"POST","/v1/accounts:update",t)}async function e9(e,t){return B(e,"POST","/v1/accounts:signUp",t)}async function e3(e,t){return B(e,"POST","/v1/accounts:update",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e8(e,t){return q(e,"POST","/v1/accounts:signInWithPassword",V(e,t))}async function e7(e,t){return B(e,"POST","/v1/accounts:sendOobCode",V(e,t))}async function te(e,t){return e7(e,t)}async function tt(e,t){return e7(e,t)}async function tr(e,t){return e7(e,t)}async function tn(e,t){return e7(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ti(e,t){return q(e,"POST","/v1/accounts:signInWithEmailLink",V(e,t))}async function ts(e,t){return q(e,"POST","/v1/accounts:signInWithEmailLink",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta extends e4{constructor(e,t,r,n=null){super("password",r),this._email=e,this._password=t,this._tenantId=n}static _fromEmailAndPassword(e,t){return new ta(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ta(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eY(e,t,"signInWithPassword",e8,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ti(e,{email:this._email,oobCode:this._password});default:b(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eY(e,r,"signUpPassword",e9,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ts(e,{idToken:t,email:this._email,oobCode:this._password});default:b(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function to(e,t){return q(e,"POST","/v1/accounts:signInWithIdp",V(e,t))}class tl extends e4{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new tl(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):b("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:n,...i}=t;if(!r||!n)return null;let s=new tl(r,n);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){let t=this.buildRequest();return to(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,to(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,to(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,a.querystring)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tu(e,t){return B(e,"POST","/v1/accounts:sendVerificationCode",V(e,t))}async function th(e,t){return q(e,"POST","/v1/accounts:signInWithPhoneNumber",V(e,t))}async function tc(e,t){let r=await q(e,"POST","/v1/accounts:signInWithPhoneNumber",V(e,t));if(r.temporaryProof)throw $(e,"account-exists-with-different-credential",r);return r}let td={USER_NOT_FOUND:"user-not-found"};async function tf(e,t){let r={...t,operation:"REAUTH"};return q(e,"POST","/v1/accounts:signInWithPhoneNumber",V(e,r),td)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp extends e4{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new tp({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new tp({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return th(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return tc(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return tf(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:n}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:n}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}=e;return r||t||n||i?new tp({verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}):null}}class tm{constructor(e){let t=(0,a.querystringDecode)((0,a.extractQuerystring)(e)),r=t.apiKey??null,n=t.oobCode??null,i=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);x(r&&n&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=n,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=function(e){let t=(0,a.querystringDecode)((0,a.extractQuerystring)(e)).link,r=t?(0,a.querystringDecode)((0,a.extractQuerystring)(t)).deep_link_id:null,n=(0,a.querystringDecode)((0,a.extractQuerystring)(e)).deep_link_id,i=n?(0,a.querystringDecode)((0,a.extractQuerystring)(n)).link:null;return i||n||r||t||e}(e);try{return new tm(t)}catch{return null}}}function tg(e){return tm.parseLink(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(){this.providerId=ty.PROVIDER_ID}static credential(e,t){return ta._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=tm.parseLink(t);return x(r,"argument-error"),ta._fromEmailAndCode(e,r.code,r.tenantId)}}ty.PROVIDER_ID="password",ty.EMAIL_PASSWORD_SIGN_IN_METHOD="password",ty.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv extends tw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class t_ extends tv{static credentialFromJSON(e){let t="string"==typeof e?JSON.parse(e):e;return x("providerId"in t&&"signInMethod"in t,"argument-error"),tl._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return x(e.idToken||e.accessToken,"argument-error"),tl._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return t_.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return t_.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:n,pendingToken:i,nonce:s,providerId:a}=e;if(!r&&!n&&!t&&!i||!a)return null;try{return new t_(a)._credential({idToken:t,accessToken:r,nonce:s,pendingToken:i})}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb extends tv{constructor(){super("facebook.com")}static credential(e){return tl._fromParams({providerId:tb.PROVIDER_ID,signInMethod:tb.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tb.credentialFromTaggedObject(e)}static credentialFromError(e){return tb.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tb.credential(e.oauthAccessToken)}catch{return null}}}tb.FACEBOOK_SIGN_IN_METHOD="facebook.com",tb.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI extends tv{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return tl._fromParams({providerId:tI.PROVIDER_ID,signInMethod:tI.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return tI.credentialFromTaggedObject(e)}static credentialFromError(e){return tI.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return tI.credential(t,r)}catch{return null}}}tI.GOOGLE_SIGN_IN_METHOD="google.com",tI.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE extends tv{constructor(){super("github.com")}static credential(e){return tl._fromParams({providerId:tE.PROVIDER_ID,signInMethod:tE.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tE.credentialFromTaggedObject(e)}static credentialFromError(e){return tE.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tE.credential(e.oauthAccessToken)}catch{return null}}}tE.GITHUB_SIGN_IN_METHOD="github.com",tE.PROVIDER_ID="github.com";class tT extends e4{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){let t=this.buildRequest();return to(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,to(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,to(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:n,pendingToken:i}=t;return r&&n&&i&&r===n?new tT(r,i):null}static _create(e,t){return new tT(e,t)}buildRequest(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}}}class tS extends tw{constructor(e){x(e.startsWith("saml."),"argument-error"),super(e)}static credentialFromResult(e){return tS.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return tS.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){let t=tT.fromJSON(e);return x(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return tT._create(r,t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA extends tv{constructor(){super("twitter.com")}static credential(e,t){return tl._fromParams({providerId:tA.PROVIDER_ID,signInMethod:tA.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return tA.credentialFromTaggedObject(e)}static credentialFromError(e){return tA.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return tA.credential(t,r)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tx(e,t){return q(e,"POST","/v1/accounts:signUp",V(e,t))}tA.TWITTER_SIGN_IN_METHOD="twitter.com",tA.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,n=!1){let i=await eg._fromIdTokenResponse(e,r,n),s=tk(r),a=new tC({user:i,providerId:s,_tokenResponse:r,operationType:t});return a}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let n=tk(r);return new tC({user:e,providerId:n,_tokenResponse:r,operationType:t})}}function tk(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tN(e){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let t=eV(e);if(await t._initializationPromise,t.currentUser?.isAnonymous)return new tC({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await tx(t,{returnSecureToken:!0}),n=await tC._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR extends a.FirebaseError{constructor(e,t,r,n){super(t.code,t.message),this.operationType=r,this.user=n,Object.setPrototypeOf(this,tR.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,n){return new tR(e,t,r,n)}}function tD(e,t,r,n){let i="reauthenticate"===t?r._getReauthenticationResolver(e):r._getIdTokenResponse(e);return i.catch(r=>{if("auth/multi-factor-auth-required"===r.code)throw tR._fromErrorAndOperation(e,r,t,n);throw r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tO(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tP(e,t){let r=(0,a.getModularInstance)(e);await tM(!0,r,t);let{providerUserInfo:n}=await X(r.auth,{idToken:await r.getIdToken(),deleteProvider:[t]}),i=tO(n||[]);return r.providerData=r.providerData.filter(e=>i.has(e.providerId)),i.has("phone")||(r.phoneNumber=null),await r.auth._persistUserIfCurrent(r),r}async function tL(e,t,r=!1){let n=await ea(e,t._linkToIdToken(e.auth,await e.getIdToken()),r);return tC._forOperation(e,"link",n)}async function tM(e,t,r){await eu(t);let n=tO(t.providerData);x(n.has(r)===e,t.auth,!1===e?"provider-already-linked":"no-such-provider")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tF(e,t,r=!1){let{auth:n}=e;if((0,s._isFirebaseServerApp)(n.app))return Promise.reject(T(n));let i="reauthenticate";try{let s=await ea(e,tD(n,i,t,e),r);x(s.idToken,n,"internal-error");let a=ei(s.idToken);x(a,n,"internal-error");let{sub:o}=a;return x(e.uid===o,n,"user-mismatch"),tC._forOperation(e,i,s)}catch(e){throw e?.code==="auth/user-not-found"&&b(n,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tU(e,t,r=!1){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n="signIn",i=await tD(e,n,t),a=await tC._fromIdTokenResponse(e,n,i);return r||await e._updateCurrentUser(a.user),a}async function tV(e,t){return tU(eV(e),t)}async function tB(e,t){let r=(0,a.getModularInstance)(e);return await tM(!1,r,t.providerId),tL(r,t)}async function tj(e,t){return tF((0,a.getModularInstance)(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tq(e,t){return q(e,"POST","/v1/accounts:signInWithCustomToken",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tz(e,t){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let r=eV(e),n=await tq(r,{token:t,returnSecureToken:!0}),i=await tC._fromIdTokenResponse(r,"signIn",n);return await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?t$._fromServerResponse(e,t):"totpInfo"in t?tK._fromServerResponse(e,t):b(e,"internal-error")}}class t$ extends tG{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new t$(t)}}class tK extends tG{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new tK(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tH(e,t,r){x(r.url?.length>0,e,"invalid-continue-uri"),x(void 0===r.dynamicLinkDomain||r.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),x(void 0===r.linkDomain||r.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=r.url,t.dynamicLinkDomain=r.dynamicLinkDomain,t.linkDomain=r.linkDomain,t.canHandleCodeInApp=r.handleCodeInApp,r.iOS&&(x(r.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=r.iOS.bundleId),r.android&&(x(r.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=r.android.installApp,t.androidMinimumVersionCode=r.android.minimumVersion,t.androidPackageName=r.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tW(e){let t=eV(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function tQ(e,t,r){let n=eV(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};r&&tH(n,i,r),await eY(n,i,"getOobCode",tt,"EMAIL_PASSWORD_PROVIDER")}async function tJ(e,t,r){await e6((0,a.getModularInstance)(e),{oobCode:t,newPassword:r}).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tW(e),t})}async function tY(e,t){await e3((0,a.getModularInstance)(e),{oobCode:t})}async function tX(e,t){let r=(0,a.getModularInstance)(e),n=await e6(r,{oobCode:t}),i=n.requestType;switch(x(i,r,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":x(n.newEmail,r,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":x(n.mfaInfo,r,"internal-error");default:x(n.email,r,"internal-error")}let s=null;return n.mfaInfo&&(s=tG._fromServerResponse(eV(r),n.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===n.requestType?n.newEmail:n.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===n.requestType?n.email:n.newEmail)||null,multiFactorInfo:s},operation:i}}async function tZ(e,t){let{data:r}=await tX((0,a.getModularInstance)(e),t);return r.email}async function t0(e,t,r){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n=eV(e),i=eY(n,{returnSecureToken:!0,email:t,password:r,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",tx,"EMAIL_PASSWORD_PROVIDER"),a=await i.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tW(e),t}),o=await tC._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(o.user),o}function t1(e,t,r){return(0,s._isFirebaseServerApp)(e.app)?Promise.reject(T(e)):tV((0,a.getModularInstance)(e),ty.credential(t,r)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tW(e),t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t2(e,t,r){let n=eV(e),i={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};x(r.handleCodeInApp,n,"argument-error"),r&&tH(n,i,r),await eY(n,i,"getOobCode",tr,"EMAIL_PASSWORD_PROVIDER")}function t4(e,t){let r=tm.parseLink(t);return r?.operation==="EMAIL_SIGNIN"}async function t6(e,t,r){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n=(0,a.getModularInstance)(e),i=ty.credentialWithLink(t,r||N());return x(i._tenantId===(n.tenantId||null),n,"tenant-id-mismatch"),tV(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t5(e,t){return B(e,"POST","/v1/accounts:createAuthUri",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t9(e,t){let r=R()?N():"http://localhost",{signinMethods:n}=await t5((0,a.getModularInstance)(e),{identifier:t,continueUri:r});return n||[]}async function t3(e,t){let r=(0,a.getModularInstance)(e),n=await e.getIdToken(),i={requestType:"VERIFY_EMAIL",idToken:n};t&&tH(r.auth,i,t);let{email:s}=await te(r.auth,i);s!==e.email&&await e.reload()}async function t8(e,t,r){let n=(0,a.getModularInstance)(e),i=await e.getIdToken(),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:i,newEmail:t};r&&tH(n.auth,s,r);let{email:o}=await tn(n.auth,s);o!==e.email&&await e.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t7(e,t){return B(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function re(e,{displayName:t,photoURL:r}){if(void 0===t&&void 0===r)return;let n=(0,a.getModularInstance)(e),i=await n.getIdToken(),s=await ea(n,t7(n.auth,{idToken:i,displayName:t,photoUrl:r,returnSecureToken:!0}));n.displayName=s.displayName||null,n.photoURL=s.photoUrl||null;let o=n.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=n.displayName,o.photoURL=n.photoURL),await n._updateTokensIfNecessary(s)}function rt(e,t){let r=(0,a.getModularInstance)(e);return(0,s._isFirebaseServerApp)(r.auth.app)?Promise.reject(T(r.auth)):rn(r,t,null)}function rr(e,t){return rn((0,a.getModularInstance)(e),null,t)}async function rn(e,t,r){let{auth:n}=e,i=await e.getIdToken(),s={idToken:i,returnSecureToken:!0};t&&(s.email=t),r&&(s.password=r);let a=await ea(e,e5(n,s));await e._updateTokensIfNecessary(a,!0)}class ri{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class rs extends ri{constructor(e,t,r,n){super(e,t,r),this.username=n}}class ra extends ri{constructor(e,t){super(e,"facebook.com",t)}}class ro extends rs{constructor(e,t){super(e,"github.com",t,"string"==typeof t?.login?t?.login:null)}}class rl extends ri{constructor(e,t){super(e,"google.com",t)}}class ru extends rs{constructor(e,t,r){super(e,"twitter.com",t,r)}}function rh(e){let{user:t,_tokenResponse:r}=e;return t.isAnonymous&&!r?{providerId:null,isNewUser:!1,profile:null}:/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e)return null;let{providerId:t}=e,r=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},n=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!t&&e?.idToken){let t=ei(e.idToken)?.firebase?.sign_in_provider;if(t)return new ri(n,"anonymous"!==t&&"custom"!==t?t:null)}if(!t)return null;switch(t){case"facebook.com":return new ra(n,r);case"github.com":return new ro(n,r);case"google.com":return new rl(n,r);case"twitter.com":return new ru(n,r,e.screenName||null);case"custom":case"anonymous":return new ri(n,null);default:return new ri(n,t,r)}}(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(e,t){return(0,a.getModularInstance)(e).setPersistence(t)}function rd(e){return eX(e)}async function rf(e,t){let r=eV(e);return r.validatePassword(t)}function rp(e,t,r,n){return(0,a.getModularInstance)(e).onIdTokenChanged(t,r,n)}function rm(e,t,r){return(0,a.getModularInstance)(e).beforeAuthStateChanged(t,r)}function rg(e,t,r,n){return(0,a.getModularInstance)(e).onAuthStateChanged(t,r,n)}function ry(e){(0,a.getModularInstance)(e).useDeviceLanguage()}function rw(e,t){return(0,a.getModularInstance)(e).updateCurrentUser(t)}function rv(e){return(0,a.getModularInstance)(e).signOut()}function r_(e,t){let r=eV(e);return r.revokeAccessToken(t)}async function rb(e){return(0,a.getModularInstance)(e).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new rI("enroll",e,t)}static _fromMfaPendingCredential(e){return new rI("signin",e)}toJSON(){let e="enroll"===this.type?"idToken":"pendingCredential";return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){if(e?.multiFactorSession){if(e.multiFactorSession?.pendingCredential)return rI._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(e.multiFactorSession?.idToken)return rI._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){let r=eV(e),n=t.customData._serverResponse,i=(n.mfaInfo||[]).map(e=>tG._fromServerResponse(r,e));x(n.mfaPendingCredential,r,"internal-error");let s=rI._fromMfaPendingCredential(n.mfaPendingCredential);return new rE(s,i,async e=>{let i=await e._process(r,s);delete n.mfaInfo,delete n.mfaPendingCredential;let a={...n,idToken:i.idToken,refreshToken:i.refreshToken};switch(t.operationType){case"signIn":let o=await tC._fromIdTokenResponse(r,t.operationType,a);return await r._updateCurrentUser(o.user),o;case"reauthenticate":return x(t.user,r,"internal-error"),tC._forOperation(t.user,t.operationType,a);default:b(r,"internal-error")}})}async resolveSignIn(e){return this.signInResolver(e)}}function rT(e,t){let r=(0,a.getModularInstance)(e);return x(t.customData.operationType,r,"argument-error"),x(t.customData._serverResponse?.mfaPendingCredential,r,"argument-error"),rE._fromError(r,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rS(e,t){return B(e,"POST","/v2/accounts/mfaEnrollment:start",V(e,t))}class rA{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>tG._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new rA(e)}async getSession(){return rI._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){let r=await this.getSession(),n=await ea(this.user,e._process(this.user.auth,r,t));return await this.user._updateTokensIfNecessary(n),this.user.reload()}async unenroll(e){let t="string"==typeof e?e:e.uid,r=await this.user.getIdToken();try{var n;let e=await ea(this.user,(n=this.user.auth,B(n,"POST","/v2/accounts/mfaEnrollment:withdraw",V(n,{idToken:r,mfaEnrollmentId:t}))));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t),await this.user._updateTokensIfNecessary(e),await this.user.reload()}catch(e){throw e}}}let rx=new WeakMap;function rC(e){let t=(0,a.getModularInstance)(e);return rx.has(t)||rx.set(t,rA._fromUser(t)),rx.get(t)}let rk="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rN{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(rk,"1"),this.storage.removeItem(rk),Promise.resolve(!0)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class rR extends rN{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=eO(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),n=this.localCache[t];r!==n&&e(t,n,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,r)=>{this.notifyListeners(e,r)});return}let r=e.key;t?this.detachListener():this.stopPolling();let n=()=>{let e=this.storage.getItem(r);(t||this.localCache[r]!==e)&&this.notifyListeners(r,e)},i=this.storage.getItem(r);(0,a.isIE)()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,10):n()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rR.type="LOCAL";let rD=rR;function rO(e){let t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),r=RegExp(`${t}=([^;]+)`);return document.cookie.match(r)?.[1]??null}function rP(e){let t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class rL{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){window;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!!("boolean"!=typeof isSecureContext||isSecureContext)&&"undefined"!=typeof navigator&&"undefined"!=typeof document&&(navigator.cookieEnabled??!0)}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=rP(e);if(window.cookieStore){let e=await window.cookieStore.get(t);return e?.value}return rO(t)}async _remove(e){if(!this._isAvailable())return;let t=await this._get(e);if(!t)return;let r=rP(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>void 0)}_addListener(e,t){if(!this._isAvailable())return;let r=rP(e);if(window.cookieStore){let e=e=>{let n=e.changed.find(e=>e.name===r);n&&t(n.value);let i=e.deleted.find(e=>e.name===r);i&&t(null)};return this.listenerUnsubscribes.set(t,()=>window.cookieStore.removeEventListener("change",e)),window.cookieStore.addEventListener("change",e)}let n=rO(r),i=setInterval(()=>{let e=rO(r);e!==n&&(t(e),n=e)},1e3);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}}rL.type="COOKIE";let rM=rL;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rF extends rN{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rF.type="SESSION";let rU=rF;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rV{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let r=new rV(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:r,data:n}=e.data,i=this.handlersMap[r];if(!i?.size)return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:r});let s=Array.from(i).map(async t=>t(e.origin,n)),a=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rB(e="",t=10){let r="";for(let e=0;e<t;e++)r+=Math.floor(10*Math.random());return e+r}rV.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rj{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let n,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((a,o)=>{let l=rB("",20);s.port1.start();let u=setTimeout(()=>{o(Error("unsupported_event"))},r);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(u),n=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(n),a(e.data.response);break;default:clearTimeout(u),clearTimeout(n),o(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rq(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rz(){return void 0!==rq().WorkerGlobalScope&&"function"==typeof rq().importScripts}async function rG(){if(!navigator?.serviceWorker)return null;try{let e=await navigator.serviceWorker.ready;return e.active}catch{return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r$="firebaseLocalStorageDb",rK="firebaseLocalStorage",rH="fbase_key";class rW{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function rQ(e,t){return e.transaction([rK],t?"readwrite":"readonly").objectStore(rK)}function rJ(){let e=indexedDB.open(r$,1);return new Promise((t,r)=>{e.addEventListener("error",()=>{r(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(rK,{keyPath:rH})}catch(e){r(e)}}),e.addEventListener("success",async()=>{let r=e.result;r.objectStoreNames.contains(rK)?t(r):(r.close(),await function(){let e=indexedDB.deleteDatabase(r$);return new rW(e).toPromise()}(),t(await rJ()))})})}async function rY(e,t,r){let n=rQ(e,!0).put({[rH]:t,value:r});return new rW(n).toPromise()}async function rX(e,t){let r=rQ(e,!1).get(t),n=await new rW(r).toPromise();return void 0===n?null:n.value}function rZ(e,t){let r=rQ(e,!0).delete(t);return new rW(r).toPromise()}class r0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await rJ()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rz()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=rV._getInstance(rz()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>{let r=await this._poll();return{keyProcessed:r.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await rG(),!this.activeServiceWorker)return;this.sender=new rj(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await rJ();return await rY(e,rk,"1"),await rZ(e,rk),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>rY(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>rX(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>rZ(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>{let t=rQ(e,!1).getAll();return new rW(t).toPromise()});if(!e||0!==this.pendingWrites)return[];let t=[],r=new Set;if(0!==e.length)for(let{fbase_key:n,value:i}of e)r.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(i)&&(this.notifyListeners(n,i),t.push(n));for(let e of Object.keys(this.localCache))this.localCache[e]&&!r.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}r0.type="LOCAL";let r1=r0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r2(e,t){return B(e,"POST","/v2/accounts/mfaSignIn:start",V(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r4=ez("rcb"),r6=new O(3e4,6e4);class r5{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!rq().grecaptcha?.render}load(e,t=""){return(x(t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t),e,"argument-error"),this.shouldResolveImmediately(t)&&K(rq().grecaptcha))?Promise.resolve(rq().grecaptcha):new Promise((r,n)=>{let i=rq().setTimeout(()=>{n(I(e,"network-request-failed"))},r6.get());rq()[r4]=()=>{rq().clearTimeout(i),delete rq()[r4];let s=rq().grecaptcha;if(!s||!K(s)){n(I(e,"internal-error"));return}let a=s.render;s.render=(e,t)=>{let r=a(e,t);return this.counter++,r},this.hostLanguage=t,r(s)};let s=`${ej.recaptchaV2Script}?${(0,a.querystring)({onload:r4,render:"explicit",hl:t})}`;eq(s).catch(()=>{clearTimeout(i),n(I(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!rq().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}class r9{async load(e){return new eG(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r3="recaptcha",r8={theme:"light",type:"image"};class r7{constructor(e,t,r={...r8}){this.parameters=r,this.type=r3,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=eV(e),this.isInvisible="invisible"===this.parameters.size,x("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");let n="string"==typeof t?document.getElementById(t):t;x(n,this.auth,"argument-error"),this.container=n,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new r9:new r5,this.validateStartingState()}async verify(){this.assertNotDestroyed();let e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(r=>{let n=e=>{e&&(this.tokenChangeListeners.delete(n),r(e))};this.tokenChangeListeners.add(n),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){x(!this.parameters.sitekey,this.auth,"argument-error"),x(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),x("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){let r=rq()[e];"function"==typeof r&&r(t)}}}assertNotDestroyed(){x(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){let t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){let e;x(R()&&!rz(),this.auth,"internal-error"),await (e=null,new Promise(t=>{if("complete"===document.readyState){t();return}e=()=>t(),window.addEventListener("load",e)}).catch(t=>{throw e&&window.removeEventListener("load",e),t})),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);let t=await Q(this.auth);x(t,this.auth,"internal-error"),this.parameters.sitekey=t}getAssertedRecaptcha(){return x(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){let t=tp._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function nt(e,t,r){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n=eV(e),i=await ni(n,t,(0,a.getModularInstance)(r));return new ne(i,e=>tV(n,e))}async function nr(e,t,r){let n=(0,a.getModularInstance)(e);await tM(!1,n,"phone");let i=await ni(n.auth,t,(0,a.getModularInstance)(r));return new ne(i,e=>tB(n,e))}async function nn(e,t,r){let n=(0,a.getModularInstance)(e);if((0,s._isFirebaseServerApp)(n.auth.app))return Promise.reject(T(n.auth));let i=await ni(n.auth,t,(0,a.getModularInstance)(r));return new ne(i,e=>tj(n,e))}async function ni(e,t,r){if(!e._getRecaptchaConfig())try{await eX(e)}catch(e){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let n;if(n="string"==typeof t?{phoneNumber:t}:t,"session"in n){let t=n.session;if("phoneNumber"in n){x("enroll"===t.type,e,"internal-error");let i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===eW){x(r?.type===r3,e,"argument-error");let n=await na(e,t,r);return rS(e,n)}return rS(e,t)},a=eY(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),o=await a.catch(e=>Promise.reject(e));return o.phoneSessionInfo.sessionInfo}{x("signin"===t.type,e,"internal-error");let i=n.multiFactorHint?.uid||n.multiFactorUid;x(i,e,"missing-multi-factor-info");let s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},a=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===eW){x(r?.type===r3,e,"argument-error");let n=await na(e,t,r);return r2(e,n)}return r2(e,t)},o=eY(e,s,"mfaSmsSignIn",a,"PHONE_PROVIDER"),l=await o.catch(e=>Promise.reject(e));return l.phoneResponseInfo.sessionInfo}}{let t={phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===eW){x(r?.type===r3,e,"argument-error");let n=await na(e,t,r);return tu(e,n)}return tu(e,t)},s=eY(e,t,"sendVerificationCode",i,"PHONE_PROVIDER"),a=await s.catch(e=>Promise.reject(e));return a.sessionInfo}}finally{r?._reset()}}async function ns(e,t){let r=(0,a.getModularInstance)(e);if((0,s._isFirebaseServerApp)(r.auth.app))return Promise.reject(T(r.auth));await tL(r,t)}async function na(e,t,r){x(r.type===r3,e,"argument-error");let n=await r.verify();x("string"==typeof n,e,"argument-error");let i={...t};if("phoneEnrollmentInfo"in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,r=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:n,captchaResponse:t,clientType:r,recaptchaVersion:s}}),i}if(!("phoneSignInInfo"in i))return Object.assign(i,{recaptchaToken:n}),i;{let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,r=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:e,clientType:t,recaptchaVersion:r}}),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.providerId=no.PROVIDER_ID,this.auth=eV(e)}verifyPhoneNumber(e,t){return ni(this.auth,e,(0,a.getModularInstance)(t))}static credential(e,t){return tp._fromVerification(e,t)}static credentialFromResult(e){return no.credentialFromTaggedObject(e)}static credentialFromError(e){return no.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?tp._fromTokenResponse(t,r):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(e,t){return t?ew(t):(x(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}no.PROVIDER_ID="phone",no.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu extends e4{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return to(e,this._buildIdpRequest())}_linkToIdToken(e,t){return to(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return to(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function nh(e){return tU(e.auth,new nu(e),e.bypassAuthState)}function nc(e){let{auth:t,user:r}=e;return x(r,t,"internal-error"),tF(r,new nu(e),e.bypassAuthState)}async function nd(e){let{auth:t,user:r}=e;return x(r,t,"internal-error"),tL(r,new nu(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,t,r,n,i=!1){this.auth=e,this.resolver=r,this.user=n,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:n,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return nh;case"linkViaPopup":case"linkViaRedirect":return nd;case"reauthViaPopup":case"reauthViaRedirect":return nc;default:b(this.auth,"internal-error")}}resolve(e){k(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){k(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let np=new O(2e3,1e4);async function nm(e,t,r){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(I(e,"operation-not-supported-in-this-environment"));let n=eV(e);S(e,t,tw);let i=nl(n,r),a=new nw(n,"signInViaPopup",t,i);return a.executeNotNull()}async function ng(e,t,r){let n=(0,a.getModularInstance)(e);if((0,s._isFirebaseServerApp)(n.auth.app))return Promise.reject(I(n.auth,"operation-not-supported-in-this-environment"));S(n.auth,t,tw);let i=nl(n.auth,r),o=new nw(n.auth,"reauthViaPopup",t,i,n);return o.executeNotNull()}async function ny(e,t,r){let n=(0,a.getModularInstance)(e);S(n.auth,t,tw);let i=nl(n.auth,r),s=new nw(n.auth,"linkViaPopup",t,i,n);return s.executeNotNull()}class nw extends nf{constructor(e,t,r,n,i){super(e,t,n,i),this.provider=r,this.authWindow=null,this.pollId=null,nw.currentPopupAction&&nw.currentPopupAction.cancel(),nw.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){k(1===this.filter.length,"Popup operations only handle one event");let e=rB();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(I(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(I(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nw.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(I(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,np.get())};e()}}nw.currentPopupAction=null;let nv=new Map;class n_ extends nf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=nv.get(this.auth._key());if(!e){try{let t=await nb(this.resolver,this.auth),r=t?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}nv.set(this.auth._key(),e)}return this.bypassAuthState||nv.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nb(e,t){let r=nA(t),n=nS(e);if(!await n._isAvailable())return!1;let i=await n._get(r)==="true";return await n._remove(r),i}async function nI(e,t){return nS(e)._set(nA(t),"true")}function nE(){nv.clear()}function nT(e,t){nv.set(e._key(),t)}function nS(e){return ew(e._redirectPersistence)}function nA(e){return eb("pendingRedirect",e.config.apiKey,e.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nx(e,t,r){return nC(e,t,r)}async function nC(e,t,r){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n=eV(e);S(e,t,tw),await n._initializationPromise;let i=nl(n,r);return await nI(i,n),i._openRedirect(n,t,"signInViaRedirect")}function nk(e,t,r){return nN(e,t,r)}async function nN(e,t,r){let n=(0,a.getModularInstance)(e);if(S(n.auth,t,tw),(0,s._isFirebaseServerApp)(n.auth.app))return Promise.reject(T(n.auth));await n.auth._initializationPromise;let i=nl(n.auth,r);await nI(i,n.auth);let o=await nL(n);return i._openRedirect(n.auth,t,"reauthViaRedirect",o)}function nR(e,t,r){return nD(e,t,r)}async function nD(e,t,r){let n=(0,a.getModularInstance)(e);S(n.auth,t,tw),await n.auth._initializationPromise;let i=nl(n.auth,r);await tM(!1,n,t.providerId),await nI(i,n.auth);let s=await nL(n);return i._openRedirect(n.auth,t,"linkViaRedirect",s)}async function nO(e,t){return await eV(e)._initializationPromise,nP(e,t,!1)}async function nP(e,t,r=!1){if((0,s._isFirebaseServerApp)(e.app))return Promise.reject(T(e));let n=eV(e),i=nl(n,t),a=new n_(n,i,r),o=await a.execute();return o&&!r&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,t)),o}async function nL(e){let t=rB(`${e.uid}:::`);return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}class nM{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return nU(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!nU(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(I(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(nF(e))}saveEventToCache(e){this.cachedEventUids.add(nF(e)),this.lastProcessedEventTime=Date.now()}}function nF(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function nU({type:e,error:t}){return"unknown"===e&&t?.code==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nV(e,t={}){return B(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nB=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nj=/^https?/;async function nq(e){if(e.config.emulator)return;let{authorizedDomains:t}=await nV(e);for(let e of t)try{if(function(e){let t=N(),{protocol:r,hostname:n}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===n?"chrome-extension:"===r&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===r&&i.hostname===n}if(!nj.test(r))return!1;if(nB.test(e))return n===e;let i=e.replace(/\./g,"\\."),s=RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(n)}(e))return}catch{}b(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nz=new O(3e4,6e4);function nG(){let e=rq().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let n$=null,nK=new O(5e3,15e3),nH={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},nW=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function nQ(e){let t=await (n$=n$||new Promise((t,r)=>{function n(){nG(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{nG(),r(I(e,"network-request-failed"))},timeout:nz.get()})}if(rq().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(rq().gapi?.load)n();else{let t=ez("iframefcb");return rq()[t]=()=>{gapi.load?n():r(I(e,"network-request-failed"))},eq(`${ej.gapiScript}?onload=${t}`).catch(e=>r(e))}}).catch(e=>{throw n$=null,e})),r=rq().gapi;return x(r,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;x(t.authDomain,e,"auth-domain-config-required");let r=t.emulator?P(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,n={apiKey:t.apiKey,appName:e.name,v:s.SDK_VERSION},i=nW.get(e.config.apiHost);i&&(n.eid=i);let o=e._getFrameworks();return o.length&&(n.fw=o.join(",")),`${r}?${(0,a.querystring)(n).slice(1)}`}(e),messageHandlersFilter:r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:nH,dontclear:!0},t=>new Promise(async(r,n)=>{await t.restyle({setHideOnLeave:!1});let i=I(e,"network-request-failed"),s=rq().setTimeout(()=>{n(i)},nK.get());function a(){rq().clearTimeout(s),r(t)}t.ping(a).then(a,()=>{n(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nJ={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class nY{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let nX=encodeURIComponent("fac");async function nZ(e,t,r,n,i,o){x(e.config.authDomain,e,"auth-domain-config-required"),x(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:r,redirectUrl:n,v:s.SDK_VERSION,eventId:i};if(t instanceof tw)for(let[r,n]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,a.isEmpty)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))l[r]=n;if(t instanceof tv){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}for(let t of(e.tenantId&&(l.tid=e.tenantId),Object.keys(l)))void 0===l[t]&&delete l[t];let u=await e._getAppCheckToken(),h=u?`#${nX}=${encodeURIComponent(u)}`:"";return`${function({config:e}){return e.emulator?P(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,a.querystring)(l).slice(1)}${h}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n0="webStorageSupport",n1=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=rU,this._completeRedirectFn=nP,this._overrideRedirectResult=nT}async _openPopup(e,t,r,n){k(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let i=await nZ(e,t,r,N(),n);return function(e,t,r,n=500,i=600){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString(),l="",u={...nJ,width:n.toString(),height:i.toString(),top:s,left:o},h=(0,a.getUA)().toLowerCase();r&&(l=eA(h)?"_blank":r),eT(h)&&(t=t||"http://localhost",u.scrollbars="yes");let c=Object.entries(u).reduce((e,[t,r])=>`${e}${t}=${r},`,"");if(function(e=(0,a.getUA)()){return eR(e)&&!!window.navigator?.standalone}(h)&&"_self"!==l)return function(e,t){let r=document.createElement("a");r.href=e,r.target=t;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),r.dispatchEvent(n)}(t||"",l),new nY(null);let d=window.open(t||"",l,c);x(d,e,"popup-blocked");try{d.focus()}catch(e){}return new nY(d)}(e,i,rB())}async _openRedirect(e,t,r,n){await this._originValidation(e);let i=await nZ(e,t,r,N(),n);return rq().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(k(r,"If manager is not set, promise should be"),r)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await nQ(e),r=new nM(e);return t.register("authEvent",t=>{x(t?.authEvent,e,"invalid-auth-event");let n=r.onEvent(t.authEvent);return{status:n?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){let r=this.iframes[e._key()];r.send(n0,{type:n0},r=>{let n=r?.[0]?.[n0];void 0!==n&&t(!!n),b(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=nq(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return eO()||eS()||eR()}};class n2{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return C("unexpected MultiFactorSessionType")}}}class n4 extends n2{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n4(e)}_finalizeEnroll(e,t,r){return B(e,"POST","/v2/accounts/mfaEnrollment:finalize",V(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return B(e,"POST","/v2/accounts/mfaSignIn:finalize",V(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class n6{constructor(){}static assertion(e){return n4._fromCredential(e)}}n6.FACTOR_ID="phone";class n5{static assertionForEnrollment(e,t){return n9._fromSecret(e,t)}static assertionForSignIn(e,t){return n9._fromEnrollmentId(e,t)}static async generateSecret(e){var t;x(void 0!==e.user?.auth,"internal-error");let r=await B(t=e.user.auth,"POST","/v2/accounts/mfaEnrollment:start",V(t,{idToken:e.credential,totpEnrollmentInfo:{}}));return n3._fromStartTotpMfaEnrollmentResponse(r,e.user.auth)}}n5.FACTOR_ID="totp";class n9 extends n2{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n9(t,void 0,e)}static _fromEnrollmentId(e,t){return new n9(t,e)}async _finalizeEnroll(e,t,r){return x(void 0!==this.secret,e,"argument-error"),B(e,"POST","/v2/accounts/mfaEnrollment:finalize",V(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){x(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let r={verificationCode:this.otp};return B(e,"POST","/v2/accounts/mfaSignIn:finalize",V(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r}))}}class n3{constructor(e,t,r,n,i,s,a){this.sessionInfo=s,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=n,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n3(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(n8(e)||n8(t))&&(r=!0),r&&(n8(e)&&(e=this.auth.currentUser?.email||"unknownuser"),n8(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function n8(e){return void 0===e||e?.length===0}var n7="@firebase/auth",ie="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;let t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let ir=(0,a.getExperimentalSetting)("authIdTokenMaxAge")||300,ii=null,is=e=>async t=>{let r=t&&await t.getIdTokenResult(),n=r&&(new Date().getTime()-Date.parse(r.issuedAtTime))/1e3;if(n&&n>ir)return;let i=r?.token;ii!==i&&(ii=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ia(e=(0,s.getApp)()){let t=(0,s._getProvider)(e,"auth");if(t.isInitialized())return t.getImmediate();let r=eZ(e,{popupRedirectResolver:n1,persistence:[r1,rD,rU]}),n=(0,a.getExperimentalSetting)("authTokenSyncURL");if(n&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(n,location.origin);if(location.origin===e.origin){let t=is(e.toString());rm(r,t,()=>t(r.currentUser)),rp(r,e=>t(e))}}let i=(0,a.getDefaultEmulatorHost)("auth");return i&&e0(r,`http://${i}`),r}ej={loadJS:e=>new Promise((t,r)=>{let n=document.createElement("script");n.setAttribute("src",e),n.onload=t,n.onerror=e=>{let t=I("internal-error");t.customData=e,r(t)},n.type="text/javascript",n.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(n)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},n="Browser",(0,s._registerComponent)(new(0,l.Component)("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=r.options;x(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eP(n)},u=new eU(r,i,s,l);return function(e,t){let r=t?.persistence||[],n=(Array.isArray(r)?r:[r]).map(ew);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,t?.popupRedirectResolver)}(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{let n=e.getProvider("auth-internal");n.initialize()})),(0,s._registerComponent)(new(0,l.Component)("auth-internal",e=>{let t=eV(e.getProvider("auth").getImmediate());return new it(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,s.registerVersion)(n7,ie,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(n)),(0,s.registerVersion)(n7,ie,"esm2020")},{"@firebase/app":"bfE4h","@firebase/util":"cFyzG","@firebase/logger":"6iQx5","@firebase/component":"iJpFd","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"73OW7":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r);var i=e("@firebase/firestore");n.exportAll(i,r)},{"@firebase/firestore":"eHa8k","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],eHa8k:[function(e,t,r){var n,i,s,a,o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"AbstractUserDataWriter",()=>u3),o.export(r,"AggregateField",()=>l7),o.export(r,"AggregateQuerySnapshot",()=>ue),o.export(r,"Bytes",()=>ut),o.export(r,"CACHE_SIZE_UNLIMITED",()=>lH),o.export(r,"CollectionReference",()=>lM),o.export(r,"DocumentReference",()=>lL),o.export(r,"DocumentSnapshot",()=>ho),o.export(r,"FieldPath",()=>ur),o.export(r,"FieldValue",()=>ui),o.export(r,"Firestore",()=>lW),o.export(r,"FirestoreError",()=>D),o.export(r,"GeoPoint",()=>us),o.export(r,"LoadBundleTask",()=>lK),o.export(r,"PersistentCacheIndexManager",()=>h6),o.export(r,"Query",()=>lP),o.export(r,"QueryCompositeFilterConstraint",()=>uq),o.export(r,"QueryConstraint",()=>uU),o.export(r,"QueryDocumentSnapshot",()=>hu),o.export(r,"QueryEndAtConstraint",()=>uZ),o.export(r,"QueryFieldFilterConstraint",()=>uB),o.export(r,"QueryLimitConstraint",()=>uH),o.export(r,"QueryOrderByConstraint",()=>u$),o.export(r,"QuerySnapshot",()=>hh),o.export(r,"QueryStartAtConstraint",()=>uJ),o.export(r,"SnapshotMetadata",()=>ha),o.export(r,"Timestamp",()=>eh),o.export(r,"Transaction",()=>hH),o.export(r,"VectorValue",()=>ua),o.export(r,"WriteBatch",()=>hG),o.export(r,"_AutoId",()=>z),o.export(r,"_ByteString",()=>tY),o.export(r,"_DatabaseId",()=>rt),o.export(r,"_DocumentKey",()=>Z),o.export(r,"_EmptyAppCheckTokenProvider",()=>q),o.export(r,"_EmptyAuthCredentialsProvider",()=>L),o.export(r,"_FieldPath",()=>X),o.export(r,"_TestingHooks",()=>cn),o.export(r,"_cast",()=>ea),o.export(r,"_debugAssert",()=>N),o.export(r,"_internalAggregationQueryToProtoRunAggregationQueryRequest",()=>cr),o.export(r,"_internalQueryToProtoQueryTarget",()=>ct),o.export(r,"_isBase64Available",()=>tJ),o.export(r,"_logWarn",()=>S),o.export(r,"_validateIsNotUsedTogether",()=>et),o.export(r,"addDoc",()=>hE),o.export(r,"aggregateFieldEqual",()=>hn),o.export(r,"aggregateQuerySnapshotEqual",()=>hi),o.export(r,"and",()=>uG),o.export(r,"arrayRemove",()=>hX),o.export(r,"arrayUnion",()=>hY),o.export(r,"average",()=>ht),o.export(r,"clearIndexedDbPersistence",()=>l2),o.export(r,"collection",()=>lF),o.export(r,"collectionGroup",()=>lU),o.export(r,"connectFirestoreEmulator",()=>lO),o.export(r,"count",()=>hr),o.export(r,"deleteAllPersistentCacheIndexes",()=>h8),o.export(r,"deleteDoc",()=>hI),o.export(r,"deleteField",()=>hQ),o.export(r,"disableNetwork",()=>l5),o.export(r,"disablePersistentCacheIndexAutoCreation",()=>h3),o.export(r,"doc",()=>lV),o.export(r,"documentId",()=>un),o.export(r,"documentSnapshotFromJSON",()=>hl),o.export(r,"enableIndexedDbPersistence",()=>lZ),o.export(r,"enableMultiTabIndexedDbPersistence",()=>l0),o.export(r,"enableNetwork",()=>l6),o.export(r,"enablePersistentCacheIndexAutoCreation",()=>h9),o.export(r,"endAt",()=>u1),o.export(r,"endBefore",()=>u0),o.export(r,"ensureFirestoreConfigured",()=>lY),o.export(r,"executeWrite",()=>hx),o.export(r,"getAggregateFromServer",()=>hN),o.export(r,"getCountFromServer",()=>hk),o.export(r,"getDoc",()=>hf),o.export(r,"getDocFromCache",()=>hm),o.export(r,"getDocFromServer",()=>hg),o.export(r,"getDocs",()=>hy),o.export(r,"getDocsFromCache",()=>hw),o.export(r,"getDocsFromServer",()=>hv),o.export(r,"getFirestore",()=>lJ),o.export(r,"getPersistentCacheIndexManager",()=>h5),o.export(r,"increment",()=>hZ),o.export(r,"initializeFirestore",()=>lQ),o.export(r,"limit",()=>uW),o.export(r,"limitToLast",()=>uQ),o.export(r,"loadBundle",()=>l3),o.export(r,"memoryEagerGarbageCollector",()=>hL),o.export(r,"memoryLocalCache",()=>hF),o.export(r,"memoryLruGarbageCollector",()=>hM),o.export(r,"namedQuery",()=>l8),o.export(r,"onSnapshot",()=>hT),o.export(r,"onSnapshotResume",()=>hS),o.export(r,"onSnapshotsInSync",()=>hA),o.export(r,"or",()=>uz),o.export(r,"orderBy",()=>uK),o.export(r,"persistentLocalCache",()=>hU),o.export(r,"persistentMultipleTabManager",()=>hq),o.export(r,"persistentSingleTabManager",()=>hj),o.export(r,"query",()=>uV),o.export(r,"queryEqual",()=>lj),o.export(r,"querySnapshotFromJSON",()=>hc),o.export(r,"refEqual",()=>lB),o.export(r,"runTransaction",()=>hW),o.export(r,"serverTimestamp",()=>hJ),o.export(r,"setDoc",()=>h_),o.export(r,"setIndexConfiguration",()=>h2),o.export(r,"setLogLevel",()=>I),o.export(r,"snapshotEqual",()=>hd),o.export(r,"startAfter",()=>uX),o.export(r,"startAt",()=>uY),o.export(r,"sum",()=>he),o.export(r,"terminate",()=>l9),o.export(r,"updateDoc",()=>hb),o.export(r,"vector",()=>h0),o.export(r,"waitForPendingWrites",()=>l4),o.export(r,"where",()=>uj),o.export(r,"writeBatch",()=>h1);var l=e("@firebase/app"),u=e("@firebase/component"),h=e("@firebase/logger"),c=e("@firebase/util"),d=e("@firebase/webchannel-wrapper/bloom-blob"),f=e("@firebase/webchannel-wrapper/webchannel-blob"),p=e("290e16c8c221c197"),m=e("f1f9903160a0afb3").Buffer;let g="@firebase/firestore",y="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}w.UNAUTHENTICATED=new w(null),w.GOOGLE_CREDENTIALS=new w("google-credentials-uid"),w.FIRST_PARTY=new w("first-party-uid"),w.MOCK_USER=new w("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let v="12.3.0",_=new h.Logger("@firebase/firestore");function b(){return _.logLevel}function I(e){_.setLogLevel(e)}function E(e,...t){if(_.logLevel<=h.LogLevel.DEBUG){let r=t.map(A);_.debug(`Firestore (${v}): ${e}`,...r)}}function T(e,...t){if(_.logLevel<=h.LogLevel.ERROR){let r=t.map(A);_.error(`Firestore (${v}): ${e}`,...r)}}function S(e,...t){if(_.logLevel<=h.LogLevel.WARN){let r=t.map(A);_.warn(`Firestore (${v}): ${e}`,...r)}}function A(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,C(e,n,r)}function C(e,t,r){let n=`FIRESTORE (${v}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw T(n),Error(n)}function k(e,t,r,n){let i="Unexpected state";"string"==typeof r?i=r:n=r,e||C(t,i,n)}function N(e,t){e||x(57014,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends c.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class L{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(w.UNAUTHENTICATED))}shutdown(){}}class M{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class F{constructor(e){this.t=e,this.currentUser=w.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){k(void 0===this.o,42304);let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new O;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new O,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{E("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(E("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new O)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(E("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(k("string"==typeof t.accessToken,31837,{l:t}),new P(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return k(null===e||"string"==typeof e,2055,{h:e}),new w(e)}}class U{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=w.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class V{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new U(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(w.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class B{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class j{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,l._isFirebaseServerApp)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){k(void 0===this.o,3512);let r=e=>{null!=e.error&&E("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.m;return this.m=e.token,E("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{E("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?n(e):E("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new B(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(k("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new B(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class q{getToken(){return Promise.resolve(new B(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}(40);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function G(e,t){return e<t?-1:e>t?1:0}function $(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.charAt(n),i=t.charAt(n);if(r!==i)return K(r)===K(i)?G(r,i):K(r)?1:-1}return G(e.length,t.length)}function K(e){let t=e.charCodeAt(0);return t>=55296&&t<=57343}function H(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let W="__name__";class Q{constructor(e,t,r){void 0===t?t=0:t>e.length&&x(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&x(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===Q.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof Q?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=Q.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return G(e.length,t.length)}static compareSegments(e,t){let r=Q.isNumericId(e),n=Q.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?Q.extractNumericId(e).compare(Q.extractNumericId(t)):$(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return(0,d.Integer).fromString(e.substring(4,e.length-2))}}class J extends Q{construct(e,t,r){return new J(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new D(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new J(t)}static emptyPath(){return new J([])}}let Y=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class X extends Q{construct(e,t,r){return new X(e,t,r)}static isValidIdentifier(e){return Y.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),X.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===W}static keyField(){return new X([W])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new D(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new D(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new D(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new D(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new X(t)}static emptyPath(){return new X([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(J.fromString(e))}static fromName(e){return new Z(J.fromString(e).popFirst(5))}static empty(){return new Z(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===J.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new J(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e,t,r){if(!r)throw new D(R.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function et(e,t,r,n){if(!0===t&&!0===n)throw new D(R.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)}function er(e){if(!Z.isDocumentKey(e))throw new D(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function en(e){if(Z.isDocumentKey(e))throw new D(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function ei(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function es(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":x(12329,{type:typeof e})}function ea(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new D(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=es(e);throw new D(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}function eo(e,t){if(t<=0)throw new D(R.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(e,t){let r={typeString:e};return t&&(r.value=t),r}function eu(e,t){let r;if(!ei(e))throw new D(R.INVALID_ARGUMENT,"JSON must be an object");for(let n in t)if(t[n]){let i=t[n].typeString,s="value"in t[n]?{value:t[n].value}:void 0;if(!(n in e)){r=`JSON missing required field: '${n}'`;break}let a=e[n];if(i&&typeof a!==i){r=`JSON field '${n}' must be a ${i}.`;break}if(void 0!==s&&a!==s.value){r=`Expected '${n}' field to equal '${s.value}'`;break}}if(r)throw new D(R.INVALID_ARGUMENT,r);return!0}class eh{static now(){return eh.fromMillis(Date.now())}static fromDate(e){return eh.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new eh(t,Math.floor((e-1e3*t)*1e6))}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new D(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new D(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:eh._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(eu(e,eh._jsonSchema))return new eh(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}eh._jsonSchemaVersion="firestore/timestamp/1.0",eh._jsonSchema={type:el("string",eh._jsonSchemaVersion),seconds:el("number"),nanoseconds:el("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{static fromTimestamp(e){return new ec(e)}static min(){return new ec(new eh(0,0))}static max(){return new ec(new eh(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}class ed{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}function ef(e){return e.fields.find(e=>2===e.kind)}function ep(e){return e.fields.filter(e=>2!==e.kind)}function em(e,t){let r=G(e.collectionGroup,t.collectionGroup);if(0!==r)return r;for(let n=0;n<Math.min(e.fields.length,t.fields.length);++n)if(0!==(r=function(e,t){let r=X.comparator(e.fieldPath,t.fieldPath);return 0!==r?r:G(e.kind,t.kind)}(e.fields[n],t.fields[n])))return r;return G(e.fields.length,t.fields.length)}ed.UNKNOWN_ID=-1;class eg{constructor(e,t){this.fieldPath=e,this.kind=t}}class ey{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ey(0,e_.min())}}function ew(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1,i=ec.fromTimestamp(1e9===n?new eh(r+1,0):new eh(r,n));return new e_(i,Z.empty(),t)}function ev(e){return new e_(e.readTime,e.key,-1)}class e_{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new e_(ec.min(),Z.empty(),-1)}static max(){return new e_(ec.max(),Z.empty(),-1)}}function eb(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=Z.comparator(e.documentKey,t.documentKey))?r:G(e.largestBatchId,t.largestBatchId)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class eE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eT(e){if(e.code!==R.FAILED_PRECONDITION||e.message!==eI)throw e;E("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new eS((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof eS?t:eS.resolve(t)}catch(e){return eS.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):eS.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):eS.reject(t)}static resolve(e){return new eS((t,r)=>{t(e)})}static reject(e){return new eS((t,r)=>{r(e)})}static waitFor(e){return new eS((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=eS.resolve(!1);for(let r of e)t=t.next(e=>e?eS.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new eS((r,n)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new eS((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eA="SimpleDb";class ex{static open(e,t,r,n){try{return new ex(t,e.transaction(n,r))}catch(e){throw new eR(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new O,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new eR(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{let r=eM(t.target.error);this.S.reject(new eR(e,r))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(E(eA,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){let t=this.transaction.objectStore(e);return new eO(t)}}class eC{static delete(e){return E(eA,"Removing database:",e),eP((0,c.getGlobal)().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!(0,c.isIndexedDBAvailable)())return!1;if(eC.F())return!0;let e=(0,c.getUA)(),t=eC.M(e),r=ek(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<r&&r<4.5)}static F(){return void 0!==p&&"YES"===p.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,12.2===eC.M((0,c.getUA)())&&T("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(E(eA,"Opening database:",this.name),this.db=await new Promise((t,r)=>{let n=indexedDB.open(this.name,this.version);n.onsuccess=e=>{let r=e.target.result;t(r)},n.onblocked=()=>{r(new eR(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},n.onerror=t=>{let n=t.target.error;"VersionError"===n.name?r(new D(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===n.name?r(new D(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+n)):r(new eR(e,n))},n.onupgradeneeded=e=>{E(eA,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.N.k(t,n.transaction,e.oldVersion,this.version).next(()=>{E(eA,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,n){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.L(e);let t=ex.open(this.db,e,i?"readonly":"readwrite",r),s=n(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),eS.reject(e))).toPromise();return s.catch(()=>{}),await t.D,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(E(eA,"Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function ek(e){let t=e.match(/Android ([\d.]+)/i),r=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(r)}class eN{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return eP(this.U.delete())}}class eR extends D{constructor(e,t){super(R.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function eD(e){return"IndexedDbTransactionError"===e.name}class eO{constructor(e){this.store=e}put(e,t){let r;return void 0!==t?(E(eA,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(E(eA,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),eP(r)}add(e){return E(eA,"ADD",this.store.name,e,e),eP(this.store.add(e))}get(e){return eP(this.store.get(e)).next(t=>(void 0===t&&(t=null),E(eA,"GET",this.store.name,e,t),t))}delete(e){return E(eA,"DELETE",this.store.name,e),eP(this.store.delete(e))}count(){return E(eA,"COUNT",this.store.name),eP(this.store.count())}J(e,t){let r=this.options(e,t),n=r.index?this.store.index(r.index):this.store;if("function"==typeof n.getAll){let e=n.getAll(r.range);return new eS((t,r)=>{e.onerror=e=>{r(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{let e=this.cursor(r),t=[];return this.H(e,(e,r)=>{t.push(r)}).next(()=>t)}}Y(e,t){let r=this.store.getAll(e,null===t?void 0:t);return new eS((e,t)=>{r.onerror=e=>{t(e.target.error)},r.onsuccess=t=>{e(t.target.result)}})}Z(e,t){E(eA,"DELETE ALL",this.store.name);let r=this.options(e,t);r.X=!1;let n=this.cursor(r);return this.H(n,(e,t,r)=>r.delete())}ee(e,t){let r;t?r=e:(r={},t=e);let n=this.cursor(r);return this.H(n,t)}te(e){let t=this.cursor({});return new eS((r,n)=>{t.onerror=e=>{let t=eM(e.target.error);n(t)},t.onsuccess=t=>{let n=t.target.result;n?e(n.primaryKey,n.value).next(e=>{e?n.continue():r()}):r()}})}H(e,t){let r=[];return new eS((n,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void n();let s=new eN(i),a=t(i.primaryKey,i.value,s);if(a instanceof eS){let e=a.catch(e=>(s.done(),eS.reject(e)));r.push(e)}s.isDone?n():null===s.G?i.continue():i.continue(s.G)}}).next(()=>eS.waitFor(r))}options(e,t){let r;return void 0!==e&&("string"==typeof e?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.X?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function eP(e){return new eS((t,r)=>{e.onsuccess=e=>{let r=e.target.result;t(r)},e.onerror=e=>{let t=eM(e.target.error);r(t)}})}let eL=!1;function eM(e){let t=eC.M((0,c.getUA)());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return eL||(eL=!0,setTimeout(()=>{throw e},0)),e}}return e}let eF="IndexBackfiller";class eU{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){E(eF,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{let e=await this.ne.ie();E(eF,`Documents written: ${e}`)}catch(e){eD(e)?E(eF,"Ignoring IndexedDB error during index backfill: ",e):await eT(e)}await this.re(6e4)})}}class eV{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){let r=new Set,n=t,i=!0;return eS.doWhile(()=>!0===i&&n>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!r.has(t))return E(eF,`Processing collection: ${t}`),this.oe(e,t,n).next(e=>{n-=e,r.add(t)});i=!1})).next(()=>t-n)}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(n=>this.localStore.localDocuments.getNextDocuments(e,t,n,r).next(r=>{let i=r.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this._e(n,r)).next(r=>(E(eF,`Updating offset: ${r}`),this.localStore.indexManager.updateCollectionGroup(e,t,r))).next(()=>i.size)}))}_e(e,t){let r=e;return t.changes.forEach((e,t)=>{let n=ev(t);eb(n,r)>0&&(r=n)}),new e_(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eB{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}}function ej(e){return null==e}function eq(e){return 0===e&&1/e==-1/0}function ez(e){return"number"==typeof e&&Number.isInteger(e)&&!eq(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function eG(e){var t,r;let n="";for(let t=0;t<e.length;t++)n.length>0&&(n+="\x01\x01"),n=function(e,t){let r=t,n=e.length;for(let t=0;t<n;t++){let n=e.charAt(t);switch(n){case"\x00":r+="\x01\x10";break;case"\x01":r+="\x01\x11";break;default:r+=n}}return r}(e.get(t),n);return n+"\x01\x01"}function e$(e){let t=e.length;if(k(t>=2,64408,{path:e}),2===t)return k("\x01"===e.charAt(0)&&"\x01"===e.charAt(1),56145,{path:e}),J.emptyPath();let r=t-2,n=[],i="";for(let s=0;s<t;){let t=e.indexOf("\x01",s);switch((t<0||t>r)&&x(50515,{path:e}),e.charAt(t+1)){case"\x01":let a;let o=e.substring(s,t);0===i.length?a=o:(i+=o,a=i,i=""),n.push(a);break;case"\x10":i+=e.substring(s,t)+"\x00";break;case"\x11":i+=e.substring(s,t+1);break;default:x(61167,{path:e})}s=t+2}return new J(n)}eB.ce=-1;/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eK="remoteDocuments",eH="owner",eW="owner",eQ="mutationQueues",eJ="mutations",eY="batchId",eX="userMutationsIndex",eZ=["userId","batchId"],e0={},e1="documentMutations",e2="remoteDocumentsV14",e4=["prefixPath","collectionGroup","readTime","documentId"],e6="documentKeyIndex",e5=["prefixPath","collectionGroup","documentId"],e9="collectionGroupIndex",e3=["collectionGroup","readTime","prefixPath","documentId"],e8="remoteDocumentGlobal",e7="remoteDocumentGlobalKey",te="targets",tt="queryTargetsIndex",tr=["canonicalId","targetId"],tn="targetDocuments",ti=["targetId","path"],ts="documentTargetsIndex",ta=["path","targetId"],to="targetGlobalKey",tl="targetGlobal",tu="collectionParents",th=["collectionId","parent"],tc="clientMetadata",td="bundles",tf="namedQueries",tp="indexConfiguration",tm="collectionGroupIndex",tg="indexState",ty=["indexId","uid"],tw="sequenceNumberIndex",tv=["uid","sequenceNumber"],t_="indexEntries",tb=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tI="documentKeyIndex",tE=["indexId","uid","orderedDocumentKey"],tT="documentOverlays",tS=["userId","collectionPath","documentId"],tA="collectionPathOverlayIndex",tx=["userId","collectionPath","largestBatchId"],tC="collectionGroupOverlayIndex",tk=["userId","collectionGroup","largestBatchId"],tN="globals",tR=[eQ,eJ,e1,eK,te,eH,tl,tn,tc,e8,tu,td,tf],tD=[...tR,tT],tO=[eQ,eJ,e1,e2,te,eH,tl,tn,tc,e8,tu,td,tf,tT],tP=[...tO,tp,tg,t_],tL=[...tP,tN];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tM extends eE{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function tF(e,t){return eC.O(e.le,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tU(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function tV(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function tB(e,t){let r=[];for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.push(t(e[n],n,e));return r}function tj(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tq{constructor(e,t){this.comparator=e,this.root=t||tG.EMPTY}insert(e,t){return new tq(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,tG.BLACK,null,null))}remove(e){return new tq(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tG.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new tz(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new tz(this.root,e,this.comparator,!1)}getReverseIterator(){return new tz(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new tz(this.root,e,this.comparator,!0)}}class tz{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tG{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:tG.RED,this.left=null!=n?n:tG.EMPTY,this.right=null!=i?i:tG.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new tG(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return tG.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return tG.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,tG.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,tG.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}tG.EMPTY=null,tG.RED=!0,tG.BLACK=!1,tG.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,r,n,i){return this}insert(e,t,r){return new tG(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t${constructor(e){this.comparator=e,this.data=new tq(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new tK(this.data.getIterator())}getIteratorFrom(e){return new tK(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof t$)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new t$(this.comparator);return t.data=e,t}}class tK{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function tH(e){return e.hasNext()?e.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tW{constructor(e){this.fields=e,e.sort(X.comparator)}static empty(){return new tW([])}unionWith(e){let t=new t$(X.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new tW(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return H(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tQ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tJ(){return"undefined"!=typeof atob}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new tQ("Invalid base64 string: "+e):e}}(e);return new tY(t)}static fromUint8Array(e){let t=function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e);return new tY(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tY.EMPTY_BYTE_STRING=new tY("");let tX=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tZ(e){if(k(!!e,39018),"string"==typeof e){let t=0,r=tX.exec(e);if(k(!!r,46558,{timestamp:e}),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}let n=new Date(e);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:t0(e.seconds),nanos:t0(e.nanos)}}function t0(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function t1(e){return"string"==typeof e?tY.fromBase64String(e):tY.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t2="server_timestamp",t4="__type__",t6="__previous_value__",t5="__local_write_time__";function t9(e){let t=(e?.mapValue?.fields||{})[t4]?.stringValue;return t===t2}function t3(e){let t=e.mapValue.fields[t6];return t9(t)?t3(t):t}function t8(e){let t=tZ(e.mapValue.fields[t5].timestampValue);return new eh(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t7{constructor(e,t,r,n,i,s,a,o,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l,this.isUsingEmulator=u}}let re="(default)";class rt{constructor(e,t){this.projectId=e,this.database=t||re}static empty(){return new rt("","")}get isDefaultDatabase(){return this.database===re}isEqual(e){return e instanceof rt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rr="__type__",rn="__max__",ri={mapValue:{fields:{__type__:{stringValue:rn}}}},rs="__vector__",ra="value",ro={nullValue:"NULL_VALUE"};function rl(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?t9(e)?4:rE(e)?9007199254740991:rb(e)?10:11:x(28295,{value:e})}function ru(e,t){if(e===t)return!0;let r=rl(e);if(r!==rl(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return t8(e).isEqual(t8(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=tZ(e.timestampValue),n=tZ(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return t1(e.bytesValue).isEqual(t1(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return t0(e.geoPointValue.latitude)===t0(t.geoPointValue.latitude)&&t0(e.geoPointValue.longitude)===t0(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return t0(e.integerValue)===t0(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=t0(e.doubleValue),n=t0(t.doubleValue);return r===n?eq(r)===eq(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return H(e.arrayValue.values||[],t.arrayValue.values||[],ru);case 10:case 11:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(tU(r)!==tU(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!ru(r[e],n[e])))return!1;return!0}(e,t);default:return x(52216,{left:e})}}function rh(e,t){return void 0!==(e.values||[]).find(e=>ru(e,t))}function rc(e,t){if(e===t)return 0;let r=rl(e),n=rl(t);if(r!==n)return G(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return G(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=t0(e.integerValue||e.doubleValue),n=t0(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return rd(e.timestampValue,t.timestampValue);case 4:return rd(t8(e),t8(t));case 5:return $(e.stringValue,t.stringValue);case 6:return function(e,t){let r=t1(e),n=t1(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=G(r[e],n[e]);if(0!==t)return t}return G(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=G(t0(e.latitude),t0(t.latitude));return 0!==r?r:G(t0(e.longitude),t0(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return rf(e.arrayValue,t.arrayValue);case 10:return function(e,t){let r=e.fields||{},n=t.fields||{},i=r[ra]?.arrayValue,s=n[ra]?.arrayValue,a=G(i?.values?.length||0,s?.values?.length||0);return 0!==a?a:rf(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===ri.mapValue&&t===ri.mapValue)return 0;if(e===ri.mapValue)return 1;if(t===ri.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=$(n[e],s[e]);if(0!==t)return t;let a=rc(r[n[e]],i[s[e]]);if(0!==a)return a}return G(n.length,s.length)}(e.mapValue,t.mapValue);default:throw x(23264,{he:r})}}function rd(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return G(e,t);let r=tZ(e),n=tZ(t),i=G(r.seconds,n.seconds);return 0!==i?i:G(r.nanos,n.nanos)}function rf(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=rc(r[e],n[e]);if(t)return t}return G(r.length,n.length)}function rp(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=tZ(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?t1(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,Z.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=rp(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${rp(e.fields[i])}`;return r+"}"}(e.mapValue):x(61005,{value:e})}function rm(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function rg(e){return!!e&&"integerValue"in e}function ry(e){return!!e&&"arrayValue"in e}function rw(e){return!!e&&"nullValue"in e}function rv(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function r_(e){return!!e&&"mapValue"in e}function rb(e){let t=(e?.mapValue?.fields||{})[rr]?.stringValue;return t===rs}function rI(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){let t={mapValue:{fields:{}}};return tV(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=rI(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=rI(e.arrayValue.values[r]);return t}return{...e}}function rE(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===rn}let rT={mapValue:{fields:{[rr]:{stringValue:rs},[ra]:{arrayValue:{}}}}};function rS(e,t){let r=rc(e.value,t.value);return 0!==r?r:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function rA(e,t){let r=rc(e.value,t.value);return 0!==r?r:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e){this.value=e}static empty(){return new rx({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!r_(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=rI(t)}setAll(e){let t=X.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=rI(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());r_(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ru(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];r_(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(tV(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new rx(rI(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,t,r,n,i,s,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new rC(e,0,ec.min(),ec.min(),ec.min(),rx.empty(),0)}static newFoundDocument(e,t,r,n){return new rC(e,1,t,ec.min(),r,n,0)}static newNoDocument(e,t){return new rC(e,2,t,ec.min(),ec.min(),rx.empty(),0)}static newUnknownDocument(e,t){return new rC(e,3,t,ec.min(),ec.min(),rx.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(ec.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=rx.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=rx.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ec.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof rC&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new rC(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e,t){this.position=e,this.inclusive=t}}function rN(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(n=s.field.isKeyField()?Z.comparator(Z.fromName(a.referenceValue),r.key):rc(a,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function rR(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!ru(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rO{}class rP extends rO{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new rj(e,t,r):"array-contains"===t?new r$(e,r):"in"===t?new rK(e,r):"not-in"===t?new rH(e,r):"array-contains-any"===t?new rW(e,r):new rP(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new rq(e,r):new rz(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(rc(t,this.value)):null!==t&&rl(this.value)===rl(t)&&this.matchesComparison(rc(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rL extends rO{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new rL(e,t)}matches(e){return rM(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function rM(e){return"and"===e.op}function rF(e){return"or"===e.op}function rU(e){return rV(e)&&rM(e)}function rV(e){for(let t of e.filters)if(t instanceof rL)return!1;return!0}function rB(e,t){let r=e.filters.concat(t);return rL.create(r,e.op)}class rj extends rP{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){let t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class rq extends rP{constructor(e,t){super(e,"in",t),this.keys=rG("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class rz extends rP{constructor(e,t){super(e,"not-in",t),this.keys=rG("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function rG(e,t){return(t.arrayValue?.values||[]).map(e=>Z.fromName(e.referenceValue))}class r$ extends rP{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ry(t)&&rh(t.arrayValue,this.value)}}class rK extends rP{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&rh(this.value.arrayValue,t)}}class rH extends rP{constructor(e,t){super(e,"not-in",t)}matches(e){if(rh(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!rh(this.value.arrayValue,t)}}class rW extends rP{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ry(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>rh(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rQ{constructor(e,t=null,r=[],n=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=a,this.Te=null}}function rJ(e,t=null,r=[],n=[],i=null,s=null,a=null){return new rQ(e,t,r,n,i,s,a)}function rY(e){if(null===e.Te){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof rP)return t.field.canonicalString()+t.op.toString()+rp(t.value);if(rU(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),ej(e.limit)||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>rp(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>rp(e)).join(",")),e.Te=t}return e.Te}function rX(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof rP?r instanceof rP&&t.op===r.op&&t.field.isEqual(r.field)&&ru(t.value,r.value):t instanceof rL?r instanceof rL&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void x(19439)}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!rR(e.startAt,t.startAt)&&rR(e.endAt,t.endAt)}function rZ(e){return Z.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function r0(e,t){return e.filters.filter(e=>e instanceof rP&&e.field.isEqual(t))}function r1(e,t,r){let n=ro,i=!0;for(let r of r0(e,t)){let e=ro,t=!0;switch(r.op){case"<":case"<=":var s;e="nullValue"in(s=r.value)?ro:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?rm(rt.empty(),Z.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?rb(s)?rT:{mapValue:{}}:x(35942,{value:s});break;case"==":case"in":case">=":e=r.value;break;case">":e=r.value,t=!1;break;case"!=":case"not-in":e=ro}0>rS({value:n,inclusive:i},{value:e,inclusive:t})&&(n=e,i=t)}if(null!==r){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=r.position[s];0>rS({value:n,inclusive:i},{value:e,inclusive:r.inclusive})&&(n=e,i=r.inclusive);break}}return{value:n,inclusive:i}}function r2(e,t,r){let n=ri,i=!0;for(let r of r0(e,t)){let e=ri,t=!0;switch(r.op){case">=":case">":var s;e="nullValue"in(s=r.value)?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?rm(rt.empty(),Z.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?rT:"mapValue"in s?rb(s)?{mapValue:{}}:ri:x(61959,{value:s}),t=!1;break;case"==":case"in":case"<=":e=r.value;break;case"<":e=r.value,t=!1;break;case"!=":case"not-in":e=ri}rA({value:n,inclusive:i},{value:e,inclusive:t})>0&&(n=e,i=t)}if(null!==r){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=r.position[s];rA({value:n,inclusive:i},{value:e,inclusive:r.inclusive})>0&&(n=e,i=r.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4{constructor(e,t=null,r=[],n=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function r6(e){return new r4(e)}function r5(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function r9(e){return null!==e.collectionGroup}function r3(e){if(null===e.Ie){let t;e.Ie=[];let r=new Set;for(let t of e.explicitOrderBy)e.Ie.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc",i=(t=new t$(X.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t);i.forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.Ie.push(new rD(t,n))}),r.has(X.keyField().canonicalString())||e.Ie.push(new rD(X.keyField(),n))}return e.Ie}function r8(e){return e.Ee||(e.Ee=ne(e,r3(e))),e.Ee}function r7(e){return e.de||(e.de=ne(e,e.explicitOrderBy)),e.de}function ne(e,t){if("F"===e.limitType)return rJ(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new rD(e.field,t)});let r=e.endAt?new rk(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new rk(e.startAt.position,e.startAt.inclusive):null;return rJ(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}function nt(e,t){let r=e.filters.concat([t]);return new r4(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function nr(e,t,r){return new r4(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function nn(e,t){return rX(r8(e),r8(t))&&e.limitType===t.limitType}function ni(e){return`${rY(r8(e))}|lt:${e.limitType}`}function ns(e){var t;let r;return`Query(target=${r=(t=r8(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof rP?`${t.field.canonicalString()} ${t.op} ${rp(t.value)}`:t instanceof rL?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),ej(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>rp(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>rp(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function na(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):Z.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of r3(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=rN(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,r3(e),t))&&(!e.endAt||!!function(e,t,r){let n=rN(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,r3(e),t))}function no(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function nl(e){return(t,r)=>{let n=!1;for(let i of r3(e)){let e=function(e,t,r){let n=e.field.isKeyField()?Z.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?rc(n,i):x(42886)}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return x(19790,{direction:e.dir})}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){tV(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return tj(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nh=new tq(Z.comparator),nc=new tq(Z.comparator);function nd(...e){let t=nc;for(let r of e)t=t.insert(r.key,r);return t}function nf(e){let t=nc;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function np(){return new nu(e=>e.toString(),(e,t)=>e.isEqual(t))}let nm=new tq(Z.comparator),ng=new t$(Z.comparator);function ny(...e){let t=ng;for(let r of e)t=t.add(r);return t}let nw=new t$(G);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eq(t)?"-0":t}}function n_(e){return{integerValue:""+e}}function nb(e,t){return ez(t)?n_(t):nv(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(){this._=void 0}}function nE(e,t){return e instanceof nk?rg(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class nT extends nI{}class nS extends nI{constructor(e){super(),this.elements=e}}function nA(e,t){let r=nR(t);for(let t of e.elements)r.some(e=>ru(e,t))||r.push(t);return{arrayValue:{values:r}}}class nx extends nI{constructor(e){super(),this.elements=e}}function nC(e,t){let r=nR(t);for(let t of e.elements)r=r.filter(e=>!ru(e,t));return{arrayValue:{values:r}}}class nk extends nI{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function nN(e){return t0(e.integerValue||e.doubleValue)}function nR(e){return ry(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{constructor(e,t){this.field=e,this.transform=t}}class nO{constructor(e,t){this.version=e,this.transformResults=t}}class nP{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new nP}static exists(e){return new nP(void 0,e)}static updateTime(e){return new nP(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function nL(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class nM{}function nF(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new n$(e.key,nP.none()):new nB(e.key,e.data,nP.none());{let r=e.data,n=rx.empty(),i=new t$(X.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new nj(e.key,n,new tW(i.toArray()),nP.none())}}function nU(e,t,r,n){return e instanceof nB?function(e,t,r,n){if(!nL(e.precondition,t))return r;let i=e.value.clone(),s=nG(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof nj?function(e,t,r,n){if(!nL(e.precondition,t))return r;let i=nG(e.fieldTransforms,n,t),s=t.data;return(s.setAll(nq(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):nL(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function nV(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&H(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof nS&&n instanceof nS||r instanceof nx&&n instanceof nx?H(r.elements,n.elements,ru):r instanceof nk&&n instanceof nk?ru(r.Ae,n.Ae):r instanceof nT&&n instanceof nT)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class nB extends nM{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class nj extends nM{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function nq(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function nz(e,t,r){let n=new Map;k(e.length===r.length,32656,{Re:r.length,Ve:e.length});for(let s=0;s<r.length;s++){var i;let a=e[s],o=a.transform,l=t.data.field(a.field);n.set(a.field,(i=r[s],o instanceof nS?nA(o,l):o instanceof nx?nC(o,l):i))}return n}function nG(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof nT?function(e,t){let r={fields:{[t4]:{stringValue:t2},[t5]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&t9(t)&&(t=t3(t)),t&&(r.fields[t6]=t),{mapValue:r}}(t,s):e instanceof nS?nA(e,s):e instanceof nx?nC(e,s):function(e,t){let r=nE(e,t),n=nN(r)+nN(e.Ae);return rg(r)&&rg(e.Ae)?n_(n):nv(e.serializer,n)}(e,s))}return n}class n$ extends nM{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nK extends nM{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nH{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof nB?function(e,t,r){let n=e.value.clone(),i=nz(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof nj?function(e,t,r){if(!nL(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=nz(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(nq(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=nU(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=nU(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=np();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields);a=t.has(n.key)?null:a;let o=nF(s,a);null!==o&&r.set(n.key,o),s.isValidDocument()||s.convertToNoDocument(ec.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ny())}isEqual(e){return this.batchId===e.batchId&&H(this.mutations,e.mutations,(e,t)=>nV(e,t))&&H(this.baseMutations,e.baseMutations,(e,t)=>nV(e,t))}}class nW{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){k(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let n=nm,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new nW(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nJ{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nY{constructor(e,t){this.count=e,this.unchangedNames=t}}function nX(e){switch(e){case R.OK:return x(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return x(15467,{code:e})}}function nZ(e){if(void 0===e)return T("GRPC error has no .code"),R.UNKNOWN;switch(e){case n.OK:return R.OK;case n.CANCELLED:return R.CANCELLED;case n.UNKNOWN:return R.UNKNOWN;case n.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case n.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case n.INTERNAL:return R.INTERNAL;case n.UNAVAILABLE:return R.UNAVAILABLE;case n.UNAUTHENTICATED:return R.UNAUTHENTICATED;case n.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case n.NOT_FOUND:return R.NOT_FOUND;case n.ALREADY_EXISTS:return R.ALREADY_EXISTS;case n.PERMISSION_DENIED:return R.PERMISSION_DENIED;case n.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case n.ABORTED:return R.ABORTED;case n.OUT_OF_RANGE:return R.OUT_OF_RANGE;case n.UNIMPLEMENTED:return R.UNIMPLEMENTED;case n.DATA_LOSS:return R.DATA_LOSS;default:return x(39323,{code:e})}}(i=n||(n={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n0=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n1(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n2=new d.Integer([4294967295,4294967295],0);function n4(e){let t=n1().encode(e),r=new d.Md5;return r.update(t),new Uint8Array(r.digest())}function n6(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new d.Integer([r,n],0),new d.Integer([i,s],0)]}class n5{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new n9(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new n9(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new n9(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=(0,d.Integer).fromNumber(this.ge)}ye(e,t,r){let n=e.add(t.multiply((0,d.Integer).fromNumber(r)));return 1===n.compare(n2)&&(n=new d.Integer([n.getBits(0),n.getBits(1)],0)),n.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;let t=n4(e),[r,n]=n6(t);for(let e=0;e<this.hashCount;e++){let t=this.ye(r,n,e);if(!this.we(t))return!1}return!0}static create(e,t,r){let n=new Uint8Array(Math.ceil(e/8)),i=new n5(n,e%8==0?0:8-e%8,t);return r.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;let t=n4(e),[r,n]=n6(t);for(let e=0;e<this.hashCount;e++){let t=this.ye(r,n,e);this.Se(t)}}Se(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class n9 extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n3{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,n8.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n3(ec.min(),n,new tq(G),nh,ny())}}class n8{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n8(r,t,ny(),ny(),ny())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n7{constructor(e,t,r,n){this.be=e,this.removedTargetIds=t,this.key=r,this.De=n}}class ie{constructor(e,t){this.targetId=e,this.Ce=t}}class it{constructor(e,t,r=tY.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class ir{constructor(){this.ve=0,this.Fe=ia(),this.Me=tY.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ny(),t=ny(),r=ny();return this.Fe.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:x(38017,{changeType:i})}}),new n8(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=ia()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,k(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ii{constructor(e){this.Ge=e,this.ze=new Map,this.je=nh,this.Je=is(),this.He=is(),this.Ye=new tq(G)}Ze(e){for(let t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(let t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{let r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:x(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,r)=>{this.rt(r)&&t(r)})}st(e){let t=e.targetId,r=e.Ce.count,n=this.ot(t);if(n){let i=n.target;if(rZ(i)){if(0===r){let e=new Z(i.path);this.et(t,e,rC.newNoDocument(e,ec.min()))}else k(1===r,20013,{expectedCount:r})}else{let n=this._t(t);if(n!==r){let r=this.ut(e),i=r?this.ct(r,e,n):1;0!==i&&(this.it(t),this.Ye=this.Ye.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch")),n0?.lt(function(e,t,r,n,i){let s={localCacheCount:e,existenceFilterCount:t.count,databaseId:r.database,projectId:r.projectId},a=t.unchangedNames;return a&&(s.bloomFilter={applied:0===i,hashCount:a?.hashCount??0,bitmapLength:a?.bits?.bitmap?.length??0,padding:a?.bits?.padding??0,mightContain:e=>n?.mightContain(e)??!1}),s}(n,e.Ce,this.Ge.ht(),r,i))}}}}ut(e){let t,r;let n=e.Ce.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n;try{t=t1(i).toUint8Array()}catch(e){if(e instanceof tQ)return S("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new n5(t,s,a)}catch(e){return S(e instanceof n9?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.ge?null:r}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){let r=this.Ge.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.et(t,r,null),n++)}),n}Tt(e){let t=new Map;this.ze.forEach((r,n)=>{let i=this.ot(n);if(i){if(r.current&&rZ(i.target)){let t=new Z(i.target.path);this.It(t).has(n)||this.Et(n,t)||this.et(n,t,rC.newNoDocument(t,e))}r.Be&&(t.set(n,r.ke()),r.qe())}});let r=ny();this.He.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.je.forEach((t,r)=>r.setReadTime(e));let n=new n3(e,t,this.Ye,this.je,r);return this.je=nh,this.Je=is(),this.He=is(),this.Ye=new tq(G),n}Xe(e,t){if(!this.rt(e))return;let r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;let n=this.nt(e);this.Et(e,t)?n.Qe(t,1):n.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){let t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new ir,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new t$(G),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new t$(G),this.Je=this.Je.insert(e,t)),t}rt(e){let t=null!==this.ot(e);return t||E("WatchChangeAggregator","Detected inactive target",e),t}ot(e){let t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new ir),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function is(){return new tq(Z.comparator)}function ia(){return new tq(Z.comparator)}let io={asc:"ASCENDING",desc:"DESCENDING"},il={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},iu={and:"AND",or:"OR"};class ih{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ic(e,t){return e.useProto3Json||ej(t)?t:{value:t}}function id(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ip(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function im(e){return k(!!e,49232),ec.fromTimestamp(function(e){let t=tZ(e);return new eh(t.seconds,t.nanos)}(e))}function ig(e,t){return iy(e,t).canonicalString()}function iy(e,t){let r=new J(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function iw(e){let t=J.fromString(e);return k(iL(t),10190,{key:t.toString()}),t}function iv(e,t){return ig(e.databaseId,t.path)}function i_(e,t){let r=iw(t);if(r.get(1)!==e.databaseId.projectId)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new Z(iT(r))}function ib(e,t){return ig(e.databaseId,t)}function iI(e){let t=iw(e);return 4===t.length?J.emptyPath():iT(t)}function iE(e){return new J(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function iT(e){return k(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function iS(e,t,r){return{name:iv(e,t),fields:r.value.mapValue.fields}}function iA(e,t,r){let n=i_(e,t.name),i=im(t.updateTime),s=t.createTime?im(t.createTime):ec.min(),a=new rx({mapValue:{fields:t.fields}}),o=rC.newFoundDocument(n,i,s,a);return r&&o.setHasCommittedMutations(),r?o.setHasCommittedMutations():o}function ix(e,t){var r;let n;if(t instanceof nB)n={update:iS(e,t.key,t.value)};else if(t instanceof n$)n={delete:iv(e,t.key)};else if(t instanceof nj)n={update:iS(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof nK))return x(16599,{Vt:t.type});n={verify:iv(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof nT)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof nS)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof nx)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof nk)return{fieldPath:t.field.canonicalString(),increment:r.Ae};throw x(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:id(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:x(27497)),n}function iC(e,t){var r;let n=t.currentDocument?void 0!==(r=t.currentDocument).updateTime?nP.updateTime(im(r.updateTime)):void 0!==r.exists?nP.exists(r.exists):nP.none():nP.none(),i=t.updateTransforms?t.updateTransforms.map(t=>(function(e,t){let r=null;if("setToServerValue"in t)k("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),r=new nT;else if("appendMissingElements"in t){let e=t.appendMissingElements.values||[];r=new nS(e)}else if("removeAllFromArray"in t){let e=t.removeAllFromArray.values||[];r=new nx(e)}else"increment"in t?r=new nk(e,t.increment):x(16584,{proto:t});let n=X.fromServerFormat(t.fieldPath);return new nD(n,r)})(e,t)):[];if(t.update){t.update.name;let r=i_(e,t.update.name),s=new rx({mapValue:{fields:t.update.fields}});if(t.updateMask){let e=function(e){let t=e.fieldPaths||[];return new tW(t.map(e=>X.fromServerFormat(e)))}(t.updateMask);return new nj(r,s,e,n,i)}return new nB(r,s,n,i)}if(t.delete){let r=i_(e,t.delete);return new n$(r,n)}if(t.verify){let r=i_(e,t.verify);return new nK(r,n)}return x(1463,{proto:t})}function ik(e,t){return{documents:[ib(e,t.path)]}}function iN(e,t){var r,n;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=ib(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof rP?function(e){if("=="===e.op){if(rv(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NAN"}};if(rw(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(rv(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NOT_NAN"}};if(rw(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:iO(e.field),op:il[e.op],value:e.value}}}(t):t instanceof rL?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:iu[t.op],filters:r}}}(t):x(54877,{filter:t})}(rL.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:iO(e.field),direction:io[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=ic(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{ft:s,parent:i}}function iR(e,t,r,n){let{ft:i,parent:s}=iN(e,t),a={},o=[],l=0;return r.forEach(e=>{let t=n?e.alias:"aggregate_"+l++;a[t]=e.alias,"count"===e.aggregateType?o.push({alias:t,count:{}}):"avg"===e.aggregateType?o.push({alias:t,avg:{field:iO(e.fieldPath)}}):"sum"===e.aggregateType&&o.push({alias:t,sum:{field:iO(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:o,structuredQuery:i.structuredQuery},parent:i.parent},gt:a,parent:s}}function iD(e){var t;let r,n=iI(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){k(1===s,65062);let e=i.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];i.where&&(o=function(e){let t=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=iP(e.unaryFilter.field);return rP.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=iP(e.unaryFilter.field);return rP.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=iP(e.unaryFilter.field);return rP.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=iP(e.unaryFilter.field);return rP.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}}(t):void 0!==t.fieldFilter?rP.create(iP(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?rL.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return x(1026)}}(t.compositeFilter.op)):x(30097,{filter:t})}(e);return t instanceof rL&&rU(t)?t.getFilters():[t]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new rD(iP(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=ej(r="object"==typeof(t=i.limit)?t.value:t)?null:r);let h=null;i.startAt&&(h=function(e){let t=!!e.before,r=e.values||[];return new rk(r,t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before,r=e.values||[];return new rk(r,t)}(i.endAt)),new r4(n,a,l,o,u,"F",h,c)}function iO(e){return{fieldPath:e.canonicalString()}}function iP(e){return X.fromServerFormat(e.fieldPath)}function iL(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iM{constructor(e,t,r,n,i=ec.min(),s=ec.min(),a=tY.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new iM(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new iM(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new iM(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new iM(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iF{constructor(e){this.yt=e}}function iU(e,t){let r=t.key,n={prefixPath:r.getCollectionPath().popLast().toArray(),collectionGroup:r.collectionGroup,documentId:r.path.lastSegment(),readTime:iV(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument()){var i;n.document={name:iv(i=e.yt,t.key),fields:t.data.value.mapValue.fields,updateTime:id(i,t.version.toTimestamp()),createTime:id(i,t.createTime.toTimestamp())}}else if(t.isNoDocument())n.noDocument={path:r.path.toArray(),readTime:iB(t.version)};else{if(!t.isUnknownDocument())return x(57904,{document:t});n.unknownDocument={path:r.path.toArray(),version:iB(t.version)}}return n}function iV(e){let t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function iB(e){let t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function ij(e){let t=new eh(e.seconds,e.nanoseconds);return ec.fromTimestamp(t)}function iq(e,t){let r=(t.baseMutations||[]).map(t=>iC(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){let r=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){let n=t.mutations[e+1];r.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}let n=t.mutations.map(t=>iC(e.yt,t)),i=eh.fromMillis(t.localWriteTimeMs);return new nH(t.batchId,i,r,n)}function iz(e){let t=ij(e.readTime),r=void 0!==e.lastLimboFreeSnapshotVersion?ij(e.lastLimboFreeSnapshotVersion):ec.min();return new iM(void 0!==e.query.documents?function(e){let t=e.documents.length;return k(1===t,1966,{count:t}),r8(r6(iI(e.documents[0])))}(e.query):r8(iD(e.query)),e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,r,tY.fromBase64String(e.resumeToken))}function iG(e,t){let r;let n=iB(t.snapshotVersion),i=iB(t.lastLimboFreeSnapshotVersion);r=rZ(t.target)?ik(e.yt,t.target):iN(e.yt,t.target).ft;let s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:rY(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:r}}function i$(e){let t=iD({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?nr(t,t.limit,"L"):t}function iK(e,t){return new nQ(t.largestBatchId,iC(e.yt,t.overlayMutation))}function iH(e,t){let r=t.path.lastSegment();return[e,eG(t.path.popLast()),r]}function iW(e,t,r,n){return{indexId:e,uid:t,sequenceNumber:r,readTime:iB(n.readTime),documentKey:eG(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iQ{getBundleMetadata(e,t){return tF(e,td).get(t).next(e=>{if(e)return{id:e.bundleId,createTime:ij(e.createTime),version:e.version}})}saveBundleMetadata(e,t){return tF(e,td).put({bundleId:t.id,createTime:iB(im(t.createTime)),version:t.version})}getNamedQuery(e,t){return tF(e,tf).get(t).next(e=>{if(e)return{name:e.name,query:i$(e.bundledQuery),readTime:ij(e.readTime)}})}saveNamedQuery(e,t){return tF(e,tf).put({name:t.name,readTime:iB(im(t.readTime)),bundledQuery:t.bundledQuery})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iJ{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){let r=t.uid||"";return new iJ(e,r)}getOverlay(e,t){return tF(e,tT).get(iH(this.userId,t)).next(e=>e?iK(this.serializer,e):null)}getOverlays(e,t){let r=np();return eS.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){let n=[];return r.forEach((r,i)=>{let s=new nQ(t,i);n.push(this.St(e,s))}),eS.waitFor(n)}removeOverlaysForBatchId(e,t,r){let n=new Set;t.forEach(e=>n.add(eG(e.getCollectionPath())));let i=[];return n.forEach(t=>{let n=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,r+1],!1,!0);i.push(tF(e,tT).Z(tA,n))}),eS.waitFor(i)}getOverlaysForCollection(e,t,r){let n=np(),i=eG(t),s=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return tF(e,tT).J(tA,s).next(e=>{for(let t of e){let e=iK(this.serializer,t);n.set(e.getKey(),e)}return n})}getOverlaysForCollectionGroup(e,t,r,n){let i;let s=np(),a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return tF(e,tT).ee({index:tC,range:a},(e,t,r)=>{let a=iK(this.serializer,t);s.size()<n||a.largestBatchId===i?(s.set(a.getKey(),a),i=a.largestBatchId):r.done()}).next(()=>s)}St(e,t){return tF(e,tT).put(function(e,t,r){let[n,i,s]=iH(t,r.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:r.mutation.key.getCollectionGroup(),largestBatchId:r.largestBatchId,overlayMutation:ix(e.yt,r.mutation)}}(this.serializer,this.userId,t))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iY{bt(e){return tF(e,tN)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{let t=e?.value;return t?tY.fromUint8Array(t):tY.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iX{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(t0(e.integerValue));else if("doubleValue"in e){let r=t0(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),eq(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),"string"==typeof r&&(r=tZ(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(t1(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?rE(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):rb(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):x(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){let r=e.fields||{};for(let e of(this.Ft(t,55),Object.keys(r)))this.Ot(e,t),this.Ct(r[e],t)}kt(e,t){let r=e.fields||{};this.Ft(t,53);let n=r[ra].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(t0(n)),this.Ot(ra,t),this.Ct(r[ra],t)}Qt(e,t){let r=e.values||[];for(let e of(this.Ft(t,50),r))this.Ct(e,t)}Lt(e,t){this.Ft(t,37),Z.fromName(e).path.forEach(e=>{this.Ft(t,60),this.Ut(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}function iZ(e){let t=64-function(e){let t=0;for(let r=0;r<8;++r){let n=function(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}(255&e[r]);if(t+=n,8!==n)break}return t}(e);return Math.ceil(t/8)}iX.Kt=new iX;class i0{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Yt(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{let e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Zt(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{let e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Xt(e){let t=this.en(e),r=iZ(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let e=t.length-r;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){let t=this.en(e),r=iZ(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let e=t.length-r;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(255),this.sn(255)}_n(){this.an(255),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){let t=function(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let e=1;e<t.length;++e)t[e]^=r?255:0;return t}Gt(e){let t=255&e;0===t?(this.sn(0),this.sn(255)):255===t?(this.sn(255),this.sn(0)):this.sn(t)}Jt(e){let t=255&e;0===t?(this.an(0),this.an(255)):255===t?(this.an(255),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){let t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);let n=new Uint8Array(r);n.set(this.buffer),this.buffer=n}}class i1{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class i2{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class i4{constructor(){this.cn=new i0,this.ln=new i1(this.cn),this.hn=new i2(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return 0===e?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i6{constructor(e,t,r,n){this.Tn=e,this.In=t,this.En=r,this.dn=n}An(){let e=this.dn.length,t=0===e||255===this.dn[e-1]?e+1:e,r=new Uint8Array(t);return r.set(this.dn,0),t!==e?r.set([0],this.dn.length):++r[r.length-1],new i6(this.Tn,this.In,this.En,r)}Rn(e,t,r){return{indexId:this.Tn,uid:e,arrayValue:i3(this.En),directionalValue:i3(this.dn),orderedDocumentKey:i3(t),documentKey:r.path.toArray()}}Vn(e,t,r){let n=this.Rn(e,t,r);return[n.indexId,n.uid,n.arrayValue,n.directionalValue,n.orderedDocumentKey,n.documentKey]}}function i5(e,t){let r=e.Tn-t.Tn;return 0!==r?r:0!==(r=i9(e.En,t.En))?r:0!==(r=i9(e.dn,t.dn))?r:Z.comparator(e.In,t.In)}function i9(e,t){for(let r=0;r<e.length&&r<t.length;++r){let n=e[r]-t[r];if(0!==n)return n}return e.length-t.length}function i3(e){return(0,c.isSafariOrWebkit)()?function(e){let t="";for(let r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t}(e):e}function i8(e){return"string"!=typeof e?e:function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(e)}class i7{constructor(e){for(let t of(this.mn=new t$((e,t)=>X.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[],e.filters))t.isInequality()?this.mn=this.mn.add(t):this.gn.push(t)}get pn(){return this.mn.size>1}yn(e){if(k(e.collectionGroup===this.collectionId,49279),this.pn)return!1;let t=ef(e);if(void 0!==t&&!this.wn(t))return!1;let r=ep(e),n=new Set,i=0,s=0;for(;i<r.length&&this.wn(r[i]);++i)n=n.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.mn.size>0){let e=this.mn.getIterator().getNext();if(!n.has(e.field.canonicalString())){let t=r[i];if(!this.Sn(e,t)||!this.bn(this.fn[s++],t))return!1}++i}for(;i<r.length;++i){let e=r[i];if(s>=this.fn.length||!this.bn(this.fn[s++],e))return!1}return!0}Dn(){if(this.pn)return null;let e=new t$(X.comparator),t=[];for(let r of this.gn)if(!r.field.isKeyField()){if("array-contains"===r.op||"array-contains-any"===r.op)t.push(new eg(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new eg(r.field,0))}}for(let r of this.fn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new eg(r.field,"asc"===r.dir?0:1)));return new ed(ed.UNKNOWN_ID,this.collectionId,t,ey.empty())}wn(e){for(let t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;let r="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===r}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}function se(e){return e instanceof rP}function st(e){return e instanceof rL&&rU(e)}function sr(e){return se(e)||st(e)||function(e){if(e instanceof rL&&rF(e)){for(let t of e.getFilters())if(!se(t)&&!st(t))return!1;return!0}return!1}(e)}function sn(e,t){return k(e instanceof rP||e instanceof rL,38388),k(t instanceof rP||t instanceof rL,25473),ss(e instanceof rP?t instanceof rP?rL.create([e,t],"and"):si(e,t):t instanceof rP?si(t,e):function(e,t){if(k(e.filters.length>0&&t.filters.length>0,48005),rM(e)&&rM(t))return rB(e,t.getFilters());let r=rF(e)?e:t,n=rF(e)?t:e,i=r.filters.map(e=>sn(e,n));return rL.create(i,"or")}(e,t))}function si(e,t){if(rM(t))return rB(t,e.getFilters());{let r=t.filters.map(t=>sn(e,t));return rL.create(r,"or")}}function ss(e){if(k(e instanceof rP||e instanceof rL,11850),e instanceof rP)return e;let t=e.getFilters();if(1===t.length)return ss(t[0]);if(rV(e))return e;let r=t.map(e=>ss(e)),n=[];return r.forEach(t=>{t instanceof rP?n.push(t):t instanceof rL&&(t.op===e.op?n.push(...t.filters):n.push(t))}),1===n.length?n[0]:rL.create(n,e.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(){this.Cn=new so}addToCollectionParentIndex(e,t){return this.Cn.add(t),eS.resolve()}getCollectionParents(e,t){return eS.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return eS.resolve()}deleteFieldIndex(e,t){return eS.resolve()}deleteAllFieldIndexes(e){return eS.resolve()}createTargetIndexes(e,t){return eS.resolve()}getDocumentsMatchingTarget(e,t){return eS.resolve(null)}getIndexType(e,t){return eS.resolve(0)}getFieldIndexes(e,t){return eS.resolve([])}getNextCollectionGroupToUpdate(e){return eS.resolve(null)}getMinOffset(e,t){return eS.resolve(e_.min())}getMinOffsetFromCollectionGroup(e,t){return eS.resolve(e_.min())}updateCollectionGroup(e,t,r){return eS.resolve()}updateIndexEntries(e,t){return eS.resolve()}}class so{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new t$(J.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new t$(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sl="IndexedDbIndexManager",su=new Uint8Array(0);class sh{constructor(e,t){this.databaseId=t,this.vn=new so,this.Fn=new nu(e=>rY(e),(e,t)=>rX(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){let r=t.lastSegment(),n=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});let i={collectionId:r,parent:eG(n)};return tF(e,tu).put(i)}return eS.resolve()}getCollectionParents(e,t){let r=[],n=IDBKeyRange.bound([t,""],[t+"\x00",""],!1,!0);return tF(e,tu).J(n).next(e=>{for(let n of e){if(n.collectionId!==t)break;r.push(e$(n.parent))}return r})}addFieldIndex(e,t){let r=tF(e,tp),n={indexId:t.indexId,collectionGroup:t.collectionGroup,fields:t.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};delete n.indexId;let i=r.add(n);if(t.indexState){let r=tF(e,tg);return i.next(e=>{r.put(iW(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){let r=tF(e,tp),n=tF(e,tg),i=tF(e,t_);return r.delete(t.indexId).next(()=>n.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=tF(e,tp),r=tF(e,t_),n=tF(e,tg);return t.Z().next(()=>r.Z()).next(()=>n.Z())}createTargetIndexes(e,t){return eS.forEach(this.Mn(t),t=>this.getIndexType(e,t).next(r=>{if(0===r||1===r){let r=new i7(t).Dn();if(null!=r)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){let r=tF(e,t_),n=!0,i=new Map;return eS.forEach(this.Mn(t),t=>this.xn(e,t).next(e=>{n&&(n=!!e),i.set(t,e)})).next(()=>{if(n){let e=ny(),n=[];return eS.forEach(i,(i,s)=>{E(sl,`Using index id=${i.indexId}|cg=${i.collectionGroup}|f=${i.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")} to execute ${rY(t)}`);let a=function(e,t){let r=ef(t);if(void 0===r)return null;for(let t of r0(e,r.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),o=function(e,t){let r=new Map;for(let n of ep(t))for(let t of r0(e,n.fieldPath))switch(t.op){case"==":case"in":r.set(n.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return r.set(n.fieldPath.canonicalString(),t.value),Array.from(r.values())}return null}(s,i),l=function(e,t){let r=[],n=!0;for(let i of ep(t)){let t=0===i.kind?r1(e,i.fieldPath,e.startAt):r2(e,i.fieldPath,e.startAt);r.push(t.value),n&&(n=t.inclusive)}return new rk(r,n)}(s,i),u=function(e,t){let r=[],n=!0;for(let i of ep(t)){let t=0===i.kind?r2(e,i.fieldPath,e.endAt):r1(e,i.fieldPath,e.endAt);r.push(t.value),n&&(n=t.inclusive)}return new rk(r,n)}(s,i),h=this.On(i,s,l),c=this.On(i,s,u),d=this.Nn(i,s,o),f=this.Bn(i.indexId,a,h,l.inclusive,c,u.inclusive,d);return eS.forEach(f,i=>r.Y(i,t.limit).next(t=>{t.forEach(t=>{let r=Z.fromSegments(t.documentKey);e.has(r)||(e=e.add(r),n.push(r))})}))}).next(()=>n)}return eS.resolve(null)})}Mn(e){let t=this.Fn.get(e);return t||(t=0===e.filters.length?[e]:(function(e){if(0===e.getFilters().length)return[];let t=function e(t){if(k(t instanceof rP||t instanceof rL,34018),t instanceof rP)return t;if(1===t.filters.length)return e(t.filters[0]);let r=t.filters.map(t=>e(t)),n=rL.create(r,t.op);return sr(n=ss(n))?n:(k(n instanceof rL,64498),k(rM(n),40251),k(n.filters.length>1,57927),n.filters.reduce((e,t)=>sn(e,t)))}(/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e(t){if(k(t instanceof rP||t instanceof rL,20012),t instanceof rP){if(t instanceof rK){let e=t.value.arrayValue?.values?.map(e=>rP.create(t.field,"==",e))||[];return rL.create(e,"or")}return t}let r=t.filters.map(t=>e(t));return rL.create(r,t.op)}(e));return k(sr(t),7391),se(t)||st(t)?[t]:t.getFilters()})(rL.create(e.filters,"and")).map(t=>rJ(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Fn.set(e,t)),t}Bn(e,t,r,n,i,s,a){let o=(null!=t?t.length:1)*Math.max(r.length,i.length),l=o/(null!=t?t.length:1),u=[];for(let h=0;h<o;++h){let o=t?this.Ln(t[h/l]):su,c=this.kn(e,o,r[h%l],n),d=this.qn(e,o,i[h%l],s),f=a.map(t=>this.kn(e,o,t,!0));u.push(...this.createRange(c,d,f))}return u}kn(e,t,r,n){let i=new i6(e,Z.empty(),t,r);return n?i:i.An()}qn(e,t,r,n){let i=new i6(e,Z.empty(),t,r);return n?i.An():i}xn(e,t){let r=new i7(t),n=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,n).next(e=>{let t=null;for(let n of e)r.yn(n)&&(!t||n.fields.length>t.fields.length)&&(t=n);return t})}getIndexType(e,t){let r=2,n=this.Mn(t);return eS.forEach(n,t=>this.xn(e,t).next(e=>{e?0!==r&&e.fields.length<function(e){let t=new t$(X.comparator),r=!1;for(let n of e.filters)for(let e of n.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?r=!0:t=t.add(e.field));for(let r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(r?1:0)}(t)&&(r=1):r=0})).next(()=>null!==t.limit&&n.length>1&&2===r?1:r)}Qn(e,t){let r=new i4;for(let n of ep(e)){let e=t.data.field(n.fieldPath);if(null==e)return null;let i=r.Pn(n.kind);iX.Kt.Dt(e,i)}return r.un()}Ln(e){let t=new i4;return iX.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){let r=new i4;return iX.Kt.Dt(rm(this.databaseId,t),r.Pn(function(e){let t=ep(e);return 0===t.length?0:t[t.length-1].kind}(e))),r.un()}Nn(e,t,r){if(null===r)return[];let n=[];n.push(new i4);let i=0;for(let s of ep(e)){let e=r[i++];for(let r of n)if(this.Un(t,s.fieldPath)&&ry(e))n=this.Kn(n,s,e);else{let t=r.Pn(s.kind);iX.Kt.Dt(e,t)}}return this.Wn(n)}On(e,t,r){return this.Nn(e,t,r.position)}Wn(e){let t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Kn(e,t,r){let n=[...e],i=[];for(let e of r.arrayValue.values||[])for(let r of n){let n=new i4;n.seed(r.un()),iX.Kt.Dt(e,n.Pn(t.kind)),i.push(n)}return i}Un(e,t){return!!e.filters.find(e=>e instanceof rP&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){let r=tF(e,tp),n=tF(e,tg);return(t?r.J(tm,IDBKeyRange.bound(t,t)):r.J()).next(e=>{let t=[];return eS.forEach(e,e=>n.get([e.indexId,this.uid]).next(r=>{t.push(function(e,t){let r=t?new ey(t.sequenceNumber,new e_(ij(t.readTime),new Z(e$(t.documentKey)),t.largestBatchId)):ey.empty(),n=e.fields.map(([e,t])=>new eg(X.fromServerFormat(e),t));return new ed(e.indexId,e.collectionGroup,n,r)}(e,r))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{let r=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==r?r:G(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,r){let n=tF(e,tp),i=tF(e,tg);return this.Gn(e).next(e=>n.J(tm,IDBKeyRange.bound(t,t)).next(t=>eS.forEach(t,t=>i.put(iW(t.indexId,this.uid,e,r)))))}updateIndexEntries(e,t){let r=new Map;return eS.forEach(t,(t,n)=>{let i=r.get(t.collectionGroup);return(i?eS.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(r.set(t.collectionGroup,i),eS.forEach(i,r=>this.zn(e,t,r).next(t=>{let i=this.jn(n,r);return t.isEqual(i)?eS.resolve():this.Jn(e,n,r,t,i)}))))})}Hn(e,t,r,n){return tF(e,t_).put(n.Rn(this.uid,this.$n(r,t.key),t.key))}Yn(e,t,r,n){return tF(e,t_).delete(n.Vn(this.uid,this.$n(r,t.key),t.key))}zn(e,t,r){let n=tF(e,t_),i=new t$(i5);return n.ee({index:tI,range:IDBKeyRange.only([r.indexId,this.uid,i3(this.$n(r,t))])},(e,n)=>{i=i.add(new i6(r.indexId,t,i8(n.arrayValue),i8(n.directionalValue)))}).next(()=>i)}jn(e,t){let r=new t$(i5),n=this.Qn(t,e);if(null==n)return r;let i=ef(t);if(null!=i){let s=e.data.field(i.fieldPath);if(ry(s))for(let i of s.arrayValue.values||[])r=r.add(new i6(t.indexId,e.key,this.Ln(i),n))}else r=r.add(new i6(t.indexId,e.key,su,n));return r}Jn(e,t,r,n,i){E(sl,"Updating index entries for document '%s'",t.key);let s=[];return function(e,t,r,n,i){let s=e.getIterator(),a=t.getIterator(),o=tH(s),l=tH(a);for(;o||l;){let e=!1,t=!1;if(o&&l){let n=r(o,l);n<0?t=!0:n>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(n(l),l=tH(a)):t?(i(o),o=tH(s)):(o=tH(s),l=tH(a))}}(n,i,i5,n=>{s.push(this.Hn(e,t,r,n))},n=>{s.push(this.Yn(e,t,r,n))}),eS.waitFor(s)}Gn(e){let t=1;return tF(e,tg).ee({index:tw,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,r,n)=>{n.done(),t=r.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((e,t)=>i5(e,t)).filter((e,t,r)=>!t||0!==i5(e,r[t-1]));let n=[];for(let i of(n.push(e),r)){let r=i5(i,e),s=i5(i,t);if(0===r)n[0]=e.An();else if(r>0&&s<0)n.push(i),n.push(i.An());else if(s>0)break}n.push(t);let i=[];for(let e=0;e<n.length;e+=2){if(this.Zn(n[e],n[e+1]))return[];let t=n[e].Vn(this.uid,su,Z.empty()),r=n[e+1].Vn(this.uid,su,Z.empty());i.push(IDBKeyRange.bound(t,r))}return i}Zn(e,t){return i5(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(sc)}getMinOffset(e,t){return eS.mapArray(this.Mn(t),t=>this.xn(e,t).next(e=>e||x(44426))).next(sc)}}function sc(e){k(0!==e.length,28825);let t=e[0].indexState.offset,r=t.largestBatchId;for(let n=1;n<e.length;n++){let i=e[n].indexState.offset;0>eb(i,t)&&(t=i),r<i.largestBatchId&&(r=i.largestBatchId)}return new e_(t.readTime,t.documentKey,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class sf{static withCacheSize(e){return new sf(e,sf.DEFAULT_COLLECTION_PERCENTILE,sf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(e,t,r){let n=e.store(eJ),i=e.store(e1),s=[],a=IDBKeyRange.only(r.batchId),o=0,l=n.ee({range:a},(e,t,r)=>(o++,r.delete()));s.push(l.next(()=>{k(1===o,47070,{batchId:r.batchId})}));let u=[];for(let e of r.mutations){var h,c;let n=(h=e.key.path,c=r.batchId,[t,eG(h),c]);s.push(i.delete(n)),u.push(e.key)}return eS.waitFor(s).next(()=>u)}function sm(e){let t;if(!e)return 0;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw x(14731);t=e.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sf.DEFAULT_COLLECTION_PERCENTILE=10,sf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,sf.DEFAULT=new sf(41943040,sf.DEFAULT_COLLECTION_PERCENTILE,sf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),sf.DISABLED=new sf(-1,0,0);class sg{constructor(e,t,r,n){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=n,this.Xn={}}static wt(e,t,r,n){k(""!==e.uid,64387);let i=e.isAuthenticated()?e.uid:"";return new sg(i,t,r,n)}checkEmpty(e){let t=!0,r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return sw(e).ee({index:eX,range:r},(e,r,n)=>{t=!1,n.done()}).next(()=>t)}addMutationBatch(e,t,r,n){let i=tF(e,e1),s=sw(e);return s.add({}).next(a=>{k("number"==typeof a,49019);let o=new nH(a,t,r,n),l=function(e,t,r){let n=r.baseMutations.map(t=>ix(e.yt,t)),i=r.mutations.map(t=>ix(e.yt,t));return{userId:t,batchId:r.batchId,localWriteTimeMs:r.localWriteTime.toMillis(),baseMutations:n,mutations:i}}(this.serializer,this.userId,o),u=[],h=new t$((e,t)=>G(e.canonicalString(),t.canonicalString()));for(let e of n){let t=[this.userId,eG(e.key.path),a];h=h.add(e.key.path.popLast()),u.push(s.put(l)),u.push(i.put(t,e0))}return h.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Xn[a]=o.keys()}),eS.waitFor(u).next(()=>o)})}lookupMutationBatch(e,t){return sw(e).get(t).next(e=>e?(k(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),iq(this.serializer,e)):null)}er(e,t){return this.Xn[t]?eS.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){let r=e.keys();return this.Xn[t]=r,r}return null})}getNextMutationBatchAfterBatchId(e,t){let r=t+1,n=IDBKeyRange.lowerBound([this.userId,r]),i=null;return sw(e).ee({index:eX,range:n},(e,t,n)=>{t.userId===this.userId&&(k(t.batchId>=r,47524,{tr:r}),i=iq(this.serializer,t)),n.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),r=-1;return sw(e).ee({index:eX,range:t,reverse:!0},(e,t,n)=>{r=t.batchId,n.done()}).next(()=>r)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return sw(e).J(eX,t).next(e=>e.map(e=>iq(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){let r=[this.userId,eG(t.path)],n=IDBKeyRange.lowerBound(r),i=[];return tF(e,e1).ee({range:n},(r,n,s)=>{let[a,o,l]=r,u=e$(o);if(a===this.userId&&t.path.isEqual(u))return sw(e).get(l).next(e=>{if(!e)throw x(61480,{nr:r,batchId:l});k(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:l}),i.push(iq(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new t$(G),n=[];return t.forEach(t=>{let i=[this.userId,eG(t.path)],s=IDBKeyRange.lowerBound(i),a=tF(e,e1).ee({range:s},(e,n,i)=>{let[s,a,o]=e,l=e$(a);s===this.userId&&t.path.isEqual(l)?r=r.add(o):i.done()});n.push(a)}),eS.waitFor(n).next(()=>this.rr(e,r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=[this.userId,eG(r)],s=IDBKeyRange.lowerBound(i),a=new t$(G);return tF(e,e1).ee({range:s},(e,t,i)=>{let[s,o,l]=e,u=e$(o);s===this.userId&&r.isPrefixOf(u)?u.length===n&&(a=a.add(l)):i.done()}).next(()=>this.rr(e,a))}rr(e,t){let r=[],n=[];return t.forEach(t=>{n.push(sw(e).get(t).next(e=>{if(null===e)throw x(35274,{batchId:t});k(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),r.push(iq(this.serializer,e))}))}),eS.waitFor(n).next(()=>r)}removeMutationBatch(e,t){return sp(e.le,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.ir(t.batchId)}),eS.forEach(r,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return eS.resolve();let r=IDBKeyRange.lowerBound([this.userId]),n=[];return tF(e,e1).ee({range:r},(e,t,r)=>{if(e[0]===this.userId){let t=e$(e[1]);n.push(t)}else r.done()}).next(()=>{k(0===n.length,56720,{sr:n.map(e=>e.canonicalString())})})})}containsKey(e,t){return sy(e,this.userId,t)}_r(e){return tF(e,eQ).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function sy(e,t,r){let n=[t,eG(r.path)],i=n[1],s=IDBKeyRange.lowerBound(n),a=!1;return tF(e,e1).ee({range:s,X:!0},(e,r,n)=>{let[s,o,l]=e;s===t&&o===i&&(a=!0),n.done()}).next(()=>a)}function sw(e){return tF(e,eJ)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new sv(0)}static cr(){return new sv(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next(t=>{let r=new sv(t.highestTargetId);return t.highestTargetId=r.next(),this.hr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.lr(e).next(e=>ec.fromTimestamp(new eh(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.lr(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.lr(e).next(n=>(n.highestListenSequenceNumber=t,r&&(n.lastRemoteSnapshotVersion=r.toTimestamp()),t>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=t),this.hr(e,n)))}addTargetData(e,t){return this.Pr(e,t).next(()=>this.lr(e).next(r=>(r.targetCount+=1,this.Tr(t,r),this.hr(e,r))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>tF(e,te).delete(t.targetId)).next(()=>this.lr(e)).next(t=>(k(t.targetCount>0,8065),t.targetCount-=1,this.hr(e,t)))}removeTargets(e,t,r){let n=0,i=[];return tF(e,te).ee((s,a)=>{let o=iz(a);o.sequenceNumber<=t&&null===r.get(o.targetId)&&(n++,i.push(this.removeTargetData(e,o)))}).next(()=>eS.waitFor(i)).next(()=>n)}forEachTarget(e,t){return tF(e,te).ee((e,r)=>{let n=iz(r);t(n)})}lr(e){return tF(e,tl).get(to).next(e=>(k(null!==e,2888),e))}hr(e,t){return tF(e,tl).put(to,t)}Pr(e,t){return tF(e,te).put(iG(this.serializer,t))}Tr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.lr(e).next(e=>e.targetCount)}getTargetData(e,t){let r=rY(t),n=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]),i=null;return tF(e,te).ee({range:n,index:tt},(e,r,n)=>{let s=iz(r);rX(t,s.target)&&(i=s,n.done())}).next(()=>i)}addMatchingKeys(e,t,r){let n=[],i=sb(e);return t.forEach(t=>{let s=eG(t.path);n.push(i.put({targetId:r,path:s})),n.push(this.referenceDelegate.addReference(e,r,t))}),eS.waitFor(n)}removeMatchingKeys(e,t,r){let n=sb(e);return eS.forEach(t,t=>{let i=eG(t.path);return eS.waitFor([n.delete([r,i]),this.referenceDelegate.removeReference(e,r,t)])})}removeMatchingKeysForTargetId(e,t){let r=sb(e),n=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(n)}getMatchingKeysForTargetId(e,t){let r=IDBKeyRange.bound([t],[t+1],!1,!0),n=sb(e),i=ny();return n.ee({range:r,X:!0},(e,t,r)=>{let n=e$(e[1]),s=new Z(n);i=i.add(s)}).next(()=>i)}containsKey(e,t){let r=eG(t.path),n=IDBKeyRange.bound([r],[r+"\x00"],!1,!0),i=0;return sb(e).ee({index:ts,X:!0,range:n},([e,t],r,n)=>{0!==e&&(i++,n.done())}).next(()=>i>0)}At(e,t){return tF(e,te).get(t).next(e=>e?iz(e):null)}}function sb(e){return tF(e,tn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sI="LruGarbageCollector";function sE([e,t],[r,n]){let i=G(e,r);return 0===i?G(t,n):i}class sT{constructor(e){this.Ir=e,this.buffer=new t$(sE),this.Er=0}dr(){return++this.Er}Ar(e){let t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>sE(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class sS{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){E(sI,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){eD(e)?E(sI,"Ignoring IndexedDB error during garbage collection: ",e):await eT(e)}await this.Vr(3e5)})}}class sA{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return eS.resolve(eB.ce);let r=new sT(t);return this.mr.forEachTarget(e,e=>r.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>r.Ar(e))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(E("LruGarbageCollector","Garbage collection skipped; disabled"),eS.resolve(sd)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(E("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sd):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,n,i,s,a,o,l;let u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(E("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),n=this.params.maximumSequenceNumbersToCollect):n=t,s=Date.now(),this.nthSequenceNumber(e,n))).next(n=>(r=n,a=Date.now(),this.removeTargets(e,r,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,r))).next(e=>(l=Date.now(),b()<=h.LogLevel.DEBUG&&E("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-u}ms
	Determined least recently used ${n} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(l-o)+"ms\n"+`Total Duration: ${l-u}ms`),eS.resolve({didRun:!0,sequenceNumbersCollected:n,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(e,t){this.db=e,this.garbageCollector=new sA(this,t)}gr(e){let t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,(e,r)=>t(r))}addReference(e,t,r){return sC(e,r)}removeReference(e,t,r){return sC(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return sC(e,t)}br(e,t){let r;return r=!1,tF(e,eQ).te(n=>sy(e,n,t).next(e=>(e&&(r=!0),eS.resolve(!e)))).next(()=>r)}removeOrphanedDocuments(e,t){let r=this.db.getRemoteDocumentCache().newChangeBuffer(),n=[],i=0;return this.Sr(e,(s,a)=>{if(a<=t){let t=this.br(e,s).next(t=>{if(!t)return i++,r.getEntry(e,s).next(()=>(r.removeEntry(s,ec.min()),sb(e).delete([0,eG(s.path)])))});n.push(t)}}).next(()=>eS.waitFor(n)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return sC(e,t)}Sr(e,t){let r=sb(e),n,i=eB.ce;return r.ee({index:ts},([e,r],{path:s,sequenceNumber:a})=>{0===e?(i!==eB.ce&&t(new Z(e$(n)),i),i=a,n=s):i=eB.ce}).next(()=>{i!==eB.ce&&t(new Z(e$(n)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function sC(e,t){var r;return sb(e).put((r=e.currentSequenceNumber,{targetId:0,path:eG(t.path),sequenceNumber:r}))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(){this.changes=new nu(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,rC.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?eS.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sN{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return tF(e,e2).put(r)}removeEntry(e,t,r){return tF(e,e2).delete(function(e,t){let r=e.path.toArray();return[r.slice(0,r.length-2),r[r.length-2],iV(t),r[r.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Dr(e,r)))}getEntry(e,t){let r=rC.newInvalidDocument(t);return tF(e,e2).ee({index:e6,range:IDBKeyRange.only(sD(t))},(e,n)=>{r=this.Cr(t,n)}).next(()=>r)}vr(e,t){let r={size:0,document:rC.newInvalidDocument(t)};return tF(e,e2).ee({index:e6,range:IDBKeyRange.only(sD(t))},(e,n)=>{r={document:this.Cr(t,n),size:sm(n)}}).next(()=>r)}getEntries(e,t){let r=nh;return this.Fr(e,t,(e,t)=>{let n=this.Cr(e,t);r=r.insert(e,n)}).next(()=>r)}Mr(e,t){let r=nh,n=new tq(Z.comparator);return this.Fr(e,t,(e,t)=>{let i=this.Cr(e,t);r=r.insert(e,i),n=n.insert(e,sm(t))}).next(()=>({documents:r,Or:n}))}Fr(e,t,r){if(t.isEmpty())return eS.resolve();let n=new t$(sP);t.forEach(e=>n=n.add(e));let i=IDBKeyRange.bound(sD(n.first()),sD(n.last())),s=n.getIterator(),a=s.getNext();return tF(e,e2).ee({index:e6,range:i},(e,t,n)=>{let i=Z.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&0>sP(a,i);)r(a,null),a=s.getNext();a&&a.isEqual(i)&&(r(a,t),a=s.hasNext()?s.getNext():null),a?n.j(sD(a)):n.done()}).next(()=>{for(;a;)r(a,null),a=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,r,n,i){let s=t.path,a=[s.popLast().toArray(),s.lastSegment(),iV(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],o=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return tF(e,e2).J(IDBKeyRange.bound(a,o,!0)).next(e=>{i?.incrementDocumentReadCount(e.length);let r=nh;for(let i of e){let e=this.Cr(Z.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(na(t,e)||n.has(e.key))&&(r=r.insert(e.key,e))}return r})}getAllFromCollectionGroup(e,t,r,n){let i=nh,s=sO(t,r),a=sO(t,e_.max());return tF(e,e2).ee({index:e9,range:IDBKeyRange.bound(s,a,!0)},(e,t,r)=>{let s=this.Cr(Z.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);(i=i.insert(s.key,s)).size===n&&r.done()}).next(()=>i)}newChangeBuffer(e){return new sR(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return tF(e,e8).get(e7).next(e=>(k(!!e,20021),e))}Dr(e,t){return tF(e,e8).put(e7,t)}Cr(e,t){if(t){let e=function(e,t){let r;if(t.document)r=iA(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){let e=Z.fromSegments(t.noDocument.path),n=ij(t.noDocument.readTime);r=rC.newNoDocument(e,n),t.hasCommittedMutations&&r.setHasCommittedMutations()}else{if(!t.unknownDocument)return x(56709);{let e=Z.fromSegments(t.unknownDocument.path),n=ij(t.unknownDocument.version);r=rC.newUnknownDocument(e,n)}}return t.readTime&&r.setReadTime(function(e){let t=new eh(e[0],e[1]);return ec.fromTimestamp(t)}(t.readTime)),r}(this.serializer,t);if(!(e.isNoDocument()&&e.version.isEqual(ec.min())))return e}return rC.newInvalidDocument(e)}}class sR extends sk{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new nu(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){let t=[],r=0,n=new t$((e,t)=>G(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{let a=this.Br.get(i);if(t.push(this.Nr.removeEntry(e,i,a.readTime)),s.isValidDocument()){let o=iU(this.Nr.serializer,s);n=n.add(i.path.popLast());let l=sm(o);r+=l-a.size,t.push(this.Nr.addEntry(e,i,o))}else if(r-=a.size,this.trackRemovals){let r=iU(this.Nr.serializer,s.convertToNoDocument(ec.min()));t.push(this.Nr.addEntry(e,i,r))}}),n.forEach(r=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.Nr.updateMetadata(e,r)),eS.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next(e=>(this.Br.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next(({documents:e,Or:t})=>(t.forEach((t,r)=>{this.Br.set(t,{size:r,readTime:e.get(t).readTime})}),e))}}function sD(e){let t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function sO(e,t){let r=t.documentKey.path.toArray();return[e,iV(t.readTime),r.slice(0,r.length-2),r.length>0?r[r.length-1]:""]}function sP(e,t){let r=e.path.toArray(),n=t.path.toArray(),i=0;for(let e=0;e<r.length-2&&e<n.length-2;++e)if(i=G(r[e],n[e]))return i;return(i=G(r.length,n.length))||(i=G(r[r.length-2],n[n.length-2]))||G(r[r.length-1],n[n.length-1])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sL{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sM{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&nU(r.mutation,e,tW.empty(),eh.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ny()).next(()=>t))}getLocalViewOfDocuments(e,t,r=ny()){let n=np();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=nd();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=np();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,ny()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=nh,s=np(),a=np();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof nj)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),nU(a.mutation,t,a.mutation.getFieldMask(),eh.now())):s.set(t.key,tW.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>a.set(e,new sL(t,s.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){let r=np(),n=new tq((e,t)=>e-t),i=ny();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=r.get(e)||tW.empty();a=i.applyToLocalView(s,a),r.set(e,a);let o=(n.get(i.batchId)||ny()).add(e);n=n.insert(i.batchId,o)})}).next(()=>{let s=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=np();l.forEach(e=>{if(!i.has(e)){let n=nF(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return eS.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return Z.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):r9(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):eS.resolve(np()),a=-1,o=i;return s.next(t=>eS.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),i.get(t)?eS.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,ny())).next(e=>({batchId:a,changes:nf(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next(e=>{let t=nd();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=nd();return this.indexManager.getCollectionParents(e,i).next(a=>eS.forEach(a,a=>{let o=new r4(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,rC.newInvalidDocument(n)))});let r=nd();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&nU(s.mutation,n,tW.empty(),eh.now()),na(t,n)&&(r=r.insert(e,n))}),r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sF{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return eS.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,{id:t.id,version:t.version,createTime:im(t.createTime)}),eS.resolve()}getNamedQuery(e,t){return eS.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,{name:t.name,query:i$(t.bundledQuery),readTime:im(t.readTime)}),eS.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sU{constructor(){this.overlays=new tq(Z.comparator),this.qr=new Map}getOverlay(e,t){return eS.resolve(this.overlays.get(t))}getOverlays(e,t){let r=np();return eS.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.St(e,t,n)}),eS.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.qr.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(r)),eS.resolve()}getOverlaysForCollection(e,t,r){let n=np(),i=t.length+1,s=new Z(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return eS.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new tq((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=np(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=np(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return eS.resolve(a)}St(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.qr.get(n.largestBatchId).delete(r.key);this.qr.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new nQ(t,r));let i=this.qr.get(t);void 0===i&&(i=ny(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sV{constructor(){this.sessionToken=tY.EMPTY_BYTE_STRING}getSessionToken(e){return eS.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,eS.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sB{constructor(){this.Qr=new t$(sj.$r),this.Ur=new t$(sj.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){let r=new sj(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new sj(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){let t=new Z(new J([])),r=new sj(t,e),n=new sj(t,e+1),i=[];return this.Ur.forEachInRange([r,n],e=>{this.Gr(e),i.push(e.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){let t=new Z(new J([])),r=new sj(t,e),n=new sj(t,e+1),i=ny();return this.Ur.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new sj(e,0),r=this.Qr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class sj{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return Z.comparator(e.key,t.key)||G(e.Yr,t.Yr)}static Kr(e,t){return G(e.Yr,t.Yr)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sq{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new t$(sj.$r)}checkEmpty(e){return eS.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new nH(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.Zr=this.Zr.add(new sj(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return eS.resolve(s)}lookupMutationBatch(e,t){return eS.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.ei(t+1),n=r<0?0:r;return eS.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return eS.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return eS.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new sj(t,0),n=new sj(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,n],e=>{let t=this.Xr(e.Yr);i.push(t)}),eS.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new t$(G);return t.forEach(e=>{let t=new sj(e,0),n=new sj(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,n],e=>{r=r.add(e.Yr)})}),eS.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;Z.isDocumentKey(i)||(i=i.child(""));let s=new sj(new Z(i),0),a=new t$(G);return this.Zr.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.Yr)),!0)},s),eS.resolve(this.ti(a))}ti(e){let t=[];return e.forEach(e=>{let r=this.Xr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){k(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let r=this.Zr;return eS.forEach(t.mutations,n=>{let i=new sj(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){let r=new sj(t,0),n=this.Zr.firstAfterOrEqual(r);return eS.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,eS.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){let t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sz{constructor(e){this.ri=e,this.docs=new tq(Z.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return eS.resolve(r?r.document.mutableCopy():rC.newInvalidDocument(t))}getEntries(e,t){let r=nh;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():rC.newInvalidDocument(e))}),eS.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=nh,s=t.path,a=new Z(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=eb(ev(a),r)||(n.has(a.key)||na(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return eS.resolve(i)}getAllFromCollectionGroup(e,t,r,n){x(9500)}ii(e,t){return eS.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new sG(this)}getSize(e){return eS.resolve(this.size)}}class sG extends sk{constructor(e){super(),this.Nr=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.Nr.addEntry(e,n)):this.Nr.removeEntry(r)}),eS.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s${constructor(e){this.persistence=e,this.si=new nu(e=>rY(e),rX),this.lastRemoteSnapshotVersion=ec.min(),this.highestTargetId=0,this.oi=0,this._i=new sB,this.targetCount=0,this.ai=sv.ur()}forEachTarget(e,t){return this.si.forEach((e,r)=>t(r)),eS.resolve()}getLastRemoteSnapshotVersion(e){return eS.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return eS.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),eS.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),eS.resolve()}Pr(e){this.si.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.ai=new sv(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,eS.resolve()}updateTargetData(e,t){return this.Pr(t),eS.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,eS.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.si.forEach((s,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),eS.waitFor(i).next(()=>n)}getTargetCount(e){return eS.resolve(this.targetCount)}getTargetData(e,t){let r=this.si.get(t)||null;return eS.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),eS.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),eS.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),eS.resolve()}getMatchingKeysForTargetId(e,t){let r=this._i.Hr(t);return eS.resolve(r)}containsKey(e,t){return eS.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sK{constructor(e,t){this.ui={},this.overlays={},this.ci=new eB(0),this.li=!1,this.li=!0,this.hi=new sV,this.referenceDelegate=e(this),this.Pi=new s$(this),this.indexManager=new sa,this.remoteDocumentCache=new sz(e=>this.referenceDelegate.Ti(e)),this.serializer=new iF(t),this.Ii=new sF(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sU,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new sq(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){E("MemoryPersistence","Starting transaction:",e);let n=new sH(this.ci.next());return this.referenceDelegate.Ei(),r(n).next(e=>this.referenceDelegate.di(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Ai(e,t){return eS.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class sH extends eE{constructor(e){super(),this.currentSequenceNumber=e}}class sW{constructor(e){this.persistence=e,this.Ri=new sB,this.Vi=null}static mi(e){return new sW(e)}get fi(){if(this.Vi)return this.Vi;throw x(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),eS.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),eS.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),eS.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return eS.forEach(this.fi,r=>{let n=Z.fromPath(r);return this.gi(e,n).next(e=>{e||t.removeEntry(n,ec.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return eS.or([()=>eS.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class sQ{constructor(e,t){this.persistence=e,this.pi=new nu(e=>eG(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new sA(this,t)}static mi(e,t){return new sQ(e,t)}Ei(){}di(e){return eS.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){let t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return eS.forEach(this.pi,(r,n)=>this.br(e,r,n).next(e=>e?eS.resolve():t(n)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,n=this.persistence.getRemoteDocumentCache(),i=n.newChangeBuffer();return n.ii(e,n=>this.br(e,n,t).next(e=>{e||(r++,i.removeEntry(n,ec.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),eS.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),eS.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),eS.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),eS.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(rl(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let r=t3(t);return r?16+e(r):16;case 5:return 2*t.stringValue.length;case 6:return t1(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,r)=>t+e(r),0);case 10:case 11:var n;let i;return n=t.mapValue,i=0,tV(n.fields,(t,r)=>{i+=t.length+e(r)}),i;default:throw x(13486,{value:t})}}(e.data.value)),t}br(e,t,r){return eS.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.pi.get(t);return eS.resolve(void 0!==e&&e>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(e){this.serializer=e}k(e,t,r,n){let i=new ex("createOrUpgrade",t);r<1&&n>=1&&(function(e){e.createObjectStore(eH)}(e),function(e){e.createObjectStore(eQ,{keyPath:"userId"});let t=e.createObjectStore(eJ,{keyPath:eY,autoIncrement:!0});t.createIndex(eX,eZ,{unique:!0}),e.createObjectStore(e1)}(e),sY(e),function(e){e.createObjectStore(eK)}(e));let s=eS.resolve();return r<3&&n>=3&&(0!==r&&(e.deleteObjectStore(tn),e.deleteObjectStore(te),e.deleteObjectStore(tl),sY(e)),s=s.next(()=>(function(e){let t=e.store(tl),r={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ec.min().toTimestamp(),targetCount:0};return t.put(to,r)})(i))),r<4&&n>=4&&(0!==r&&(s=s.next(()=>(function(e,t){let r=t.store(eJ);return r.J().next(r=>{e.deleteObjectStore(eJ),e.createObjectStore(eJ,{keyPath:eY,autoIncrement:!0}).createIndex(eX,eZ,{unique:!0});let n=t.store(eJ),i=r.map(e=>n.put(e));return eS.waitFor(i)})})(e,i))),s=s.next(()=>{!function(e){e.createObjectStore(tc,{keyPath:"clientId"})}(e)})),r<5&&n>=5&&(s=s.next(()=>this.yi(i))),r<6&&n>=6&&(s=s.next(()=>((function(e){e.createObjectStore(e8)})(e),this.wi(i)))),r<7&&n>=7&&(s=s.next(()=>this.Si(i))),r<8&&n>=8&&(s=s.next(()=>this.bi(e,i))),r<9&&n>=9&&(s=s.next(()=>{e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")})),r<10&&n>=10&&(s=s.next(()=>this.Di(i))),r<11&&n>=11&&(s=s.next(()=>{(function(e){e.createObjectStore(td,{keyPath:"bundleId"})})(e),function(e){e.createObjectStore(tf,{keyPath:"name"})}(e)})),r<12&&n>=12&&(s=s.next(()=>{!function(e){let t=e.createObjectStore(tT,{keyPath:tS});t.createIndex(tA,tx,{unique:!1}),t.createIndex(tC,tk,{unique:!1})}(e)})),r<13&&n>=13&&(s=s.next(()=>(function(e){let t=e.createObjectStore(e2,{keyPath:e4});t.createIndex(e6,e5),t.createIndex(e9,e3)})(e)).next(()=>this.Ci(e,i)).next(()=>e.deleteObjectStore(eK))),r<14&&n>=14&&(s=s.next(()=>this.Fi(e,i))),r<15&&n>=15&&(s=s.next(()=>(function(e){let t=e.createObjectStore(tp,{keyPath:"indexId",autoIncrement:!0});t.createIndex(tm,"collectionGroup",{unique:!1});let r=e.createObjectStore(tg,{keyPath:ty});r.createIndex(tw,tv,{unique:!1});let n=e.createObjectStore(t_,{keyPath:tb});n.createIndex(tI,tE,{unique:!1})})(e))),r<16&&n>=16&&(s=s.next(()=>{t.objectStore(tg).clear()}).next(()=>{t.objectStore(t_).clear()})),r<17&&n>=17&&(s=s.next(()=>{!function(e){e.createObjectStore(tN,{keyPath:"name"})}(e)})),r<18&&n>=18&&(0,c.isSafariOrWebkit)()&&(s=s.next(()=>{t.objectStore(tg).clear()}).next(()=>{t.objectStore(t_).clear()})),s}wi(e){let t=0;return e.store(eK).ee((e,r)=>{t+=sm(r)}).next(()=>{let r={byteSize:t};return e.store(e8).put(e7,r)})}yi(e){let t=e.store(eQ),r=e.store(eJ);return t.J().next(t=>eS.forEach(t,t=>{let n=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return r.J(eX,n).next(r=>eS.forEach(r,r=>{k(r.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:r.batchId});let n=iq(this.serializer,r);return sp(e,t.userId,n).next(()=>{})}))}))}Si(e){let t=e.store(tn),r=e.store(eK);return e.store(tl).get(to).next(e=>{let n=[];return r.ee((r,i)=>{let s=new J(r),a=[0,eG(s)];n.push(t.get(a).next(r=>r?eS.resolve():t.put({targetId:0,path:eG(s),sequenceNumber:e.highestListenSequenceNumber})))}).next(()=>eS.waitFor(n))})}bi(e,t){e.createObjectStore(tu,{keyPath:th});let r=t.store(tu),n=new so,i=e=>{if(n.add(e)){let t=e.lastSegment(),n=e.popLast();return r.put({collectionId:t,parent:eG(n)})}};return t.store(eK).ee({X:!0},(e,t)=>{let r=new J(e);return i(r.popLast())}).next(()=>t.store(e1).ee({X:!0},([e,t,r],n)=>{let s=e$(t);return i(s.popLast())}))}Di(e){let t=e.store(te);return t.ee((e,r)=>{let n=iz(r),i=iG(this.serializer,n);return t.put(i)})}Ci(e,t){let r=t.store(eK),n=[];return r.ee((e,r)=>{let i=t.store(e2),s=(r.document?new Z(J.fromString(r.document.name).popFirst(5)):r.noDocument?Z.fromSegments(r.noDocument.path):r.unknownDocument?Z.fromSegments(r.unknownDocument.path):x(36783)).path.toArray(),a={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:r.readTime||[0,0],unknownDocument:r.unknownDocument,noDocument:r.noDocument,document:r.document,hasCommittedMutations:!!r.hasCommittedMutations};n.push(i.put(a))}).next(()=>eS.waitFor(n))}Fi(e,t){let r=t.store(eJ),n=new sN(this.serializer),i=new sK(sW.mi,this.serializer.yt);return r.J().next(e=>{let r=new Map;return e.forEach(e=>{let t=r.get(e.userId)??ny();iq(this.serializer,e).keys().forEach(e=>t=t.add(e)),r.set(e.userId,t)}),eS.forEach(r,(e,r)=>{let s=new w(r),a=iJ.wt(this.serializer,s),o=i.getIndexManager(s),l=sg.wt(s,this.serializer,o,i.referenceDelegate);return new sM(n,l,a,o).recalculateAndSaveOverlaysForDocumentKeys(new tM(t,eB.ce),e).next()})})}}function sY(e){e.createObjectStore(tn,{keyPath:ti}).createIndex(ts,ta,{unique:!0}),e.createObjectStore(te,{keyPath:"targetId"}).createIndex(tt,tr,{unique:!0}),e.createObjectStore(tl)}let sX="IndexedDbPersistence",sZ="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",s0="main";class s1{constructor(e,t,r,n,i,s,a,o,l,u,h=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Mi=i,this.window=s,this.document=a,this.xi=l,this.Oi=u,this.Ni=h,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=e=>Promise.resolve(),!s1.v())throw new D(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new sx(this,n),this.$i=t+s0,this.serializer=new iF(o),this.Ui=new eC(this.$i,this.Ni,new sJ(this.serializer)),this.hi=new iY,this.Pi=new s_(this.referenceDelegate,this.serializer),this.remoteDocumentCache=new sN(this.serializer),this.Ii=new iQ,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,!1===u&&T(sX,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(R.FAILED_PRECONDITION,sZ);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Pi.getHighestSequenceNumber(e))}).then(e=>{this.ci=new eB(e,this.xi)}).then(()=>{this.li=!0}).catch(e=>(this.Ui&&this.Ui.close(),Promise.reject(e)))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget(async()=>{this.started&&await this.Wi()}))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>tF(e,tc).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Hi(e).next(e=>{e||(this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)))})}).next(()=>this.Yi(e)).next(t=>this.isPrimary&&!t?this.Zi(e).next(()=>!1):!!t&&this.Xi(e).next(()=>!0))).catch(e=>{if(eD(e))return E(sX,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return E(sX,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable(()=>this.Qi(e)),this.isPrimary=e})}Hi(e){return tF(e,eH).get(eW).next(e=>eS.resolve(this.es(e)))}ts(e){return tF(e,tc).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,18e5)){this.qi=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{let t=tF(e,tc);return t.J().next(e=>{let r=this.ss(e,18e5),n=e.filter(e=>-1===r.indexOf(e));return eS.forEach(n,e=>t.delete(e.clientId)).next(()=>n)})}).catch(()=>[]);if(this.Ki)for(let t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Wi().then(()=>this.ns()).then(()=>this.ji()))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?eS.resolve(!0):tF(e,eH).get(eW).next(t=>{if(null!==t&&this.rs(t.leaseTimestampMs,5e3)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new D(R.FAILED_PRECONDITION,sZ);return!1}}return!(!this.networkEnabled||!this.inForeground)||tF(e,tc).J().next(e=>void 0===this.ss(e,5e3).find(e=>{if(this.clientId!==e.clientId){let t=!this.networkEnabled&&e.networkEnabled,r=!this.inForeground&&e.inForeground,n=this.networkEnabled===e.networkEnabled;if(t||r&&n)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&E(sX,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[eH,tc],e=>{let t=new tM(e,eB.ce);return this.Zi(t).next(()=>this.ts(t))}),this.Ui.close(),this.Ps()}ss(e,t){return e.filter(e=>this.rs(e.updateTimeMs,t)&&!this.us(e.clientId))}Ts(){return this.runTransaction("getActiveClients","readonly",e=>tF(e,tc).J().next(e=>this.ss(e,18e5).map(e=>e.clientId)))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return sg.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new sh(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return iJ.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,r){var n;let i;E(sX,"Starting transaction:",e);let s=18===(n=this.Ni)?tL:17===n?tL:16===n?tP:15===n?tP:14===n?tO:13===n?tO:12===n?tD:11===n?tR:void x(60245);return this.Ui.runTransaction(e,"readonly"===t?"readonly":"readwrite",s,n=>(i=new tM(n,this.ci?this.ci.next():eB.ce),"readwrite-primary"===t?this.Hi(i).next(e=>!!e||this.Yi(i)).next(t=>{if(!t)throw T(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)),new D(R.FAILED_PRECONDITION,eI);return r(i)}).next(e=>this.Xi(i).next(()=>e)):this.Is(i).next(()=>r(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Is(e){return tF(e,eH).get(eW).next(e=>{if(null!==e&&this.rs(e.leaseTimestampMs,5e3)&&!this.us(e.ownerId)&&!this.es(e)&&!(this.Oi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new D(R.FAILED_PRECONDITION,sZ)})}Xi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return tF(e,eH).put(eW,t)}static v(){return eC.v()}Zi(e){let t=tF(e,eH);return t.get(eW).next(e=>this.es(e)?(E(sX,"Releasing primary lease."),t.delete(eW)):eS.resolve())}rs(e,t){let r=Date.now();return!(e<r-t)&&(!(e>r)||(T(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Gi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Li=()=>{this.Mi.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.Wi()))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground="visible"===this.document.visibilityState)}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){"function"==typeof this.window?.addEventListener&&(this.Bi=()=>{this.cs();let e=/(?:Version|Mobile)\/1[456]/;(0,c.isSafari)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){try{let t=null!==this.Ki?.getItem(this._s(e));return E(sX,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return T(sX,"Failed to get zombied client id.",e),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){T("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch(e){}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function s2(e,t){let r=e.projectId;return e.isDefaultDatabase||(r+="."+e.database),"firestore/"+t+"/"+r+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s4{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=n}static As(e,t){let r=ny(),n=ny();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new s4(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s6{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s5{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(0,c.isSafari)()?8:ek((0,c.getUA)())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.ys(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ws(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new s6;return this.Ss(e,t,r).next(n=>{if(i.result=n,this.Vs)return this.bs(e,t,r,n.size)})}).next(()=>i.result)}bs(e,t,r,n){return r.documentReadCount<this.fs?(b()<=h.LogLevel.DEBUG&&E("QueryEngine","SDK will not create cache indexes for query:",ns(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),eS.resolve()):(b()<=h.LogLevel.DEBUG&&E("QueryEngine","Query:",ns(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.gs*n?(b()<=h.LogLevel.DEBUG&&E("QueryEngine","The SDK decides to create cache indexes for query:",ns(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,r8(t))):eS.resolve())}ys(e,t){if(r5(t))return eS.resolve(null);let r=r8(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=r8(t=nr(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=ny(...n);return this.ps.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.Ds(t,n);return this.Cs(t,s,i,r.readTime)?this.ys(e,nr(t,null,"F")):this.vs(e,s,t,r)}))})))}ws(e,t,r,n){return r5(t)||n.isEqual(ec.min())?eS.resolve(null):this.ps.getDocuments(e,r).next(i=>{let s=this.Ds(t,i);return this.Cs(t,s,r,n)?eS.resolve(null):(b()<=h.LogLevel.DEBUG&&E("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),ns(t)),this.vs(e,s,t,ew(n,-1)).next(e=>e))})}Ds(e,t){let r=new t$(nl(e));return t.forEach((t,n)=>{na(e,n)&&(r=r.add(n))}),r}Cs(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}Ss(e,t,r){return b()<=h.LogLevel.DEBUG&&E("QueryEngine","Using full collection scan to execute query:",ns(t)),this.ps.getDocumentsMatchingQuery(e,t,e_.min(),r)}vs(e,t,r,n){return this.ps.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s9="LocalStore";class s3{constructor(e,t,r,n){this.persistence=e,this.Fs=t,this.serializer=n,this.Ms=new tq(G),this.xs=new nu(e=>rY(e),rX),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new sM(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function s8(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],a=ny();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({Ls:e,removedBatchIds:i,addedBatchIds:s}))})})}function s7(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function ae(e,t,r){let n=ny(),i=ny();return r.forEach(e=>n=n.add(e)),t.getEntries(e,n).next(e=>{let n=nh;return r.forEach((r,s)=>{let a=e.get(r);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(r)),s.isNoDocument()&&s.version.isEqual(ec.min())?(t.removeEntry(r,s.readTime),n=n.insert(r,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),n=n.insert(r,s)):E(s9,"Ignoring outdated watch update for ",r,". Current version:",a.version," Watch version:",s.version)}),{ks:n,qs:i}})}function at(e,t){return e.persistence.runTransaction("Allocate target","readwrite",r=>{let n;return e.Pi.getTargetData(r,t).next(i=>i?(n=i,eS.resolve(n)):e.Pi.allocateTargetId(r).next(i=>(n=new iM(t,i,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,n).next(()=>n))))}).then(r=>{let n=e.Ms.get(r.targetId);return(null===n||r.snapshotVersion.compareTo(n.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r})}async function ar(e,t,r){let n=e.Ms.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!eD(e))throw e;E(s9,`Failed to update sequence numbers for target ${t}: ${e}`)}e.Ms=e.Ms.remove(t),e.xs.delete(n.target)}function an(e,t,r){let n=ec.min(),i=ny();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e.xs.get(r);return void 0!==n?eS.resolve(e.Ms.get(n)):e.Pi.getTargetData(t,r)})(e,s,r8(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Pi.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.Fs.getDocumentsMatchingQuery(s,t,r?n:ec.min(),r?i:ny())).next(r=>(aa(e,no(t),r),{documents:r,Qs:i})))}function ai(e,t){let r=e.Pi,n=e.Ms.get(t);return n?Promise.resolve(n.target):e.persistence.runTransaction("Get target data","readonly",e=>r.At(e,t).next(e=>e?e.target:null))}function as(e,t){let r=e.Os.get(t)||ec.min();return e.persistence.runTransaction("Get new document changes","readonly",n=>e.Ns.getAllFromCollectionGroup(n,t,ew(r,-1),Number.MAX_SAFE_INTEGER)).then(r=>(aa(e,t,r),r))}function aa(e,t,r){let n=e.Os.get(t)||ec.min();r.forEach((e,t)=>{t.readTime.compareTo(n)>0&&(n=t.readTime)}),e.Os.set(t,n)}async function ao(e,t,r,n){let i=ny(),s=nh;for(let e of r){let r=t.$s(e.metadata.name);e.document&&(i=i.add(r));let n=t.Us(e);n.setReadTime(t.Ks(e.metadata.readTime)),s=s.insert(r,n)}let a=e.Ns.newChangeBuffer({trackRemovals:!0}),o=await at(e,r8(r6(J.fromString(`__bundle__/docs/${n}`))));return e.persistence.runTransaction("Apply bundle documents","readwrite",t=>ae(t,a,s).next(e=>(a.apply(t),e)).next(r=>e.Pi.removeMatchingKeysForTargetId(t,o.targetId).next(()=>e.Pi.addMatchingKeys(t,i,o.targetId)).next(()=>e.localDocuments.getLocalViewOfDocuments(t,r.ks,r.qs)).next(()=>r.ks)))}async function al(e,t,r=ny()){let n=await at(e,r8(i$(t.bundledQuery)));return e.persistence.runTransaction("Save named query","readwrite",i=>{let s=im(t.readTime);if(n.snapshotVersion.compareTo(s)>=0)return e.Ii.saveNamedQuery(i,t);let a=n.withResumeToken(tY.EMPTY_BYTE_STRING,s);return e.Ms=e.Ms.insert(a.targetId,a),e.Pi.updateTargetData(i,a).next(()=>e.Pi.removeMatchingKeysForTargetId(i,n.targetId)).next(()=>e.Pi.addMatchingKeys(i,r,n.targetId)).next(()=>e.Ii.saveNamedQuery(i,t))})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let au="firestore_clients";function ah(e,t){return`${au}_${e}_${t}`}let ac="firestore_mutations";function ad(e,t,r){let n=`${ac}_${e}_${r}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}let af="firestore_targets";function ap(e,t){return`${af}_${e}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let am="SharedClientState";class ag{constructor(e,t,r,n){this.user=e,this.batchId=t,this.state=r,this.error=n}static Ws(e,t,r){let n=JSON.parse(r),i,s="object"==typeof n&&-1!==["pending","acknowledged","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code)&&(i=new D(n.error.code,n.error.message)),s?new ag(e,t,n.state,i):(T(am,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Gs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ay{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Ws(e,t){let r=JSON.parse(t),n,i="object"==typeof r&&-1!==["not-current","current","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code)&&(n=new D(r.error.code,r.error.message)),i?new ay(e,r.state,n):(T(am,`Failed to parse target state for ID '${e}': ${t}`),null)}Gs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class aw{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ws(e,t){let r=JSON.parse(t),n="object"==typeof r&&r.activeTargetIds instanceof Array,i=nw;for(let e=0;n&&e<r.activeTargetIds.length;++e)n=ez(r.activeTargetIds[e]),i=i.add(r.activeTargetIds[e]);return n?new aw(e,i):(T(am,`Failed to parse client data for instance '${e}': ${t}`),null)}}class av{constructor(e,t){this.clientId=e,this.onlineState=t}static Ws(e){let t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new av(t.clientId,t.onlineState):(T(am,`Failed to parse online state: ${e}`),null)}}class a_{constructor(){this.activeTargetIds=nw}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ab{constructor(e,t,r,n,i){var s,a,o;this.window=e,this.Mi=t,this.persistenceKey=r,this.Js=n,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new tq(G),this.started=!1,this.Xs=[];let l=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.eo=ah(this.persistenceKey,this.Js),this.no=(s=this.persistenceKey,`firestore_sequence_number_${s}`),this.Zs=this.Zs.insert(this.Js,new a_),this.ro=RegExp(`^${au}_${l}_([^_]*)$`),this.io=RegExp(`^${ac}_${l}_(\\d+)(?:_(.*))?$`),this.so=RegExp(`^${af}_${l}_(\\d+)$`),this.oo=(a=this.persistenceKey,`firestore_online_state_${a}`),this._o=(o=this.persistenceKey,`firestore_bundle_loaded_v2_${o}`),this.window.addEventListener("storage",this.Hs)}static v(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.Ts();for(let t of e){if(t===this.Js)continue;let e=this.getItem(ah(this.persistenceKey,t));if(e){let r=aw.Ws(t,e);r&&(this.Zs=this.Zs.insert(r.clientId,r))}}this.ao();let t=this.storage.getItem(this.oo);if(t){let e=this.uo(t);e&&this.co(e)}for(let e of this.Xs)this.Ys(e);this.Xs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.no,JSON.stringify(e))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(e){let t=!1;return this.Zs.forEach((r,n)=>{n.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.ho(e,"pending")}updateMutationState(e,t,r){this.ho(e,t,r),this.Po(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){let t=this.storage.getItem(ap(this.persistenceKey,e));if(t){let n=ay.Ws(e,t);n&&(r=n.state)}}return t&&this.To.zs(e),this.ao(),r}removeLocalQueryTarget(e){this.To.js(e),this.ao()}isLocalQueryTarget(e){return this.To.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(ap(this.persistenceKey,e))}updateQueryState(e,t,r){this.Io(e,t,r)}handleUserChange(e,t,r){t.forEach(e=>{this.Po(e)}),this.currentUser=e,r.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.Eo(e)}notifyBundleLoaded(e){this.Ao(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return E(am,"READ",e,t),t}setItem(e,t){E(am,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){E(am,"REMOVE",e),this.storage.removeItem(e)}Ys(e){if(e.storageArea===this.storage){if(E(am,"EVENT",e.key,e.newValue),e.key===this.eo)return void T("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable(async()=>{if(this.started){if(null!==e.key){if(this.ro.test(e.key)){if(null==e.newValue){let t=this.Ro(e.key);return this.Vo(t,null)}{let t=this.mo(e.key,e.newValue);if(t)return this.Vo(t.clientId,t)}}else if(this.io.test(e.key)){if(null!==e.newValue){let t=this.fo(e.key,e.newValue);if(t)return this.po(t)}}else if(this.so.test(e.key)){if(null!==e.newValue){let t=this.yo(e.key,e.newValue);if(t)return this.wo(t)}}else if(e.key===this.oo){if(null!==e.newValue){let t=this.uo(e.newValue);if(t)return this.co(t)}}else if(e.key===this.no){let t=function(e){let t=eB.ce;if(null!=e)try{let r=JSON.parse(e);k("number"==typeof r,30636,{So:e}),t=r}catch(e){T(am,"Failed to read sequence number from WebStorage",e)}return t}(e.newValue);t!==eB.ce&&this.sequenceNumberHandler(t)}else if(e.key===this._o){let t=this.bo(e.newValue);await Promise.all(t.map(e=>this.syncEngine.Do(e)))}}}else this.Xs.push(e)})}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(e,t,r){let n=new ag(this.currentUser,e,t,r),i=ad(this.persistenceKey,this.currentUser,e);this.setItem(i,n.Gs())}Po(e){let t=ad(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Eo(e){let t={clientId:this.Js,onlineState:e};this.storage.setItem(this.oo,JSON.stringify(t))}Io(e,t,r){let n=ap(this.persistenceKey,e),i=new ay(e,t,r);this.setItem(n,i.Gs())}Ao(e){let t=JSON.stringify(Array.from(e));this.setItem(this._o,t)}Ro(e){let t=this.ro.exec(e);return t?t[1]:null}mo(e,t){let r=this.Ro(e);return aw.Ws(r,t)}fo(e,t){let r=this.io.exec(e),n=Number(r[1]),i=void 0!==r[2]?r[2]:null;return ag.Ws(new w(i),n,t)}yo(e,t){let r=this.so.exec(e),n=Number(r[1]);return ay.Ws(n,t)}uo(e){return av.Ws(e)}bo(e){return JSON.parse(e)}async po(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Co(e.batchId,e.state,e.error);E(am,`Ignoring mutation for non-active user ${e.user.uid}`)}wo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Vo(e,t){let r=t?this.Zs.insert(e,t):this.Zs.remove(e),n=this.lo(this.Zs),i=this.lo(r),s=[],a=[];return i.forEach(e=>{n.has(e)||s.push(e)}),n.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.Fo(s,a).then(()=>{this.Zs=r})}co(e){this.Zs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}lo(e){let t=nw;return e.forEach((e,r)=>{t=t.unionWith(r.activeTargetIds)}),t}}class aI{constructor(){this.Mo=new a_,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new a_,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aT="ConnectivityMonitor";class aS{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){for(let e of(E(aT,"Network connectivity changed: AVAILABLE"),this.qo))e(0)}ko(){for(let e of(E(aT,"Network connectivity changed: UNAVAILABLE"),this.qo))e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aA=null;function ax(){return null===aA?aA=268435456+Math.round(2147483648*Math.random()):aA++,"0x"+aA.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aC="RestConnection",ak={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class aN{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${n}`,this.Wo=this.databaseId.database===re?`project_id=${r}`:`project_id=${r}&database_id=${n}`}Go(e,t,r,n,i){let s=ax(),a=this.zo(e,t.toUriEncodedString());E(aC,`Sending RPC '${e}' ${s}:`,a,r);let o={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(o,n,i);let{host:l}=new URL(a),u=(0,c.isCloudWorkstation)(l);return this.Jo(e,a,o,r,u).then(t=>(E(aC,`Received RPC '${e}' ${s}: `,t),t),t=>{throw S(aC,`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",r),t})}Ho(e,t,r,n,i,s){return this.Go(e,t,r,n,i)}jo(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+v,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}zo(e,t){let r=ak[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aD="WebChannelConnection";class aO extends aN{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,n,i){let s=ax();return new Promise((i,a)=>{let o=new f.XhrIo;o.setWithCredentials(!0),o.listenOnce(f.EventType.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case f.ErrorCode.NO_ERROR:let t=o.getResponseJson();E(aD,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case f.ErrorCode.TIMEOUT:E(aD,`RPC '${e}' ${s} timed out`),a(new D(R.DEADLINE_EXCEEDED,"Request time out"));break;case f.ErrorCode.HTTP_ERROR:let r=o.getStatus();if(E(aD,`RPC '${e}' ${s} failed with status:`,r,"response text:",o.getResponseText()),r>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=e?.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(t)>=0?t:R.UNKNOWN}(t.status);a(new D(e,t.message))}else a(new D(R.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new D(R.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:e,streamId:s,h_:o.getLastErrorCode(),P_:o.getLastError()})}}finally{E(aD,`RPC '${e}' ${s} completed.`)}});let l=JSON.stringify(n);E(aD,`RPC '${e}' ${s} sending request:`,n),o.send(t,"POST",l,r,15)})}T_(e,t,r){let i=ax(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=(0,f.createWebChannelTransport)(),o=(0,f.getStatEventTarget)(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let h=s.join("");E(aD,`Creating RPC '${e}' stream ${i}: ${h}`,l);let c=a.createWebChannel(h,l);this.I_(c);let d=!1,p=!1,m=new aR({Yo:t=>{p?E(aD,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(d||(E(aD,`Opening RPC '${e}' stream ${i} transport.`),c.open(),d=!0),E(aD,`RPC '${e}' stream ${i} sending:`,t),c.send(t))},Zo:()=>c.close()}),g=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return g(c,f.WebChannel.EventType.OPEN,()=>{p||(E(aD,`RPC '${e}' stream ${i} transport opened.`),m.o_())}),g(c,f.WebChannel.EventType.CLOSE,()=>{p||(p=!0,E(aD,`RPC '${e}' stream ${i} transport closed`),m.a_(),this.E_(c))}),g(c,f.WebChannel.EventType.ERROR,t=>{p||(p=!0,S(aD,`RPC '${e}' stream ${i} transport errored. Name:`,t.name,"Message:",t.message),m.a_(new D(R.UNAVAILABLE,"The operation could not be completed")))}),g(c,f.WebChannel.EventType.MESSAGE,t=>{if(!p){let r=t.data[0];k(!!r,16349);let s=r?.error||r[0]?.error;if(s){E(aD,`RPC '${e}' stream ${i} received error:`,s);let t=s.status,r=function(e){let t=n[e];if(void 0!==t)return nZ(t)}(t),a=s.message;void 0===r&&(r=R.INTERNAL,a="Unknown error status: "+t+" with message "+s.message),p=!0,m.a_(new D(r,a)),c.close()}else E(aD,`RPC '${e}' stream ${i} received:`,r),m.u_(r)}}),g(o,f.Event.STAT_EVENT,t=>{t.stat===f.Stat.PROXY?E(aD,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===f.Stat.NOPROXY&&E(aD,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{m.__()},0),m}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aP(){return"undefined"!=typeof window?window:null}function aL(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aM(e){return new ih(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aF{constructor(e,t,r=1e3,n=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=n,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();let t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),n=Math.max(0,t-r);n>0&&E("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,n,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aU="PersistentStream";class aV{constructor(e,t,r,n,i,s,a,o){this.Mi=e,this.S_=r,this.b_=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new aF(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(T(t.toString()),T("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;let e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.D_===t&&this.G_(e,r)},t=>{e(()=>{let e=new D(R.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){let r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{r(()=>this.z_(e))}),this.stream.onMessage(e=>{r(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return E(aU,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(E(aU,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class aB extends aV{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:x(39313,{state:n}),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(k(void 0===i||"string"==typeof i,58123),tY.fromBase64String(i||"")):(k(void 0===i||i instanceof m||i instanceof Uint8Array,16193),tY.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause,u=l&&function(e){let t=void 0===e.code?R.UNKNOWN:nZ(e.code);return new D(t,e.message||"")}(l);r=new it(s,a,o,u||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=i_(e,n.document.name),s=im(n.document.updateTime),a=n.document.createTime?im(n.document.createTime):ec.min(),o=new rx({mapValue:{fields:n.document.fields}}),l=rC.newFoundDocument(i,s,a,o),u=n.targetIds||[],h=n.removedTargetIds||[];r=new n7(u,h,l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=i_(e,n.document),s=n.readTime?im(n.readTime):ec.min(),a=rC.newNoDocument(i,s),o=n.removedTargetIds||[];r=new n7([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=i_(e,n.document),s=n.removedTargetIds||[];r=new n7([],s,i,null)}else{if(!("filter"in t))return x(11601,{Rt:t});{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new nY(n,i),a=e.targetId;r=new ie(a,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return ec.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?ec.min():t.readTime?im(t.readTime):ec.min()}(e);return this.listener.H_(t,r)}Y_(e){let t={};t.database=iE(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=rZ(n)?{documents:ik(e,n)}:{query:iN(e,n).ft}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=ip(e,t.resumeToken);let n=ic(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(ec.min())>0){r.readTime=id(e,t.snapshotVersion.toTimestamp());let n=ic(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:e})}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){let t={};t.database=iE(this.serializer),t.removeTarget=e,this.q_(t)}}class aj extends aV{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return k(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,k(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){var t,r;k(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(k(void 0!==r,14353),t.map(e=>{let t;return(t=e.updateTime?im(e.updateTime):im(r)).isEqual(ec.min())&&(t=im(r)),new nO(t,e.transformResults||[])})):[]),i=im(e.commitTime);return this.listener.na(i,n)}ra(){let e={};e.database=iE(this.serializer),this.q_(e)}ea(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>ix(this.serializer,e))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aq{}class az extends aq{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.ia=!1}sa(){if(this.ia)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,n){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,iy(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new D(R.UNKNOWN,e.toString())})}Ho(e,t,r,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Ho(e,iy(t,r),n,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new D(R.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class aG{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(T(t),this.aa=!1):E("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let a$="RemoteStore";class aK{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(e=>{r.enqueueAndForget(async()=>{a1(this)&&(E(a$,"Restarting streams for network reachability change."),await async function(e){e.Ea.add(4),await aW(e),e.Ra.set("Unknown"),e.Ea.delete(4),await aH(e)}(this))})}),this.Ra=new aG(r,n)}}async function aH(e){if(a1(e))for(let t of e.da)await t(!0)}async function aW(e){for(let t of e.da)await t(!1)}function aQ(e,t){e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),a0(e)?aZ(e):oo(e).O_()&&aY(e,t))}function aJ(e,t){let r=oo(e);e.Ia.delete(t),r.O_()&&aX(e,t),0===e.Ia.size&&(r.O_()?r.L_():a1(e)&&e.Ra.set("Unknown"))}function aY(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(ec.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}oo(e).Y_(t)}function aX(e,t){e.Va.Ue(t),oo(e).Z_(t)}function aZ(e){e.Va=new ii({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),oo(e).start(),e.Ra.ua()}function a0(e){return a1(e)&&!oo(e).x_()&&e.Ia.size>0}function a1(e){return 0===e.Ea.size}async function a2(e){e.Ra.set("Online")}async function a4(e){e.Ia.forEach((t,r)=>{aY(e,t)})}async function a6(e,t){e.Va=void 0,a0(e)?(e.Ra.ha(t),aZ(e)):e.Ra.set("Unknown")}async function a5(e,t,r){if(e.Ra.set("Online"),t instanceof it&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.Ia.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.Ia.delete(n),e.Va.removeTarget(n))}(e,t)}catch(r){E(a$,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await a9(e,r)}else if(t instanceof n7?e.Va.Ze(t):t instanceof ie?e.Va.st(t):e.Va.tt(t),!r.isEqual(ec.min()))try{let t=await s7(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.Va.Tt(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e.Ia.get(n);i&&e.Ia.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.Ia.get(t);if(!n)return;e.Ia.set(t,n.withResumeToken(tY.EMPTY_BYTE_STRING,n.snapshotVersion)),aX(e,t);let i=new iM(n.target,t,r,n.sequenceNumber);aY(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){E(a$,"Failed to raise snapshot:",t),await a9(e,t)}}async function a9(e,t,r){if(!eD(t))throw t;e.Ea.add(1),await aW(e),e.Ra.set("Offline"),r||(r=()=>s7(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{E(a$,"Retrying IndexedDB access"),await r(),e.Ea.delete(1),await aH(e)})}function a3(e,t){return t().catch(r=>a9(e,r,t))}async function a8(e){let t=ol(e),r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:-1;for(;a1(e)&&e.Ta.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.Ta.length&&t.L_();break}r=n.batchId,function(e,t){e.Ta.push(t);let r=ol(e);r.O_()&&r.X_&&r.ea(t.mutations)}(e,n)}catch(t){await a9(e,t)}a7(e)&&oe(e)}function a7(e){return a1(e)&&!ol(e).x_()&&e.Ta.length>0}function oe(e){ol(e).start()}async function ot(e){ol(e).ra()}async function or(e){let t=ol(e);for(let r of e.Ta)t.ea(r.mutations)}async function on(e,t,r){let n=e.Ta.shift(),i=nW.from(n,t,r);await a3(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await a8(e)}async function oi(e,t){t&&ol(e).X_&&await async function(e,t){var r;if(nX(r=t.code)&&r!==R.ABORTED){let r=e.Ta.shift();ol(e).B_(),await a3(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await a8(e)}}(e,t),a7(e)&&oe(e)}async function os(e,t){e.asyncQueue.verifyOperationInProgress(),E(a$,"RemoteStore received new credentials");let r=a1(e);e.Ea.add(3),await aW(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await aH(e)}async function oa(e,t){t?(e.Ea.delete(2),await aH(e)):t||(e.Ea.add(2),await aW(e),e.Ra.set("Unknown"))}function oo(e){var t,r,n;return e.ma||(e.ma=(t=e.datastore,r=e.asyncQueue,n={Xo:a2.bind(null,e),t_:a4.bind(null,e),r_:a6.bind(null,e),H_:a5.bind(null,e)},t.sa(),new aB(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.da.push(async t=>{t?(e.ma.B_(),a0(e)?aZ(e):e.Ra.set("Unknown")):(await e.ma.stop(),e.Va=void 0)})),e.ma}function ol(e){var t,r,n;return e.fa||(e.fa=(t=e.datastore,r=e.asyncQueue,n={Xo:()=>Promise.resolve(),t_:ot.bind(null,e),r_:oi.bind(null,e),ta:or.bind(null,e),na:on.bind(null,e)},t.sa(),new aj(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.da.push(async t=>{t?(e.fa.B_(),await a8(e)):(await e.fa.stop(),e.Ta.length>0&&(E(a$,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new O,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=Date.now()+r,a=new ou(e,t,s,n,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new D(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oh(e,t){if(T("AsyncQueue",`${t}: ${e}`),eD(e))return new D(R.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{static emptySet(e){return new oc(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(e,t)=>Z.comparator(e.key,t.key),this.keyedMap=nd(),this.sortedSet=new tq(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof oc)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new oc;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(){this.ga=new tq(Z.comparator)}track(e){let t=e.doc.key,r=this.ga.get(t);r?0!==e.type&&3===r.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==r.type?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.ga=this.ga.remove(t):1===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):x(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){let e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class of{constructor(e,t,r,n,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new of(e,t,oc.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&nn(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class om{constructor(){this.queries=og(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){let r=e.queries;e.queries=og(),r.forEach((e,r)=>{for(let e of r.Sa)e.onError(t)})}(this,new D(R.ABORTED,"Firestore shutting down"))}}function og(){return new nu(e=>ni(e),nn)}async function oy(e,t){let r=3,n=t.query,i=e.queries.get(n);i?!i.ba()&&t.Da()&&(r=2):(i=new op,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(n,!0);break;case 1:i.wa=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=oh(r,`Initialization of query '${ns(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&ob(e)}async function ow(e,t){let r=t.query,n=3,i=e.queries.get(r);if(i){let e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?n=t.Da()?0:1:!i.ba()&&t.Da()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function ov(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.Sa)e.Fa(n)&&(r=!0);i.wa=n}}r&&ob(e)}function o_(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Sa)e.onError(r);e.queries.delete(t)}function ob(e){e.Ca.forEach(e=>{e.next()})}(a=s||(s={})).Ma="default",a.Cache="cache";class oI{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new of(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){return!(e.fromCache&&this.Da())||(!this.options.qa||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;let t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=of.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==s.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.Qa=e,this.byteLength=t}$a(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.serializer=e}$s(e){return i_(this.serializer,e)}Us(e){return e.metadata.exists?iA(this.serializer,e.document,!1):rC.newNoDocument(this.$s(e.metadata.name),this.Ks(e.metadata.readTime))}Ks(e){return im(e)}}class oS{constructor(e,t){this.Ua=e,this.serializer=t,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=oA(e)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.Ka.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Wa.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++t;let r=J.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Qa.document&&(this.Wa[this.Wa.length-1].document=e.Qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){let t=new Map,r=new oT(this.serializer);for(let n of e)if(n.metadata.queries){let e=r.$s(n.metadata.name);for(let r of n.metadata.queries){let n=(t.get(r)||ny()).add(e);t.set(r,n)}}return t}async ja(e){let t=await ao(e,new oT(this.serializer),this.Wa,this.Ua.id),r=this.za(this.documents);for(let t of this.Ka)await al(e,t,r.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function oA(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ox{constructor(e){this.key=e}}class oC{constructor(e){this.key=e}}class ok{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ny(),this.mutatedKeys=ny(),this.eu=nl(e),this.tu=new oc(this.eu)}get nu(){return this.Ya}ru(e,t){let r=t?t.iu:new od,n=t?t.tu:this.tu,i=t?t.mutatedKeys:this.mutatedKeys,s=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=na(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.su(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.eu(h,o)>0||l&&0>this.eu(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{tu:s,iu:r,Cs:a,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;let s=e.iu.ya();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Rt:e})}};return r(e)-r(t)})(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(r),n=n??!1;let a=t&&!n?this._u():[],o=0===this.Xa.size&&this.current&&!n?1:0,l=o!==this.Za;return(this.Za=o,0!==s.length||l)?{snapshot:new of(this.query,e.tu,i,s,e.mutatedKeys,0===o,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new od,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];let e=this.Xa;this.Xa=ny(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});let t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new oC(e))}),this.Xa.forEach(r=>{e.has(r)||t.push(new ox(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=ny();let t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return of.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}let oN="SyncEngine";class oR{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class oD{constructor(e){this.key=e,this.hu=!1}}class oO{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new nu(e=>ni(e),nn),this.Iu=new Map,this.Eu=new Set,this.du=new tq(Z.comparator),this.Au=new Map,this.Ru=new sB,this.Vu={},this.mu=new Map,this.fu=sv.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function oP(e,t,r=!0){let n;let i=lt(e),s=i.Tu.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),n=s.view.lu()):n=await oM(i,t,r,!0),n}async function oL(e,t){let r=lt(e);await oM(r,t,!0,!1)}async function oM(e,t,r,n){let i;let s=await at(e.localStore,r8(t)),a=s.targetId,o=e.sharedClientState.addLocalQueryTarget(a,r);return n&&(i=await oF(e,t,a,"current"===o,s.resumeToken)),e.isPrimaryClient&&r&&aQ(e.remoteStore,s),i}async function oF(e,t,r,n,i){e.pu=(t,r,n)=>(async function(e,t,r,n){let i=t.view.ru(r);i.Cs&&(i=await an(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));let s=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return oY(e,t.targetId,o.au),o.snapshot})(e,t,r,n);let s=await an(e.localStore,t,!0),a=new ok(t,s.Qs),o=a.ru(s.documents),l=n8.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);oY(e,r,u.au);let h=new oR(t,r,a);return e.Tu.set(t,h),e.Iu.has(r)?e.Iu.get(r).push(t):e.Iu.set(r,[t]),u.snapshot}async function oU(e,t,r){let n=e.Tu.get(t),i=e.Iu.get(n.targetId);if(i.length>1)return e.Iu.set(n.targetId,i.filter(e=>!nn(e,t))),void e.Tu.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await ar(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&aJ(e.remoteStore,n.targetId),oQ(e,n.targetId)}).catch(eT)):(oQ(e,n.targetId),await ar(e.localStore,n.targetId,!0))}async function oV(e,t){let r=e.Tu.get(t),n=e.Iu.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),aJ(e.remoteStore,r.targetId))}async function oB(e,t,r){let n=lr(e);try{var i;let e;let s=await function(e,t){let r,n;let i=eh.now(),s=t.reduce((e,t)=>e.add(t.key),ny());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=nh,l=ny();return e.Ns.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=nE(n.transform,e||null);null!=i&&(null===r&&(r=rx.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new nj(e.key,t,function e(t){let r=[];return tV(t.fields,(t,n)=>{let i=new X([t]);if(r_(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new tW(r)}(t.value.mapValue),nP.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:nf(r)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),i=s.batchId,(e=n.Vu[n.currentUser.toKey()])||(e=new tq(G)),e=e.insert(i,r),n.Vu[n.currentUser.toKey()]=e,await oZ(n,s.changes),await a8(n.remoteStore)}catch(t){let e=oh(t,"Failed to persist write");r.reject(e)}}async function oj(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{let s=e.Ns.newChangeBuffer({trackRemovals:!0});n=e.Ms;let a=[];t.targetChanges.forEach((s,o)=>{let l=n.get(o);if(!l)return;a.push(e.Pi.removeMatchingKeys(i,s.removedDocuments,o).next(()=>e.Pi.addMatchingKeys(i,s.addedDocuments,o)));let u=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(o)?u=u.withResumeToken(tY.EMPTY_BYTE_STRING,ec.min()).withLastLimboFreeSnapshotVersion(ec.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),n=n.insert(o,u),function(e,t,r){if(0===e.resumeToken.approximateByteSize())return!0;let n=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(n>=3e8)return!0;let i=r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size;return i>0}(l,u,s)&&a.push(e.Pi.updateTargetData(i,u))});let o=nh,l=ny();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&a.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),a.push(ae(i,s,t.documentUpdates).next(e=>{o=e.ks,l=e.qs})),!r.isEqual(ec.min())){let t=e.Pi.getLastRemoteSnapshotVersion(i).next(t=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(t)}return eS.waitFor(a).next(()=>s.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,o,l)).next(()=>o)}).then(t=>(e.Ms=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Au.get(r);n&&(k(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?n.hu=!0:t.modifiedDocuments.size>0?k(n.hu,14607):t.removedDocuments.size>0&&(k(n.hu,42227),n.hu=!1))}),await oZ(e,r,t)}catch(e){await eT(e)}}function oq(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.Tu.forEach((e,r)=>{let n=r.view.va(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Sa)e.va(t)&&(r=!0)}),r&&ob(n),i.length&&e.Pu.H_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function oz(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Au.get(t),i=n&&n.key;if(i){let r=new tq(Z.comparator);r=r.insert(i,rC.newNoDocument(i,ec.min()));let n=ny().add(i),s=new n3(ec.min(),new Map,new tq(G),r,n);await oj(e,s),e.du=e.du.remove(i),e.Au.delete(t),oX(e)}else await ar(e.localStore,t,!1).then(()=>oQ(e,t,r)).catch(eT)}async function oG(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.Ns.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),a=eS.resolve();return s.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);k(null!==s,48541),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ny();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});oW(e,n,null),oH(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await oZ(e,i)}catch(e){await eT(e)}}async function o$(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(k(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});oW(e,t,r),oH(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await oZ(e,i)}catch(e){await eT(e)}}async function oK(e,t){var r;a1(e.remoteStore)||E(oN,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{let n=await (r=e.localStore).persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>r.mutationQueue.getHighestUnacknowledgedBatchId(e));if(-1===n)return void t.resolve();let i=e.mu.get(n)||[];i.push(t),e.mu.set(n,i)}catch(r){let e=oh(r,"Initialization of waitForPendingWrites() operation failed");t.reject(e)}}function oH(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function oW(e,t,r){let n=e.Vu[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.Vu[e.currentUser.toKey()]=n}}function oQ(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.Iu.get(t)))e.Tu.delete(n),r&&e.Pu.yu(n,r);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||oJ(e,t)})}function oJ(e,t){e.Eu.delete(t.path.canonicalString());let r=e.du.get(t);null!==r&&(aJ(e.remoteStore,r),e.du=e.du.remove(t),e.Au.delete(r),oX(e))}function oY(e,t,r){for(let n of r)n instanceof ox?(e.Ru.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.du.get(r)||e.Eu.has(n)||(E(oN,"New document in limbo: "+r),e.Eu.add(n),oX(e))}(e,n)):n instanceof oC?(E(oN,"Document no longer in limbo: "+n.key),e.Ru.removeReference(n.key,t),e.Ru.containsKey(n.key)||oJ(e,n.key)):x(19791,{wu:n})}function oX(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){let t=e.Eu.values().next().value;e.Eu.delete(t);let r=new Z(J.fromString(t)),n=e.fu.next();e.Au.set(n,new oD(r)),e.du=e.du.insert(r,n),aQ(e.remoteStore,new iM(r8(r6(r.path)),n,"TargetPurposeLimboResolution",eB.ce))}}async function oZ(e,t,r){let n=[],i=[],s=[];e.Tu.isEmpty()||(e.Tu.forEach((a,o)=>{s.push(e.pu(o,t,r).then(t=>{if((t||r)&&e.isPrimaryClient){let n=t?!t.fromCache:r?.targetChanges.get(o.targetId)?.current;e.sharedClientState.updateQueryState(o.targetId,n?"current":"not-current")}if(t){n.push(t);let e=s4.As(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Pu.H_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>eS.forEach(t,t=>eS.forEach(t.Es,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>eS.forEach(t.ds,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!eD(e))throw e;E(s9,"Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.Ms.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.Ms=e.Ms.insert(t,i)}}}(e.localStore,i))}async function o0(e,t){if(!e.currentUser.isEqual(t)){E(oN,"User change. New user:",t.toKey());let r=await s8(e.localStore,t);e.currentUser=t,e.mu.forEach(e=>{e.forEach(e=>{e.reject(new D(R.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.mu.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await oZ(e,r.Ls)}}function o1(e,t){let r=e.Au.get(t);if(r&&r.hu)return ny().add(r.key);{let r=ny(),n=e.Iu.get(t);if(!n)return r;for(let t of n){let n=e.Tu.get(t);r=r.unionWith(n.view.nu)}return r}}async function o2(e,t){let r=await an(e.localStore,t.query,!0),n=t.view.cu(r);return e.isPrimaryClient&&oY(e,t.targetId,n.au),n}async function o4(e,t){return as(e.localStore,t).then(t=>oZ(e,t))}async function o6(e,t,r,n){let i=await function(e,t){let r=e.mutationQueue;return e.persistence.runTransaction("Lookup mutation documents","readonly",n=>r.er(n,t).next(t=>t?e.localDocuments.getDocuments(n,t):eS.resolve(null)))}(e.localStore,t);null!==i?("pending"===r?await a8(e.remoteStore):"acknowledged"===r||"rejected"===r?(oW(e,t,n||null),oH(e,t),function(e,t){e.mutationQueue.ir(t)}(e.localStore,t)):x(6720,"Unknown batchState",{Su:r}),await oZ(e,i)):E(oN,"Cannot apply mutation batch with id: "+t)}async function o5(e,t){if(lt(e),lr(e),!0===t&&!0!==e.gu){let t=e.sharedClientState.getAllActiveQueryTargets(),r=await o9(e,t.toArray());for(let t of(e.gu=!0,await oa(e.remoteStore,!0),r))aQ(e.remoteStore,t)}else if(!1===t&&!1!==e.gu){let t=[],r=Promise.resolve();e.Iu.forEach((n,i)=>{e.sharedClientState.isLocalQueryTarget(i)?t.push(i):r=r.then(()=>(oQ(e,i),ar(e.localStore,i,!0))),aJ(e.remoteStore,i)}),await r,await o9(e,t),e.Au.forEach((t,r)=>{aJ(e.remoteStore,r)}),e.Ru.Jr(),e.Au=new Map,e.du=new tq(Z.comparator),e.gu=!1,await oa(e.remoteStore,!1)}}async function o9(e,t,r){let n=[],i=[];for(let r of t){let t;let s=e.Iu.get(r);if(s&&0!==s.length)for(let r of(t=await at(e.localStore,r8(s[0])),s)){let t=e.Tu.get(r),n=await o2(e,t);n.snapshot&&i.push(n.snapshot)}else{let n=await ai(e.localStore,r);t=await at(e.localStore,n),await oF(e,o3(n),r,!1,t.resumeToken)}n.push(t)}return e.Pu.H_(i),n}function o3(e){var t,r,n,i;return t=e.path,r=e.collectionGroup,n=e.orderBy,i=e.filters,new r4(t,r,n,i,e.limit,"F",e.startAt,e.endAt)}function o8(e){return e.localStore.persistence.Ts()}async function o7(e,t,r,n){if(e.gu)return void E(oN,"Ignoring unexpected query state notification.");let i=e.Iu.get(t);if(i&&i.length>0)switch(r){case"current":case"not-current":{let n=await as(e.localStore,no(i[0])),s=n3.createSynthesizedRemoteEventForCurrentChange(t,"current"===r,tY.EMPTY_BYTE_STRING);await oZ(e,n,s);break}case"rejected":await ar(e.localStore,t,!0),oQ(e,t,n);break;default:x(64155,r)}}async function le(e,t,r){let n=lt(e);if(n.gu){for(let e of t){if(n.Iu.has(e)&&n.sharedClientState.isActiveQueryTarget(e)){E(oN,"Adding an already active target "+e);continue}let t=await ai(n.localStore,e),r=await at(n.localStore,t);await oF(n,o3(t),r.targetId,!1,r.resumeToken),aQ(n.remoteStore,r)}for(let e of r)n.Iu.has(e)&&await ar(n.localStore,e,!1).then(()=>{aJ(n.remoteStore,e),oQ(n,e)}).catch(eT)}}function lt(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=oj.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=o1.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=oz.bind(null,e),e.Pu.H_=ov.bind(null,e.eventManager),e.Pu.yu=o_.bind(null,e.eventManager),e}function lr(e){return e.remoteStore.remoteSyncer.applySuccessfulWrite=oG.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=o$.bind(null,e),e}class ln{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=aM(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){var t;return t=this.persistence,new s3(t,new s5,e.initialUser,this.serializer)}Cu(e){return new sK(sW.mi,this.serializer)}Du(e){return new aI}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ln.provider={build:()=>new ln};class li extends ln{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){k(this.persistence.referenceDelegate instanceof sQ,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new sS(r,e.asyncQueue,t)}Cu(e){let t=void 0!==this.cacheSizeBytes?sf.withCacheSize(this.cacheSizeBytes):sf.DEFAULT;return new sK(e=>sQ.mi(e,t),this.serializer)}}class ls extends ln{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await lr(this.xu.syncEngine),await a8(this.xu.remoteStore),await this.persistence.Ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){var t;return t=this.persistence,new s3(t,new s5,e.initialUser,this.serializer)}Fu(e,t){let r=this.persistence.referenceDelegate.garbageCollector;return new sS(r,e.asyncQueue,t)}Mu(e,t){let r=new eV(t,this.persistence);return new eU(e.asyncQueue,r)}Cu(e){let t=s2(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=void 0!==this.cacheSizeBytes?sf.withCacheSize(this.cacheSizeBytes):sf.DEFAULT;return new s1(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,aP(),aL(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new aI}}class la extends ls{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.xu.syncEngine;this.sharedClientState instanceof ab&&(this.sharedClientState.syncEngine={Co:o6.bind(null,t),vo:o7.bind(null,t),Fo:le.bind(null,t),Ts:o8.bind(null,t),Do:o4.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Ji(async e=>{await o5(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){let t=aP();if(!ab.v(t))throw new D(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let r=s2(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ab(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class lo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>oq(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=o0.bind(null,this.syncEngine),await oa(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new om}createDatastore(e){let t=aM(e.databaseInfo.databaseId),r=new aO(e.databaseInfo);return new az(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new aK(t,this.datastore,e.asyncQueue,e=>oq(this.syncEngine,e,0),aS.v()?new aS:new aE)}createSyncEngine(e,t){return function(e,t,r,n,i,s,a){let o=new oO(e,t,r,n,i,s);return a&&(o.gu=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){E(a$,"RemoteStore shutting down."),e.Ea.add(5),await aW(e),e.Aa.shutdown(),e.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function ll(e,t=10240){let r=0;return{async read(){if(r<e.byteLength){let n={value:e.slice(r,r+t),done:!1};return r+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}lo.provider={build:()=>new lo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):T("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new O,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.$a()?this.metadata.resolve(e.Qa.metadata):this.metadata.reject(Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(e?.Qa)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){let e=await this.qu();if(null===e)return null;let t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Qu(`length string (${t}) is not valid number`);let n=await this.$u(r);return new oE(JSON.parse(n),e.length+r)}Uu(){return this.buffer.findIndex(e=>123===e)}async qu(){for(;0>this.Uu()&&!await this.Ku(););if(0===this.buffer.length)return null;let e=this.Uu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");let t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async $u(e){for(;this.buffer.length<e;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");let t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Qu(e){throw this.Bu.cancel(),Error(`Invalid bundle format: ${e}`)}async Ku(){let e=await this.Bu.read();if(!e.done){let t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.$a())throw Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r?.Qa)}`);this.metadata=r;do null!==(r=this.bu())&&this.elements.push(r);while(null!==r)}getMetadata(){return this.metadata}Wu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;let e=this.qu(),t=this.$u(e);return new oE(JSON.parse(t),e)}$u(e){if(this.cursor+e>this.bundleData.length)throw new D(R.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){let e=this.cursor,t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(e,t){let r={documents:t.map(t=>iv(e.serializer,t))},n=await e.Ho("BatchGetDocuments",e.serializer.databaseId,J.emptyPath(),r,t.length),i=new Map;n.forEach(t=>{var r;let n=(r=e.serializer,"found"in t?function(e,t){k(!!t.found,43571),t.found.name,t.found.updateTime;let r=i_(e,t.found.name),n=im(t.found.updateTime),i=t.found.createTime?im(t.found.createTime):ec.min(),s=new rx({mapValue:{fields:t.found.fields}});return rC.newFoundDocument(r,n,i,s)}(r,t):"missing"in t?function(e,t){k(!!t.missing,3894),k(!!t.readTime,22933);let r=i_(e,t.missing),n=im(t.readTime);return rC.newNoDocument(r,n)}(r,t):x(7234,{result:t}));i.set(n.key.toString(),n)});let s=[];return t.forEach(e=>{let t=i.get(e.toString());k(!!t,55234,{key:e}),s.push(t)}),s}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new n$(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{let r=Z.fromPath(t);this.mutations.push(new nK(r,this.precondition(r)))}),await async function(e,t){let r={writes:t.map(t=>ix(e.serializer,t))};await e.Go("Commit",e.serializer.databaseId,J.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw x(50498,{Gu:e.constructor.name});t=ec.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ec.min())?nP.exists(!1):nP.updateTime(t):nP.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ec.min()))throw new D(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return nP.updateTime(t)}return nP.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e,t,r,n,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=n,this.deferred=i,this.zu=r.maxAttempts,this.M_=new aF(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{let e=new ld(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Yu(e)}))}).catch(e=>{this.Yu(e)})})}Hu(e){try{let t=this.updateFunction(e);return!ej(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(e){this.zu>0&&this.Zu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Zu(e){if("FirebaseError"===e?.name){let t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!nX(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lp="FirestoreClient";class lm{constructor(e,t,r,n,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=w.UNAUTHENTICATED,this.clientId=z.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async e=>{E(lp,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(E(lp,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new O;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=oh(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function lg(e,t){e.asyncQueue.verifyOperationInProgress(),E(lp,"Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await s8(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function ly(e,t){e.asyncQueue.verifyOperationInProgress();let r=await lw(e);E(lp,"Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>os(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>os(t.remoteStore,r)),e._onlineComponents=t}async function lw(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){E(lp,"Using user provided OfflineComponentProvider");try{await lg(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===R.FAILED_PRECONDITION||t.code===R.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;S("Error using user provided cache. Falling back to memory cache: "+t),await lg(e,new ln)}}else E(lp,"Using default OfflineComponentProvider"),await lg(e,new li(void 0))}return e._offlineComponents}async function lv(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(E(lp,"Using user provided OnlineComponentProvider"),await ly(e,e._uninitializedComponentsProvider._online)):(E(lp,"Using default OnlineComponentProvider"),await ly(e,new lo))),e._onlineComponents}function l_(e){return lw(e).then(e=>e.persistence)}function lb(e){return lw(e).then(e=>e.localStore)}function lI(e){return lv(e).then(e=>e.remoteStore)}function lE(e){return lv(e).then(e=>e.syncEngine)}function lT(e){return lv(e).then(e=>e.datastore)}async function lS(e){let t=await lv(e),r=t.eventManager;return r.onListen=oP.bind(null,t.syncEngine),r.onUnlisten=oU.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=oL.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=oV.bind(null,t.syncEngine),r}function lA(e,t,r={}){let n=new O;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new lu({next:o=>{s.Nu(),t.enqueueAndForget(()=>ow(e,a));let l=o.docs.has(r);!l&&o.fromCache?i.reject(new D(R.UNAVAILABLE,"Failed to get document because the client is offline.")):l&&o.fromCache&&n&&"server"===n.source?i.reject(new D(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),a=new oI(r6(r.path),s,{includeMetadataChanges:!0,qa:!0});return oy(e,a)})(await lS(e),e.asyncQueue,t,r,n)),n.promise}function lx(e,t,r={}){let n=new O;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new lu({next:r=>{s.Nu(),t.enqueueAndForget(()=>ow(e,a)),r.fromCache&&"server"===n.source?i.reject(new D(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(r)},error:e=>i.reject(e)}),a=new oI(r,s,{includeMetadataChanges:!0,qa:!0});return oy(e,a)})(await lS(e),e.asyncQueue,t,r,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lk=new Map,lN="firestore.googleapis.com";class lR{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new D(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lN,this.ssl=!0}else this.host=e.host,this.ssl=e.ssl??!0;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new D(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}et("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=lC(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class lD{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new lR({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new D(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new lR(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new L;switch(e.type){case"firstParty":return new V(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new D(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=lk.get(e);t&&(E("ComponentProvider","Removing Datastore"),lk.delete(e),t.terminate())}(this),Promise.resolve()}}function lO(e,t,r,n={}){e=ea(e,lD);let i=(0,c.isCloudWorkstation)(t),s=e._getSettings(),a={...s,emulatorOptions:e._getEmulatorOptions()},o=`${t}:${r}`;i&&((0,c.pingServer)(`https://${o}`),(0,c.updateEmulatorBanner)("Firestore",!0)),s.host!==lN&&s.host!==o&&S("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l={...s,host:o,ssl:i,emulatorOptions:n};if(!(0,c.deepEqual)(l,a)&&(e._setSettings(l),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=w.MOCK_USER;else{t=(0,c.createMockUserToken)(n.mockUserToken,e._app?.options.projectId);let i=n.mockUserToken.sub||n.mockUserToken.user_id;if(!i)throw new D(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new w(i)}e._authCredentials=new M(new P(t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lP{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new lP(this.firestore,e,this._query)}}class lL{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lM(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new lL(this.firestore,e,this._key)}toJSON(){return{type:lL._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(eu(t,lL._jsonSchema))return new lL(e,r||null,new Z(J.fromString(t.referencePath)))}}lL._jsonSchemaVersion="firestore/documentReference/1.0",lL._jsonSchema={type:el("string",lL._jsonSchemaVersion),referencePath:el("string")};class lM extends lP{constructor(e,t,r){super(e,t,r6(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new lL(this.firestore,null,new Z(e))}withConverter(e){return new lM(this.firestore,e,this._path)}}function lF(e,t,...r){if(e=(0,c.getModularInstance)(e),ee("collection","path",t),e instanceof lD){let n=J.fromString(t,...r);return en(n),new lM(e,null,n)}{if(!(e instanceof lL||e instanceof lM))throw new D(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(J.fromString(t,...r));return en(n),new lM(e.firestore,null,n)}}function lU(e,t){if(e=ea(e,lD),ee("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new D(R.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new lP(e,null,new r4(J.emptyPath(),t))}function lV(e,t,...r){if(e=(0,c.getModularInstance)(e),1==arguments.length&&(t=z.newId()),ee("doc","path",t),e instanceof lD){let n=J.fromString(t,...r);return er(n),new lL(e,null,new Z(n))}{if(!(e instanceof lL||e instanceof lM))throw new D(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(J.fromString(t,...r));return er(n),new lL(e.firestore,e instanceof lM?e.converter:null,new Z(n))}}function lB(e,t){return e=(0,c.getModularInstance)(e),t=(0,c.getModularInstance)(t),(e instanceof lL||e instanceof lM)&&(t instanceof lL||t instanceof lM)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function lj(e,t){return e=(0,c.getModularInstance)(e),t=(0,c.getModularInstance)(t),e instanceof lP&&t instanceof lP&&e.firestore===t.firestore&&nn(e._query,t._query)&&e.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lq="AsyncQueue";class lz{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new aF(this,"async_queue_retry"),this._c=()=>{let e=aL();e&&E(lq,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;let t=aL();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;let t=aL();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});let t=new O;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!eD(e))throw e;E(lq,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){let t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,T("INTERNAL UNHANDLED ERROR: ",lG(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);let n=ou.createAndSchedule(this,e,t,r,e=>this.hc(e));return this.tc.push(n),n}uc(){this.nc&&x(47125,{Pc:lG(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(let t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{for(let t of(this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.tc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){let t=this.tc.indexOf(e);this.tc.splice(t,1)}}function lG(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l$(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])}class lK{constructor(){this._progressObserver={},this._taskCompletionResolver=new O,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lH=-1;class lW extends lD{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new lz,this._persistenceKey=n?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new lz(e),this._firestoreClient=void 0,await e}}}function lQ(e,t,r){r||(r=re);let n=(0,l._getProvider)(e,"firestore");if(n.isInitialized(r)){let e=n.getImmediate({identifier:r}),i=n.getOptions(r);if((0,c.deepEqual)(i,t))return e;throw new D(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new D(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new D(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&(0,c.isCloudWorkstation)(t.host)&&(0,c.pingServer)(t.host),n.initialize({options:t,instanceIdentifier:r})}function lJ(e,t){let r="object"==typeof e?e:(0,l.getApp)(),n="string"==typeof e?e:t||re,i=(0,l._getProvider)(r,"firestore").getImmediate({identifier:n});if(!i._initialized){let e=(0,c.getDefaultEmulatorHostnameAndPort)("firestore");e&&lO(i,...e)}return i}function lY(e){if(e._terminated)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||lX(e),e._firestoreClient}function lX(e){var t;let r=e._freezeSettings(),n=(t=e._databaseId,new t7(t,e._app?.options.appId||"",e._persistenceKey,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,lC(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator));e._componentsProvider||r.localCache?._offlineComponentProvider&&r.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),e._firestoreClient=new lm(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){let t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function lZ(e,t){S("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let r=e._freezeSettings();return l1(e,lo.provider,{build:e=>new ls(e,r.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function l0(e){S("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let t=e._freezeSettings();l1(e,lo.provider,{build:e=>new la(e,t.cacheSizeBytes)})}function l1(e,t,r){if((e=ea(e,lW))._firestoreClient||e._terminated)throw new D(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new D(R.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:r},lX(e)}function l2(e){if(e._initialized&&!e._terminated)throw new D(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let t=new O;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!eC.v())return Promise.resolve();await eC.delete(e+s0)}(s2(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function l4(e){return function(e){let t=new O;return e.asyncQueue.enqueueAndForget(async()=>oK(await lE(e),t)),t.promise}(lY(e=ea(e,lW)))}function l6(e){var t;return(t=lY(e=ea(e,lW))).asyncQueue.enqueue(async()=>{let e=await l_(t),r=await lI(t);return e.setNetworkEnabled(!0),r.Ea.delete(0),aH(r)})}function l5(e){var t;return(t=lY(e=ea(e,lW))).asyncQueue.enqueue(async()=>{let e=await l_(t),r=await lI(t);return e.setNetworkEnabled(!1),async function(e){e.Ea.add(0),await aW(e),e.Ra.set("Offline")}(r)})}function l9(e){return(0,l._removeServiceInstance)(e.app,"firestore",e._databaseId.database),e._delete()}function l3(e,t){let r=lY(e=ea(e,lW)),n=new lK;return function(e,t,r,n){var i;let s=(i=aM(t),new lh(function(e,t){if(e instanceof Uint8Array)return ll(e,t);if(e instanceof ArrayBuffer)return ll(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}("string"==typeof r?n1().encode(r):r),i));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,r){(async function(e,t,r){try{var n;let i=await t.getMetadata();if(await function(e,t){let r=im(t.createTime);return e.persistence.runTransaction("hasNewerBundle","readonly",r=>e.Ii.getBundleMetadata(r,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,i))return await t.close(),r._completeWith({taskState:"Success",documentsLoaded:i.totalDocuments,bytesLoaded:i.totalBytes,totalDocuments:i.totalDocuments,totalBytes:i.totalBytes}),Promise.resolve(new Set);r._updateProgress(oA(i));let s=new oS(i,t.serializer),a=await t.bu();for(;a;){let e=await s.Ga(a);e&&r._updateProgress(e),a=await t.bu()}let o=await s.ja(e.localStore);return await oZ(e,o.Ha,void 0),await (n=e.localStore).persistence.runTransaction("Save bundle","readwrite",e=>n.Ii.saveBundleMetadata(e,i)),r._completeWith(o.progress),Promise.resolve(o.Ja)}catch(e){return S(oN,`Loading bundle failed with ${e}`),r._failWith(e),Promise.resolve(new Set)}})(e,t,r).then(t=>{e.sharedClientState.notifyBundleLoaded(t)})}(await lE(e),s,n)})}(r,e._databaseId,t,n),n}function l8(e,t){var r;return(r=lY(e=ea(e,lW))).asyncQueue.enqueue(async()=>{var e;return(e=await lb(r)).persistence.runTransaction("Get named query","readonly",r=>e.Ii.getNamedQuery(r,t))}).then(t=>t?new lP(e,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l7{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ue{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ut(tY.fromBase64String(e))}catch(e){throw new D(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new ut(tY.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(eu(e,ut._jsonSchema))return ut.fromBase64String(e.bytes)}}ut._jsonSchemaVersion="firestore/bytes/1.0",ut._jsonSchema={type:el("string",ut._jsonSchemaVersion),bytes:el("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new D(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new X(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function un(){return new ur(W)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:us._jsonSchemaVersion}}static fromJSON(e){if(eu(e,us._jsonSchema))return new us(e.latitude,e.longitude)}}us._jsonSchemaVersion="firestore/geoPoint/1.0",us._jsonSchema={type:el("string",us._jsonSchemaVersion),latitude:el("number"),longitude:el("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ua._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(eu(e,ua._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new ua(e.vectorValues);throw new D(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ua._jsonSchemaVersion="firestore/vectorValue/1.0",ua._jsonSchema={type:el("string",ua._jsonSchemaVersion),vectorValues:el("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uo=/^__.*__$/;class ul{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new nj(e,this.data,this.fieldMask,t,this.fieldTransforms):new nB(e,this.data,t,this.fieldTransforms)}}class uu{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new nj(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function uh(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ac:e})}}class uc{constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new uc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){let t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){let t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return uR(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(uh(this.Ac)&&uo.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class ud{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||aM(e)}Cc(e,t,r,n=!1){return new uc({Ac:e,methodName:t,Dc:r,path:X.emptyPath(),fc:!1,bc:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function uf(e){let t=e._freezeSettings(),r=aM(e._databaseId);return new ud(e._databaseId,!!t.ignoreUndefinedProperties,r)}function up(e,t,r,n,i,s={}){let a,o;let l=e.Cc(s.merge||s.mergeFields?2:0,t,r,i);ux("Data must be an object, but it was:",l,n);let u=uS(n,l);if(s.merge)a=new tW(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=uC(t,n,r);if(!l.contains(i))throw new D(R.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);uD(e,i)||e.push(i)}a=new tW(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new ul(new rx(u),a,o)}class um extends ui{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof um}}function ug(e,t,r){return new uc({Ac:3,Dc:t.settings.Dc,methodName:e._methodName,fc:r},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class uy extends ui{_toFieldTransform(e){return new nD(e.path,new nT)}isEqual(e){return e instanceof uy}}class uw extends ui{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){let t=ug(this,e,!0),r=this.vc.map(e=>uT(e,t)),n=new nS(r);return new nD(e.path,n)}isEqual(e){return e instanceof uw&&(0,c.deepEqual)(this.vc,e.vc)}}class uv extends ui{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){let t=ug(this,e,!0),r=this.vc.map(e=>uT(e,t)),n=new nx(r);return new nD(e.path,n)}isEqual(e){return e instanceof uv&&(0,c.deepEqual)(this.vc,e.vc)}}class u_ extends ui{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){let t=new nk(e.serializer,nb(e.serializer,this.Fc));return new nD(e.path,t)}isEqual(e){return e instanceof u_&&this.Fc===e.Fc}}function ub(e,t,r,n){let i=e.Cc(1,t,r);ux("Data must be an object, but it was:",i,n);let s=[],a=rx.empty();tV(n,(e,n)=>{let o=uN(t,e,r);n=(0,c.getModularInstance)(n);let l=i.yc(o);if(n instanceof um)s.push(o);else{let e=uT(n,l);null!=e&&(s.push(o),a.set(o,e))}});let o=new tW(s);return new uu(a,o,i.fieldTransforms)}function uI(e,t,r,n,i,s){let a=e.Cc(1,t,r),o=[uC(t,n,r)],l=[i];if(s.length%2!=0)throw new D(R.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(uC(t,s[e])),l.push(s[e+1]);let u=[],h=rx.empty();for(let e=o.length-1;e>=0;--e)if(!uD(u,o[e])){let t=o[e],r=l[e];r=(0,c.getModularInstance)(r);let n=a.yc(t);if(r instanceof um)u.push(t);else{let e=uT(r,n);null!=e&&(u.push(t),h.set(t,e))}}let d=new tW(u);return new uu(h,d,a.fieldTransforms)}function uE(e,t,r,n=!1){return uT(r,e.Cc(n?4:3,t))}function uT(e,t){if(uA(e=(0,c.getModularInstance)(e)))return ux("Unsupported field value:",t,e),uS(e,t);if(e instanceof ui)return function(e,t){if(!uh(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let i of e){let e=uT(i,t.wc(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){if(null===(e=(0,c.getModularInstance)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return nb(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=eh.fromDate(e);return{timestampValue:id(t.serializer,r)}}if(e instanceof eh){let r=new eh(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:id(t.serializer,r)}}if(e instanceof us)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof ut)return{bytesValue:ip(t.serializer,e._byteString)};if(e instanceof lL){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Sc(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:ig(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof ua)return function(e,t){let r={fields:{[rr]:{stringValue:rs},[ra]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return nv(t.serializer,e)})}}}};return{mapValue:r}}(e,t);throw t.Sc(`Unsupported field value: ${es(e)}`)}(e,t)}function uS(e,t){let r={};return tj(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):tV(e,(e,n)=>{let i=uT(n,t.mc(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function uA(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof eh||e instanceof us||e instanceof ut||e instanceof lL||e instanceof ui||e instanceof ua)}function ux(e,t,r){if(!uA(r)||!ei(r)){let n=es(r);throw"an object"===n?t.Sc(e+" a custom object"):t.Sc(e+" "+n)}}function uC(e,t,r){if((t=(0,c.getModularInstance)(t))instanceof ur)return t._internalPath;if("string"==typeof t)return uN(e,t);throw uR("Field path arguments must be of type string or ",e,!1,void 0,r)}let uk=RegExp("[~\\*/\\[\\]]");function uN(e,t,r){if(t.search(uk)>=0)throw uR(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new ur(...t.split("."))._internalPath}catch(n){throw uR(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function uR(e,t,r,n,i){let s=n&&!n.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${n}`),a&&(l+=` in document ${i}`),l+=")"),new D(R.INVALID_ARGUMENT,o+e+l)}function uD(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uO{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new lL(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new uP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(uL("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class uP extends uO{data(){return super.data()}}function uL(e,t){return"string"==typeof t?uN(e,t):t instanceof ur?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uM(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new D(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class uF{}class uU extends uF{}function uV(e,t,...r){let n=[];for(let i of(t instanceof uF&&n.push(t),function(e){let t=e.filter(e=>e instanceof uq).length,r=e.filter(e=>e instanceof uB).length;if(t>1||t>0&&r>0)throw new D(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n=n.concat(r)),n))e=i._apply(e);return e}class uB extends uU{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new uB(e,t,r)}_apply(e){let t=this._parse(e);return u5(e._query,t),new lP(e.firestore,e.converter,nt(e._query,t))}_parse(e){let t=uf(e.firestore),r=function(e,t,r,n,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new D(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){u6(a,s);let t=[];for(let r of a)t.push(u4(n,e,r));o={arrayValue:{values:t}}}else o=u4(n,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||u6(a,s),o=uE(r,t,a,"in"===s||"not-in"===s);let l=rP.create(i,s,o);return l}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return r}}function uj(e,t,r){let n=uL("where",e);return uB._create(n,t,r)}class uq extends uF{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new uq(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:rL.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let r=e,n=t.getFlattenedFilters();for(let e of n)u5(r,e),r=nt(r,e)}(e._query,t),new lP(e.firestore,e.converter,nt(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function uz(...e){return e.forEach(e=>u9("or",e)),uq._create("or",e)}function uG(...e){return e.forEach(e=>u9("and",e)),uq._create("and",e)}class u$ extends uU{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new u$(e,t)}_apply(e){let t=function(e,t,r){if(null!==e.startAt)throw new D(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new D(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");let n=new rD(t,r);return n}(e._query,this._field,this._direction);return new lP(e.firestore,e.converter,function(e,t){let r=e.explicitOrderBy.concat([t]);return new r4(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function uK(e,t="asc"){let r=uL("orderBy",e);return u$._create(r,t)}class uH extends uU{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new uH(e,t,r)}_apply(e){return new lP(e.firestore,e.converter,nr(e._query,this._limit,this._limitType))}}function uW(e){return eo("limit",e),uH._create("limit",e,"F")}function uQ(e){return eo("limitToLast",e),uH._create("limitToLast",e,"L")}class uJ extends uU{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new uJ(e,t,r)}_apply(e){var t;let r=u2(e,this.type,this._docOrFields,this._inclusive);return new lP(e.firestore,e.converter,new r4((t=e._query).path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,r,t.endAt))}}function uY(...e){return uJ._create("startAt",e,!0)}function uX(...e){return uJ._create("startAfter",e,!1)}class uZ extends uU{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new uZ(e,t,r)}_apply(e){var t;let r=u2(e,this.type,this._docOrFields,this._inclusive);return new lP(e.firestore,e.converter,new r4((t=e._query).path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,r))}}function u0(...e){return uZ._create("endBefore",e,!1)}function u1(...e){return uZ._create("endAt",e,!0)}function u2(e,t,r,n){if(r[0]=(0,c.getModularInstance)(r[0]),r[0]instanceof uO)return function(e,t,r,n,i){if(!n)throw new D(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${r}().`);let s=[];for(let r of r3(e))if(r.field.isKeyField())s.push(rm(t,n.key));else{let e=n.data.field(r.field);if(t9(e))throw new D(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+r.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){let e=r.field.canonicalString();throw new D(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}s.push(e)}return new rk(s,i)}(e._query,e.firestore._databaseId,t,r[0]._document,n);{let i=uf(e.firestore);return function(e,t,r,n,i,s){let a=e.explicitOrderBy;if(i.length>a.length)throw new D(R.INVALID_ARGUMENT,`Too many arguments provided to ${n}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);let o=[];for(let s=0;s<i.length;s++){let l=i[s];if(a[s].field.isKeyField()){if("string"!=typeof l)throw new D(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${n}(), but got a ${typeof l}`);if(!r9(e)&&-1!==l.indexOf("/"))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${n}() must be a plain document ID, but '${l}' contains a slash.`);let r=e.path.child(J.fromString(l));if(!Z.isDocumentKey(r))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${n}() must result in a valid document path, but '${r}' is not because it contains an odd number of segments.`);let i=new Z(r);o.push(rm(t,i))}else{let e=uE(r,n,l);o.push(e)}}return new rk(o,s)}(e._query,e.firestore._databaseId,i,t,r,n)}}function u4(e,t,r){if("string"==typeof(r=(0,c.getModularInstance)(r))){if(""===r)throw new D(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!r9(t)&&-1!==r.indexOf("/"))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(J.fromString(r));if(!Z.isDocumentKey(n))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return rm(e,new Z(n))}if(r instanceof lL)return rm(e,r._key);throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${es(r)}.`)}function u6(e,t){if(!Array.isArray(e)||0===e.length)throw new D(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function u5(e,t){let r=function(e,t){for(let r of e)for(let e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}function u9(e,t){if(!(t instanceof uB||t instanceof uq))throw new D(R.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class u3{convertValue(e,t="none"){switch(rl(e)){case 0:return null;case 1:return e.booleanValue;case 2:return t0(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(t1(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return tV(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){let t=e.fields?.[ra].arrayValue?.values?.map(e=>t0(e.doubleValue));return new ua(t)}convertGeoPoint(e){return new us(t0(e.latitude),t0(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=t3(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(t8(e));default:return null}}convertTimestamp(e){let t=tZ(e);return new eh(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=J.fromString(e);k(iL(r),9688,{name:e});let n=new rt(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return n.isEqual(t)||T(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u8(e,t,r){return e?r&&(r.merge||r.mergeFields)?e.toFirestore(t,r):e.toFirestore(t):t}class u7 extends u3{constructor(e){super(),this.firestore=e}convertBytes(e){return new ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new lL(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(e){return new l7("sum",uC("sum",e))}function ht(e){return new l7("avg",uC("average",e))}function hr(){return new l7("count")}function hn(e,t){return e instanceof l7&&t instanceof l7&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function hi(e,t){return lj(e.query,t.query)&&(0,c.deepEqual)(e.data(),t.data())}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs="NOT SUPPORTED";class ha{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ho extends uO{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new hu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(uL("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=ho._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()&&(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED")),t}}function hl(e,t,r){if(eu(t,ho._jsonSchema)){if(t.bundle===hs)throw new D(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");let n=aM(e._databaseId),i=new lc(t.bundle,n),s=i.Wu(),a=new oS(i.getMetadata(),n);for(let e of s)a.Ga(e);let o=a.documents;if(1!==o.length)throw new D(R.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${o.length} documents.`);let l=iA(n,o[0].document),u=new Z(J.fromString(t.bundleName));return new ho(e,new u7(e),u,l,new ha(!1,!1),r||null)}}ho._jsonSchemaVersion="firestore/documentSnapshot/1.0",ho._jsonSchema={type:el("string",ho._jsonSchemaVersion),bundleSource:el("string","DocumentSnapshot"),bundleName:el("string"),bundle:el("string")};class hu extends ho{data(e={}){return super.data(e)}}class hh{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new ha(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new hu(this._firestore,this._userDataWriter,r.key,r,new ha(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>{let n=new hu(e._firestore,e._userDataWriter,r.doc.key,r.doc,new ha(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter);return r.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new hu(e._firestore,e._userDataWriter,t.doc.key,t.doc,new ha(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:e})}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=hh._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=z.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],n=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),r.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),n.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function hc(e,t,r){if(eu(t,hh._jsonSchema)){if(t.bundle===hs)throw new D(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");let n=aM(e._databaseId),i=new lc(t.bundle,n),s=i.Wu(),a=new oS(i.getMetadata(),n);for(let e of s)a.Ga(e);if(1!==a.queries.length)throw new D(R.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);let o=i$(a.queries[0].bundledQuery),l=a.documents,u=new oc;l.map(e=>{let t=iA(n,e.document);u=u.add(t)});let h=of.fromInitialDocuments(o,u,ny(),!1,!1),c=new lP(e,r||null,o);return new hh(e,new u7(e),c,h)}}function hd(e,t){return e instanceof ho&&t instanceof ho?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof hh&&t instanceof hh&&e._firestore===t._firestore&&lj(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(e){e=ea(e,lL);let t=ea(e.firestore,lW);return lA(lY(t),e._key).then(r=>hC(t,e,r))}hh._jsonSchemaVersion="firestore/querySnapshot/1.0",hh._jsonSchema={type:el("string",hh._jsonSchemaVersion),bundleSource:el("string","QuerySnapshot"),bundleName:el("string"),bundle:el("string")};class hp extends u3{constructor(e){super(),this.firestore=e}convertBytes(e){return new ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new lL(this.firestore,null,t)}}function hm(e){e=ea(e,lL);let t=ea(e.firestore,lW),r=lY(t),n=new hp(t);return(function(e,t){let r=new O;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,r){try{let n=await e.persistence.runTransaction("read document","readonly",r=>e.localDocuments.getDocument(r,t));n.isFoundDocument()?r.resolve(n):n.isNoDocument()?r.resolve(null):r.reject(new D(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(n){let e=oh(n,`Failed to get document '${t} from cache`);r.reject(e)}})(await lb(e),t,r)),r.promise})(r,e._key).then(r=>new ho(t,n,e._key,r,new ha(null!==r&&r.hasLocalMutations,!0),e.converter))}function hg(e){e=ea(e,lL);let t=ea(e.firestore,lW);return lA(lY(t),e._key,{source:"server"}).then(r=>hC(t,e,r))}function hy(e){e=ea(e,lP);let t=ea(e.firestore,lW),r=lY(t),n=new hp(t);return uM(e._query),lx(r,e._query).then(r=>new hh(t,n,e,r))}function hw(e){e=ea(e,lP);let t=ea(e.firestore,lW),r=lY(t),n=new hp(t);return(function(e,t){let r=new O;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,r){try{let n=await an(e,t,!0),i=new ok(t,n.Qs),s=i.ru(n.documents),a=i.applyChanges(s,!1);r.resolve(a.snapshot)}catch(n){let e=oh(n,`Failed to execute query '${t} against cache`);r.reject(e)}})(await lb(e),t,r)),r.promise})(r,e._query).then(r=>new hh(t,n,e,r))}function hv(e){e=ea(e,lP);let t=ea(e.firestore,lW),r=lY(t),n=new hp(t);return lx(r,e._query,{source:"server"}).then(r=>new hh(t,n,e,r))}function h_(e,t,r){e=ea(e,lL);let n=ea(e.firestore,lW),i=u8(e.converter,t,r);return hx(n,[up(uf(n),"setDoc",e._key,i,null!==e.converter,r).toMutation(e._key,nP.none())])}function hb(e,t,r,...n){e=ea(e,lL);let i=ea(e.firestore,lW),s=uf(i);return hx(i,[("string"==typeof(t=(0,c.getModularInstance)(t))||t instanceof ur?uI(s,"updateDoc",e._key,t,r,n):ub(s,"updateDoc",e._key,t)).toMutation(e._key,nP.exists(!0))])}function hI(e){return hx(ea(e.firestore,lW),[new n$(e._key,nP.none())])}function hE(e,t){let r=ea(e.firestore,lW),n=lV(e),i=u8(e.converter,t);return hx(r,[up(uf(e.firestore),"addDoc",n._key,i,null!==e.converter,{}).toMutation(n._key,nP.exists(!1))]).then(()=>n)}function hT(e,...t){let r,n,i;e=(0,c.getModularInstance)(e);let s={includeMetadataChanges:!1,source:"default"},a=0;"object"!=typeof t[0]||l$(t[a])||(s=t[a++]);let o={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(l$(t[a])){let e=t[a];t[a]=e.next?.bind(e),t[a+1]=e.error?.bind(e),t[a+2]=e.complete?.bind(e)}if(e instanceof lL)n=ea(e.firestore,lW),i=r6(e._key.path),r={next:r=>{t[a]&&t[a](hC(n,e,r))},error:t[a+1],complete:t[a+2]};else{let s=ea(e,lP);n=ea(s.firestore,lW),i=s._query;let o=new hp(n);r={next:e=>{t[a]&&t[a](new hh(n,o,s,e))},error:t[a+1],complete:t[a+2]},uM(e._query)}return function(e,t,r,n){let i=new lu(n),s=new oI(t,i,r);return e.asyncQueue.enqueueAndForget(async()=>oy(await lS(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>ow(await lS(e),s))}}(lY(n),i,o,r)}function hS(e,t,...r){let n=(0,c.getModularInstance)(e),i=function(e){let t={bundle:"",bundleName:"",bundleSource:""};for(let r of["bundle","bundleName","bundleSource"]){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}let n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t}(t);if(i.error)throw new D(R.INVALID_ARGUMENT,i.error);let s,a=0;if("object"!=typeof r[0]||l$(r[a])||(s=r[a++]),"QuerySnapshot"===i.bundleSource){let e=null;if("object"==typeof r[a]&&l$(r[a])){let t=r[a++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:r[a++],error:r[a++],complete:r[a++]};return function(e,t,r,n,i){let s,a=!1,o=l3(e,t.bundle);return o.then(()=>l8(e,t.bundleName)).then(e=>{e&&!a&&(i&&e.withConverter(i),s=hT(e,r||{},n))}).catch(e=>(n.error&&n.error(e),()=>{})),()=>{a||(a=!0,s&&s())}}(n,i,s,e,r[a])}if("DocumentSnapshot"===i.bundleSource){let e=null;if("object"==typeof r[a]&&l$(r[a])){let t=r[a++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:r[a++],error:r[a++],complete:r[a++]};return function(e,t,r,n,i){let s,a=!1,o=l3(e,t.bundle);return o.then(()=>{if(!a){let a=new lL(e,i||null,Z.fromPath(t.bundleName));s=hT(a,r||{},n)}}).catch(e=>(n.error&&n.error(e),()=>{})),()=>{a||(a=!0,s&&s())}}(n,i,s,e,r[a])}throw new D(R.INVALID_ARGUMENT,`unsupported bundle source: ${i.bundleSource}`)}function hA(e,t){return function(e,t){let r=new lu(t);return e.asyncQueue.enqueueAndForget(async()=>{(await lS(e)).Ca.add(r),r.next()}),()=>{r.Nu(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){e.Ca.delete(t)})(await lS(e),r))}}(lY(e=ea(e,lW)),l$(t)?t:{next:t})}function hx(e,t){return function(e,t){let r=new O;return e.asyncQueue.enqueueAndForget(async()=>oB(await lE(e),t,r)),r.promise}(lY(e),t)}function hC(e,t,r){let n=r.docs.get(t._key),i=new hp(e);return new ho(e,i,t._key,n,new ha(r.hasPendingWrites,r.fromCache),t.converter)}function hk(e){return hN(e,{count:hr()})}function hN(e,t){let r=ea(e.firestore,lW),n=lY(r),i=tB(t,(e,t)=>new nJ(t,e.aggregateType,e._internalFieldPath));return(function(e,t,r){let n=new O;return e.asyncQueue.enqueueAndForget(async()=>{try{let i=await lT(e);n.resolve(async function(e,t,r){let{request:n,gt:i,parent:s}=iR(e.serializer,r7(t),r);e.connection.$o||delete n.parent;let a=(await e.Ho("RunAggregationQuery",e.serializer.databaseId,s,n,1)).filter(e=>!!e.result);k(1===a.length,64727);let o=a[0].result?.aggregateFields;return Object.keys(o).reduce((e,t)=>(e[i[t]]=o[t],e),{})}(i,t,r))}catch(e){n.reject(e)}}),n.promise})(n,e._query,i).then(t=>(function(e,t,r){let n=new hp(e),i=new ue(t,n,r);return i})(r,e,t))}class hR{constructor(e){this.kind="memory",this._onlineComponentProvider=lo.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new li(void 0)}}toJSON(){return{kind:this.kind}}}class hD{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=hj(void 0))._initialize(e),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class hO{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ln.provider}toJSON(){return{kind:this.kind}}}class hP{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new li(e)}}toJSON(){return{kind:this.kind}}}function hL(){return new hO}function hM(e){return new hP(e?.cacheSizeBytes)}function hF(e){return new hR(e)}function hU(e){return new hD(e)}class hV{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=lo.provider,this._offlineComponentProvider={build:t=>new ls(t,e?.cacheSizeBytes,this.forceOwnership)}}}class hB{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=lo.provider,this._offlineComponentProvider={build:t=>new la(t,e?.cacheSizeBytes)}}}function hj(e){return new hV(e?.forceOwnership)}function hq(){return new hB}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hz={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hG{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=uf(e)}set(e,t,r){this._verifyNotCommitted();let n=h$(e,this._firestore),i=u8(n.converter,t,r),s=up(this._dataReader,"WriteBatch.set",n._key,i,null!==n.converter,r);return this._mutations.push(s.toMutation(n._key,nP.none())),this}update(e,t,r,...n){let i;this._verifyNotCommitted();let s=h$(e,this._firestore);return i="string"==typeof(t=(0,c.getModularInstance)(t))||t instanceof ur?uI(this._dataReader,"WriteBatch.update",s._key,t,r,n):ub(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,nP.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=h$(e,this._firestore);return this._mutations=this._mutations.concat(new n$(t._key,nP.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function h$(e,t){if((e=(0,c.getModularInstance)(e)).firestore!==t)throw new D(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hK{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=uf(e)}get(e){let t=h$(e,this._firestore),r=new u7(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return x(24041);let n=e[0];if(n.isFoundDocument())return new uO(this._firestore,r,n.key,n,t.converter);if(n.isNoDocument())return new uO(this._firestore,r,t._key,null,t.converter);throw x(18433,{doc:n})})}set(e,t,r){let n=h$(e,this._firestore),i=u8(n.converter,t,r),s=up(this._dataReader,"Transaction.set",n._key,i,null!==n.converter,r);return this._transaction.set(n._key,s),this}update(e,t,r,...n){let i;let s=h$(e,this._firestore);return i="string"==typeof(t=(0,c.getModularInstance)(t))||t instanceof ur?uI(this._dataReader,"Transaction.update",s._key,t,r,n):ub(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,i),this}delete(e){let t=h$(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hH extends hK{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=h$(e,this._firestore),r=new hp(this._firestore);return super.get(e).then(e=>new ho(this._firestore,r,t._key,e._document,new ha(!1,!1),t.converter))}}function hW(e,t,r){e=ea(e,lW);let n={...hz,...r};return function(e){if(e.maxAttempts<1)throw new D(R.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(e,t,r){let n=new O;return e.asyncQueue.enqueueAndForget(async()=>{let i=await lT(e);new lf(e.asyncQueue,i,r,t,n).ju()}),n.promise}(lY(e),r=>t(new hH(e,r)),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hQ(){return new um("deleteField")}function hJ(){return new uy("serverTimestamp")}function hY(...e){return new uw("arrayUnion",e)}function hX(...e){return new uv("arrayRemove",e)}function hZ(e){return new u_("increment",e)}function h0(e){return new ua(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h1(e){return lY(e=ea(e,lW)),new hG(e,t=>hx(e,t))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h2(e,t){let r=lY(e=ea(e,lW));if(!r._uninitializedComponentsProvider||"memory"===r._uninitializedComponentsProvider._offline.kind)return S("Cannot enable indexes when persistence is disabled"),Promise.resolve();let n=function(e){let t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(e){throw new D(R.INVALID_ARGUMENT,"Failed to parse JSON: "+e?.message)}}(e):e,r=[];if(Array.isArray(t.indexes))for(let e of t.indexes){let t=h4(e,"collectionGroup"),n=[];if(Array.isArray(e.fields))for(let t of e.fields){let e=uN("setIndexConfiguration",h4(t,"fieldPath"));"CONTAINS"===t.arrayConfig?n.push(new eg(e,2)):"ASCENDING"===t.order?n.push(new eg(e,0)):"DESCENDING"===t.order&&n.push(new eg(e,1))}r.push(new ed(ed.UNKNOWN_ID,t,n,ey.empty()))}return r}(t);return r.asyncQueue.enqueue(async()=>(async function(e,t){let r=e.indexManager,n=[];return e.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(i=>/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(e,t,r,n,i){t=[...t],(e=[...e]).sort(r),t.sort(r);let s=e.length,a=t.length,o=0,l=0;for(;o<a&&l<s;){let s=r(e[l],t[o]);s<0?i(e[l++]):s>0?n(t[o++]):(o++,l++)}for(;o<a;)n(t[o++]);for(;l<s;)i(e[l++])})(i,t,em,t=>{n.push(r.addFieldIndex(e,t))},t=>{n.push(r.deleteFieldIndex(e,t))})).next(()=>eS.waitFor(n)))})(await lb(r),n))}function h4(e,t){if("string"!=typeof e[t])throw new D(R.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h6{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function h5(e){e=ea(e,lW);let t=ce.get(e);if(t)return t;let r=lY(e);if("persistent"!==r._uninitializedComponentsProvider?._offline.kind)return null;let n=new h6(e);return ce.set(e,n),n}function h9(e){h7(e,!0)}function h3(e){h7(e,!1)}function h8(e){var t;(t=lY(e._firestore)).asyncQueue.enqueue(async()=>(function(e){let t=e.indexManager;return e.persistence.runTransaction("Delete All Indexes","readwrite",e=>t.deleteAllFieldIndexes(e))})(await lb(t))).then(e=>E("deleting all persistent cache indexes succeeded")).catch(e=>S("deleting all persistent cache indexes failed",e))}function h7(e,t){var r;(r=lY(e._firestore)).asyncQueue.enqueue(async()=>{(await lb(r)).Fs.Vs=t}).then(e=>E(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>S(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}let ce=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(e){let t=lY(ea(e.firestore,lW)),r=t._onlineComponents?.datastore.serializer;return void 0===r?null:iN(r,r8(e._query)).ft}function cr(e,t){let r=tB(t,(e,t)=>new nJ(t,e.aggregateType,e._internalFieldPath)),n=lY(ea(e.firestore,lW)),i=n._onlineComponents?.datastore.serializer;return void 0===i?null:iR(i,r7(e._query),r,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(){throw Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return ci.instance.onExistenceFilterMismatch(e)}}class ci{constructor(){this.Mc=new Map}static get instance(){return cs||function(e){if(n0)throw Error("a TestingHooksSpi instance is already set");n0=e}(cs=new ci),cs}lt(e){this.Mc.forEach(t=>t(e))}onExistenceFilterMismatch(e){let t=Symbol(),r=this.Mc;return r.set(t,e),()=>r.delete(t)}}let cs=null;!function(e,t=!0){v=l.SDK_VERSION,(0,l._registerComponent)(new(0,u.Component)("firestore",(e,{instanceIdentifier:r,options:n})=>{let i=e.getProvider("app").getImmediate(),s=new lW(new F(e.getProvider("auth-internal")),new j(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new D(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rt(e.options.projectId,t)}(i,r),i);return n={useFetchStreams:t,...n},s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,l.registerVersion)(g,y,void 0),(0,l.registerVersion)(g,y,"esm2020")}()},{"290e16c8c221c197":"jDYfS",f1f9903160a0afb3:"8Ko5i","@firebase/app":"bfE4h","@firebase/component":"iJpFd","@firebase/logger":"6iQx5","@firebase/util":"cFyzG","@firebase/webchannel-wrapper/bloom-blob":"jDl4t","@firebase/webchannel-wrapper/webchannel-blob":"frjas","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"8Ko5i":[function(e,t,r){var n,i,s=Object.create,a=Object.defineProperty,o=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,u=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty,c=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),d=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of l(t))h.call(e,i)||i===r||a(e,i,{get:()=>t[i],enumerable:!(n=o(t,i))||n.enumerable});return e},f=(e,t,r)=>(r=null!=e?s(u(e)):{},d(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)),p=c(e=>{e.byteLength=function(e){var t=o(e),r=t[0],n=t[1];return(r+n)*3/4-n},e.toByteArray=function(e){var t,r,n=o(e),a=n[0],l=n[1],u=new s((a+l)*3/4-l),h=0,c=l>0?a-4:a;for(r=0;r<c;r+=4)t=i[e.charCodeAt(r)]<<18|i[e.charCodeAt(r+1)]<<12|i[e.charCodeAt(r+2)]<<6|i[e.charCodeAt(r+3)],u[h++]=t>>16&255,u[h++]=t>>8&255,u[h++]=255&t;return 2===l&&(t=i[e.charCodeAt(r)]<<2|i[e.charCodeAt(r+1)]>>4,u[h++]=255&t),1===l&&(t=i[e.charCodeAt(r)]<<10|i[e.charCodeAt(r+1)]<<4|i[e.charCodeAt(r+2)]>>2,u[h++]=t>>8&255,u[h++]=255&t),u},e.fromByteArray=function(e){for(var t,r=e.length,i=r%3,s=[],a=0,o=r-i;a<o;a+=16383)s.push(function(e,t,r){for(var i,s=[],a=t;a<r;a+=3)s.push(n[(i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]))>>18&63]+n[i>>12&63]+n[i>>6&63]+n[63&i]);return s.join("")}(e,a,a+16383>o?o:a+16383));return 1===i?s.push(n[(t=e[r-1])>>2]+n[t<<4&63]+"=="):2===i&&s.push(n[(t=(e[r-2]<<8)+e[r-1])>>10]+n[t>>4&63]+n[t<<2&63]+"="),s.join("")};var t,r,n=[],i=[],s="u">typeof Uint8Array?Uint8Array:Array,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(t=0,r=a.length;t<r;++t)n[t]=a[t],i[a.charCodeAt(t)]=t;function o(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63}),m=c(e=>{e.read=function(e,t,r,n,i){var s,a,o=8*i-n-1,l=(1<<o)-1,u=l>>1,h=-7,c=r?i-1:0,d=r?-1:1,f=e[t+c];for(c+=d,s=f&(1<<-h)-1,f>>=-h,h+=o;h>0;s=256*s+e[t+c],c+=d,h-=8);for(a=s&(1<<-h)-1,s>>=-h,h+=n;h>0;a=256*a+e[t+c],c+=d,h-=8);if(0===s)s=1-u;else{if(s===l)return a?NaN:(f?-1:1)*(1/0);a+=Math.pow(2,n),s-=u}return(f?-1:1)*a*Math.pow(2,s-n)},e.write=function(e,t,r,n,i,s){var a,o,l,u=8*s-i-1,h=(1<<u)-1,c=h>>1,d=23===i?5960464477539062e-23:0,f=n?0:s-1,p=n?1:-1,m=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(o=isNaN(t)?1:0,a=h):(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1&&(a--,l*=2),a+c>=1?t+=d/l:t+=d*Math.pow(2,1-c),t*l>=2&&(a++,l/=2),a+c>=h?(o=0,a=h):a+c>=1?(o=(t*l-1)*Math.pow(2,i),a+=c):(o=t*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;e[r+f]=255&o,f+=p,o/=256,i-=8);for(a=a<<i|o,u+=i;u>0;e[r+f]=255&a,f+=p,a/=256,u-=8);e[r+f-p]|=128*m}}),g=c(e=>{var t=p(),r=m(),n="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function i(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,s.prototype),t}function s(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return l(e)}return a(e,t,r)}function a(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!s.isEncoding(t))throw TypeError("Unknown encoding: "+t);let r=0|d(e,t),n=i(r),a=n.write(e,t);return a!==r&&(n=n.slice(0,a)),n}(e,t);if(ArrayBuffer.isView(e))return function(e){if(F(e,Uint8Array)){let t=new Uint8Array(e);return h(t.buffer,t.byteOffset,t.byteLength)}return u(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(F(e,ArrayBuffer)||e&&F(e.buffer,ArrayBuffer)||"u">typeof SharedArrayBuffer&&(F(e,SharedArrayBuffer)||e&&F(e.buffer,SharedArrayBuffer)))return h(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return s.from(n,t,r);let a=function(e){var t;if(s.isBuffer(e)){let t=0|c(e.length),r=i(t);return 0===r.length||e.copy(r,0,0,t),r}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?i(0):u(e):"Buffer"===e.type&&Array.isArray(e.data)?u(e.data):void 0}(e);if(a)return a;if("u">typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return s.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function o(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function l(e){return o(e),i(e<0?0:0|c(e))}function u(e){let t=e.length<0?0:0|c(e.length),r=i(t);for(let n=0;n<t;n+=1)r[n]=255&e[n];return r}function h(e,t,r){let n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),s.prototype),n}function c(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function d(e,t){if(s.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||F(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return P(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return L(e).length;default:if(i)return n?-1:P(e).length;t=(""+t).toLowerCase(),i=!0}}function f(e,r,n){let i=!1;if((void 0===r||r<0)&&(r=0),r>this.length||((void 0===n||n>this.length)&&(n=this.length),n<=0)||(n>>>=0)<=(r>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){let n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=t;n<r;++n)i+=U[e[n]];return i}(this,r,n);case"utf8":case"utf-8":return v(this,r,n);case"ascii":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}(this,r,n);case"latin1":case"binary":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}(this,r,n);case"base64":var s,a;return s=r,a=n,0===s&&a===this.length?t.fromByteArray(this):t.fromByteArray(this.slice(s,a));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){let n=e.slice(t,r),i="";for(let e=0;e<n.length-1;e+=2)i+=String.fromCharCode(n[e]+256*n[e+1]);return i}(this,r,n);default:if(i)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}function g(e,t,r){let n=e[t];e[t]=e[r],e[r]=n}function y(e,t,r,n,i){var a;if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(a=r=+r)!=a&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return -1;r=e.length-1}else if(r<0){if(!i)return -1;r=0}if("string"==typeof t&&(t=s.from(t,n)),s.isBuffer(t))return 0===t.length?-1:w(e,t,r,n,i);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):w(e,[t],r,n,i);throw TypeError("val must be string, number or Buffer")}function w(e,t,r,n,i){let s,a=1,o=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;a=2,o/=2,l/=2,r/=2}function u(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(i){let n=-1;for(s=r;s<o;s++)if(u(e,s)===u(t,-1===n?0:s-n)){if(-1===n&&(n=s),s-n+1===l)return n*a}else -1!==n&&(s-=s-n),n=-1}else for(r+l>o&&(r=o-l),s=r;s>=0;s--){let r=!0;for(let n=0;n<l;n++)if(u(e,s+n)!==u(t,n)){r=!1;break}if(r)return s}return -1}function v(e,t,r){r=Math.min(e.length,r);let n=[],i=t;for(;i<r;){let t=e[i],s=null,a=t>239?4:t>223?3:t>191?2:1;if(i+a<=r){let r,n,o,l;switch(a){case 1:t<128&&(s=t);break;case 2:(192&(r=e[i+1]))==128&&(l=(31&t)<<6|63&r)>127&&(s=l);break;case 3:r=e[i+1],n=e[i+2],(192&r)==128&&(192&n)==128&&(l=(15&t)<<12|(63&r)<<6|63&n)>2047&&(l<55296||l>57343)&&(s=l);break;case 4:r=e[i+1],n=e[i+2],o=e[i+3],(192&r)==128&&(192&n)==128&&(192&o)==128&&(l=(15&t)<<18|(63&r)<<12|(63&n)<<6|63&o)>65535&&l<1114112&&(s=l)}}null===s?(s=65533,a=1):s>65535&&(s-=65536,n.push(s>>>10&1023|55296),s=56320|1023&s),n.push(s),i+=a}return function(e){let t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}function _(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function b(e,t,r,n,i,a){if(!s.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<a)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function I(e,t,r,n,i){N(t,n,i,e,r,7);let s=Number(t&BigInt(4294967295));e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s;let a=Number(t>>BigInt(32)&BigInt(4294967295));return e[r++]=a,a>>=8,e[r++]=a,a>>=8,e[r++]=a,a>>=8,e[r++]=a,r}function E(e,t,r,n,i){N(t,n,i,e,r,7);let s=Number(t&BigInt(4294967295));e[r+7]=s,s>>=8,e[r+6]=s,s>>=8,e[r+5]=s,s>>=8,e[r+4]=s;let a=Number(t>>BigInt(32)&BigInt(4294967295));return e[r+3]=a,a>>=8,e[r+2]=a,a>>=8,e[r+1]=a,a>>=8,e[r]=a,r+8}function T(e,t,r,n,i,s){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function S(e,t,n,i,s){return t=+t,n>>>=0,s||T(e,t,n,4,34028234663852886e22,-34028234663852886e22),r.write(e,t,n,i,23,4),n+4}function A(e,t,n,i,s){return t=+t,n>>>=0,s||T(e,t,n,8,17976931348623157e292,-17976931348623157e292),r.write(e,t,n,i,52,8),n+8}e.Buffer=s,e.SlowBuffer=function(e){return+e!=e&&(e=0),s.alloc(+e)},e.INSPECT_MAX_BYTES=50,e.kMaxLength=2147483647,s.TYPED_ARRAY_SUPPORT=function(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),!s.TYPED_ARRAY_SUPPORT&&"u">typeof console&&"function"==typeof console.error&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(s.prototype,"parent",{enumerable:!0,get:function(){if(s.isBuffer(this))return this.buffer}}),Object.defineProperty(s.prototype,"offset",{enumerable:!0,get:function(){if(s.isBuffer(this))return this.byteOffset}}),s.poolSize=8192,s.from=function(e,t,r){return a(e,t,r)},Object.setPrototypeOf(s.prototype,Uint8Array.prototype),Object.setPrototypeOf(s,Uint8Array),s.alloc=function(e,t,r){return o(e),e<=0?i(e):void 0!==t?"string"==typeof r?i(e).fill(t,r):i(e).fill(t):i(e)},s.allocUnsafe=function(e){return l(e)},s.allocUnsafeSlow=function(e){return l(e)},s.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==s.prototype},s.compare=function(e,t){if(F(e,Uint8Array)&&(e=s.from(e,e.offset,e.byteLength)),F(t,Uint8Array)&&(t=s.from(t,t.offset,t.byteLength)),!s.isBuffer(e)||!s.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,n=t.length;for(let i=0,s=Math.min(r,n);i<s;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},s.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},s.concat=function(e,t){let r;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return s.alloc(0);if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;let n=s.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){let t=e[r];if(F(t,Uint8Array))i+t.length>n.length?(s.isBuffer(t)||(t=s.from(t)),t.copy(n,i)):Uint8Array.prototype.set.call(n,t,i);else if(s.isBuffer(t))t.copy(n,i);else throw TypeError('"list" argument must be an Array of Buffers');i+=t.length}return n},s.byteLength=d,s.prototype._isBuffer=!0,s.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)g(this,t,t+1);return this},s.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},s.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},s.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?v(this,0,e):f.apply(this,arguments)},s.prototype.toLocaleString=s.prototype.toString,s.prototype.equals=function(e){if(!s.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===s.compare(this,e)},s.prototype.inspect=function(){let t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},n&&(s.prototype[n]=s.prototype.inspect),s.prototype.compare=function(e,t,r,n,i){if(F(e,Uint8Array)&&(e=s.from(e,e.offset,e.byteLength)),!s.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;let a=i-n,o=r-t,l=Math.min(a,o),u=this.slice(n,i),h=e.slice(t,r);for(let e=0;e<l;++e)if(u[e]!==h[e]){a=u[e],o=h[e];break}return a<o?-1:o<a?1:0},s.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},s.prototype.indexOf=function(e,t,r){return y(this,e,t,r,!0)},s.prototype.lastIndexOf=function(e,t,r){return y(this,e,t,r,!1)},s.prototype.write=function(e,t,r,n){var i,s,a,o,l,u,h,c;if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let d=this.length-t;if((void 0===r||r>d)&&(r=d),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let f=!1;for(;;)switch(n){case"hex":return function(e,t,r,n){let i;r=Number(r)||0;let s=e.length-r;n?(n=Number(n))>s&&(n=s):n=s;let a=t.length;for(n>a/2&&(n=a/2),i=0;i<n;++i){let n=parseInt(t.substr(2*i,2),16);if(n!=n)break;e[r+i]=n}return i}(this,e,t,r);case"utf8":case"utf-8":return i=t,s=r,M(P(e,this.length-i),this,i,s);case"ascii":case"latin1":case"binary":return a=t,o=r,M(function(e){let t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(e),this,a,o);case"base64":return l=t,u=r,M(L(e),this,l,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return h=t,c=r,M(function(e,t){let r,n,i=[];for(let s=0;s<e.length&&!((t-=2)<0);++s)n=(r=e.charCodeAt(s))>>8,i.push(r%256),i.push(n);return i}(e,this.length-h),this,h,c);default:if(f)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),f=!0}},s.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},s.prototype.slice=function(e,t){let r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);let n=this.subarray(e,t);return Object.setPrototypeOf(n,s.prototype),n},s.prototype.readUintLE=s.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||_(e,t,this.length);let n=this[e],i=1,s=0;for(;++s<t&&(i*=256);)n+=this[e+s]*i;return n},s.prototype.readUintBE=s.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||_(e,t,this.length);let n=this[e+--t],i=1;for(;t>0&&(i*=256);)n+=this[e+--t]*i;return n},s.prototype.readUint8=s.prototype.readUInt8=function(e,t){return e>>>=0,t||_(e,1,this.length),this[e]},s.prototype.readUint16LE=s.prototype.readUInt16LE=function(e,t){return e>>>=0,t||_(e,2,this.length),this[e]|this[e+1]<<8},s.prototype.readUint16BE=s.prototype.readUInt16BE=function(e,t){return e>>>=0,t||_(e,2,this.length),this[e]<<8|this[e+1]},s.prototype.readUint32LE=s.prototype.readUInt32LE=function(e,t){return e>>>=0,t||_(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},s.prototype.readUint32BE=s.prototype.readUInt32BE=function(e,t){return e>>>=0,t||_(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},s.prototype.readBigUInt64LE=V(function(e){R(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&D(e,this.length-8);let n=t+256*this[++e]+65536*this[++e]+16777216*this[++e],i=this[++e]+256*this[++e]+65536*this[++e]+16777216*r;return BigInt(n)+(BigInt(i)<<BigInt(32))}),s.prototype.readBigUInt64BE=V(function(e){R(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&D(e,this.length-8);let n=16777216*t+65536*this[++e]+256*this[++e]+this[++e],i=16777216*this[++e]+65536*this[++e]+256*this[++e]+r;return(BigInt(n)<<BigInt(32))+BigInt(i)}),s.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||_(e,t,this.length);let n=this[e],i=1,s=0;for(;++s<t&&(i*=256);)n+=this[e+s]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},s.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||_(e,t,this.length);let n=t,i=1,s=this[e+--n];for(;n>0&&(i*=256);)s+=this[e+--n]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},s.prototype.readInt8=function(e,t){return e>>>=0,t||_(e,1,this.length),128&this[e]?-((255-this[e]+1)*1):this[e]},s.prototype.readInt16LE=function(e,t){e>>>=0,t||_(e,2,this.length);let r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},s.prototype.readInt16BE=function(e,t){e>>>=0,t||_(e,2,this.length);let r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},s.prototype.readInt32LE=function(e,t){return e>>>=0,t||_(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},s.prototype.readInt32BE=function(e,t){return e>>>=0,t||_(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},s.prototype.readBigInt64LE=V(function(e){R(e>>>=0,"offset");let t=this[e],r=this[e+7];return(void 0===t||void 0===r)&&D(e,this.length-8),(BigInt(this[e+4]+256*this[e+5]+65536*this[e+6]+(r<<24))<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+16777216*this[++e])}),s.prototype.readBigInt64BE=V(function(e){R(e>>>=0,"offset");let t=this[e],r=this[e+7];return(void 0===t||void 0===r)&&D(e,this.length-8),(BigInt((t<<24)+65536*this[++e]+256*this[++e]+this[++e])<<BigInt(32))+BigInt(16777216*this[++e]+65536*this[++e]+256*this[++e]+r)}),s.prototype.readFloatLE=function(e,t){return e>>>=0,t||_(e,4,this.length),r.read(this,e,!0,23,4)},s.prototype.readFloatBE=function(e,t){return e>>>=0,t||_(e,4,this.length),r.read(this,e,!1,23,4)},s.prototype.readDoubleLE=function(e,t){return e>>>=0,t||_(e,8,this.length),r.read(this,e,!0,52,8)},s.prototype.readDoubleBE=function(e,t){return e>>>=0,t||_(e,8,this.length),r.read(this,e,!1,52,8)},s.prototype.writeUintLE=s.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;b(this,e,t,r,n,0)}let i=1,s=0;for(this[t]=255&e;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r},s.prototype.writeUintBE=s.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;b(this,e,t,r,n,0)}let i=r-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r},s.prototype.writeUint8=s.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,1,255,0),this[t]=255&e,t+1},s.prototype.writeUint16LE=s.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},s.prototype.writeUint16BE=s.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},s.prototype.writeUint32LE=s.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},s.prototype.writeUint32BE=s.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},s.prototype.writeBigUInt64LE=V(function(e,t=0){return I(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),s.prototype.writeBigUInt64BE=V(function(e,t=0){return E(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),s.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);b(this,e,t,r,n-1,-n)}let i=0,s=1,a=0;for(this[t]=255&e;++i<r&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},s.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);b(this,e,t,r,n-1,-n)}let i=r-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},s.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},s.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},s.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},s.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},s.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||b(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},s.prototype.writeBigInt64LE=V(function(e,t=0){return I(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),s.prototype.writeBigInt64BE=V(function(e,t=0){return E(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),s.prototype.writeFloatLE=function(e,t,r){return S(this,e,t,!0,r)},s.prototype.writeFloatBE=function(e,t,r){return S(this,e,t,!1,r)},s.prototype.writeDoubleLE=function(e,t,r){return A(this,e,t,!0,r)},s.prototype.writeDoubleBE=function(e,t,r){return A(this,e,t,!1,r)},s.prototype.copy=function(e,t,r,n){if(!s.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);let i=n-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,n):Uint8Array.prototype.set.call(e,this.subarray(r,n),t),i},s.prototype.fill=function(e,t,r,n){let i;if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!s.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){let t=e.charCodeAt(0);("utf8"===n&&t<128||"latin1"===n)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{let a=s.isBuffer(e)?e:s.from(e,n),o=a.length;if(0===o)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=a[i%o]}return this};var x={};function C(e,t,r){x[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name="".concat(this.name," [").concat(e,"]"),this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return"".concat(this.name," [").concat(e,"]: ").concat(this.message)}}}function k(e){let t="",r=e.length,n="-"===e[0]?1:0;for(;r>=n+4;r-=3)t="_".concat(e.slice(r-3,r)).concat(t);return"".concat(e.slice(0,r)).concat(t)}function N(e,t,r,n,i,s){if(e>r||e<t){let n="bigint"==typeof t?"n":"",i;throw i=s>3?0===t||t===BigInt(0)?">= 0".concat(n," and < 2").concat(n," ** ").concat((s+1)*8).concat(n):">= -(2".concat(n," ** ").concat((s+1)*8-1).concat(n,") and < 2 ** ")+"".concat((s+1)*8-1).concat(n):">= ".concat(t).concat(n," and <= ").concat(r).concat(n),new x.ERR_OUT_OF_RANGE("value",i,e)}R(i,"offset"),(void 0===n[i]||void 0===n[i+s])&&D(i,n.length-(s+1))}function R(e,t){if("number"!=typeof e)throw new x.ERR_INVALID_ARG_TYPE(t,"number",e)}function D(e,t,r){throw Math.floor(e)!==e?(R(e,r),new x.ERR_OUT_OF_RANGE(r||"offset","an integer",e)):t<0?new x.ERR_BUFFER_OUT_OF_BOUNDS:new x.ERR_OUT_OF_RANGE(r||"offset",">= ".concat(r?1:0," and <= ").concat(t),e)}C("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?"".concat(e," is outside of buffer bounds"):"Attempt to access memory outside buffer bounds"},RangeError),C("ERR_INVALID_ARG_TYPE",function(e,t){return'The "'.concat(e,'" argument must be of type number. Received type ').concat(typeof t)},TypeError),C("ERR_OUT_OF_RANGE",function(e,t,r){let n='The value of "'.concat(e,'" is out of range.'),i=r;return Number.isInteger(r)&&Math.abs(r)>4294967296?i=k(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=k(i)),i+="n"),n+=" It must be ".concat(t,". Received ").concat(i)},RangeError);var O=/[^+/0-9A-Za-z-_]/g;function P(e,t){t=t||1/0;let r,n=e.length,i=null,s=[];for(let a=0;a<n;++a){if((r=e.charCodeAt(a))>55295&&r<57344){if(!i){if(r>56319||a+1===n){(t-=3)>-1&&s.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&s.push(239,191,189),i=r;continue}r=(i-55296<<10|r-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;s.push(r)}else if(r<2048){if((t-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function L(e){return t.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(O,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function M(e,t,r,n){let i;for(i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)t[i+r]=e[i];return i}function F(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}var U=function(){let e="0123456789abcdef",t=Array(256);for(let r=0;r<16;++r){let n=16*r;for(let i=0;i<16;++i)t[n+i]=e[r]+e[i]}return t}();function V(e){return typeof BigInt>"u"?B:e}function B(){throw Error("BigInt not supported")}}),y={};((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(y,{default:()=>v}),t.exports=d(a({},"__esModule",{value:!0}),y);var w=f(g());n=f(g()),i=t.exports,d(y,n,"default"),i&&d(i,n,"default");var v=w.default;/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/},{}],jDl4t:[function(e,t,r){var n,i,s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(r),s.export(r,"Integer",()=>n),s.export(r,"Md5",()=>i),s.export(r,"default",()=>l);var a=arguments[3],o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==a?a:"undefined"!=typeof self?self:{},l={};(function(){function e(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function t(e,t,r){r||(r=0);let n=Array(16);if("string"==typeof t)for(var i=0;i<16;++i)n[i]=t.charCodeAt(r++)|t.charCodeAt(r++)<<8|t.charCodeAt(r++)<<16|t.charCodeAt(r++)<<24;else for(i=0;i<16;++i)n[i]=t[r++]|t[r++]<<8|t[r++]<<16|t[r++]<<24;t=e.g[0],r=e.g[1],i=e.g[2];let s=e.g[3],a;a=t+(s^r&(i^s))+n[0]+3614090360&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[1]+3905402710&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[2]+606105819&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[3]+3250441966&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[4]+4118548399&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[5]+1200080426&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[6]+2821735955&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[7]+4249261313&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[8]+1770035416&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[9]+2336552879&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[10]+4294925233&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[11]+2304563134&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[12]+1804603682&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[13]+4254626195&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[14]+2792965006&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[15]+1236535329&4294967295,r=i+(a<<22&4294967295|a>>>10),a=t+(i^s&(r^i))+n[1]+4129170786&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[6]+3225465664&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[11]+643717713&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[0]+3921069994&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[5]+3593408605&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[10]+38016083&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[15]+3634488961&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[4]+3889429448&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[9]+568446438&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[14]+3275163606&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[3]+4107603335&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[8]+1163531501&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[13]+2850285829&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[2]+4243563512&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[7]+1735328473&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[12]+2368359562&4294967295,a=t+((r=i+(a<<20&4294967295|a>>>12))^i^s)+n[5]+4294588738&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[8]+2272392833&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[11]+1839030562&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[14]+4259657740&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[1]+2763975236&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[4]+1272893353&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[7]+4139469664&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[10]+3200236656&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[13]+681279174&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[0]+3936430074&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[3]+3572445317&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[6]+76029189&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[9]+3654602809&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[12]+3873151461&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[15]+530742520&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[2]+3299628645&4294967295,r=i+(a<<23&4294967295|a>>>9),a=t+(i^(r|~s))+n[0]+4096336452&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[7]+1126891415&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[14]+2878612391&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[5]+4237533241&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[12]+1700485571&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[3]+2399980690&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[10]+4293915773&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[1]+2240044497&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[8]+1873313359&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[15]+4264355552&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[6]+2734768916&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[13]+1309151649&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[4]+4149444226&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[11]+3174756917&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[2]+718787259&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(a<<21&4294967295|a>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function r(e,t){this.h=t;let r=[],n=!0;for(let i=e.length-1;i>=0;i--){let s=0|e[i];n&&s==t||(r[i]=s,n=!1)}this.g=r}(function(e,t){function r(){}r.prototype=t.prototype,e.F=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.D=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}})(e,function(){this.blockSize=-1}),e.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.v=function(e,r){void 0===r&&(r=e.length);let n=r-this.blockSize,i=this.C,s=this.h,a=0;for(;a<r;){if(0==s)for(;a<=n;)t(this,e,a),a+=this.blockSize;if("string"==typeof e){for(;a<r;)if(i[s++]=e.charCodeAt(a++),s==this.blockSize){t(this,i),s=0;break}}else for(;a<r;)if(i[s++]=e[a++],s==this.blockSize){t(this,i),s=0;break}}this.h=s,this.o+=r},e.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var r=e.length-8;r<e.length;++r)e[r]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,r=0;r<4;++r)for(let n=0;n<32;n+=8)e[t++]=this.g[r]>>>n&255;return e};var s,a={};function o(e){return -128<=e&&e<128?Object.prototype.hasOwnProperty.call(a,e)?a[e]:a[e]=new r([0|e],e<0?-1:0):new r([0|e],e<0?-1:0)}function u(e){if(isNaN(e)||!isFinite(e))return h;if(e<0)return m(u(-e));let t=[],n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var h=o(0),c=o(1),d=o(16777216);function f(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function p(e){return -1==e.h}function m(e){let t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function g(e,t){return e.add(m(t))}function y(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function w(e,t){this.g=e,this.h=t}function v(e,t){if(f(t))throw Error("division by zero");if(f(e))return new w(h,h);if(p(e))return t=v(m(e),t),new w(m(t.g),m(t.h));if(p(t))return t=v(e,m(t)),new w(m(t.g),t.h);if(e.g.length>30){if(p(e)||p(t))throw Error("slowDivide_ only works with positive integers.");for(var r=c,n=t;0>=n.l(e);)r=_(r),n=_(n);var i=b(r,1),s=b(n,1);for(n=b(n,2),r=b(r,2);!f(n);){var a=s.add(n);0>=a.l(e)&&(i=i.add(r),s=a),n=b(n,1),r=b(r,1)}return t=g(e,i.j(t)),new w(i,t)}for(i=h;e.l(t)>=0;){for(n=(n=Math.ceil(Math.log(r=Math.max(1,Math.floor(e.m()/t.m())))/Math.LN2))<=48?1:Math.pow(2,n-48),a=(s=u(r)).j(t);p(a)||a.l(e)>0;)r-=n,a=(s=u(r)).j(t);f(s)&&(s=c),i=i.add(s),e=g(e,a)}return new w(i,e)}function _(e){let t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function b(e,t){let n=t>>5;t%=32;let i=e.g.length-n,s=[];for(let r=0;r<i;r++)s[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(s,e.h)}(s=r.prototype).m=function(){if(p(this))return-m(this).m();let e=0,t=1;for(let r=0;r<this.g.length;r++){let n=this.i(r);e+=(n>=0?n:4294967296+n)*t,t*=4294967296}return e},s.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(f(this))return"0";if(p(this))return"-"+m(this).toString(e);let t=u(Math.pow(e,6));var r=this;let n="";for(;;){let i=v(r,t).g,s=(((r=g(r,i.j(t))).g.length>0?r.g[0]:r.h)>>>0).toString(e);if(f(r=i))return s+n;for(;s.length<6;)s="0"+s;n=s+n}},s.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},s.l=function(e){return p(e=g(this,e))?-1:f(e)?0:1},s.abs=function(){return p(this)?m(this):this},s.add=function(e){let t=Math.max(this.g.length,e.g.length),n=[],i=0;for(let r=0;r<=t;r++){let t=i+(65535&this.i(r))+(65535&e.i(r)),s=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);i=s>>>16,t&=65535,s&=65535,n[r]=s<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},s.j=function(e){if(f(this)||f(e))return h;if(p(this))return p(e)?m(this).j(m(e)):m(m(this).j(e));if(p(e))return m(this.j(m(e)));if(0>this.l(d)&&0>e.l(d))return u(this.m()*e.m());let t=this.g.length+e.g.length,n=[];for(var i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(let t=0;t<e.g.length;t++){let r=this.i(i)>>>16,s=65535&this.i(i),a=e.i(t)>>>16,o=65535&e.i(t);n[2*i+2*t]+=s*o,y(n,2*i+2*t),n[2*i+2*t+1]+=r*o,y(n,2*i+2*t+1),n[2*i+2*t+1]+=s*a,y(n,2*i+2*t+1),n[2*i+2*t+2]+=r*a,y(n,2*i+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},s.B=function(e){return v(this,e).h},s.and=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},s.or=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},s.xor=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},e.prototype.digest=e.prototype.A,e.prototype.reset=e.prototype.u,e.prototype.update=e.prototype.v,i=l.Md5=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=u,r.fromString=function e(t,r){if(0==t.length)throw Error("number format error: empty string");if((r=r||10)<2||36<r)throw Error("radix out of range: "+r);if("-"==t.charAt(0))return m(e(t.substring(1),r));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');let n=u(Math.pow(r,8)),i=h;for(let e=0;e<t.length;e+=8){var s=Math.min(8,t.length-e);let a=parseInt(t.substring(e,e+s),r);s<8?(s=u(Math.pow(r,s)),i=i.j(s).add(u(a))):i=(i=i.j(n)).add(u(a))}return i},n=l.Integer=r}).apply(void 0!==o?o:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],frjas:[function(e,t,r){var n,i,s,a,o,l,Event,u,h,c=e("@parcel/transformer-js/src/esmodule-helpers.js");c.defineInteropFlag(r),c.export(r,"ErrorCode",()=>o),c.export(r,"Event",()=>Event),c.export(r,"EventType",()=>a),c.export(r,"FetchXmlHttpFactory",()=>i),c.export(r,"Stat",()=>l),c.export(r,"WebChannel",()=>s),c.export(r,"XhrIo",()=>n),c.export(r,"createWebChannelTransport",()=>h),c.export(r,"default",()=>p),c.export(r,"getStatEventTarget",()=>u);var d=arguments[3],f="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==d?d:"undefined"!=typeof self?self:{},p={};(function(){var e,t,r=Object.defineProperty,c=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof f&&f];for(var t=0;t<e.length;++t){var r=e[t];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);function d(e,t){if(t)e:{var n=c;e=e.split(".");for(var i=0;i<e.length-1;i++){var s=e[i];if(!(s in n))break e;n=n[s]}(t=t(i=n[e=e[e.length-1]]))!=i&&null!=t&&r(n,e,{configurable:!0,writable:!0,value:t})}}d("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),d("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),d("Object.entries",function(e){return e||function(e){var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push([t,e[t]]);return r}});var m=m||{},g=this||self;function y(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function w(e,t,r){return e.call.apply(e.bind,arguments)}function v(e,t,r){return(v=w).apply(null,arguments)}function _(e,t){var r=Array.prototype.slice.call(arguments,1);return function(){var t=r.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function b(e,t){function r(){}r.prototype=t.prototype,e.Z=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.Ob=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}var I="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function E(e){let t=e.length;if(t>0){let r=Array(t);for(let n=0;n<t;n++)r[n]=e[n];return r}return[]}function T(e,t){for(let t=1;t<arguments.length;t++){let n=arguments[t];var r=typeof n;if("array"==(r="object"!=r?r:n?Array.isArray(n)?"array":r:"null")||"object"==r&&"number"==typeof n.length){r=e.length||0;let t=n.length||0;e.length=r+t;for(let i=0;i<t;i++)e[r+i]=n[i]}else e.push(n)}}var S=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new A,e=>e.reset());class A{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let x,C=!1,k=new class{constructor(){this.h=this.g=null}add(e,t){let r=S.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}},N=()=>{let e=Promise.resolve(void 0);x=()=>{e.then(R)}};function R(){let e;for(var t;e=null,k.g&&(e=k.g,k.g=k.g.next,k.g||(k.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){g.setTimeout(()=>{throw e},0)}(e)}S.j(t),S.h<100&&(S.h++,t.next=S.g,S.g=t)}C=!1}function D(){this.u=this.u,this.C=this.C}function O(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}D.prototype.u=!1,D.prototype.dispose=function(){this.u||(this.u=!0,this.N())},D.prototype[Symbol.dispose]=function(){this.dispose()},D.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},O.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!g.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};g.addEventListener("test",e,t),g.removeEventListener("test",e,t)}catch(e){}return e}();function L(e){return/^[\s\xa0]*$/.test(e)}function M(e,t){O.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}b(M,O),M.prototype.init=function(e,t){let r=this.type=e.type,n=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==r?t=e.fromElement:"mouseout"==r&&(t=e.toElement)),this.relatedTarget=t,n?(this.clientX=void 0!==n.clientX?n.clientX:n.pageX,this.clientY=void 0!==n.clientY?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&M.Z.h.call(this)},M.prototype.h=function(){M.Z.h.call(this);let e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var F="closure_listenable_"+(1e6*Math.random()|0),U=0;function V(e,t,r,n,i){this.listener=e,this.proxy=null,this.src=t,this.type=r,this.capture=!!n,this.ha=i,this.key=++U,this.da=this.fa=!1}function B(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function j(e,t,r){for(let n in e)t.call(r,e[n],n,e)}function q(e){let t={};for(let r in e)t[r]=e[r];return t}let z="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function G(e,t){let r,n;for(let t=1;t<arguments.length;t++){for(r in n=arguments[t])e[r]=n[r];for(let t=0;t<z.length;t++)r=z[t],Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}}function $(e){this.src=e,this.g={},this.h=0}function K(e,t){let r=t.type;if(r in e.g){var n,i=e.g[r],s=Array.prototype.indexOf.call(i,t,void 0);(n=s>=0)&&Array.prototype.splice.call(i,s,1),n&&(B(t),0==e.g[r].length&&(delete e.g[r],e.h--))}}function H(e,t,r,n){for(let i=0;i<e.length;++i){let s=e[i];if(!s.da&&s.listener==t&&!!r==s.capture&&s.ha==n)return i}return -1}$.prototype.add=function(e,t,r,n,i){let s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);let a=H(e,t,n,i);return a>-1?(t=e[a],r||(t.fa=!1)):((t=new V(t,this.src,s,!!n,i)).fa=r,e.push(t)),t};var W="closure_lm_"+(1e6*Math.random()|0),Q={};function J(e,t,r,n,i,s){if(!t)throw Error("Invalid event type");let a=y(i)?!!i.capture:!!i,o=ee(e);if(o||(e[W]=o=new $(e)),(r=o.add(t,r,n,a,s)).proxy)return r;if(n=function e(t){return Z.call(e.src,e.listener,t)},r.proxy=n,n.src=e,n.listener=r,e.addEventListener)P||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),n,i);else if(e.attachEvent)e.attachEvent(X(t.toString()),n);else if(e.addListener&&e.removeListener)e.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return r}function Y(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[F])K(t.i,e);else{var r=e.type,n=e.proxy;t.removeEventListener?t.removeEventListener(r,n,e.capture):t.detachEvent?t.detachEvent(X(r),n):t.addListener&&t.removeListener&&t.removeListener(n),(r=ee(t))?(K(r,e),0==r.h&&(r.src=null,t[W]=null)):B(e)}}}function X(e){return e in Q?Q[e]:Q[e]="on"+e}function Z(e,t){if(e.da)e=!0;else{t=new M(t,this);let r=e.listener,n=e.ha||e.src;e.fa&&Y(e),e=r.call(n,t)}return e}function ee(e){return(e=e[W])instanceof $?e:null}var et="__closure_events_fn_"+(1e9*Math.random()>>>0);function er(e){return"function"==typeof e?e:(e[et]||(e[et]=function(t){return e.handleEvent(t)}),e[et])}function en(){D.call(this),this.i=new $(this),this.M=this,this.G=null}function ei(e,t){let r,n;var i,s=e.G;if(s)for(i=[];s;s=s.G)i.push(s);if(e=e.M,s=t.type||t,"string"==typeof t)t=new O(t,e);else if(t instanceof O)t.target=t.target||e;else{var a=t;G(t=new O(s,e),a)}if(a=!0,i)for(n=i.length-1;n>=0;n--)a=es(r=t.g=i[n],s,!0,t)&&a;if(a=es(r=t.g=e,s,!0,t)&&a,a=es(r,s,!1,t)&&a,i)for(n=0;n<i.length;n++)a=es(r=t.g=i[n],s,!1,t)&&a}function es(e,t,r,n){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let i=!0;for(let s=0;s<t.length;++s){let a=t[s];if(a&&!a.da&&a.capture==r){let t=a.listener,r=a.ha||a.src;a.fa&&K(e.i,a),i=!1!==t.call(r,n)&&i}}return i&&!n.defaultPrevented}b(en,D),en.prototype[F]=!0,en.prototype.removeEventListener=function(e,t,r,n){!function e(t,r,n,i,s){if(Array.isArray(r))for(var a=0;a<r.length;a++)e(t,r[a],n,i,s);else(i=y(i)?!!i.capture:!!i,n=er(n),t&&t[F])?(t=t.i,(a=String(r).toString())in t.g&&(n=H(r=t.g[a],n,i,s))>-1&&(B(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete t.g[a],t.h--))):t&&(t=ee(t))&&(r=t.g[r.toString()],t=-1,r&&(t=H(r,n,i,s)),(n=t>-1?r[t]:null)&&Y(n))}(this,e,t,r,n)},en.prototype.N=function(){if(en.Z.N.call(this),this.i){var e=this.i;for(let t in e.g){let r=e.g[t];for(let e=0;e<r.length;e++)B(r[e]);delete e.g[t],e.h--}}this.G=null},en.prototype.J=function(e,t,r,n){return this.i.add(String(e),t,!1,r,n)},en.prototype.K=function(e,t,r,n){return this.i.add(String(e),t,!0,r,n)};class ea extends D{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=function(e,t){if("function"!=typeof e){if(e&&"function"==typeof e.handleEvent)e=v(e.handleEvent,e);else throw Error("Invalid listener argument")}return Number(t)>2147483647?-1:g.setTimeout(e,t||0)}(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.l);let r=t.h;t.h=null,t.m.apply(null,r)}(this)}N(){super.N(),this.g&&(g.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eo(e){D.call(this),this.h=e,this.g={}}b(eo,D);var el=[];function eu(e){j(e.g,function(e,t){this.g.hasOwnProperty(t)&&Y(e)},e),e.g={}}eo.prototype.N=function(){eo.Z.N.call(this),eu(this)},eo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var eh=g.JSON.stringify,ec=g.JSON.parse,ed=class{stringify(e){return g.JSON.stringify(e,void 0)}parse(e){return g.JSON.parse(e,void 0)}};function ef(){}function ep(){}var em={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function eg(){O.call(this,"d")}function ey(){O.call(this,"c")}b(eg,O),b(ey,O);var ew={},ev=null;function e_(){return ev=ev||new en}function eb(e){O.call(this,ew.Ia,e)}function eI(e){let t=e_();ei(t,new eb(t))}function eE(e,t){O.call(this,ew.STAT_EVENT,e),this.stat=t}function eT(e){let t=e_();ei(t,new eE(t,e))}function eS(e,t){O.call(this,ew.Ja,e),this.size=t}function eA(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return g.setTimeout(function(){e()},t)}function ex(){this.g=!0}function eC(e,t,r,n){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{let s=JSON.parse(t);if(s){for(e=0;e<s.length;e++)if(Array.isArray(s[e])){var r=s[e];if(!(r.length<2)){var n=r[1];if(Array.isArray(n)&&!(n.length<1)){var i=n[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<n.length;e++)n[e]=""}}}}return eh(s)}catch(e){return t}}(e,r)+(n?" "+n:"")})}ew.Ia="serverreachability",b(eb,O),ew.STAT_EVENT="statevent",b(eE,O),ew.Ja="timingevent",b(eS,O),ex.prototype.ua=function(){this.g=!1},ex.prototype.info=function(){};var ek={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},eN={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function eR(){}function eD(e){return encodeURIComponent(String(e))}function eO(e,t,r,n){this.j=e,this.i=t,this.l=r,this.S=n||1,this.V=new eo(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new eP}function eP(){this.i=null,this.g="",this.h=!1}b(eR,ef),eR.prototype.g=function(){return new XMLHttpRequest},e=new eR;var eL={},eM={};function eF(e,t,r){e.M=1,e.A=e3(e2(t)),e.u=r,e.R=!0,eU(e,null)}function eU(e,t){e.F=Date.now(),eB(e),e.B=e2(e.A);var r=e.B,n=e.S;Array.isArray(n)||(n=[String(n)]),tc(r.i,"t",n),e.C=0,r=e.j.L,e.h=new eP,e.g=tY(e.j,r?t:null,!e.u),e.P>0&&(e.O=new ea(v(e.Y,e,e.g),e.P)),t=e.V,r=e.g,n=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(el[0]=i.toString()),i=el);for(let e=0;e<i.length;e++){let s=function e(t,r,n,i,s){if(i&&i.once)return function e(t,r,n,i,s){if(Array.isArray(r)){for(let a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=er(n),t&&t[F]?t.K(r,n,y(i)?!!i.capture:!!i,s):J(t,r,n,!0,i,s)}(t,r,n,i,s);if(Array.isArray(r)){for(let a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=er(n),t&&t[F]?t.J(r,n,y(i)?!!i.capture:!!i,s):J(t,r,n,!1,i,s)}(r,i[e],n||t.handleEvent,!1,t.h||t);if(!s)break;t.g[s.key]=s}t=e.J?q(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),eI(),function(e,t,r,n,i,s){e.info(function(){if(e.g){if(s){var a="",o=s.split("&");for(let e=0;e<o.length;e++){var l=o[e].split("=");if(l.length>1){let e=l[0];l=l[1];let t=e.split("_");a=t.length>=2&&"type"==t[1]?a+(e+"=")+l+"&":a+(e+"=redacted&")}}}else a=null}else a=s;return"XMLHTTP REQ ("+n+") [attempt "+i+"]: "+t+"\n"+r+"\n"+a})}(e.i,e.v,e.B,e.l,e.S,e.u)}function eV(e){return!!e.g&&"GET"==e.v&&2!=e.M&&e.j.Aa}function eB(e){e.T=Date.now()+e.H,ej(e,e.H)}function ej(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=eA(v(e.aa,e),t)}function eq(e){e.D&&(g.clearTimeout(e.D),e.D=null)}function ez(e){0==e.j.I||e.K||tK(e.j,e)}function eG(e){eq(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,eu(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function e$(e,t){try{var r=e.j;if(0!=r.I&&(r.g==e||eJ(r.h,e))){if(!e.L&&eJ(r.h,e)&&3==r.I){try{var n=r.Ba.g.parse(t)}catch(e){n=null}if(Array.isArray(n)&&3==n.length){var i=n;if(0==i[0]){e:if(!r.v){if(r.g){if(r.g.F+3e3<e.F)t$(r),tL(r);else break e}tq(r),eT(18)}}else r.xa=i[1],0<r.xa-r.K&&i[2]<37500&&r.F&&0==r.A&&!r.C&&(r.C=eA(v(r.Va,r),6e3));1>=eQ(r.h)&&r.ta&&(r.ta=void 0)}else tW(r,11)}else if((e.L||r.g==e)&&t$(r),!L(t))for(i=r.Ba.g.parse(t),t=0;t<i.length;t++){let o=i[t],l=o[0];if(!(l<=r.K)){if(r.K=l,o=o[1],2==r.I){if("c"==o[0]){r.M=o[1],r.ba=o[2];let t=o[3];null!=t&&(r.ka=t,r.j.info("VER="+r.ka));let i=o[4];null!=i&&(r.za=i,r.j.info("SVER="+r.za));let l=o[5];null!=l&&"number"==typeof l&&l>0&&(n=1.5*l,r.O=n,r.j.info("backChannelRequestTimeoutMs_="+n)),n=r;let u=e.g;if(u){let e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=n.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(eY(s,s.h),s.h=null))}if(n.G){let e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(n.wa=e,e9(n.J,n.G,e))}}if(r.I=3,r.l&&r.l.ra(),r.aa&&(r.T=Date.now()-e.F,r.j.info("Handshake RTT: "+r.T+"ms")),(n=r).na=tJ(n,n.L?n.ba:null,n.W),e.L){eX(n.h,e);var a=n.O;a&&(e.H=a),e.D&&(eq(e),eB(e)),n.g=e}else tj(n);r.i.length>0&&tF(r)}else"stop"!=o[0]&&"close"!=o[0]||tW(r,7)}else 3==r.I&&("stop"==o[0]||"close"==o[0]?"stop"==o[0]?tW(r,7):tP(r):"noop"!=o[0]&&r.l&&r.l.qa(o),r.A=0)}}}eI(4)}catch(e){}}eO.prototype.ba=function(e){e=e.target;let t=this.O;t&&3==tN(e)?t.j():this.Y(e)},eO.prototype.Y=function(e){try{if(e==this.g)e:{let o=tN(this.g),l=this.g.ya(),u=this.g.ca();if(!(o<3)&&(3!=o||this.g&&(this.h.h||this.g.la()||tR(this.g)))){this.K||4!=o||7==l||(8==l||u<=0?eI(3):eI(2)),eq(this);var t=this.g.ca();this.X=t;var r=function(e){if(!eV(e))return e.g.la();let t=tR(e.g);if(""===t)return"";let r="",n=t.length,i=4==tN(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return eG(e),ez(e),"";e.h.i=new g.TextDecoder}for(let s=0;s<n;s++)e.h.h=!0,r+=e.h.i.decode(t[s],{stream:!(i&&s==n-1)});return t.length=0,e.h.g+=r,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,r,n,i,s,a){e.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+i+"]: "+t+"\n"+r+"\n"+s+" "+a})}(this.i,this.v,this.B,this.l,this.S,o,t),this.o){if(this.U&&!this.L){t:{if(this.g){var n,i=this.g;if((n=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(n)){var s=n;break t}}s=null}if(e=s)eC(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,e$(this,e);else{this.o=!1,this.m=3,eT(12),eG(this),ez(this);break e}}if(this.R){let t;for(e=!0;!this.K&&this.C<r.length;)if((t=function(e,t){var r=e.C,n=t.indexOf("\n",r);return -1==n?eM:isNaN(r=Number(t.substring(r,n)))?eL:(n+=1)+r>t.length?eM:(t=t.slice(n,n+r),e.C=n+r,t)}(this,r))==eM){4==o&&(this.m=4,eT(14),e=!1),eC(this.i,this.l,null,"[Incomplete Response]");break}else if(t==eL){this.m=4,eT(15),eC(this.i,this.l,r,"[Invalid Chunk]"),e=!1;break}else eC(this.i,this.l,t,null),e$(this,t);if(eV(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=o||0!=r.length||this.h.h||(this.m=1,eT(16),e=!1),this.o=this.o&&e,e){if(r.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+r.length),tz(a),a.P=!0,eT(11))}}else eC(this.i,this.l,r,"[Invalid Chunked Response]"),eG(this),ez(this)}else eC(this.i,this.l,r,null),e$(this,r);4==o&&eG(this),this.o&&!this.K&&(4==o?tK(this.j,this):(this.o=!1,eB(this)))}else(function(e){let t={};e=(e.g&&tN(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let n=0;n<e.length;n++){if(L(e[n]))continue;var r=function(e){var t=1;e=e.split(":");let r=[];for(;t>0&&e.length;)r.push(e.shift()),t--;return e.length&&r.push(e.join(":")),r}(e[n]);let i=r[0];if("string"!=typeof(r=r[1]))continue;r=r.trim();let s=t[i]||[];t[i]=s,s.push(r)}!function(e,t){for(let r in e)t.call(void 0,e[r],r,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&r.indexOf("Unknown SID")>0?(this.m=3,eT(12)):(this.m=0,eT(13)),eG(this),ez(this)}}}catch(e){}finally{}},eO.prototype.cancel=function(){this.K=!0,eG(this)},eO.prototype.aa=function(){this.D=null;let e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(eI(),eT(17)),eG(this),this.m=2,ez(this)):ej(this,this.T-e)};var eK=class{constructor(e,t){this.g=e,this.map=t}};function eH(e){this.l=e||10,e=g.PerformanceNavigationTiming?(e=g.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(g.chrome&&g.chrome.loadTimes&&g.chrome.loadTimes()&&g.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function eW(e){return!!e.h||!!e.g&&e.g.size>=e.j}function eQ(e){return e.h?1:e.g?e.g.size:0}function eJ(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function eY(e,t){e.g?e.g.add(t):e.h=t}function eX(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function eZ(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let r of e.g.values())t=t.concat(r.G);return t}return E(e.i)}eH.prototype.cancel=function(){if(this.i=eZ(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var e0=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function e1(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof e1?(this.l=e.l,e4(this,e.j),this.o=e.o,this.g=e.g,e6(this,e.u),this.h=e.h,e5(this,td(e.i)),this.m=e.m):e&&(t=String(e).match(e0))?(this.l=!1,e4(this,t[1]||"",!0),this.o=e8(t[2]||""),this.g=e8(t[3]||"",!0),e6(this,t[4]),this.h=e8(t[5]||"",!0),e5(this,t[6]||"",!0),this.m=e8(t[7]||"")):(this.l=!1,this.i=new ta(null,this.l))}function e2(e){return new e1(e)}function e4(e,t,r){e.j=r?e8(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function e6(e,t){if(t){if(isNaN(t=Number(t))||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function e5(e,t,r){var n,i;t instanceof ta?(e.i=t,n=e.i,(i=e.l)&&!n.j&&(to(n),n.i=null,n.g.forEach(function(e,t){let r=t.toLowerCase();t!=r&&(tl(this,t),tc(this,r,e))},n)),n.j=i):(r||(t=e7(t,ti)),e.i=new ta(t,e.l))}function e9(e,t,r){e.i.set(t,r)}function e3(e){return e9(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function e8(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function e7(e,t,r){return"string"==typeof e?(e=encodeURI(e).replace(t,te),r&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function te(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}e1.prototype.toString=function(){let e=[];var t=this.j;t&&e.push(e7(t,tt,!0),":");var r=this.g;return(r||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(e7(t,tt,!0),"@"),e.push(eD(r).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(r=this.u)&&e.push(":",String(r))),(r=this.h)&&(this.g&&"/"!=r.charAt(0)&&e.push("/"),e.push(e7(r,"/"==r.charAt(0)?tn:tr,!0))),(r=this.i.toString())&&e.push("?",r),(r=this.m)&&e.push("#",e7(r,ts)),e.join("")},e1.prototype.resolve=function(e){let t=e2(this),r=!!e.j;r?e4(t,e.j):r=!!e.o,r?t.o=e.o:r=!!e.g,r?t.g=e.g:r=null!=e.u;var n=e.h;if(r)e6(t,e.u);else if(r=!!e.h){if("/"!=n.charAt(0)){if(this.g&&!this.h)n="/"+n;else{var i=t.h.lastIndexOf("/");-1!=i&&(n=t.h.slice(0,i+1)+n)}}if(".."==(i=n)||"."==i)n="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){n=0==i.lastIndexOf("/",0),i=i.split("/");let e=[];for(let t=0;t<i.length;){let r=i[t++];"."==r?n&&t==i.length&&e.push(""):".."==r?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),n&&t==i.length&&e.push("")):(e.push(r),n=!0)}n=e.join("/")}else n=i}return r?t.h=n:r=""!==e.i.toString(),r?e5(t,td(e.i)):r=!!e.m,r&&(t.m=e.m),t};var tt=/[#\/\?@]/g,tr=/[#\?:]/g,tn=/[#\?]/g,ti=/[#\?@]/g,ts=/#/g;function ta(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function to(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let r=0;r<e.length;r++){let n=e[r].indexOf("="),i,s=null;n>=0?(i=e[r].substring(0,n),s=e[r].substring(n+1)):i=e[r],t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(e.i,function(t,r){e.add(decodeURIComponent(t.replace(/\+/g," ")),r)}))}function tl(e,t){to(e),t=tf(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tu(e,t){return to(e),t=tf(e,t),e.g.has(t)}function th(e,t){to(e);let r=[];if("string"==typeof t)tu(e,t)&&(r=r.concat(e.g.get(tf(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)r=r.concat(e[t]);return r}function tc(e,t,r){tl(e,t),r.length>0&&(e.i=null,e.g.set(tf(e,t),E(r)),e.h+=r.length)}function td(e){let t=new ta;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function tf(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function tp(e,t,r,n,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),n(r)}catch(e){}}function tm(){this.g=new ed}function tg(e){this.i=e.Sb||null,this.h=e.ab||!1}function ty(e,t){en.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function tw(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function tv(e){e.readyState=4,e.l=null,e.j=null,e.B=null,t_(e)}function t_(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function tb(e){let t="";return j(e,function(e,r){t+=r+":"+e+"\r\n"}),t}function tI(e,t,r){e:{for(n in r){var n=!1;break e}n=!0}n||(r=tb(r),"string"==typeof e?null!=r&&eD(r):e9(e,t,r))}function tE(e){en.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(t=ta.prototype).add=function(e,t){to(this),this.i=null,e=tf(this,e);let r=this.g.get(e);return r||this.g.set(e,r=[]),r.push(t),this.h+=1,this},t.forEach=function(e,t){to(this),this.g.forEach(function(r,n){r.forEach(function(r){e.call(t,r,n,this)},this)},this)},t.set=function(e,t){return to(this),this.i=null,tu(this,e=tf(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},t.get=function(e,t){return e&&(e=th(this,e)).length>0?String(e[0]):t},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(let n=0;n<t.length;n++){var r=t[n];let i=eD(r);r=th(this,r);for(let t=0;t<r.length;t++){let n=i;""!==r[t]&&(n+="="+eD(r[t])),e.push(n)}}return this.i=e.join("&")},b(tg,ef),tg.prototype.g=function(){return new ty(this.i,this.h)},b(ty,en),(t=ty.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,t_(this)},t.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||g).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,tv(this)),this.readyState=0},t.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,t_(this)),this.g&&(this.readyState=3,t_(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==g.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;tw(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))}},t.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tv(this):t_(this),3==this.readyState&&tw(this)}},t.Oa=function(e){this.g&&(this.response=this.responseText=e,tv(this))},t.Na=function(e){this.g&&(this.response=e,tv(this))},t.ga=function(){this.g&&tv(this)},t.setRequestHeader=function(e,t){this.A.append(e,t)},t.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var r=t.next();!r.done;)e.push((r=r.value)[0]+": "+r[1]),r=t.next();return e.join("\r\n")},Object.defineProperty(ty.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),b(tE,en);var tT=/^https?$/i,tS=["POST","PUT"];function tA(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,tx(e),tk(e)}function tx(e){e.A||(e.A=!0,ei(e,"complete"),ei(e,"error"))}function tC(e){if(e.h&&void 0!==m){if(e.v&&4==tN(e))setTimeout(e.Ca.bind(e),0);else if(ei(e,"readystatechange"),4==tN(e)){e.h=!1;try{let s=e.ca();switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,r,n=!0;break;default:n=!1}if(!(t=n)){if(r=0===s){let t=String(e.D).match(e0)[1]||null;!t&&g.self&&g.self.location&&(t=g.self.location.protocol.slice(0,-1)),r=!tT.test(t?t.toLowerCase():"")}t=r}if(t)ei(e,"complete"),ei(e,"success");else{e.o=6;try{var i=tN(e)>2?e.g.statusText:""}catch(e){i=""}e.l=i+" ["+e.ca()+"]",tx(e)}}finally{tk(e)}}}}function tk(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);let r=e.g;e.g=null,t||ei(e,"ready");try{r.onreadystatechange=null}catch(e){}}}function tN(e){return e.g?e.g.readyState:0}function tR(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function tD(e,t,r){return r&&r.internalChannelParams&&r.internalChannelParams[e]||t}function tO(e){this.za=0,this.i=[],this.j=new ex,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=tD("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=tD("baseRetryDelayMs",5e3,e),this.Za=tD("retryDelaySeedMs",1e4,e),this.Ta=tD("forwardChannelMaxRetries",2,e),this.va=tD("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new eH(e&&e.concurrentRequestLimit),this.Ba=new tm,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function tP(e){if(tM(e),3==e.I){var t=e.V++,r=e2(e.J);if(e9(r,"SID",e.M),e9(r,"RID",t),e9(r,"TYPE","terminate"),tV(e,r),(t=new eO(e,e.j,t)).M=2,t.A=e3(e2(r)),r=!1,g.navigator&&g.navigator.sendBeacon)try{r=g.navigator.sendBeacon(t.A.toString(),"")}catch(e){}!r&&g.Image&&((new Image).src=t.A,r=!0),r||(t.g=tY(t.j,null),t.g.ea(t.A)),t.F=Date.now(),eB(t)}tQ(e)}function tL(e){e.g&&(tz(e),e.g.cancel(),e.g=null)}function tM(e){tL(e),e.v&&(g.clearTimeout(e.v),e.v=null),t$(e),e.h.cancel(),e.m&&("number"==typeof e.m&&g.clearTimeout(e.m),e.m=null)}function tF(e){if(!eW(e.h)&&!e.m){e.m=!0;var t=e.Ea;x||N(),C||(x(),C=!0),k.add(t,e),e.D=0}}function tU(e,t){var r;r=t?t.l:e.V++;let n=e2(e.J);e9(n,"SID",e.M),e9(n,"RID",r),e9(n,"AID",e.K),tV(e,n),e.u&&e.o&&tI(n,e.u,e.o),r=new eO(e,e.j,r,e.D+1),null===e.u&&(r.J=e.o),t&&(e.i=t.G.concat(e.i)),t=tB(e,r,1e3),r.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),eY(e.h,r),eF(r,n,t)}function tV(e,t){e.H&&j(e.H,function(e,r){e9(t,r,e)}),e.l&&j({},function(e,r){e9(t,r,e)})}function tB(e,t,r){r=Math.min(e.i.length,r);let n=e.l?v(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){let e=["count="+r];-1==t?r>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let l=0;l<r;l++){var s=i[l].g;let r=i[l].map;if((s-=t)<0)t=Math.max(0,i[l].g-100),o=!1;else try{s="req"+s+"_";try{var a=r instanceof Map?r:Object.entries(r);for(let[t,r]of a){let n=r;y(r)&&(n=eh(r)),e.push(s+t+"="+encodeURIComponent(n))}}catch(t){throw e.push(s+"type="+encodeURIComponent("_badmap")),t}}catch(e){n&&n(r)}}if(o){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,r),t.G=e,a}function tj(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;x||N(),C||(x(),C=!0),k.add(t,e),e.A=0}}function tq(e){return!e.g&&!e.v&&!(e.A>=3)&&(e.Y++,e.v=eA(v(e.Da,e),tH(e,e.A)),e.A++,!0)}function tz(e){null!=e.B&&(g.clearTimeout(e.B),e.B=null)}function tG(e){e.g=new eO(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=e2(e.na);e9(t,"RID","rpc"),e9(t,"SID",e.M),e9(t,"AID",e.K),e9(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&e9(t,"TO",e.ia),e9(t,"TYPE","xmlhttp"),tV(e,t),e.u&&e.o&&tI(t,e.u,e.o),e.O&&(e.g.H=e.O);var r=e.g;e=e.ba,r.M=1,r.A=e3(e2(t)),r.u=null,r.R=!0,eU(r,e)}function t$(e){null!=e.C&&(g.clearTimeout(e.C),e.C=null)}function tK(e,t){var r=null;if(e.g==t){t$(e),tz(e),e.g=null;var n=2}else{if(!eJ(e.h,t))return;r=t.G,eX(e.h,t),n=1}if(0!=e.I){if(t.o){if(1==n){r=t.u?t.u.length:0,t=Date.now()-t.F;var i,s=e.D;ei(n=e_(),new eS(n,r)),tF(e)}else tj(e)}else if(3==(s=t.m)||0==s&&t.X>0||!(1==n&&(i=t,!(eQ(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=i.G.concat(e.i),!0):1!=e.I&&2!=e.I&&!(e.D>=(e.Sa?0:e.Ta))&&(e.m=eA(v(e.Ea,e,i),tH(e,e.D)),e.D++,!0)))||2==n&&tq(e)))switch(r&&r.length>0&&((t=e.h).i=t.i.concat(r)),s){case 1:tW(e,5);break;case 4:tW(e,10);break;case 3:tW(e,6);break;default:tW(e,2)}}}function tH(e,t){let r=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(r*=2),r*t}function tW(e,t){if(e.j.info("Error code "+t),2==t){var r=v(e.bb,e),n=e.Ua;let t=!n;n=new e1(n||"//www.google.com/images/cleardot.gif"),g.location&&"http"==g.location.protocol||e4(n,"https"),e3(n),t?function(e,t){let r=new ex;if(g.Image){let n=new Image;n.onload=_(tp,r,"TestLoadImage: loaded",!0,t,n),n.onerror=_(tp,r,"TestLoadImage: error",!1,t,n),n.onabort=_(tp,r,"TestLoadImage: abort",!1,t,n),n.ontimeout=_(tp,r,"TestLoadImage: timeout",!1,t,n),g.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=e}else t(!1)}(n.toString(),r):function(e,t){let r=new ex,n=new AbortController,i=setTimeout(()=>{n.abort(),tp(r,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?tp(r,"TestPingServer: ok",!0,t):tp(r,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),tp(r,"TestPingServer: error",!1,t)})}(n.toString(),r)}else eT(2);e.I=0,e.l&&e.l.pa(t),tQ(e),tM(e)}function tQ(e){if(e.I=0,e.ja=[],e.l){let t=eZ(e.h);(0!=t.length||0!=e.i.length)&&(T(e.ja,t),T(e.ja,e.i),e.h.i.length=0,E(e.i),e.i.length=0),e.l.oa()}}function tJ(e,t,r){var n=r instanceof e1?e2(r):new e1(r);if(""!=n.g)t&&(n.g=t+"."+n.g),e6(n,n.u);else{var i=g.location;n=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;let e=new e1(null);n&&e4(e,n),t&&(e.g=t),i&&e6(e,i),r&&(e.h=r),n=e}return r=e.G,t=e.wa,r&&t&&e9(n,r,t),e9(n,"VER",e.ka),tV(e,n),n}function tY(e,t,r){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tE(e.Aa&&!e.ma?new tg({ab:r}):e.ma)).Fa(e.L),t}function tX(){}function tZ(){}function t0(e,t){en.call(this),this.g=new tO(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!L(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!L(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new t4(this)}function t1(e){eg.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let r in t){e=r;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function t2(){ey.call(this),this.status=1}function t4(e){this.g=e}(t=tE.prototype).Fa=function(e){this.H=e},t.ea=function(t,r,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);r=r?r.toUpperCase():"GET",this.D=t,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():e.g(),this.g.onreadystatechange=I(v(this.Ca,this));try{this.B=!0,this.g.open(r,String(t),!0),this.B=!1}catch(e){tA(this,e);return}if(t=n||"",n=new Map(this.headers),i){if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else if("function"==typeof i.keys&&"function"==typeof i.get)for(let e of i.keys())n.set(e,i.get(e));else throw Error("Unknown input type for opt_headers: "+String(i))}for(let[e,a]of(i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=g.FormData&&t instanceof g.FormData,!(Array.prototype.indexOf.call(tS,r,void 0)>=0)||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(e,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(t),this.v=!1}catch(e){tA(this,e)}},t.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,ei(this,"complete"),ei(this,"abort"),tk(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tk(this,!0)),tE.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?tC(this):this.Xa())},t.Xa=function(){tC(this)},t.isActive=function(){return!!this.g},t.ca=function(){try{return tN(this)>2?this.g.status:-1}catch(e){return -1}},t.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},t.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ec(t)}},t.ya=function(){return this.o},t.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tO.prototype).ka=8,t.I=1,t.connect=function(e,t,r,n){eT(0),this.W=e,this.H=t||{},r&&void 0!==n&&(this.H.OSID=r,this.H.OAID=n),this.F=this.X,this.J=tJ(this,null,this.W),tF(this)},t.Ea=function(e){if(this.m){if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;let i=new eO(this,this.j,e),s=this.o;if(this.U&&(s?G(s=q(s),this.U):s=this.U),null!==this.u||this.R||(i.J=s,s=null),this.S)e:{for(var t=0,r=0;r<this.i.length;r++){t:{var n=this.i[r];if("__data__"in n.map&&"string"==typeof(n=n.map.__data__)){n=n.length;break t}n=void 0}if(void 0===n)break;if((t+=n)>4096){t=r;break e}if(4096===t||r===this.i.length-1){t=r+1;break e}}t=1e3}else t=1e3;t=tB(this,i,t),e9(r=e2(this.J),"RID",e),e9(r,"CVER",22),this.G&&e9(r,"X-HTTP-Session-Id",this.G),tV(this,r),s&&(this.R?t="headers="+eD(tb(s))+"&"+t:this.u&&tI(r,this.u,s)),eY(this.h,i),this.Ra&&e9(r,"TYPE","init"),this.S?(e9(r,"$req",t),e9(r,"SID","null"),i.U=!0,eF(i,r,null)):eF(i,r,t),this.I=2}}else 3==this.I&&(e?tU(this,e):0==this.i.length||eW(this.h)||tU(this))}},t.Da=function(){if(this.v=null,tG(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=eA(v(this.Wa,this),e)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,eT(10),tL(this),tG(this))},t.Va=function(){null!=this.C&&(this.C=null,tL(this),tq(this),eT(19))},t.bb=function(e){e?(this.j.info("Successfully pinged google.com"),eT(2)):(this.j.info("Failed to ping google.com"),eT(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=tX.prototype).ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){},tZ.prototype.g=function(e,t){return new t0(e,t)},b(t0,en),t0.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},t0.prototype.close=function(){tP(this.g)},t0.prototype.o=function(e){var t=this.g;if("string"==typeof e){var r={};r.__data__=e,e=r}else this.v&&((r={}).__data__=eh(e),e=r);t.i.push(new eK(t.Ya++,e)),3==t.I&&tF(t)},t0.prototype.N=function(){this.g.l=null,delete this.j,tP(this.g),delete this.g,t0.Z.N.call(this)},b(t1,eg),b(t2,ey),b(t4,tX),t4.prototype.ra=function(){ei(this.g,"a")},t4.prototype.qa=function(e){ei(this.g,new t1(e))},t4.prototype.pa=function(e){ei(this.g,new t2)},t4.prototype.oa=function(){ei(this.g,"b")},tZ.prototype.createWebChannel=tZ.prototype.g,t0.prototype.send=t0.prototype.o,t0.prototype.open=t0.prototype.m,t0.prototype.close=t0.prototype.close,h=p.createWebChannelTransport=function(){return new tZ},u=p.getStatEventTarget=function(){return e_()},Event=p.Event=ew,l=p.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ek.NO_ERROR=0,ek.TIMEOUT=8,ek.HTTP_ERROR=6,o=p.ErrorCode=ek,eN.COMPLETE="complete",a=p.EventType=eN,ep.EventType=em,em.OPEN="a",em.CLOSE="b",em.ERROR="c",em.MESSAGE="d",en.prototype.listen=en.prototype.J,s=p.WebChannel=ep,i=p.FetchXmlHttpFactory=tg,tE.prototype.listenOnce=tE.prototype.K,tE.prototype.getLastError=tE.prototype.Ha,tE.prototype.getLastErrorCode=tE.prototype.ya,tE.prototype.getStatus=tE.prototype.ca,tE.prototype.getResponseJson=tE.prototype.La,tE.prototype.getResponseText=tE.prototype.la,tE.prototype.send=tE.prototype.ea,tE.prototype.setWithCredentials=tE.prototype.Fa,n=p.XhrIo=tE}).apply(void 0!==f?f:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],kmmhB:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r);var i=e("@firebase/storage");n.exportAll(i,r)},{"@firebase/storage":"1FnSR","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"1FnSR":[function(e,t,r){var n,i,s,a,o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"StorageError",()=>f),o.export(r,"StorageErrorCode",()=>s),o.export(r,"StringFormat",()=>L),o.export(r,"_FbsBlob",()=>j),o.export(r,"_Location",()=>Location),o.export(r,"_TaskEvent",()=>eu),o.export(r,"_TaskState",()=>eh),o.export(r,"_UploadTask",()=>eb),o.export(r,"_dataFromString",()=>F),o.export(r,"_getChild",()=>ez),o.export(r,"_invalidArgument",()=>v),o.export(r,"_invalidRootOperation",()=>b),o.export(r,"connectStorageEmulator",()=>e$),o.export(r,"deleteObject",()=>ej),o.export(r,"getBlob",()=>eK),o.export(r,"getBytes",()=>eD),o.export(r,"getDownloadURL",()=>eB),o.export(r,"getMetadata",()=>eM),o.export(r,"getStorage",()=>eG),o.export(r,"getStream",()=>eH),o.export(r,"list",()=>eU),o.export(r,"listAll",()=>eV),o.export(r,"ref",()=>eq),o.export(r,"updateMetadata",()=>eF),o.export(r,"uploadBytes",()=>eO),o.export(r,"uploadBytesResumable",()=>eL),o.export(r,"uploadString",()=>eP);var l=e("@firebase/app"),u=e("@firebase/util"),h=e("@firebase/component");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let c="firebasestorage.googleapis.com",d="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f extends u.FirebaseError{constructor(e,t,r=0){super(p(e),`Firebase Storage: ${t} (${p(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,f.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return p(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function p(e){return"storage/"+e}function m(){return new f(s.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function g(){return new f(s.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function y(){return new f(s.CANCELED,"User canceled the upload/download.")}function w(){return new f(s.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function v(e){return new f(s.INVALID_ARGUMENT,e)}function _(){return new f(s.APP_DELETED,"The Firebase app was deleted.")}function b(e){return new f(s.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function I(e,t){return new f(s.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function E(e){throw new f(s.INTERNAL_ERROR,"Internal error: "+e)}(n=s||(s={})).UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Location{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Location.makeFromUrl(e,t)}catch(t){return new Location(e,"")}if(""===r.path)return r;throw new f(s.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let r=null,n="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+n+"(/(.*))?$","i");function a(e){e.path_=decodeURIComponent(e.path)}let o=t.replace(/[.]/g,"\\."),l=RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${n}/o(/([^?#]*).*)?$`,"i"),u=RegExp(`^https?://${t===c?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${n}/([^?#]*)`,"i"),h=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:l,indices:{bucket:1,path:3},postModify:a},{regex:u,indices:{bucket:1,path:2},postModify:a}];for(let t=0;t<h.length;t++){let n=h[t],i=n.regex.exec(e);if(i){let e=i[n.indices.bucket],t=i[n.indices.path];t||(t=""),r=new Location(e,t),n.postModify(r);break}}if(null==r)throw new f(s.INVALID_URL,"Invalid URL '"+e+"'.");return r}}class T{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function S(e){return"string"==typeof e||e instanceof String}function A(e){return x()&&e instanceof Blob}function x(){return"undefined"!=typeof Blob}function C(e,t,r,n){if(n<t)throw v(`Invalid value for '${e}'. Expected ${t} or greater.`);if(n>r)throw v(`Invalid value for '${e}'. Expected ${r} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e,t,r){let n=t;return null==r&&(n=`https://${t}`),`${r}://${n}/v0${e}`}function N(e){let t=encodeURIComponent,r="?";for(let n in e)if(e.hasOwnProperty(n)){let i=t(n)+"="+t(e[n]);r=r+i+"&"}return r.slice(0,-1)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e,t){let r=e>=500&&e<600,n=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return r||n||i}(i=a||(a={}))[i.NO_ERROR=0]="NO_ERROR",i[i.NETWORK_ERROR=1]="NETWORK_ERROR",i[i.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e,t,r,n,i,s,a,o,l,u,h,c=!0,d=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=a,this.errorCallback_=o,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let r=this.resolve_,n=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?r(e):r()}catch(e){n(e)}else if(null!==i){let e=m();e.serverResponse=i.getErrorText(),n(this.errorCallback_?this.errorCallback_(i,e):e)}else if(t.canceled){let e=this.appDelete_?_():y();n(e)}else{let e=g();n(e)}};this.canceled_?e(!1,new O(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){let n=1,i=null,s=null,a=!1,o=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(d,2===o)},t)}function c(){s&&clearTimeout(s)}function d(e,...t){let r;if(l){c();return}if(e){c(),u.call(null,e,...t);return}let i=2===o||a;if(i){c(),u.call(null,e,...t);return}n<64&&(n*=2),1===o?(o=2,r=0):r=(n+Math.random())*1e3,h(r)}let f=!1;function p(e){!f&&(f=!0,c(),l||(null!==i?(e||(o=2),clearTimeout(i),h(0)):e||(o=1)))}return h(0),s=setTimeout(()=>{a=!0,p(!0)},r),p}((e,t)=>{if(t){e(!1,new O(!1,null,!0));return}let r=this.connectionFactory_();this.pendingConnection_=r;let n=e=>{let t=e.loaded,r=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,r)};null!==this.progressCallback_&&r.addUploadProgressListener(n),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&r.removeUploadProgressListener(n),this.pendingConnection_=null;let t=r.getErrorCode()===a.NO_ERROR,i=r.getStatus();if(!t||R(i,this.additionalRetryCodes_)&&this.retry){let t=r.getErrorCode()===a.ABORT;e(!1,new O(!1,null,t));return}let s=-1!==this.successCodes_.indexOf(i);e(!0,new O(s,r))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class O{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function P(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let r=new t;for(let t=0;t<e.length;t++)r.append(e[t]);return r.getBlob()}if(x())return new Blob(e);throw new f(s.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let L={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class M{constructor(e,t){this.data=e,this.contentType=t||null}}function F(e,t){switch(e){case L.RAW:return new M(U(t));case L.BASE64:case L.BASE64URL:return new M(V(e,t));case L.DATA_URL:return new M(function(e){let t=new B(e);return t.base64?V(L.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw I(L.DATA_URL,"Malformed data URL.")}return U(t)}(t.rest)}(t),function(e){let t=new B(e);return t.contentType}(t))}throw m()}function U(e){let t=[];for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if((64512&n)==55296){let i=r<e.length-1&&(64512&e.charCodeAt(r+1))==56320;if(i){let i=n,s=e.charCodeAt(++r);n=65536|(1023&i)<<10|1023&s,t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)}else t.push(239,191,189)}else(64512&n)==56320?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function V(e,t){let r;switch(e){case L.BASE64:{let r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw I(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case L.BASE64URL:{let r=-1!==t.indexOf("+"),n=-1!==t.indexOf("/");if(r||n)throw I(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{r=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new f(s.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw I(e,"Invalid character found")}let n=new Uint8Array(r.length);for(let e=0;e<r.length;e++)n[e]=r.charCodeAt(e);return n}class B{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(null===t)throw I(L.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let r=t[1]||null;null!=r&&(this.base64=function(e,t){let r=e.length>=t.length;return!!r&&e.substring(e.length-t.length)===t}(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){let r=0,n="";A(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}size(){return this.size_}type(){return this.type_}slice(e,t){if(A(this.data_)){let r=this.data_,n=r.webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null;return null===n?null:new j(n)}{let r=new Uint8Array(this.data_.buffer,e,t-e);return new j(r,!0)}}static getBlob(...e){if(x()){let t=e.map(e=>e instanceof j?e.data_:e);return new j(P.apply(null,t))}{let t=e.map(e=>S(e)?F(L.RAW,e).data:e.data_),r=0;t.forEach(e=>{r+=e.byteLength});let n=new Uint8Array(r),i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)n[i++]=e[t]}),new j(n,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){var t;let r;try{r=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=r)||Array.isArray(t)?null:r}function z(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(e,t){return t}class ${constructor(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||G}}let K=null;function H(){if(K)return K;let e=[];e.push(new $("bucket")),e.push(new $("generation")),e.push(new $("metageneration")),e.push(new $("name","fullPath",!0));let t=new $("name");t.xform=function(e,t){return!S(t)||t.length<2?t:z(t)},e.push(t);let r=new $("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new $("timeCreated")),e.push(new $("updated")),e.push(new $("md5Hash",null,!0)),e.push(new $("cacheControl",null,!0)),e.push(new $("contentDisposition",null,!0)),e.push(new $("contentEncoding",null,!0)),e.push(new $("contentLanguage",null,!0)),e.push(new $("contentType",null,!0)),e.push(new $("metadata","customMetadata",!0)),K=e}function W(e,t,r){let n=q(t);return null===n?null:function(e,t,r){let n={};n.type="file";let i=r.length;for(let e=0;e<i;e++){let i=r[e];n[i.local]=i.xform(n,t[i.server])}return Object.defineProperty(n,"ref",{get:function(){let t=n.bucket,r=n.fullPath,i=new Location(t,r);return e._makeStorageReference(i)}}),n}(e,n,r)}function Q(e,t){let r={},n=t.length;for(let i=0;i<n;i++){let n=t[i];n.writable&&(r[n.server]=e[n.local])}return JSON.stringify(r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let J="prefixes",Y="items";class X{constructor(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e){if(!e)throw m()}function ee(e,t){return function(r,n){let i=W(e,n,t);return Z(null!==i),i}}function et(e){return function(t,r){var n,i;let a;return 401===t.getStatus()?a=t.getErrorText().includes("Firebase App Check token is invalid")?new f(s.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new f(s.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(n=e.bucket,a=new f(s.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,a=new f(s.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):a=r,a.status=t.getStatus(),a.serverResponse=r.serverResponse,a}}function er(e){let t=et(e);return function(r,n){let i=t(r,n);if(404===r.getStatus()){var a;a=e.path,i=new f(s.OBJECT_NOT_FOUND,"Object '"+a+"' does not exist.")}return i.serverResponse=n.serverResponse,i}}function en(e,t,r){let n=t.fullServerUrl(),i=k(n,e.host,e._protocol),s=e.maxOperationRetryTime,a=new X(i,"GET",ee(e,r),s);return a.errorHandler=er(t),a}function ei(e,t,r){let n=t.fullServerUrl(),i=k(n,e.host,e._protocol)+"?alt=media",s=e.maxOperationRetryTime,a=new X(i,"GET",(e,t)=>t,s);return a.errorHandler=er(t),void 0!==r&&(a.headers.Range=`bytes=0-${r}`,a.successCodes=[200,206]),a}function es(e,t,r){let n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),!n.contentType&&(n.contentType=t&&t.type()||"application/octet-stream"),n}function ea(e,t,r,n,i){let s=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},o=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+o;let l=es(t,n,i),u=Q(l,r),h="--"+o+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+u+"\r\n--"+o+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",c=j.getBlob(h,n,"\r\n--"+o+"--");if(null===c)throw w();let d={name:l.fullPath},f=k(s,e.host,e._protocol),p=e.maxUploadRetryTime,m=new X(f,"POST",ee(e,r),p);return m.urlParams=d,m.headers=a,m.body=c.uploadData(),m.errorHandler=et(t),m}class eo{constructor(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null}}function el(e,t){let r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){Z(!1)}return Z(!!r&&-1!==(t||["active"]).indexOf(r)),r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eu={STATE_CHANGED:"state_changed"},eh={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function ec(e){switch(e){case"running":case"pausing":case"canceling":return eh.RUNNING;case"paused":return eh.PAUSED;case"success":return eh.SUCCESS;case"canceled":return eh.CANCELED;default:return eh.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e,t,r){"function"==typeof e||null!=t||null!=r?(this.next=e,this.error=t??void 0,this.complete=r??void 0):(this.next=e.next,this.error=e.error,this.complete=e.complete)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}class ep{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=a.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=a.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=a.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,n,i){if(this.sent_)throw E("cannot .send() more than once");if((0,u.isCloudWorkstation)(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==i)for(let e in i)i.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,i[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw E("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw E("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw E("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw E("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class em extends ep{initXhr(){this.xhr_.responseType="text"}}function eg(){return new em}class ey extends ep{initXhr(){this.xhr_.responseType="arraybuffer"}}function ew(){return new ey}class ev extends ep{initXhr(){this.xhr_.responseType="blob"}}function e_(){return new ev}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=H(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(s.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let t=this.isExponentialBackoffExpired();if(R(e.status,[])){if(t)e=g();else{this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,this.completeTransitions_();return}}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(s.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){let e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{let r=function(e,t,r,n,i){let s=t.bucketOnlyServerUrl(),a=es(t,n,i),o={name:a.fullPath},l=k(s,e.host,e._protocol),u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},h=Q(a,r),c=e.maxUploadRetryTime,d=new X(l,"POST",function(e){let t;el(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){Z(!1)}return Z(S(t)),t},c);return d.urlParams=o,d.headers=u,d.body=h,d.errorHandler=et(t),d}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,eg,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((t,r)=>{let n=function(e,t,r,n){let i=e.maxUploadRetryTime,s=new X(r,"POST",function(e){let t=el(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){Z(!1)}r||Z(!1);let i=Number(r);return Z(!isNaN(i)),new eo(i,n.size(),"final"===t)},i);return s.headers={"X-Goog-Upload-Command":"query"},s.errorHandler=et(t),s}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(n,eg,t,r);this._request=i,i.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=262144*this._chunkMultiplier,t=new eo(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((n,i)=>{let a;try{a=function(e,t,r,n,i,a,o,l){let u=new eo(0,0);if(o?(u.current=o.current,u.total=o.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw new f(s.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");let h=u.total-u.current,c=h;i>0&&(c=Math.min(c,i));let d=u.current,p=d+c,m="";m=0===c?"finalize":h===c?"upload, finalize":"upload";let g={"X-Goog-Upload-Command":m,"X-Goog-Upload-Offset":`${u.current}`},y=n.slice(d,p);if(null===y)throw w();let v=t.maxUploadRetryTime,_=new X(r,"POST",function(e,r){let i;let s=el(e,["active","final"]),o=u.current+c,l=n.size();return i="final"===s?ee(t,a)(e,r):null,new eo(o,l,"final"===s,i)},v);return _.headers=g,_.body=y.uploadData(),_.progressCallback=l||null,_.errorHandler=et(e),_}(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){this._error=e,this._transition("error");return}let o=this._ref.storage._makeRequest(a,eg,n,i,!1);this._request=o,o.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){let e=262144*this._chunkMultiplier;2*e<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{let r=en(this._ref.storage,this._ref._location,this._mappings),n=this._ref.storage._makeRequest(r,eg,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{let r=ea(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,eg,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=y(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){let e=ec(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,n){let i=new ed(t||void 0,r||void 0,n||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();let e=this._observers.slice();e.forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(ec(this._state)){case eh.SUCCESS:ef(this._resolve.bind(null,this.snapshot))();break;case eh.CANCELED:case eh.ERROR:let t=this._reject;ef(t.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){let t=ec(this._state);switch(t){case eh.RUNNING:case eh.PAUSED:e.next&&ef(e.next.bind(e,this.snapshot))();break;case eh.SUCCESS:e.complete&&ef(e.complete.bind(e))();break;case eh.CANCELED:case eh.ERROR:default:e.error&&ef(e.error.bind(e,this._error))()}}resume(){let e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){let e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){let e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,t){this._service=e,t instanceof Location?this._location=t:this._location=Location.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new eI(e,t)}get root(){let e=new Location(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return z(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");if(-1===t)return"";let r=e.slice(0,t);return r}(this._location.path);if(null===e)return null;let t=new Location(this._location.bucket,e);return new eI(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw b(e)}}function eE(e,t,r){e._throwIfRoot("uploadBytes");let n=ea(e.storage,e._location,H(),new j(t,!0),r);return e.storage.makeRequestWithTokens(n,eg).then(t=>({metadata:t,ref:e}))}async function eT(e,t,r){let n=await eS(e,{pageToken:r});t.prefixes.push(...n.prefixes),t.items.push(...n.items),null!=n.nextPageToken&&await eT(e,t,n.nextPageToken)}function eS(e,t){null!=t&&"number"==typeof t.maxResults&&C("options.maxResults",1,1e3,t.maxResults);let r=t||{},n=function(e,t,r,n,i){var s;let a={};t.isRoot?a.prefix="":a.prefix=t.path+"/",r&&r.length>0&&(a.delimiter=r),n&&(a.pageToken=n),i&&(a.maxResults=i);let o=t.bucketOnlyServerUrl(),l=k(o,e.host,e._protocol),u=e.maxOperationRetryTime,h=new X(l,"GET",(s=t.bucket,function(t,r){let n=function(e,t,r){let n=q(r);return null===n?null:function(e,t,r){let n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r[J])for(let i of r[J]){let r=i.replace(/\/$/,""),s=e._makeStorageReference(new Location(t,r));n.prefixes.push(s)}if(r[Y])for(let i of r[Y]){let r=e._makeStorageReference(new Location(t,i.name));n.items.push(r)}return n}(e,t,n)}(e,s,r);return Z(null!==n),n}),u);return h.urlParams=a,h.errorHandler=et(t),h}(e.storage,e._location,"/",r.pageToken,r.maxResults);return e.storage.makeRequestWithTokens(n,eg)}function eA(e,t){let r=function(e,t){let r=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?r:e+"/"+r}(e._location.path,t),n=new Location(e._location.bucket,r);return new eI(e.storage,n)}function ex(e,t){let r=t?.[d];return null==r?null:Location.makeFromBucketSpec(r,e)}class eC{constructor(e,t,r,n,i,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=n,this._firebaseVersion=i,this._isUsingEmulator=s,this._bucket=null,this._host=c,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=n?this._bucket=Location.makeFromBucketSpec(n,this._host):this._bucket=ex(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=Location.makeFromBucketSpec(this._url,e):this._bucket=ex(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){C("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,l._isFirebaseServerApp)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=this._appCheckProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new eI(this,e)}_makeRequest(e,t,r,n,i=!0){if(this._deleted)return new T(_());{let s=function(e,t,r,n,i,s,a=!0,o=!1){let l=N(e.urlParams),u=e.url+l,h=Object.assign({},e.headers);return t&&(h["X-Firebase-GMPID"]=t),null!==r&&r.length>0&&(h.Authorization="Firebase "+r),h["X-Firebase-Storage-Version"]="webjs/"+(s??"AppManager"),null!==n&&(h["X-Firebase-AppCheck"]=n),new D(u,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a,o)}(e,this._appId,r,n,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[r,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,n).getPromise()}}let ek="@firebase/storage",eN="0.14.0",eR="storage";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eD(e,t){return function(e,t){e._throwIfRoot("getBytes");let r=ei(e.storage,e._location,t);return e.storage.makeRequestWithTokens(r,ew).then(e=>void 0!==t?e.slice(0,t):e)}(e=(0,u.getModularInstance)(e),t)}function eO(e,t,r){return eE(e=(0,u.getModularInstance)(e),t,r)}function eP(e,t,r,n){return function(e,t,r=L.RAW,n){e._throwIfRoot("uploadString");let i=F(r,t),s={...n};return null==s.contentType&&null!=i.contentType&&(s.contentType=i.contentType),eE(e,i.data,s)}(e=(0,u.getModularInstance)(e),t,r,n)}function eL(e,t,r){var n;return(n=e=(0,u.getModularInstance)(e))._throwIfRoot("uploadBytesResumable"),new eb(n,new j(t),r)}function eM(e){return function(e){e._throwIfRoot("getMetadata");let t=en(e.storage,e._location,H());return e.storage.makeRequestWithTokens(t,eg)}(e=(0,u.getModularInstance)(e))}function eF(e,t){return function(e,t){e._throwIfRoot("updateMetadata");let r=function(e,t,r,n){let i=t.fullServerUrl(),s=k(i,e.host,e._protocol),a=Q(r,n),o=e.maxOperationRetryTime,l=new X(s,"PATCH",ee(e,n),o);return l.headers={"Content-Type":"application/json; charset=utf-8"},l.body=a,l.errorHandler=er(t),l}(e.storage,e._location,t,H());return e.storage.makeRequestWithTokens(r,eg)}(e=(0,u.getModularInstance)(e),t)}function eU(e,t){return eS(e=(0,u.getModularInstance)(e),t)}function eV(e){return function(e){let t={prefixes:[],items:[]};return eT(e,t).then(()=>t)}(e=(0,u.getModularInstance)(e))}function eB(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,r){let n=t.fullServerUrl(),i=k(n,e.host,e._protocol),s=e.maxOperationRetryTime,a=new X(i,"GET",function(t,n){let i=W(e,n,r);return Z(null!==i),function(e,t,r,n){let i=q(t);if(null===i||!S(i.downloadTokens))return null;let s=i.downloadTokens;if(0===s.length)return null;let a=encodeURIComponent,o=s.split(","),l=o.map(t=>{let i=e.bucket,s=e.fullPath,o="/b/"+a(i)+"/o/"+a(s),l=k(o,r,n),u=N({alt:"media",token:t});return l+u});return l[0]}(i,n,e.host,e._protocol)},s);return a.errorHandler=er(t),a}(e.storage,e._location,H());return e.storage.makeRequestWithTokens(t,eg).then(e=>{if(null===e)throw new f(s.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,u.getModularInstance)(e))}function ej(e){return function(e){e._throwIfRoot("deleteObject");let t=function(e,t){let r=t.fullServerUrl(),n=k(r,e.host,e._protocol),i=e.maxOperationRetryTime,s=new X(n,"DELETE",function(e,t){},i);return s.successCodes=[200,204],s.errorHandler=er(t),s}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,eg)}(e=(0,u.getModularInstance)(e))}function eq(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,r){if(t instanceof eC){if(null==t._bucket)throw new f(s.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+d+"' property when initializing the app?");let n=new eI(t,t._bucket);return null!=r?e(n,r):n}return void 0!==r?eA(t,r):t}(e,t);if(e instanceof eC)return new eI(e,t);throw v("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,u.getModularInstance)(e),t)}function ez(e,t){return eA(e,t)}function eG(e=(0,l.getApp)(),t){e=(0,u.getModularInstance)(e);let r=(0,l._getProvider)(e,eR),n=r.getImmediate({identifier:t}),i=(0,u.getDefaultEmulatorHostnameAndPort)("storage");return i&&e$(n,...i),n}function e$(e,t,r,n={}){!function(e,t,r,n={}){e.host=`${t}:${r}`;let i=(0,u.isCloudWorkstation)(t);i&&((0,u.pingServer)(`https://${e.host}/b`),(0,u.updateEmulatorBanner)("Storage",!0)),e._isUsingEmulator=!0,e._protocol=i?"https":"http";let{mockUserToken:s}=n;s&&(e._overrideAuthToken="string"==typeof s?s:(0,u.createMockUserToken)(s,e.app.options.projectId))}(e,t,r,n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eK(e,t){return function(e,t){e._throwIfRoot("getBlob");let r=ei(e.storage,e._location,t);return e.storage.makeRequestWithTokens(r,e_).then(e=>void 0!==t?e.slice(0,t):e)}(e=(0,u.getModularInstance)(e),t)}function eH(e,t){throw Error("getStream() is only supported by NodeJS builds")}(0,l._registerComponent)(new(0,h.Component)(eR,function(e,{instanceIdentifier:t}){let r=e.getProvider("app").getImmediate(),n=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new eC(r,n,i,t,l.SDK_VERSION)},"PUBLIC").setMultipleInstances(!0)),(0,l.registerVersion)(ek,eN,""),(0,l.registerVersion)(ek,eN,"esm2020")},{"@firebase/app":"bfE4h","@firebase/util":"cFyzG","@firebase/component":"iJpFd","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"5hSnW":[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("@plasmohq/storage"),i=e("firebase/firestore"),s=e("../../utils/refreshAuthToken"),a=e("~firebase/firebaseClient");let o=async(e,t)=>{try{let{url:r}=e.body??{},{prompt:o,count:l=1,duration:u=8,size:h="720x1280",fps:c,max_duration:d,adConfig:f}=e.body??{};if(!r&&e.sender?.tab?.url&&(r=e.sender.tab.url),!r||!o||!l||!u||!h){t.send({ok:!1,error:"missing_required_fields"});return}let p=new n.Storage,m=await p.get("firebaseToken"),g=await p.get("firebaseUid"),y=await p.get("firebaseRefreshToken");if(!m||!g){t.send({ok:!1,error:"user_not_found"});return}if((0,s.isTokenExpired)(m)){if(y){console.log("Token expired, refreshing...");let e=await (0,s.refreshAuthToken)(y);if(e)m=e.id_token,await p.set("firebaseToken",e.id_token),await p.set("firebaseRefreshToken",e.refresh_token),console.log("Token refreshed successfully");else{console.error("Failed to refresh token"),t.send({ok:!1,error:"auth_expired_refresh_failed"});return}}else{console.error("Token expired and no refresh token found"),t.send({ok:!1,error:"auth_expired_no_refresh_token"});return}}let w=null;try{let e=await (0,i.getDoc)((0,i.doc)(a.db,"users",g));e.exists()&&(w={...e.data(),uid:g})}catch(e){console.error("Error fetching user data:",e)}let v={url:r,userId:g,prompt:o,count:l,duration:u,size:h,uploaded_by:w?.name||"[extension]",language:"english"};"number"==typeof c&&(v.fps=c),"number"==typeof d&&(v.max_duration=d),f&&(v.payload=f),console.log("Sending request to generate-from-tiktok API:"),console.log("- URL:",r),console.log("- Prompt:",o),console.log("- Count:",l,"Duration:",u,"Size:",h),console.log("- FPS:",c,"Max Duration:",d),f&&console.log("- Ad Config:",JSON.stringify(f,null,2));let _=await fetch("https://adloops.ai/api/ai-videos/generate-from-tiktok",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify(v)}),b=null;try{b=await _.json()}catch{let e=await _.text();t.send({ok:!1,error:`Invalid JSON response: ${e.substring(0,100)}`});return}if(!_.ok){t.send({ok:!1,error:b?.error||b?.message||`API error: ${_.status}`});return}t.send({ok:!0,data:b});return}catch(e){console.error(e),t.send({ok:!1,error:e.message})}};r.default=o},{"@plasmohq/storage":"luF8G","firebase/firestore":"73OW7","../../utils/refreshAuthToken":"9ZsDl","~firebase/firebaseClient":"3tHHI","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"4w7DT":[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);let n=async(e,t)=>{try{let{url:r}=e.body??{};if(!r||"string"!=typeof r){t.send({ok:!1,error:"missing_url"});return}let n=await fetch("http://49.13.217.93:9000",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer cobalt"},body:JSON.stringify({url:r})}),i=null;try{i=await n.json()}catch{let e=await n.text();t.send({ok:!1,error:`Invalid JSON response: ${e.substring(0,100)}`});return}if(!n.ok){t.send({ok:!1,error:i?.error||i?.message||`API error: ${n.status}`});return}let s="string"==typeof i?.url&&i.url.trim().length>0?i.url:null;try{let e=await chrome.downloads.download({url:s,saveAs:!1});t.send({ok:!0,status:n.status,url:s,downloadId:e})}catch(e){console.error(e)}}catch(e){console.error(e)}};r.default=n},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],"7CRnJ":[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("@plasmohq/storage");let i=async(e,t)=>{try{let e=new n.Storage;await e.set("firebaseToken",null),await e.set("firebaseUid",null),await e.set("firebaseRefreshToken",null),t.send({status:"success"})}catch(e){console.log("There was an error"),console.error(e),t.send({err:e})}};r.default=i},{"@plasmohq/storage":"luF8G","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],aP7rB:[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("@plasmohq/storage");let i=async(e,t)=>{try{let{token:r,uid:i,refreshToken:s}=e.body,a=new n.Storage;await a.set("firebaseToken",r),await a.set("firebaseUid",i),await a.set("firebaseRefreshToken",s),t.send({status:"success"})}catch(e){console.log("There was an error"),console.error(e),t.send({err:e})}};r.default=i},{"@plasmohq/storage":"luF8G","@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],iqY5N:[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r)},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}]},["kgW6q"],"kgW6q","parcelRequireea57"),globalThis.define=t;