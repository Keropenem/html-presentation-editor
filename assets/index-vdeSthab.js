(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const e of l)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(l){const e={};return l.integrity&&(e.integrity=l.integrity),l.referrerPolicy&&(e.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?e.credentials="include":l.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(l){if(l.ep)return;l.ep=!0;const e=i(l);fetch(l.href,e)}})();const c={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},t={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),inputSelFontSize:document.getElementById("input-sel-fontsize"),valSelFontSize:document.getElementById("val-sel-fontsize"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let m=null,u=null,p=null,P=null,w=null;function b(){document.querySelectorAll(".drop-zone").forEach(n=>{n.classList.remove("active")}),P=null}const A=10,D=.3;function W(n,o){L();const i=o.getBoundingClientRect(),r=i.height*D,l=n-i.top,e=i.bottom-n;let a=0;if(l<r?a=-A*(1-l/r):e<r&&(a=A*(1-e/r)),a===0)return;function s(){t.slideList.scrollTop+=a,w=requestAnimationFrame(s)}w=requestAnimationFrame(s)}function L(){w!==null&&(cancelAnimationFrame(w),w=null)}function C(n){if(p===null||n===p||n===p+1)return;b();const o=t.slideList.querySelector(`.drop-zone[data-gap-index="${n}"]`);o&&(o.classList.add("active"),P=n)}function $(n){if(p===null)return;if(n===p||n===p+1){b();return}let o=n;p<o&&o--;const i=c.slides[c.currentIndex].id,[r]=c.slides.splice(p,1);c.slides.splice(o,0,r);const l=c.slides.findIndex(e=>e.id===i);c.currentIndex=l>=0?l:0,b(),L(),p=null,F(),x(c.currentIndex)}class O{constructor(o){this.host=o,this.shadow=this.host.attachShadow({mode:"open"})}render(o){const i=c.slides[o];if(!i)return;this.shadow.innerHTML="";const r=document.createElement("style");let l=c.globalStyles+(i.css||"");l=l.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),l=l.replace(/:root/g,":host"),l=l.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),l=l.replace(/html(?=\s|\{|,)/gi,":host"),r.textContent=`
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

      ${l}
    `,this.shadow.appendChild(r);const e=document.createElement("div");e.className="slide-frame",e.innerHTML=i.content,e.contentEditable=!0,e.style.outline="none",this.shadow.appendChild(e),e.querySelectorAll("img").forEach(s=>{(s.dataset.cropZoom||s.dataset.cropX||s.dataset.cropY)&&k(s);const d=s.parentElement;d&&(d.dataset.frameW||(s.style.setProperty("width","100%","important"),s.style.setProperty("height","100%","important"),d.style.overflow="hidden"))}),e.addEventListener("input",()=>{c.slides[o].content=e.innerHTML,Y(o)}),e.addEventListener("click",s=>{s.target.tagName==="IMG"?(B(),j(s.target)):s.target!==e?(T(),U(s.target)):(T(),B())});const a=this.shadow;e.addEventListener("mouseup",()=>{setTimeout(()=>{const s=typeof a.getSelection=="function"?a.getSelection():document.getSelection();s&&!s.isCollapsed&&s.toString().trim()?t.textFormatPanel.classList.remove("hidden"):t.textFormatPanel.classList.add("hidden")},10)})}}const h=new O(t.currentSlideHost);function X(){const n=t.slideList.clientWidth;if(n<=0)return;const i=(n-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(r=>{r.style.setProperty("--thumb-scale",i)})}const N=new ResizeObserver(()=>{X()});N.observe(t.slideList);const Z="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(n){m&&(m.classList.remove("active-editing"),m.parentElement&&(m.parentElement.style.filter="")),m=n,m.classList.add("active-editing"),t.cropZoom.value=n.dataset.cropZoom||100,t.cropX.value=n.dataset.cropX||0,t.cropY.value=n.dataset.cropY||0,k(n);const o=n.parentElement;if(o){const i=parseFloat(o.dataset.frameW)||100,r=parseFloat(o.dataset.frameH)||100;t.inputImgWidth.value=i,t.valImgWidth.value=i,t.inputImgHeight.value=r,t.valImgHeight.value=r;let l=0,e=0;const s=window.getComputedStyle(o).transform;if(s&&s!=="none"){const d=s.match(/matrix\(([^)]+)\)/);if(d){const f=d[1].split(",").map(Number);l=Math.round(f[4])||0,e=Math.round(f[5])||0}}t.inputImgPosY.value=e,t.valImgPosY.value=e,t.inputImgPosX.value=l,t.valImgPosX.value=l,I(),o.style.filter=Z}t.imagePanel.classList.remove("hidden")}function T(){m&&(m.classList.remove("active-editing"),m.parentElement&&(m.parentElement.style.filter="")),m=null,t.imagePanel.classList.add("hidden")}function U(n){u&&u.classList.remove("active-text-editing"),u=n,u.classList.add("active-text-editing");const o=window.getComputedStyle(n),i=Math.round(parseFloat(o.fontSize));t.inputTextFontSize.value=i,t.valFontSize.value=i;const r=parseFloat(o.lineHeight)/parseFloat(o.fontSize)||1.5;t.inputTextLineHeight.value=r.toFixed(1),t.valLineHeight.value=r.toFixed(1);let l=0,e=0;const a=o.transform;if(a&&a!=="none"){const s=a.match(/matrix\(([^)]+)\)/);if(s){const d=s[1].split(",").map(Number);l=Math.round(d[4])||0,e=Math.round(d[5])||0}}t.inputTextPosY.value=e,t.valTextPosY.value=e,t.inputTextPosX.value=l,t.valTextPosX.value=l,t.textPanel.classList.remove("hidden")}function B(){u&&u.classList.remove("active-text-editing"),u=null,t.textPanel.classList.add("hidden"),t.textFormatPanel.classList.add("hidden")}function _(){m&&(m.dataset.cropZoom=t.cropZoom.value,m.dataset.cropX=t.cropX.value,m.dataset.cropY=t.cropY.value,k(m),g())}function k(n){const o=Math.max(1,(n.dataset.cropZoom||100)/100),i=parseFloat(n.dataset.cropX||0),r=parseFloat(n.dataset.cropY||0),l=50+i/2,e=50+r/2;n.style.setProperty("object-fit","cover","important"),n.style.setProperty("object-position",`${l}% ${e}%`,"important"),n.style.setProperty("transform-origin",`${l}% ${e}%`,"important"),n.style.setProperty("transform",`scale(${o})`,"important")}function I(){if(!m||!m.parentElement)return;const n=m.parentElement,o=parseFloat(t.inputImgWidth.value),i=parseFloat(t.inputImgHeight.value);n.dataset.frameW=o,n.dataset.frameH=i;const r=(100-o)/2,l=(100-i)/2;n.style.clipPath=o!==100||i!==100?`inset(${l}% ${r}%)`:"";const e=Math.max(o,100),a=Math.max(i,100);m.style.setProperty("width",e+"%","important"),m.style.setProperty("height",a+"%","important"),o>100||i>100?(n.style.overflow="visible",m.style.setProperty("position","relative","important"),m.style.setProperty("left",`${-(e-100)/2}%`,"important"),m.style.setProperty("top",`${-(a-100)/2}%`,"important")):(n.style.overflow="hidden",m.style.removeProperty("position"),m.style.removeProperty("left"),m.style.removeProperty("top"));const s=parseFloat(t.inputImgPosX.value)||0,d=parseFloat(t.inputImgPosY.value)||0;n.style.transform=s||d?`translate(${s}px, ${d}px)`:"",g()}function g(){const n=t.currentSlideHost.shadowRoot;if(!n)return;const o=n.querySelector(".slide-frame");o&&(c.slides[c.currentIndex].content=o.innerHTML,Y(c.currentIndex))}function G(){F(),x(0),J(),H(),window.addEventListener("resize",H)}function x(n){c.currentIndex=n,h.render(n),document.querySelectorAll(".thumb-item").forEach((o,i)=>{o.classList.toggle("active",i===n)}),document.getElementById("current-index").textContent=n+1}function M(n){const o=document.createElement("div");return o.className="drop-zone",o.dataset.gapIndex=n,o.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",C(n)}),o.addEventListener("dragleave",()=>{o.classList.remove("active")}),o.addEventListener("drop",i=>{i.preventDefault(),$(n)}),o}function F(){t.slideList.innerHTML="",c.slides.forEach((n,o)=>{t.slideList.appendChild(M(o));const i=document.createElement("div");i.className="thumb-item",i.draggable=!0,i.onclick=()=>x(o),i.addEventListener("dragstart",a=>{p=o,i.classList.add("dragging"),a.dataTransfer.effectAllowed="move"}),i.addEventListener("dragover",a=>{if(a.preventDefault(),a.dataTransfer.dropEffect="move",p===null||p===o)return;const s=i.getBoundingClientRect(),d=(a.clientY-s.top)/s.height;d<.25?C(o):d>.75?C(o+1):b()}),i.addEventListener("dragleave",()=>{}),i.addEventListener("drop",a=>{a.preventDefault(),P!==null?$(P):b()}),i.addEventListener("dragend",()=>{i.classList.remove("dragging"),b(),L(),p=null});const r=document.createElement("div");r.className="thumb-preview";const l=r.attachShadow({mode:"open"});let e=c.globalStyles+(n.css||"");e=e.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),e=e.replace(/:root/g,":host"),e=e.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),e=e.replace(/html(?=\s|\{|,)/gi,":host"),l.innerHTML=`
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
        ${e}
      </style>
      <div class="slide-frame">${n.content}</div>
    `,i.appendChild(r),t.slideList.appendChild(i)}),t.slideList.appendChild(M(c.slides.length)),setTimeout(X,0),document.getElementById("total-slides").textContent=c.slides.length}function Y(n){const o=Array.from(t.slideList.querySelectorAll(".thumb-item"));if(o[n]){const r=o[n].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");r&&(r.innerHTML=c.slides[n].content)}}function J(){const n=t.slideList.closest(".sidebar");n.addEventListener("dragover",e=>{p!==null&&W(e.clientY,n)}),n.addEventListener("dragleave",e=>{n.contains(e.relatedTarget)||L()}),n.addEventListener("drop",()=>L()),t.btnPaste.addEventListener("click",()=>{t.pasteInput.value="",t.pasteModal.classList.remove("hidden")}),t.btnPasteConfirm.addEventListener("click",()=>{t.pasteInput.value.trim()&&(z(t.pasteInput.value),t.pasteModal.classList.add("hidden"))}),t.btnPasteCancel.addEventListener("click",()=>t.pasteModal.classList.add("hidden")),t.btnClosePasteModal.addEventListener("click",()=>t.pasteModal.classList.add("hidden")),t.btnImport.addEventListener("click",()=>t.fileInputHtml.click()),t.fileInputHtml.addEventListener("change",e=>{const a=e.target.files[0];if(a){const s=new FileReader;s.onload=d=>z(d.target.result),s.readAsText(a)}}),[t.cropZoom,t.cropX,t.cropY].forEach(e=>{e.addEventListener("input",_)}),t.btnCloseImagePanel.addEventListener("click",T),t.btnChangeImageAlt.addEventListener("click",()=>t.fileInputImage.click()),t.fileInputImage.addEventListener("change",e=>{const a=e.target.files[0];if(a&&m){const s=new FileReader;s.onload=d=>{m.src=d.target.result,g(),e.target.value=""},s.readAsDataURL(a)}}),t.btnTextBold.addEventListener("mousedown",e=>{e.preventDefault(),document.execCommand("bold"),g()}),t.btnTextItalic.addEventListener("mousedown",e=>{e.preventDefault(),document.execCommand("italic"),g()}),t.btnTextUnderline.addEventListener("mousedown",e=>{e.preventDefault(),document.execCommand("underline"),g()}),t.colorSwatches.forEach(e=>{e.addEventListener("mousedown",a=>{a.preventDefault();const s=e.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,s),g()})});function o(e){document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontSize",!1,"7");const a=h.shadow.querySelector(".slide-frame");a&&(a.querySelectorAll("span").forEach(s=>{const d=s.style.fontSize;d&&(d.includes("xxx-large")||d==="-webkit-xxx-large")&&(s.style.fontSize=e+"px")}),a.querySelectorAll('font[size="7"]').forEach(s=>{const d=document.createElement("span");d.style.fontSize=e+"px",d.innerHTML=s.innerHTML,s.replaceWith(d)})),g()}t.inputSelFontSize.addEventListener("mousedown",e=>e.preventDefault()),t.inputSelFontSize.addEventListener("input",e=>{t.valSelFontSize.value=e.target.value,o(e.target.value)});let i=null;t.valSelFontSize.addEventListener("focus",()=>{const e=typeof h.shadow.getSelection=="function"?h.shadow.getSelection():document.getSelection();e&&e.rangeCount>0&&!e.isCollapsed&&(i=e.getRangeAt(0).cloneRange())}),t.valSelFontSize.addEventListener("change",e=>{const a=parseInt(e.target.value)||16;if(e.target.value=a,t.inputSelFontSize.value=a,i){const s=h.shadow.querySelector(".slide-frame");s&&s.focus();const d=typeof h.shadow.getSelection=="function"?h.shadow.getSelection():document.getSelection();d.removeAllRanges(),d.addRange(i),i=null,o(a)}});function r(e,a,s){e.addEventListener("input",d=>{a.value=d.target.value,s(d.target.value)}),a.addEventListener("input",d=>{e.value=d.target.value,s(d.target.value)})}r(t.inputTextFontSize,t.valFontSize,e=>{u&&(u.style.fontSize=e+"px",g())}),r(t.inputTextLineHeight,t.valLineHeight,e=>{u&&(u.style.lineHeight=e,g())});function l(){if(!u)return;const e=t.inputTextPosY.value||0,a=t.inputTextPosX.value||0;u.style.transform=`translate(${a}px, ${e}px)`,g()}r(t.inputTextPosY,t.valTextPosY,()=>l()),r(t.inputTextPosX,t.valTextPosX,()=>l()),t.btnCloseTextPanel.addEventListener("click",B),r(t.inputImgWidth,t.valImgWidth,()=>I()),r(t.inputImgHeight,t.valImgHeight,()=>I()),r(t.inputImgPosY,t.valImgPosY,()=>I()),r(t.inputImgPosX,t.valImgPosX,()=>I()),document.querySelectorAll(".btn-reset").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();const s=e.dataset.slider,d=e.dataset.val,f=e.dataset.default,E=document.getElementById(s);if(E&&(E.value=f,E.dispatchEvent(new Event("input",{bubbles:!0}))),d){const v=document.getElementById(d);v&&(v.value=f)}})}),t.btnExportHtml.addEventListener("click",()=>t.exportModal.classList.remove("hidden")),t.btnExportConfirm.addEventListener("click",()=>{V(t.checkPresentationMode.checked),t.exportModal.classList.add("hidden")}),t.btnExportCancel.addEventListener("click",()=>t.exportModal.classList.add("hidden")),t.btnCloseExportModal.addEventListener("click",()=>t.exportModal.classList.add("hidden")),t.btnPrint.addEventListener("click",()=>t.printModal.classList.remove("hidden")),t.printLayoutCards.forEach(e=>{e.addEventListener("click",()=>{t.printLayoutCards.forEach(a=>a.classList.remove("active")),e.classList.add("active")})}),t.btnPrintConfirm.addEventListener("click",()=>{const e=document.querySelector('input[name="print-layout"]:checked');t.printModal.classList.add("hidden"),K(parseInt(e.value))}),t.btnPrintCancel.addEventListener("click",()=>t.printModal.classList.add("hidden")),t.btnClosePrintModal.addEventListener("click",()=>t.printModal.classList.add("hidden")),window.addEventListener("keydown",e=>{e.target.isContentEditable||e.composedPath().some(s=>s.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||((e.key==="ArrowDown"||e.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&x(c.currentIndex+1),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&c.currentIndex>0&&x(c.currentIndex-1))})}function z(n){const i=new DOMParser().parseFromString(n,"text/html");c.globalStyles=Array.from(i.querySelectorAll("style")).map(l=>l.textContent).join(`
`);const r=i.querySelectorAll("section").length?Array.from(i.querySelectorAll("section")):i.querySelectorAll(".slide").length?Array.from(i.querySelectorAll(".slide")):[i.body];c.slides=r.map((l,e)=>({id:`imported-${e}`,content:l===i.body?l.innerHTML:l.outerHTML,css:""})),F(),x(0)}function H(){const n=document.querySelector(".editor-viewport"),o=t.editorContainer;if(!n||!o)return;const i=80,r=Math.min((n.clientWidth-i)/1122.52,(n.clientHeight-i)/793.7);o.style.transform=`scale(${Math.max(r,.1)}) translate(-50%, -50%)`,o.style.left="50%",o.style.top="50%",o.style.position="absolute"}function K(n=1){const o=t.printFrame,i=o.contentWindow.document,r={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},l=r[n]||r[1],e=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),a=97,s=68.6,d=3,f=((210-(a*2+d))/2).toFixed(1),E=(a/297).toFixed(6);let v="";if(n===1)v=c.slides.map(S=>`<div class="print-page">${S.content}</div>`).join("");else{const S=[];for(let y=0;y<c.slides.length;y+=n)S.push(c.slides.slice(y,y+n));v=S.map(y=>`<div class="handout-page">${y.map(R=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${E}">${R.content}</div></div>`).join("")}</div>`).join("")}const q=`
    @page { size: A4 ${l.orientation}; margin: 0; }
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
      grid-template-columns: repeat(${l.cols}, ${a}mm);
      grid-template-rows: repeat(${l.rows}, ${s}mm);
      column-gap: ${d}mm;
      padding: 0 ${f}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${a}mm; height: ${s}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${e}
  `;i.open(),i.write(`<html><head><style>${q}</style></head><body>${v}</body></html>`),i.close(),setTimeout(()=>{o.contentWindow.focus(),o.contentWindow.print()},500)}function V(n){let o=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const i=c.slides.map((s,d)=>`<div class="slide-a4-container" id="slide-${d}"><div class="slide-frame">${s.content}</div></div>`).join(`
`);let r="";n&&(r=`
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
    </style>`);const l=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${o} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${i}</div>${r}</body></html>`,e=new Blob([l],{type:"text/html"}),a=document.createElement("a");a.href=URL.createObjectURL(e),a.download="presentation.html",a.click()}G();
