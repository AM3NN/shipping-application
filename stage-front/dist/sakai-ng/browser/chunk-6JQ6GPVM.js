import{$ as Sn,$a as E,$b as wt,Ab as Et,Ac as pt,B as lo,Ba as bo,Bc as Mo,Ca as yo,Cb as wo,Cc as ko,Db as So,E as co,Ea as vo,Eb as q,Ec as v,Fb as Y,Fc as Ie,Gb as Z,Gc as Le,Ha as _o,Hb as lt,Hc as Ve,Ib as ct,Ic as Wt,J as uo,Jb as ut,Kb as In,Lb as Ao,Mb as de,Nb as H,Ob as me,P as ho,Pb as V,Qb as dt,Rb as ht,S as De,T as Ce,U as y,Ub as le,V as P,Vb as To,Wa as F,Wb as oe,X as M,Xa as Do,Xb as re,Ya as Ct,Yb as fi,Z as ie,Zb as Fo,_ as f,_a as Re,a as C,ac as St,b as Fe,bb as Gt,ca as po,cb as hi,d as En,da as fo,ea as ae,fa as _t,g as ui,ga as Dt,gc as L,ha as Ye,hb as U,hc as Io,ib as $,ic as Xe,j as ue,ja as _,jb as A,jc as xn,kb as Tn,la as zt,lb as w,ma as go,mb as Co,n as wn,nb as W,o as di,oa as mo,pa as ee,pb as pi,qa as An,rb as Eo,s as rt,sa as Ze,ta as Ee,ua as ge,ub as I,vb as D,vc as xo,wb as Fn,xb as we,y as ao,ya as st,yb as at,yc as gi,zb as J,zc as Oo}from"./chunk-ZTD7BR2X.js";function mi(e,i){i=encodeURIComponent(i);for(let t of e.split(";")){let n=t.indexOf("="),[o,r]=n==-1?[t,""]:[t.slice(0,n),t.slice(n+1)];if(o.trim()===i)return decodeURIComponent(r)}return null}var Ro="browser",Lo="server";function qt(e){return e===Ro}function bi(e){return e===Lo}var Kt=class{};var ce=new M("");var Tt=class{},Ft=class{},Ne=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(i){i?typeof i=="string"?this.lazyInit=()=>{this.headers=new Map,i.split(`
`).forEach(t=>{let n=t.indexOf(":");if(n>0){let o=t.slice(0,n),r=t.slice(n+1).trim();this.addHeaderEntry(o,r)}})}:typeof Headers<"u"&&i instanceof Headers?(this.headers=new Map,i.forEach((t,n)=>{this.addHeaderEntry(n,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(i).forEach(([t,n])=>{this.setHeaderEntries(t,n)})}:this.headers=new Map}has(i){return this.init(),this.headers.has(i.toLowerCase())}get(i){this.init();let t=this.headers.get(i.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(i){return this.init(),this.headers.get(i.toLowerCase())||null}append(i,t){return this.clone({name:i,value:t,op:"a"})}set(i,t){return this.clone({name:i,value:t,op:"s"})}delete(i,t){return this.clone({name:i,value:t,op:"d"})}maybeSetNormalizedName(i,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,i)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(i=>this.applyUpdate(i)),this.lazyUpdate=null))}copyFrom(i){i.init(),Array.from(i.headers.keys()).forEach(t=>{this.headers.set(t,i.headers.get(t)),this.normalizedNames.set(t,i.normalizedNames.get(t))})}clone(i){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([i]),t}applyUpdate(i){let t=i.name.toLowerCase();switch(i.op){case"a":case"s":let n=i.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(i.name,t);let o=(i.op==="a"?this.headers.get(t):void 0)||[];o.push(...n),this.headers.set(t,o);break;case"d":let r=i.value;if(!r)this.headers.delete(t),this.normalizedNames.delete(t);else{let s=this.headers.get(t);if(!s)return;s=s.filter(a=>r.indexOf(a)===-1),s.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,s)}break}}addHeaderEntry(i,t){let n=i.toLowerCase();this.maybeSetNormalizedName(i,n),this.headers.has(n)?this.headers.get(n).push(t):this.headers.set(n,[t])}setHeaderEntries(i,t){let n=(Array.isArray(t)?t:[t]).map(r=>r.toString()),o=i.toLowerCase();this.headers.set(o,n),this.maybeSetNormalizedName(i,o)}forEach(i){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>i(this.normalizedNames.get(t),this.headers.get(t)))}};var kn=class{encodeKey(i){return No(i)}encodeValue(i){return No(i)}decodeKey(i){return decodeURIComponent(i)}decodeValue(i){return decodeURIComponent(i)}};function ca(e,i){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(o=>{let r=o.indexOf("="),[s,a]=r==-1?[i.decodeKey(o),""]:[i.decodeKey(o.slice(0,r)),i.decodeValue(o.slice(r+1))],l=t.get(s)||[];l.push(a),t.set(s,l)}),t}var ua=/%(\d[a-f0-9])/gi,da={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function No(e){return encodeURIComponent(e).replace(ua,(i,t)=>da[t]??i)}function On(e){return`${e}`}var Ue=class e{map;encoder;updates=null;cloneFrom=null;constructor(i={}){if(this.encoder=i.encoder||new kn,i.fromString){if(i.fromObject)throw new De(2805,!1);this.map=ca(i.fromString,this.encoder)}else i.fromObject?(this.map=new Map,Object.keys(i.fromObject).forEach(t=>{let n=i.fromObject[t],o=Array.isArray(n)?n.map(On):[On(n)];this.map.set(t,o)})):this.map=null}has(i){return this.init(),this.map.has(i)}get(i){this.init();let t=this.map.get(i);return t?t[0]:null}getAll(i){return this.init(),this.map.get(i)||null}keys(){return this.init(),Array.from(this.map.keys())}append(i,t){return this.clone({param:i,value:t,op:"a"})}appendAll(i){let t=[];return Object.keys(i).forEach(n=>{let o=i[n];Array.isArray(o)?o.forEach(r=>{t.push({param:n,value:r,op:"a"})}):t.push({param:n,value:o,op:"a"})}),this.clone(t)}set(i,t){return this.clone({param:i,value:t,op:"s"})}delete(i,t){return this.clone({param:i,value:t,op:"d"})}toString(){return this.init(),this.keys().map(i=>{let t=this.encoder.encodeKey(i);return this.map.get(i).map(n=>t+"="+this.encoder.encodeValue(n)).join("&")}).filter(i=>i!=="").join("&")}clone(i){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(i),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(i=>this.map.set(i,this.cloneFrom.map.get(i))),this.updates.forEach(i=>{switch(i.op){case"a":case"s":let t=(i.op==="a"?this.map.get(i.param):void 0)||[];t.push(On(i.value)),this.map.set(i.param,t);break;case"d":if(i.value!==void 0){let n=this.map.get(i.param)||[],o=n.indexOf(On(i.value));o!==-1&&n.splice(o,1),n.length>0?this.map.set(i.param,n):this.map.delete(i.param)}else{this.map.delete(i.param);break}}}),this.cloneFrom=this.updates=null)}};var Rn=class{map=new Map;set(i,t){return this.map.set(i,t),this}get(i){return this.map.has(i)||this.map.set(i,i.defaultValue()),this.map.get(i)}delete(i){return this.map.delete(i),this}has(i){return this.map.has(i)}keys(){return this.map.keys()}};function ha(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Po(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function $o(e){return typeof Blob<"u"&&e instanceof Blob}function Vo(e){return typeof FormData<"u"&&e instanceof FormData}function pa(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var Yt="Content-Type",Ln="Accept",Ci="X-Request-URL",Uo="text/plain",jo="application/json",Ho=`${jo}, ${Uo}, */*`,At=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;responseType="json";method;params;urlWithParams;transferCache;constructor(i,t,n,o){this.url=t,this.method=i.toUpperCase();let r;if(ha(this.method)||o?(this.body=n!==void 0?n:null,r=o):r=n,r&&(this.reportProgress=!!r.reportProgress,this.withCredentials=!!r.withCredentials,r.responseType&&(this.responseType=r.responseType),r.headers&&(this.headers=r.headers),r.context&&(this.context=r.context),r.params&&(this.params=r.params),this.transferCache=r.transferCache),this.headers??=new Ne,this.context??=new Rn,!this.params)this.params=new Ue,this.urlWithParams=t;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=t;else{let a=t.indexOf("?"),l=a===-1?"?":a<t.length-1?"&":"";this.urlWithParams=t+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Po(this.body)||$o(this.body)||Vo(this.body)||pa(this.body)?this.body:this.body instanceof Ue?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Vo(this.body)?null:$o(this.body)?this.body.type||null:Po(this.body)?null:typeof this.body=="string"?Uo:this.body instanceof Ue?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?jo:null}clone(i={}){let t=i.method||this.method,n=i.url||this.url,o=i.responseType||this.responseType,r=i.transferCache??this.transferCache,s=i.body!==void 0?i.body:this.body,a=i.withCredentials??this.withCredentials,l=i.reportProgress??this.reportProgress,c=i.headers||this.headers,u=i.params||this.params,d=i.context??this.context;return i.setHeaders!==void 0&&(c=Object.keys(i.setHeaders).reduce((p,h)=>p.set(h,i.setHeaders[h]),c)),i.setParams&&(u=Object.keys(i.setParams).reduce((p,h)=>p.set(h,i.setParams[h]),u)),new e(t,n,s,{params:u,headers:c,context:d,reportProgress:l,responseType:o,withCredentials:a,transferCache:r})}},je=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(je||{}),It=class{headers;status;statusText;url;ok;type;constructor(i,t=200,n="OK"){this.headers=i.headers||new Ne,this.status=i.status!==void 0?i.status:t,this.statusText=i.statusText||n,this.url=i.url||null,this.ok=this.status>=200&&this.status<300}},Zt=class e extends It{constructor(i={}){super(i)}type=je.ResponseHeader;clone(i={}){return new e({headers:i.headers||this.headers,status:i.status!==void 0?i.status:this.status,statusText:i.statusText||this.statusText,url:i.url||this.url||void 0})}},xt=class e extends It{body;constructor(i={}){super(i),this.body=i.body!==void 0?i.body:null}type=je.Response;clone(i={}){return new e({body:i.body!==void 0?i.body:this.body,headers:i.headers||this.headers,status:i.status!==void 0?i.status:this.status,statusText:i.statusText||this.statusText,url:i.url||this.url||void 0})}},Be=class extends It{name="HttpErrorResponse";message;error;ok=!1;constructor(i){super(i,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${i.url||"(unknown url)"}`:this.message=`Http failure response for ${i.url||"(unknown url)"}: ${i.status} ${i.statusText}`,this.error=i.error||null}},zo=200,fa=204;function yi(e,i){return{body:i,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,transferCache:e.transferCache}}var Go=(()=>{class e{handler;constructor(t){this.handler=t}request(t,n,o={}){let r;if(t instanceof At)r=t;else{let l;o.headers instanceof Ne?l=o.headers:l=new Ne(o.headers);let c;o.params&&(o.params instanceof Ue?c=o.params:c=new Ue({fromObject:o.params})),r=new At(t,n,o.body!==void 0?o.body:null,{headers:l,context:o.context,params:c,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let s=di(r).pipe(co(l=>this.handler.handle(l)));if(t instanceof At||o.observe==="events")return s;let a=s.pipe(lo(l=>l instanceof xt));switch(o.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return a.pipe(rt(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new De(2806,!1);return l.body}));case"blob":return a.pipe(rt(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new De(2807,!1);return l.body}));case"text":return a.pipe(rt(l=>{if(l.body!==null&&typeof l.body!="string")throw new De(2808,!1);return l.body}));case"json":default:return a.pipe(rt(l=>l.body))}case"response":return a;default:throw new De(2809,!1)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:new Ue().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,o={}){return this.request("PATCH",t,yi(o,n))}post(t,n,o={}){return this.request("POST",t,yi(o,n))}put(t,n,o={}){return this.request("PUT",t,yi(o,n))}static \u0275fac=function(n){return new(n||e)(ie(Tt))};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})(),ga=/^\)\]\}',?\n/;function Bo(e){if(e.url)return e.url;let i=Ci.toLocaleLowerCase();return e.headers.get(i)}var Wo=new M(""),Mn=(()=>{class e{fetchImpl=f(vi,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=f(An);destroyRef=f(go);destroyed=!1;constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0})}handle(t){return new ui(n=>{let o=new AbortController;return this.doRequest(t,o.signal,n).then(_i,r=>n.error(new Be({error:r}))),()=>o.abort()})}doRequest(t,n,o){return En(this,null,function*(){let r=this.createRequestInit(t),s;try{let h=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,C({signal:n},r)));ma(h),o.next({type:je.Sent}),s=yield h}catch(h){o.error(new Be({error:h,status:h.status??0,statusText:h.statusText,url:t.urlWithParams,headers:h.headers}));return}let a=new Ne(s.headers),l=s.statusText,c=Bo(s)??t.urlWithParams,u=s.status,d=null;if(t.reportProgress&&o.next(new Zt({headers:a,status:u,statusText:l,url:c})),s.body){let h=s.headers.get("content-length"),m=[],g=s.body.getReader(),b=0,x,T,O=typeof Zone<"u"&&Zone.current,j=!1;if(yield this.ngZone.runOutsideAngular(()=>En(this,null,function*(){for(;;){if(this.destroyed){yield g.cancel(),j=!0;break}let{done:_e,value:Ke}=yield g.read();if(_e)break;if(m.push(Ke),b+=Ke.length,t.reportProgress){T=t.responseType==="text"?(T??"")+(x??=new TextDecoder).decode(Ke,{stream:!0}):void 0;let qe=()=>o.next({type:je.DownloadProgress,total:h?+h:void 0,loaded:b,partialText:T});O?O.run(qe):qe()}}})),j){o.complete();return}let Te=this.concatChunks(m,b);try{let _e=s.headers.get(Yt)??"";d=this.parseBody(t,Te,_e)}catch(_e){o.error(new Be({error:_e,headers:new Ne(s.headers),status:s.status,statusText:s.statusText,url:Bo(s)??t.urlWithParams}));return}}u===0&&(u=d?zo:0),u>=200&&u<300?(o.next(new xt({body:d,headers:a,status:u,statusText:l,url:c})),o.complete()):o.error(new Be({error:d,headers:a,status:u,statusText:l,url:c}))})}parseBody(t,n,o){switch(t.responseType){case"json":let r=new TextDecoder().decode(n).replace(ga,"");return r===""?null:JSON.parse(r);case"text":return new TextDecoder().decode(n);case"blob":return new Blob([n],{type:o});case"arraybuffer":return n.buffer}}createRequestInit(t){let n={},o=t.withCredentials?"include":void 0;if(t.headers.forEach((r,s)=>n[r]=s.join(",")),t.headers.has(Ln)||(n[Ln]=Ho),!t.headers.has(Yt)){let r=t.detectContentTypeHeader();r!==null&&(n[Yt]=r)}return{body:t.serializeBody(),method:t.method,headers:n,credentials:o}}concatChunks(t,n){let o=new Uint8Array(n),r=0;for(let s of t)o.set(s,r),r+=s.length;return o}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})(),vi=class{};function _i(){}function ma(e){e.then(_i,_i)}function ba(e,i){return i(e)}function ya(e,i,t){return(n,o)=>fo(t,()=>i(n,r=>e(r,o)))}var va=new M(""),Ko=new M(""),qo=new M(""),Yo=new M("",{providedIn:"root",factory:()=>!0});var Nn=(()=>{class e extends Tt{backend;injector;chain=null;pendingTasks=f(mo);contributeToStability=f(Yo);constructor(t,n){super(),this.backend=t,this.injector=n}handle(t){if(this.chain===null){let n=Array.from(new Set([...this.injector.get(Ko),...this.injector.get(qo,[])]));this.chain=n.reduceRight((o,r)=>ya(o,r,this.injector),ba)}if(this.contributeToStability){let n=this.pendingTasks.add();return this.chain(t,o=>this.backend.handle(o)).pipe(uo(()=>this.pendingTasks.remove(n)))}else return this.chain(t,n=>this.backend.handle(n))}static \u0275fac=function(n){return new(n||e)(ie(Ft),ie(po))};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var _a=/^\)\]\}',?\n/,Da=RegExp(`^${Ci}:`,"m");function Ca(e){return"responseURL"in e&&e.responseURL?e.responseURL:Da.test(e.getAllResponseHeaders())?e.getResponseHeader(Ci):null}var Di=(()=>{class e{xhrFactory;constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new De(-2800,!1);let n=this.xhrFactory;return(n.\u0275loadImpl?wn(n.\u0275loadImpl()):di(null)).pipe(ho(()=>new ui(r=>{let s=n.build();if(s.open(t.method,t.urlWithParams),t.withCredentials&&(s.withCredentials=!0),t.headers.forEach((g,b)=>s.setRequestHeader(g,b.join(","))),t.headers.has(Ln)||s.setRequestHeader(Ln,Ho),!t.headers.has(Yt)){let g=t.detectContentTypeHeader();g!==null&&s.setRequestHeader(Yt,g)}if(t.responseType){let g=t.responseType.toLowerCase();s.responseType=g!=="json"?g:"text"}let a=t.serializeBody(),l=null,c=()=>{if(l!==null)return l;let g=s.statusText||"OK",b=new Ne(s.getAllResponseHeaders()),x=Ca(s)||t.url;return l=new Zt({headers:b,status:s.status,statusText:g,url:x}),l},u=()=>{let{headers:g,status:b,statusText:x,url:T}=c(),O=null;b!==fa&&(O=typeof s.response>"u"?s.responseText:s.response),b===0&&(b=O?zo:0);let j=b>=200&&b<300;if(t.responseType==="json"&&typeof O=="string"){let Te=O;O=O.replace(_a,"");try{O=O!==""?JSON.parse(O):null}catch(_e){O=Te,j&&(j=!1,O={error:_e,text:O})}}j?(r.next(new xt({body:O,headers:g,status:b,statusText:x,url:T||void 0})),r.complete()):r.error(new Be({error:O,headers:g,status:b,statusText:x,url:T||void 0}))},d=g=>{let{url:b}=c(),x=new Be({error:g,status:s.status||0,statusText:s.statusText||"Unknown Error",url:b||void 0});r.error(x)},p=!1,h=g=>{p||(r.next(c()),p=!0);let b={type:je.DownloadProgress,loaded:g.loaded};g.lengthComputable&&(b.total=g.total),t.responseType==="text"&&s.responseText&&(b.partialText=s.responseText),r.next(b)},m=g=>{let b={type:je.UploadProgress,loaded:g.loaded};g.lengthComputable&&(b.total=g.total),r.next(b)};return s.addEventListener("load",u),s.addEventListener("error",d),s.addEventListener("timeout",d),s.addEventListener("abort",d),t.reportProgress&&(s.addEventListener("progress",h),a!==null&&s.upload&&s.upload.addEventListener("progress",m)),s.send(a),r.next({type:je.Sent}),()=>{s.removeEventListener("error",d),s.removeEventListener("abort",d),s.removeEventListener("load",u),s.removeEventListener("timeout",d),t.reportProgress&&(s.removeEventListener("progress",h),a!==null&&s.upload&&s.upload.removeEventListener("progress",m)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(n){return new(n||e)(ie(Kt))};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})(),Zo=new M(""),Ea="XSRF-TOKEN",wa=new M("",{providedIn:"root",factory:()=>Ea}),Sa="X-XSRF-TOKEN",Aa=new M("",{providedIn:"root",factory:()=>Sa}),Xt=class{},Ta=(()=>{class e{doc;cookieName;lastCookieString="";lastToken=null;parseCount=0;constructor(t,n){this.doc=t,this.cookieName=n}getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=mi(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(n){return new(n||e)(ie(ce),ie(wa))};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();function Fa(e,i){let t=e.url.toLowerCase();if(!f(Zo)||e.method==="GET"||e.method==="HEAD"||t.startsWith("http://")||t.startsWith("https://"))return i(e);let n=f(Xt).getToken(),o=f(Aa);return n!=null&&!e.headers.has(o)&&(e=e.clone({headers:e.headers.set(o,n)})),i(e)}var Ei=function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e}(Ei||{});function Ia(e,i){return{\u0275kind:e,\u0275providers:i}}function xa(...e){let i=[Go,Di,Nn,{provide:Tt,useExisting:Nn},{provide:Ft,useFactory:()=>f(Wo,{optional:!0})??f(Di)},{provide:Ko,useValue:Fa,multi:!0},{provide:Zo,useValue:!0},{provide:Xt,useClass:Ta}];for(let t of e)i.push(...t.\u0275providers);return Sn(i)}function Oa(){return Ia(Ei.Fetch,[Mn,{provide:Wo,useExisting:Mn},{provide:Ft,useExisting:Mn}])}function Qo(e,i){return e?e.classList?e.classList.contains(i):new RegExp("(^| )"+i+"( |$)","gi").test(e.className):!1}function Qe(e,i){if(e&&i){let t=n=>{Qo(e,n)||(e.classList?e.classList.add(n):e.className+=" "+n)};[i].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(t))}}function Ma(){return window.innerWidth-document.documentElement.offsetWidth}function Ot(e){for(let i of document?.styleSheets)try{for(let t of i?.cssRules)for(let n of t?.style)if(e.test(n))return{name:n,value:t.style.getPropertyValue(n).trim()}}catch{}return null}function Ld(e="p-overflow-hidden"){let i=Ot(/-scrollbar-width$/);i?.name&&document.body.style.setProperty(i.name,Ma()+"px"),Qe(document.body,e)}function ft(e,i){if(e&&i){let t=n=>{e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," ")};[i].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(t))}}function Nd(e="p-overflow-hidden"){let i=Ot(/-scrollbar-width$/);i?.name&&document.body.style.removeProperty(i.name),ft(document.body,e)}function Jo(e){let i={width:0,height:0};return e&&(e.style.visibility="hidden",e.style.display="block",i.width=e.offsetWidth,i.height=e.offsetHeight,e.style.display="none",e.style.visibility="visible"),i}function Ai(){let e=window,i=document,t=i.documentElement,n=i.getElementsByTagName("body")[0],o=e.innerWidth||t.clientWidth||n.clientWidth,r=e.innerHeight||t.clientHeight||n.clientHeight;return{width:o,height:r}}function ka(){let e=document.documentElement;return(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}function Ra(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}function Pd(e,i,t=!0){var n,o,r,s;if(e){let a=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:Jo(e),l=a.height,c=a.width,u=i.offsetHeight,d=i.offsetWidth,p=i.getBoundingClientRect(),h=Ra(),m=ka(),g=Ai(),b,x,T="top";p.top+u+l>g.height?(b=p.top+h-l,T="bottom",b<0&&(b=h)):b=u+p.top+h,p.left+c>g.width?x=Math.max(0,p.left+m+d-c):x=p.left+m,e.style.top=b+"px",e.style.left=x+"px",e.style.transformOrigin=T,t&&(e.style.marginTop=T==="bottom"?`calc(${(o=(n=Ot(/-anchor-gutter$/))==null?void 0:n.value)!=null?o:"2px"} * -1)`:(s=(r=Ot(/-anchor-gutter$/))==null?void 0:r.value)!=null?s:"")}}function er(e,i){e&&(typeof i=="string"?e.style.cssText=i:Object.entries(i||{}).forEach(([t,n])=>e.style[t]=n))}function Ti(e,i){if(e instanceof HTMLElement){let t=e.offsetWidth;if(i){let n=getComputedStyle(e);t+=parseFloat(n.marginLeft)+parseFloat(n.marginRight)}return t}return 0}function $d(e,i,t=!0){var n,o,r,s;if(e){let a=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:Jo(e),l=i.offsetHeight,c=i.getBoundingClientRect(),u=Ai(),d,p,h="top";c.top+l+a.height>u.height?(d=-1*a.height,h="bottom",c.top+d<0&&(d=-1*c.top)):d=l,a.width>u.width?p=c.left*-1:c.left+a.width>u.width?p=(c.left+a.width-u.width)*-1:p=0,e.style.top=d+"px",e.style.left=p+"px",e.style.transformOrigin=h,t&&(e.style.marginTop=h==="bottom"?`calc(${(o=(n=Ot(/-anchor-gutter$/))==null?void 0:n.value)!=null?o:"2px"} * -1)`:(s=(r=Ot(/-anchor-gutter$/))==null?void 0:r.value)!=null?s:"")}}function Mt(e){return typeof HTMLElement=="object"?e instanceof HTMLElement:e&&typeof e=="object"&&e!==null&&e.nodeType===1&&typeof e.nodeName=="string"}function Fi(e){let i=e;return e&&typeof e=="object"&&(e.hasOwnProperty("current")?i=e.current:e.hasOwnProperty("el")&&(e.el.hasOwnProperty("nativeElement")?i=e.el.nativeElement:i=e.el)),Mt(i)?i:void 0}function Vd(e,i){let t=Fi(e);if(t)t.appendChild(i);else throw new Error("Cannot append "+i+" to "+e)}var wi=void 0;function Bd(e){if(e){let i=getComputedStyle(e);return e.offsetHeight-e.clientHeight-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)}else{if(wi!=null)return wi;let i=document.createElement("div");er(i,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(i);let t=i.offsetHeight-i.clientHeight;return document.body.removeChild(i),wi=t,t}}var Si=void 0;function Xo(e){if(e){let i=getComputedStyle(e);return e.offsetWidth-e.clientWidth-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth)}else{if(Si!=null)return Si;let i=document.createElement("div");er(i,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(i);let t=i.offsetWidth-i.clientWidth;return document.body.removeChild(i),Si=t,t}}function Ud(){if(window.getSelection){let e=window.getSelection()||{};e.empty?e.empty():e.removeAllRanges&&e.rangeCount>0&&e.getRangeAt(0).getClientRects().length>0&&e.removeAllRanges()}}function Pn(e,i={}){if(Mt(e)){let t=(n,o)=>{var r,s;let a=(r=e?.$attrs)!=null&&r[n]?[(s=e?.$attrs)==null?void 0:s[n]]:[];return[o].flat().reduce((l,c)=>{if(c!=null){let u=typeof c;if(u==="string"||u==="number")l.push(c);else if(u==="object"){let d=Array.isArray(c)?t(n,c):Object.entries(c).map(([p,h])=>n==="style"&&(h||h===0)?`${p.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${h}`:h?p:void 0);l=d.length?l.concat(d.filter(p=>!!p)):l}}return l},a)};Object.entries(i).forEach(([n,o])=>{if(o!=null){let r=n.match(/^on(.+)/);r?e.addEventListener(r[1].toLowerCase(),o):n==="p-bind"||n==="pBind"?Pn(e,o):(o=n==="class"?[...new Set(t("class",o))].join(" ").trim():n==="style"?t("style",o).join(";").trim():o,(e.$attrs=e.$attrs||{})&&(e.$attrs[n]=o),e.setAttribute(n,o))}})}}function jd(e,i={},...t){if(e){let n=document.createElement(e);return Pn(n,i),n.append(...t),n}}function Hd(e,i){if(e){e.style.opacity="0";let t=+new Date,n="0",o=function(){n=`${+e.style.opacity+(new Date().getTime()-t)/i}`,e.style.opacity=n,t=+new Date,+n<1&&(window.requestAnimationFrame&&requestAnimationFrame(o)||setTimeout(o,16))};o()}}function La(e,i){return Mt(e)?Array.from(e.querySelectorAll(i)):[]}function kt(e,i){return Mt(e)?e.matches(i)?e:e.querySelector(i):null}function zd(e,i){e&&document.activeElement!==e&&e.focus(i)}function Gd(e,i){if(Mt(e)){let t=e.getAttribute(i);return isNaN(t)?t==="true"||t==="false"?t==="true":t:+t}}function tr(e,i=""){let t=La(e,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i}`),n=[];for(let o of t)getComputedStyle(o).display!="none"&&getComputedStyle(o).visibility!="hidden"&&n.push(o);return n}function Wd(e,i){let t=tr(e,i);return t.length>0?t[0]:null}function Ii(e){if(e){let i=e.offsetHeight,t=getComputedStyle(e);return i-=parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)+parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),i}return 0}function Na(e){if(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetHeight;return e.style.display="none",e.style.visibility="visible",i}return 0}function Pa(e){if(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetWidth;return e.style.display="none",e.style.visibility="visible",i}return 0}function nr(e){if(e){let i=e.parentNode;return i&&i instanceof ShadowRoot&&i.host&&(i=i.host),i}return null}function Kd(e){var i;if(e){let t=(i=nr(e))==null?void 0:i.childNodes,n=0;if(t)for(let o=0;o<t.length;o++){if(t[o]===e)return n;t[o].nodeType===1&&n++}}return-1}function qd(e,i){let t=tr(e,i);return t.length>0?t[t.length-1]:null}function xi(e){if(e){let i=e.getBoundingClientRect();return{top:i.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:i.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}return{top:"auto",left:"auto"}}function $n(e,i){if(e){let t=e.offsetHeight;if(i){let n=getComputedStyle(e);t+=parseFloat(n.marginTop)+parseFloat(n.marginBottom)}return t}return 0}function Yd(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function $a(e){return!!(e!==null&&typeof e<"u"&&e.nodeName&&nr(e))}function Zd(e,i){var t;if(e)switch(e){case"document":return document;case"window":return window;case"body":return document.body;case"@next":return i?.nextElementSibling;case"@prev":return i?.previousElementSibling;case"@parent":return i?.parentElement;case"@grandparent":return(t=i?.parentElement)==null?void 0:t.parentElement;default:if(typeof e=="string")return document.querySelector(e);let o=Fi((r=>!!(r&&r.constructor&&r.call&&r.apply))(e)?e():e);return o?.nodeType===9||$a(o)?o:void 0}}function Oi(e){if(e){let i=e.offsetWidth,t=getComputedStyle(e);return i-=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)+parseFloat(t.borderLeftWidth)+parseFloat(t.borderRightWidth),i}return 0}function Xd(){return/(android)/i.test(navigator.userAgent)}function Va(e){return!!(e&&e.offsetParent!=null)}function Qd(e){return!Va(e)}function Jd(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}function eh(e){return e?getComputedStyle(e).direction==="rtl":!1}function th(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function nh(e,i){var t,n;if(e){let o=e.parentElement,r=xi(o),s=Ai(),a=e.offsetParent?e.offsetWidth:Pa(e),l=e.offsetParent?e.offsetHeight:Na(e),c=Ti((t=o?.children)==null?void 0:t[0]),u=$n((n=o?.children)==null?void 0:n[0]),d="",p="";r.left+c+a>s.width-Xo()?r.left<a?i%2===1?d=r.left?"-"+r.left+"px":"100%":i%2===0&&(d=s.width-a-Xo()+"px"):d="-100%":d="100%",e.getBoundingClientRect().top+u+l>s.height?p=`-${l-u}px`:p="0px",e.style.top=p,e.style.left=d}}function ir(e){var i;e&&("remove"in Element.prototype?e.remove():(i=e.parentNode)==null||i.removeChild(e))}function ih(e,i){let t=Fi(e);if(t)t.removeChild(i);else throw new Error("Cannot remove "+i+" from "+e)}function oh(e,i){let t=getComputedStyle(e).getPropertyValue("borderTopWidth"),n=t?parseFloat(t):0,o=getComputedStyle(e).getPropertyValue("paddingTop"),r=o?parseFloat(o):0,s=e.getBoundingClientRect(),l=i.getBoundingClientRect().top+document.body.scrollTop-(s.top+document.body.scrollTop)-n-r,c=e.scrollTop,u=e.clientHeight,d=$n(i);l<0?e.scrollTop=c+l:l+d>u&&(e.scrollTop=c+l-u+d)}function or(e,i="",t){Mt(e)&&t!==null&&t!==void 0&&e.setAttribute(i,t)}function rr(){let e=new Map;return{on(i,t){let n=e.get(i);return n?n.push(t):n=[t],e.set(i,n),this},off(i,t){let n=e.get(i);return n&&n.splice(n.indexOf(t)>>>0,1),this},emit(i,t){let n=e.get(i);n&&n.slice().map(o=>{o(t)})},clear(){e.clear()}}}var Ba=Object.defineProperty,sr=Object.getOwnPropertySymbols,Ua=Object.prototype.hasOwnProperty,ja=Object.prototype.propertyIsEnumerable,ar=(e,i,t)=>i in e?Ba(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t,Ha=(e,i)=>{for(var t in i||(i={}))Ua.call(i,t)&&ar(e,t,i[t]);if(sr)for(var t of sr(i))ja.call(i,t)&&ar(e,t,i[t]);return e};function te(e){return e==null||e===""||Array.isArray(e)&&e.length===0||!(e instanceof Date)&&typeof e=="object"&&Object.keys(e).length===0}function Mi(e,i,t=new WeakSet){if(e===i)return!0;if(!e||!i||typeof e!="object"||typeof i!="object"||t.has(e)||t.has(i))return!1;t.add(e).add(i);let n=Array.isArray(e),o=Array.isArray(i),r,s,a;if(n&&o){if(s=e.length,s!=i.length)return!1;for(r=s;r--!==0;)if(!Mi(e[r],i[r],t))return!1;return!0}if(n!=o)return!1;let l=e instanceof Date,c=i instanceof Date;if(l!=c)return!1;if(l&&c)return e.getTime()==i.getTime();let u=e instanceof RegExp,d=i instanceof RegExp;if(u!=d)return!1;if(u&&d)return e.toString()==i.toString();let p=Object.keys(e);if(s=p.length,s!==Object.keys(i).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(i,p[r]))return!1;for(r=s;r--!==0;)if(a=p[r],!Mi(e[a],i[a],t))return!1;return!0}function za(e,i){return Mi(e,i)}function cr(e){return!!(e&&e.constructor&&e.call&&e.apply)}function k(e){return!te(e)}function Je(e,i){if(!e||!i)return null;try{let t=e[i];if(k(t))return t}catch{}if(Object.keys(e).length){if(cr(i))return i(e);if(i.indexOf(".")===-1)return e[i];{let t=i.split("."),n=e;for(let o=0,r=t.length;o<r;++o){if(n==null)return null;n=n[t[o]]}return n}}return null}function Pe(e,i,t){return t?Je(e,t)===Je(i,t):za(e,i)}function ur(e,i){if(e!=null&&i&&i.length){for(let t of i)if(Pe(e,t))return!0}return!1}function Ga(e,i){let t=-1;if(i){for(let n=0;n<i.length;n++)if(i[n]===e){t=n;break}}return t}function lh(e,i){let t;if(k(e))try{t=e.findLast(i)}catch{t=[...e].reverse().find(i)}return t}function ch(e,i){let t=-1;if(k(e))try{t=e.findLastIndex(i)}catch{t=e.lastIndexOf([...e].reverse().find(i))}return t}function xe(e,i=!0){return e instanceof Object&&e.constructor===Object&&(i||Object.keys(e).length!==0)}function Se(e,...i){return cr(e)?e(...i):e}function et(e,i=!0){return typeof e=="string"&&(i||e!=="")}function lr(e){return et(e)?e.replace(/(-|_)/g,"").toLowerCase():e}function Vn(e,i="",t={}){let n=lr(i).split("."),o=n.shift();return o?xe(e)?Vn(Se(e[Object.keys(e).find(r=>lr(r)===o)||""],t),n.join("."),t):void 0:Se(e,t)}function uh(e,i,t,n){if(t.length>0){let o=!1;for(let r=0;r<t.length;r++)if(Ga(t[r],n)>i){t.splice(r,0,e),o=!0;break}o||t.push(e)}else t.push(e)}function Bn(e,i=!0){return Array.isArray(e)&&(i||e.length!==0)}function dh(e){return e instanceof Date&&e.constructor===Date}function dr(e){return k(e)&&!isNaN(e)}function hh(e=""){return k(e)&&e.length===1&&!!e.match(/\S| /)}function be(e,i){if(i){let t=i.test(e);return i.lastIndex=0,t}return!1}function gt(...e){let i=(t={},n={})=>{let o=Ha({},t);return Object.keys(n).forEach(r=>{xe(n[r])&&r in t&&xe(t[r])?o[r]=i(t[r],n[r]):o[r]=n[r]}),o};return e.reduce((t,n,o)=>o===0?n:i(t,n),{})}function mt(e){return e&&e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}function ye(e){if(e&&/[\xC0-\xFF\u0100-\u017E]/.test(e)){let t={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let n in t)e=e.replace(t[n],n)}return e}function ph(e,i,t){e&&i!==t&&(t>=e.length&&(t%=e.length,i%=e.length),e.splice(t,0,e.splice(i,1)[0]))}function Un(e){return et(e)?e.replace(/(_)/g,"-").replace(/[A-Z]/g,(i,t)=>t===0?i:"-"+i.toLowerCase()).toLowerCase():e}function ki(e){return et(e)?e.replace(/[A-Z]/g,(i,t)=>t===0?i:"."+i.toLowerCase()).toLowerCase():e}var jn={};function Qt(e="pui_id_"){return jn.hasOwnProperty(e)||(jn[e]=0),jn[e]++,`${e}${jn[e]}`}function Wa(){let e=[],i=(s,a,l=999)=>{let c=o(s,a,l),u=c.value+(c.key===s?0:l)+1;return e.push({key:s,value:u}),u},t=s=>{e=e.filter(a=>a.value!==s)},n=(s,a)=>o(s,a).value,o=(s,a,l=0)=>[...e].reverse().find(c=>a?!0:c.key===s)||{key:s,value:l},r=s=>s&&parseInt(s.style.zIndex,10)||0;return{get:r,set:(s,a,l)=>{a&&(a.style.zIndex=String(i(s,!0,l)))},clear:s=>{s&&(t(r(s)),s.style.zIndex="")},getCurrent:s=>n(s,!0)}}var mh=Wa();var fr=null;function bt(){return fr}function Ka(e){fr??=e}var Ri=class{},Jt=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:()=>f(gr),providedIn:"platform"})}return e})(),qa=new M(""),gr=(()=>{class e extends Jt{_location;_history;_doc=f(ce);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return bt().getBaseHref(this._doc)}onPopState(t){let n=bt().getGlobalEventTarget(this._doc,"window");return n.addEventListener("popstate",t,!1),()=>n.removeEventListener("popstate",t)}onHashChange(t){let n=bt().getGlobalEventTarget(this._doc,"window");return n.addEventListener("hashchange",t,!1),()=>n.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,n,o){this._history.pushState(t,n,o)}replaceState(t,n,o){this._history.replaceState(t,n,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function Hn(e,i){return e?i?e.endsWith("/")?i.startsWith("/")?e+i.slice(1):e+i:i.startsWith("/")?e+i:`${e}/${i}`:e:i}function hr(e){let i=e.search(/#|\?|$/);return e[i-1]==="/"?e.slice(0,i-1)+e.slice(i):e}function Oe(e){return e&&e[0]!=="?"?`?${e}`:e}var Rt=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:()=>f(mr),providedIn:"root"})}return e})(),zn=new M(""),mr=(()=>{class e extends Rt{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,n){super(),this._platformLocation=t,this._baseHref=n??this._platformLocation.getBaseHrefFromDOM()??f(ce).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Hn(this._baseHref,t)}path(t=!1){let n=this._platformLocation.pathname+Oe(this._platformLocation.search),o=this._platformLocation.hash;return o&&t?`${n}${o}`:n}pushState(t,n,o,r){let s=this.prepareExternalUrl(o+Oe(r));this._platformLocation.pushState(t,n,s)}replaceState(t,n,o,r){let s=this.prepareExternalUrl(o+Oe(r));this._platformLocation.replaceState(t,n,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(n){return new(n||e)(ie(Jt),ie(zn,8))};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),br=(()=>{class e{_subject=new ue;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let n=this._locationStrategy.getBaseHref();this._basePath=Xa(hr(pr(n))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,n=""){return this.path()==this.normalize(t+Oe(n))}normalize(t){return e.stripTrailingSlash(Za(this._basePath,pr(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,n="",o=null){this._locationStrategy.pushState(o,"",t,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Oe(n)),o)}replaceState(t,n="",o=null){this._locationStrategy.replaceState(o,"",t,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Oe(n)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(n=>{this._notifyUrlChangeListeners(n.url,n.state)}),()=>{let n=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(n,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",n){this._urlChangeListeners.forEach(o=>o(t,n))}subscribe(t,n,o){return this._subject.subscribe({next:t,error:n??void 0,complete:o??void 0})}static normalizeQueryParams=Oe;static joinWithSlash=Hn;static stripTrailingSlash=hr;static \u0275fac=function(n){return new(n||e)(ie(Rt))};static \u0275prov=y({token:e,factory:()=>Ya(),providedIn:"root"})}return e})();function Ya(){return new br(ie(Rt))}function Za(e,i){if(!e||!i.startsWith(e))return i;let t=i.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:i}function pr(e){return e.replace(/\/index.html$/,"")}function Xa(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var Qa=(()=>{class e extends Rt{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,n){super(),this._platformLocation=t,n!=null&&(this._baseHref=n)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let n=this._platformLocation.hash??"#";return n.length>0?n.substring(1):n}prepareExternalUrl(t){let n=Hn(this._baseHref,t);return n.length>0?"#"+n:n}pushState(t,n,o,r){let s=this.prepareExternalUrl(o+Oe(r))||this._platformLocation.pathname;this._platformLocation.pushState(t,n,s)}replaceState(t,n,o,r){let s=this.prepareExternalUrl(o+Oe(r))||this._platformLocation.pathname;this._platformLocation.replaceState(t,n,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(n){return new(n||e)(ie(Jt),ie(zn,8))};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})(),wr={ADP:[void 0,void 0,0],AFN:[void 0,"\u060B",0],ALL:[void 0,void 0,0],AMD:[void 0,"\u058F",2],AOA:[void 0,"Kz"],ARS:[void 0,"$"],AUD:["A$","$"],AZN:[void 0,"\u20BC"],BAM:[void 0,"KM"],BBD:[void 0,"$"],BDT:[void 0,"\u09F3"],BHD:[void 0,void 0,3],BIF:[void 0,void 0,0],BMD:[void 0,"$"],BND:[void 0,"$"],BOB:[void 0,"Bs"],BRL:["R$"],BSD:[void 0,"$"],BWP:[void 0,"P"],BYN:[void 0,void 0,2],BYR:[void 0,void 0,0],BZD:[void 0,"$"],CAD:["CA$","$",2],CHF:[void 0,void 0,2],CLF:[void 0,void 0,4],CLP:[void 0,"$",0],CNY:["CN\xA5","\xA5"],COP:[void 0,"$",2],CRC:[void 0,"\u20A1",2],CUC:[void 0,"$"],CUP:[void 0,"$"],CZK:[void 0,"K\u010D",2],DJF:[void 0,void 0,0],DKK:[void 0,"kr",2],DOP:[void 0,"$"],EGP:[void 0,"E\xA3"],ESP:[void 0,"\u20A7",0],EUR:["\u20AC"],FJD:[void 0,"$"],FKP:[void 0,"\xA3"],GBP:["\xA3"],GEL:[void 0,"\u20BE"],GHS:[void 0,"GH\u20B5"],GIP:[void 0,"\xA3"],GNF:[void 0,"FG",0],GTQ:[void 0,"Q"],GYD:[void 0,"$",2],HKD:["HK$","$"],HNL:[void 0,"L"],HRK:[void 0,"kn"],HUF:[void 0,"Ft",2],IDR:[void 0,"Rp",2],ILS:["\u20AA"],INR:["\u20B9"],IQD:[void 0,void 0,0],IRR:[void 0,void 0,0],ISK:[void 0,"kr",0],ITL:[void 0,void 0,0],JMD:[void 0,"$"],JOD:[void 0,void 0,3],JPY:["\xA5",void 0,0],KHR:[void 0,"\u17DB"],KMF:[void 0,"CF",0],KPW:[void 0,"\u20A9",0],KRW:["\u20A9",void 0,0],KWD:[void 0,void 0,3],KYD:[void 0,"$"],KZT:[void 0,"\u20B8"],LAK:[void 0,"\u20AD",0],LBP:[void 0,"L\xA3",0],LKR:[void 0,"Rs"],LRD:[void 0,"$"],LTL:[void 0,"Lt"],LUF:[void 0,void 0,0],LVL:[void 0,"Ls"],LYD:[void 0,void 0,3],MGA:[void 0,"Ar",0],MGF:[void 0,void 0,0],MMK:[void 0,"K",0],MNT:[void 0,"\u20AE",2],MRO:[void 0,void 0,0],MUR:[void 0,"Rs",2],MXN:["MX$","$"],MYR:[void 0,"RM"],NAD:[void 0,"$"],NGN:[void 0,"\u20A6"],NIO:[void 0,"C$"],NOK:[void 0,"kr",2],NPR:[void 0,"Rs"],NZD:["NZ$","$"],OMR:[void 0,void 0,3],PHP:["\u20B1"],PKR:[void 0,"Rs",2],PLN:[void 0,"z\u0142"],PYG:[void 0,"\u20B2",0],RON:[void 0,"lei"],RSD:[void 0,void 0,0],RUB:[void 0,"\u20BD"],RWF:[void 0,"RF",0],SBD:[void 0,"$"],SEK:[void 0,"kr",2],SGD:[void 0,"$"],SHP:[void 0,"\xA3"],SLE:[void 0,void 0,2],SLL:[void 0,void 0,0],SOS:[void 0,void 0,0],SRD:[void 0,"$"],SSP:[void 0,"\xA3"],STD:[void 0,void 0,0],STN:[void 0,"Db"],SYP:[void 0,"\xA3",0],THB:[void 0,"\u0E3F"],TMM:[void 0,void 0,0],TND:[void 0,void 0,3],TOP:[void 0,"T$"],TRL:[void 0,void 0,0],TRY:[void 0,"\u20BA"],TTD:[void 0,"$"],TWD:["NT$","$",2],TZS:[void 0,void 0,2],UAH:[void 0,"\u20B4"],UGX:[void 0,void 0,0],USD:["$"],UYI:[void 0,void 0,0],UYU:[void 0,"$"],UYW:[void 0,void 0,4],UZS:[void 0,void 0,2],VEF:[void 0,"Bs",2],VND:["\u20AB",void 0,0],VUV:[void 0,void 0,0],XAF:["FCFA",void 0,0],XCD:["EC$","$"],XOF:["F\u202FCFA",void 0,0],XPF:["CFPF",void 0,0],XXX:["\xA4"],YER:[void 0,void 0,0],ZAR:[void 0,"R"],ZMK:[void 0,void 0,0],ZMW:[void 0,"ZK"],ZWD:[void 0,void 0,0]},ji=function(e){return e[e.Decimal=0]="Decimal",e[e.Percent=1]="Percent",e[e.Currency=2]="Currency",e[e.Scientific=3]="Scientific",e}(ji||{});var se=function(e){return e[e.Format=0]="Format",e[e.Standalone=1]="Standalone",e}(se||{}),R=function(e){return e[e.Narrow=0]="Narrow",e[e.Abbreviated=1]="Abbreviated",e[e.Wide=2]="Wide",e[e.Short=3]="Short",e}(R||{}),he=function(e){return e[e.Short=0]="Short",e[e.Medium=1]="Medium",e[e.Long=2]="Long",e[e.Full=3]="Full",e}(he||{}),pe={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Sr(e){return de(e)[H.LocaleId]}function Ar(e,i,t){let n=de(e),o=[n[H.DayPeriodsFormat],n[H.DayPeriodsStandalone]],r=Ae(o,i);return Ae(r,t)}function Tr(e,i,t){let n=de(e),o=[n[H.DaysFormat],n[H.DaysStandalone]],r=Ae(o,i);return Ae(r,t)}function Fr(e,i,t){let n=de(e),o=[n[H.MonthsFormat],n[H.MonthsStandalone]],r=Ae(o,i);return Ae(r,t)}function Ir(e,i){let n=de(e)[H.Eras];return Ae(n,i)}function en(e,i){let t=de(e);return Ae(t[H.DateFormat],i)}function tn(e,i){let t=de(e);return Ae(t[H.TimeFormat],i)}function nn(e,i){let n=de(e)[H.DateTimeFormat];return Ae(n,i)}function $e(e,i){let t=de(e),n=t[H.NumberSymbols][i];if(typeof n>"u"){if(i===pe.CurrencyDecimal)return t[H.NumberSymbols][pe.Decimal];if(i===pe.CurrencyGroup)return t[H.NumberSymbols][pe.Group]}return n}function xr(e,i){return de(e)[H.NumberFormats][i]}function Ja(e){return de(e)[H.Currencies]}function Or(e){if(!e[H.ExtraData])throw new Error(`Missing extra locale data for the locale "${e[H.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)}function Mr(e){let i=de(e);return Or(i),(i[H.ExtraData][2]||[]).map(n=>typeof n=="string"?Li(n):[Li(n[0]),Li(n[1])])}function kr(e,i,t){let n=de(e);Or(n);let o=[n[H.ExtraData][0],n[H.ExtraData][1]],r=Ae(o,i)||[];return Ae(r,t)||[]}function Ae(e,i){for(let t=i;t>-1;t--)if(typeof e[t]<"u")return e[t];throw new Error("Locale data API: locale data undefined")}function Li(e){let[i,t]=e.split(":");return{hours:+i,minutes:+t}}function Rr(e,i,t="en"){let n=Ja(t)[e]||wr[e]||[],o=n[1];return i==="narrow"&&typeof o=="string"?o:n[0]||e}var el=2;function Lr(e){let i,t=wr[e];return t&&(i=t[2]),typeof i=="number"?i:el}var tl=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Gn={},nl=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function Nr(e,i,t,n){let o=dl(e);i=He(t,i)||i;let s=[],a;for(;i;)if(a=nl.exec(i),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;i=u}else{s.push(i);break}let l=o.getTimezoneOffset();n&&(l=$r(n,l),o=ul(o,n));let c="";return s.forEach(u=>{let d=ll(u);c+=d?d(o,t,l):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),c}function Zn(e,i,t){let n=new Date(0);return n.setFullYear(e,i,t),n.setHours(0,0,0),n}function He(e,i){let t=Sr(e);if(Gn[t]??={},Gn[t][i])return Gn[t][i];let n="";switch(i){case"shortDate":n=en(e,he.Short);break;case"mediumDate":n=en(e,he.Medium);break;case"longDate":n=en(e,he.Long);break;case"fullDate":n=en(e,he.Full);break;case"shortTime":n=tn(e,he.Short);break;case"mediumTime":n=tn(e,he.Medium);break;case"longTime":n=tn(e,he.Long);break;case"fullTime":n=tn(e,he.Full);break;case"short":let o=He(e,"shortTime"),r=He(e,"shortDate");n=Wn(nn(e,he.Short),[o,r]);break;case"medium":let s=He(e,"mediumTime"),a=He(e,"mediumDate");n=Wn(nn(e,he.Medium),[s,a]);break;case"long":let l=He(e,"longTime"),c=He(e,"longDate");n=Wn(nn(e,he.Long),[l,c]);break;case"full":let u=He(e,"fullTime"),d=He(e,"fullDate");n=Wn(nn(e,he.Full),[u,d]);break}return n&&(Gn[t][i]=n),n}function Wn(e,i){return i&&(e=e.replace(/\{([^}]+)}/g,function(t,n){return i!=null&&n in i?i[n]:t})),e}function Me(e,i,t="-",n,o){let r="";(e<0||o&&e<=0)&&(o?e=-e+1:(e=-e,r=t));let s=String(e);for(;s.length<i;)s="0"+s;return n&&(s=s.slice(s.length-i)),r+s}function il(e,i){return Me(e,3).substring(0,i)}function X(e,i,t=0,n=!1,o=!1){return function(r,s){let a=ol(e,r);if((t>0||a>-t)&&(a+=t),e===3)a===0&&t===-12&&(a=12);else if(e===6)return il(a,i);let l=$e(s,pe.MinusSign);return Me(a,i,l,n,o)}}function ol(e,i){switch(e){case 0:return i.getFullYear();case 1:return i.getMonth();case 2:return i.getDate();case 3:return i.getHours();case 4:return i.getMinutes();case 5:return i.getSeconds();case 6:return i.getMilliseconds();case 7:return i.getDay();default:throw new Error(`Unknown DateType value "${e}".`)}}function N(e,i,t=se.Format,n=!1){return function(o,r){return rl(o,r,e,i,t,n)}}function rl(e,i,t,n,o,r){switch(t){case 2:return Fr(i,o,n)[e.getMonth()];case 1:return Tr(i,o,n)[e.getDay()];case 0:let s=e.getHours(),a=e.getMinutes();if(r){let c=Mr(i),u=kr(i,o,n),d=c.findIndex(p=>{if(Array.isArray(p)){let[h,m]=p,g=s>=h.hours&&a>=h.minutes,b=s<m.hours||s===m.hours&&a<m.minutes;if(h.hours<m.hours){if(g&&b)return!0}else if(g||b)return!0}else if(p.hours===s&&p.minutes===a)return!0;return!1});if(d!==-1)return u[d]}return Ar(i,o,n)[s<12?0:1];case 3:return Ir(i,n)[e.getFullYear()<=0?0:1];default:let l=t;throw new Error(`unexpected translation type ${l}`)}}function Kn(e){return function(i,t,n){let o=-1*n,r=$e(t,pe.MinusSign),s=o>0?Math.floor(o/60):Math.ceil(o/60);switch(e){case 0:return(o>=0?"+":"")+Me(s,2,r)+Me(Math.abs(o%60),2,r);case 1:return"GMT"+(o>=0?"+":"")+Me(s,1,r);case 2:return"GMT"+(o>=0?"+":"")+Me(s,2,r)+":"+Me(Math.abs(o%60),2,r);case 3:return n===0?"Z":(o>=0?"+":"")+Me(s,2,r)+":"+Me(Math.abs(o%60),2,r);default:throw new Error(`Unknown zone width "${e}"`)}}}var sl=0,Yn=4;function al(e){let i=Zn(e,sl,1).getDay();return Zn(e,0,1+(i<=Yn?Yn:Yn+7)-i)}function Pr(e){let i=e.getDay(),t=i===0?-3:Yn-i;return Zn(e.getFullYear(),e.getMonth(),e.getDate()+t)}function Ni(e,i=!1){return function(t,n){let o;if(i){let r=new Date(t.getFullYear(),t.getMonth(),1).getDay()-1,s=t.getDate();o=1+Math.floor((s+r)/7)}else{let r=Pr(t),s=al(r.getFullYear()),a=r.getTime()-s.getTime();o=1+Math.round(a/6048e5)}return Me(o,e,$e(n,pe.MinusSign))}}function qn(e,i=!1){return function(t,n){let r=Pr(t).getFullYear();return Me(r,e,$e(n,pe.MinusSign),i)}}var Pi={};function ll(e){if(Pi[e])return Pi[e];let i;switch(e){case"G":case"GG":case"GGG":i=N(3,R.Abbreviated);break;case"GGGG":i=N(3,R.Wide);break;case"GGGGG":i=N(3,R.Narrow);break;case"y":i=X(0,1,0,!1,!0);break;case"yy":i=X(0,2,0,!0,!0);break;case"yyy":i=X(0,3,0,!1,!0);break;case"yyyy":i=X(0,4,0,!1,!0);break;case"Y":i=qn(1);break;case"YY":i=qn(2,!0);break;case"YYY":i=qn(3);break;case"YYYY":i=qn(4);break;case"M":case"L":i=X(1,1,1);break;case"MM":case"LL":i=X(1,2,1);break;case"MMM":i=N(2,R.Abbreviated);break;case"MMMM":i=N(2,R.Wide);break;case"MMMMM":i=N(2,R.Narrow);break;case"LLL":i=N(2,R.Abbreviated,se.Standalone);break;case"LLLL":i=N(2,R.Wide,se.Standalone);break;case"LLLLL":i=N(2,R.Narrow,se.Standalone);break;case"w":i=Ni(1);break;case"ww":i=Ni(2);break;case"W":i=Ni(1,!0);break;case"d":i=X(2,1);break;case"dd":i=X(2,2);break;case"c":case"cc":i=X(7,1);break;case"ccc":i=N(1,R.Abbreviated,se.Standalone);break;case"cccc":i=N(1,R.Wide,se.Standalone);break;case"ccccc":i=N(1,R.Narrow,se.Standalone);break;case"cccccc":i=N(1,R.Short,se.Standalone);break;case"E":case"EE":case"EEE":i=N(1,R.Abbreviated);break;case"EEEE":i=N(1,R.Wide);break;case"EEEEE":i=N(1,R.Narrow);break;case"EEEEEE":i=N(1,R.Short);break;case"a":case"aa":case"aaa":i=N(0,R.Abbreviated);break;case"aaaa":i=N(0,R.Wide);break;case"aaaaa":i=N(0,R.Narrow);break;case"b":case"bb":case"bbb":i=N(0,R.Abbreviated,se.Standalone,!0);break;case"bbbb":i=N(0,R.Wide,se.Standalone,!0);break;case"bbbbb":i=N(0,R.Narrow,se.Standalone,!0);break;case"B":case"BB":case"BBB":i=N(0,R.Abbreviated,se.Format,!0);break;case"BBBB":i=N(0,R.Wide,se.Format,!0);break;case"BBBBB":i=N(0,R.Narrow,se.Format,!0);break;case"h":i=X(3,1,-12);break;case"hh":i=X(3,2,-12);break;case"H":i=X(3,1);break;case"HH":i=X(3,2);break;case"m":i=X(4,1);break;case"mm":i=X(4,2);break;case"s":i=X(5,1);break;case"ss":i=X(5,2);break;case"S":i=X(6,1);break;case"SS":i=X(6,2);break;case"SSS":i=X(6,3);break;case"Z":case"ZZ":case"ZZZ":i=Kn(0);break;case"ZZZZZ":i=Kn(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":i=Kn(1);break;case"OOOO":case"ZZZZ":case"zzzz":i=Kn(2);break;default:return null}return Pi[e]=i,i}function $r(e,i){e=e.replace(/:/g,"");let t=Date.parse("Jan 01, 1970 00:00:00 "+e)/6e4;return isNaN(t)?i:t}function cl(e,i){return e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+i),e}function ul(e,i,t){let o=e.getTimezoneOffset(),r=$r(i,o);return cl(e,-1*(r-o))}function dl(e){if(yr(e))return e;if(typeof e=="number"&&!isNaN(e))return new Date(e);if(typeof e=="string"){if(e=e.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)){let[o,r=1,s=1]=e.split("-").map(a=>+a);return Zn(o,r-1,s)}let t=parseFloat(e);if(!isNaN(e-t))return new Date(t);let n;if(n=e.match(tl))return hl(n)}let i=new Date(e);if(!yr(i))throw new Error(`Unable to convert "${e}" into a date`);return i}function hl(e){let i=new Date(0),t=0,n=0,o=e[8]?i.setUTCFullYear:i.setFullYear,r=e[8]?i.setUTCHours:i.setHours;e[9]&&(t=Number(e[9]+e[10]),n=Number(e[9]+e[11])),o.call(i,Number(e[1]),Number(e[2])-1,Number(e[3]));let s=Number(e[4]||0)-t,a=Number(e[5]||0)-n,l=Number(e[6]||0),c=Math.floor(parseFloat("0."+(e[7]||0))*1e3);return r.call(i,s,a,l,c),i}function yr(e){return e instanceof Date&&!isNaN(e.valueOf())}var pl=/^(\d+)?\.((\d+)(-(\d+))?)?$/,vr=22,Xn=".",on="0",fl=";",gl=",",$i="#",_r="\xA4";function ml(e,i,t,n,o,r,s=!1){let a="",l=!1;if(!isFinite(e))a=$e(t,pe.Infinity);else{let c=vl(e);s&&(c=yl(c));let u=i.minInt,d=i.minFrac,p=i.maxFrac;if(r){let T=r.match(pl);if(T===null)throw new Error(`${r} is not a valid digit info`);let O=T[1],j=T[3],Te=T[5];O!=null&&(u=Vi(O)),j!=null&&(d=Vi(j)),Te!=null?p=Vi(Te):j!=null&&d>p&&(p=d)}_l(c,d,p);let h=c.digits,m=c.integerLen,g=c.exponent,b=[];for(l=h.every(T=>!T);m<u;m++)h.unshift(0);for(;m<0;m++)h.unshift(0);m>0?b=h.splice(m,h.length):(b=h,h=[0]);let x=[];for(h.length>=i.lgSize&&x.unshift(h.splice(-i.lgSize,h.length).join(""));h.length>i.gSize;)x.unshift(h.splice(-i.gSize,h.length).join(""));h.length&&x.unshift(h.join("")),a=x.join($e(t,n)),b.length&&(a+=$e(t,o)+b.join("")),g&&(a+=$e(t,pe.Exponential)+"+"+g)}return e<0&&!l?a=i.negPre+a+i.negSuf:a=i.posPre+a+i.posSuf,a}function Vr(e,i,t,n,o){let r=xr(i,ji.Currency),s=bl(r,$e(i,pe.MinusSign));return s.minFrac=Lr(n),s.maxFrac=s.minFrac,ml(e,s,i,pe.CurrencyGroup,pe.CurrencyDecimal,o).replace(_r,t).replace(_r,"").trim()}function bl(e,i="-"){let t={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},n=e.split(fl),o=n[0],r=n[1],s=o.indexOf(Xn)!==-1?o.split(Xn):[o.substring(0,o.lastIndexOf(on)+1),o.substring(o.lastIndexOf(on)+1)],a=s[0],l=s[1]||"";t.posPre=a.substring(0,a.indexOf($i));for(let u=0;u<l.length;u++){let d=l.charAt(u);d===on?t.minFrac=t.maxFrac=u+1:d===$i?t.maxFrac=u+1:t.posSuf+=d}let c=a.split(gl);if(t.gSize=c[1]?c[1].length:0,t.lgSize=c[2]||c[1]?(c[2]||c[1]).length:0,r){let u=o.length-t.posPre.length-t.posSuf.length,d=r.indexOf($i);t.negPre=r.substring(0,d).replace(/'/g,""),t.negSuf=r.slice(d+u).replace(/'/g,"")}else t.negPre=i+t.posPre,t.negSuf=t.posSuf;return t}function yl(e){if(e.digits[0]===0)return e;let i=e.digits.length-e.integerLen;return e.exponent?e.exponent+=2:(i===0?e.digits.push(0,0):i===1&&e.digits.push(0),e.integerLen+=2),e}function vl(e){let i=Math.abs(e)+"",t=0,n,o,r,s,a;for((o=i.indexOf(Xn))>-1&&(i=i.replace(Xn,"")),(r=i.search(/e/i))>0?(o<0&&(o=r),o+=+i.slice(r+1),i=i.substring(0,r)):o<0&&(o=i.length),r=0;i.charAt(r)===on;r++);if(r===(a=i.length))n=[0],o=1;else{for(a--;i.charAt(a)===on;)a--;for(o-=r,n=[],s=0;r<=a;r++,s++)n[s]=Number(i.charAt(r))}return o>vr&&(n=n.splice(0,vr-1),t=o-1,o=1),{digits:n,exponent:t,integerLen:o}}function _l(e,i,t){if(i>t)throw new Error(`The minimum number of digits after fraction (${i}) is higher than the maximum (${t}).`);let n=e.digits,o=n.length-e.integerLen,r=Math.min(Math.max(i,o),t),s=r+e.integerLen,a=n[s];if(s>0){n.splice(Math.max(e.integerLen,s));for(let d=s;d<n.length;d++)n[d]=0}else{o=Math.max(0,o),e.integerLen=1,n.length=Math.max(1,s=r+1),n[0]=0;for(let d=1;d<s;d++)n[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)n.unshift(0),e.integerLen++;n.unshift(1),e.integerLen++}else n[s-1]++;for(;o<Math.max(0,r);o++)n.push(0);let l=r!==0,c=i+e.integerLen,u=n.reduceRight(function(d,p,h,m){return p=p+d,m[h]=p<10?p:p-10,l&&(m[h]===0&&h>=c?m.pop():l=!1),p>=10?1:0},0);u&&(n.unshift(u),e.integerLen++)}function Vi(e){let i=parseInt(e);if(isNaN(i))throw new Error("Invalid integer literal when parsing "+e);return i}var Bi=/\s+/,Dr=[],yt=(()=>{class e{_ngEl;_renderer;initialClasses=Dr;rawClass;stateMap=new Map;constructor(t,n){this._ngEl=t,this._renderer=n}set klass(t){this.initialClasses=t!=null?t.trim().split(Bi):Dr}set ngClass(t){this.rawClass=typeof t=="string"?t.trim().split(Bi):t}ngDoCheck(){for(let n of this.initialClasses)this._updateState(n,!0);let t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(let n of t)this._updateState(n,!0);else if(t!=null)for(let n of Object.keys(t))this._updateState(n,!!t[n]);this._applyStateDiff()}_updateState(t,n){let o=this.stateMap.get(t);o!==void 0?(o.enabled!==n&&(o.changed=!0,o.enabled=n),o.touched=!0):this.stateMap.set(t,{enabled:n,changed:!0,touched:!0})}_applyStateDiff(){for(let t of this.stateMap){let n=t[0],o=t[1];o.changed?(this._toggleClass(n,o.enabled),o.changed=!1):o.touched||(o.enabled&&this._toggleClass(n,!1),this.stateMap.delete(n)),o.touched=!1}}_toggleClass(t,n){t=t.trim(),t.length>0&&t.split(Bi).forEach(o=>{n?this._renderer.addClass(this._ngEl.nativeElement,o):this._renderer.removeClass(this._ngEl.nativeElement,o)})}static \u0275fac=function(n){return new(n||e)(E(Ee),E(Re))};static \u0275dir=A({type:e,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return e})();var Qn=class{$implicit;ngForOf;index;count;constructor(i,t,n,o){this.$implicit=i,this.ngForOf=t,this.index=n,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Br=(()=>{class e{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,n,o){this._viewContainer=t,this._template=n,this._differs=o}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let n=this._viewContainer;t.forEachOperation((o,r,s)=>{if(o.previousIndex==null)n.createEmbeddedView(this._template,new Qn(o.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)n.remove(r===null?void 0:r);else if(r!==null){let a=n.get(r);n.move(a,s),Cr(a,o)}});for(let o=0,r=n.length;o<r;o++){let a=n.get(o).context;a.index=o,a.count=r,a.ngForOf=this._ngForOf}t.forEachIdentityChange(o=>{let r=n.get(o.currentIndex);Cr(r,o)})}static ngTemplateContextGuard(t,n){return!0}static \u0275fac=function(n){return new(n||e)(E(Gt),E(Ct),E(Mo))};static \u0275dir=A({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return e})();function Cr(e,i){e.context.$implicit=i.item}var rn=(()=>{class e{_viewContainer;_context=new Jn;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,n){this._viewContainer=t,this._thenTemplateRef=n}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){Er(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){Er(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,n){return!0}static \u0275fac=function(n){return new(n||e)(E(Gt),E(Ct))};static \u0275dir=A({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return e})(),Jn=class{$implicit=null;ngIf=null};function Er(e,i){if(e&&!e.createEmbeddedView)throw new De(2020,!1)}var Ui=class{_viewContainerRef;_templateRef;_created=!1;constructor(i,t){this._viewContainerRef=i,this._templateRef=t}create(){this._created=!0,this._viewContainerRef.createEmbeddedView(this._templateRef)}destroy(){this._created=!1,this._viewContainerRef.clear()}enforceState(i){i&&!this._created?this.create():!i&&this._created&&this.destroy()}},Ur=(()=>{class e{_defaultViews=[];_defaultUsed=!1;_caseCount=0;_lastCaseCheckIndex=0;_lastCasesMatched=!1;_ngSwitch;set ngSwitch(t){this._ngSwitch=t,this._caseCount===0&&this._updateDefaultCases(!0)}_addCase(){return this._caseCount++}_addDefault(t){this._defaultViews.push(t)}_matchCase(t){let n=t===this._ngSwitch;return this._lastCasesMatched||=n,this._lastCaseCheckIndex++,this._lastCaseCheckIndex===this._caseCount&&(this._updateDefaultCases(!this._lastCasesMatched),this._lastCaseCheckIndex=0,this._lastCasesMatched=!1),n}_updateDefaultCases(t){if(this._defaultViews.length>0&&t!==this._defaultUsed){this._defaultUsed=t;for(let n of this._defaultViews)n.enforceState(t)}}static \u0275fac=function(n){return new(n||e)};static \u0275dir=A({type:e,selectors:[["","ngSwitch",""]],inputs:{ngSwitch:"ngSwitch"}})}return e})(),Dl=(()=>{class e{ngSwitch;_view;ngSwitchCase;constructor(t,n,o){this.ngSwitch=o,o._addCase(),this._view=new Ui(t,n)}ngDoCheck(){this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))}static \u0275fac=function(n){return new(n||e)(E(Gt),E(Ct),E(Ur,9))};static \u0275dir=A({type:e,selectors:[["","ngSwitchCase",""]],inputs:{ngSwitchCase:"ngSwitchCase"}})}return e})();var Hi=(()=>{class e{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,n,o){this._ngEl=t,this._differs=n,this._renderer=o}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,n){let[o,r]=t.split("."),s=o.indexOf("-")===-1?void 0:Do.DashCase;n!=null?this._renderer.setStyle(this._ngEl.nativeElement,o,r?`${n}${r}`:n,s):this._renderer.removeStyle(this._ngEl.nativeElement,o,s)}_applyChanges(t){t.forEachRemovedItem(n=>this._setStyle(n.key,null)),t.forEachAddedItem(n=>this._setStyle(n.key,n.currentValue)),t.forEachChangedItem(n=>this._setStyle(n.key,n.currentValue))}static \u0275fac=function(n){return new(n||e)(E(Ee),E(ko),E(Re))};static \u0275dir=A({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return e})(),ze=(()=>{class e{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;constructor(t){this._viewContainerRef=t}ngOnChanges(t){if(this._shouldRecreateView(t)){let n=this._viewContainerRef;if(this._viewRef&&n.remove(n.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let o=this._createContextForwardProxy();this._viewRef=n.createEmbeddedView(this.ngTemplateOutlet,o,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,n,o)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,n,o):!1,get:(t,n,o)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,n,o)}})}static \u0275fac=function(n){return new(n||e)(E(Gt))};static \u0275dir=A({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[ae]})}return e})();function zi(e,i){return new De(2100,!1)}var Cl="mediumDate",jr=new M(""),Hr=new M(""),El=(()=>{class e{locale;defaultTimezone;defaultOptions;constructor(t,n,o){this.locale=t,this.defaultTimezone=n,this.defaultOptions=o}transform(t,n,o,r){if(t==null||t===""||t!==t)return null;try{let s=n??this.defaultOptions?.dateFormat??Cl,a=o??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return Nr(t,s,r||this.locale,a)}catch(s){throw zi(e,s.message)}}static \u0275fac=function(n){return new(n||e)(E(gi,16),E(jr,24),E(Hr,24))};static \u0275pipe=Tn({name:"date",type:e,pure:!0})}return e})();var wl=(()=>{class e{_locale;_defaultCurrencyCode;constructor(t,n="USD"){this._locale=t,this._defaultCurrencyCode=n}transform(t,n=this._defaultCurrencyCode,o="symbol",r,s){if(!Sl(t))return null;s||=this._locale,typeof o=="boolean"&&(o=o?"symbol":"code");let a=n||this._defaultCurrencyCode;o!=="code"&&(o==="symbol"||o==="symbol-narrow"?a=Rr(a,o==="symbol"?"wide":"narrow",s):a=o);try{let l=Al(t);return Vr(l,s,a,n,r)}catch(l){throw zi(e,l.message)}}static \u0275fac=function(n){return new(n||e)(E(gi,16),E(Oo,16))};static \u0275pipe=Tn({name:"currency",type:e,pure:!0})}return e})();function Sl(e){return!(e==null||e===""||e!==e)}function Al(e){if(typeof e=="string"&&!isNaN(Number(e)-parseFloat(e)))return Number(e);if(typeof e!="number")throw new Error(`${e} is not a number`);return e}var Tl=(()=>{class e{transform(t,n,o){if(t==null)return null;if(!(typeof t=="string"||Array.isArray(t)))throw zi(e,t);return t.slice(n,o)}static \u0275fac=function(n){return new(n||e)};static \u0275pipe=Tn({name:"slice",type:e,pure:!1})}return e})();var fe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({})}return e})();var Np=(()=>{class e{static \u0275prov=y({token:e,providedIn:"root",factory:()=>new Gi(f(ce),window)})}return e})(),Gi=class{document;window;offset=()=>[0,0];constructor(i,t){this.document=i,this.window=t}setOffset(i){Array.isArray(i)?this.offset=()=>i:this.offset=i}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(i){this.window.scrollTo(i[0],i[1])}scrollToAnchor(i){let t=Il(this.document,i);t&&(this.scrollToElement(t),t.focus())}setHistoryScrollRestoration(i){this.window.history.scrollRestoration=i}scrollToElement(i){let t=i.getBoundingClientRect(),n=t.left+this.window.pageXOffset,o=t.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(n-r[0],o-r[1])}};function Il(e,i){let t=e.getElementById(i)||e.getElementsByName(i)[0];if(t)return t;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let n=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),o=n.currentNode;for(;o;){let r=o.shadowRoot;if(r){let s=r.getElementById(i)||r.querySelector(`[name="${i}"]`);if(s)return s}o=n.nextNode()}}return null}var Gr=e=>e.src,xl=new M("",{providedIn:"root",factory:()=>Gr});var zr=/^((\s*\d+w\s*(,|$)){1,})$/;var Ol=[1,2],Ml=640;var kl=1920,Rl=1080;var Pp=(()=>{class e{imageLoader=f(xl);config=Ll(f(yo));renderer=f(Re);imgElement=f(Ee).nativeElement;injector=f(zt);lcpObserver;_renderedSrc=null;ngSrc;ngSrcset;sizes;width;height;loading;priority=!1;loaderParams;disableOptimizedSrcset=!1;fill=!1;placeholder;placeholderConfig;src;srcset;constructor(){}ngOnInit(){vo("NgOptimizedImage"),this.placeholder&&this.removePlaceholderOnLoad(this.imgElement),this.setHostAttributes()}setHostAttributes(){this.fill?this.sizes||="100vw":(this.setHostAttribute("width",this.width.toString()),this.setHostAttribute("height",this.height.toString())),this.setHostAttribute("loading",this.getLoadingBehavior()),this.setHostAttribute("fetchpriority",this.getFetchPriority()),this.setHostAttribute("ng-img","true");let t=this.updateSrcAndSrcset();this.sizes?this.getLoadingBehavior()==="lazy"?this.setHostAttribute("sizes","auto, "+this.sizes):this.setHostAttribute("sizes",this.sizes):this.ngSrcset&&zr.test(this.ngSrcset)&&this.getLoadingBehavior()==="lazy"&&this.setHostAttribute("sizes","auto, 100vw")}ngOnChanges(t){if(t.ngSrc&&!t.ngSrc.isFirstChange()){let n=this._renderedSrc;this.updateSrcAndSrcset(!0)}}callImageLoader(t){let n=t;return this.loaderParams&&(n.loaderParams=this.loaderParams),this.imageLoader(n)}getLoadingBehavior(){return!this.priority&&this.loading!==void 0?this.loading:this.priority?"eager":"lazy"}getFetchPriority(){return this.priority?"high":"auto"}getRewrittenSrc(){if(!this._renderedSrc){let t={src:this.ngSrc};this._renderedSrc=this.callImageLoader(t)}return this._renderedSrc}getRewrittenSrcset(){let t=zr.test(this.ngSrcset);return this.ngSrcset.split(",").filter(o=>o!=="").map(o=>{o=o.trim();let r=t?parseFloat(o):parseFloat(o)*this.width;return`${this.callImageLoader({src:this.ngSrc,width:r})} ${o}`}).join(", ")}getAutomaticSrcset(){return this.sizes?this.getResponsiveSrcset():this.getFixedSrcset()}getResponsiveSrcset(){let{breakpoints:t}=this.config,n=t;return this.sizes?.trim()==="100vw"&&(n=t.filter(r=>r>=Ml)),n.map(r=>`${this.callImageLoader({src:this.ngSrc,width:r})} ${r}w`).join(", ")}updateSrcAndSrcset(t=!1){t&&(this._renderedSrc=null);let n=this.getRewrittenSrc();this.setHostAttribute("src",n);let o;return this.ngSrcset?o=this.getRewrittenSrcset():this.shouldGenerateAutomaticSrcset()&&(o=this.getAutomaticSrcset()),o&&this.setHostAttribute("srcset",o),o}getFixedSrcset(){return Ol.map(n=>`${this.callImageLoader({src:this.ngSrc,width:this.width*n})} ${n}x`).join(", ")}shouldGenerateAutomaticSrcset(){let t=!1;return this.sizes||(t=this.width>kl||this.height>Rl),!this.disableOptimizedSrcset&&!this.srcset&&this.imageLoader!==Gr&&!t}generatePlaceholder(t){let{placeholderResolution:n}=this.config;return t===!0?`url(${this.callImageLoader({src:this.ngSrc,width:n,isPlaceholder:!0})})`:typeof t=="string"?`url(${t})`:null}shouldBlurPlaceholder(t){return!t||!t.hasOwnProperty("blur")?!0:!!t.blur}removePlaceholderOnLoad(t){let n=()=>{let s=this.injector.get(pt);o(),r(),this.placeholder=!1,s.markForCheck()},o=this.renderer.listen(t,"load",n),r=this.renderer.listen(t,"error",n);Nl(t,n)}setHostAttribute(t,n){this.renderer.setAttribute(this.imgElement,t,n)}static \u0275fac=function(n){return new(n||e)};static \u0275dir=A({type:e,selectors:[["img","ngSrc",""]],hostVars:18,hostBindings:function(n,o){n&2&&Fn("position",o.fill?"absolute":null)("width",o.fill?"100%":null)("height",o.fill?"100%":null)("inset",o.fill?"0":null)("background-size",o.placeholder?"cover":null)("background-position",o.placeholder?"50% 50%":null)("background-repeat",o.placeholder?"no-repeat":null)("background-image",o.placeholder?o.generatePlaceholder(o.placeholder):null)("filter",o.placeholder&&o.shouldBlurPlaceholder(o.placeholderConfig)?"blur(15px)":null)},inputs:{ngSrc:[2,"ngSrc","ngSrc",Pl],ngSrcset:"ngSrcset",sizes:"sizes",width:[2,"width","width",Ie],height:[2,"height","height",Ie],loading:"loading",priority:[2,"priority","priority",v],loaderParams:"loaderParams",disableOptimizedSrcset:[2,"disableOptimizedSrcset","disableOptimizedSrcset",v],fill:[2,"fill","fill",v],placeholder:[2,"placeholder","placeholder",$l],placeholderConfig:"placeholderConfig",src:"src",srcset:"srcset"},features:[ae]})}return e})();function Ll(e){let i={};return e.breakpoints&&(i.breakpoints=e.breakpoints.sort((t,n)=>t-n)),Object.assign({},bo,e,i)}function Nl(e,i){e.complete&&e.naturalWidth&&i()}function Pl(e){return typeof e=="string"?e:_o(e)}function $l(e){return typeof e=="string"&&e!=="true"&&e!=="false"&&e!==""?e:v(e)}var Wr=["*"],Vl=function(e){return e[e.ACCEPT=0]="ACCEPT",e[e.REJECT=1]="REJECT",e[e.CANCEL=2]="CANCEL",e}(Vl||{}),Gp=(()=>{class e{requireConfirmationSource=new ue;acceptConfirmationSource=new ue;requireConfirmation$=this.requireConfirmationSource.asObservable();accept=this.acceptConfirmationSource.asObservable();confirm(t){return this.requireConfirmationSource.next(t),this}close(){return this.requireConfirmationSource.next(null),this}onAccept(){this.acceptConfirmationSource.next(null)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var ne=(()=>{class e{static STARTS_WITH="startsWith";static CONTAINS="contains";static NOT_CONTAINS="notContains";static ENDS_WITH="endsWith";static EQUALS="equals";static NOT_EQUALS="notEquals";static IN="in";static LESS_THAN="lt";static LESS_THAN_OR_EQUAL_TO="lte";static GREATER_THAN="gt";static GREATER_THAN_OR_EQUAL_TO="gte";static BETWEEN="between";static IS="is";static IS_NOT="isNot";static BEFORE="before";static AFTER="after";static DATE_IS="dateIs";static DATE_IS_NOT="dateIsNot";static DATE_BEFORE="dateBefore";static DATE_AFTER="dateAfter"}return e})(),Wp=(()=>{class e{static AND="and";static OR="or"}return e})(),Kp=(()=>{class e{filter(t,n,o,r,s){let a=[];if(t)for(let l of t)for(let c of n){let u=Je(l,c);if(this.filters[r](u,o,s)){a.push(l);break}}return a}filters={startsWith:(t,n,o)=>{if(n==null||n.trim()==="")return!0;if(t==null)return!1;let r=ye(n.toString()).toLocaleLowerCase(o);return ye(t.toString()).toLocaleLowerCase(o).slice(0,r.length)===r},contains:(t,n,o)=>{if(n==null||typeof n=="string"&&n.trim()==="")return!0;if(t==null)return!1;let r=ye(n.toString()).toLocaleLowerCase(o);return ye(t.toString()).toLocaleLowerCase(o).indexOf(r)!==-1},notContains:(t,n,o)=>{if(n==null||typeof n=="string"&&n.trim()==="")return!0;if(t==null)return!1;let r=ye(n.toString()).toLocaleLowerCase(o);return ye(t.toString()).toLocaleLowerCase(o).indexOf(r)===-1},endsWith:(t,n,o)=>{if(n==null||n.trim()==="")return!0;if(t==null)return!1;let r=ye(n.toString()).toLocaleLowerCase(o),s=ye(t.toString()).toLocaleLowerCase(o);return s.indexOf(r,s.length-r.length)!==-1},equals:(t,n,o)=>n==null||typeof n=="string"&&n.trim()===""?!0:t==null?!1:t.getTime&&n.getTime?t.getTime()===n.getTime():t==n?!0:ye(t.toString()).toLocaleLowerCase(o)==ye(n.toString()).toLocaleLowerCase(o),notEquals:(t,n,o)=>n==null||typeof n=="string"&&n.trim()===""?!1:t==null?!0:t.getTime&&n.getTime?t.getTime()!==n.getTime():t==n?!1:ye(t.toString()).toLocaleLowerCase(o)!=ye(n.toString()).toLocaleLowerCase(o),in:(t,n)=>{if(n==null||n.length===0)return!0;for(let o=0;o<n.length;o++)if(Pe(t,n[o]))return!0;return!1},between:(t,n)=>n==null||n[0]==null||n[1]==null?!0:t==null?!1:t.getTime?n[0].getTime()<=t.getTime()&&t.getTime()<=n[1].getTime():n[0]<=t&&t<=n[1],lt:(t,n,o)=>n==null?!0:t==null?!1:t.getTime&&n.getTime?t.getTime()<n.getTime():t<n,lte:(t,n,o)=>n==null?!0:t==null?!1:t.getTime&&n.getTime?t.getTime()<=n.getTime():t<=n,gt:(t,n,o)=>n==null?!0:t==null?!1:t.getTime&&n.getTime?t.getTime()>n.getTime():t>n,gte:(t,n,o)=>n==null?!0:t==null?!1:t.getTime&&n.getTime?t.getTime()>=n.getTime():t>=n,is:(t,n,o)=>this.filters.equals(t,n,o),isNot:(t,n,o)=>this.filters.notEquals(t,n,o),before:(t,n,o)=>this.filters.lt(t,n,o),after:(t,n,o)=>this.filters.gt(t,n,o),dateIs:(t,n)=>n==null?!0:t==null?!1:t.toDateString()===n.toDateString(),dateIsNot:(t,n)=>n==null?!0:t==null?!1:t.toDateString()!==n.toDateString(),dateBefore:(t,n)=>n==null?!0:t==null?!1:t.getTime()<n.getTime(),dateAfter:(t,n)=>n==null?!0:t==null?!1:(t.setHours(0,0,0,0),t.getTime()>n.getTime())};register(t,n){this.filters[t]=n}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),qp=(()=>{class e{messageSource=new ue;clearSource=new ue;messageObserver=this.messageSource.asObservable();clearObserver=this.clearSource.asObservable();add(t){t&&this.messageSource.next(t)}addAll(t){t&&t.length&&this.messageSource.next(t)}clear(t){this.clearSource.next(t||null)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})(),Yp=(()=>{class e{clickSource=new ue;clickObservable=this.clickSource.asObservable();add(t){t&&this.clickSource.next(t)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Zp=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=U({type:e,selectors:[["p-header"]],standalone:!1,ngContentSelectors:Wr,decls:1,vars:0,template:function(n,o){n&1&&(dt(),ht(0))},encapsulation:2})}return e})(),Xp=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=U({type:e,selectors:[["p-footer"]],standalone:!1,ngContentSelectors:Wr,decls:1,vars:0,template:function(n,o){n&1&&(dt(),ht(0))},encapsulation:2})}return e})(),tt=(()=>{class e{template;type;name;constructor(t){this.template=t}getType(){return this.name}static \u0275fac=function(n){return new(n||e)(E(Ct))};static \u0275dir=A({type:e,selectors:[["","pTemplate",""]],inputs:{type:"type",name:[0,"pTemplate","name"]}})}return e})(),Q=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[fe]})}return e})(),Qp=(()=>{class e{static STARTS_WITH="startsWith";static CONTAINS="contains";static NOT_CONTAINS="notContains";static ENDS_WITH="endsWith";static EQUALS="equals";static NOT_EQUALS="notEquals";static NO_FILTER="noFilter";static LT="lt";static LTE="lte";static GT="gt";static GTE="gte";static IS="is";static IS_NOT="isNot";static BEFORE="before";static AFTER="after";static CLEAR="clear";static APPLY="apply";static MATCH_ALL="matchAll";static MATCH_ANY="matchAny";static ADD_RULE="addRule";static REMOVE_RULE="removeRule";static ACCEPT="accept";static REJECT="reject";static CHOOSE="choose";static UPLOAD="upload";static CANCEL="cancel";static PENDING="pending";static FILE_SIZE_TYPES="fileSizeTypes";static DAY_NAMES="dayNames";static DAY_NAMES_SHORT="dayNamesShort";static DAY_NAMES_MIN="dayNamesMin";static MONTH_NAMES="monthNames";static MONTH_NAMES_SHORT="monthNamesShort";static FIRST_DAY_OF_WEEK="firstDayOfWeek";static TODAY="today";static WEEK_HEADER="weekHeader";static WEAK="weak";static MEDIUM="medium";static STRONG="strong";static PASSWORD_PROMPT="passwordPrompt";static EMPTY_MESSAGE="emptyMessage";static EMPTY_FILTER_MESSAGE="emptyFilterMessage";static SHOW_FILTER_MENU="showFilterMenu";static HIDE_FILTER_MENU="hideFilterMenu";static SELECTION_MESSAGE="selectionMessage";static ARIA="aria";static SELECT_COLOR="selectColor";static BROWSE_FILES="browseFiles"}return e})(),Jp=(()=>{class e{dragStartSource=new ue;dragStopSource=new ue;dragStart$=this.dragStartSource.asObservable();dragStop$=this.dragStopSource.asObservable();startDrag(t){this.dragStartSource.next(t)}stopDrag(t){this.dragStopSource.next(t)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var Bl=Object.defineProperty,Ul=Object.defineProperties,jl=Object.getOwnPropertyDescriptors,ti=Object.getOwnPropertySymbols,Yr=Object.prototype.hasOwnProperty,Zr=Object.prototype.propertyIsEnumerable,Kr=(e,i,t)=>i in e?Bl(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t,B=(e,i)=>{for(var t in i||(i={}))Yr.call(i,t)&&Kr(e,t,i[t]);if(ti)for(var t of ti(i))Zr.call(i,t)&&Kr(e,t,i[t]);return e},Nt=(e,i)=>Ul(e,jl(i)),Ge=(e,i)=>{var t={};for(var n in e)Yr.call(e,n)&&i.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&ti)for(var n of ti(e))i.indexOf(n)<0&&Zr.call(e,n)&&(t[n]=e[n]);return t};var Hl=rr(),ve=Hl;function qr(e,i){Bn(e)?e.push(...i||[]):xe(e)&&Object.assign(e,i)}function zl(e){return xe(e)&&e.hasOwnProperty("value")&&e.hasOwnProperty("type")?e.value:e}function Gl(e){return e.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function Wi(e="",i=""){return Gl(`${et(e,!1)&&et(i,!1)?`${e}-`:e}${i}`)}function Xr(e="",i=""){return`--${Wi(e,i)}`}function Wl(e=""){let i=(e.match(/{/g)||[]).length,t=(e.match(/}/g)||[]).length;return(i+t)%2!==0}function Qr(e,i="",t="",n=[],o){if(et(e)){let r=/{([^}]*)}/g,s=e.trim();if(Wl(s))return;if(be(s,r)){let a=s.replaceAll(r,u=>{let p=u.replace(/{|}/g,"").split(".").filter(h=>!n.some(m=>be(h,m)));return`var(${Xr(t,Un(p.join("-")))}${k(o)?`, ${o}`:""})`}),l=/(\d+\s+[\+\-\*\/]\s+\d+)/g,c=/var\([^)]+\)/g;return be(a.replace(c,"0"),l)?`calc(${a})`:a}return s}else if(dr(e))return e}function Kl(e,i,t){et(i,!1)&&e.push(`${i}:${t};`)}function Lt(e,i){return e?`${e}{${i}}`:""}var cf=e=>{var i;let t=S.getTheme(),n=Ki(t,e,void 0,"variable"),o=(i=n?.match(/--[\w-]+/g))==null?void 0:i[0],r=Ki(t,e,void 0,"value");return{name:o,variable:n,value:r}},Pt=(...e)=>Ki(S.getTheme(),...e),Ki=(e={},i,t,n)=>{if(i){let{variable:o,options:r}=S.defaults||{},{prefix:s,transform:a}=e?.options||r||{},c=be(i,/{([^}]*)}/g)?i:`{${i}}`;return n==="value"||te(n)&&a==="strict"?S.getTokenValue(i):Qr(c,void 0,s,[o.excludedKeyRegex],t)}return""};var ql=(e={})=>{let{preset:i,options:t}=e;return{preset(n){return i=i?gt(i,n):n,this},options(n){return t=t?B(B({},t),n):n,this},primaryPalette(n){let{semantic:o}=i||{};return i=Nt(B({},i),{semantic:Nt(B({},o),{primary:n})}),this},surfacePalette(n){var o,r;let{semantic:s}=i||{},a=n?.hasOwnProperty("light")?n?.light:n,l=n?.hasOwnProperty("dark")?n?.dark:n,c={colorScheme:{light:B(B({},(o=s?.colorScheme)==null?void 0:o.light),!!a&&{surface:a}),dark:B(B({},(r=s?.colorScheme)==null?void 0:r.dark),!!l&&{surface:l})}};return i=Nt(B({},i),{semantic:B(B({},s),c)}),this},define({useDefaultPreset:n=!1,useDefaultOptions:o=!1}={}){return{preset:n?S.getPreset():i,options:o?S.getOptions():t}},update({mergePresets:n=!0,mergeOptions:o=!0}={}){let r={preset:n?gt(S.getPreset(),i):i,options:o?B(B({},S.getOptions()),t):t};return S.setTheme(r),r},use(n){let o=this.define(n);return S.setTheme(o),o}}};function Yl(e,i={}){let t=S.defaults.variable,{prefix:n=t.prefix,selector:o=t.selector,excludedKeyRegex:r=t.excludedKeyRegex}=i,s=(c,u="")=>Object.entries(c).reduce((d,[p,h])=>{let m=be(p,r)?Wi(u):Wi(u,Un(p)),g=zl(h);if(xe(g)){let{variables:b,tokens:x}=s(g,m);qr(d.tokens,x),qr(d.variables,b)}else d.tokens.push((n?m.replace(`${n}-`,""):m).replaceAll("-",".")),Kl(d.variables,Xr(m),Qr(g,m,n,[r]));return d},{variables:[],tokens:[]}),{variables:a,tokens:l}=s(e,n);return{value:a,tokens:l,declarations:a.join(""),css:Lt(o,a.join(""))}}var ke={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(e){return{type:"class",selector:e,matched:this.pattern.test(e.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(e){return{type:"attr",selector:`:root${e}`,matched:this.pattern.test(e.trim())}}},media:{pattern:/^@media (.*)$/,resolve(e){return{type:"media",selector:`${e}{:root{[CSS]}}`,matched:this.pattern.test(e.trim())}}},system:{pattern:/^system$/,resolve(e){return{type:"system",selector:"@media (prefers-color-scheme: dark){:root{[CSS]}}",matched:this.pattern.test(e.trim())}}},custom:{resolve(e){return{type:"custom",selector:e,matched:!0}}}},resolve(e){let i=Object.keys(this.rules).filter(t=>t!=="custom").map(t=>this.rules[t]);return[e].flat().map(t=>{var n;return(n=i.map(o=>o.resolve(t)).find(o=>o.matched))!=null?n:this.rules.custom.resolve(t)})}},_toVariables(e,i){return Yl(e,{prefix:i?.prefix})},getCommon({name:e="",theme:i={},params:t,set:n,defaults:o}){var r,s,a,l,c,u,d;let{preset:p,options:h}=i,m,g,b,x,T,O,j;if(k(p)&&h.transform!=="strict"){let{primitive:Te,semantic:_e,extend:Ke}=p,qe=_e||{},{colorScheme:dn}=qe,hn=Ge(qe,["colorScheme"]),pn=Ke||{},{colorScheme:fn}=pn,jt=Ge(pn,["colorScheme"]),Ht=dn||{},{dark:gn}=Ht,mn=Ge(Ht,["dark"]),bn=fn||{},{dark:yn}=bn,vn=Ge(bn,["dark"]),_n=k(Te)?this._toVariables({primitive:Te},h):{},Dn=k(hn)?this._toVariables({semantic:hn},h):{},Cn=k(mn)?this._toVariables({light:mn},h):{},io=k(gn)?this._toVariables({dark:gn},h):{},oo=k(jt)?this._toVariables({semantic:jt},h):{},ro=k(vn)?this._toVariables({light:vn},h):{},so=k(yn)?this._toVariables({dark:yn},h):{},[Gs,Ws]=[(r=_n.declarations)!=null?r:"",_n.tokens],[Ks,qs]=[(s=Dn.declarations)!=null?s:"",Dn.tokens||[]],[Ys,Zs]=[(a=Cn.declarations)!=null?a:"",Cn.tokens||[]],[Xs,Qs]=[(l=io.declarations)!=null?l:"",io.tokens||[]],[Js,ea]=[(c=oo.declarations)!=null?c:"",oo.tokens||[]],[ta,na]=[(u=ro.declarations)!=null?u:"",ro.tokens||[]],[ia,oa]=[(d=so.declarations)!=null?d:"",so.tokens||[]];m=this.transformCSS(e,Gs,"light","variable",h,n,o),g=Ws;let ra=this.transformCSS(e,`${Ks}${Ys}`,"light","variable",h,n,o),sa=this.transformCSS(e,`${Xs}`,"dark","variable",h,n,o);b=`${ra}${sa}`,x=[...new Set([...qs,...Zs,...Qs])];let aa=this.transformCSS(e,`${Js}${ta}color-scheme:light`,"light","variable",h,n,o),la=this.transformCSS(e,`${ia}color-scheme:dark`,"dark","variable",h,n,o);T=`${aa}${la}`,O=[...new Set([...ea,...na,...oa])],j=Se(p.css,{dt:Pt})}return{primitive:{css:m,tokens:g},semantic:{css:b,tokens:x},global:{css:T,tokens:O},style:j}},getPreset({name:e="",preset:i={},options:t,params:n,set:o,defaults:r,selector:s}){var a,l,c;let u,d,p;if(k(i)&&t.transform!=="strict"){let h=e.replace("-directive",""),m=i,{colorScheme:g,extend:b,css:x}=m,T=Ge(m,["colorScheme","extend","css"]),O=b||{},{colorScheme:j}=O,Te=Ge(O,["colorScheme"]),_e=g||{},{dark:Ke}=_e,qe=Ge(_e,["dark"]),dn=j||{},{dark:hn}=dn,pn=Ge(dn,["dark"]),fn=k(T)?this._toVariables({[h]:B(B({},T),Te)},t):{},jt=k(qe)?this._toVariables({[h]:B(B({},qe),pn)},t):{},Ht=k(Ke)?this._toVariables({[h]:B(B({},Ke),hn)},t):{},[gn,mn]=[(a=fn.declarations)!=null?a:"",fn.tokens||[]],[bn,yn]=[(l=jt.declarations)!=null?l:"",jt.tokens||[]],[vn,_n]=[(c=Ht.declarations)!=null?c:"",Ht.tokens||[]],Dn=this.transformCSS(h,`${gn}${bn}`,"light","variable",t,o,r,s),Cn=this.transformCSS(h,vn,"dark","variable",t,o,r,s);u=`${Dn}${Cn}`,d=[...new Set([...mn,...yn,..._n])],p=Se(x,{dt:Pt})}return{css:u,tokens:d,style:p}},getPresetC({name:e="",theme:i={},params:t,set:n,defaults:o}){var r;let{preset:s,options:a}=i,l=(r=s?.components)==null?void 0:r[e];return this.getPreset({name:e,preset:l,options:a,params:t,set:n,defaults:o})},getPresetD({name:e="",theme:i={},params:t,set:n,defaults:o}){var r;let s=e.replace("-directive",""),{preset:a,options:l}=i,c=(r=a?.directives)==null?void 0:r[s];return this.getPreset({name:s,preset:c,options:l,params:t,set:n,defaults:o})},applyDarkColorScheme(e){return!(e.darkModeSelector==="none"||e.darkModeSelector===!1)},getColorSchemeOption(e,i){var t;return this.applyDarkColorScheme(e)?this.regex.resolve(e.darkModeSelector===!0?i.options.darkModeSelector:(t=e.darkModeSelector)!=null?t:i.options.darkModeSelector):[]},getLayerOrder(e,i={},t,n){let{cssLayer:o}=i;return o?`@layer ${Se(o.order||"primeui",t)}`:""},getCommonStyleSheet({name:e="",theme:i={},params:t,props:n={},set:o,defaults:r}){let s=this.getCommon({name:e,theme:i,params:t,set:o,defaults:r}),a=Object.entries(n).reduce((l,[c,u])=>l.push(`${c}="${u}"`)&&l,[]).join(" ");return Object.entries(s||{}).reduce((l,[c,u])=>{if(u?.css){let d=mt(u?.css),p=`${c}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${p}" ${a}>${d}</style>`)}return l},[]).join("")},getStyleSheet({name:e="",theme:i={},params:t,props:n={},set:o,defaults:r}){var s;let a={name:e,theme:i,params:t,set:o,defaults:r},l=(s=e.includes("-directive")?this.getPresetD(a):this.getPresetC(a))==null?void 0:s.css,c=Object.entries(n).reduce((u,[d,p])=>u.push(`${d}="${p}"`)&&u,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${e}-variables" ${c}>${mt(l)}</style>`:""},createTokens(e={},i,t="",n="",o={}){return Object.entries(e).forEach(([r,s])=>{let a=be(r,i.variable.excludedKeyRegex)?t:t?`${t}.${ki(r)}`:ki(r),l=n?`${n}.${r}`:r;xe(s)?this.createTokens(s,i,a,l,o):(o[a]||(o[a]={paths:[],computed(c,u={}){var d,p;return this.paths.length===1?(d=this.paths[0])==null?void 0:d.computed(this.paths[0].scheme,u.binding):c&&c!=="none"?(p=this.paths.find(h=>h.scheme===c))==null?void 0:p.computed(c,u.binding):this.paths.map(h=>h.computed(h.scheme,u[h.scheme]))}}),o[a].paths.push({path:l,value:s,scheme:l.includes("colorScheme.light")?"light":l.includes("colorScheme.dark")?"dark":"none",computed(c,u={}){let d=/{([^}]*)}/g,p=s;if(u.name=this.path,u.binding||(u.binding={}),be(s,d)){let m=s.trim().replaceAll(d,x=>{var T;let O=x.replace(/{|}/g,""),j=(T=o[O])==null?void 0:T.computed(c,u);return Bn(j)&&j.length===2?`light-dark(${j[0].value},${j[1].value})`:j?.value}),g=/(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g,b=/var\([^)]+\)/g;p=be(m.replace(b,"0"),g)?`calc(${m})`:m}return te(u.binding)&&delete u.binding,{colorScheme:c,path:this.path,paths:u,value:p.includes("undefined")?void 0:p}}}))}),o},getTokenValue(e,i,t){var n;let r=(l=>l.split(".").filter(u=>!be(u.toLowerCase(),t.variable.excludedKeyRegex)).join("."))(i),s=i.includes("colorScheme.light")?"light":i.includes("colorScheme.dark")?"dark":void 0,a=[(n=e[r])==null?void 0:n.computed(s)].flat().filter(l=>l);return a.length===1?a[0].value:a.reduce((l={},c)=>{let u=c,{colorScheme:d}=u,p=Ge(u,["colorScheme"]);return l[d]=p,l},void 0)},getSelectorRule(e,i,t,n){return t==="class"||t==="attr"?Lt(k(i)?`${e}${i},${e} ${i}`:e,n):Lt(e,k(i)?Lt(i,n):n)},transformCSS(e,i,t,n,o={},r,s,a){if(k(i)){let{cssLayer:l}=o;if(n!=="style"){let c=this.getColorSchemeOption(o,s);i=t==="dark"?c.reduce((u,{type:d,selector:p})=>(k(p)&&(u+=p.includes("[CSS]")?p.replace("[CSS]",i):this.getSelectorRule(p,a,d,i)),u),""):Lt(a??":root",i)}if(l){let c={name:"primeui",order:"primeui"};xe(l)&&(c.name=Se(l.name,{name:e,type:n})),k(c.name)&&(i=Lt(`@layer ${c.name}`,i),r?.layerNames(c.name))}return i}return""}},S={defaults:{variable:{prefix:"p",selector:":root",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(e={}){let{theme:i}=e;i&&(this._theme=Nt(B({},i),{options:B(B({},this.defaults.options),i.options)}),this._tokens=ke.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var e;return((e=this.theme)==null?void 0:e.preset)||{}},get options(){var e;return((e=this.theme)==null?void 0:e.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(e){this.update({theme:e}),ve.emit("theme:change",e)},getPreset(){return this.preset},setPreset(e){this._theme=Nt(B({},this.theme),{preset:e}),this._tokens=ke.createTokens(e,this.defaults),this.clearLoadedStyleNames(),ve.emit("preset:change",e),ve.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(e){this._theme=Nt(B({},this.theme),{options:e}),this.clearLoadedStyleNames(),ve.emit("options:change",e),ve.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(e){this._layerNames.add(e)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(e){return this._loadedStyleNames.has(e)},setLoadedStyleName(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(e){return ke.getTokenValue(this.tokens,e,this.defaults)},getCommon(e="",i){return ke.getCommon({name:e,theme:this.theme,params:i,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(e="",i){let t={name:e,theme:this.theme,params:i,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return ke.getPresetC(t)},getDirective(e="",i){let t={name:e,theme:this.theme,params:i,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return ke.getPresetD(t)},getCustomPreset(e="",i,t,n){let o={name:e,preset:i,options:this.options,selector:t,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return ke.getPreset(o)},getLayerOrderCSS(e=""){return ke.getLayerOrder(e,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(e="",i,t="style",n){return ke.transformCSS(e,i,n,t,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(e="",i,t={}){return ke.getCommonStyleSheet({name:e,theme:this.theme,params:i,props:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(e,i,t={}){return ke.getStyleSheet({name:e,theme:this.theme,params:i,props:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(e){this._loadingStyles.add(e)},onStyleUpdated(e){this._loadingStyles.add(e)},onStyleLoaded(e,{name:i}){this._loadingStyles.size&&(this._loadingStyles.delete(i),ve.emit(`theme:${i}:load`,e),!this._loadingStyles.size&&ve.emit("theme:load"))}};function hf(...e){let i=gt(S.getPreset(),...e);return S.setPreset(i),i}function pf(e){return ql().surfacePalette(e).update().preset}var Zl=0,Jr=(()=>{class e{document=f(ce);use(t,n={}){let o=!1,r=t,s=null,{immediate:a=!0,manual:l=!1,name:c=`style_${++Zl}`,id:u=void 0,media:d=void 0,nonce:p=void 0,first:h=!1,props:m={}}=n;if(this.document){if(s=this.document.querySelector(`style[data-primeng-style-id="${c}"]`)||u&&this.document.getElementById(u)||this.document.createElement("style"),!s.isConnected){r=t,Pn(s,{type:"text/css",media:d,nonce:p});let g=this.document.head;h&&g.firstChild?g.insertBefore(s,g.firstChild):g.appendChild(s),or(s,"data-primeng-style-id",c)}return s.textContent!==r&&(s.textContent=r),{id:u,name:c,el:s,css:r}}}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var $t={_loadedStyleNames:new Set,getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(e){return this._loadedStyleNames.has(e)},setLoadedStyleName(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames(){this._loadedStyleNames.clear()}},Xl=({dt:e})=>`
*,
::before,
::after {
    box-sizing: border-box;
}

/* Non ng overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* NG based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${e("disabled.opacity")};
}

.pi {
    font-size: ${e("icon.size")};
}

.p-icon {
    width: ${e("icon.size")};
    height: ${e("icon.size")};
}

.p-unselectable-text {
    user-select: none;
}

.p-overlay-mask {
    background: ${e("mask.background")};
    color: ${e("mask.color")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${e("mask.transition.duration")} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${e("mask.transition.duration")} forwards;
}
/* Temporarily disabled, distrupts PrimeNG overlay animations */
/* @keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${e("mask.background")};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${e("mask.background")};
    }
    to {
        background: transparent;
    }
}*/

.p-iconwrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`,Ql=({dt:e})=>`
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${e("scrollbar.width")};
}

/* @todo move to baseiconstyle.ts */

.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,G=(()=>{class e{name="base";useStyle=f(Jr);theme=void 0;css=void 0;classes={};inlineStyles={};load=(t,n={},o=r=>r)=>{let r=o(Se(t,{dt:Pt}));return r?this.useStyle.use(mt(r),C({name:this.name},n)):{}};loadCSS=(t={})=>this.load(this.css,t);loadTheme=(t={},n="")=>this.load(this.theme,t,(o="")=>S.transformCSS(t.name||this.name,`${o}${n}`));loadGlobalCSS=(t={})=>this.load(Ql,t);loadGlobalTheme=(t={},n="")=>this.load(Xl,t,(o="")=>S.transformCSS(t.name||this.name,`${o}${n}`));getCommonTheme=t=>S.getCommon(this.name,t);getComponentTheme=t=>S.getComponent(this.name,t);getDirectiveTheme=t=>S.getDirective(this.name,t);getPresetTheme=(t,n,o)=>S.getCustomPreset(this.name,t,n,o);getLayerOrderThemeCSS=()=>S.getLayerOrderCSS(this.name);getStyleSheet=(t="",n={})=>{if(this.css){let o=Se(this.css,{dt:Pt}),r=mt(`${o}${t}`),s=Object.entries(n).reduce((a,[l,c])=>a.push(`${l}="${c}"`)&&a,[]).join(" ");return`<style type="text/css" data-primeng-style-id="${this.name}" ${s}>${r}</style>`}return""};getCommonThemeStyleSheet=(t,n={})=>S.getCommonStyleSheet(this.name,t,n);getThemeStyleSheet=(t,n={})=>{let o=[S.getStyleSheet(this.name,t,n)];if(this.theme){let r=this.name==="base"?"global-style":`${this.name}-style`,s=Se(this.theme,{dt:Pt}),a=mt(S.transformCSS(r,s)),l=Object.entries(n).reduce((c,[u,d])=>c.push(`${u}="${d}"`)&&c,[]).join(" ");o.push(`<style type="text/css" data-primeng-style-id="${r}" ${l}>${a}</style>`)}return o.join("")};static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Jl=(()=>{class e{theme=ge(void 0);csp=ge({nonce:void 0});isThemeChanged=!1;document=f(ce);baseStyle=f(G);constructor(){Wt(()=>{ve.on("theme:change",t=>{Le(()=>{this.isThemeChanged=!0,this.theme.set(t)})})}),Wt(()=>{let t=this.theme();this.document&&t&&(this.isThemeChanged||this.onThemeChange(t),this.isThemeChanged=!1)})}ngOnDestroy(){S.clearLoadedStyleNames(),ve.clear()}onThemeChange(t){S.setTheme(t),this.document&&this.loadCommonTheme()}loadCommonTheme(){if(this.theme()!=="none"&&!S.isStyleNameLoaded("common")){let{primitive:t,semantic:n,global:o,style:r}=this.baseStyle.getCommonTheme?.()||{},s={nonce:this.csp?.()?.nonce};this.baseStyle.load(t?.css,C({name:"primitive-variables"},s)),this.baseStyle.load(n?.css,C({name:"semantic-variables"},s)),this.baseStyle.load(o?.css,C({name:"global-variables"},s)),this.baseStyle.loadGlobalTheme(C({name:"global-style"},s),r),S.setLoadedStyleName("common")}}setThemeConfig(t){let{theme:n,csp:o}=t||{};n&&this.theme.set(n),o&&this.csp.set(o)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),qi=(()=>{class e extends Jl{ripple=ge(!1);platformId=f(st);inputStyle=ge(null);inputVariant=ge(null);overlayOptions={};csp=ge({nonce:void 0});filterMatchModeOptions={text:[ne.STARTS_WITH,ne.CONTAINS,ne.NOT_CONTAINS,ne.ENDS_WITH,ne.EQUALS,ne.NOT_EQUALS],numeric:[ne.EQUALS,ne.NOT_EQUALS,ne.LESS_THAN,ne.LESS_THAN_OR_EQUAL_TO,ne.GREATER_THAN,ne.GREATER_THAN_OR_EQUAL_TO],date:[ne.DATE_IS,ne.DATE_IS_NOT,ne.DATE_BEFORE,ne.DATE_AFTER]};translation={startsWith:"Starts with",contains:"Contains",notContains:"Not contains",endsWith:"Ends with",equals:"Equals",notEquals:"Not equals",noFilter:"No Filter",lt:"Less than",lte:"Less than or equal to",gt:"Greater than",gte:"Greater than or equal to",is:"Is",isNot:"Is not",before:"Before",after:"After",dateIs:"Date is",dateIsNot:"Date is not",dateBefore:"Date is before",dateAfter:"Date is after",clear:"Clear",apply:"Apply",matchAll:"Match All",matchAny:"Match Any",addRule:"Add Rule",removeRule:"Remove Rule",accept:"Yes",reject:"No",choose:"Choose",upload:"Upload",cancel:"Cancel",pending:"Pending",fileSizeTypes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],chooseYear:"Choose Year",chooseMonth:"Choose Month",chooseDate:"Choose Date",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",prevHour:"Previous Hour",nextHour:"Next Hour",prevMinute:"Previous Minute",nextMinute:"Next Minute",prevSecond:"Previous Second",nextSecond:"Next Second",am:"am",pm:"pm",dateFormat:"mm/dd/yy",firstDayOfWeek:0,today:"Today",weekHeader:"Wk",weak:"Weak",medium:"Medium",strong:"Strong",passwordPrompt:"Enter a password",emptyMessage:"No results found",searchMessage:"Search results are available",selectionMessage:"{0} items selected",emptySelectionMessage:"No selected item",emptySearchMessage:"No results found",emptyFilterMessage:"No results found",fileChosenMessage:"Files",noFileChosenMessage:"No file chosen",aria:{trueLabel:"True",falseLabel:"False",nullLabel:"Not Selected",star:"1 star",stars:"{star} stars",selectAll:"All items selected",unselectAll:"All items unselected",close:"Close",previous:"Previous",next:"Next",navigation:"Navigation",scrollTop:"Scroll Top",moveTop:"Move Top",moveUp:"Move Up",moveDown:"Move Down",moveBottom:"Move Bottom",moveToTarget:"Move to Target",moveToSource:"Move to Source",moveAllToTarget:"Move All to Target",moveAllToSource:"Move All to Source",pageLabel:"{page}",firstPageLabel:"First Page",lastPageLabel:"Last Page",nextPageLabel:"Next Page",prevPageLabel:"Previous Page",rowsPerPageLabel:"Rows per page",previousPageLabel:"Previous Page",jumpToPageDropdownLabel:"Jump to Page Dropdown",jumpToPageInputLabel:"Jump to Page Input",selectRow:"Row Selected",unselectRow:"Row Unselected",expandRow:"Row Expanded",collapseRow:"Row Collapsed",showFilterMenu:"Show Filter Menu",hideFilterMenu:"Hide Filter Menu",filterOperator:"Filter Operator",filterConstraint:"Filter Constraint",editRow:"Row Edit",saveEdit:"Save Edit",cancelEdit:"Cancel Edit",listView:"List View",gridView:"Grid View",slide:"Slide",slideNumber:"{slideNumber}",zoomImage:"Zoom Image",zoomIn:"Zoom In",zoomOut:"Zoom Out",rotateRight:"Rotate Right",rotateLeft:"Rotate Left",listLabel:"Option List",selectColor:"Select a color",removeLabel:"Remove",browseFiles:"Browse Files",maximizeLabel:"Maximize"}};zIndex={modal:1100,overlay:1e3,menu:1e3,tooltip:1100};translationSource=new ue;translationObserver=this.translationSource.asObservable();getTranslation(t){return this.translation[t]}setTranslation(t){this.translation=C(C({},this.translation),t),this.translationSource.next(this.translation)}setConfig(t){let{csp:n,ripple:o,inputStyle:r,inputVariant:s,theme:a,overlayOptions:l,translation:c,filterMatchModeOptions:u}=t||{};n&&this.csp.set(n),o&&this.ripple.set(o),r&&this.inputStyle.set(r),s&&this.inputVariant.set(s),l&&(this.overlayOptions=l),c&&this.setTranslation(c),u&&(this.filterMatchModeOptions=u),a&&this.setThemeConfig({theme:a,csp:n})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),ec=new M("PRIME_NG_CONFIG");function Lf(...e){let i=e?.map(n=>({provide:ec,useValue:n,multi:!1})),t=Eo(()=>{let n=f(qi);e?.forEach(o=>n.setConfig(o))});return Sn([...i,t])}var ls=(()=>{class e{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,n){this._renderer=t,this._elementRef=n}setProperty(t,n){this._renderer.setProperty(this._elementRef.nativeElement,t,n)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(n){return new(n||e)(E(Re),E(Ee))};static \u0275dir=A({type:e})}return e})(),cs=(()=>{class e extends ls{static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,features:[w]})}return e})(),We=new M("");var tc={provide:We,useExisting:Ce(()=>us),multi:!0};function nc(){let e=bt()?bt().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}var ic=new M(""),us=(()=>{class e extends ls{_compositionMode;_composing=!1;constructor(t,n,o){super(t,n),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!nc())}writeValue(t){let n=t??"";this.setProperty("value",n)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(n){return new(n||e)(E(Re),E(Ee),E(ic,8))};static \u0275dir=A({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,o){n&1&&me("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[L([tc]),w]})}return e})();function oc(e){return e==null||rc(e)===0}function rc(e){return e==null?null:Array.isArray(e)||typeof e=="string"?e.length:e instanceof Set?e.size:null}var Ji=new M(""),sc=new M("");function ac(e){return i=>{if(i.value==null||e==null)return null;let t=parseFloat(i.value);return!isNaN(t)&&t<e?{min:{min:e,actual:i.value}}:null}}function lc(e){return oc(e.value)?{required:!0}:null}function es(e){return null}function ds(e){return e!=null}function hs(e){return pi(e)?wn(e):e}function ps(e){let i={};return e.forEach(t=>{i=t!=null?C(C({},i),t):i}),Object.keys(i).length===0?null:i}function fs(e,i){return i.map(t=>t(e))}function cc(e){return!e.validate}function gs(e){return e.map(i=>cc(i)?i:t=>i.validate(t))}function uc(e){if(!e)return null;let i=e.filter(ds);return i.length==0?null:function(t){return ps(fs(t,i))}}function ms(e){return e!=null?uc(gs(e)):null}function dc(e){if(!e)return null;let i=e.filter(ds);return i.length==0?null:function(t){let n=fs(t,i).map(hs);return ao(n).pipe(rt(ps))}}function bs(e){return e!=null?dc(gs(e)):null}function ts(e,i){return e===null?[i]:Array.isArray(e)?[...e,i]:[e,i]}function hc(e){return e._rawValidators}function pc(e){return e._rawAsyncValidators}function Yi(e){return e?Array.isArray(e)?e:[e]:[]}function ii(e,i){return Array.isArray(e)?e.includes(i):e===i}function ns(e,i){let t=Yi(i);return Yi(e).forEach(o=>{ii(t,o)||t.push(o)}),t}function is(e,i){return Yi(i).filter(t=>!ii(e,t))}var oi=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(i){this._rawValidators=i||[],this._composedValidatorFn=ms(this._rawValidators)}_setAsyncValidators(i){this._rawAsyncValidators=i||[],this._composedAsyncValidatorFn=bs(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(i){this._onDestroyCallbacks.push(i)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(i=>i()),this._onDestroyCallbacks=[]}reset(i=void 0){this.control&&this.control.reset(i)}hasError(i,t){return this.control?this.control.hasError(i,t):!1}getError(i,t){return this.control?this.control.getError(i,t):null}},Zi=class extends oi{name;get formDirective(){return null}get path(){return null}},vt=class extends oi{_parent=null;name=null;valueAccessor=null},Xi=class{_cd;constructor(i){this._cd=i}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},fc={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},Jf=Fe(C({},fc),{"[class.ng-submitted]":"isSubmitted"}),ys=(()=>{class e extends Xi{constructor(t){super(t)}static \u0275fac=function(n){return new(n||e)(E(vt,2))};static \u0275dir=A({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,o){n&2&&we("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[w]})}return e})();var sn="VALID",ni="INVALID",Vt="PENDING",an="DISABLED",Ut=class{},ri=class extends Ut{value;source;constructor(i,t){super(),this.value=i,this.source=t}},ln=class extends Ut{pristine;source;constructor(i,t){super(),this.pristine=i,this.source=t}},cn=class extends Ut{touched;source;constructor(i,t){super(),this.touched=i,this.source=t}},Bt=class extends Ut{status;source;constructor(i,t){super(),this.status=i,this.source=t}};function gc(e){return(si(e)?e.validators:e)||null}function mc(e){return Array.isArray(e)?ms(e):e||null}function bc(e,i){return(si(i)?i.asyncValidators:e)||null}function yc(e){return Array.isArray(e)?bs(e):e||null}function si(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}var Qi=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(i,t){this._assignValidators(i),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(i){this._rawValidators=this._composedValidatorFn=i}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(i){this._rawAsyncValidators=this._composedAsyncValidatorFn=i}get parent(){return this._parent}get status(){return Le(this.statusReactive)}set status(i){Le(()=>this.statusReactive.set(i))}_status=Ve(()=>this.statusReactive());statusReactive=ge(void 0);get valid(){return this.status===sn}get invalid(){return this.status===ni}get pending(){return this.status==Vt}get disabled(){return this.status===an}get enabled(){return this.status!==an}errors;get pristine(){return Le(this.pristineReactive)}set pristine(i){Le(()=>this.pristineReactive.set(i))}_pristine=Ve(()=>this.pristineReactive());pristineReactive=ge(!0);get dirty(){return!this.pristine}get touched(){return Le(this.touchedReactive)}set touched(i){Le(()=>this.touchedReactive.set(i))}_touched=Ve(()=>this.touchedReactive());touchedReactive=ge(!1);get untouched(){return!this.touched}_events=new ue;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(i){this._assignValidators(i)}setAsyncValidators(i){this._assignAsyncValidators(i)}addValidators(i){this.setValidators(ns(i,this._rawValidators))}addAsyncValidators(i){this.setAsyncValidators(ns(i,this._rawAsyncValidators))}removeValidators(i){this.setValidators(is(i,this._rawValidators))}removeAsyncValidators(i){this.setAsyncValidators(is(i,this._rawAsyncValidators))}hasValidator(i){return ii(this._rawValidators,i)}hasAsyncValidator(i){return ii(this._rawAsyncValidators,i)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(i={}){let t=this.touched===!1;this.touched=!0;let n=i.sourceControl??this;this._parent&&!i.onlySelf&&this._parent.markAsTouched(Fe(C({},i),{sourceControl:n})),t&&i.emitEvent!==!1&&this._events.next(new cn(!0,n))}markAllAsTouched(i={}){this.markAsTouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(i))}markAsUntouched(i={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=i.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:n})}),this._parent&&!i.onlySelf&&this._parent._updateTouched(i,n),t&&i.emitEvent!==!1&&this._events.next(new cn(!1,n))}markAsDirty(i={}){let t=this.pristine===!0;this.pristine=!1;let n=i.sourceControl??this;this._parent&&!i.onlySelf&&this._parent.markAsDirty(Fe(C({},i),{sourceControl:n})),t&&i.emitEvent!==!1&&this._events.next(new ln(!1,n))}markAsPristine(i={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=i.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:i.emitEvent})}),this._parent&&!i.onlySelf&&this._parent._updatePristine(i,n),t&&i.emitEvent!==!1&&this._events.next(new ln(!0,n))}markAsPending(i={}){this.status=Vt;let t=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new Bt(this.status,t)),this.statusChanges.emit(this.status)),this._parent&&!i.onlySelf&&this._parent.markAsPending(Fe(C({},i),{sourceControl:t}))}disable(i={}){let t=this._parentMarkedDirty(i.onlySelf);this.status=an,this.errors=null,this._forEachChild(o=>{o.disable(Fe(C({},i),{onlySelf:!0}))}),this._updateValue();let n=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new ri(this.value,n)),this._events.next(new Bt(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Fe(C({},i),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(i={}){let t=this._parentMarkedDirty(i.onlySelf);this.status=sn,this._forEachChild(n=>{n.enable(Fe(C({},i),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent}),this._updateAncestors(Fe(C({},i),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(i,t){this._parent&&!i.onlySelf&&(this._parent.updateValueAndValidity(i),i.skipPristineCheck||this._parent._updatePristine({},t),this._parent._updateTouched({},t))}setParent(i){this._parent=i}getRawValue(){return this.value}updateValueAndValidity(i={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===sn||this.status===Vt)&&this._runAsyncValidator(n,i.emitEvent)}let t=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new ri(this.value,t)),this._events.next(new Bt(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!i.onlySelf&&this._parent.updateValueAndValidity(Fe(C({},i),{sourceControl:t}))}_updateTreeValidity(i={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(i)),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?an:sn}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(i,t){if(this.asyncValidator){this.status=Vt,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1};let n=hs(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:t,shouldHaveEmitted:i})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let i=this._hasOwnPendingAsyncValidator?.emitEvent??!1;return this._hasOwnPendingAsyncValidator=null,i}return!1}setErrors(i,t={}){this.errors=i,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(i){let t=i;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((n,o)=>n&&n._find(o),this)}getError(i,t){let n=t?this.get(t):this;return n&&n.errors?n.errors[i]:null}hasError(i,t){return!!this.getError(i,t)}get root(){let i=this;for(;i._parent;)i=i._parent;return i}_updateControlsErrors(i,t,n){this.status=this._calculateStatus(),i&&this.statusChanges.emit(this.status),(i||n)&&this._events.next(new Bt(this.status,t)),this._parent&&this._parent._updateControlsErrors(i,t,n)}_initObservables(){this.valueChanges=new ee,this.statusChanges=new ee}_calculateStatus(){return this._allControlsDisabled()?an:this.errors?ni:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Vt)?Vt:this._anyControlsHaveStatus(ni)?ni:sn}_anyControlsHaveStatus(i){return this._anyControls(t=>t.status===i)}_anyControlsDirty(){return this._anyControls(i=>i.dirty)}_anyControlsTouched(){return this._anyControls(i=>i.touched)}_updatePristine(i,t){let n=!this._anyControlsDirty(),o=this.pristine!==n;this.pristine=n,this._parent&&!i.onlySelf&&this._parent._updatePristine(i,t),o&&this._events.next(new ln(this.pristine,t))}_updateTouched(i={},t){this.touched=this._anyControlsTouched(),this._events.next(new cn(this.touched,t)),this._parent&&!i.onlySelf&&this._parent._updateTouched(i,t)}_onDisabledChange=[];_registerOnCollectionChange(i){this._onCollectionChange=i}_setUpdateStrategy(i){si(i)&&i.updateOn!=null&&(this._updateOn=i.updateOn)}_parentMarkedDirty(i){let t=this._parent&&this._parent.dirty;return!i&&!!t&&!this._parent._anyControlsDirty()}_find(i){return null}_assignValidators(i){this._rawValidators=Array.isArray(i)?i.slice():i,this._composedValidatorFn=mc(this._rawValidators)}_assignAsyncValidators(i){this._rawAsyncValidators=Array.isArray(i)?i.slice():i,this._composedAsyncValidatorFn=yc(this._rawAsyncValidators)}};var eo=new M("",{providedIn:"root",factory:()=>ai}),ai="always";function vc(e,i){return[...i.path,e]}function _c(e,i,t=ai){Cc(e,i),i.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&i.valueAccessor.setDisabledState?.(e.disabled),Ec(e,i),Sc(e,i),wc(e,i),Dc(e,i)}function os(e,i){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(i)})}function Dc(e,i){if(i.valueAccessor.setDisabledState){let t=n=>{i.valueAccessor.setDisabledState(n)};e.registerOnDisabledChange(t),i._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function Cc(e,i){let t=hc(e);i.validator!==null?e.setValidators(ts(t,i.validator)):typeof t=="function"&&e.setValidators([t]);let n=pc(e);i.asyncValidator!==null?e.setAsyncValidators(ts(n,i.asyncValidator)):typeof n=="function"&&e.setAsyncValidators([n]);let o=()=>e.updateValueAndValidity();os(i._rawValidators,o),os(i._rawAsyncValidators,o)}function Ec(e,i){i.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&vs(e,i)})}function wc(e,i){i.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&vs(e,i),e.updateOn!=="submit"&&e.markAsTouched()})}function vs(e,i){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),i.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function Sc(e,i){let t=(n,o)=>{i.valueAccessor.writeValue(n),o&&i.viewToModelUpdate(n)};e.registerOnChange(t),i._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Ac(e,i){if(!e.hasOwnProperty("model"))return!1;let t=e.model;return t.isFirstChange()?!0:!Object.is(i,t.currentValue)}function Tc(e){return Object.getPrototypeOf(e.constructor)===cs}function Fc(e,i){if(!i)return null;Array.isArray(i);let t,n,o;return i.forEach(r=>{r.constructor===us?t=r:Tc(r)?n=r:o=r}),o||n||t||null}function rs(e,i){let t=e.indexOf(i);t>-1&&e.splice(t,1)}function ss(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var Ic=class extends Qi{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(i=null,t,n){super(gc(t),bc(n,t)),this._applyFormState(i),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),si(t)&&(t.nonNullable||t.initialValueIsDefault)&&(ss(i)?this.defaultValue=i.value:this.defaultValue=i)}setValue(i,t={}){this.value=this._pendingValue=i,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(i,t={}){this.setValue(i,t)}reset(i=this.defaultValue,t={}){this._applyFormState(i),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),this._pendingChange=!1}_updateValue(){}_anyControls(i){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(i){this._onChange.push(i)}_unregisterOnChange(i){rs(this._onChange,i)}registerOnDisabledChange(i){this._onDisabledChange.push(i)}_unregisterOnDisabledChange(i){rs(this._onDisabledChange,i)}_forEachChild(i){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(i){ss(i)?(this.value=this._pendingValue=i.value,i.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=i}};var xc={provide:vt,useExisting:Ce(()=>un)},as=Promise.resolve(),un=(()=>{class e extends vt{_changeDetectorRef;callSetDisabledState;control=new Ic;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new ee;constructor(t,n,o,r,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=t,this._setValidators(n),this._setAsyncValidators(o),this.valueAccessor=Fc(this,r)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let n=t.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),Ac(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){_c(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){as.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let n=t.isDisabled.currentValue,o=n!==0&&v(n);as.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?vc(t,this._parent):[t]}static \u0275fac=function(n){return new(n||e)(E(Zi,9),E(Ji,10),E(sc,10),E(We,10),E(pt,8),E(eo,8))};static \u0275dir=A({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[L([xc]),w,ae]})}return e})();var Oc={provide:We,useExisting:Ce(()=>Mc),multi:!0},Mc=(()=>{class e extends cs{writeValue(t){let n=t??"";this.setProperty("value",n)}registerOnChange(t){this.onChange=n=>{t(n==""?null:parseFloat(n))}}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(n,o){n&1&&me("input",function(s){return o.onChange(s.target.value)})("blur",function(){return o.onTouched()})},standalone:!1,features:[L([Oc]),w]})}return e})();var kc=new M("");function Rc(e){return typeof e=="number"?e:parseFloat(e)}var _s=(()=>{class e{_validator=es;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let n=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):es,this._onChange&&this._onChange()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static \u0275fac=function(n){return new(n||e)};static \u0275dir=A({type:e,features:[ae]})}return e})();var Lc={provide:Ji,useExisting:Ce(()=>Nc),multi:!0},Nc=(()=>{class e extends _s{min;inputName="min";normalizeInput=t=>Rc(t);createValidator=t=>ac(t);static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(n,o){n&2&&I("min",o._enabled?o.min:null)},inputs:{min:"min"},standalone:!1,features:[L([Lc]),w]})}return e})(),Pc={provide:Ji,useExisting:Ce(()=>$c),multi:!0};var $c=(()=>{class e extends _s{required;inputName="required";normalizeInput=v;createValidator=t=>lc;enabled(t){return t}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(n,o){n&2&&I("required",o._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[L([Pc]),w]})}return e})();var Ds=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({})}return e})();var Cs=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:eo,useValue:t.callSetDisabledState??ai}]}}static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[Ds]})}return e})(),tg=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:kc,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:eo,useValue:t.callSetDisabledState??ai}]}}static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[Ds]})}return e})();var ws=(()=>{class e extends G{name="common";static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),K=(()=>{class e{document=f(ce);platformId=f(st);el=f(Ee);injector=f(zt);cd=f(pt);renderer=f(Re);config=f(qi);baseComponentStyle=f(ws);baseStyle=f(G);scopedStyleEl;rootEl;dt;get styleOptions(){return{nonce:this.config?.csp().nonce}}get _name(){return this.constructor.name.replace(/^_/,"").toLowerCase()}get componentStyle(){return this._componentStyle}attrSelector=Qt("pc");themeChangeListeners=[];_getHostInstance(t){if(t)return t?this.hostName?t.name===this.hostName?t:this._getHostInstance(t.parentInstance):t.parentInstance:void 0}_getOptionValue(t,n="",o={}){return Vn(t,n,o)}ngOnInit(){this.document&&this._loadStyles()}ngAfterViewInit(){this.rootEl=this.el?.nativeElement,this.rootEl&&this.rootEl?.setAttribute(this.attrSelector,"")}ngOnChanges(t){if(this.document&&!bi(this.platformId)){let{dt:n}=t;n&&n.currentValue&&(this._loadScopedThemeStyles(n.currentValue),this._themeChangeListener(()=>this._loadScopedThemeStyles(n.currentValue)))}}ngOnDestroy(){this._unloadScopedThemeStyles(),this.themeChangeListeners.forEach(t=>ve.off("theme:change",t))}_loadStyles(){let t=()=>{$t.isStyleNameLoaded("base")||(this.baseStyle.loadGlobalCSS(this.styleOptions),$t.setLoadedStyleName("base")),this._loadThemeStyles()};t(),this._themeChangeListener(()=>t())}_loadCoreStyles(){!$t.isStyleNameLoaded("base")&&this._name&&(this.baseComponentStyle.loadCSS(this.styleOptions),this.componentStyle&&this.componentStyle?.loadCSS(this.styleOptions),$t.setLoadedStyleName(this.componentStyle?.name))}_loadThemeStyles(){if(!S.isStyleNameLoaded("common")){let{primitive:t,semantic:n,global:o,style:r}=this.componentStyle?.getCommonTheme?.()||{};this.baseStyle.load(t?.css,C({name:"primitive-variables"},this.styleOptions)),this.baseStyle.load(n?.css,C({name:"semantic-variables"},this.styleOptions)),this.baseStyle.load(o?.css,C({name:"global-variables"},this.styleOptions)),this.baseStyle.loadGlobalTheme(C({name:"global-style"},this.styleOptions),r),S.setLoadedStyleName("common")}if(!S.isStyleNameLoaded(this.componentStyle?.name)&&this.componentStyle?.name){let{css:t,style:n}=this.componentStyle?.getComponentTheme?.()||{};this.componentStyle?.load(t,C({name:`${this.componentStyle?.name}-variables`},this.styleOptions)),this.componentStyle?.loadTheme(C({name:`${this.componentStyle?.name}-style`},this.styleOptions),n),S.setLoadedStyleName(this.componentStyle?.name)}if(!S.isStyleNameLoaded("layer-order")){let t=this.componentStyle?.getLayerOrderThemeCSS?.();this.baseStyle.load(t,C({name:"layer-order",first:!0},this.styleOptions)),S.setLoadedStyleName("layer-order")}this.dt&&(this._loadScopedThemeStyles(this.dt),this._themeChangeListener(()=>this._loadScopedThemeStyles(this.dt)))}_loadScopedThemeStyles(t){let{css:n}=this.componentStyle?.getPresetTheme?.(t,`[${this.attrSelector}]`)||{},o=this.componentStyle?.load(n,C({name:`${this.attrSelector}-${this.componentStyle?.name}`},this.styleOptions));this.scopedStyleEl=o?.el}_unloadScopedThemeStyles(){this.scopedStyleEl?.remove()}_themeChangeListener(t=()=>{}){$t.clearLoadedStyleNames(),ve.on("theme:change",t),this.themeChangeListeners.push(t)}cx(t,n){let o=this.parent?this.parent.componentStyle?.classes?.[t]:this.componentStyle?.classes?.[t];return typeof o=="function"?o({instance:this}):typeof o=="string"?o:t}sx(t){let n=this.componentStyle?.inlineStyles?.[t];return typeof n=="function"?n({instance:this}):typeof n=="string"?n:C({},n)}get parent(){return this.parentInstance}static \u0275fac=function(n){return new(n||e)};static \u0275dir=A({type:e,inputs:{dt:"dt"},features:[L([ws,G]),ae]})}return e})();var Vc=({dt:e})=>`
/* For PrimeNG */
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: ${e("ripple.background")};
    border-radius: 100%;
    transform: scale(0);
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

.p-ripple-disabled .p-ink {
    display: none !important;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`,Bc={root:"p-ink"},Ss=(()=>{class e extends G{name="ripple";theme=Vc;classes=Bc;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var li=(()=>{class e extends K{zone=f(An);_componentStyle=f(Ss);animationListener;mouseDownListener;timeout;constructor(){super(),Wt(()=>{qt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}ngAfterViewInit(){super.ngAfterViewInit()}onMouseDown(t){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(ft(n,"p-ink-active"),!Ii(n)&&!Oi(n)){let a=Math.max(Ti(this.el.nativeElement),$n(this.el.nativeElement));n.style.height=a+"px",n.style.width=a+"px"}let o=xi(this.el.nativeElement),r=t.pageX-o.left+this.document.body.scrollTop-Oi(n)/2,s=t.pageY-o.top+this.document.body.scrollLeft-Ii(n)/2;this.renderer.setStyle(n,"top",s+"px"),this.renderer.setStyle(n,"left",r+"px"),Qe(n,"p-ink-active"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&ft(a,"p-ink-active")},401)}getInk(){let t=this.el.nativeElement.children;for(let n=0;n<t.length;n++)if(typeof t[n].className=="string"&&t[n].className.indexOf("p-ink")!==-1)return t[n];return null}resetInk(){let t=this.getInk();t&&ft(t,"p-ink-active")}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),ft(t.currentTarget,"p-ink-active")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,ir(t))}ngOnDestroy(){this.config&&this.config.ripple()&&this.remove(),super.ngOnDestroy()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=A({type:e,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[L([Ss]),w]})}return e})(),Cg=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({})}return e})();var jc=["icon"],Hc=["content"],Ts=e=>({$implicit:e}),zc=(e,i)=>({"p-togglebutton-icon":!0,"p-togglebutton-icon-left":e,"p-togglebutton-icon-right":i});function Gc(e,i){e&1&&ut(0)}function Wc(e,i){if(e&1&&Z(0,"span",0),e&2){let t=V(3);J(t.checked?t.onIcon:t.offIcon),D("ngClass",xn(4,zc,t.iconPos==="left",t.iconPos==="right")),I("data-pc-section","icon")}}function Kc(e,i){if(e&1&&W(0,Wc,1,7,"span",2),e&2){let t=V(2);Et(t.onIcon||t.offIcon?0:-1)}}function qc(e,i){e&1&&ut(0)}function Yc(e,i){if(e&1&&W(0,qc,1,0,"ng-container",1),e&2){let t=V(2);D("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",Xe(2,Ts,t.checked))}}function Zc(e,i){if(e&1&&(W(0,Kc,1,1)(1,Yc,1,4,"ng-container"),q(2,"span",0),wt(3),Y()),e&2){let t=V();Et(t.iconTemplate?1:0),F(2),D("ngClass",t.cx("label")),I("data-pc-section","label"),F(),St(t.checked?t.hasOnLabel?t.onLabel:"\xA0":t.hasOffLabel?t.offLabel:"\xA0")}}var Xc=({dt:e})=>`
.p-togglebutton {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    color: ${e("togglebutton.color")};
    background: ${e("togglebutton.background")};
    border: 1px solid ${e("togglebutton.border.color")};
    padding: ${e("togglebutton.padding")};
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background ${e("togglebutton.transition.duration")}, color ${e("togglebutton.transition.duration")}, border-color ${e("togglebutton.transition.duration")},
        outline-color ${e("togglebutton.transition.duration")}, box-shadow ${e("togglebutton.transition.duration")};
    border-radius: ${e("togglebutton.border.radius")};
    outline-color: transparent;
    font-weight: ${e("togglebutton.font.weight")};
}

.p-togglebutton-content {
    display: inline-flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    gap: ${e("togglebutton.gap")};
    padding: ${e("togglebutton.content.padding")};
    background: transparent;
    border-radius: ${e("togglebutton.content.border.radius")};
    transition: background ${e("togglebutton.transition.duration")}, color ${e("togglebutton.transition.duration")}, border-color ${e("togglebutton.transition.duration")},
            outline-color ${e("togglebutton.transition.duration")}, box-shadow ${e("togglebutton.transition.duration")};
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
    background: ${e("togglebutton.hover.background")};
    color: ${e("togglebutton.hover.color")};
}

.p-togglebutton.p-togglebutton-checked {
    background: ${e("togglebutton.checked.background")};
    border-color: ${e("togglebutton.checked.border.color")};
    color: ${e("togglebutton.checked.color")};
}

.p-togglebutton-checked .p-togglebutton-content {
    background: ${e("togglebutton.content.checked.background")};
    box-shadow: ${e("togglebutton.content.checked.shadow")};
}

.p-togglebutton:focus-visible {
    box-shadow: ${e("togglebutton.focus.ring.shadow")};
    outline: ${e("togglebutton.focus.ring.width")} ${e("togglebutton.focus.ring.style")} ${e("togglebutton.focus.ring.color")};
    outline-offset: ${e("togglebutton.focus.ring.offset")};
}

.p-togglebutton.p-invalid {
    border-color: ${e("togglebutton.invalid.border.color")};
}

.p-togglebutton:disabled:not(.p-togglebutton-checked) {
    opacity: 1;
    cursor: default;
    background: ${e("togglebutton.disabled.background")};
    border-color: ${e("togglebutton.disabled.border.color")};
    color: ${e("togglebutton.disabled.color")};
}

.p-togglebutton-label,
.p-togglebutton-icon {
    position: relative;
    transition: none;
}

.p-togglebutton-icon {
    color: ${e("togglebutton.icon.color")};
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
    color: ${e("togglebutton.icon.hover.color")};
}

.p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
    color: ${e("togglebutton.icon.checked.color")};
}

.p-togglebutton:disabled .p-togglebutton-icon {
    color: ${e("togglebutton.icon.disabled.color")};
}

.p-togglebutton-sm {
    padding: ${e("togglebutton.sm.padding")};
    font-size: ${e("togglebutton.sm.font.size")};
}

.p-togglebutton-sm .p-togglebutton-content {
    padding: ${e("togglebutton.content.sm.padding")};
}

.p-togglebutton-lg {
    padding: ${e("togglebutton.lg.padding")};
    font-size: ${e("togglebutton.lg.font.size")};
}

.p-togglebutton-lg .p-togglebutton-content {
    padding: ${e("togglebutton.content.lg.padding")};
}

/* For PrimeNG (iconPos) */
.p-togglebutton-icon-right {
    order: 1;
}

.p-togglebutton.ng-invalid.ng-dirty {
    border-color: ${e("togglebutton.invalid.border.color")};
}
`,Qc={root:({instance:e})=>({"p-togglebutton p-component":!0,"p-togglebutton-checked":e.checked,"p-disabled":e.disabled,"p-togglebutton-sm p-inputfield-sm":e.size==="small","p-togglebutton-lg p-inputfield-lg":e.size==="large"}),content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},As=(()=>{class e extends G{name="togglebutton";theme=Xc;classes=Qc;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var Jc={provide:We,useExisting:Ce(()=>ci),multi:!0},ci=(()=>{class e extends K{get hostClass(){return this.styleClass||""}onKeyDown(t){switch(t.code){case"Enter":this.toggle(t),t.preventDefault();break;case"Space":this.toggle(t),t.preventDefault();break}}toggle(t){!this.disabled&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:t,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;disabled;style;styleClass;inputId;tabindex=0;size;iconPos="left";autofocus;allowEmpty;onChange=new ee;iconTemplate;contentTemplate;templates;checked=!1;onModelChange=()=>{};onModelTouched=()=>{};_componentStyle=f(As);onBlur(){this.onModelTouched()}writeValue(t){this.checked=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.onLabel&&this.onLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._iconTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(n,o,r){if(n&1&&(le(r,jc,4),le(r,Hc,4),le(r,tt,4)),n&2){let s;oe(s=re())&&(o.iconTemplate=s.first),oe(s=re())&&(o.contentTemplate=s.first),oe(s=re())&&(o.templates=s)}},hostVars:23,hostBindings:function(n,o){n&1&&me("keydown",function(s){return o.onKeyDown(s)})("click",function(s){return o.toggle(s)}),n&2&&(Ao("tabindex",o.tabindex),I("disabled",o.disabled)("aria-labelledby",o.ariaLabelledBy)("aria-pressed",o.checked)("data-p-checked",o.active)("data-p-disabled",o.disabled)("type","button"),J(o.hostClass),we("p-togglebutton",!0)("p-togglebutton-checked",o.checked)("p-disabled",o.disabled)("p-togglebutton-sm",o.size==="small")("p-inputfield-sm",o.size==="small")("p-togglebutton-lg",o.size==="large")("p-inputfield-lg",o.size==="large"))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",disabled:[2,"disabled","disabled",v],style:"style",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",Ie],size:"size",iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",v],allowEmpty:"allowEmpty"},outputs:{onChange:"onChange"},features:[L([Jc,As]),Co([li]),w],decls:3,vars:6,consts:[[3,"ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","ngClass"]],template:function(n,o){n&1&&(q(0,"span",0),W(1,Gc,1,0,"ng-container",1)(2,Zc,4,4),Y()),n&2&&(D("ngClass",o.cx("content")),F(),D("ngTemplateOutlet",o.contentTemplate||o._contentTemplate)("ngTemplateOutletContext",Xe(4,Ts,o.checked)),F(),Et(o.contentTemplate?-1:2))},dependencies:[fe,yt,ze,Q],encapsulation:2,changeDetection:0})}return e})(),Vg=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[ci,Q,Q]})}return e})();var eu=["item"],tu=(e,i)=>({$implicit:e,index:i});function nu(e,i){return this.getOptionLabel(i)}function iu(e,i){e&1&&ut(0)}function ou(e,i){if(e&1&&W(0,iu,1,0,"ng-container",3),e&2){let t=V(2),n=t.$implicit,o=t.$index,r=V();D("ngTemplateOutlet",r.itemTemplate||r._itemTemplate)("ngTemplateOutletContext",xn(2,tu,n,o))}}function ru(e,i){e&1&&W(0,ou,1,5,"ng-template",null,0,xo)}function su(e,i){if(e&1){let t=In();q(0,"p-toggleButton",2),me("onChange",function(o){let r=_t(t),s=r.$implicit,a=r.$index,l=V();return Dt(l.onOptionSelect(o,s,a))}),W(1,ru,2,0),Y()}if(e&2){let t=i.$implicit,n=V();D("autofocus",n.autofocus)("styleClass",n.styleClass)("ngModel",n.isSelected(t))("onLabel",n.getOptionLabel(t))("offLabel",n.getOptionLabel(t))("disabled",n.disabled||n.isOptionDisabled(t))("allowEmpty",n.getAllowEmpty())("size",n.size),F(),Et(n.itemTemplate||n._itemTemplate?1:-1)}}var au=({dt:e})=>`
.p-selectbutton {
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    outline-color: transparent;
    border-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton .p-togglebutton {
    border-radius: 0;
    border-width: 1px 1px 1px 0;
}

.p-selectbutton .p-togglebutton:focus-visible {
    position: relative;
    z-index: 1;
}

.p-selectbutton .p-togglebutton:first-child {
    border-inline-start-width: 1px;
    border-start-start-radius: ${e("selectbutton.border.radius")};
    border-end-start-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton .p-togglebutton:last-child {
    border-start-end-radius: ${e("selectbutton.border.radius")};
    border-end-end-radius: ${e("selectbutton.border.radius")};
}

.p-selectbutton.ng-invalid.ng-dirty {
    outline: 1px solid ${e("selectbutton.invalid.border.color")};
    outline-offset: 0;
}
`,lu={root:({props:e})=>["p-selectbutton p-component",{"p-invalid":e.invalid}]},Fs=(()=>{class e extends G{name="selectbutton";theme=au;classes=lu;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var cu={provide:We,useExisting:Ce(()=>Is),multi:!0},Is=(()=>{class e extends K{options;optionLabel;optionValue;optionDisabled;get unselectable(){return this._unselectable}_unselectable=!1;set unselectable(t){this._unselectable=t,this.allowEmpty=!t}tabindex=0;multiple;allowEmpty=!0;style;styleClass;ariaLabelledBy;size;disabled;dataKey;autofocus;onOptionClick=new ee;onChange=new ee;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;onModelChange=()=>{};onModelTouched=()=>{};focusedIndex=0;_componentStyle=f(Fs);getAllowEmpty(){return this.multiple?this.allowEmpty||this.value?.length!==1:this.allowEmpty}getOptionLabel(t){return this.optionLabel?Je(t,this.optionLabel):t.label!=null?t.label:t}getOptionValue(t){return this.optionValue?Je(t,this.optionValue):this.optionLabel||t.value===void 0?t:t.value}isOptionDisabled(t){return this.optionDisabled?Je(t,this.optionDisabled):t.disabled!==void 0?t.disabled:!1}writeValue(t){this.value=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}onOptionSelect(t,n,o){if(this.disabled||this.isOptionDisabled(n))return;let r=this.isSelected(n);if(r&&this.unselectable)return;let s=this.getOptionValue(n),a;if(this.multiple)r?a=this.value.filter(l=>!Pe(l,s,this.equalityKey)):a=this.value?[...this.value,s]:[s];else{if(r&&!this.allowEmpty)return;a=r?null:s}this.focusedIndex=o,this.value=a,this.onModelChange(this.value),this.onChange.emit({originalEvent:t,value:this.value}),this.onOptionClick.emit({originalEvent:t,option:n,index:o})}changeTabIndexes(t,n){let o,r;for(let s=0;s<=this.el.nativeElement.children.length-1;s++)this.el.nativeElement.children[s].getAttribute("tabindex")==="0"&&(o={elem:this.el.nativeElement.children[s],index:s});n==="prev"?o.index===0?r=this.el.nativeElement.children.length-1:r=o.index-1:o.index===this.el.nativeElement.children.length-1?r=0:r=o.index+1,this.focusedIndex=r,this.el.nativeElement.children[r].focus()}onFocus(t,n){this.focusedIndex=n}onBlur(){this.onModelTouched()}removeOption(t){this.value=this.value.filter(n=>!Pe(n,this.getOptionValue(t),this.dataKey))}isSelected(t){let n=!1,o=this.getOptionValue(t);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let r of this.value)if(Pe(r,o,this.dataKey)){n=!0;break}}}else n=Pe(this.getOptionValue(t),this.value,this.equalityKey);return n}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"item":this._itemTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(n,o,r){if(n&1&&(le(r,eu,4),le(r,tt,4)),n&2){let s;oe(s=re())&&(o.itemTemplate=s.first),oe(s=re())&&(o.templates=s)}},hostVars:10,hostBindings:function(n,o){n&2&&(I("role","group")("aria-labelledby",o.ariaLabelledBy)("data-pc-section","root")("data-pc-name","selectbutton"),at(o.style),we("p-selectbutton",!0)("p-component",!0))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",v],tabindex:[2,"tabindex","tabindex",Ie],multiple:[2,"multiple","multiple",v],allowEmpty:[2,"allowEmpty","allowEmpty",v],style:"style",styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",size:"size",disabled:[2,"disabled","disabled",v],dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",v]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[L([cu,Fs]),w],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,o){n&1&&wo(0,su,2,9,"p-toggleButton",1,nu,!0),n&2&&So(o.options)},dependencies:[ci,Cs,ys,un,fe,ze,Q],encapsulation:2,changeDetection:0})}return e})(),om=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[Is,Q,Q]})}return e})();var uu=({dt:e})=>`
.p-badge {
    display: inline-flex;
    border-radius: ${e("badge.border.radius")};
    justify-content: center;
    padding: ${e("badge.padding")};
    background: ${e("badge.primary.background")};
    color: ${e("badge.primary.color")};
    font-size: ${e("badge.font.size")};
    font-weight: ${e("badge.font.weight")};
    min-width: ${e("badge.min.width")};
    height: ${e("badge.height")};
    line-height: ${e("badge.height")};
}

.p-badge-dot {
    width: ${e("badge.dot.size")};
    min-width: ${e("badge.dot.size")};
    height: ${e("badge.dot.size")};
    border-radius: 50%;
    padding: 0;
}

.p-badge-circle {
    padding: 0;
    border-radius: 50%;
}

.p-badge-secondary {
    background: ${e("badge.secondary.background")};
    color: ${e("badge.secondary.color")};
}

.p-badge-success {
    background: ${e("badge.success.background")};
    color: ${e("badge.success.color")};
}

.p-badge-info {
    background: ${e("badge.info.background")};
    color: ${e("badge.info.color")};
}

.p-badge-warn {
    background: ${e("badge.warn.background")};
    color: ${e("badge.warn.color")};
}

.p-badge-danger {
    background: ${e("badge.danger.background")};
    color: ${e("badge.danger.color")};
}

.p-badge-contrast {
    background: ${e("badge.contrast.background")};
    color: ${e("badge.contrast.color")};
}

.p-badge-sm {
    font-size: ${e("badge.sm.font.size")};
    min-width: ${e("badge.sm.min.width")};
    height: ${e("badge.sm.height")};
    line-height: ${e("badge.sm.height")};
}

.p-badge-lg {
    font-size: ${e("badge.lg.font.size")};
    min-width: ${e("badge.lg.min.width")};
    height: ${e("badge.lg.height")};
    line-height: ${e("badge.lg.height")};
}

.p-badge-xl {
    font-size: ${e("badge.xl.font.size")};
    min-width: ${e("badge.xl.min.width")};
    height: ${e("badge.xl.height")};
    line-height: ${e("badge.xl.height")};
}

/* For PrimeNG (directive)*/

.p-overlay-badge {
    position: relative;
}

.p-overlay-badge > .p-badge {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
}
`,du={root:({props:e,instance:i})=>["p-badge p-component",{"p-badge-circle":k(e.value)&&String(e.value).length===1,"p-badge-dot":te(e.value)&&!i.$slots.default,"p-badge-sm":e.size==="small","p-badge-lg":e.size==="large","p-badge-xl":e.size==="xlarge","p-badge-info":e.severity==="info","p-badge-success":e.severity==="success","p-badge-warn":e.severity==="warn","p-badge-danger":e.severity==="danger","p-badge-secondary":e.severity==="secondary","p-badge-contrast":e.severity==="contrast"}]},xs=(()=>{class e extends G{name="badge";theme=uu;classes=du;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var to=(()=>{class e extends K{styleClass=Ze();style=Ze();badgeSize=Ze();size=Ze();severity=Ze();value=Ze();badgeDisabled=Ze(!1,{transform:v});_componentStyle=f(xs);containerClass=Ve(()=>{let t="p-badge p-component";return k(this.value())&&String(this.value()).length===1&&(t+=" p-badge-circle"),this.badgeSize()==="large"?t+=" p-badge-lg":this.badgeSize()==="xlarge"?t+=" p-badge-xl":this.badgeSize()==="small"&&(t+=" p-badge-sm"),te(this.value())&&(t+=" p-badge-dot"),this.styleClass()&&(t+=` ${this.styleClass()}`),this.severity()&&(t+=` p-badge-${this.severity()}`),t});static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["p-badge"]],hostVars:6,hostBindings:function(n,o){n&2&&(at(o.style()),J(o.containerClass()),Fn("display",o.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],style:[1,"style"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[L([xs]),w],decls:1,vars:1,template:function(n,o){n&1&&wt(0),n&2&&St(o.value())},dependencies:[fe,Q],encapsulation:2,changeDetection:0})}return e})(),Os=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[to,Q,Q]})}return e})();var no=(()=>{class e{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,n){t&&n&&(t.classList?t.classList.add(n):t.className+=" "+n)}static addMultipleClasses(t,n){if(t&&n)if(t.classList){let o=n.trim().split(" ");for(let r=0;r<o.length;r++)t.classList.add(o[r])}else{let o=n.split(" ");for(let r=0;r<o.length;r++)t.className+=" "+o[r]}}static removeClass(t,n){t&&n&&(t.classList?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,n){t&&n&&[n].flat().filter(Boolean).forEach(o=>o.split(" ").forEach(r=>this.removeClass(t,r)))}static hasClass(t,n){return t&&n?t.classList?t.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(n){return n!==t})}static find(t,n){return Array.from(t.querySelectorAll(n))}static findSingle(t,n){return this.isElement(t)?t.querySelector(n):null}static index(t){let n=t.parentNode.childNodes,o=0;for(var r=0;r<n.length;r++){if(n[r]==t)return o;n[r].nodeType==1&&o++}return-1}static indexWithinGroup(t,n){let o=t.parentNode?t.parentNode.childNodes:[],r=0;for(var s=0;s<o.length;s++){if(o[s]==t)return r;o[s].attributes&&o[s].attributes[n]&&o[s].nodeType==1&&r++}return-1}static appendOverlay(t,n,o="self"){o!=="self"&&t&&n&&this.appendChild(t,n)}static alignOverlay(t,n,o="self",r=!0){t&&n&&(r&&(t.style.minWidth=`${e.getOuterWidth(n)}px`),o==="self"?this.relativePosition(t,n):this.absolutePosition(t,n))}static relativePosition(t,n,o=!0){let r=T=>{if(T)return getComputedStyle(T).getPropertyValue("position")==="relative"?T:r(T.parentElement)},s=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=n.offsetHeight,l=n.getBoundingClientRect(),c=this.getWindowScrollTop(),u=this.getWindowScrollLeft(),d=this.getViewport(),h=r(t)?.getBoundingClientRect()||{top:-1*c,left:-1*u},m,g;l.top+a+s.height>d.height?(m=l.top-h.top-s.height,t.style.transformOrigin="bottom",l.top+m<0&&(m=-1*l.top)):(m=a+l.top-h.top,t.style.transformOrigin="top");let b=l.left+s.width-d.width,x=l.left-h.left;s.width>d.width?g=(l.left-h.left)*-1:b>0?g=x-b:g=l.left-h.left,t.style.top=m+"px",t.style.left=g+"px",o&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static absolutePosition(t,n,o=!0){let r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),s=r.height,a=r.width,l=n.offsetHeight,c=n.offsetWidth,u=n.getBoundingClientRect(),d=this.getWindowScrollTop(),p=this.getWindowScrollLeft(),h=this.getViewport(),m,g;u.top+l+s>h.height?(m=u.top+d-s,t.style.transformOrigin="bottom",m<0&&(m=d)):(m=l+u.top+d,t.style.transformOrigin="top"),u.left+a>h.width?g=Math.max(0,u.left+p+c-a):g=u.left+p,t.style.top=m+"px",t.style.left=g+"px",o&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,n=[]){return t.parentNode===null?n:this.getParents(t.parentNode,n.concat([t.parentNode]))}static getScrollableParents(t){let n=[];if(t){let o=this.getParents(t),r=/(auto|scroll)/,s=a=>{let l=window.getComputedStyle(a,null);return r.test(l.getPropertyValue("overflow"))||r.test(l.getPropertyValue("overflowX"))||r.test(l.getPropertyValue("overflowY"))};for(let a of o){let l=a.nodeType===1&&a.dataset.scrollselectors;if(l){let c=l.split(",");for(let u of c){let d=this.findSingle(a,u);d&&s(d)&&n.push(d)}}a.nodeType!==9&&s(a)&&n.push(a)}}return n}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementDimensions(t){let n={};return t.style.visibility="hidden",t.style.display="block",n.width=t.offsetWidth,n.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",n}static scrollInView(t,n){let o=getComputedStyle(t).getPropertyValue("borderTopWidth"),r=o?parseFloat(o):0,s=getComputedStyle(t).getPropertyValue("paddingTop"),a=s?parseFloat(s):0,l=t.getBoundingClientRect(),u=n.getBoundingClientRect().top+document.body.scrollTop-(l.top+document.body.scrollTop)-r-a,d=t.scrollTop,p=t.clientHeight,h=this.getOuterHeight(n);u<0?t.scrollTop=d+u:u+h>p&&(t.scrollTop=d+u-p+h)}static fadeIn(t,n){t.style.opacity=0;let o=+new Date,r=0,s=function(){r=+t.style.opacity.replace(",",".")+(new Date().getTime()-o)/n,t.style.opacity=r,o=+new Date,+r<1&&(window.requestAnimationFrame&&requestAnimationFrame(s)||setTimeout(s,16))};s()}static fadeOut(t,n){var o=1,r=50,s=n,a=r/s;let l=setInterval(()=>{o=o-a,o<=0&&(o=0,clearInterval(l)),t.style.opacity=o},r)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,n){var o=Element.prototype,r=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||function(s){return[].indexOf.call(document.querySelectorAll(s),this)!==-1};return r.call(t,n)}static getOuterWidth(t,n){let o=t.offsetWidth;if(n){let r=getComputedStyle(t);o+=parseFloat(r.marginLeft)+parseFloat(r.marginRight)}return o}static getHorizontalPadding(t){let n=getComputedStyle(t);return parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)}static getHorizontalMargin(t){let n=getComputedStyle(t);return parseFloat(n.marginLeft)+parseFloat(n.marginRight)}static innerWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n+=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static width(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static getInnerHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n+=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),n}static getOuterHeight(t,n){let o=t.offsetHeight;if(n){let r=getComputedStyle(t);o+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return o}static getHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),n}static getWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),n}static getViewport(){let t=window,n=document,o=n.documentElement,r=n.getElementsByTagName("body")[0],s=t.innerWidth||o.clientWidth||r.clientWidth,a=t.innerHeight||o.clientHeight||r.clientHeight;return{width:s,height:a}}static getOffset(t){var n=t.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,n){let o=t.parentNode;if(!o)throw"Can't replace element";return o.replaceChild(n,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,n=t.indexOf("MSIE ");if(n>0)return!0;var o=t.indexOf("Trident/");if(o>0){var r=t.indexOf("rv:");return!0}var s=t.indexOf("Edge/");return s>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,n){if(this.isElement(n))n.appendChild(t);else if(n&&n.el&&n.el.nativeElement)n.el.nativeElement.appendChild(t);else throw"Cannot append "+n+" to "+t}static removeChild(t,n){if(this.isElement(n))n.removeChild(t);else if(n.el&&n.el.nativeElement)n.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+n}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let n=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let n=document.createElement("div");n.className="p-scrollbar-measure",document.body.appendChild(n);let o=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),this.calculatedScrollbarWidth=o,o}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let n=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=n,n}static invokeElementMethod(t,n,o){t[n].apply(t,o)}static clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:n[1]||"",version:n[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,n){t&&document.activeElement!==t&&t.focus(n)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,n=""){let o=this.find(t,this.getFocusableSelectorString(n)),r=[];for(let s of o){let a=getComputedStyle(s);this.isVisible(s)&&a.display!="none"&&a.visibility!="hidden"&&r.push(s)}return r}static getFocusableElement(t,n=""){let o=this.findSingle(t,this.getFocusableSelectorString(n));if(o){let r=getComputedStyle(o);if(this.isVisible(o)&&r.display!="none"&&r.visibility!="hidden")return o}return null}static getFirstFocusableElement(t,n=""){let o=this.getFocusableElements(t,n);return o.length>0?o[0]:null}static getLastFocusableElement(t,n){let o=this.getFocusableElements(t,n);return o.length>0?o[o.length-1]:null}static getNextFocusableElement(t,n=!1){let o=e.getFocusableElements(t),r=0;if(o&&o.length>0){let s=o.indexOf(o[0].ownerDocument.activeElement);n?s==-1||s===0?r=o.length-1:r=s-1:s!=-1&&s!==o.length-1&&(r=s+1)}return o[r]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,n){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@parent":return n?.parentElement;case"@grandparent":return n?.parentElement.parentElement;default:let o=typeof t;if(o==="string")return document.querySelector(t);if(o==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let s=(a=>!!(a&&a.constructor&&a.call&&a.apply))(t)?t():t;return s&&s.nodeType===9||this.isExist(s)?s:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,n){if(t){let o=t.getAttribute(n);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,n={},...o){if(t){let r=document.createElement(t);return this.setAttributes(r,n),r.append(...o),r}}static setAttribute(t,n="",o){this.isElement(t)&&o!==null&&o!==void 0&&t.setAttribute(n,o)}static setAttributes(t,n={}){if(this.isElement(t)){let o=(r,s)=>{let a=t?.$attrs?.[r]?[t?.$attrs?.[r]]:[];return[s].flat().reduce((l,c)=>{if(c!=null){let u=typeof c;if(u==="string"||u==="number")l.push(c);else if(u==="object"){let d=Array.isArray(c)?o(r,c):Object.entries(c).map(([p,h])=>r==="style"&&(h||h===0)?`${p.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${h}`:h?p:void 0);l=d.length?l.concat(d.filter(p=>!!p)):l}}return l},a)};Object.entries(n).forEach(([r,s])=>{if(s!=null){let a=r.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),s):r==="pBind"?this.setAttributes(t,s):(s=r==="class"?[...new Set(o("class",s))].join(" ").trim():r==="style"?o("style",s).join(";").trim():s,(t.$attrs=t.$attrs||{})&&(t.$attrs[r]=s),t.setAttribute(r,s))}})}}static isFocusableElement(t,n=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}}return e})(),Ms=class{element;listener;scrollableParents;constructor(i,t=()=>{}){this.element=i,this.listener=t}bindScrollListener(){this.scrollableParents=no.getScrollableParents(this.element);for(let i=0;i<this.scrollableParents.length;i++)this.scrollableParents[i].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let i=0;i<this.scrollableParents.length;i++)this.scrollableParents[i].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var ks=(()=>{class e extends K{autofocus=!1;_autofocus=!1;focused=!1;platformId=f(st);document=f(ce);host=f(Ee);ngAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}ngAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){qt(this.platformId)&&this._autofocus&&setTimeout(()=>{let t=no.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[2,"autofocus","autofocus",v],_autofocus:[0,"pAutoFocus","_autofocus"]},features:[w]})}return e})(),Tm=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({})}return e})();var pu=["*"],fu=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,gu=(()=>{class e extends G{name="baseicon";inlineStyles=fu;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var nt=(()=>{class e extends K{label;spin=!1;styleClass;role;ariaLabel;ariaHidden;ngOnInit(){super.ngOnInit(),this.getAttributes()}getAttributes(){let t=te(this.label);this.role=t?void 0:"img",this.ariaLabel=t?void 0:this.label,this.ariaHidden=t}getClassNames(){return`p-icon ${this.styleClass?this.styleClass+" ":""}${this.spin?"p-icon-spin":""}`}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["ng-component"]],hostAttrs:[1,"p-component","p-iconwrapper"],inputs:{label:"label",spin:[2,"spin","spin",v],styleClass:"styleClass"},features:[L([gu]),w],ngContentSelectors:pu,decls:1,vars:0,template:function(n,o){n&1&&(dt(),ht(0))},encapsulation:2,changeDetection:0})}return e})();var Rs=(()=>{class e extends nt{static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["CheckIcon"]],features:[w],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z","fill","currentColor"]],template:function(n,o){n&1&&(Ye(),q(0,"svg",0),Z(1,"path",1),Y()),n&2&&(J(o.getClassNames()),I("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},encapsulation:2})}return e})();var Ls=(()=>{class e extends nt{static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["MinusIcon"]],features:[w],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(n,o){n&1&&(Ye(),q(0,"svg",0),Z(1,"path",1),Y()),n&2&&(J(o.getClassNames()),I("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},encapsulation:2})}return e})();var Ns=(()=>{class e extends nt{pathId;ngOnInit(){this.pathId="url(#"+Qt()+")"}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["SpinnerIcon"]],features:[w],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,o){n&1&&(Ye(),q(0,"svg",0)(1,"g"),Z(2,"path",1),Y(),q(3,"defs")(4,"clipPath",2),Z(5,"rect",3),Y()()()),n&2&&(J(o.getClassNames()),I("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role),F(),I("clip-path",o.pathId),F(3),D("id",o.pathId))},encapsulation:2})}return e})();var Km=(()=>{class e extends nt{static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["TimesIcon"]],features:[w],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z","fill","currentColor"]],template:function(n,o){n&1&&(Ye(),q(0,"svg",0),Z(1,"path",1),Y()),n&2&&(J(o.getClassNames()),I("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},encapsulation:2})}return e})();var mu=["content"],bu=["loadingicon"],yu=["icon"],vu=["*"],Vs=e=>({class:e});function _u(e,i){e&1&&ut(0)}function Du(e,i){if(e&1&&Z(0,"span",8),e&2){let t=V(3);D("ngClass",t.iconClass()),I("aria-hidden",!0)("data-pc-section","loadingicon")}}function Cu(e,i){if(e&1&&Z(0,"SpinnerIcon",9),e&2){let t=V(3);D("styleClass",t.spinnerIconClass())("spin",!0),I("aria-hidden",!0)("data-pc-section","loadingicon")}}function Eu(e,i){if(e&1&&(lt(0),W(1,Du,1,3,"span",6)(2,Cu,1,4,"SpinnerIcon",7),ct()),e&2){let t=V(2);F(),D("ngIf",t.loadingIcon),F(),D("ngIf",!t.loadingIcon)}}function wu(e,i){}function Su(e,i){if(e&1&&W(0,wu,0,0,"ng-template",10),e&2){let t=V(2);D("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function Au(e,i){if(e&1&&(lt(0),W(1,Eu,3,2,"ng-container",2)(2,Su,1,1,null,5),ct()),e&2){let t=V();F(),D("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),F(),D("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",Xe(3,Vs,t.iconClass()))}}function Tu(e,i){if(e&1&&Z(0,"span",8),e&2){let t=V(2);J(t.icon),D("ngClass",t.iconClass()),I("data-pc-section","icon")}}function Fu(e,i){}function Iu(e,i){if(e&1&&W(0,Fu,0,0,"ng-template",10),e&2){let t=V(2);D("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function xu(e,i){if(e&1&&(lt(0),W(1,Tu,1,4,"span",11)(2,Iu,1,1,null,5),ct()),e&2){let t=V();F(),D("ngIf",t.icon&&!t.iconTemplate&&!t._iconTemplate),F(),D("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",Xe(3,Vs,t.iconClass()))}}function Ou(e,i){if(e&1&&(q(0,"span",12),wt(1),Y()),e&2){let t=V();I("aria-hidden",t.icon&&!t.label)("data-pc-section","label"),F(),St(t.label)}}function Mu(e,i){if(e&1&&Z(0,"p-badge",13),e&2){let t=V();D("value",t.badge)("severity",t.badgeSeverity)}}var ku=({dt:e})=>`
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: ${e("button.primary.color")};
    background: ${e("button.primary.background")};
    border: 1px solid ${e("button.primary.border.color")};
    padding-block: ${e("button.padding.y")};
    padding-inline: ${e("button.padding.x")};
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background ${e("button.transition.duration")}, color ${e("button.transition.duration")}, border-color ${e("button.transition.duration")},
            outline-color ${e("button.transition.duration")}, box-shadow ${e("button.transition.duration")};
    border-radius: ${e("button.border.radius")};
    outline-color: transparent;
    gap: ${e("button.gap")};
}

.p-button-icon,
.p-button-icon:before,
.p-button-icon:after {
    line-height: inherit;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-right:dir(rtl) {
    order: -1;
}

.p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: ${e("button.icon.only.width")};
    padding-inline-start: 0;
    padding-inline-end: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: ${e("button.icon.only.width")};
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: ${e("button.sm.font.size")};
    padding-block: ${e("button.sm.padding.y")};
    padding-inline: ${e("button.sm.padding.x")};
}

.p-button-sm .p-button-icon {
    font-size: ${e("button.sm.font.size")};
}

.p-button-sm.p-button-icon-only {
    width: ${e("button.sm.icon.only.width")};
}

.p-button-sm.p-button-icon-only.p-button-rounded {
    height: ${e("button.sm.icon.only.width")};
}

.p-button-lg {
    font-size: ${e("button.lg.font.size")};
    padding-block: ${e("button.lg.padding.y")};
    padding-inline: ${e("button.lg.padding.x")};
}

.p-button-lg .p-button-icon {
    font-size: ${e("button.lg.font.size")};
}

.p-button-lg.p-button-icon-only {
    width: ${e("button.lg.icon.only.width")};
}

.p-button-lg.p-button-icon-only.p-button-rounded {
    height: ${e("button.lg.icon.only.width")};
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: ${e("button.label.font.weight")};
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: ${e("button.icon.only.width")};
}

.p-button:not(:disabled):hover {
    background: ${e("button.primary.hover.background")};
    border: 1px solid ${e("button.primary.hover.border.color")};
    color: ${e("button.primary.hover.color")};
}

.p-button:not(:disabled):active {
    background: ${e("button.primary.active.background")};
    border: 1px solid ${e("button.primary.active.border.color")};
    color: ${e("button.primary.active.color")};
}

.p-button:focus-visible {
    box-shadow: ${e("button.primary.focus.ring.shadow")};
    outline: ${e("button.focus.ring.width")} ${e("button.focus.ring.style")} ${e("button.primary.focus.ring.color")};
    outline-offset: ${e("button.focus.ring.offset")};
}

.p-button .p-badge {
    min-width: ${e("button.badge.size")};
    height: ${e("button.badge.size")};
    line-height: ${e("button.badge.size")};
}

.p-button-raised {
    box-shadow: ${e("button.raised.shadow")};
}

.p-button-rounded {
    border-radius: ${e("button.rounded.border.radius")};
}

.p-button-secondary {
    background: ${e("button.secondary.background")};
    border: 1px solid ${e("button.secondary.border.color")};
    color: ${e("button.secondary.color")};
}

.p-button-secondary:not(:disabled):hover {
    background: ${e("button.secondary.hover.background")};
    border: 1px solid ${e("button.secondary.hover.border.color")};
    color: ${e("button.secondary.hover.color")};
}

.p-button-secondary:not(:disabled):active {
    background: ${e("button.secondary.active.background")};
    border: 1px solid ${e("button.secondary.active.border.color")};
    color: ${e("button.secondary.active.color")};
}

.p-button-secondary:focus-visible {
    outline-color: ${e("button.secondary.focus.ring.color")};
    box-shadow: ${e("button.secondary.focus.ring.shadow")};
}

.p-button-success {
    background: ${e("button.success.background")};
    border: 1px solid ${e("button.success.border.color")};
    color: ${e("button.success.color")};
}

.p-button-success:not(:disabled):hover {
    background: ${e("button.success.hover.background")};
    border: 1px solid ${e("button.success.hover.border.color")};
    color: ${e("button.success.hover.color")};
}

.p-button-success:not(:disabled):active {
    background: ${e("button.success.active.background")};
    border: 1px solid ${e("button.success.active.border.color")};
    color: ${e("button.success.active.color")};
}

.p-button-success:focus-visible {
    outline-color: ${e("button.success.focus.ring.color")};
    box-shadow: ${e("button.success.focus.ring.shadow")};
}

.p-button-info {
    background: ${e("button.info.background")};
    border: 1px solid ${e("button.info.border.color")};
    color: ${e("button.info.color")};
}

.p-button-info:not(:disabled):hover {
    background: ${e("button.info.hover.background")};
    border: 1px solid ${e("button.info.hover.border.color")};
    color: ${e("button.info.hover.color")};
}

.p-button-info:not(:disabled):active {
    background: ${e("button.info.active.background")};
    border: 1px solid ${e("button.info.active.border.color")};
    color: ${e("button.info.active.color")};
}

.p-button-info:focus-visible {
    outline-color: ${e("button.info.focus.ring.color")};
    box-shadow: ${e("button.info.focus.ring.shadow")};
}

.p-button-warn {
    background: ${e("button.warn.background")};
    border: 1px solid ${e("button.warn.border.color")};
    color: ${e("button.warn.color")};
}

.p-button-warn:not(:disabled):hover {
    background: ${e("button.warn.hover.background")};
    border: 1px solid ${e("button.warn.hover.border.color")};
    color: ${e("button.warn.hover.color")};
}

.p-button-warn:not(:disabled):active {
    background: ${e("button.warn.active.background")};
    border: 1px solid ${e("button.warn.active.border.color")};
    color: ${e("button.warn.active.color")};
}

.p-button-warn:focus-visible {
    outline-color: ${e("button.warn.focus.ring.color")};
    box-shadow: ${e("button.warn.focus.ring.shadow")};
}

.p-button-help {
    background: ${e("button.help.background")};
    border: 1px solid ${e("button.help.border.color")};
    color: ${e("button.help.color")};
}

.p-button-help:not(:disabled):hover {
    background: ${e("button.help.hover.background")};
    border: 1px solid ${e("button.help.hover.border.color")};
    color: ${e("button.help.hover.color")};
}

.p-button-help:not(:disabled):active {
    background: ${e("button.help.active.background")};
    border: 1px solid ${e("button.help.active.border.color")};
    color: ${e("button.help.active.color")};
}

.p-button-help:focus-visible {
    outline-color: ${e("button.help.focus.ring.color")};
    box-shadow: ${e("button.help.focus.ring.shadow")};
}

.p-button-danger {
    background: ${e("button.danger.background")};
    border: 1px solid ${e("button.danger.border.color")};
    color: ${e("button.danger.color")};
}

.p-button-danger:not(:disabled):hover {
    background: ${e("button.danger.hover.background")};
    border: 1px solid ${e("button.danger.hover.border.color")};
    color: ${e("button.danger.hover.color")};
}

.p-button-danger:not(:disabled):active {
    background: ${e("button.danger.active.background")};
    border: 1px solid ${e("button.danger.active.border.color")};
    color: ${e("button.danger.active.color")};
}

.p-button-danger:focus-visible {
    outline-color: ${e("button.danger.focus.ring.color")};
    box-shadow: ${e("button.danger.focus.ring.shadow")};
}

.p-button-contrast {
    background: ${e("button.contrast.background")};
    border: 1px solid ${e("button.contrast.border.color")};
    color: ${e("button.contrast.color")};
}

.p-button-contrast:not(:disabled):hover {
    background: ${e("button.contrast.hover.background")};
    border: 1px solid ${e("button.contrast.hover.border.color")};
    color: ${e("button.contrast.hover.color")};
}

.p-button-contrast:not(:disabled):active {
    background: ${e("button.contrast.active.background")};
    border: 1px solid ${e("button.contrast.active.border.color")};
    color: ${e("button.contrast.active.color")};
}

.p-button-contrast:focus-visible {
    outline-color: ${e("button.contrast.focus.ring.color")};
    box-shadow: ${e("button.contrast.focus.ring.shadow")};
}

.p-button-outlined {
    background: transparent;
    border-color: ${e("button.outlined.primary.border.color")};
    color: ${e("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):hover {
    background: ${e("button.outlined.primary.hover.background")};
    border-color: ${e("button.outlined.primary.border.color")};
    color: ${e("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):active {
    background: ${e("button.outlined.primary.active.background")};
    border-color: ${e("button.outlined.primary.border.color")};
    color: ${e("button.outlined.primary.color")};
}

.p-button-outlined.p-button-secondary {
    border-color: ${e("button.outlined.secondary.border.color")};
    color: ${e("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: ${e("button.outlined.secondary.hover.background")};
    border-color: ${e("button.outlined.secondary.border.color")};
    color: ${e("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: ${e("button.outlined.secondary.active.background")};
    border-color: ${e("button.outlined.secondary.border.color")};
    color: ${e("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-success {
    border-color: ${e("button.outlined.success.border.color")};
    color: ${e("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: ${e("button.outlined.success.hover.background")};
    border-color: ${e("button.outlined.success.border.color")};
    color: ${e("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: ${e("button.outlined.success.active.background")};
    border-color: ${e("button.outlined.success.border.color")};
    color: ${e("button.outlined.success.color")};
}

.p-button-outlined.p-button-info {
    border-color: ${e("button.outlined.info.border.color")};
    color: ${e("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: ${e("button.outlined.info.hover.background")};
    border-color: ${e("button.outlined.info.border.color")};
    color: ${e("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: ${e("button.outlined.info.active.background")};
    border-color: ${e("button.outlined.info.border.color")};
    color: ${e("button.outlined.info.color")};
}

.p-button-outlined.p-button-warn {
    border-color: ${e("button.outlined.warn.border.color")};
    color: ${e("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: ${e("button.outlined.warn.hover.background")};
    border-color: ${e("button.outlined.warn.border.color")};
    color: ${e("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: ${e("button.outlined.warn.active.background")};
    border-color: ${e("button.outlined.warn.border.color")};
    color: ${e("button.outlined.warn.color")};
}

.p-button-outlined.p-button-help {
    border-color: ${e("button.outlined.help.border.color")};
    color: ${e("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: ${e("button.outlined.help.hover.background")};
    border-color: ${e("button.outlined.help.border.color")};
    color: ${e("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: ${e("button.outlined.help.active.background")};
    border-color: ${e("button.outlined.help.border.color")};
    color: ${e("button.outlined.help.color")};
}

.p-button-outlined.p-button-danger {
    border-color: ${e("button.outlined.danger.border.color")};
    color: ${e("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: ${e("button.outlined.danger.hover.background")};
    border-color: ${e("button.outlined.danger.border.color")};
    color: ${e("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: ${e("button.outlined.danger.active.background")};
    border-color: ${e("button.outlined.danger.border.color")};
    color: ${e("button.outlined.danger.color")};
}

.p-button-outlined.p-button-contrast {
    border-color: ${e("button.outlined.contrast.border.color")};
    color: ${e("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: ${e("button.outlined.contrast.hover.background")};
    border-color: ${e("button.outlined.contrast.border.color")};
    color: ${e("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: ${e("button.outlined.contrast.active.background")};
    border-color: ${e("button.outlined.contrast.border.color")};
    color: ${e("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-plain {
    border-color: ${e("button.outlined.plain.border.color")};
    color: ${e("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: ${e("button.outlined.plain.hover.background")};
    border-color: ${e("button.outlined.plain.border.color")};
    color: ${e("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: ${e("button.outlined.plain.active.background")};
    border-color: ${e("button.outlined.plain.border.color")};
    color: ${e("button.outlined.plain.color")};
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.primary.color")};
}

.p-button-text:not(:disabled):hover {
    background: ${e("button.text.primary.hover.background")};
    border-color: transparent;
    color: ${e("button.text.primary.color")};
}

.p-button-text:not(:disabled):active {
    background: ${e("button.text.primary.active.background")};
    border-color: transparent;
    color: ${e("button.text.primary.color")};
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: ${e("button.text.secondary.hover.background")};
    border-color: transparent;
    color: ${e("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: ${e("button.text.secondary.active.background")};
    border-color: transparent;
    color: ${e("button.text.secondary.color")};
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: ${e("button.text.success.hover.background")};
    border-color: transparent;
    color: ${e("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):active {
    background: ${e("button.text.success.active.background")};
    border-color: transparent;
    color: ${e("button.text.success.color")};
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: ${e("button.text.info.hover.background")};
    border-color: transparent;
    color: ${e("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):active {
    background: ${e("button.text.info.active.background")};
    border-color: transparent;
    color: ${e("button.text.info.color")};
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: ${e("button.text.warn.hover.background")};
    border-color: transparent;
    color: ${e("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: ${e("button.text.warn.active.background")};
    border-color: transparent;
    color: ${e("button.text.warn.color")};
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: ${e("button.text.help.hover.background")};
    border-color: transparent;
    color: ${e("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):active {
    background: ${e("button.text.help.active.background")};
    border-color: transparent;
    color: ${e("button.text.help.color")};
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: ${e("button.text.danger.hover.background")};
    border-color: transparent;
    color: ${e("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: ${e("button.text.danger.active.background")};
    border-color: transparent;
    color: ${e("button.text.danger.color")};
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: ${e("button.text.plain.hover.background")};
    border-color: transparent;
    color: ${e("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: ${e("button.text.plain.active.background")};
    border-color: transparent;
    color: ${e("button.text.plain.color")};
}

.p-button-text.p-button-contrast {
    background: transparent;
    border-color: transparent;
    color: ${e("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):hover {
    background: ${e("button.text.contrast.hover.background")};
    border-color: transparent;
    color: ${e("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):active {
    background: ${e("button.text.contrast.active.background")};
    border-color: transparent;
    color: ${e("button.text.contrast.color")};
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: ${e("button.link.color")};
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: ${e("button.link.hover.color")};
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: ${e("button.link.active.color")};
}

/* For PrimeNG */
.p-button-icon-right {
    order: 1;
}

p-button[iconpos='right'] spinnericon {
    order: 1;
}
`,Ru={root:({instance:e,props:i})=>["p-button p-component",{"p-button-icon-only":e.hasIcon&&!i.label&&!i.badge,"p-button-vertical":(i.iconPos==="top"||i.iconPos==="bottom")&&i.label,"p-button-loading":i.loading,"p-button-link":i.link,[`p-button-${i.severity}`]:i.severity,"p-button-raised":i.raised,"p-button-rounded":i.rounded,"p-button-text":i.text,"p-button-outlined":i.outlined,"p-button-sm":i.size==="small","p-button-lg":i.size==="large","p-button-plain":i.plain,"p-button-fluid":i.fluid}],loadingIcon:"p-button-loading-icon",icon:({props:e})=>["p-button-icon",{[`p-button-icon-${e.iconPos}`]:e.label}],label:"p-button-label"},ot=(()=>{class e extends G{name="button";theme=ku;classes=Ru;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var it={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},Ps=(()=>{class e extends K{_componentStyle=f(ot);static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(n,o){n&2&&we("p-button-label",!0)},features:[L([ot]),w]})}return e})(),$s=(()=>{class e extends K{_componentStyle=f(ot);static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(n,o){n&2&&we("p-button-icon",!0)},features:[L([ot]),w]})}return e})(),gb=(()=>{class e extends K{iconPos="left";loadingIcon;set label(t){this._label=t,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}set icon(t){this._icon=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(t){this._loading=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}_buttonProps;iconSignal=hi($s);labelSignal=hi(Ps);isIconOnly=Ve(()=>!!(!this.labelSignal()&&this.iconSignal()));set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([n,o])=>this[`_${n}`]!==o&&(this[`_${n}`]=o))}_severity;get severity(){return this._severity}set severity(t){this._severity=t,this.initialized&&this.setStyleClass()}raised=!1;rounded=!1;text=!1;outlined=!1;size=null;plain=!1;fluid;_label;_icon;_loading=!1;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(it);isTextButton=Ve(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}get icon(){return this._icon}get buttonProps(){return this._buttonProps}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;_componentStyle=f(ot);ngAfterViewInit(){super.ngAfterViewInit(),Qe(this.htmlElement,this.getStyleClass().join(" ")),this.createIcon(),this.createLabel(),this.initialized=!0}ngOnChanges(t){super.ngOnChanges(t);let{buttonProps:n}=t;if(n){let o=n.currentValue;for(let r in o)this[r]=o[r]}}getStyleClass(){let t=[it.button,it.component];return this.icon&&!this.label&&te(this.htmlElement.textContent)&&t.push(it.iconOnly),this.loading&&(t.push(it.disabled,it.loading),!this.icon&&this.label&&t.push(it.labelOnly),this.icon&&!this.label&&!te(this.htmlElement.textContent)&&t.push(it.iconOnly)),this.text&&t.push("p-button-text"),this.severity&&t.push(`p-button-${this.severity}`),this.plain&&t.push("p-button-plain"),this.raised&&t.push("p-button-raised"),this.size&&t.push(`p-button-${this.size}`),this.outlined&&t.push("p-button-outlined"),this.rounded&&t.push("p-button-rounded"),this.size==="small"&&t.push("p-button-sm"),this.size==="large"&&t.push("p-button-lg"),this.hasFluid&&t.push("p-button-fluid"),t}get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return te(this.fluid)?!!n:this.fluid}setStyleClass(){let t=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...t)}removeExistingSeverityClass(){let t=["success","info","warn","danger","help","primary","secondary","contrast"],n=this.htmlElement.classList.value.split(" ").find(o=>t.some(r=>o===`p-button-${r}`));n&&this.htmlElement.classList.remove(n)}createLabel(){if(!kt(this.htmlElement,".p-button-label")&&this.label){let n=this.document.createElement("span");this.icon&&!this.label&&n.setAttribute("aria-hidden","true"),n.className="p-button-label",n.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(n)}}createIcon(){if(!kt(this.htmlElement,".p-button-icon")&&(this.icon||this.loading)){let n=this.document.createElement("span");n.className="p-button-icon",n.setAttribute("aria-hidden","true");let o=this.label?"p-button-icon-"+this.iconPos:null;o&&Qe(n,o);let r=this.getIconClass();r&&Qe(n,r),!this.loadingIcon&&this.loading&&(n.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(n,this.htmlElement.firstChild)}}updateLabel(){let t=kt(this.htmlElement,".p-button-label");if(!this.label){t&&this.htmlElement.removeChild(t);return}t?t.textContent=this.label:this.createLabel()}updateIcon(){let t=kt(this.htmlElement,".p-button-icon"),n=kt(this.htmlElement,".p-button-label");this.loading&&!this.loadingIcon&&t?t.innerHTML=this.spinnerIcon:t?.innerHTML&&(t.innerHTML=""),t?this.iconPos?t.className="p-button-icon "+(n?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():t.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}ngOnDestroy(){this.initialized=!1,super.ngOnDestroy()}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275dir=A({type:e,selectors:[["","pButton",""]],contentQueries:function(n,o,r){n&1&&(fi(r,o.iconSignal,$s,5),fi(r,o.labelSignal,Ps,5)),n&2&&Fo(2)},hostVars:4,hostBindings:function(n,o){n&2&&we("p-button-icon-only",o.isIconOnly())("p-button-text",o.isTextButton())},inputs:{iconPos:"iconPos",loadingIcon:"loadingIcon",loading:"loading",severity:"severity",raised:[2,"raised","raised",v],rounded:[2,"rounded","rounded",v],text:[2,"text","text",v],outlined:[2,"outlined","outlined",v],size:"size",plain:[2,"plain","plain",v],fluid:[2,"fluid","fluid",v],label:"label",icon:"icon",buttonProps:"buttonProps"},features:[L([ot]),w,ae]})}return e})(),Lu=(()=>{class e extends K{type="button";iconPos="left";icon;badge;label;disabled;loading=!1;loadingIcon;raised=!1;rounded=!1;text=!1;plain=!1;severity;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;fluid;onClick=new ee;onFocus=new ee;onBlur=new ee;contentTemplate;loadingIconTemplate;iconTemplate;_buttonProps;get buttonProps(){return this._buttonProps}set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([n,o])=>this[`_${n}`]!==o&&(this[`_${n}`]=o))}get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return te(this.fluid)?!!n:this.fluid}_componentStyle=f(ot);templates;_contentTemplate;_iconTemplate;_loadingIconTemplate;ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}ngOnChanges(t){super.ngOnChanges(t);let{buttonProps:n}=t;if(n){let o=n.currentValue;for(let r in o)this[r]=o[r]}}spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,t])=>!!t).reduce((t,[n])=>t+` ${n}`,"p-button-loading-icon")}iconClass(){return{[`p-button-loading-icon pi-spin ${this.loadingIcon??""}`]:this.loading,"p-button-icon":!0,"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label,"p-button-icon-top":this.iconPos==="top"&&this.label,"p-button-icon-bottom":this.iconPos==="bottom"&&this.label}}get buttonClass(){return{"p-button p-component":!0,"p-button-icon-only":(this.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate)&&!this.label,"p-button-vertical":(this.iconPos==="top"||this.iconPos==="bottom")&&this.label,"p-button-loading":this.loading,"p-button-loading-label-only":this.loading&&!this.icon&&this.label&&!this.loadingIcon&&this.iconPos==="left","p-button-link":this.link,[`p-button-${this.severity}`]:this.severity,"p-button-raised":this.raised,"p-button-rounded":this.rounded,"p-button-text":this.text||this.variant=="text","p-button-outlined":this.outlined||this.variant=="outlined","p-button-sm":this.size==="small","p-button-lg":this.size==="large","p-button-plain":this.plain,"p-button-fluid":this.hasFluid,[`${this.styleClass}`]:this.styleClass}}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["p-button"]],contentQueries:function(n,o,r){if(n&1&&(le(r,mu,5),le(r,bu,5),le(r,yu,5),le(r,tt,4)),n&2){let s;oe(s=re())&&(o.contentTemplate=s.first),oe(s=re())&&(o.loadingIconTemplate=s.first),oe(s=re())&&(o.iconTemplate=s.first),oe(s=re())&&(o.templates=s)}},inputs:{type:"type",iconPos:"iconPos",icon:"icon",badge:"badge",label:"label",disabled:[2,"disabled","disabled",v],loading:[2,"loading","loading",v],loadingIcon:"loadingIcon",raised:[2,"raised","raised",v],rounded:[2,"rounded","rounded",v],text:[2,"text","text",v],plain:[2,"plain","plain",v],severity:"severity",outlined:[2,"outlined","outlined",v],link:[2,"link","link",v],tabindex:[2,"tabindex","tabindex",Ie],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",v],fluid:[2,"fluid","fluid",v],buttonProps:"buttonProps"},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[L([ot]),w,ae],ngContentSelectors:vu,decls:7,vars:14,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","ngClass","pAutoFocus"],[4,"ngTemplateOutlet"],[4,"ngIf"],["class","p-button-label",4,"ngIf"],[3,"value","severity",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"ngClass",4,"ngIf"],[3,"styleClass","spin",4,"ngIf"],[3,"ngClass"],[3,"styleClass","spin"],[3,"ngIf"],[3,"class","ngClass",4,"ngIf"],[1,"p-button-label"],[3,"value","severity"]],template:function(n,o){n&1&&(dt(),q(0,"button",0),me("click",function(s){return o.onClick.emit(s)})("focus",function(s){return o.onFocus.emit(s)})("blur",function(s){return o.onBlur.emit(s)}),ht(1),W(2,_u,1,0,"ng-container",1)(3,Au,3,5,"ng-container",2)(4,xu,3,5,"ng-container",2)(5,Ou,2,3,"span",3)(6,Mu,1,2,"p-badge",4),Y()),n&2&&(D("ngStyle",o.style)("disabled",o.disabled||o.loading)("ngClass",o.buttonClass)("pAutoFocus",o.autofocus),I("type",o.type)("aria-label",o.ariaLabel)("data-pc-name","button")("data-pc-section","root")("tabindex",o.tabindex),F(2),D("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),F(),D("ngIf",o.loading),F(),D("ngIf",!o.loading),F(),D("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.label),F(),D("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.badge))},dependencies:[fe,yt,rn,ze,Hi,li,ks,Ns,Os,to,Q],encapsulation:2,changeDetection:0})}return e})(),mb=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[fe,Lu,Q,Q]})}return e})();var Nu=["checkboxicon"],Pu=["input"],$u=()=>({"p-checkbox-input":!0}),Vu=e=>({checked:e,class:"p-checkbox-icon"});function Bu(e,i){if(e&1&&Z(0,"span",8),e&2){let t=V(3);D("ngClass",t.checkboxIcon),I("data-pc-section","icon")}}function Uu(e,i){e&1&&Z(0,"CheckIcon",9),e&2&&(D("styleClass","p-checkbox-icon"),I("data-pc-section","icon"))}function ju(e,i){if(e&1&&(lt(0),W(1,Bu,1,2,"span",7)(2,Uu,1,2,"CheckIcon",6),ct()),e&2){let t=V(2);F(),D("ngIf",t.checkboxIcon),F(),D("ngIf",!t.checkboxIcon)}}function Hu(e,i){e&1&&Z(0,"MinusIcon",9),e&2&&(D("styleClass","p-checkbox-icon"),I("data-pc-section","icon"))}function zu(e,i){if(e&1&&(lt(0),W(1,ju,3,2,"ng-container",4)(2,Hu,1,2,"MinusIcon",6),ct()),e&2){let t=V();F(),D("ngIf",t.checked),F(),D("ngIf",t._indeterminate())}}function Gu(e,i){}function Wu(e,i){e&1&&W(0,Gu,0,0,"ng-template")}var Ku=({dt:e})=>`
.p-checkbox {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${e("checkbox.width")};
    height: ${e("checkbox.height")};
}

.p-checkbox-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: ${e("checkbox.border.radius")};
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${e("checkbox.border.radius")};
    border: 1px solid ${e("checkbox.border.color")};
    background: ${e("checkbox.background")};
    width: ${e("checkbox.width")};
    height: ${e("checkbox.height")};
    transition: background ${e("checkbox.transition.duration")}, color ${e("checkbox.transition.duration")}, border-color ${e("checkbox.transition.duration")}, box-shadow ${e("checkbox.transition.duration")}, outline-color ${e("checkbox.transition.duration")};
    outline-color: transparent;
    box-shadow: ${e("checkbox.shadow")};
}

.p-checkbox-icon {
    transition-duration: ${e("checkbox.transition.duration")};
    color: ${e("checkbox.icon.color")};
    font-size: ${e("checkbox.icon.size")};
    width: ${e("checkbox.icon.size")};
    height: ${e("checkbox.icon.size")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    border-color: ${e("checkbox.hover.border.color")};
}

.p-checkbox-checked .p-checkbox-box {
    border-color: ${e("checkbox.checked.border.color")};
    background: ${e("checkbox.checked.background")};
}

.p-checkbox-checked .p-checkbox-icon {
    color: ${e("checkbox.icon.checked.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${e("checkbox.checked.hover.background")};
    border-color: ${e("checkbox.checked.hover.border.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
    color: ${e("checkbox.icon.checked.hover.color")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${e("checkbox.focus.border.color")};
    box-shadow: ${e("checkbox.focus.ring.shadow")};
    outline: ${e("checkbox.focus.ring.width")} ${e("checkbox.focus.ring.style")} ${e("checkbox.focus.ring.color")};
    outline-offset: ${e("checkbox.focus.ring.offset")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${e("checkbox.checked.focus.border.color")};
}

p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
    border-color: ${e("checkbox.invalid.border.color")};
}

.p-checkbox.p-variant-filled .p-checkbox-box {
    background: ${e("checkbox.filled.background")};
}

.p-checkbox-checked.p-variant-filled .p-checkbox-box {
    background: ${e("checkbox.checked.background")};
}

.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${e("checkbox.checked.hover.background")};
}

.p-checkbox.p-disabled {
    opacity: 1;
}

.p-checkbox.p-disabled .p-checkbox-box {
    background: ${e("checkbox.disabled.background")};
    border-color: ${e("checkbox.checked.disabled.border.color")};
}

.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
    color: ${e("checkbox.icon.disabled.color")};
}

.p-checkbox-sm,
.p-checkbox-sm .p-checkbox-box {
    width: ${e("checkbox.sm.width")};
    height: ${e("checkbox.sm.height")};
}

.p-checkbox-sm .p-checkbox-icon {
    font-size: ${e("checkbox.icon.sm.size")};
    width: ${e("checkbox.icon.sm.size")};
    height: ${e("checkbox.icon.sm.size")};
}

.p-checkbox-lg,
.p-checkbox-lg .p-checkbox-box {
    width: ${e("checkbox.lg.width")};
    height: ${e("checkbox.lg.height")};
}

.p-checkbox-lg .p-checkbox-icon {
    font-size: ${e("checkbox.icon.lg.size")};
    width: ${e("checkbox.icon.lg.size")};
    height: ${e("checkbox.icon.lg.size")};
}
`,qu={root:({instance:e,props:i})=>["p-checkbox p-component",{"p-checkbox-checked":e.checked,"p-disabled":i.disabled,"p-invalid":i.invalid,"p-variant-filled":i.variant?i.variant==="filled":e.config.inputStyle==="filled"||e.config.inputVariant==="filled"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},Bs=(()=>{class e extends G{name="checkbox";theme=Ku;classes=qu;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var Yu={provide:We,useExisting:Ce(()=>Us),multi:!0},Us=(()=>{class e extends K{value;name;disabled;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;style;inputStyle;styleClass;inputClass;indeterminate=!1;size;formControl;checkboxIcon;readonly;required;autofocus;trueValue=!0;falseValue=!1;variant;onChange=new ee;onFocus=new ee;onBlur=new ee;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.model===this.trueValue:ur(this.value,this.model)}get containerClass(){return{"p-checkbox p-component":!0,"p-checkbox-checked p-highlight":this.checked,"p-disabled":this.disabled,"p-variant-filled":this.variant==="filled"||this.config.inputStyle()==="filled"||this.config.inputVariant()==="filled","p-checkbox-sm p-inputfield-sm":this.size==="small","p-checkbox-lg p-inputfield-lg":this.size==="large"}}_indeterminate=ge(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;_componentStyle=f(Bs);ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._checkboxIconTemplate=t.template;break;case"checkboxicon":this._checkboxIconTemplate=t.template;break}})}ngOnChanges(t){super.ngOnChanges(t),t.indeterminate&&this._indeterminate.set(t.indeterminate.currentValue)}updateModel(t){let n,o=this.injector.get(vt,null,{optional:!0,self:!0}),r=o&&!this.formControl?o.value:this.model;this.binary?(n=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.model=n,this.onModelChange(n)):(this.checked||this._indeterminate()?n=r.filter(s=>!Pe(s,this.value)):n=r?[...r,this.value]:[this.value],this.onModelChange(n),this.model=n,this.formControl&&this.formControl.setValue(n)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:n,originalEvent:t})}handleChange(t){this.readonly||this.updateModel(t)}onInputFocus(t){this.focused=!0,this.onFocus.emit(t)}onInputBlur(t){this.focused=!1,this.onBlur.emit(t),this.onModelTouched()}focus(){this.inputViewChild.nativeElement.focus()}writeValue(t){this.model=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){setTimeout(()=>{this.disabled=t,this.cd.markForCheck()})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275cmp=U({type:e,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(n,o,r){if(n&1&&(le(r,Nu,4),le(r,tt,4)),n&2){let s;oe(s=re())&&(o.checkboxIconTemplate=s.first),oe(s=re())&&(o.templates=s)}},viewQuery:function(n,o){if(n&1&&To(Pu,5),n&2){let r;oe(r=re())&&(o.inputViewChild=r.first)}},inputs:{value:"value",name:"name",disabled:[2,"disabled","disabled",v],binary:[2,"binary","binary",v],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",Ie],inputId:"inputId",style:"style",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",v],size:"size",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",v],required:[2,"required","required",v],autofocus:[2,"autofocus","autofocus",v],trueValue:"trueValue",falseValue:"falseValue",variant:"variant"},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[L([Yu,Bs]),w,ae],decls:6,vars:29,consts:[["input",""],[3,"ngClass"],["type","checkbox",3,"focus","blur","change","value","checked","disabled","readonly","ngClass"],[1,"p-checkbox-box"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"styleClass",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"]],template:function(n,o){if(n&1){let r=In();q(0,"div",1)(1,"input",2,0),me("focus",function(a){return _t(r),Dt(o.onInputFocus(a))})("blur",function(a){return _t(r),Dt(o.onInputBlur(a))})("change",function(a){return _t(r),Dt(o.handleChange(a))}),Y(),q(3,"div",3),W(4,zu,3,2,"ng-container",4)(5,Wu,1,0,null,5),Y()()}n&2&&(at(o.style),J(o.styleClass),D("ngClass",o.containerClass),I("data-p-highlight",o.checked)("data-p-checked",o.checked)("data-p-disabled",o.disabled),F(),at(o.inputStyle),J(o.inputClass),D("value",o.value)("checked",o.checked)("disabled",o.disabled)("readonly",o.readonly)("ngClass",Io(26,$u)),I("id",o.inputId)("name",o.name)("tabindex",o.tabindex)("required",o.required?!0:null)("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel),F(3),D("ngIf",!o.checkboxIconTemplate&&!o._checkboxIconTemplate),F(),D("ngTemplateOutlet",o.checkboxIconTemplate||o._checkboxIconTemplate)("ngTemplateOutletContext",Xe(27,Vu,o.checked)))},dependencies:[fe,yt,rn,ze,Rs,Ls,Q],encapsulation:2,changeDetection:0})}return e})(),Nb=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({imports:[Us,Q,Q]})}return e})();var Zu=({dt:e})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${e("inputtext.color")};
    background: ${e("inputtext.background")};
    padding-block: ${e("inputtext.padding.y")};
    padding-inline: ${e("inputtext.padding.x")};
    border: 1px solid ${e("inputtext.border.color")};
    transition: background ${e("inputtext.transition.duration")}, color ${e("inputtext.transition.duration")}, border-color ${e("inputtext.transition.duration")}, outline-color ${e("inputtext.transition.duration")}, box-shadow ${e("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${e("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${e("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${e("inputtext.focus.border.color")};
    box-shadow: ${e("inputtext.focus.ring.shadow")};
    outline: ${e("inputtext.focus.ring.width")} ${e("inputtext.focus.ring.style")} ${e("inputtext.focus.ring.color")};
    outline-offset: ${e("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${e("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${e("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${e("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${e("inputtext.disabled.background")};
    color: ${e("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${e("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${e("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${e("inputtext.sm.font.size")};
    padding-block: ${e("inputtext.sm.padding.y")};
    padding-inline: ${e("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${e("inputtext.lg.font.size")};
    padding-block: ${e("inputtext.lg.padding.y")};
    padding-inline: ${e("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,Xu={root:({instance:e,props:i})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":i.size==="small","p-inputtext-lg":i.size==="large","p-invalid":i.invalid,"p-variant-filled":i.variant==="filled","p-inputtext-fluid":i.fluid}]},js=(()=>{class e extends G{name="inputtext";theme=Zu;classes=Xu;static \u0275fac=(()=>{let t;return function(o){return(t||(t=_(e)))(o||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var qb=(()=>{class e extends K{ngModel;variant;fluid;pSize;filled;_componentStyle=f(js);get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return te(this.fluid)?!!n:this.fluid}constructor(t){super(),this.ngModel=t}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(n){return new(n||e)(E(un,8))};static \u0275dir=A({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(n,o){if(n&1&&me("input",function(s){return o.onInput(s)}),n&2){let r;we("p-filled",o.filled)("p-variant-filled",((r=o.variant)!==null&&r!==void 0?r:o.config.inputStyle()||o.config.inputVariant())==="filled")("p-inputtext-fluid",o.hasFluid)("p-inputtext-sm",o.pSize==="small")("p-inputfield-sm",o.pSize==="small")("p-inputtext-lg",o.pSize==="large")("p-inputfield-lg",o.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",v],pSize:"pSize"},features:[L([js]),w]})}return e})(),Yb=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=$({type:e});static \u0275inj=P({})}return e})();var Hs=class e{static isArray(i,t=!0){return Array.isArray(i)&&(t||i.length!==0)}static isObject(i,t=!0){return typeof i=="object"&&!Array.isArray(i)&&i!=null&&(t||Object.keys(i).length!==0)}static equals(i,t,n){return n?this.resolveFieldData(i,n)===this.resolveFieldData(t,n):this.equalsByValue(i,t)}static equalsByValue(i,t){if(i===t)return!0;if(i&&t&&typeof i=="object"&&typeof t=="object"){var n=Array.isArray(i),o=Array.isArray(t),r,s,a;if(n&&o){if(s=i.length,s!=t.length)return!1;for(r=s;r--!==0;)if(!this.equalsByValue(i[r],t[r]))return!1;return!0}if(n!=o)return!1;var l=this.isDate(i),c=this.isDate(t);if(l!=c)return!1;if(l&&c)return i.getTime()==t.getTime();var u=i instanceof RegExp,d=t instanceof RegExp;if(u!=d)return!1;if(u&&d)return i.toString()==t.toString();var p=Object.keys(i);if(s=p.length,s!==Object.keys(t).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,p[r]))return!1;for(r=s;r--!==0;)if(a=p[r],!this.equalsByValue(i[a],t[a]))return!1;return!0}return i!==i&&t!==t}static resolveFieldData(i,t){if(i&&t){if(this.isFunction(t))return t(i);if(t.indexOf(".")==-1)return i[t];{let n=t.split("."),o=i;for(let r=0,s=n.length;r<s;++r){if(o==null)return null;o=o[n[r]]}return o}}else return null}static isFunction(i){return!!(i&&i.constructor&&i.call&&i.apply)}static reorderArray(i,t,n){let o;i&&t!==n&&(n>=i.length&&(n%=i.length,t%=i.length),i.splice(n,0,i.splice(t,1)[0]))}static insertIntoOrderedArray(i,t,n,o){if(n.length>0){let r=!1;for(let s=0;s<n.length;s++)if(this.findIndexInList(n[s],o)>t){n.splice(s,0,i),r=!0;break}r||n.push(i)}else n.push(i)}static findIndexInList(i,t){let n=-1;if(t){for(let o=0;o<t.length;o++)if(t[o]==i){n=o;break}}return n}static contains(i,t){if(i!=null&&t&&t.length){for(let n of t)if(this.equals(i,n))return!0}return!1}static removeAccents(i){return i&&(i=i.normalize("NFKD").replace(new RegExp("\\p{Diacritic}","gu"),"")),i}static isDate(i){return Object.prototype.toString.call(i)==="[object Date]"}static isEmpty(i){return i==null||i===""||Array.isArray(i)&&i.length===0||!this.isDate(i)&&typeof i=="object"&&Object.keys(i).length===0}static isNotEmpty(i){return!this.isEmpty(i)}static compare(i,t,n,o=1){let r=-1,s=this.isEmpty(i),a=this.isEmpty(t);return s&&a?r=0:s?r=o:a?r=-o:typeof i=="string"&&typeof t=="string"?r=i.localeCompare(t,n,{numeric:!0}):r=i<t?-1:i>t?1:0,r}static sort(i,t,n=1,o,r=1){let s=e.compare(i,t,o,n),a=n;return(e.isEmpty(i)||e.isEmpty(t))&&(a=r===1?n:r),a*s}static merge(i,t){if(!(i==null&&t==null)){{if((i==null||typeof i=="object")&&(t==null||typeof t=="object"))return C(C({},i||{}),t||{});if((i==null||typeof i=="string")&&(t==null||typeof t=="string"))return[i||"",t||""].join(" ")}return t||i}}static isPrintableCharacter(i=""){return this.isNotEmpty(i)&&i.length===1&&i.match(/\S| /)}static getItemValue(i,...t){return this.isFunction(i)?i(...t):i}static findLastIndex(i,t){let n=-1;if(this.isNotEmpty(i))try{n=i.findLastIndex(t)}catch{n=i.lastIndexOf([...i].reverse().find(t))}return n}static findLast(i,t){let n;if(this.isNotEmpty(i))try{n=i.findLast(t)}catch{n=[...i].reverse().find(t)}return n}static deepEquals(i,t){if(i===t)return!0;if(i&&t&&typeof i=="object"&&typeof t=="object"){var n=Array.isArray(i),o=Array.isArray(t),r,s,a;if(n&&o){if(s=i.length,s!=t.length)return!1;for(r=s;r--!==0;)if(!this.deepEquals(i[r],t[r]))return!1;return!0}if(n!=o)return!1;var l=i instanceof Date,c=t instanceof Date;if(l!=c)return!1;if(l&&c)return i.getTime()==t.getTime();var u=i instanceof RegExp,d=t instanceof RegExp;if(u!=d)return!1;if(u&&d)return i.toString()==t.toString();var p=Object.keys(i);if(s=p.length,s!==Object.keys(t).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,p[r]))return!1;for(r=s;r--!==0;)if(a=p[r],!this.deepEquals(i[a],t[a]))return!1;return!0}return i!==i&&t!==t}static minifyCSS(i){return i&&i.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}static toFlatCase(i){return this.isString(i)?i.replace(/(-|_)/g,"").toLowerCase():i}static isString(i,t=!0){return typeof i=="string"&&(t||i!=="")}},zs=0;function my(e="pn_id_"){return zs++,`${e}${zs}`}function Qu(){let e=[],i=(r,s)=>{let a=e.length>0?e[e.length-1]:{key:r,value:s},l=a.value+(a.key===r?0:s)+2;return e.push({key:r,value:l}),l},t=r=>{e=e.filter(s=>s.value!==r)},n=()=>e.length>0?e[e.length-1].value:0,o=r=>r&&parseInt(r.style.zIndex,10)||0;return{get:o,set:(r,s,a)=>{s&&(s.style.zIndex=String(i(r,a)))},clear:r=>{r&&(t(o(r)),r.style.zIndex="")},getCurrent:()=>n(),generateZIndex:i,revertZIndex:t}}var by=Qu(),yy=e=>!!e;export{ce as a,bt as b,Ka as c,Ri as d,qa as e,Rt as f,mr as g,br as h,Qa as i,yt as j,Br as k,rn as l,Ur as m,Dl as n,Hi as o,ze as p,El as q,wl as r,Tl as s,fe as t,mi as u,Ro as v,qt as w,bi as x,Kt as y,Np as z,Pp as A,Ne as B,je as C,Go as D,va as E,xa as F,Oa as G,Qo as H,Qe as I,Ld as J,ft as K,Nd as L,Ai as M,ka as N,Ra as O,Pd as P,er as Q,Ti as R,$d as S,Vd as T,Bd as U,Xo as V,Ud as W,jd as X,Hd as Y,La as Z,kt as _,zd as $,Gd as aa,tr as ba,Wd as ca,Ii as da,Na as ea,Pa as fa,Kd as ga,qd as ha,xi as ia,$n as ja,Yd as ka,Zd as la,Oi as ma,Xd as na,Va as oa,Qd as pa,Jd as qa,eh as ra,th as sa,nh as ta,ih as ua,oh as va,or as wa,te as xa,za as ya,cr as za,k as Aa,Je as Ba,Pe as Ca,Ga as Da,lh as Ea,ch as Fa,Se as Ga,uh as Ha,Bn as Ia,dh as Ja,hh as Ka,ye as La,ph as Ma,Qt as Na,We as Oa,us as Pa,vt as Qa,ys as Ra,un as Sa,Mc as Ta,Nc as Ua,$c as Va,Cs as Wa,tg as Xa,cf as Ya,ql as Za,hf as _a,pf as $a,Vl as ab,Gp as bb,ne as cb,Wp as db,Kp as eb,qp as fb,Yp as gb,Zp as hb,Xp as ib,tt as jb,Q as kb,Qp as lb,Jp as mb,G as nb,qi as ob,Lf as pb,K as qb,li as rb,Cg as sb,ci as tb,Vg as ub,Is as vb,om as wb,no as xb,Ms as yb,ks as zb,Tm as Ab,to as Bb,Os as Cb,nt as Db,Rs as Eb,Ls as Fb,Ns as Gb,Km as Hb,gb as Ib,Lu as Jb,mb as Kb,Hs as Lb,my as Mb,by as Nb,yy as Ob,Us as Pb,Nb as Qb,qb as Rb,Yb as Sb};
