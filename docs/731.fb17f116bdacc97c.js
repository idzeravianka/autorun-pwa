"use strict";(self.webpackChunkautorun_pwa=self.webpackChunkautorun_pwa||[]).push([[731],{4128:(G,F,u)=>{u.d(F,{D:()=>v});var l=u(9751),p=u(4742),T=u(8421),C=u(3269),L=u(5403),I=u(3268),k=u(1810);function v(...m){const M=(0,C.jO)(m),{args:S,keys:x}=(0,p.D)(m),_=new l.y(E=>{const{length:g}=S;if(!g)return void E.complete();const b=new Array(g);let N=g,U=g;for(let K=0;K<g;K++){let V=!1;(0,T.Xf)(S[K]).subscribe((0,L.x)(E,w=>{V||(V=!0,U--),b[K]=w},()=>N--,void 0,()=>{(!N||!V)&&(U||E.next(x?(0,k.n)(x,b):b),E.complete())}))}});return M?_.pipe((0,I.Z)(M)):_}},2722:(G,F,u)=>{u.d(F,{R:()=>L});var l=u(4482),p=u(5403),T=u(8421),C=u(5032);function L(I){return(0,l.e)((k,v)=>{(0,T.Xf)(I).subscribe((0,p.x)(v,()=>v.complete(),C.Z)),!v.closed&&k.subscribe(v)})}},7151:(G,F,u)=>{u.d(F,{tE:()=>Et,qm:()=>At,X6:()=>Ae,yG:()=>De});var l=u(6895),p=u(4650),T=u(1135),C=u(7579),L=u(9646),it=u(5684),ot=u(4671),st=u(4482),rt=u(5403);function ct(s,t){return s===t}var lt=u(2722),oe=u(1281),z=u(3353);function Ae(s){return 0===s.offsetX&&0===s.offsetY}function De(s){const t=s.touches&&s.touches[0]||s.changedTouches&&s.changedTouches[0];return!(!t||-1!==t.identifier||null!=t.radiusX&&1!==t.radiusX||null!=t.radiusY&&1!==t.radiusY)}const gt=new p.OlP("cdk-input-modality-detector-options"),bt={ignoreKeys:[18,17,224,91,16]},Y=(0,z.i$)({passive:!0,capture:!0});let vt=(()=>{class s{constructor(e,o,r,h){this._platform=e,this._mostRecentTarget=null,this._modality=new T.X(null),this._lastTouchMs=0,this._onKeydown=y=>{this._options?.ignoreKeys?.some(O=>O===y.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=(0,z.sA)(y))},this._onMousedown=y=>{Date.now()-this._lastTouchMs<650||(this._modality.next(Ae(y)?"keyboard":"mouse"),this._mostRecentTarget=(0,z.sA)(y))},this._onTouchstart=y=>{De(y)?this._modality.next("keyboard"):(this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=(0,z.sA)(y))},this._options={...bt,...h},this.modalityDetected=this._modality.pipe((0,it.T)(1)),this.modalityChanged=this.modalityDetected.pipe(function at(s,t=ot.y){return s=s??ct,(0,st.e)((e,o)=>{let r,h=!0;e.subscribe((0,rt.x)(o,y=>{const O=t(y);(h||!s(r,O))&&(h=!1,r=O,o.next(y))}))})}()),e.isBrowser&&o.runOutsideAngular(()=>{r.addEventListener("keydown",this._onKeydown,Y),r.addEventListener("mousedown",this._onMousedown,Y),r.addEventListener("touchstart",this._onTouchstart,Y)})}get mostRecentModality(){return this._modality.value}ngOnDestroy(){this._modality.complete(),this._platform.isBrowser&&(document.removeEventListener("keydown",this._onKeydown,Y),document.removeEventListener("mousedown",this._onMousedown,Y),document.removeEventListener("touchstart",this._onTouchstart,Y))}}return s.\u0275fac=function(e){return new(e||s)(p.LFG(z.t4),p.LFG(p.R0b),p.LFG(l.K0),p.LFG(gt,8))},s.\u0275prov=p.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const Mt=new p.OlP("cdk-focus-monitor-default-options"),J=(0,z.i$)({passive:!0,capture:!0});let Et=(()=>{class s{constructor(e,o,r,h,y){this._ngZone=e,this._platform=o,this._inputModalityDetector=r,this._origin=null,this._windowFocused=!1,this._originFromTouchInteraction=!1,this._elementInfo=new Map,this._monitoredElementCount=0,this._rootNodeFocusListenerCount=new Map,this._windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)},this._stopInputModalityDetector=new C.x,this._rootNodeFocusAndBlurListener=O=>{const re=(0,z.sA)(O),Dt="focus"===O.type?this._onFocus:this._onBlur;for(let q=re;q;q=q.parentElement)Dt.call(this,O,q)},this._document=h,this._detectionMode=y?.detectionMode||0}monitor(e,o=!1){const r=(0,oe.fI)(e);if(!this._platform.isBrowser||1!==r.nodeType)return(0,L.of)(null);const h=(0,z.kV)(r)||this._getDocument(),y=this._elementInfo.get(r);if(y)return o&&(y.checkChildren=!0),y.subject;const O={checkChildren:o,subject:new C.x,rootNode:h};return this._elementInfo.set(r,O),this._registerGlobalListeners(O),O.subject}stopMonitoring(e){const o=(0,oe.fI)(e),r=this._elementInfo.get(o);r&&(r.subject.complete(),this._setClasses(o),this._elementInfo.delete(o),this._removeGlobalListeners(r))}focusVia(e,o,r){const h=(0,oe.fI)(e);h===this._getDocument().activeElement?this._getClosestElementsInfo(h).forEach(([O,re])=>this._originChanged(O,o,re)):(this._setOrigin(o),"function"==typeof h.focus&&h.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,o)=>this.stopMonitoring(o))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:"program"}_shouldBeAttributedToTouch(e){return 1===this._detectionMode||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,o){e.classList.toggle("cdk-focused",!!o),e.classList.toggle("cdk-touch-focused","touch"===o),e.classList.toggle("cdk-keyboard-focused","keyboard"===o),e.classList.toggle("cdk-mouse-focused","mouse"===o),e.classList.toggle("cdk-program-focused","program"===o)}_setOrigin(e,o=!1){this._ngZone.runOutsideAngular(()=>{this._origin=e,this._originFromTouchInteraction="touch"===e&&o,0===this._detectionMode&&(clearTimeout(this._originTimeoutId),this._originTimeoutId=setTimeout(()=>this._origin=null,this._originFromTouchInteraction?650:1))})}_onFocus(e,o){const r=this._elementInfo.get(o),h=(0,z.sA)(e);!r||!r.checkChildren&&o!==h||this._originChanged(o,this._getFocusOrigin(h),r)}_onBlur(e,o){const r=this._elementInfo.get(o);!r||r.checkChildren&&e.relatedTarget instanceof Node&&o.contains(e.relatedTarget)||(this._setClasses(o),this._emitOrigin(r.subject,null))}_emitOrigin(e,o){this._ngZone.run(()=>e.next(o))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;const o=e.rootNode,r=this._rootNodeFocusListenerCount.get(o)||0;r||this._ngZone.runOutsideAngular(()=>{o.addEventListener("focus",this._rootNodeFocusAndBlurListener,J),o.addEventListener("blur",this._rootNodeFocusAndBlurListener,J)}),this._rootNodeFocusListenerCount.set(o,r+1),1==++this._monitoredElementCount&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe((0,lt.R)(this._stopInputModalityDetector)).subscribe(h=>{this._setOrigin(h,!0)}))}_removeGlobalListeners(e){const o=e.rootNode;if(this._rootNodeFocusListenerCount.has(o)){const r=this._rootNodeFocusListenerCount.get(o);r>1?this._rootNodeFocusListenerCount.set(o,r-1):(o.removeEventListener("focus",this._rootNodeFocusAndBlurListener,J),o.removeEventListener("blur",this._rootNodeFocusAndBlurListener,J),this._rootNodeFocusListenerCount.delete(o))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,o,r){this._setClasses(e,o),this._emitOrigin(r.subject,o),this._lastFocusOrigin=o}_getClosestElementsInfo(e){const o=[];return this._elementInfo.forEach((r,h)=>{(h===e||r.checkChildren&&h.contains(e))&&o.push([h,r])}),o}}return s.\u0275fac=function(e){return new(e||s)(p.LFG(p.R0b),p.LFG(z.t4),p.LFG(vt),p.LFG(l.K0,8),p.LFG(Mt,8))},s.\u0275prov=p.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const Te="cdk-high-contrast-black-on-white",ke="cdk-high-contrast-white-on-black",se="cdk-high-contrast-active";let At=(()=>{class s{constructor(e,o){this._platform=e,this._document=o}getHighContrastMode(){if(!this._platform.isBrowser)return 0;const e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);const o=this._document.defaultView||window,r=o&&o.getComputedStyle?o.getComputedStyle(e):null,h=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),h){case"rgb(0,0,0)":return 2;case"rgb(255,255,255)":return 1}return 0}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){const e=this._document.body.classList;e.remove(se),e.remove(Te),e.remove(ke),this._hasCheckedHighContrastMode=!0;const o=this.getHighContrastMode();1===o?(e.add(se),e.add(Te)):2===o&&(e.add(se),e.add(ke))}}}return s.\u0275fac=function(e){return new(e||s)(p.LFG(z.t4),p.LFG(l.K0))},s.\u0275prov=p.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},445:(G,F,u)=>{u.d(F,{Is:()=>L,vT:()=>k});var l=u(4650),p=u(6895);const T=new l.OlP("cdk-dir-doc",{providedIn:"root",factory:function C(){return(0,l.f3M)(p.K0)}});let L=(()=>{class v{constructor(M){if(this.value="ltr",this.change=new l.vpe,M){const x=M.documentElement?M.documentElement.dir:null,_=(M.body?M.body.dir:null)||x;this.value="ltr"===_||"rtl"===_?_:"ltr"}}ngOnDestroy(){this.change.complete()}}return v.\u0275fac=function(M){return new(M||v)(l.LFG(T,8))},v.\u0275prov=l.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),v})(),k=(()=>{class v{}return v.\u0275fac=function(M){return new(M||v)},v.\u0275mod=l.oAB({type:v}),v.\u0275inj=l.cJS({}),v})()},1281:(G,F,u)=>{u.d(F,{Ig:()=>p,fI:()=>k,su:()=>T});var l=u(4650);function p(m){return null!=m&&"false"!=`${m}`}function T(m,M=0){return function C(m){return!isNaN(parseFloat(m))&&!isNaN(Number(m))}(m)?Number(m):M}function k(m){return m instanceof l.SBq?m.nativeElement:m}},3353:(G,F,u)=>{u.d(F,{Oy:()=>$,i$:()=>S,kV:()=>U,qK:()=>v,sA:()=>V,t4:()=>C,ud:()=>L});var l=u(4650),p=u(6895);let T;try{T=typeof Intl<"u"&&Intl.v8BreakIterator}catch{T=!1}let I,C=(()=>{class d{constructor(j){this._platformId=j,this.isBrowser=this._platformId?(0,p.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!T)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return d.\u0275fac=function(j){return new(j||d)(l.LFG(l.Lbi))},d.\u0275prov=l.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})(),L=(()=>{class d{}return d.\u0275fac=function(j){return new(j||d)},d.\u0275mod=l.oAB({type:d}),d.\u0275inj=l.cJS({}),d})();const k=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function v(){if(I)return I;if("object"!=typeof document||!document)return I=new Set(k),I;let d=document.createElement("input");return I=new Set(k.filter(D=>(d.setAttribute("type",D),d.type===D))),I}let m,b,w;function S(d){return function M(){if(null==m&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>m=!0}))}finally{m=m||!1}return m}()?d:!!d.capture}function U(d){if(function N(){if(null==b){const d=typeof document<"u"?document.head:null;b=!(!d||!d.createShadowRoot&&!d.attachShadow)}return b}()){const D=d.getRootNode?d.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&D instanceof ShadowRoot)return D}return null}function V(d){return d.composedPath?d.composedPath()[0]:d.target}function $(){return typeof w.__karma__<"u"&&!!w.__karma__||typeof w.jasmine<"u"&&!!w.jasmine||typeof w.jest<"u"&&!!w.jest||typeof w.Mocha<"u"&&!!w.Mocha}w=typeof global<"u"?global:typeof window<"u"?window:{}},4859:(G,F,u)=>{u.d(F,{lW:()=>M,ot:()=>x});var l=u(4650),p=u(3238),T=u(7151);const C=["mat-button",""],L=["*"],v=["mat-button","mat-flat-button","mat-icon-button","mat-raised-button","mat-stroked-button","mat-mini-fab","mat-fab"],m=(0,p.pj)((0,p.Id)((0,p.Kr)(class{constructor(_){this._elementRef=_}})));let M=(()=>{class _ extends m{constructor(g,b,N){super(g),this._focusMonitor=b,this._animationMode=N,this.isRoundButton=this._hasHostAttributes("mat-fab","mat-mini-fab"),this.isIconButton=this._hasHostAttributes("mat-icon-button");for(const U of v)this._hasHostAttributes(U)&&this._getHostElement().classList.add(U);g.nativeElement.classList.add("mat-button-base"),this.isRoundButton&&(this.color="accent")}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}focus(g,b){g?this._focusMonitor.focusVia(this._getHostElement(),g,b):this._getHostElement().focus(b)}_getHostElement(){return this._elementRef.nativeElement}_isRippleDisabled(){return this.disableRipple||this.disabled}_hasHostAttributes(...g){return g.some(b=>this._getHostElement().hasAttribute(b))}}return _.\u0275fac=function(g){return new(g||_)(l.Y36(l.SBq),l.Y36(T.tE),l.Y36(l.QbO,8))},_.\u0275cmp=l.Xpm({type:_,selectors:[["button","mat-button",""],["button","mat-raised-button",""],["button","mat-icon-button",""],["button","mat-fab",""],["button","mat-mini-fab",""],["button","mat-stroked-button",""],["button","mat-flat-button",""]],viewQuery:function(g,b){if(1&g&&l.Gf(p.wG,5),2&g){let N;l.iGM(N=l.CRH())&&(b.ripple=N.first)}},hostAttrs:[1,"mat-focus-indicator"],hostVars:5,hostBindings:function(g,b){2&g&&(l.uIk("disabled",b.disabled||null),l.ekj("_mat-animation-noopable","NoopAnimations"===b._animationMode)("mat-button-disabled",b.disabled))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color"},exportAs:["matButton"],features:[l.qOj],attrs:C,ngContentSelectors:L,decls:4,vars:5,consts:[[1,"mat-button-wrapper"],["matRipple","",1,"mat-button-ripple",3,"matRippleDisabled","matRippleCentered","matRippleTrigger"],[1,"mat-button-focus-overlay"]],template:function(g,b){1&g&&(l.F$t(),l.TgZ(0,"span",0),l.Hsn(1),l.qZA(),l._UZ(2,"span",1)(3,"span",2)),2&g&&(l.xp6(2),l.ekj("mat-button-ripple-round",b.isRoundButton||b.isIconButton),l.Q6J("matRippleDisabled",b._isRippleDisabled())("matRippleCentered",b.isIconButton)("matRippleTrigger",b._getHostElement()))},dependencies:[p.wG],styles:[".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],encapsulation:2,changeDetection:0}),_})(),x=(()=>{class _{}return _.\u0275fac=function(g){return new(g||_)},_.\u0275mod=l.oAB({type:_}),_.\u0275inj=l.cJS({imports:[[p.si,p.BQ],p.BQ]}),_})()},3238:(G,F,u)=>{u.d(F,{rD:()=>ce,BQ:()=>V,wG:()=>fe,si:()=>_e,pj:()=>$,Kr:()=>d,Id:()=>w,FD:()=>j});var l=u(4650),p=u(7151),T=u(445);const C=new l.GfV("13.0.0");var L=u(6895),I=u(3353),k=u(1281),v=u(7579);const N=new l.GfV("13.0.0"),K=new l.OlP("mat-sanity-checks",{providedIn:"root",factory:function U(){return!0}});let V=(()=>{class c{constructor(n,a,f){this._hasDoneGlobalChecks=!1,this._document=f,n._applyBodyHighContrastModeCssClasses(),this._sanityChecks=a,this._hasDoneGlobalChecks||(this._checkDoctypeIsDefined(),this._checkThemeIsPresent(),this._checkCdkVersionMatch(),this._hasDoneGlobalChecks=!0)}_checkIsEnabled(n){return!(!(0,l.X6Q)()||(0,I.Oy)())&&("boolean"==typeof this._sanityChecks?this._sanityChecks:!!this._sanityChecks[n])}_checkDoctypeIsDefined(){this._checkIsEnabled("doctype")&&!this._document.doctype&&console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")}_checkThemeIsPresent(){if(!this._checkIsEnabled("theme")||!this._document.body||"function"!=typeof getComputedStyle)return;const n=this._document.createElement("div");n.classList.add("mat-theme-loaded-marker"),this._document.body.appendChild(n);const a=getComputedStyle(n);a&&"none"!==a.display&&console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"),n.remove()}_checkCdkVersionMatch(){this._checkIsEnabled("version")&&N.full!==C.full&&console.warn("The Angular Material version ("+N.full+") does not match the Angular CDK version ("+C.full+").\nPlease ensure the versions of these two packages exactly match.")}}return c.\u0275fac=function(n){return new(n||c)(l.LFG(p.qm),l.LFG(K,8),l.LFG(L.K0))},c.\u0275mod=l.oAB({type:c}),c.\u0275inj=l.cJS({imports:[[T.vT],T.vT]}),c})();function w(c){return class extends c{constructor(...i){super(...i),this._disabled=!1}get disabled(){return this._disabled}set disabled(i){this._disabled=(0,k.Ig)(i)}}}function $(c,i){return class extends c{constructor(...n){super(...n),this.defaultColor=i,this.color=i}get color(){return this._color}set color(n){const a=n||this.defaultColor;a!==this._color&&(this._color&&this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),a&&this._elementRef.nativeElement.classList.add(`mat-${a}`),this._color=a)}}}function d(c){return class extends c{constructor(...i){super(...i),this._disableRipple=!1}get disableRipple(){return this._disableRipple}set disableRipple(i){this._disableRipple=(0,k.Ig)(i)}}}function j(c){return class extends c{constructor(...i){super(...i),this.stateChanges=new v.x,this.errorState=!1}updateErrorState(){const i=this.errorState,R=(this.errorStateMatcher||this._defaultErrorStateMatcher).isErrorState(this.ngControl?this.ngControl.control:null,this._parentFormGroup||this._parentForm);R!==i&&(this.errorState=R,this.stateChanges.next())}}}let ce=(()=>{class c{isErrorState(n,a){return!!(n&&n.invalid&&(n.touched||a&&a.submitted))}}return c.\u0275fac=function(n){return new(n||c)},c.\u0275prov=l.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})();class le{constructor(i,n,a){this._renderer=i,this.element=n,this.config=a,this.state=3}fadeOut(){this._renderer.fadeOutRipple(this)}}const ee={enterDuration:225,exitDuration:150},Q=(0,I.i$)({passive:!0}),te=["mousedown","touchstart"],ne=["mouseup","mouseleave","touchend","touchcancel"];class de{constructor(i,n,a,f){this._target=i,this._ngZone=n,this._isPointerDown=!1,this._activeRipples=new Set,this._pointerUpEventsRegistered=!1,f.isBrowser&&(this._containerElement=(0,k.fI)(a))}fadeInRipple(i,n,a={}){const f=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),R={...ee,...a.animation};a.centered&&(i=f.left+f.width/2,n=f.top+f.height/2);const P=a.radius||function me(c,i,n){const a=Math.max(Math.abs(c-n.left),Math.abs(c-n.right)),f=Math.max(Math.abs(i-n.top),Math.abs(i-n.bottom));return Math.sqrt(a*a+f*f)}(i,n,f),ge=i-f.left,be=n-f.top,ie=R.enterDuration,B=document.createElement("div");B.classList.add("mat-ripple-element"),B.style.left=ge-P+"px",B.style.top=be-P+"px",B.style.height=2*P+"px",B.style.width=2*P+"px",null!=a.color&&(B.style.backgroundColor=a.color),B.style.transitionDuration=`${ie}ms`,this._containerElement.appendChild(B),function he(c){window.getComputedStyle(c).getPropertyValue("opacity")}(B),B.style.transform="scale(1)";const H=new le(this,B,a);return H.state=0,this._activeRipples.add(H),a.persistent||(this._mostRecentTransientRipple=H),this._runTimeoutOutsideZone(()=>{const ve=H===this._mostRecentTransientRipple;H.state=1,!a.persistent&&(!ve||!this._isPointerDown)&&H.fadeOut()},ie),H}fadeOutRipple(i){const n=this._activeRipples.delete(i);if(i===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),this._activeRipples.size||(this._containerRect=null),!n)return;const a=i.element,f={...ee,...i.config.animation};a.style.transitionDuration=`${f.exitDuration}ms`,a.style.opacity="0",i.state=2,this._runTimeoutOutsideZone(()=>{i.state=3,a.remove()},f.exitDuration)}fadeOutAll(){this._activeRipples.forEach(i=>i.fadeOut())}fadeOutAllNonPersistent(){this._activeRipples.forEach(i=>{i.config.persistent||i.fadeOut()})}setupTriggerEvents(i){const n=(0,k.fI)(i);!n||n===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=n,this._registerEvents(te))}handleEvent(i){"mousedown"===i.type?this._onMousedown(i):"touchstart"===i.type?this._onTouchStart(i):this._onPointerUp(),this._pointerUpEventsRegistered||(this._registerEvents(ne),this._pointerUpEventsRegistered=!0)}_onMousedown(i){const n=(0,p.X6)(i),a=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+800;!this._target.rippleDisabled&&!n&&!a&&(this._isPointerDown=!0,this.fadeInRipple(i.clientX,i.clientY,this._target.rippleConfig))}_onTouchStart(i){if(!this._target.rippleDisabled&&!(0,p.yG)(i)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;const n=i.changedTouches;for(let a=0;a<n.length;a++)this.fadeInRipple(n[a].clientX,n[a].clientY,this._target.rippleConfig)}}_onPointerUp(){!this._isPointerDown||(this._isPointerDown=!1,this._activeRipples.forEach(i=>{!i.config.persistent&&(1===i.state||i.config.terminateOnPointerUp&&0===i.state)&&i.fadeOut()}))}_runTimeoutOutsideZone(i,n=0){this._ngZone.runOutsideAngular(()=>setTimeout(i,n))}_registerEvents(i){this._ngZone.runOutsideAngular(()=>{i.forEach(n=>{this._triggerElement.addEventListener(n,this,Q)})})}_removeTriggerEvents(){this._triggerElement&&(te.forEach(i=>{this._triggerElement.removeEventListener(i,this,Q)}),this._pointerUpEventsRegistered&&ne.forEach(i=>{this._triggerElement.removeEventListener(i,this,Q)}))}}const pe=new l.OlP("mat-ripple-global-options");let fe=(()=>{class c{constructor(n,a,f,R,P){this._elementRef=n,this._animationMode=P,this.radius=0,this._disabled=!1,this._isInitialized=!1,this._globalOptions=R||{},this._rippleRenderer=new de(this,a,n,f)}get disabled(){return this._disabled}set disabled(n){n&&this.fadeOutAllNonPersistent(),this._disabled=n,this._setupTriggerEventsIfEnabled()}get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(n){this._trigger=n,this._setupTriggerEventsIfEnabled()}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:{...this._globalOptions.animation,..."NoopAnimations"===this._animationMode?{enterDuration:0,exitDuration:0}:{},...this.animation},terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(n,a=0,f){return"number"==typeof n?this._rippleRenderer.fadeInRipple(n,a,{...this.rippleConfig,...f}):this._rippleRenderer.fadeInRipple(0,0,{...this.rippleConfig,...n})}}return c.\u0275fac=function(n){return new(n||c)(l.Y36(l.SBq),l.Y36(l.R0b),l.Y36(I.t4),l.Y36(pe,8),l.Y36(l.QbO,8))},c.\u0275dir=l.lG2({type:c,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(n,a){2&n&&l.ekj("mat-ripple-unbounded",a.unbounded)},inputs:{color:["matRippleColor","color"],unbounded:["matRippleUnbounded","unbounded"],centered:["matRippleCentered","centered"],radius:["matRippleRadius","radius"],animation:["matRippleAnimation","animation"],disabled:["matRippleDisabled","disabled"],trigger:["matRippleTrigger","trigger"]},exportAs:["matRipple"]}),c})(),_e=(()=>{class c{}return c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=l.oAB({type:c}),c.\u0275inj=l.cJS({imports:[[V,I.ud],V]}),c})()}}]);