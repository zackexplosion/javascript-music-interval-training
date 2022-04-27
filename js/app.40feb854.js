(function(){"use strict";var e={895:function(e,t,n){var s=n(9242),o=n(3396),a=n(7139),i=n.p+"img/play_and_refresh.ad2e2d8e.png";const r={style:{height:"150px"}},c={key:0},l={style:{height:"40px"}};function d(e,t,n,s,d,p){const u=(0,o.up)("Keyboard");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("img",{style:{width:"8em",cursor:"pointer"},src:i,onClick:t[0]||(t[0]=(...e)=>p.start&&p.start(...e))}),(0,o._)("div",r,[d.started?((0,o.wg)(),(0,o.iD)("h2",c,"請跟著彈")):(0,o.kq)("",!0),(0,o._)("h1",l,(0,a.zw)(d.playedNotes.join(" ")),1),(0,o._)("h1",{style:{height:"40px"},class:(0,a.C_)(["answer",d.isAnswerCorrect])},(0,a.zw)(d.playerPlayedNotes.join(" ")),3)]),(0,o.Wm)(u,{onSheetPressed:t[1]||(t[1]=e=>p.virtualKeyBoardPressed(e))})],64)}const p={class:"keyboard"},u=["onMousedown","onMouseup","onMouseleave"];function y(e,t,n,s,i,r){return(0,o.wg)(),(0,o.iD)("div",p,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.keys,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{key:t,class:(0,a.C_)(e.class),onMousedown:t=>r.mousedown(e),onMouseup:t=>r.mouseup(e),onMouseleave:t=>r.mouseup(e)},null,42,u)))),128))])}var h={name:"KeyBoard",props:{msg:String,player:Object},data(){const e=4;return{baseKeyIndex:e,keys:[{class:"white c",pitch:12*e+0,keycode:"KeyA",pressing:!1},{class:"black c-sharp",pitch:12*e+1,keycode:"KeyW",pressing:!1},{class:"white d",pitch:12*e+2,keycode:"KeyS",pressing:!1},{class:"black d-sharp",pitch:12*e+3,keycode:"KeyE",pressing:!1},{class:"white e",pitch:12*e+4,keycode:"KeyD",pressing:!1},{class:"white f",pitch:12*e+5,keycode:"KeyF",pressing:!1},{class:"black f-sharp",pitch:12*e+6,keycode:"KeyT",pressing:!1},{class:"white g",pitch:12*e+7,keycode:"KeyG",pressing:!1},{class:"black g-sharp",pitch:12*e+8,keycode:"KeyY",pressing:!1},{class:"white a",pitch:12*e+9,keycode:"KeyH",pressing:!1},{class:"black a-sharp",pitch:12*e+10,keycode:"KeyU",pressing:!1},{class:"white b",pitch:12*e+11,keycode:"KeyJ",pressing:!1},{class:"white c5",pitch:12*(e+1),keycode:"KeyK",pressing:!1}]}},mounted(){const e=this;window.addEventListener("keydown",(t=>{const n=e.keys.find((e=>e.keycode===t.code));n&&(n.pressing||(n.pressing=!0,n.class=n.class+" active",e.play(n.pitch)))})),window.addEventListener("keyup",(t=>{const n=e.keys.find((e=>e.keycode===t.code));n&&(n.class=n.class.replace(" active",""),n.pressing=!1)}))},methods:{play(e){this.$emit("sheetPressed",e)},mousedown(e){e.pressing=!0,e.class=e.class+" active",this.play(e.pitch)},mouseup(e){e.class=e.class.replaceAll(" active","")}}},f=n(89);const g=(0,f.Z)(h,[["render",y],["__scopeId","data-v-f025bbe0"]]);var v=g,w=window.AudioContext||window.webkitAudioContext,m=new w,k=new window.WebAudioFontPlayer;k.loader.decodeAfterLoading(m,"_tone_0000_JCLive_sf2_file");const _=[{index:60,name:"C4"},{index:62,name:"D4"},{index:64,name:"E4"},{index:65,name:"F4"},{index:67,name:"G4"},{index:69,name:"A4"},{index:71,name:"B4"},{index:72,name:"C5"}];var b={name:"App",components:{Keyboard:v},data(){return{started:!1,playedNotes:[],playerPlayedNotes:[],isAnswerCorrect:"",audioPlayer:void 0}},mounted(){var e=null,t=this;function n(e){const[n,s]=e.data;n>130&&t.handlePlayerInput(s)}function s(t){console.log("MIDI ready!",t),e=t,console.log(e.inputs),o(e)}function o(e){for(let t of e.inputs){var s=t[1];console.log("Input port [type:'"+s.type+"'] id:'"+s.id+"' manufacturer:'"+s.manufacturer+"' name:'"+s.name+"' version:'"+s.version+"'"),s.onmidimessage=n}for(let n of e.outputs){var o=n[1];console.log("Output port [type:'"+o.type+"'] id:'"+o.id+"' manufacturer:'"+o.manufacturer+"' name:'"+o.name+"' version:'"+o.version+"'"),t.outputDevice=o}}function a(e){console.log("Failed to get MIDI access - "+e)}navigator.requestMIDIAccess().then(s,a)},methods:{async start(){this.started=!0,this.playedNotes=[],this.playerPlayedNotes=[],this.playTest()},async playTest(e=2){return new Promise((async t=>{for(let n=0;n<e;n++){let e=Math.floor(Math.random()*_.length),t=_[e];this.playedNotes.push(t.name),await this.playSound(t.index)}t()}))},handlePlayerInput(e){this.playerPlayedNotes.length>=2&&(this.playerPlayedNotes=[]);try{const t=_.find((t=>t.index===e));this.playerPlayedNotes.push(t.name)}catch(t){}},virtualKeyBoardPressed(e){e+=12,this.handlePlayerInput(e),this.playSound(e)},playSound(e=60){return new Promise((t=>{k.queueWaveTable(m,m.destination,window._tone_0000_JCLive_sf2_file,0,e,.75);var n=500;setTimeout((function(){t()}),n)}))},matchTestNotes(){this.isAnswerCorrect="";const e=1e3;if(this.playedNotes.length<2||this.playerPlayedNotes.length<2)return;let t=!1,n=!1,s=this.playerPlayedNotes.length-2;s<=0&&(s=0),this.playerPlayedNotes.length>0&&this.playedNotes[0]===this.playerPlayedNotes[s]&&(t=!0),this.playerPlayedNotes.length>1&&this.playedNotes[1]===this.playerPlayedNotes[this.playerPlayedNotes.length-1]&&(console.log("note 2 correct"),n=!0),t&&n?(this.isAnswerCorrect="correct",setTimeout((()=>{this.start()}),e)):this.isAnswerCorrect="wrong"}},watch:{playerPlayedNotes:{deep:!0,handler:function(e){this.matchTestNotes(e)}}}};const P=(0,f.Z)(b,[["render",d],["__scopeId","data-v-2a797a74"]]);var N=P;(0,s.ri)(N).mount("#app")}},t={};function n(s){var o=t[s];if(void 0!==o)return o.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,s,o,a){if(!s){var i=1/0;for(d=0;d<e.length;d++){s=e[d][0],o=e[d][1],a=e[d][2];for(var r=!0,c=0;c<s.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](s[c])}))?s.splice(c--,1):(r=!1,a<i&&(i=a));if(r){e.splice(d--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[s,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.p="/javascript-music-interval-training/"}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var o,a,i=s[0],r=s[1],c=s[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(c)var d=c(n)}for(t&&t(s);l<i.length;l++)a=i[l],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(d)},s=self["webpackChunkjavascript_music_interval_training"]=self["webpackChunkjavascript_music_interval_training"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(895)}));s=n.O(s)})();
//# sourceMappingURL=app.40feb854.js.map