"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2622],{2622:(an,M,u)=>{u.r(M),u.d(M,{HomePageModule:()=>sn});var p=u(6895),h=u(433),l=u(2723),$=u(2261),n=u(1571);let I=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[p.ez,l.Pc]}),e})(),J=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[p.ez]}),e})();var B=u(9430),g=u(5684),d=u(5698),m=u(9300),a=(()=>{return(e=a||(a={})).StopEngine="prog0",e.StartEngine="prog1",e.OpenLock="prog4",e.CloseLock="prog5",e.FanOn="prog2",e.FanOff="prog3",e.Scenario6="prog6",e.Scenario7="prog7",e.Scenario8="prog8",e.Scenario9="prog9",e.IN2ControlOn="control2=1",e.IN2ControlOff="control2=0",e.ThermostatOn="termostat=1",e.ThermostatOff="termostat=0",e.StarterCrankTime1Sec="starter=1000",e.StarterCrankTime2And5Sec="starter=2500",e.StarterCrankTime4Sec="starter=4000",e.Update="update",e.WiFiOn="wifion",e.Reboot="reboot",a;var e})(),c=(()=>{return(e=c||(c={}))[e.Voltage=0]="Voltage",e[e.K1=1]="K1",e[e.K2=2]="K2",e[e.K3=3]="K3",e[e.K4=4]="K4",e[e.K5=5]="K5",e[e.IN1=6]="IN1",e[e.IN2=7]="IN2",c;var e})(),_=(()=>{return(e=_||(_={}))[e.Temp1=0]="Temp1",e[e.Temp2=1]="Temp2",e[e.Temp3=2]="Temp3",_;var e})(),N=u(542),f=u(7019),H=u(9016);function q(e,i){if(1&e&&n._UZ(0,"div",5),2&e){const o=n.oxw();n.Akn("--value:"+o.holdTime+"s")}}function j(e,i){1&e&&n._UZ(0,"ion-spinner",6)}function k(e,i){if(1&e&&n._UZ(0,"img",7),2&e){const o=n.oxw();n.Q6J("src",o.iconUrl,n.LSH)}}const z=["*"];let D=(()=>{class e{constructor(){this.holdTimeEnd=new n.vpe}onStartStopPressed(o){o.cancelable&&o.preventDefault(),this.disabled||(0!==this.holdTime?(this.isButtonPressed=!0,this.pressedTimerId=setTimeout(()=>{this.holdTimeEnd.emit(),this.isButtonPressed=!1,clearTimeout(this.pressedTimerId)},1e3*this.holdTime)):this.holdTimeEnd.emit())}onStartStopUnPressed(o){o.cancelable&&o.preventDefault(),this.isButtonPressed=!1,clearTimeout(this.pressedTimerId)}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["az-hold-button"]],inputs:{disabled:"disabled",isLoading:"isLoading",holdTime:"holdTime",iconUrl:"iconUrl"},outputs:{holdTimeEnd:"holdTimeEnd"},ngContentSelectors:z,decls:6,vars:6,consts:[["class","progressbar",3,"style",4,"ngIf"],["shape","round",1,"hold-button",3,"disabled","touchstart","touchend","mousedown","mouseup"],[1,"hold-button__wrapper"],["class","hold-button__spinner","name","crescent",4,"ngIf"],["class","hold-button__icon","alt","",3,"src",4,"ngIf"],[1,"progressbar"],["name","crescent",1,"hold-button__spinner"],["alt","",1,"hold-button__icon",3,"src"]],template:function(o,t){1&o&&(n.F$t(),n.YNc(0,q,1,2,"div",0),n.TgZ(1,"ion-button",1),n.NdJ("touchstart",function(r){return t.onStartStopPressed(r)})("touchend",function(r){return t.onStartStopUnPressed(r)})("mousedown",function(r){return t.onStartStopPressed(r)})("mouseup",function(r){return t.onStartStopUnPressed(r)}),n.TgZ(2,"div",2),n.YNc(3,j,1,0,"ion-spinner",3),n.YNc(4,k,1,1,"img",4),n.Hsn(5),n.qZA()()),2&o&&(n.Q6J("ngIf",t.isButtonPressed),n.xp6(1),n.ekj("disabled",t.disabled),n.Q6J("disabled",t.disabled),n.xp6(2),n.Q6J("ngIf",t.isLoading),n.xp6(1),n.Q6J("ngIf",!!t.iconUrl))},dependencies:[p.O5,l.YG,l.PQ],styles:['[_nghost-%COMP%]{width:100%;height:100%}[_nghost-%COMP%]     .button-round{--border-radius: 100%;--padding-end: 0;--padding-start: 0;border-radius:100%;border:4px solid #0c7d60}.hold-button[_ngcontent-%COMP%]{width:100%;height:100%;box-sizing:border-box;padding:0;margin:0}.hold-button__wrapper[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;padding:0}.hold-button__icon[_ngcontent-%COMP%]{width:50%;height:50%}.hold-button__spinner[_ngcontent-%COMP%]{position:absolute;width:90%;height:90%}.hold-button.disabled[_ngcontent-%COMP%]{border:none}@property --pgPercentage{syntax: "<number>"; inherits: false; initial-value: 0;}.progressbar[_ngcontent-%COMP%]{--pgPercentage: 100;position:absolute;animation:_ngcontent-%COMP%_growProgressBar var(--value) 1 linear;width:100%;height:100%;border-radius:50%;display:grid;place-items:center;background:radial-gradient(closest-side,white 85%,transparent 0 99.9%,white 0),conic-gradient(#369 calc(var(--pgPercentage) * 1%),#def 0)}@keyframes _ngcontent-%COMP%_growProgressBar{0%,33%{--pgPercentage: 0}to{--pgPercentage: 100}}']}),e})();function K(e,i){if(1&e&&(n.TgZ(0,"span",6),n._uU(1),n.ALo(2,"async"),n.qZA()),2&e){const o=n.oxw();let t;n.xp6(1),n.hij(" ",1===(null==(t=n.lcZ(2,1,o.sensorsData$))||null==t.pin?null:t.pin[o.pinStatuses.K2])?"\u0421\u0442\u043e\u043f \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f":"\u0417\u0430\u043f\u0443\u0441\u043a \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f"," ")}}let Q=(()=>{class e{constructor(o){this.mqttService=o,this.sensorsData$=this.mqttService.sensorsData$,this.pinStatuses=c}startStopEngine(){this.sensorsData$.pipe((0,m.h)(Boolean),(0,d.q)(1)).subscribe(o=>{var t,s;0===(null===(t=o.pin)||void 0===t?void 0:t[c.K2])&&this.mqttService.sendCommand(a.StartEngine),1===(null===(s=o.pin)||void 0===s?void 0:s[c.K2])&&this.mqttService.sendCommand(a.StopEngine),this.runStartStopSpinner("isStartStopExecuting")})}fanOn(){this.mqttService.sendCommand(a.FanOn),this.runStartStopSpinner("isFanOnExecuting")}fanOff(){this.mqttService.sendCommand(a.FanOff),this.runStartStopSpinner("isFanOffExecuting")}openLock(){this.mqttService.sendCommand(a.OpenLock),this.runStartStopSpinner("isOpenLockExecuting")}closeLock(){this.mqttService.sendCommand(a.CloseLock),this.runStartStopSpinner("isCloseLockExecuting")}runStartStopSpinner(o){this[o]=!0,"isStartStopExecuting"===o||"isFanOnExecuting"===o||"isFanOffExecuting"===o?this.sensorsData$.pipe((0,g.T)(1),(0,m.h)(Boolean),(0,d.q)(1)).subscribe(()=>{this[o]=!1}):setTimeout(()=>{this[o]=!1},2500)}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(f.K))},e.\u0275cmp=n.Xpm({type:e,selectors:[["az-main-control-buttons"]],decls:20,vars:35,consts:[[1,"control-buttons"],[1,"control-buttons__wrapper"],[1,"small-button"],[3,"isLoading","disabled","iconUrl","holdTime","holdTimeEnd"],[1,"control-buttons__start-stop-button-wrapper"],["class","control-buttons__start-stop-title",4,"ngIf"],[1,"control-buttons__start-stop-title"]],template:function(o,t){if(1&o&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"az-hold-button",3),n.NdJ("holdTimeEnd",function(){return t.fanOn()}),n.ALo(4,"async"),n.qZA()(),n.TgZ(5,"div",2)(6,"az-hold-button",3),n.NdJ("holdTimeEnd",function(){return t.fanOff()}),n.ALo(7,"async"),n.qZA()()(),n.TgZ(8,"div",4)(9,"az-hold-button",3),n.NdJ("holdTimeEnd",function(){return t.startStopEngine()}),n.ALo(10,"async"),n.ALo(11,"async"),n.YNc(12,K,3,3,"span",5),n.qZA()(),n.TgZ(13,"div",1)(14,"div",2)(15,"az-hold-button",3),n.NdJ("holdTimeEnd",function(){return t.openLock()}),n.ALo(16,"async"),n.qZA()(),n.TgZ(17,"div",2)(18,"az-hold-button",3),n.NdJ("holdTimeEnd",function(){return t.closeLock()}),n.ALo(19,"async"),n.qZA()()()()),2&o){let s;n.xp6(3),n.Q6J("isLoading",t.isFanOnExecuting)("disabled",t.isFanOnExecuting||!n.lcZ(4,23,t.sensorsData$))("iconUrl","assets/svg/fan-on.svg")("holdTime",1),n.xp6(3),n.Q6J("isLoading",t.isFanOffExecuting)("disabled",t.isFanOffExecuting||!n.lcZ(7,25,t.sensorsData$))("iconUrl","assets/svg/fan-off.svg")("holdTime",1),n.xp6(3),n.ekj("stop-color",1===(null==(s=n.lcZ(10,27,t.sensorsData$))||null==s.pin?null:s.pin[t.pinStatuses.K2])&&!t.isStartStopExecuting),n.Q6J("isLoading",t.isStartStopExecuting)("disabled",t.isStartStopExecuting||!n.lcZ(11,29,t.sensorsData$))("iconUrl","assets/svg/car.svg")("holdTime",1.5),n.xp6(3),n.Q6J("ngIf",!t.isStartStopExecuting),n.xp6(3),n.Q6J("isLoading",t.isOpenLockExecuting)("disabled",t.isOpenLockExecuting||!n.lcZ(16,31,t.sensorsData$))("iconUrl","assets/svg/open-lock.svg")("holdTime",1),n.xp6(3),n.Q6J("isLoading",t.isCloseLockExecuting)("disabled",t.isCloseLockExecuting||!n.lcZ(19,33,t.sensorsData$))("iconUrl","assets/svg/close-lock.svg")("holdTime",1)}},dependencies:[p.O5,D,p.Ov],styles:[".control-buttons[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;justify-content:space-evenly;column-gap:10px}.control-buttons__start-stop-button-wrapper[_ngcontent-%COMP%]{position:relative;width:150px;height:150px;display:flex;justify-content:center;margin:25px 0}.control-buttons__start-stop-title[_ngcontent-%COMP%]{font-size:12px;line-height:21px}.control-buttons__wrapper[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;justify-content:space-evenly}.control-buttons__wrapper[_ngcontent-%COMP%]   .small-button[_ngcontent-%COMP%]{position:relative;width:65px;height:65px}.stop-color[_ngcontent-%COMP%]     .hold-button{background-color:#b71c1c;border:4px solid #751212;--background: #b71c1c}"]}),e})();function V(e,i){if(1&e&&(n.TgZ(0,"ion-select-option",7),n._uU(1),n.qZA()),2&e){const o=i.$implicit;n.Q6J("value",o.value),n.xp6(1),n.Oqu(o.viewValue)}}const E=[{value:a.Scenario6,viewValue:"\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439 6"},{value:a.Scenario7,viewValue:"\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439 7"},{value:a.Scenario8,viewValue:"\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439 8"},{value:a.Scenario9,viewValue:"\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0439 9"},{value:a.IN2ControlOn,viewValue:"\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c In2 \u0412\u041a\u041b"},{value:a.IN2ControlOff,viewValue:"\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c In2 \u0412\u042b\u041a\u041b"},{value:a.ThermostatOn,viewValue:"\u0422\u0435\u0440\u043c\u043e\u0441\u0442\u0430\u0442 \u0412\u041a\u041b"},{value:a.ThermostatOff,viewValue:"\u0422\u0435\u0440\u043c\u043e\u0441\u0442\u0430\u0442 \u0412\u042b\u041a\u041b"},{value:a.StarterCrankTime1Sec,viewValue:"\u0412\u0440\u0435\u043c\u044f \u043f\u0440\u043e\u043a\u0440\u0443\u0442\u043a\u0438 \u0441\u0442\u0430\u0440\u0442\u0435\u0440\u043e\u043c 1 \u0441\u0435\u043a"},{value:a.StarterCrankTime2And5Sec,viewValue:"\u0412\u0440\u0435\u043c\u044f \u043f\u0440\u043e\u043a\u0440\u0443\u0442\u043a\u0438 \u0441\u0442\u0430\u0440\u0442\u0435\u0440\u043e\u043c 2.5 \u0441\u0435\u043a"},{value:a.StarterCrankTime4Sec,viewValue:"\u0412\u0440\u0435\u043c\u044f \u043f\u0440\u043e\u043a\u0440\u0443\u0442\u043a\u0438 \u0441\u0442\u0430\u0440\u0442\u0435\u0440\u043e\u043c 4 \u0441\u0435\u043a"},{value:a.WiFiOn,viewValue:"\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c WI-FI"},{value:a.Reboot,viewValue:"\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u043b\u0435\u0440"}];let Y=(()=>{class e{constructor(o){this.mqttService=o,this.actions=E,this.selectedAction=E[0].value}sendCommand(){this.mqttService.sendCommand(this.selectedAction),this.isLoading=!0,this.mqttService.sensorsData$.pipe((0,g.T)(1),(0,m.h)(Boolean),(0,d.q)(1)).subscribe(()=>{this.isLoading=!1})}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(f.K))},e.\u0275cmp=n.Xpm({type:e,selectors:[["az-action-selector"]],decls:9,vars:6,consts:[[1,"actions"],[1,"actions__label"],[1,"actions__list"],["placeholder","\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435","cancel-text","\u041e\u0442\u043c\u0435\u043d\u0430","interface","action-sheet",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"actions__send-button"],[3,"isLoading","disabled","iconUrl","holdTime","holdTimeEnd"],[3,"value"]],template:function(o,t){1&o&&(n.TgZ(0,"div",0)(1,"ion-label",1),n._uU(2,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),n.qZA(),n.TgZ(3,"ion-list",2)(4,"ion-item")(5,"ion-select",3),n.NdJ("ngModelChange",function(r){return t.selectedAction=r}),n.YNc(6,V,2,2,"ion-select-option",4),n.qZA()()(),n.TgZ(7,"div",5)(8,"az-hold-button",6),n.NdJ("holdTimeEnd",function(){return t.sendCommand()}),n.qZA()()()),2&o&&(n.xp6(5),n.Q6J("ngModel",t.selectedAction),n.xp6(1),n.Q6J("ngForOf",t.actions),n.xp6(2),n.Q6J("isLoading",t.isLoading)("disabled",t.isLoading)("iconUrl","assets/svg/send-command.svg")("holdTime",1))},dependencies:[p.sg,h.JJ,h.On,l.Ie,l.Q$,l.q_,l.t9,l.n0,l.QI,D],styles:[".actions[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}.actions__label[_ngcontent-%COMP%]{font-size:14px;font-weight:700;margin-bottom:5px}.actions__list[_ngcontent-%COMP%]{margin-bottom:10px}.actions__send-button[_ngcontent-%COMP%]{position:relative;width:55px;height:55px;font-size:12px}"]}),e})(),R=(()=>{class e{transform(o){return o?new Date(1e3*o).toISOString().substring(14,19):"--.--"}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275pipe=n.Yjl({name:"toTime",type:e,pure:!0}),e})();const G=["popover"];function W(e,i){1&e&&n._UZ(0,"ion-spinner")}function X(e,i){1&e&&(n.TgZ(0,"span"),n._uU(1,"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"),n.qZA())}function nn(e,i){if(1&e){const o=n.EpF();n.TgZ(0,"ion-content",20)(1,"div",21),n._uU(2),n.qZA(),n.TgZ(3,"ion-range",22),n.NdJ("ionChange",function(s){n.CHM(o);const r=n.oxw();return n.KtG(r.onRangeChange(s))}),n.qZA(),n.TgZ(4,"ion-button",23),n.NdJ("click",function(){n.CHM(o);const s=n.oxw();return n.KtG(s.saveTimer())}),n.YNc(5,W,1,0,"ion-spinner",19),n.YNc(6,X,2,0,"span",19),n.qZA()()}if(2&e){const o=n.oxw();n.Q6J("scrollY",!1),n.xp6(2),n.hij("\u041c\u0438\u043d\u0443\u0442: ",o.timerValue,""),n.xp6(1),n.Q6J("min",0)("max",60)("snaps",!0)("ticks",!0)("step",5),n.xp6(2),n.Q6J("ngIf",o.isTimerSetInProgress),n.xp6(1),n.Q6J("ngIf",!o.isTimerSetInProgress)}}function en(e,i){if(1&e&&(n.TgZ(0,"span"),n._uU(1),n.ALo(2,"async"),n.qZA()),2&e){const o=n.oxw();n.xp6(1),n.hij("\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e \u0432: ",n.lcZ(2,1,o.updateTime$),"")}}const tn=[{path:"",component:(()=>{class e{constructor(o,t){this.mqttService=o,this.notifier=t,this.updateTime$=this.mqttService.updateTime$,this.sensorsData$=this.mqttService.sensorsData$,this.pinStatuses=c,this.temperatureStatuses=_,this.timeStatuses=N.y,this.timerValue=0,this.timerData$=this.mqttService.timerData$,this.sliderOptions={loop:!0,direction:"horizontal"}}toggleTimerSettingPopover(o,t){t&&(this.popover.event=t),this.isTimerSettingOpen=o}onRangeChange(o){this.timerValue=Number(o.detail.value)}saveTimer(){this.isTimerSetInProgress=!0,this.mqttService.setTimer(this.timerValue),this.mqttService.sensorsData$.pipe((0,g.T)(1),(0,d.q)(1)).subscribe(()=>{this.notifier.notify("success","\u0422\u0430\u0439\u043c\u0435\u0440 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d"),this.isTimerSetInProgress=!1,this.toggleTimerSettingPopover(!1)})}updateSensorsData(o){this.mqttService.sendCommand(a.Update),this.isUpdateInProgress=!0,this.sensorsData$.pipe((0,g.T)(1),(0,m.h)(Boolean),(0,d.q)(1)).subscribe(()=>{this.isUpdateInProgress=!1,o&&o.target.complete()})}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(f.K),n.Y36(H.lG))},e.\u0275cmp=n.Xpm({type:e,selectors:[["az-home"]],viewQuery:function(o,t){if(1&o&&n.Gf(G,5),2&o){let s;n.iGM(s=n.CRH())&&(t.popover=s.first)}},decls:103,vars:69,consts:[[3,"scrollY"],["slot","fixed",3,"ionRefresh"],[1,"dashboard"],[1,"dashboard__section"],[1,"dashboard__sensor-data"],["src","assets/svg/voltage.svg","alt","Voltage",1,"dashboard__sensor-icon"],[1,"dashboard__sensor-label"],[1,"dashboard__sensor-data",3,"click"],["src","assets/svg/timer.svg",1,"dashboard__sensor-icon"],[3,"isOpen","didDismiss"],["popover",""],["src","assets/svg/counter.svg",1,"dashboard__sensor-icon"],["src","assets/svg/temperature.svg",1,"dashboard__sensor-icon"],[1,"dashboard__sensor-prompt"],["src","assets/svg/channel.svg",1,"dashboard__sensor-icon"],["src","assets/svg/ignition.svg",1,"dashboard__sensor-icon"],["src","assets/svg/relay.svg",1,"dashboard__sensor-icon"],[3,"options","pager"],[1,"dashboard__update-time"],[4,"ngIf"],[1,"dashboard__popover",3,"scrollY"],[1,"dashboard__popover-title"],[3,"min","max","snaps","ticks","step","ionChange"],[1,"dashboard__popover-button","ion-text-center",3,"click"]],template:function(o,t){if(1&o&&(n.TgZ(0,"ion-content",0)(1,"ion-refresher",1),n.NdJ("ionRefresh",function(r){return t.updateSensorsData(r)}),n._UZ(2,"ion-refresher-content"),n.qZA(),n.TgZ(3,"div",2)(4,"div",3)(5,"div",4),n._UZ(6,"img",5),n.TgZ(7,"span",6),n._uU(8),n.ALo(9,"async"),n.qZA()(),n.TgZ(10,"div",4)(11,"div",7),n.NdJ("click",function(r){return t.toggleTimerSettingPopover(!0,r)}),n._UZ(12,"img",8),n.TgZ(13,"span",6),n._uU(14),n.ALo(15,"toTime"),n.ALo(16,"async"),n.qZA()(),n.TgZ(17,"ion-popover",9,10),n.NdJ("didDismiss",function(){return t.toggleTimerSettingPopover(!1)}),n.YNc(19,nn,7,9,"ng-template"),n.qZA()(),n.TgZ(20,"div",4),n._UZ(21,"img",11),n.TgZ(22,"span",6),n._uU(23),n.ALo(24,"async"),n.qZA()(),n.TgZ(25,"div",4),n._UZ(26,"img",12),n.TgZ(27,"span",6),n._uU(28),n.ALo(29,"async"),n.qZA(),n.TgZ(30,"span",13),n._uU(31,"\u0414\u0430\u0442\u0447\u0438\u043a \u21161"),n.qZA()(),n.TgZ(32,"div",4),n._UZ(33,"img",12),n.TgZ(34,"span",6),n._uU(35),n.ALo(36,"async"),n.qZA(),n.TgZ(37,"span",13),n._uU(38,"\u0414\u0430\u0442\u0447\u0438\u043a \u21162"),n.qZA()(),n.TgZ(39,"div",4),n._UZ(40,"img",12),n.TgZ(41,"span",6),n._uU(42),n.ALo(43,"async"),n.qZA(),n.TgZ(44,"span",13),n._uU(45,"\u0414\u0430\u0442\u0447\u0438\u043a \u21163"),n.qZA()(),n.TgZ(46,"div",4),n._UZ(47,"img",14),n.TgZ(48,"span",6),n.ALo(49,"async"),n._uU(50),n.ALo(51,"async"),n.qZA(),n.TgZ(52,"span",13),n._uU(53,"\u041a\u0430\u043d\u0430\u043b IN1"),n.qZA()(),n.TgZ(54,"div",4),n._UZ(55,"img",14),n.TgZ(56,"span",6),n.ALo(57,"async"),n._uU(58),n.ALo(59,"async"),n.qZA(),n.TgZ(60,"span",13),n._uU(61,"\u041a\u0430\u043d\u0430\u043b IN2"),n.qZA()(),n.TgZ(62,"div",4),n._UZ(63,"img",15),n.TgZ(64,"span",6),n.ALo(65,"async"),n._uU(66),n.ALo(67,"async"),n.qZA(),n.TgZ(68,"span",13),n._uU(69,"\u0417\u0430\u0436\u0438\u0433\u0430\u043d\u0438\u0435"),n.qZA()(),n.TgZ(70,"div",4),n._UZ(71,"img",16),n.TgZ(72,"span",6),n.ALo(73,"async"),n._uU(74),n.ALo(75,"async"),n.qZA(),n.TgZ(76,"span",13),n._uU(77,"\u0420\u0435\u043b\u0435 K1"),n.qZA()(),n.TgZ(78,"div",4),n._UZ(79,"img",16),n.TgZ(80,"span",6),n.ALo(81,"async"),n._uU(82),n.ALo(83,"async"),n.qZA(),n.TgZ(84,"span",13),n._uU(85,"\u0420\u0435\u043b\u0435 K4"),n.qZA()(),n.TgZ(86,"div",4),n._UZ(87,"img",16),n.TgZ(88,"span",6),n.ALo(89,"async"),n._uU(90),n.ALo(91,"async"),n.qZA(),n.TgZ(92,"span",13),n._uU(93,"\u0420\u0435\u043b\u0435 K5"),n.qZA()()(),n.TgZ(94,"div",3)(95,"ion-slides",17)(96,"ion-slide"),n._UZ(97,"az-main-control-buttons"),n.qZA(),n.TgZ(98,"ion-slide"),n._UZ(99,"az-action-selector"),n.qZA()()(),n.TgZ(100,"div",18),n.YNc(101,en,3,3,"span",19),n.ALo(102,"async"),n.qZA()()()),2&o){let s,r,v,T,b,Z,C,S,O,A,x,w,P,y,U,F,L;n.Q6J("scrollY",!1),n.xp6(8),n.hij("",(null==(s=n.lcZ(9,29,t.sensorsData$))||null==s.pin?null:s.pin[t.pinStatuses.Voltage])||"--"," V"),n.xp6(6),n.Oqu(n.lcZ(15,31,n.lcZ(16,33,t.timerData$))),n.xp6(3),n.Q6J("isOpen",t.isTimerSettingOpen),n.xp6(6),n.Oqu((null==(r=n.lcZ(24,35,t.sensorsData$))||null==r.time?null:r.time[t.timeStatuses.Count])||"--.--"),n.xp6(5),n.hij("",(null==(v=n.lcZ(29,37,t.sensorsData$))||null==v.temp?null:v.temp[t.temperatureStatuses.Temp1])||"--"," \xb0"),n.xp6(7),n.hij("",(null==(T=n.lcZ(36,39,t.sensorsData$))||null==T.temp?null:T.temp[t.temperatureStatuses.Temp2])||"--"," \xb0"),n.xp6(7),n.hij("",(null==(b=n.lcZ(43,41,t.sensorsData$))||null==b.temp?null:b.temp[t.temperatureStatuses.Temp3])||"--"," \xb0"),n.xp6(6),n.ekj("active-color",1===(null==(Z=n.lcZ(49,43,t.sensorsData$))||null==Z.pin?null:Z.pin[t.pinStatuses.IN1])),n.xp6(2),n.hij(" ",1===(null==(C=n.lcZ(51,45,t.sensorsData$))||null==C.pin?null:C.pin[t.pinStatuses.IN1])?"ON":"OFF"," "),n.xp6(6),n.ekj("active-color",1===(null==(S=n.lcZ(57,47,t.sensorsData$))||null==S.pin?null:S.pin[t.pinStatuses.IN2])),n.xp6(2),n.hij(" ",1===(null==(O=n.lcZ(59,49,t.sensorsData$))||null==O.pin?null:O.pin[t.pinStatuses.IN2])?"ON":"OFF"," "),n.xp6(6),n.ekj("active-color",1===(null==(A=n.lcZ(65,51,t.sensorsData$))||null==A.pin?null:A.pin[t.pinStatuses.K2])),n.xp6(2),n.hij(" ",1===(null==(x=n.lcZ(67,53,t.sensorsData$))||null==x.pin?null:x.pin[t.pinStatuses.K2])?"ON":"OFF"," "),n.xp6(6),n.ekj("active-color",1===(null==(w=n.lcZ(73,55,t.sensorsData$))||null==w.pin?null:w.pin[t.pinStatuses.K1])),n.xp6(2),n.hij(" ",1===(null==(P=n.lcZ(75,57,t.sensorsData$))||null==P.pin?null:P.pin[t.pinStatuses.K1])?"ON":"OFF"," "),n.xp6(6),n.ekj("active-color",1===(null==(y=n.lcZ(81,59,t.sensorsData$))||null==y.pin?null:y.pin[t.pinStatuses.K4])),n.xp6(2),n.hij(" ",1===(null==(U=n.lcZ(83,61,t.sensorsData$))||null==U.pin?null:U.pin[t.pinStatuses.K4])?"ON":"OFF"," "),n.xp6(6),n.ekj("active-color",1===(null==(F=n.lcZ(89,63,t.sensorsData$))||null==F.pin?null:F.pin[t.pinStatuses.K5])),n.xp6(2),n.hij(" ",1===(null==(L=n.lcZ(91,65,t.sensorsData$))||null==L.pin?null:L.pin[t.pinStatuses.K5])?"ON":"OFF"," "),n.xp6(5),n.Q6J("options",t.sliderOptions)("pager",!0),n.xp6(6),n.Q6J("ngIf",!!n.lcZ(102,67,t.updateTime$))}},dependencies:[p.O5,l.YG,l.W2,l.I_,l.nJ,l.Wo,l.A$,l.Hr,l.PQ,l.d8,l.QI,Q,Y,p.Ov,R],styles:['.dashboard[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;justify-content:space-between;height:calc(100vh - 48px);padding:15px 30px;box-sizing:border-box}.dashboard__section[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;justify-content:space-between;column-gap:50px;max-width:100%}.dashboard__update-time[_ngcontent-%COMP%]{margin-bottom:5px;width:100%;height:25px;font-size:16px;line-height:18px;color:rgba(0,0,0,.54);display:flex;justify-content:center;align-items:center;column-gap:15px}.dashboard__sensor-data[_ngcontent-%COMP%]{min-width:60px;margin:5px 0 10px;position:relative;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}.dashboard__sensor-label[_ngcontent-%COMP%]{font-size:16px;font-weight:700;line-height:21px;padding-top:5px}.dashboard__sensor-icon[_ngcontent-%COMP%]{width:30px;height:30px}.dashboard__sensor-prompt[_ngcontent-%COMP%]{width:-webkit-max-content;width:-moz-max-content;width:max-content;color:rgba(0,0,0,.54);font-size:12px}.dashboard__popover[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;align-items:center;justify-content:center}.dashboard__popover-title[_ngcontent-%COMP%]{text-align:center;margin-top:15px;width:180px}.dashboard__popover-button[_ngcontent-%COMP%]{width:130px;display:block;margin:0 auto 10px}.active-color[_ngcontent-%COMP%]{color:#0c7d60}.reload-icon-wrapper[_ngcontent-%COMP%]{width:40px;height:40px}.reload-icon[_ngcontent-%COMP%]{display:inline-block;position:relative;border:3px solid;border-color:transparent #FFFFFF;border-radius:50%;height:14px;width:14px}.reload-icon[_ngcontent-%COMP%]:before, .reload-icon[_ngcontent-%COMP%]:after{box-sizing:border-box;border-style:solid;content:"";display:block;position:absolute;width:0;transform:rotate(-45deg)}.reload-icon[_ngcontent-%COMP%]:after{border-color:transparent transparent transparent #FFFFFF;border-width:4px 0 4px 6px;top:-5px;left:0px}.reload-icon[_ngcontent-%COMP%]:before{border-color:transparent #FFFFFF transparent transparent;border-width:4px 6px 4px 0;bottom:-5px;right:0}.reload-icon-spin[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_rotate-reload-icon .8s linear infinite}@keyframes _ngcontent-%COMP%_rotate-reload-icon{to{transform:rotate(360deg)}}']}),e})()}];let on=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[B.Bz.forChild(tn),B.Bz]}),e})(),sn=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[p.ez,h.u5,l.Pc,on,$.O,J,I]}),e})()}}]);