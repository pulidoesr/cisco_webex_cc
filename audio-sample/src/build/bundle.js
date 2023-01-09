(()=>{var e={205:e=>{function t(e,t,n){for(var o=0;o<n.length;o++)e.setUint8(t+o,n.charCodeAt(o))}e.exports=function(e,n){n=n||{};var o=e.numberOfChannels,a=e.sampleRate,i=n.float32?3:1,r=3===i?32:16;return function(e,n,o,a,i){var r=i/8,s=a*r,d=new ArrayBuffer(44+e.length*r),l=new DataView(d);return t(l,0,"RIFF"),l.setUint32(4,36+e.length*r,!0),t(l,8,"WAVE"),t(l,12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,n,!0),l.setUint16(22,a,!0),l.setUint32(24,o,!0),l.setUint32(28,o*s,!0),l.setUint16(32,s,!0),l.setUint16(34,i,!0),t(l,36,"data"),l.setUint32(40,e.length*r,!0),1===n?function(e,t,n){for(var o=0;o<n.length;o++,t+=2){var a=Math.max(-1,Math.min(1,n[o]));e.setInt16(t,a<0?32768*a:32767*a,!0)}}(l,44,e):function(e,t,n){for(var o=0;o<n.length;o++,t+=4)e.setFloat32(t,n[o],!0)}(l,44,e),d}(2===o?function(e,t){for(var n=e.length+t.length,o=new Float32Array(n),a=0,i=0;a<n;)o[a++]=e[i],o[a++]=t[i],i++;return o}(e.getChannelData(0),e.getChannelData(1)):e.getChannelData(0),i,a,o,r)}},823:e=>{e.exports=function(e,t,n,o){var a=new Blob(void 0!==o?[o,e]:[e],{type:n||"application/octet-stream"});if(void 0!==window.navigator.msSaveBlob)window.navigator.msSaveBlob(a,t);else{var i=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(a):window.webkitURL.createObjectURL(a),r=document.createElement("a");r.style.display="none",r.href=i,r.setAttribute("download",t),void 0===r.download&&r.setAttribute("target","_blank"),document.body.appendChild(r),r.click(),setTimeout((function(){document.body.removeChild(r),window.URL.revokeObjectURL(i)}),200)}}},966:(e,t,n)=>{const o=n(760),a=n(171);e.exports=class{mediaRecorder;stream;__data;async start(e={audio:!0,video:!1}){if("recording"===this.mediaRecorder?.state)return!0;const t=e||{audio:!0,video:!1};try{this.stream=await navigator.mediaDevices.getUserMedia(t),this.mediaRecorder=new MediaRecorder(this.stream),this.mediaRecorder.ondataavailable=e=>this.__data=e.data}catch(e){return console.error(e),!1}return this.mediaRecorder?.start(),!0}stop(){if("recording"!==this.mediaRecorder?.state)return!0;this.mediaRecorder.stop(),this.mediaRecorder.onstop=()=>{this.stream.getTracks().forEach((e=>e.stop())),this.mediaRecorder=void 0,this.stream=void 0}}async download(e=null,t=!1,n){if(this.__data)return await a(this.__data,t,e,n)}async getBlob(e=!1,t){if(this.__data)return await o(this.__data,e,t)}}},171:(e,t,n)=>{const o=n(760);e.exports=async function(e,t,n=null,a){const i=await o(e,t,a),r=document.createElement("a");r.href=window.URL.createObjectURL(i),r.download=n||`recording('${t?"32bit":"16bit"}).wav`,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)}},952:(e,t,n)=>{n(966),e.exports.getWaveBlob=n(760),n(171)},760:e=>{function t(e,t,n){for(let o=0;o<e.length;++o)t[n+o]=e.charCodeAt(o)}function n(e,t,n){e=Math.floor(e),t[n+0]=255&e,t[n+1]=e>>8&255}function o(e,t,n){e=Math.floor(e),t[n+0]=255&e,t[n+1]=e>>8&255,t[n+2]=e>>16&255,t[n+3]=e>>24&255}function a(e){const t=new ArrayBuffer(4);return new Float32Array(t)[0]=e,0|new Uint32Array(t)[0]}e.exports=async function(e,i,r){const s=await async function(e,t){let n=e;n instanceof Blob||(n=new Blob([e]));const o=URL.createObjectURL(n),a=await fetch(o),i=await a.arrayBuffer(),r=new AudioContext(t);return await r.decodeAudioData(i)}(e,r),d=s.length,l=s.numberOfChannels,c=s.sampleRate,p=i?32:16,h=c*l*p/8,m=l*p/8,u=d*l*(p/8),f=new Uint8Array(44+u),g=u,b=28+(8+g);return t("RIFF",f,0),o(b,f,4),t("WAVE",f,8),t("fmt ",f,12),o(16,f,16),n(i?3:1,f,20),n(l,f,22),o(c,f,24),o(h,f,28),n(m,f,32),o(p,f,34),t("data",f,36),o(g,f,40),function(e,t,i,r){let s=0,d=0;const l=e.length,c=e.numberOfChannels;let p,h;for(s=0;s<l;++s)for(d=0;d<c;++d)if(p=e.getChannelData(d),16===r)h=32768*p[s],h<-32768?h=-32768:h>32767&&(h=32767),n(h,t,i),i+=2;else{if(32!==r)return void console.log("Invalid bit depth for PCM encoding.");h=a(p[s]),o(h,t,i),i+=4}}(s,f,44,p),new Blob([f],{type:"audio/wave"})}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{"use strict";var e=n(952),t=n(823),o=n(205);const a="eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLnZuY2syTjgzclBoQmNURUwxMGVPbncuRFZvcmZvdFg2QWhjQjYwa3puclZRLTc1Q3JtUlU0NWtjMGhsRkZVendBR25QeTNrTEU0ZV9qWGdRT3VRa3ZIRmY4SXR1RHUyYnJITDl2eTRwWnRmdUhHUTlsMnUtbEcxVW9fNWhpcGNtLTRCajJEYS1fUEdudkRTX3gwSk1BZ1d2OW1ZTERxb2JvZUZNVWQybzIxd21aeXlSaGhWWjRlQjN6OVN1TmxramFGY2xGdXFCVHZGQnh3cXV1eHFyLTNpYkxjWDdqdFpWMkFFSDhMcGNiamhKZDJCZnlVNGFGTW9HQVV3azVZaDlRTXh2NnBUaUlMNFhRdnFicUtVeFh4Mi1ja1NCNjY0S1hURjBFWTJmcWhVOUZHZTNYZWI4bVFCY1MwNGp0Nk54RWhnb1MweVpTUDYtSmFxY0pJeV9yTngxellseUJwdnVpNFB1ZzVTMHZfX29xWjMwU1Zvalk2bndiSUVza25IaEtJbE5kVUVKbGZZUWxpN1E4WEh2aVJkTjE0di0wUXFtOW8xMmFJM3o0U2gwcENLT0oyZk1oSTZVLUVVbEk1VElYZUU3MGlacHBoUFpQMC10NGVLMzRmLWlRZWY2dWVKR0kyNHd6VzMtUUsxYjhVU19WaTJuREtsV0sxaE1wNTVfV1pZYjhiSmlXcDNhSFVrSG9nTjd5STVPazdIQXFOaWhKVzRGMllHWFJSMVBSSHpnN2tsc3ozaktuSldudWMxYVhhTUFITkx4d1NaenBqaFRIeVBoWjhOY1hPTktVM3JxSmJ6VlJ5VnZGOEVWRWxPYkdhd1BnSUVJV3BpTHNoTTZwT2ZkOVNKZENKb2ZKTWxGc211dDNIRnVRZU5KSDhPRm5DalBSRnpuVFZDQVQyakZNOHdtSllYUnI3LVZCQVRQakh4VVA5bU1VSkdpRHZBSnk0WWt0X2tVdjVaMXJIbFctdUNEZnJTN0JsTzZrRGhUZ01sMlFtZU83V0g3cTFzUW9IaXpJcXQ4dUZRZGlkRmhvNVNScmVabnAxS2ZqTkRXU0tHRzVEd0JZaWt0QS42SVRTdWpRU1ZrUV9Sd1ZfdkZncnRRIiwidXNlcl90eXBlIjoidXNlciIsInRva2VuX2lkIjoiQWFaM3IwTXpCbE1XWmtOMkl0Tm1Sa01DMDBOVEE0TFdGak16Z3ROR1F4TldJeU0yVXlOV0V4WXpoaU5qa3pOMkV0TlRBMCIsInJlZmVyZW5jZV9pZCI6ImVmOTQ0NzBhLTg0YTMtNDhhYy1hYmRhLWExZjVhNDc0ZDVmOSIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInVzZXJfbW9kaWZ5X3RpbWVzdGFtcCI6IjIwMjIxMDI0MTk0NTM1LjY3NloiLCJyZWFsbSI6ImQ0ZDA2YjY4LTE3OWEtNDQ4MC05YzM4LTQ1ZDQwYmI4OTVkYiIsImNpc191dWlkIjoiZGZmNjE5OTMtYjlhMy00ZTc0LThmNTctMzJmOTI1MjljY2Q3IiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyeV90aW1lIjoxNjcyMTI5NDk4NDg4LCJjbGllbnRfaWQiOiJDNTgyNTRmMzhjZTAwZWM3YWZkMWI2MDY2Zjk3ZTNjMjY4MGY4MTlmYWVmZTY4YTk2NTIxOTdhM2E5ZTE4ODdjNCJ9.kNL0o8wjPMvwHaUH6eCZ-NxElLs809qp35HaoxPm_MIIChVY5lO6R81ZBAAWz7YSW8knqUlaPv4TFHLsIN1qYBQSkQfTNIjcW1sILnHSC6rK0vvT1oLPBSrda20_LArCVhgliySzdKWtRCPxtjKnBSfQMqOVLG9g1VWm927id64j54nBTzMjPcJJ_FePxB9EqCSD7MeJfIUX7ZnSscW7QHphpBlGiTWIlXUSH8I0BupGEY8g2xWtMWz5A2SW1ls8Lb9Uw_-tpYjgMDpyRIqNXwnBczwmjDk77ups1InDBwAfVnSq-BYHAj2t66etlC9ruyZXQZDYwlKpG4utRkZy-A",i="d4d06b68-179a-4480-9c38-45d40bb895db";function r(e,t,n){e.style.display="inline-block",e.innerHTML=t,e.style.backgroundColor=n,setTimeout((()=>{e.style.display="none"}),1e4)}const s=(e,t)=>{const n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n},d=document.createElement("template");class l extends HTMLElement{constructor(){super();const e=document.createElement("link");e.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",e.rel="stylesheet",document.head.append(e);const t=document.createElement("style");t.appendChild(document.createTextNode('.container{display:flex;flex-wrap:wrap;justify-content:space-between;font-family:"Montserrat", sans-serif;margin:0px}.carousel{position:relative}.carousel__item{display:none}.carousel__item--selected{display:block}.carousel__nav{width:100%;padding:20px 0;position:absolute;bottom:-70px;left:0;text-align:center}.carousel__button{width:20px;height:20px;display:inline-block;background:rgba(6,65,87,0.2);border-radius:50%;margin:0 5px;cursor:pointer}.carousel__button--selected{background:rgba(6,65,87,0.5)}.item{width:100%;height:100px;margin-bottom:1%;background:#c9f4ff}.item:nth-child(2n){width:100%;height:660px;background:#befade;background-image:url("/images/background.png");overflow:scroll}.item-inside{display:flex;gap:1rem}.btn{width:100%;height:30px;background-color:#007aa3;border-radius:4px;border-style:none;box-sizing:border-box;color:#ffffff;cursor:pointer;display:inline-block;line-height:10px;list-style:none;margin:0;outline:none;position:relative;text-align:center;text-decoration:none;transition:color 100ms;vertical-align:baseline;transition:background 0.2s}.btn:hover{background-color:#07c1f5}.rounded-button{width:20px;height:20px;background:#fff;color:#000;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:none;text-decoration:none;transition:background 0.2s}.rounded-action-button{width:50px;height:50px;background:#a12512;color:#fff;display:inline-flex;margin:0 30px;padding-left:4px;align-items:center;justify-content:center;border-radius:50%;border:none;text-decoration:none;transition:background 0.4s}.rounded-action-button:hover{cursor:pointer;background:#d4371c;box-shadow:5px 3px 10px 0px rgba(0,0,0,0.75)}.space{margin:10px;font-size:1.1rem;letter-spacing:3px}.header{text-align:center;padding:15px;font-size:24px;letter-spacing:4px;float:left}.cardHeader{color:white;text-align:center;padding:15px;font-size:24px;letter-spacing:4px}video{border-radius:18px;margin-top:80px;margin-left:10px;margin-right:10px;width:300px !important;height:320px !important;box-shadow:0px 10px 15px 0px rgba(82,73,73,0.75)}.center{display:flex;justify-content:center}.block{display:block}legend{padding-left:20px;padding-right:20px}.on-air{margin-top:20px}.off{margin-top:10px;margin-left:40%;margin-right:40%;text-align:center}.formFieldset{border:8px white;border-style:double;margin-top:10px;margin-left:32%;margin-right:30%;width:510px;height:40px;box-shadow:0px 8px 20px 0px white}.editButton{width:60px}.formData{margin-top:2px;margin-bottom:5px;padding:6px;color:gray}.bk{font-weight:600}.copy{line-height:100px;font-family:"Montserrat", sans-serif}.results{overflow:scroll;background:transparent}.table{background:#fff;padding:10px;margin-bottom:30px;margin-left:4px;margin-right:8px;border-radius:10px;box-shadow:0px 10px 15px 0px rgba(82,73,73,0.75)}.labels{color:#708090}.form{background:lightgray;display:flex;flex-direction:column;gap:0.5rem;margin-top:40px;border-radius:18px;width:320px}.form-header{border-top-left-radius:18px;border-top-right-radius:18px;border:1px solid lightgray;background:#fff;color:#333333}.form-body{border-radius:18px;background:lightgray;padding-left:6%;padding-right:6%}.form-inputs{display:flex;flex-direction:column;gap:0.8rem;height:400px}.inputs{border:1px solid gray;border-top:none;border-left:none;border-right:none;background:transparent;outline:none}.fields{color:#fff;display:inline}.formField{float:right;border-top:none;border-left:none;border-right:none;background:transparent}::placeholder{color:lightgray}.chooseFile{margin-bottom:20px}[type="file"]{color:#878787}[type="file"]::-webkit-file-upload-button{background:gray;border-radius:4px;border:none;color:#fff;cursor:pointer;font-size:12px;line-height:10px;padding:5px 16px;outline:none;text-transform:uppercase;transition:all 1s ease}.sameLine{display:inline}hr{color:white;border:none;background:white;height:2px;width:100%;margin-top:5%;margin-bottom:5%}.cardTable{width:200px}.formLabel{margin-bottom:5px;display:block;font-weight:bold;color:#708090;cursor:"pointer"}#search{width:100%;height:30px;border:none;text-decoration:none;font-size:1rem;outline:none}input:focus::placeholder{color:transparent}ion-icon{color:red}.mic{font-size:28px}.upload{font-size:24px}.hide{display:none}.notifications{float:right;margin-top:-80px;margin-right:20px;border-radius:10px;padding:10px;color:white;width:200px;text-align:center}.success{display:block;color:yellow;font-weight:600}.form.player{background:#000000}.bars{height:30px;left:48%;position:absolute;width:40px}.nameColor{color:#f7644a !important}.convertBtn{background:#00ab50;font-family:"fontAwesome"}.convertBtn:hover{background:#004e25}.editBtn{background:#007aa3;font-family:"fontAwesome"}.editBtn:hover{background:#01475e}.start{background:#ffca99;color:#d4371c;font-family:fontAwesome}.stop{background:#a12512;color:white;font-family:fontAwesome}.bar{display:none;background:#545454;bottom:1px;height:3px;position:absolute;width:3px;animation:sound 0ms -800ms linear infinite alternate}.bar:nth-child(1){left:1px;animation-duration:474ms}.bar:nth-child(2){left:5px;animation-duration:433ms}.bar:nth-child(3){left:9px;animation-duration:407ms}.bar:nth-child(4){left:13px;animation-duration:458ms}.bar:nth-child(5){left:17px;animation-duration:400ms}.bar:nth-child(6){left:21px;animation-duration:427ms}.bar:nth-child(7){left:25px;animation-duration:441ms}.bar:nth-child(8){left:29px;animation-duration:419ms}.bar:nth-child(9){left:33px;animation-duration:487ms}.bar:nth-child(10){left:37px;animation-duration:442ms}@media only screen and (max-width: 1700px){.on-air{margin-left:40%;margin-right:40%}}@media only screen and (max-width: 1500px){.on-air{margin-left:40%;margin-right:40%}}@media only screen and (max-width: 790px){.header{display:none}.formFieldset{margin-left:15%}.form{height:450px}}@media only screen and (max-width: 650px){.on-air{margin-right:30%}.item-inside{flex-wrap:wrap;justify-content:center}.formFieldset{width:420px;margin-left:10%;margin-right:10%}}@media only screen and (max-width: 470px){.on-air{margin-right:30%}.item-inside{flex-wrap:wrap;justify-content:center}.formFieldset{width:320px;margin-left:10%;margin-right:10%}.off{margin-top:0px;text-align:center}legend{padding-left:5px;padding-right:5px}}\n')),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t)}async connectedCallback(){this.render(),this.getPlay(),this.testCameraAndMic(),this.renderCardData(),this.search(),this.carousel()}async disconnectedCallback(){}async carousel(){this.shadowRoot.querySelectorAll(".carousel").forEach((e=>{const t=e.querySelectorAll(".carousel__item"),n=Array.from(t,(()=>'<span class="carousel__button"></span>'));e.insertAdjacentHTML("beforeend",`\n\t\t<div class="carousel__nav">\n\t\t\t${n.join("")}\n\t\t</div>\n\t`);const o=e.querySelectorAll(".carousel__button");o.forEach(((e,n)=>{e.addEventListener("click",(()=>{t.forEach((e=>e.classList.remove("carousel__item--selected"))),o.forEach((e=>e.classList.remove("carousel__button--selected"))),t[n].classList.add("carousel__item--selected"),e.classList.add("carousel__button--selected")}))})),t[0].classList.add("carousel__item--selected"),o[0].classList.add("carousel__button--selected")}))}async getFile(){try{const e=await fetch(`https://api.wxcc-us1.cisco.com/organization/${i}/v2/audio-file`,{method:"GET",headers:{Authorization:`Bearer ${a}`,Accept:"*/*"}}),t=await e.json();return console.groupCollapsed("All Wav Files"),console.log(t),console.groupEnd(),await t.data}catch(e){console.log(e)}}async renderCardData(){this.shadowRoot.querySelector("#getAudioSubmit").addEventListener("click",(async e=>{e.preventDefault();const n=await this.getFile(),a=this.shadowRoot.querySelector(".results");for(const e of n){const n=s("div",{class:"table"}),i=s("label",{class:"formLabel"});i.textContent="Name:";const r=s("div",{class:"formData nameColor"}),d=s("label",{class:"formLabel"});d.textContent="id ▼";const l=s("div",{class:"formData hide "});d.addEventListener("click",(e=>{l.classList.toggle("hide")}));const c=s("label",{class:"formLabel"});c.textContent="blobId ▼";const p=s("div",{class:"formData hide"});p.textContent=e.blobId,c.addEventListener("click",(e=>{p.classList.toggle("hide")}));const h=s("input",{class:"chooseFile"});h.type="file";const m=s("button",{class:"rounded-action-button upload convertBtn"},s("span",{title:"Convert"}));m.textContent="",m.addEventListener("click",(async e=>{e.preventDefault();const n=e.target.closest("div").querySelector("input").files[0];console.log(n);let a=await n.arrayBuffer(),i=new AudioContext({sampleRate:8e3}),r=await i.decodeAudioData(a);var s=o(r);t(s,n.name)}));const u=s("button",{class:" rounded-action-button upload editBtn"});u.textContent="",u.setAttribute("title","Update"),u.addEventListener("click",(async e=>{e.preventDefault();const t=e.target,n=t.closest("div").querySelector("input").files[0],o=t.closest("div").querySelector("div").textContent,a=t.closest("div").querySelector("div").nextElementSibling.nextElementSibling.textContent,i=t.closest("div").querySelector("div").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;this.updateFileFromCard(n,o,i,a)})),r.textContent=e.name,l.textContent=e.id,n.append(i,r,d,l,c,p,h,m,u),a.append(n)}}))}async updateFileFromCard(e,t,n,o){try{const s=new FormData;s.append("audioFile",e),s.append("audioFileInfo",new Blob([JSON.stringify({name:t,organizationId:"",url:"",lastUpdatedTime:0,contentType:"AUDIO_WAV",createdTime:0,version:0,blobId:n,id:o})],{type:"application/json"}));const d=await fetch(`https://api.wxcc-us1.cisco.com/organization/${i}/audio-file/${o}`,{method:"PUT",headers:{Authorization:`Bearer ${a}`,Accept:"*/*"},body:s}),l=await d.json();console.log(l),r(this.shadowRoot.querySelector(".notifications"),`Successfully updated: <div class="success">${l.name}</div> Version: <div class="success"> ${l.version} </div>`,"#03612C")}catch(e){r(notify,`Something went wrong... ${e}`,"#D4371C")}}async search(){this.shadowRoot.querySelector("#search").addEventListener("input",(e=>{const t=e.target.value.toLowerCase();Array.from(this.shadowRoot.querySelectorAll(".table")).map((e=>{const n=e.closest("div"),o=e.closest("div").querySelector("div").textContent.toLocaleLowerCase().includes(t);n.classList.toggle("hide",!o)}))}))}async testCameraAndMic(){navigator.permissions.query({name:"microphone"}).then((e=>{console.groupCollapsed("microphone"),console.log(`microphone ${e.state}`),console.groupEnd()})).catch((e=>{console.groupCollapsed("Error Microphone"),console.log("Got error :",e),console.groupEnd()})),navigator.permissions.query({name:"camera"}).then((e=>{console.groupCollapsed("camera"),console.log(`camera ${e.state}`),console.groupEnd()})).catch((e=>{console.groupCollapsed("Error Camera"),console.log("Got error :",e),console.groupEnd()}))}async getPlay(){let n=await navigator.mediaDevices.getUserMedia({audio:!0,video:{facingMode:"user",width:{min:320,ideal:320,max:320},height:{min:320,ideal:320,max:320}}}),o=this.shadowRoot.querySelector("video");o.srcObject,o.onloadedmetadata=function(e){o.play()};let a=this.shadowRoot.querySelector("#recordBTNCard"),i=this.shadowRoot.querySelector("#vid2"),r=new MediaRecorder(n),d=[];const l=async e=>{e.preventDefault(),r.start(),console.log(r.state);let t=this.shadowRoot.querySelector(".recordingState");a.removeEventListener("click",l),a.addEventListener("click",c),s("span",{class:"start"}),a.textContent="",t.textContent=r.state,t.style.color="#D4371C"},c=e=>{e.preventDefault(),r.stop(),console.log(r.state);let t=this.shadowRoot.querySelector(".recordingState");t.textContent=r.state,a.removeEventListener("click",c),a.addEventListener("click",l),s("span",{class:"stop"}),a.textContent="",t.textContent="Off",t.style.color="black"};a.addEventListener("click",l),r.ondataavailable=function(e){d.push(e.data)},r.onstop=async n=>{const o=new Blob(d),a=window.URL.createObjectURL(o);i.src=a;let r=await(0,e.getWaveBlob)(o,!1);t(r,`${new Date}.wav`)}}render(){d.innerHTML='\n    <div class="container">\n      <div class="item ">\n        <div class="header">Audio/Video<br>Recording</div>\n        <fieldset class="formFieldset">\n          <legend class=" bk on-air">On AIR:</legend>\n          <div class="recordingState off">Off</div>\n        </fieldset>\n        <div class="notifications"></div>\n      </div>\n    <div class="item">\n      <div class="center">\n        <div>\n        </div>\n      </div>\n      <div class="center">\n        <div class="carousel">\n          <div class="carousel__item">\n            <form class="form">\n              <div class="form-header cardHeader">Record <span>\n                  <div title="record audio/video" style="font-family: \'FontAwesome\'" id="recordBTNCard"\n                    class="rounded-action-button mic">&#xf130</div>\n                </span> </div>\n              <div class="form-body">\n                <div class="form-inputs">\n                  <div> <button id="getAudioSubmit" class="btn">Get Audio Files</button> </div>\n                  <div> <input style="font-family: FontAwesome " id="search" type="text"\n                      placeholder=" &#xf002;  Search Audio Files..." /> </div>\n                  <div class="results"></div>\n                </div>\n              </div>\n            </form>\n          </div>\n          <div class="item-inside">\n            <div class="carousel__item">\n              <form class="form player">\n                <div style="padding: 27px" class="form-header cardHeader">Video Player</div>\n                <video id="vid2" controls></video>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n</div>\n    ',this.shadowRoot.appendChild(d.content.cloneNode(!0))}}window.customElements.define("sa-audio-video",l)})()})();