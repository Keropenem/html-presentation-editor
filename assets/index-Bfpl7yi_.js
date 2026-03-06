(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const c={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let d=null,u=null,p=null,w=null,x=null;function y(){document.querySelectorAll(".drop-zone").forEach(t=>{t.classList.remove("active")}),w=null}const M=10,q=.3;function R(t,n){E();const a=n.getBoundingClientRect(),o=a.height*q,i=t-a.top,s=a.bottom-t;let r=0;if(i<o?r=-M*(1-i/o):s<o&&(r=M*(1-s/o)),r===0)return;function l(){e.slideList.scrollTop+=r,x=requestAnimationFrame(l)}x=requestAnimationFrame(l)}function E(){x!==null&&(cancelAnimationFrame(x),x=null)}function S(t){if(p===null||t===p||t===p+1)return;y();const n=e.slideList.querySelector(`.drop-zone[data-gap-index="${t}"]`);n&&(n.classList.add("active"),w=t)}function z(t){if(p===null)return;if(t===p||t===p+1){y();return}let n=t;p<n&&n--;const a=c.slides[c.currentIndex].id,[o]=c.slides.splice(p,1);c.slides.splice(n,0,o);const i=c.slides.findIndex(s=>s.id===a);c.currentIndex=i>=0?i:0,y(),E(),p=null,k(),v(c.currentIndex)}class O{constructor(n){this.host=n,this.shadow=this.host.attachShadow({mode:"open"})}render(n){const a=c.slides[n];if(!a)return;this.shadow.innerHTML="";const o=document.createElement("style");let i=c.globalStyles+(a.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),o.textContent=`
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

      ${i}
    `,this.shadow.appendChild(o);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=a.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(l=>{(l.dataset.cropZoom||l.dataset.cropX||l.dataset.cropY)&&T(l);const m=l.parentElement;m&&(m.dataset.frameW||(l.style.setProperty("width","100%","important"),l.style.setProperty("height","100%","important"),m.style.overflow="hidden"))}),s.addEventListener("input",()=>{c.slides[n].content=s.innerHTML,Y(n)}),s.addEventListener("click",l=>{l.target.tagName==="IMG"?(C(),j(l.target)):l.target!==s?(B(),U(l.target)):(B(),C())});const r=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const l=typeof r.getSelection=="function"?r.getSelection():document.getSelection();l&&!l.isCollapsed&&l.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const N=new O(e.currentSlideHost);function X(){const t=e.slideList.clientWidth;if(t<=0)return;const a=(t-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(o=>{o.style.setProperty("--thumb-scale",a)})}const Z=new ResizeObserver(()=>{X()});Z.observe(e.slideList);const H="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(t){d&&(d.classList.remove("active-editing"),d.parentElement&&(d.parentElement.style.filter="")),d=t,d.classList.add("active-editing"),e.cropZoom.value=t.dataset.cropZoom||100,e.cropX.value=t.dataset.cropX||0,e.cropY.value=t.dataset.cropY||0,T(t);const n=t.parentElement;if(n){n.dataset.origH||(n.dataset.origH=n.offsetHeight,n.dataset.origW=n.offsetWidth);const a=parseFloat(n.dataset.frameW)||100,o=parseFloat(n.dataset.frameH)||100;e.inputImgWidth.value=a,e.valImgWidth.value=a,e.inputImgHeight.value=o,e.valImgHeight.value=o;let i=0,s=0;const l=window.getComputedStyle(n).transform;if(l&&l!=="none"){const m=l.match(/matrix\(([^)]+)\)/);if(m){const g=m[1].split(",").map(Number);i=Math.round(g[4])||0,s=Math.round(g[5])||0}}e.inputImgPosY.value=s,e.valImgPosY.value=s,e.inputImgPosX.value=i,e.valImgPosX.value=i,b()}e.imagePanel.classList.remove("hidden")}function B(){d&&(d.classList.remove("active-editing"),d.style.removeProperty("filter"),d.parentElement&&(d.parentElement.style.filter="")),d=null,e.imagePanel.classList.add("hidden")}function U(t){u&&u.classList.remove("active-text-editing"),u=t,u.classList.add("active-text-editing");const n=window.getComputedStyle(t),a=Math.round(parseFloat(n.fontSize));e.inputTextFontSize.value=a,e.valFontSize.value=a;const o=parseFloat(n.lineHeight)/parseFloat(n.fontSize)||1.5;e.inputTextLineHeight.value=o.toFixed(1),e.valLineHeight.value=o.toFixed(1);let i=0,s=0;const r=n.transform;if(r&&r!=="none"){const l=r.match(/matrix\(([^)]+)\)/);if(l){const m=l[1].split(",").map(Number);i=Math.round(m[4])||0,s=Math.round(m[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=i,e.valTextPosX.value=i,e.textPanel.classList.remove("hidden")}function C(){u&&u.classList.remove("active-text-editing"),u=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){d&&(d.dataset.cropZoom=e.cropZoom.value,d.dataset.cropX=e.cropX.value,d.dataset.cropY=e.cropY.value,T(d),f())}function T(t){const n=Math.max(1,(t.dataset.cropZoom||100)/100),a=parseFloat(t.dataset.cropX||0),o=parseFloat(t.dataset.cropY||0),i=50+a/2,s=50+o/2;t.style.setProperty("object-fit","cover","important"),t.style.setProperty("object-position",`${i}% ${s}%`,"important"),t.style.setProperty("transform-origin",`${i}% ${s}%`,"important"),t.style.setProperty("transform",`scale(${n})`,"important")}function b(){if(!d||!d.parentElement)return;const t=d.parentElement,n=parseFloat(e.inputImgWidth.value),a=parseFloat(e.inputImgHeight.value),o=parseFloat(t.dataset.origH)||t.offsetHeight;t.dataset.frameW=n,t.dataset.frameH=a;const i=n>100||a>100;t.style.filter="",d.style.removeProperty("filter");const s=Math.max(n,100),r=Math.max(a,100);d.style.setProperty("width",s+"%","important"),d.style.setProperty("height",r+"%","important");const l=n<100?(100-n)/2:0,m=a<100?(100-a)/2:0;t.style.width="",t.style.maxWidth="",t.style.height="",t.style.marginLeft="",t.style.marginRight="",t.style.marginBottom="",i?(t.style.overflow="visible",t.style.clipPath="",d.style.setProperty("position","relative","important"),d.style.setProperty("left",n>100?`${-(s-100)/2}%`:"0","important"),d.style.setProperty("top","0","important"),l||m?d.style.setProperty("clip-path",`inset(${m}% ${l}%)`,"important"):d.style.removeProperty("clip-path"),a>100&&(t.style.marginBottom=o*(a-100)/100+"px")):(t.style.overflow="hidden",t.style.clipPath=l||m?`inset(${m}% ${l}%)`:"",d.style.removeProperty("position"),d.style.removeProperty("left"),d.style.removeProperty("top"),d.style.removeProperty("clip-path"));const g=parseFloat(e.inputImgPosX.value)||0,I=parseFloat(e.inputImgPosY.value)||0;t.style.transform=g||I?`translate(${g}px, ${I}px)`:"",f(),i?d.style.setProperty("filter",H,"important"):t.style.filter=H}function f(){const t=e.currentSlideHost.shadowRoot;if(!t)return;const n=t.querySelector(".slide-frame");n&&(c.slides[c.currentIndex].content=n.innerHTML,Y(c.currentIndex))}function G(){k(),v(0),J(),F(),window.addEventListener("resize",F)}function v(t){c.currentIndex=t,N.render(t),document.querySelectorAll(".thumb-item").forEach((n,a)=>{n.classList.toggle("active",a===t)}),document.getElementById("current-index").textContent=t+1}function A(t){const n=document.createElement("div");return n.className="drop-zone",n.dataset.gapIndex=t,n.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",S(t)}),n.addEventListener("dragleave",()=>{n.classList.remove("active")}),n.addEventListener("drop",a=>{a.preventDefault(),z(t)}),n}function k(){e.slideList.innerHTML="",c.slides.forEach((t,n)=>{e.slideList.appendChild(A(n));const a=document.createElement("div");a.className="thumb-item",a.draggable=!0,a.onclick=()=>v(n),a.addEventListener("dragstart",r=>{p=n,a.classList.add("dragging"),r.dataTransfer.effectAllowed="move"}),a.addEventListener("dragover",r=>{if(r.preventDefault(),r.dataTransfer.dropEffect="move",p===null||p===n)return;const l=a.getBoundingClientRect(),m=(r.clientY-l.top)/l.height;m<.25?S(n):m>.75?S(n+1):y()}),a.addEventListener("dragleave",()=>{}),a.addEventListener("drop",r=>{r.preventDefault(),w!==null?z(w):y()}),a.addEventListener("dragend",()=>{a.classList.remove("dragging"),y(),E(),p=null});const o=document.createElement("div");o.className="thumb-preview";const i=o.attachShadow({mode:"open"});let s=c.globalStyles+(t.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),i.innerHTML=`
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
        ${s}
      </style>
      <div class="slide-frame">${t.content}</div>
    `,a.appendChild(o),e.slideList.appendChild(a)}),e.slideList.appendChild(A(c.slides.length)),setTimeout(X,0),document.getElementById("total-slides").textContent=c.slides.length}function Y(t){const n=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(n[t]){const o=n[t].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");o&&(o.innerHTML=c.slides[t].content)}}function J(){const t=e.slideList.closest(".sidebar");t.addEventListener("dragover",o=>{p!==null&&R(o.clientY,t)}),t.addEventListener("dragleave",o=>{t.contains(o.relatedTarget)||E()}),t.addEventListener("drop",()=>E()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&($(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",o=>{const i=o.target.files[0];if(i){const s=new FileReader;s.onload=r=>$(r.target.result),s.readAsText(i)}}),[e.cropZoom,e.cropX,e.cropY].forEach(o=>{o.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",B),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",o=>{const i=o.target.files[0];if(i&&d){const s=new FileReader;s.onload=r=>{d.src=r.target.result,f(),o.target.value=""},s.readAsDataURL(i)}}),e.btnTextBold.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("bold"),f()}),e.btnTextItalic.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("italic"),f()}),e.btnTextUnderline.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("underline"),f()}),e.colorSwatches.forEach(o=>{o.addEventListener("mousedown",i=>{i.preventDefault();const s=o.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,s),f()})});function n(o,i,s){o.addEventListener("input",r=>{i.value=r.target.value,s(r.target.value)}),i.addEventListener("input",r=>{o.value=r.target.value,s(r.target.value)})}n(e.inputTextFontSize,e.valFontSize,o=>{u&&(u.style.fontSize=o+"px",f())}),n(e.inputTextLineHeight,e.valLineHeight,o=>{u&&(u.style.lineHeight=o,f())});function a(){if(!u)return;const o=e.inputTextPosY.value||0,i=e.inputTextPosX.value||0;u.style.transform=`translate(${i}px, ${o}px)`,f()}n(e.inputTextPosY,e.valTextPosY,()=>a()),n(e.inputTextPosX,e.valTextPosX,()=>a()),e.btnCloseTextPanel.addEventListener("click",C),n(e.inputImgWidth,e.valImgWidth,()=>b()),n(e.inputImgHeight,e.valImgHeight,()=>b()),n(e.inputImgPosY,e.valImgPosY,()=>b()),n(e.inputImgPosX,e.valImgPosX,()=>b()),document.querySelectorAll(".btn-reset").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const s=o.dataset.slider,r=o.dataset.val,l=o.dataset.default,m=document.getElementById(s);if(m&&(m.value=l,m.dispatchEvent(new Event("input",{bubbles:!0}))),r){const g=document.getElementById(r);g&&(g.value=l)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(o=>{o.addEventListener("click",()=>{e.printLayoutCards.forEach(i=>i.classList.remove("active")),o.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const o=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(o.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",o=>{o.target.isContentEditable||o.composedPath().some(s=>s.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(o.target.tagName)||((o.key==="ArrowDown"||o.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&v(c.currentIndex+1),(o.key==="ArrowUp"||o.key==="ArrowLeft")&&c.currentIndex>0&&v(c.currentIndex-1))})}function $(t){const a=new DOMParser().parseFromString(t,"text/html");c.globalStyles=Array.from(a.querySelectorAll("style")).map(i=>i.textContent).join(`
`);const o=a.querySelectorAll("section").length?Array.from(a.querySelectorAll("section")):a.querySelectorAll(".slide").length?Array.from(a.querySelectorAll(".slide")):[a.body];c.slides=o.map((i,s)=>({id:`imported-${s}`,content:i===a.body?i.innerHTML:i.outerHTML,css:""})),k(),v(0)}function F(){const t=document.querySelector(".editor-viewport"),n=e.editorContainer;if(!t||!n)return;const a=80,o=Math.min((t.clientWidth-a)/1122.52,(t.clientHeight-a)/793.7);n.style.transform=`scale(${Math.max(o,.1)}) translate(-50%, -50%)`,n.style.left="50%",n.style.top="50%",n.style.position="absolute"}function K(t=1){const n=e.printFrame,a=n.contentWindow.document,o={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},i=o[t]||o[1],s=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),r=97,l=68.6,m=3,g=((210-(r*2+m))/2).toFixed(1),I=(r/297).toFixed(6);let P="";if(t===1)P=c.slides.map(L=>`<div class="print-page">${L.content}</div>`).join("");else{const L=[];for(let h=0;h<c.slides.length;h+=t)L.push(c.slides.slice(h,h+t));P=L.map(h=>`<div class="handout-page">${h.map(W=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${I}">${W.content}</div></div>`).join("")}</div>`).join("")}const D=`
    @page { size: A4 ${i.orientation}; margin: 0; }
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
      grid-template-columns: repeat(${i.cols}, ${r}mm);
      grid-template-rows: repeat(${i.rows}, ${l}mm);
      column-gap: ${m}mm;
      padding: 0 ${g}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${r}mm; height: ${l}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${s}
  `;a.open(),a.write(`<html><head><style>${D}</style></head><body>${P}</body></html>`),a.close(),setTimeout(()=>{n.contentWindow.focus(),n.contentWindow.print()},500)}function V(t){let n=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const a=c.slides.map((l,m)=>`<div class="slide-a4-container" id="slide-${m}"><div class="slide-frame">${l.content}</div></div>`).join(`
`);let o="";t&&(o=`
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
    </style>`);const i=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${n} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${a}</div>${o}</body></html>`,s=new Blob([i],{type:"text/html"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download="presentation.html",r.click()}G();
