"use strict";(self.webpackChunkautorun_pwa=self.webpackChunkautorun_pwa||[]).push([[263],{7263:(Te,P,u)=>{u.r(P),u.d(P,{DashboardModule:()=>Se});var I=u(6895),U=u(4859),n=u(4650),L=u(3238);u(9646),u(2843),u(4128),u(8505),u(4004),u(262),u(8746),u(3099),u(4351),u(9300),u(1481);let be=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[[L.BQ],L.BQ]}),s})();var G=u(1280),R=(()=>{return(s=R||(R={}))[s.Voltage=0]="Voltage",s[s.K1=1]="K1",s[s.K2=2]="K2",s[s.K3=3]="K3",s[s.K4=4]="K4",s[s.K5=5]="K5",s[s.IN1=6]="IN1",s[s.IN2=7]="IN2",R;var s})(),M=(()=>{return(s=M||(M={}))[s.Temp1=0]="Temp1",s[s.Temp2=1]="Temp2",s[s.Temp3=2]="Temp3",M;var s})(),F=(()=>{return(s=F||(F={}))[s.Timer=0]="Timer",s[s.UpTime=1]="UpTime",s[s.Count=2]="Count",F;var s})(),Ce=u(1776);function Ie(s,t){if(1&s&&(n.TgZ(0,"span"),n._uU(1),n.ALo(2,"async"),n.qZA()),2&s){const e=n.oxw();n.xp6(1),n.hij("\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e \u0432: ",n.lcZ(2,1,e.updateTime$),"")}}const Ee=[{path:"",component:(()=>{class s{constructor(e){this.mqttService=e,this.updateTime$=this.mqttService.updateTime$,this.sensorsData$=this.mqttService.sensorsData$,this.pinStatuses=R,this.temperatureStatuses=M,this.timeStatuses=F}ngOnInit(){}}return s.\u0275fac=function(e){return new(e||s)(n.Y36(Ce.K))},s.\u0275cmp=n.Xpm({type:s,selectors:[["az-dashboard"]],decls:87,vars:39,consts:[[1,"dashboard"],[1,"dashboard__update-time"],[4,"ngIf"],[1,"dashboard__sensor-data"],["src","assets/svg/voltage.svg","alt","Voltage",1,"dashboard__sensor-icon"],[1,"dashboard__sensor-label"],["src","assets/svg/timer.svg",1,"dashboard__sensor-icon"],["src","assets/svg/counter.svg",1,"dashboard__sensor-icon"],["src","assets/svg/temperature.svg",1,"dashboard__sensor-icon"],[1,"dashboard__sensor-prompt"],[1,"dashboard__start-stop-button-wrapper"],["mat-mini-fab","","color","primary",1,"dashboard__start-stop-button"],["src","assets/svg/car.svg","alt","",1,"dashboard__start-stop-icon"],[1,"dashboard__start-stop-title"],["src","assets/svg/channel.svg",1,"dashboard__sensor-icon"],["src","assets/svg/ignition.svg",1,"dashboard__sensor-icon"],["src","assets/svg/relay.svg",1,"dashboard__sensor-icon"]],template:function(e,r){if(1&e&&(n.TgZ(0,"div",0)(1,"div",1),n.YNc(2,Ie,3,3,"span",2),n.ALo(3,"async"),n.qZA(),n.TgZ(4,"div",3),n._UZ(5,"img",4),n.TgZ(6,"span",5),n._uU(7),n.ALo(8,"async"),n.qZA()(),n.TgZ(9,"div",3),n._UZ(10,"img",6),n.TgZ(11,"span",5),n._uU(12),n.ALo(13,"async"),n.qZA()(),n.TgZ(14,"div",3),n._UZ(15,"img",7),n.TgZ(16,"span",5),n._uU(17),n.ALo(18,"async"),n.qZA()(),n.TgZ(19,"div",3),n._UZ(20,"img",8),n.TgZ(21,"span",5),n._uU(22),n.ALo(23,"async"),n.qZA(),n.TgZ(24,"span",9),n._uU(25,"\u0414\u0430\u0442\u0447\u0438\u043a \u21161"),n.qZA()(),n.TgZ(26,"div",3),n._UZ(27,"img",8),n.TgZ(28,"span",5),n._uU(29),n.ALo(30,"async"),n.qZA(),n.TgZ(31,"span",9),n._uU(32,"\u0414\u0430\u0442\u0447\u0438\u043a \u21162"),n.qZA()(),n.TgZ(33,"div",3),n._UZ(34,"img",8),n.TgZ(35,"span",5),n._uU(36),n.ALo(37,"async"),n.qZA(),n.TgZ(38,"span",9),n._uU(39,"\u0414\u0430\u0442\u0447\u0438\u043a \u21163"),n.qZA()(),n.TgZ(40,"div",10)(41,"button",11),n._UZ(42,"img",12),n.TgZ(43,"span",13),n._uU(44,"\u0417\u0430\u043f\u0443\u0441\u043a \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f"),n.qZA()()(),n.TgZ(45,"div",3),n._UZ(46,"img",14),n.TgZ(47,"span",5),n._uU(48),n.ALo(49,"async"),n.qZA(),n.TgZ(50,"span",9),n._uU(51,"\u041a\u0430\u043d\u0430\u043b IN1"),n.qZA()(),n.TgZ(52,"div",3),n._UZ(53,"img",14),n.TgZ(54,"span",5),n._uU(55),n.ALo(56,"async"),n.qZA(),n.TgZ(57,"span",9),n._uU(58,"\u041a\u0430\u043d\u0430\u043b IN2"),n.qZA()(),n.TgZ(59,"div",3),n._UZ(60,"img",15),n.TgZ(61,"span",5),n._uU(62),n.ALo(63,"async"),n.qZA(),n.TgZ(64,"span",9),n._uU(65,"\u0417\u0430\u0436\u0438\u0433\u0430\u043d\u0438\u0435"),n.qZA()(),n.TgZ(66,"div",3),n._UZ(67,"img",16),n.TgZ(68,"span",5),n._uU(69),n.ALo(70,"async"),n.qZA(),n.TgZ(71,"span",9),n._uU(72,"\u0420\u0435\u043b\u0435 K1"),n.qZA()(),n.TgZ(73,"div",3),n._UZ(74,"img",16),n.TgZ(75,"span",5),n._uU(76),n.ALo(77,"async"),n.qZA(),n.TgZ(78,"span",9),n._uU(79,"\u0420\u0435\u043b\u0435 K4"),n.qZA()(),n.TgZ(80,"div",3),n._UZ(81,"img",16),n.TgZ(82,"span",5),n._uU(83),n.ALo(84,"async"),n.qZA(),n.TgZ(85,"span",9),n._uU(86,"\u0420\u0435\u043b\u0435 K5"),n.qZA()()()),2&e){let o,i,a,c,l,d,b,g,p,f,v,x;n.xp6(2),n.Q6J("ngIf",!!n.lcZ(3,13,r.updateTime$)),n.xp6(5),n.hij("",(null==(o=n.lcZ(8,15,r.sensorsData$))||null==o.pin?null:o.pin[r.pinStatuses.Voltage])||"--"," V"),n.xp6(5),n.Oqu((null==(i=n.lcZ(13,17,r.sensorsData$))||null==i.time?null:i.time[r.timeStatuses.Timer])||"--.--"),n.xp6(5),n.Oqu((null==(a=n.lcZ(18,19,r.sensorsData$))||null==a.time?null:a.time[r.timeStatuses.Count])||"--.--"),n.xp6(5),n.hij("",(null==(c=n.lcZ(23,21,r.sensorsData$))||null==c.temp?null:c.temp[r.temperatureStatuses.Temp1])||"--"," \xb0"),n.xp6(7),n.hij("",(null==(l=n.lcZ(30,23,r.sensorsData$))||null==l.temp?null:l.temp[r.temperatureStatuses.Temp2])||"--"," \xb0"),n.xp6(7),n.hij("",(null==(d=n.lcZ(37,25,r.sensorsData$))||null==d.temp?null:d.temp[r.temperatureStatuses.Temp3])||"--"," \xb0"),n.xp6(12),n.Oqu(1===(null==(b=n.lcZ(49,27,r.sensorsData$))||null==b.pin?null:b.pin[r.pinStatuses.IN1])?"ON":"OFF"),n.xp6(7),n.Oqu(1===(null==(g=n.lcZ(56,29,r.sensorsData$))||null==g.pin?null:g.pin[r.pinStatuses.IN2])?"ON":"OFF"),n.xp6(7),n.Oqu(1===(null==(p=n.lcZ(63,31,r.sensorsData$))||null==p.pin?null:p.pin[r.pinStatuses.K2])?"ON":"OFF"),n.xp6(7),n.Oqu(1===(null==(f=n.lcZ(70,33,r.sensorsData$))||null==f.pin?null:f.pin[r.pinStatuses.K1])?"ON":"OFF"),n.xp6(7),n.Oqu(1===(null==(v=n.lcZ(77,35,r.sensorsData$))||null==v.pin?null:v.pin[r.pinStatuses.K4])?"ON":"OFF"),n.xp6(7),n.Oqu(1===(null==(x=n.lcZ(84,37,r.sensorsData$))||null==x.pin?null:x.pin[r.pinStatuses.K5])?"ON":"OFF")}},dependencies:[I.O5,U.lW,I.Ov],styles:[".dashboard[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;justify-content:space-evenly;column-gap:50px;padding:2px 15px 15px}.dashboard__update-time[_ngcontent-%COMP%]{width:100%;height:14px;font-size:12px;line-height:14px;color:#0000008a}.dashboard__sensor-data[_ngcontent-%COMP%]{min-width:60px;margin:5px 0 10px;position:relative;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}.dashboard__sensor-label[_ngcontent-%COMP%]{font-size:16px;font-weight:700;line-height:21px;padding-top:5px}.dashboard__sensor-icon[_ngcontent-%COMP%]{width:35px;height:35px}.dashboard__sensor-prompt[_ngcontent-%COMP%]{position:absolute;bottom:-15px;width:max-content;color:#0000008a;font-size:12px}.dashboard__start-stop-button-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;margin:25px 0}.dashboard__start-stop-button[_ngcontent-%COMP%]{width:150px;height:150px}.dashboard__start-stop-button[_ngcontent-%COMP%]  .mat-button-wrapper{display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}.dashboard__start-stop-icon[_ngcontent-%COMP%]{width:70px;height:70px}.dashboard__start-stop-title[_ngcontent-%COMP%]{font-size:12px;line-height:21px}"]}),s})()}];let xe=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[G.Bz.forChild(Ee),G.Bz]}),s})(),Se=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=n.oAB({type:s}),s.\u0275inj=n.cJS({imports:[I.ez,xe,be,U.ot]}),s})()}}]);