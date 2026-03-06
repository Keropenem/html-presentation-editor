(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=i(s);fetch(s.href,a)}})();const c={slides:[{id:"slide-1",content:`
        <div class="slide">
          <h1>新しいプレゼンテーション</h1>
          <p>「HTMLを貼り付け」または「ファイルをインポート」してスライドを読み込んでください。</p>
        </div>
      `,css:`
        .slide {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: white;
          color: #333;
          font-family: 'Noto Sans JP', sans-serif;
          padding: 2rem;
          box-sizing: border-box;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; color: #6366f1; }
        p { font-size: 1.5rem; color: #666; }
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let d=null,g=null,u=null,M=null,C=null;function I(){document.querySelectorAll(".drop-zone").forEach(n=>{n.classList.remove("active")}),M=null}const X=10,j=.3;function Z(n,t){T();const i=t.getBoundingClientRect(),o=i.height*j,s=n-i.top,a=i.bottom-n;let l=0;if(s<o?l=-X*(1-s/o):a<o&&(l=X*(1-a/o)),l===0)return;function r(){e.slideList.scrollTop+=l,C=requestAnimationFrame(r)}C=requestAnimationFrame(r)}function T(){C!==null&&(cancelAnimationFrame(C),C=null)}function H(n){if(u===null||n===u||n===u+1)return;I();const t=e.slideList.querySelector(`.drop-zone[data-gap-index="${n}"]`);t&&(t.classList.add("active"),M=n)}function q(n){if(u===null)return;if(n===u||n===u+1){I();return}let t=n;u<t&&t--;const i=c.slides[c.currentIndex].id,[o]=c.slides.splice(u,1);c.slides.splice(t,0,o);const s=c.slides.findIndex(a=>a.id===i);c.currentIndex=s>=0?s:0,I(),T(),u=null,z(),w(c.currentIndex)}class U{constructor(t){this.host=t,this.shadow=this.host.attachShadow({mode:"open"})}render(t){const i=c.slides[t];if(!i)return;this.shadow.innerHTML="";const o=document.createElement("style");let s=c.globalStyles+(i.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),o.textContent=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        color: initial !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .slide-frame {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        margin: 0;
        box-sizing: border-box;
      }
      /* 編集用の画像スタイル */
      img { cursor: pointer; transition: outline 0.2s; }
      img:hover { outline: 2px solid #6366f1; }
      img.active-editing { outline: none; }

      /* 編集用のテキストスタイル */
      .slide-frame > *:not(img):hover { outline: 1px dashed rgba(99, 102, 241, 0.5); }
      .active-text-editing { outline: 2px solid #6366f1 !important; outline-offset: 2px; }

      ${s}
    `,this.shadow.appendChild(o);const a=document.createElement("div");a.className="slide-frame",a.innerHTML=i.content,a.contentEditable=!0,a.style.outline="none",this.shadow.appendChild(a),a.querySelectorAll("img").forEach(r=>{(r.dataset.cropZoom||r.dataset.cropX||r.dataset.cropY)&&F(r);const m=r.parentElement;m&&(m.dataset.frameW||(r.style.setProperty("width","100%","important"),r.style.setProperty("height","100%","important"),m.style.overflow="hidden"))}),a.addEventListener("input",()=>{c.slides[t].content=a.innerHTML,O(t)}),a.addEventListener("click",r=>{r.target.tagName==="IMG"?($(),K(r.target)):r.target!==a?(A(),V(r.target)):(A(),$())});const l=this.shadow;a.addEventListener("mouseup",()=>{setTimeout(()=>{const r=typeof l.getSelection=="function"?l.getSelection():document.getSelection();r&&!r.isCollapsed&&r.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const _=new U(e.currentSlideHost);function N(){const n=e.slideList.clientWidth;if(n<=0)return;const i=(n-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(o=>{o.style.setProperty("--thumb-scale",i)})}const G=new ResizeObserver(()=>{N()});G.observe(e.slideList);const J="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function K(n){d&&(d.classList.remove("active-editing"),d.parentElement&&(d.parentElement.style.filter="")),d=n,d.classList.add("active-editing"),e.cropZoom.value=n.dataset.cropZoom||100,e.cropX.value=n.dataset.cropX||0,e.cropY.value=n.dataset.cropY||0,F(n);const t=n.parentElement;if(t){if(!t.dataset.origH){const m=t.style.height,p=t.style.width;t.style.height="",t.style.width="",t.style.maxWidth="",t.style.marginLeft="",t.style.marginRight="",t.dataset.origH=t.offsetHeight,t.dataset.origW=t.offsetWidth,t.style.height=m,t.style.width=p}const i=parseFloat(t.dataset.frameW)||100,o=parseFloat(t.dataset.frameH)||100;e.inputImgWidth.value=i,e.valImgWidth.value=i,e.inputImgHeight.value=o,e.valImgHeight.value=o;let s=0,a=0;const r=window.getComputedStyle(t).transform;if(r&&r!=="none"){const m=r.match(/matrix\(([^)]+)\)/);if(m){const p=m[1].split(",").map(Number);s=Math.round(p[4])||0,a=Math.round(p[5])||0}}e.inputImgPosY.value=a,e.valImgPosY.value=a,e.inputImgPosX.value=s,e.valImgPosX.value=s,B()}e.imagePanel.classList.remove("hidden")}function A(){d&&(d.classList.remove("active-editing"),d.style.removeProperty("filter"),d.parentElement&&(d.parentElement.style.filter="")),d=null,e.imagePanel.classList.add("hidden")}function V(n){g&&g.classList.remove("active-text-editing"),g=n,g.classList.add("active-text-editing");const t=window.getComputedStyle(n),i=Math.round(parseFloat(t.fontSize));e.inputTextFontSize.value=i,e.valFontSize.value=i;const o=parseFloat(t.lineHeight)/parseFloat(t.fontSize)||1.5;e.inputTextLineHeight.value=o.toFixed(1),e.valLineHeight.value=o.toFixed(1);let s=0,a=0;const l=t.transform;if(l&&l!=="none"){const r=l.match(/matrix\(([^)]+)\)/);if(r){const m=r[1].split(",").map(Number);s=Math.round(m[4])||0,a=Math.round(m[5])||0}}e.inputTextPosY.value=a,e.valTextPosY.value=a,e.inputTextPosX.value=s,e.valTextPosX.value=s,e.textPanel.classList.remove("hidden")}function $(){g&&g.classList.remove("active-text-editing"),g=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function Q(){d&&(d.dataset.cropZoom=e.cropZoom.value,d.dataset.cropX=e.cropX.value,d.dataset.cropY=e.cropY.value,F(d),f())}function F(n){const t=Math.max(1,(n.dataset.cropZoom||100)/100),i=parseFloat(n.dataset.cropX||0),o=parseFloat(n.dataset.cropY||0),s=50+i/2,a=50+o/2;if(n.style.setProperty("object-fit","cover","important"),n.style.setProperty("object-position",`${s}% ${a}%`,"important"),t>1){const l=50/t,r=50/t,m=Math.max(l,Math.min(100-l,s)),p=Math.max(r,Math.min(100-r,a)),b=p-r,h=100-m-l,E=100-p-r,y=m-l;n.style.setProperty("object-view-box",`inset(${b}% ${h}% ${E}% ${y}%)`,"important")}else n.style.removeProperty("object-view-box")}function B(){if(!d||!d.parentElement)return;const n=d.parentElement;let t=parseFloat(e.inputImgWidth.value),i=parseFloat(e.inputImgHeight.value);const o=parseFloat(n.dataset.origH)||n.offsetHeight,s=d.naturalWidth,a=d.naturalHeight,l=parseFloat(n.dataset.origW)||n.offsetWidth,r=o,m=Math.max(1,(d.dataset.cropZoom||100)/100);if(s&&a&&l&&r){const P=s/a,S=l/r,x=Math.max(100,Math.round(P/S*100*m)),W=Math.max(100,Math.round(S/P*100*m));t>x&&(t=x,e.inputImgWidth.value=t,e.valImgWidth.value=t),i>W&&(i=W,e.inputImgHeight.value=i,e.valImgHeight.value=i)}n.dataset.frameW=t,n.dataset.frameH=i;const p=t>100||i>100;n.style.filter="",d.style.removeProperty("filter"),n.style.width="",n.style.maxWidth="",n.style.height="",n.style.marginLeft="",n.style.marginRight="",n.style.marginBottom="",n.style.overflow="",n.style.visibility="",n.style.position="",n.style.zIndex="";const b=t<100?(100-t)/2:0,h=i<100?(100-i)/2:0;if(p){const P=Math.max(t,100)/100,S=Math.max(i,100)/100;n.style.overflow="visible",d.style.setProperty("width",Math.max(t,100)+"%","important"),d.style.setProperty("height",Math.max(i,100)+"%","important");const x=[];P!==1&&x.push(`scaleX(${1/P})`),S!==1&&x.push(`scaleY(${1/S})`),x.length?(d.style.setProperty("transform",x.join(" "),"important"),d.style.setProperty("transform-origin","left top","important")):(d.style.removeProperty("transform"),d.style.removeProperty("transform-origin")),b||h?n.style.clipPath=`inset(${h}% ${b}%)`:n.style.clipPath="",i>100&&(n.style.marginBottom=o*(i-100)/100+"px")}else d.style.setProperty("width","100%","important"),d.style.setProperty("height","100%","important"),d.style.removeProperty("transform"),d.style.removeProperty("transform-origin"),n.style.overflow="hidden",n.style.clipPath=b||h?`inset(${h}% ${b}%)`:"";const E=parseFloat(e.inputImgPosX.value)||0,y=parseFloat(e.inputImgPosY.value)||0,v=p?Math.max(t,100)/100:1,k=p?Math.max(i,100)/100:1,L=[];(E||y)&&L.push(`translate(${E}px, ${y}px)`),(v!==1||k!==1)&&L.push(`scale(${v}, ${k})`),n.style.transform=L.join(" ")||"",n.style.transformOrigin=p?"center top":"",f(),n.style.filter=J}function f(){const n=e.currentSlideHost.shadowRoot;if(!n)return;const t=n.querySelector(".slide-frame");t&&(c.slides[c.currentIndex].content=t.innerHTML,O(c.currentIndex))}function ee(){z(),w(0),te(),D(),window.addEventListener("resize",D)}function w(n){c.currentIndex=n,_.render(n),document.querySelectorAll(".thumb-item").forEach((t,i)=>{t.classList.toggle("active",i===n)}),document.getElementById("current-index").textContent=n+1}function Y(n){const t=document.createElement("div");return t.className="drop-zone",t.dataset.gapIndex=n,t.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",H(n)}),t.addEventListener("dragleave",()=>{t.classList.remove("active")}),t.addEventListener("drop",i=>{i.preventDefault(),q(n)}),t}function z(){e.slideList.innerHTML="",c.slides.forEach((n,t)=>{e.slideList.appendChild(Y(t));const i=document.createElement("div");i.className="thumb-item",i.draggable=!0,i.onclick=()=>w(t),i.addEventListener("dragstart",l=>{u=t,i.classList.add("dragging"),l.dataTransfer.effectAllowed="move"}),i.addEventListener("dragover",l=>{if(l.preventDefault(),l.dataTransfer.dropEffect="move",u===null||u===t)return;const r=i.getBoundingClientRect(),m=(l.clientY-r.top)/r.height;m<.25?H(t):m>.75?H(t+1):I()}),i.addEventListener("dragleave",()=>{}),i.addEventListener("drop",l=>{l.preventDefault(),M!==null?q(M):I()}),i.addEventListener("dragend",()=>{i.classList.remove("dragging"),I(),T(),u=null});const o=document.createElement("div");o.className="thumb-preview";const s=o.attachShadow({mode:"open"});let a=c.globalStyles+(n.css||"");a=a.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),a=a.replace(/:root/g,":host"),a=a.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),a=a.replace(/html(?=\s|\{|,)/gi,":host"),s.innerHTML=`
      <style>
        :host { 
          display: block; 
          width: 100%; 
          overflow: hidden; 
          background: white; 
          color: #333 !important; 
          position: absolute;
          top: 0;
          left: 0;
        }
        .slide-frame { 
          width: 1122.5px;
          height: 793.7px; 
          position: absolute;
          top: 0;
          left: 0;
          transform: scale(var(--thumb-scale, 0.2));
          transform-origin: 0 0;
          background: white;
          overflow: hidden;
        }
        ${a}
      </style>
      <div class="slide-frame">${n.content}</div>
    `,i.appendChild(o),e.slideList.appendChild(i)}),e.slideList.appendChild(Y(c.slides.length)),setTimeout(N,0),document.getElementById("total-slides").textContent=c.slides.length}function O(n){const t=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(t[n]){const o=t[n].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");o&&(o.innerHTML=c.slides[n].content)}}function te(){const n=e.slideList.closest(".sidebar");n.addEventListener("dragover",o=>{u!==null&&Z(o.clientY,n)}),n.addEventListener("dragleave",o=>{n.contains(o.relatedTarget)||T()}),n.addEventListener("drop",()=>T()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(R(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",o=>{const s=o.target.files[0];if(s){const a=new FileReader;a.onload=l=>R(l.target.result),a.readAsText(s)}}),[e.cropZoom,e.cropX,e.cropY].forEach(o=>{o.addEventListener("input",Q)}),e.btnCloseImagePanel.addEventListener("click",A),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",o=>{const s=o.target.files[0];if(s&&d){const a=new FileReader;a.onload=l=>{d.src=l.target.result,f(),o.target.value=""},a.readAsDataURL(s)}}),e.btnTextBold.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("bold"),f()}),e.btnTextItalic.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("italic"),f()}),e.btnTextUnderline.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("underline"),f()}),e.colorSwatches.forEach(o=>{o.addEventListener("mousedown",s=>{s.preventDefault();const a=o.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,a),f()})});function t(o,s,a){o.addEventListener("input",l=>{s.value=l.target.value,a(l.target.value)}),s.addEventListener("input",l=>{o.value=l.target.value,a(l.target.value)})}t(e.inputTextFontSize,e.valFontSize,o=>{g&&(g.style.fontSize=o+"px",f())}),t(e.inputTextLineHeight,e.valLineHeight,o=>{g&&(g.style.lineHeight=o,f())});function i(){if(!g)return;const o=e.inputTextPosY.value||0,s=e.inputTextPosX.value||0;g.style.transform=`translate(${s}px, ${o}px)`,f()}t(e.inputTextPosY,e.valTextPosY,()=>i()),t(e.inputTextPosX,e.valTextPosX,()=>i()),e.btnCloseTextPanel.addEventListener("click",$),t(e.inputImgWidth,e.valImgWidth,()=>B()),t(e.inputImgHeight,e.valImgHeight,()=>B()),t(e.inputImgPosY,e.valImgPosY,()=>B()),t(e.inputImgPosX,e.valImgPosX,()=>B()),document.querySelectorAll(".btn-reset").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault();const a=o.dataset.slider,l=o.dataset.val,r=o.dataset.default,m=document.getElementById(a);if(m&&(m.value=r,m.dispatchEvent(new Event("input",{bubbles:!0}))),l){const p=document.getElementById(l);p&&(p.value=r)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{oe(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(o=>{o.addEventListener("click",()=>{e.printLayoutCards.forEach(s=>s.classList.remove("active")),o.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const o=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),ne(parseInt(o.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",o=>{o.target.isContentEditable||o.composedPath().some(a=>a.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(o.target.tagName)||((o.key==="ArrowDown"||o.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&w(c.currentIndex+1),(o.key==="ArrowUp"||o.key==="ArrowLeft")&&c.currentIndex>0&&w(c.currentIndex-1))})}function R(n){const i=new DOMParser().parseFromString(n,"text/html");c.globalStyles=Array.from(i.querySelectorAll("style")).map(s=>s.textContent).join(`
`);const o=i.querySelectorAll("section").length?Array.from(i.querySelectorAll("section")):i.querySelectorAll(".slide").length?Array.from(i.querySelectorAll(".slide")):[i.body];c.slides=o.map((s,a)=>({id:`imported-${a}`,content:s===i.body?s.innerHTML:s.outerHTML,css:""})),z(),w(0)}function D(){const n=document.querySelector(".editor-viewport"),t=e.editorContainer;if(!n||!t)return;const i=80,o=Math.min((n.clientWidth-i)/1122.52,(n.clientHeight-i)/793.7);t.style.transform=`scale(${Math.max(o,.1)}) translate(-50%, -50%)`,t.style.left="50%",t.style.top="50%",t.style.position="absolute"}function ne(n=1){const t=e.printFrame,i=t.contentWindow.document,o={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},s=o[n]||o[1],a=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),l=97,r=68.6,m=3,p=((210-(l*2+m))/2).toFixed(1),b=(l/297).toFixed(6);let h="";if(n===1)h=c.slides.map(y=>`<div class="print-page">${y.content}</div>`).join("");else{const y=[];for(let v=0;v<c.slides.length;v+=n)y.push(c.slides.slice(v,v+n));h=y.map(v=>`<div class="handout-page">${v.map(L=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${b}">${L.content}</div></div>`).join("")}</div>`).join("")}const E=`
    @page { size: A4 ${s.orientation}; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    .print-page {
      width: 297mm; height: 210mm;
      page-break-after: always;
      position: relative; overflow: hidden; background: white;
    }
    .handout-page {
      width: 210mm; height: 297mm;
      page-break-after: always;
      overflow: hidden; background: white;
      display: grid;
      grid-template-columns: repeat(${s.cols}, ${l}mm);
      grid-template-rows: repeat(${s.rows}, ${r}mm);
      column-gap: ${m}mm;
      padding: 0 ${p}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${l}mm; height: ${r}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${a}
  `;i.open(),i.write(`<html><head><style>${E}</style></head><body>${h}</body></html>`),i.close(),setTimeout(()=>{t.contentWindow.focus(),t.contentWindow.print()},500)}function oe(n){let t=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const i=c.slides.map((r,m)=>`<div class="slide-a4-container" id="slide-${m}"><div class="slide-frame">${r.content}</div></div>`).join(`
`);let o="";n&&(o=`
    <div id="ui-layer">
        <button id="mode-toggle-btn">プレゼンテーション開始</button>
        <div id="controls-help">左右キーで移動 / Escで終了</div>
    </div>
    <script>
        let isPresentation = false; let currentIdx = 0;
        const slides = document.querySelectorAll('.slide-a4-container');
        const body = document.body; const btn = document.getElementById('mode-toggle-btn');
        function updateSlides() { slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx)); }
        btn.addEventListener('click', () => {
            isPresentation = !isPresentation;
            body.classList.toggle('mode-presentation', isPresentation);
            btn.textContent = isPresentation ? 'エディットモード' : 'プレゼンテーション開始';
            if(isPresentation) { currentIdx = 0; updateSlides(); }
        });
        window.addEventListener('keydown', (e) => {
            if (!isPresentation) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { if (currentIdx < slides.length - 1) { currentIdx++; updateSlides(); } }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { if (currentIdx > 0) { currentIdx--; updateSlides(); } }
            else if (e.key === 'Escape') btn.click();
        });
    <\/script>
    <style>
        body.mode-presentation { background-color: #000; overflow: hidden; height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; }
        body.mode-presentation #container { width: 297mm; height: 210mm; position: relative; margin: 0; }
        body.mode-presentation .slide-a4-container { position: absolute; top: 0; left: 0; display: none !important; opacity: 0; transition: opacity 0.3s ease; border: none; box-shadow: none; margin: 0; width: 100%; height: 100%; }
        body.mode-presentation .slide-a4-container.active { display: flex !important; opacity: 1; z-index: 10; }
        #ui-layer { position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; font-family: sans-serif; }
        #mode-toggle-btn { background: #333; color: #fff; border: 1px solid #555; padding: 10px 20px; border-radius: 30px; cursor: pointer; font-size: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        #controls-help { color: #aaa; font-size: 12px; background: rgba(0,0,0,0.6); padding: 5px 12px; border-radius: 4px; opacity: 0; pointer-events: none; transition: 0.3s; }
        body.mode-presentation #controls-help { opacity: 1; }
        @media print { #ui-layer { display: none; } }
    </style>`);const s=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${t} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${i}</div>${o}</body></html>`,a=new Blob([s],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(a),l.download="presentation.html",l.click()}ee();
