!function(){define("tools/Level",[],function(){return function(e,t,n,s){this.level=0,this.precision=Math.pow(10,t),this["default"]=e*this.precision,this.min=n*this.precision,this.max=s*this.precision,this.add=function(e,t){this.change(e,t)},this.sub=function(e,t){this.change(-e,-t)},this.change=function(e,t){this.level+=e*this.precision+t,this.limit(),this.save()},this.floor=function(){return Math.floor(this.level/this.precision)},this.limit=function(){this.level<this.min?this.level=this.min:this.level>this.max&&(this.level=this.max)},this.load=function(){var e=parseInt(window.localStorage.getItem("So7S_level"));isNaN(e)?this.level=this["default"]:(this.level=e,this.limit())},this.save=function(){window.localStorage.setItem("So7S_level",this.level)},this.load()}}),define("state/vars",["tools/Level"],function(e){return{gameType:"classic",walledMap:!0,holesInMap:!0,enemy:!1,multiplayer:!0,playersAlive:0,food:null,snakes:[],enemies:[],scores:[],segments:[],LEDCount:0,rows:2,cols:6,quality:160,clickAction:"click",level:new e(1,1,1),speed:40,map:null,update:0,countDown:0,font:{name:"Arial",size:12,fill:"#DDDDDD",get:function(){return this.size+"px "+this.name},menu:function(){return"24px "+this.name},footer:function(){return"16px "+this.name}}}}),define("state/game",["state/vars","Phaser"],function(e,t){var n=new t.Game(1200,720,t.AUTO);return n.vars=e,n}),define("init/create",["state/game","Phaser"],function(e,t){return function(){e.scale.scaleMode=t.ScaleManager.SHOW_ALL,e.scale.pageAlignVertically=!0,e.stage.backgroundColor="#000",e.input.addPointer(),e.input.addPointer(),e.input.addPointer(),e.input.addPointer(),e.state.start("MenuMain")}}),define("init/main",["init/create"],function(e){return{create:e}}),define("tools/changeSize",[],function(){return function(e,t,n){t="number"==typeof t?t:1200,n="number"==typeof n?n:720,e.width=t,e.height=n,e.stage.getBounds.width=t,e.stage.getBounds.height=n,e.world.setBounds(0,0,t,n),e.camera.setSize(t,n),e.camera.setBoundsToWorld(),e.renderer.resize(t,n)}}),define("menuMain/preload",["state/game","tools/changeSize"],function(e,t){return function(){t(e),e.load.spritesheet("button","assets/buttons.png",320,64),e.load.spritesheet("buttonSquare","assets/buttonSquare.png",64,64),e.load.image("header","assets/header.png")}}),define("ui/button",["state/game","Phaser"],function(e,t){return function(n,s,a,o,r){var i,l=e.add.group();l.position.x=n,l.position.y=s,i=null==o?{overFrame:0,outFrame:0,downFrame:0,upFrame:0}:{overFrame:1,outFrame:0,downFrame:1,upFrame:0};var u=new t.Button(e,0,0,r,o,this,i.overFrame,i.outFrame,i.downFrame,i.upFrame),d=new t.Text(e,0,0,a,this.style);return u.anchor.setTo(.5,.5),d.anchor.setTo(.5,.5),l.add(u),l.add(d),{group:l,button:u,label:d}}}),define("ui/helpButton",["state/game","ui/button"],function(e,t){return function(n,s,a){return e.vars.help?t(n,s,"?",function(){e.state.start("Help",void 0,void 0,a,e.state.current)},"buttonSquare"):void 0}}),define("menuMain/create",["state/game","ui/button","ui/helpButton"],function(e,t,n){var s={classic:function(){e.vars.gameType="classic",e.vars.walledMap=!0,e.vars.holesInMap=!1,e.vars.enemy=0,e.vars.multiplayer=!1,e.state.start("Countdown")},single:function(){e.state.start("MenuPlay")},scores:function(){e.state.start("HighScores")},settings:function(){e.state.start("MenuSettings")}};return function(){var a=e.add.sprite(e.world.centerX,0,"header"),o=e.world.centerX,r=e.world.centerY;a.anchor.setTo(.5,0),r+=80,t(o,r,"Play Classic",s.classic,"button"),t(o+200,r,e.vars.level.floor(),s.classic,"buttonSquare"),n(o-200,r,"classic"),r+=80,t(o,r,"Play single level",s.single,"button"),n(o-200,r,"single"),r+=80,t(o,r,"High scores",s.scores,"button"),r+=80,t(o,r,"Settings",s.settings,"button")}}),define("menuMain/main",["menuMain/preload","menuMain/create"],function(e,t){return{preload:e,create:t}}),define("menuPlay/preload",["state/game","tools/changeSize"],function(e,t){return function(){t(e),e.load.spritesheet("button","assets/buttons.png",320,64),e.load.spritesheet("buttonSquare","assets/buttonSquare.png",64,64)}}),define("menuPlay/create",["state/game","ui/button","ui/helpButton"],function(e,t,n){var s,a,o,r,i,l,u={menu:function(){e.state.start("MenuMain")},single:function(){e.vars.gameType="single",e.state.start("Countdown")},rowSub:function(){e.vars.rows>2&&s.setText(--e.vars.rows)},rowAdd:function(){s.setText(++e.vars.rows)},enemySub:function(){e.vars.enemy>0&&a.setText(--e.vars.enemy)},enemyAdd:function(){a.setText(++e.vars.enemy)},speedSub:function(){e.vars.speed>1&&o.setText(--e.vars.speed)},speedAdd:function(){e.vars.speed<120&&o.setText(++e.vars.speed)},walledMap:function(){e.vars.walledMap=!e.vars.walledMap,u.walledSetColor()},holesInMap:function(){e.vars.holesInMap=!e.vars.holesInMap,u.holesSetColor()},multiplayer:function(){e.vars.multiplayer=!e.vars.multiplayer,u.multiplayerSetColor()},walledSetColor:function(){u.setColor(e.vars.walledMap,r)},holesSetColor:function(){u.setColor(e.vars.holesInMap,i)},multiplayerSetColor:function(){u.setColor(e.vars.multiplayer,l)},setColor:function(e,t){e?(t.button.setFrames(0,0,0,0),t.label.setText("✔")):(t.button.setFrames(2,2,2,2),t.label.setText("✘"))}};return function(){var d,c,h=324;t(200,40,"Menu",u.menu,"button"),t(e.world.width-200,40,"Play!",u.single,"button"),c=240,d=e.world.centerX-h,t(d,c,"Rows",null,"button"),t(d-72,c+80,"−",u.rowSub,"buttonSquare"),s=t(d,c+80,e.vars.rows,null,"buttonSquare").label,t(d+72,c+80,"+",u.rowAdd,"buttonSquare"),n(d,c-80,"rows"),d=e.world.centerX,t(d,c,"Enemies",null,"button"),t(d-72,c+80,"−",u.enemySub,"buttonSquare"),a=t(d,c+80,e.vars.enemy,null,"buttonSquare").label,t(d+72,c+80,"+",u.enemyAdd,"buttonSquare"),n(d,c-80,"enemies"),d=e.world.centerX+h,t(d,c,"Speed",null,"button"),t(d-72,c+80,"−",u.speedSub,"buttonSquare"),o=t(d,c+80,e.vars.speed,null,"buttonSquare").label,t(d+72,c+80,"+",u.speedAdd,"buttonSquare"),n(d,c-80,"speed"),c+=250,d=e.world.centerX-h,t(d,c,"Walled map",u.walledMap,"button"),n(d-128-64-4,c,"walledMap"),r=t(d+128+64+4,c,"",u.walledMap,"buttonSquare"),u.walledSetColor(),d=e.world.centerX+h,t(d,c,"Holes in map",u.holesInMap,"button"),n(d+128+64+4,c,"holesInMap"),i=t(d-128-64-4,c,"",u.holesInMap,"buttonSquare"),u.holesSetColor(),c+=80,d=e.world.centerX+h,t(d,c,"Multiplayer",u.multiplayer,"button"),n(d+128+64+4,c,"multiplayer"),l=t(d-128-64-4,c,"",u.multiplayer,"buttonSquare"),u.multiplayerSetColor()}}),define("tools/storage",["state/game"],function(e){return{save:function(t,n){localStorage.setItem("So7S_"+t,e.vars[n])},load:function(t,n){var s=localStorage.getItem("So7S_"+t),a=this.defaults[t];if(null==s)e.vars[n]=a;else switch(typeof a){case"boolean":e.vars[n]="true"===s;break;case"number":e.vars[n]=s,isNaN(e.vars[n])&&(e.vars[n]=a);break;default:e.vars[n]=s}},defaults:{rows:2,speed:6,walled:!0,holes:!1,enemy:0,multiplayer:!1,help:!0}}}),define("menuPlay/storage",["tools/storage"],function(e){return{save:function(){e.save("rows","rows"),e.save("speed","speed"),e.save("walled","walledMap"),e.save("holes","holesInMap"),e.save("enemy","enemy"),e.save("multiplayer","multiplayer")},load:function(){e.load("rows","rows"),e.load("speed","speed"),e.load("walled","walledMap"),e.load("holes","holesInMap"),e.load("enemy","enemy"),e.load("multiplayer","multiplayer")}}}),define("menuPlay/main",["menuPlay/preload","menuPlay/create","menuPlay/storage"],function(e,t,n){return{init:function(){n.load()},preload:e,create:t,shutdown:function(){n.save()}}}),define("highScores/preload",["state/game","tools/changeSize"],function(e,t){return function(){t(e),e.load.spritesheet("button","assets/buttons.png",320,64)}}),define("tools/score",[],function(){return{save:function(e,t){var n,s=this.load();switch(e){case"classic":s=s.classic,n="So7S_Scores";break;case"single":s=s.single,n="So7S_ScoresSingle"}if(null!=s){for(var a=0;a<s.length;a++)if(s[a]<t){var o=t;t=s[a],s[a]=o}s.length<8&&(s[s.length]=t)}else s=[t];localStorage.setItem(n,JSON.stringify(s))},load:function(){return{classic:JSON.parse(localStorage.getItem("So7S_Scores")),single:JSON.parse(localStorage.getItem("So7S_ScoresSingle"))}},reset:function(){localStorage.removeItem("So7S_Scores"),localStorage.removeItem("So7S_ScoresSingle")}}}),define("tools/ordinal",[],function(){return function(e){return e=String(e),/1\d$/.exec(e)?e+"th":/1$/.exec(e)?e+"st":/2$/.exec(e)?e+"nd":/3$/.exec(e)?e+"rd":e+"th"}}),define("highScores/create",["state/game","ui/button","tools/score","tools/ordinal"],function(e,t,n,s){function a(e,n,a,o){if(t(a,o,e,null,"button"),o+=80,null!=n)for(var r=0;r<n.length&&9>r;r++)t(a,o,s(r+1)+": "+n[r]+" points",null,"button"),o+=80;else t(a,o,"No scores yet",null,"button")}var o={menu:function(){e.state.start("MenuMain")},reset:function(){n.reset(),e.state.start("HighScores")}};return function(){var s=n.load();t(200,72,"Menu",o.menu,"button"),t(200,e.world.height-72,"Reset",o.reset,"button"),a("Classic",s.classic,e.world.centerX,40),a("Single",s.single,e.world.centerX+360,40)}}),define("highScores/main",["highScores/preload","highScores/create"],function(e,t){return{preload:e,create:t}}),define("menuSettings/create",["state/game","ui/button"],function(e,t){var n,s={menu:function(){e.state.start("MenuMain")},help:function(){e.vars.help=!e.vars.help,s.helpSetColor()},helpSetColor:function(){s.setColor(e.vars.help,n)},setColor:function(e,t){e?(t.button.setFrames(0,0,0,0),t.label.setText("✔")):(t.button.setFrames(2,2,2,2),t.label.setText("✘"))}};return function(){var a,o,r=324;t(200,40,"Menu",s.menu,"button"),o=240,a=e.world.centerX-r,t(a,o,"Show help",s.help,"button"),n=t(a+196,o,"",s.help,"buttonSquare"),s.helpSetColor()}}),define("menuSettings/storage",["tools/storage"],function(e){return{save:function(){e.save("help","help")},load:function(){e.load("help","help")}}}),define("menuSettings/main",["menuPlay/preload","menuSettings/create","menuSettings/storage"],function(e,t,n){return{init:function(){n.load()},preload:e,create:t,shutdown:function(){n.save()}}}),define("help/init",[],function(){var e={classic:"In Classic you will proceed to higher levels by eating food (making your snake longer).\nBut you can also fall to lower level if you failed to make your snake long enough.\n\n- Higher levels have bigger maps and faster snakes.\n- Number right of Classic button in main menu indicates your current level.",single:"In Single level you can freely select map size, speed and many other parameters.\nYou can also play against computer controlled enemies and/or other player.",holesInMap:"This setting (if enabled) places holes (= obstacles) into map.\nHint: Hitting hole is lethal.",multiplayer:"2 snakes for 2 players.\nControls will be explained at countdown screen.",walledMap:"Sets (invisible) wall around map.\nIf turned off, you can hit left edge of map and your snake will appear at the right edge.\nIf turned on, your snake will die upon hitting a map edge.",rows:"Map size. Minimum is 2 and maximum is not limited.\n\nWARNING: Setting too high value will make game extremely slow and potentially unplayable.",enemies:"Computer controlled 1 LED long cyan enemies. Their amount is not limited.\nEnemies are aimlessly wandering around map and eating your food. Hitting them is lethal.\n\nWARNING 1: Setting too many will make game extremely slow and potentially unplayable.\nWARNING 2: Setting too many can fill up too much space on the map and make game unplayable.",speed:"Number of LEDs your snake will move in 2 seconds. Higher means faster, lower slower.\nAffects enemies and food too."};return function(t,n){this.game.state.states.Help.text=null!=e[t]?e[t]:"Help not found, sorry ☹.\nID: "+t,this.game.state.states.Help.back=n}}),define("help/create",["state/game","ui/button"],function(e,t){function n(t){var n=e.add.text(40,e.world.height/2,t,{font:e.vars.font.menu(),fill:e.vars.font.fill,align:"left"});return n.anchor.set(0,.5),n.wordWrap=!0,n.wordWrapWidth=e.world.width-2*n.getBounds().x,n}function s(t){var n=e.add.text(e.world.width,e.world.height,t,{font:e.vars.font.footer(),fill:e.vars.font.fill,align:"right"});return n.anchor.set(1,1),n}var a={menu:function(){e.state.start(this.game.state.states.Help.back)}};return function(){t(200,40,"Close",a.menu,"button"),n(this.game.state.states.Help.text),s("Hint: Help buttons (question mark rhombuses) can be hidden in settings.")}}),define("help/main",["help/init","menuPlay/preload","help/create"],function(e,t,n){return{init:e,preload:t,create:n}}),define("countdown/preload",["state/game","tools/changeSize","Phaser"],function(e,t,n){return function(){t(e),e.vars.quality=160,e.load.atlas("LEDs","assets/"+e.vars.quality+".png","assets/"+e.vars.quality+".json",n.Loader.TEXTURE_ATLAS_JSON_HASH),e.load.spritesheet("Arrows","assets/Arrows.png",90,90)}}),define("segment/LED",[],function(){function e(e,t,n,s,a){this.id=s,this.TL={point:null,pos:null},this.BR={point:null,pos:null},this.pos=this.position[s],this.sprite=e.create(t+this.pos.x,n+this.pos.y,"LEDs"),this.sprite.x*=a||1,this.sprite.y*=a||1,this.setState(this.states.empty)}return e.prototype={states:{black:"black",empty:"black",red:"red",dead:"red",yellow:"yellow",food:"yellow",green:"green",snake0Head:"green",darkGreen:"darkGreen",snake0Body:"darkGreen",greenYellow:"greenYellow",snake1Head:"greenYellow",darkGreenYellow:"darkGreenYellow",snake1Body:"darkGreenYellow",cyan:"cyan",enemy:"cyan"},position:[{x:17,y:0,type:"h"},{x:160,y:17,type:"v"},{x:160,y:177,type:"v"},{x:17,y:320,type:"h"},{x:0,y:177,type:"v"},{x:0,y:17,type:"v"},{x:17,y:160,type:"h"}],setState:function(e){this.state=e,this.sprite.frameName=this.pos.type+e},getState:function(){return this.state}},e}),define("segment/Seven",["segment/LED"],function(e){function t(t,n,s,a){this.leds=[];for(var o=n*(this.width+this.margin)+this.margin/2,r=s*(this.height+this.margin)+this.margin/2,i=0;i<e.prototype.position.length;++i)this.leds[i]=new e(t,o,r,i,a)}return t.prototype={margin:8,width:192,height:352,state:{led:e.prototype.states,segment:{off:[0,0,0,0,0,0,0],0:[1,1,1,1,1,1,0],1:[0,1,1,0,0,0,0],2:[1,1,0,1,1,0,1],3:[1,1,1,1,0,0,1],4:[0,1,1,0,0,1,1],5:[1,0,1,1,0,1,1],6:[1,0,1,1,1,1,1],7:[1,1,1,0,0,0,0],8:[1,1,1,1,1,1,1],9:[1,1,1,1,0,1,1]}},setState:function(e,t){null==t&&(t="red"),("number"==typeof e||"string"==typeof e)&&(e=this.state.segment[e]);for(var n=0;n<this.leds.length;++n)this.leds[n].setState(e[n]?t:"black")},getRandomLED:function(){return this.leds[Math.floor(7*Math.random())]}},t}),define("ui/text",["state/game","Phaser"],function(e,t){return function(n,s,a,o,r,i){var l=new t.Text(e,null==a?e.world.centerX:a,null==o?e.world.height/3:o,n,{font:e.vars.font.menu(),fill:e.vars.font.fill,align:"center"});return l.anchor.set(.5,.5),l.angle=null==r?0:r,l.wordWrap=!0,l.wordWrapWidth=null==i?e.world.width-50:i,s.add(l),l}}),define("countdown/create",["state/game","ui/button","segment/Seven","ui/text"],function(e,t,n,s){function a(){e.state.start("classic"===e.vars.gameType?"MenuMain":"MenuPlay")}function o(e,t,n,s,a,o){var r=e.create(t,n,a,0);r.anchor.setTo(.5,.5),r.angle=s,null!=o&&(r.frameName=o)}return function(){e.vars.countDown=3,e.vars.update=60;var r=e.add.group(),i=e.add.group(),l=e.add.group();t(200,40,"Menu",a,"button");var u="Tap left half of the screen to turn left, right to turn right.";e.vars.multiplayer?(o(l,.25*e.world.width,.2*e.world.height,90,"Arrows"),o(l,.25*e.world.width,.8*e.world.height,270,"Arrows"),o(l,.75*e.world.width,.2*e.world.height,90,"Arrows"),o(l,.75*e.world.width,.8*e.world.height,270,"Arrows"),o(l,.75*e.world.width,.5*e.world.height,0,"LEDs","vgreenYellow"),o(l,.25*e.world.width,.5*e.world.height,0,"LEDs","vgreen"),s(u,l,.7*e.world.width,.5*e.world.height,-90,e.world.height),s(u,l,.3*e.world.width,.5*e.world.height,90,e.world.height)):(o(l,.2*e.world.width,.5*e.world.height,0,"Arrows"),o(l,.8*e.world.width,.5*e.world.height,180,"Arrows"),o(l,.5*e.world.width,.2*e.world.height,0,"LEDs","hgreen"),s(u,l));var d=e.add.graphics(0,0);d.lineStyle(4,4473924),d.moveTo(e.world.width/2,0),d.lineTo(e.world.width/2,e.world.height),e.vars.multiplayer&&(d.moveTo(0,e.world.height/2),d.lineTo(e.world.width,e.world.height/2)),i.add(d),e.vars.segments=new n(r,3,1)}}),define("countdown/update",["state/game","segment/Seven"],function(e,t){return function(){if(++e.vars.update>=60){var n,s=e.vars.segments;if(e.vars.countDown>0){switch(e.vars.update=0,e.vars.countDown){case 1:n=t.prototype.state.led.green;break;case 2:n=t.prototype.state.led.yellow;break;case 3:n=t.prototype.state.led.red;break;default:n=t.prototype.state.led.darkGreen}s.setState(t.prototype.state.segment[e.vars.countDown--],n)}else s.setState(t.prototype.state.segment.off),e.state.start("Game")}}}),define("countdown/shutdown",["state/game"],function(e){return function(){e.vars.segments=null}}),define("countdown/main",["countdown/preload","countdown/create","countdown/update","countdown/shutdown"],function(e,t,n,s){return{preload:e,create:t,update:n,shutdown:s}}),define("game/preload",["state/game","segment/Seven","Phaser"],function(e,t,n){function s(e,n){var s=Math.min(window.innerWidth/e/t.prototype.width,window.innerHeight/n/t.prototype.height),a={high:.875,medium:.625,low:.375};return s>a.high?160:s>a.medium?120:s>a.low?80:40}return function(){switch(e.vars.gameType){case"classic":e.vars.rows=e.vars.level.floor()+1,e.vars.cols=3*e.vars.rows,e.vars.speed=3*e.vars.level.floor();break;case"single":e.vars.cols=3*e.vars.rows}e.vars.quality=s(e.vars.cols,e.vars.rows),e.load.atlas("LEDs","assets/"+e.vars.quality+".png","assets/"+e.vars.quality+".json",n.Loader.TEXTURE_ATLAS_JSON_HASH)}}),define("tools/Point",[],function(){function e(e,t,n,s,a,o,r,i){this.tl=e,this.tr=t,this.rt=n,this.rb=s,this.br=a,this.bl=o,this.lb=r,this.lt=i,this.clearBlocking(),null!=this.lt&&(this.lt.BR.point=this,this.lt.BR.pos="lt"),null!=this.tl&&(this.tl.BR.point=this,this.tl.BR.pos="tl"),null!=this.tr&&(this.tr.BR.point=this,this.tr.BR.pos="tr"),null!=this.lb&&(this.lb.BR.point=this,this.lb.BR.pos="lb"),null!=this.rt&&(this.rt.TL.point=this,this.rt.TL.pos="rt"),null!=this.rb&&(this.rb.TL.point=this,this.rb.TL.pos="rb"),null!=this.br&&(this.br.TL.point=this,this.br.TL.pos="br"),null!=this.bl&&(this.bl.TL.point=this,this.bl.TL.pos="bl")}return e.prototype={block:function(e,t){this.blocked[this.getCrossing(e,t)]={from:this[e],to:this[t]}},unblock:function(e){null!=this.blocked.hb&&this.blocked.hb.from===e?this.blocked.hb=null:null!=this.blocked.ht&&this.blocked.ht.from===e?this.blocked.ht=null:null!=this.blocked.vl&&this.blocked.vl.from===e?this.blocked.vl=null:null!=this.blocked.vr&&this.blocked.vr.from===e&&(this.blocked.vr=null)},isBlocked:function(e,t){var n=[];switch(this.getCrossing(e,t)){case"ht":n=["vl","vr","ht"];break;case"hb":n=["vl","vr","hb"];break;case"vl":n=["hb","ht","vl"];break;case"vr":n=["hb","ht","vr"]}for(var s=0;s<n.length;++s)if(null!=this.blocked[n[s]])return!0},clearBlocking:function(){this.blocked={ht:null,hb:null,vl:null,vr:null}},getCrossing:function(e,t){if(e.localeCompare(t)>0){var n=e;e=t,t=n}switch(e+t){case"ltrt":case"rttl":case"lttr":return"ht";case"lbrb":case"blrb":case"brlb":return"hb";case"bltl":case"lbtl":case"bllt":return"vl";case"brtr":case"rbtr":case"brrt":return"vr";default:return null}}},e}),define("tools/Map",["tools/Point"],function(e){function t(e,t){this.map=[],this.segments=e;var n,s=e.length,a=2*e[0].length;n=t?this.walledMap.bind(this):this.goThroughMap.bind(this);for(var o=0;s>=o;++o){this.map[o]=[];for(var r=0;a>=r;r++)n(o,r,s,a)}}return t.prototype.walledMap=function(e,t){var n=Math.floor(t/2),s=e-1,a=n-1;this.connect(e,t,e,n,s,a)},t.prototype.goThroughMap=function(e,t,n,s){var a=Math.floor(t/2),o=e===n?0:e,r=0>e-1?n:e-1,i=t===s?0:a,l=0>a-1?Math.floor(s/2):a-1;this.connect(e,t,o,i,r,l)},t.prototype.connect=function(e,t,n,s,a,o){t%2===0?this.map[e][t]=this.connectSegmentsTop(this.getSegment(a,o),this.getSegment(n,o),this.getSegment(n,s),this.getSegment(a,s)):this.map[e][t]=this.connectSegmentsMiddle(this.getSegment(a,s),this.getSegment(n,s))},t.prototype.connectSegmentsTop=function(t,n,s,a){var o,r,i,l,u,d,c,h;return null!=t&&(o=t.leds[2],h=t.leds[3]),null!=n&&(r=n.leds[4],i=n.leds[3]),null!=s&&(u=s.leds[5],l=s.leds[0]),null!=a&&(d=a.leds[1],c=a.leds[0]),new e(o,r,i,l,u,d,c,h)},t.prototype.connectSegmentsMiddle=function(t,n){var s,a,o,r,i,l,u,d;return null!=t&&(s=t.leds[1],d=t.leds[6],u=t.leds[6],l=t.leds[2]),null!=n&&(a=n.leds[5],o=n.leds[6],r=n.leds[6],i=n.leds[4]),new e(s,a,o,r,i,l,u,d)},t.prototype.getSegment=function(e,t){return this.segments[e]&&this.segments[e][t]?this.segments[e][t]:null},t.prototype.getRandomSegment=function(){for(var e=null;null==e;){var t=Math.floor(this.segments.length*Math.random()),n=Math.floor(this.segments[t].length*Math.random());e=this.segments[t][n]}return e},t.prototype.getRandomLED=function(){var e=this.getRandomSegment();return e.getRandomLED()},t.prototype.clearBlocking=function(){for(var e=0;e<this.map.length;++e)for(var t=0;t<this.map[e].length;++t)this.map[e][t].clearBlocking()},t}),define("game/Snake",["state/game"],function(e){function t(e,t,n,s,a,o){this.leds=[e],this.canEat="boolean"==typeof n?n:!0,this.direction={previous:"r",next:"r"},this.ledsToChange={empty:null},this.deathCallback=t,this.states=e.states,this.colors={empty:e.states.empty},this.setDefaultColor("head",a),this.setDefaultColor("body",o),s&&(this.die=function(){}),e.setState(this.colors.head)}return t.prototype={die:function(){null!=this.deathCallback&&this.deathCallback(),this.index=this.leds.length,this.move=function(){var e=this.leds[--this.index];null!=e?e.setState(e.states.dead):this.move=function(){}},this.changeLeds=function(){},this.move()},length:function(){return this.leds.length},turn:function(e){this.direction.next=this.turns[e][this.direction.previous]},nextDir:function(e){this.turns.forbidden[this.direction.previous]!=e&&(this.direction.next=e)},move:function(){var t,n,s=this.leds[this.leds.length-1],a=!0;switch(this.direction.previous){case"t":case"l":t="TL";break;case"b":case"r":t="BR"}switch(this.direction.next){case"t":case"b":n=/[tb]/g;break;case"l":case"r":n=/[rl]/g}var o=s[t].pos,r=this.direction.next+s[t].pos.replace(n,""),i=s[t].point,l=i[r];if(this.direction.previous=this.direction.next,null==l||l.getState()!==l.states.empty&&l.getState()!==l.states.food||i.isBlocked(o,r))return void this.die();if(l.getState()===l.states.food&&(e.vars.food=null,this.canEat&&(a=!1)),this.leds.push(l),l.setState(this.colors.head),i.block(o,r),s.setState(this.colors.body),a){var u=this.leds[0],d=this.leds[1];u.TL.point===d.TL.point||u.TL.point===d.BR.point?u.TL.point.unblock(u):(u.BR.point===d.TL.point||u.BR.point===d.BR.point)&&u.BR.point.unblock(u);for(var c=1;c<this.leds.length;++c)this.leds[c-1]=this.leds[c];this.leds.length--,this.ledsToChange.empty=u}},changeLeds:function(){this.changeLed(this.ledsToChange.empty,this.colors.empty)},changeLed:function(e,t){null!=e&&e.setState(t)},setDefaultColor:function(e,t){var n=e.charAt(0).toUpperCase()+e.slice(1);switch(typeof t){case"string":this.colors[e]=t;break;case"number":this.colors[e]=this.states["snake"+t+n];break;default:this.colors[e]=this.states["snake0"+n]}},turns:{left:{t:"l",r:"t",b:"r",l:"b"},right:{t:"r",r:"b",b:"l",l:"t"},forbidden:{t:"b",r:"l",b:"t",l:"r"}}},t}),define("game/Enemy",["state/game","game/Snake","Phaser"],function(e,t,n){function s(e){for(var n=null;null==n||n.getState()!==n.states.empty;)n=e.getRandomLED();this.snake=new t(n,null,!1,!0,n.states.enemy,n.states.enemy)}return s.prototype={choices:["left",null,null,null,null,"right"],rdg:new n.RandomDataGenerator,move:function(){var e=this.rdg.pick(this.choices);null!=e&&this.snake.turn(e),this.snake.move(),this.snake.changeLeds()}},s}),define("game/create",["state/game","tools/Map","tools/changeSize","segment/Seven","game/Snake","game/Enemy"],function(e,t,n,s,a,o){function r(){e.vars.playersAlive--,0==e.vars.playersAlive&&(e.vars.clickAction="click")}return function(){e.vars.food=null,e.vars.playersAlive=1,e.vars.update=60;var i=e.add.group(),l=e.vars.quality/160,u=e.vars.cols*(s.prototype.width+s.prototype.margin)*l,d=e.vars.rows*(s.prototype.height+s.prototype.margin)*l;n(e,u,d);var c,h,p=[],g=e.vars.rows;for(c=0;c<e.vars.cols;++c)for(p[c]=[],h=0;h<e.vars.rows;++h)p[c][h]=!0;for(;e.vars.holesInMap&&g>0;)c=Math.floor(Math.random()*e.vars.cols),h=Math.floor(Math.random()*e.vars.rows),p[c][h]&&(0!==h||0!==c&&1!==c)&&(g--,p[c][h]=!1);for(e.vars.segments=[],c=0;c<e.vars.cols;++c)for(e.vars.segments[c]=[],h=0;h<e.vars.rows;++h)p[c][h]?e.vars.segments[c][h]=new s(i,c,h,l):e.vars.segments[c][h]=null;e.vars.LEDCount=e.vars.segments.length*e.vars.segments[0].length*7,e.vars.map=new t(e.vars.segments,e.vars.walledMap),e.vars.snakes=[new a(e.vars.map.map[0][0].rb,r,!0,!1,0,0)],e.vars.multiplayer&&(e.vars.snakes.push(new a(e.vars.map.map[0][2].rt,r,!0,!1,1,1)),e.vars.playersAlive++),e.vars.enemies=[];for(var m=0;m<e.vars.enemy;m++)e.vars.enemies[m]=new o(e.vars.map);e.vars.clickAction="turn"}}),define("game/update",["state/game","segment/Seven"],function(e,t){return function(){if(--e.vars.update<0){var n;for(e.vars.update=120/e.vars.speed,n=0;n<e.vars.snakes.length;n++)e.vars.snakes[n].move();for(n=0;n<e.vars.snakes.length;n++)e.vars.snakes[n].changeLeds();if(null==e.vars.food){var s=e.vars.map.getRandomLED();s.getState()===t.prototype.state.led.empty&&(s.setState(t.prototype.state.led.food),s.life=2*(e.vars.rows+e.vars.cols),e.vars.food=s)}else e.vars.food.life-=Math.random(),e.vars.food.life<0&&(e.vars.food.setState(t.prototype.state.led.empty),e.vars.food=null);for(n=0;n<e.vars.enemies.length;n++)e.vars.enemies[n].move()}}}),define("game/shutdown",["state/game"],function(e){return function(){var t="single"===e.vars.gameType?e.vars.speed/(e.vars.LEDCount/100):1;e.vars.scores=[];for(var n=0;n<e.vars.snakes.length;n++)e.vars.scores[n]=Math.round(e.vars.snakes[n].length()*t);e.vars.enemies=null,e.vars.food=null,e.vars.map=null,e.vars.segments=null,e.vars.snakes=null,e.vars.clickAction="click"}}),define("game/main",["game/preload","game/create","game/update","game/shutdown"],function(e,t,n,s){return{preload:e,create:t,shutdown:s,update:n}}),define("score/preload",["state/game","tools/changeSize","Phaser"],function(e,t,n){return function(){t(e),e.vars.quality=e.vars.multiplayer?80:160,e.load.atlas("LEDs","assets/"+e.vars.quality+".png","assets/"+e.vars.quality+".json",n.Loader.TEXTURE_ATLAS_JSON_HASH)}}),define("score/create",["state/game","ui/button","ui/text","tools/score","segment/Seven"],function(e,t,n,s,a){function o(t,n,s){var o=e.add.group(),r=160===e.vars.quality?6:5;t=(new Array(r+1).join(" ")+t).slice(-r);for(var i=0;r>i;i++){var l=new a(o,i,0,e.vars.quality/160);l.setState(" "===t[i]?"off":t[i],n)}o.x=(e.world.width-o.width)*s,o.y=e.world.height-o.height}var r={menu:function(){e.state.start("classic"===e.vars.gameType?"MenuMain":"MenuPlay")},play:function(){e.state.start("Countdown")}};return function(){switch(t(200,40,"Menu",r.menu,"button"),t(e.world.width-200,40,"Play!",r.play,"button"),e.vars.gameType){case"classic":var i,l,u,d=e.vars.scores[0];d>=e.vars.LEDCount/2?(l=a.prototype.state.led.green,i=10,u="Awesome"):d>=e.vars.LEDCount/3?(l=a.prototype.state.led.darkGreen,i=5,u="Good job, but to proceed faster, get even higher score."):d>=e.vars.LEDCount/4?(l=a.prototype.state.led.yellow,i=1,u="Not bad, but to proceed faster, get higher score."):(l=a.prototype.state.led.red,i=-10,u="You won't proceed to next level this way, get higher score."),e.vars.level.add(0,i),o(d,l,1),s.save(e.vars.gameType,d),n(u,e.add.group());break;case"single":o(e.vars.scores[0],a.prototype.state.led.green,1),s.save(e.vars.gameType,e.vars.scores[0]),e.vars.multiplayer&&(o(e.vars.scores[1],a.prototype.state.led.greenYellow,0),s.save(e.vars.gameType,e.vars.scores[1]))}}}),define("score/shutdown",["state/game"],function(e){return function(){e.vars.scores=null}}),define("score/main",["score/preload","score/create","score/shutdown"],function(e,t,n){return{preload:e,create:t,shutdown:n}}),define("tools/handleInput",["state/game"],function(e){return{turn:function(t,n){if(e.vars.multiplayer){var s,a=n<window.innerHeight/2;t<window.innerWidth/2?s=0:(s=1,a=!a),e.vars.snakes[s].turn(a?"left":"right")}else e.vars.snakes[0].turn(t<window.innerWidth/2?"left":"right")},click:function(){switch(e.state.getCurrentState().key){case"Countdown":e.state.start("Game");break;case"Game":e.state.start("Score")}},keys:function(t){try{switch(t){case 37:e.vars.snakes[0].nextDir("l");break;case 38:e.vars.snakes[0].nextDir("t");break;case 39:e.vars.snakes[0].nextDir("r");break;case 40:e.vars.snakes[0].nextDir("b");break;case 65:e.vars.snakes[1].nextDir("l");break;case 87:e.vars.snakes[1].nextDir("t");break;case 68:e.vars.snakes[1].nextDir("r");break;case 83:e.vars.snakes[1].nextDir("b");break;case 13:case 27:case 32:this.click()}}catch(n){}}}}),define("tools/createEventListeners",["state/game","tools/handleInput"],function(e,t){return function(){document.body.addEventListener("touchstart",function(n){t[e.vars.clickAction](n.targetTouches[0].pageX,n.targetTouches[0].pageY)},!1),document.body.addEventListener("mousedown",function(n){t[e.vars.clickAction](n.pageX,n.pageY)},!1),document.addEventListener("keydown",function(e){t.keys(e.keyCode)})}}),requirejs.config({baseUrl:"js",paths:{Phaser:"/lib/phaser"}}),requirejs(["state/game","init/main","menuMain/main","menuPlay/main","highScores/main","menuSettings/main","help/main","countdown/main","game/main","score/main","tools/createEventListeners","tools/storage"],function(e,t,n,s,a,o,r,i,l,u,d,c){d(),e.state.add("Init",t),e.state.add("MenuMain",n),e.state.add("MenuPlay",s),e.state.add("HighScores",a),e.state.add("MenuSettings",o),e.state.add("Help",r),e.state.add("Countdown",i),e.state.add("Game",l),e.state.add("Score",u),c.load("help","help"),e.state.start("Init")}),define("main",function(){})}();