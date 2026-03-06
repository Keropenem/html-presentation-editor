(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&r(t)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const c={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),inputSelFontSize:document.getElementById("input-sel-fontsize"),valSelFontSize:document.getElementById("val-sel-fontsize"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let u=null,f=null,p=null,P=null,E=null;function b(){document.querySelectorAll(".drop-zone").forEach(n=>{n.classList.remove("active")}),P=null}const z=10,R=.3;function D(n,o){I();const i=o.getBoundingClientRect(),r=i.height*R,a=n-i.top,s=i.bottom-n;let t=0;if(a<r?t=-z*(1-a/r):s<r&&(t=z*(1-s/r)),t===0)return;function l(){e.slideList.scrollTop+=t,E=requestAnimationFrame(l)}E=requestAnimationFrame(l)}function I(){E!==null&&(cancelAnimationFrame(E),E=null)}function C(n){if(p===null||n===p||n===p+1)return;b();const o=e.slideList.querySelector(`.drop-zone[data-gap-index="${n}"]`);o&&(o.classList.add("active"),P=n)}function $(n){if(p===null)return;if(n===p||n===p+1){b();return}let o=n;p<o&&o--;const i=c.slides[c.currentIndex].id,[r]=c.slides.splice(p,1);c.slides.splice(o,0,r);const a=c.slides.findIndex(s=>s.id===i);c.currentIndex=a>=0?a:0,b(),I(),p=null,A(),x(c.currentIndex)}class W{constructor(o){this.host=o,this.shadow=this.host.attachShadow({mode:"open"})}render(o){const i=c.slides[o];if(!i)return;this.shadow.innerHTML="";const r=document.createElement("style");let a=c.globalStyles+(i.css||"");a=a.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),a=a.replace(/:root/g,":host"),a=a.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),a=a.replace(/html(?=\s|\{|,)/gi,":host"),r.textContent=`
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
      img.active-editing { outline: 3px solid #6366f1; outline-offset: -3px; }

      /* 編集用のテキストスタイル */
      .slide-frame > *:not(img):hover { outline: 1px dashed rgba(99, 102, 241, 0.5); }
      .active-text-editing { outline: 2px solid #6366f1 !important; outline-offset: 2px; }

      ${a}
    `,this.shadow.appendChild(r);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=i.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(l=>{(l.dataset.cropZoom||l.dataset.cropX||l.dataset.cropY)&&k(l),l.parentElement&&(l.parentElement.style.overflow="hidden")}),s.addEventListener("input",()=>{c.slides[o].content=s.innerHTML,q(o)}),s.addEventListener("click",l=>{l.target.tagName==="IMG"?(T(),N(l.target)):l.target!==s?(B(),Z(l.target)):(B(),T())});const t=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const l=typeof t.getSelection=="function"?t.getSelection():document.getSelection();l&&!l.isCollapsed&&l.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const v=new W(e.currentSlideHost);function X(){const n=e.slideList.clientWidth;if(n<=0)return;const i=(n-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(r=>{r.style.setProperty("--thumb-scale",i)})}const O=new ResizeObserver(()=>{X()});O.observe(e.slideList);function N(n){u&&u.classList.remove("active-editing"),u=n,u.classList.add("active-editing"),e.cropZoom.value=n.dataset.cropZoom||100,e.cropX.value=n.dataset.cropX||0,e.cropY.value=n.dataset.cropY||0,k(n);const o=n.parentElement;if(o){const i=window.getComputedStyle(o),r=o.style.width&&o.style.width.includes("%")?parseInt(o.style.width):100,a=o.style.height&&o.style.height.includes("%")?parseInt(o.style.height):100;e.inputImgWidth.value=r,e.valImgWidth.value=r,e.inputImgHeight.value=a,e.valImgHeight.value=a;let s=0,t=0;const l=i.transform;if(l&&l!=="none"){const d=l.match(/matrix\(([^)]+)\)/);if(d){const m=d[1].split(",").map(Number);s=Math.round(m[4])||0,t=Math.round(m[5])||0}}e.inputImgPosY.value=t,e.valImgPosY.value=t,e.inputImgPosX.value=s,e.valImgPosX.value=s}e.imagePanel.classList.remove("hidden")}function B(){u&&u.classList.remove("active-editing"),u=null,e.imagePanel.classList.add("hidden")}function Z(n){f&&f.classList.remove("active-text-editing"),f=n,f.classList.add("active-text-editing");const o=window.getComputedStyle(n),i=Math.round(parseFloat(o.fontSize));e.inputTextFontSize.value=i,e.valFontSize.value=i;const r=parseFloat(o.lineHeight)/parseFloat(o.fontSize)||1.5;e.inputTextLineHeight.value=r.toFixed(1),e.valLineHeight.value=r.toFixed(1);let a=0,s=0;const t=o.transform;if(t&&t!=="none"){const l=t.match(/matrix\(([^)]+)\)/);if(l){const d=l[1].split(",").map(Number);a=Math.round(d[4])||0,s=Math.round(d[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=a,e.valTextPosX.value=a,e.textPanel.classList.remove("hidden")}function T(){f&&f.classList.remove("active-text-editing"),f=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function j(){u&&(u.dataset.cropZoom=e.cropZoom.value,u.dataset.cropX=e.cropX.value,u.dataset.cropY=e.cropY.value,k(u),g())}function k(n){const o=Math.max(1,(n.dataset.cropZoom||100)/100),i=parseFloat(n.dataset.cropX||0),r=parseFloat(n.dataset.cropY||0),a=50+i/2,s=50+r/2;n.style.setProperty("width","100%","important"),n.style.setProperty("height","100%","important"),n.style.setProperty("object-fit","cover","important"),n.style.setProperty("object-position",`${a}% ${s}%`,"important"),n.style.setProperty("transform-origin",`${a}% ${s}%`,"important"),n.style.setProperty("transform",`scale(${o})`,"important"),n.parentElement&&(n.parentElement.style.overflow="hidden")}function g(){const n=e.currentSlideHost.shadowRoot;if(!n)return;const o=n.querySelector(".slide-frame");o&&(c.slides[c.currentIndex].content=o.innerHTML,q(c.currentIndex))}function U(){A(),x(0),_(),H(),window.addEventListener("resize",H)}function x(n){c.currentIndex=n,v.render(n),document.querySelectorAll(".thumb-item").forEach((o,i)=>{o.classList.toggle("active",i===n)}),document.getElementById("current-index").textContent=n+1}function M(n){const o=document.createElement("div");return o.className="drop-zone",o.dataset.gapIndex=n,o.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",C(n)}),o.addEventListener("dragleave",()=>{o.classList.remove("active")}),o.addEventListener("drop",i=>{i.preventDefault(),$(n)}),o}function A(){e.slideList.innerHTML="",c.slides.forEach((n,o)=>{e.slideList.appendChild(M(o));const i=document.createElement("div");i.className="thumb-item",i.draggable=!0,i.onclick=()=>x(o),i.addEventListener("dragstart",t=>{p=o,i.classList.add("dragging"),t.dataTransfer.effectAllowed="move"}),i.addEventListener("dragover",t=>{if(t.preventDefault(),t.dataTransfer.dropEffect="move",p===null||p===o)return;const l=i.getBoundingClientRect(),d=(t.clientY-l.top)/l.height;d<.25?C(o):d>.75?C(o+1):b()}),i.addEventListener("dragleave",()=>{}),i.addEventListener("drop",t=>{t.preventDefault(),P!==null?$(P):b()}),i.addEventListener("dragend",()=>{i.classList.remove("dragging"),b(),I(),p=null});const r=document.createElement("div");r.className="thumb-preview";const a=r.attachShadow({mode:"open"});let s=c.globalStyles+(n.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),a.innerHTML=`
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
      <div class="slide-frame">${n.content}</div>
    `,i.appendChild(r),e.slideList.appendChild(i)}),e.slideList.appendChild(M(c.slides.length)),setTimeout(X,0),document.getElementById("total-slides").textContent=c.slides.length}function q(n){const o=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(o[n]){const r=o[n].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");r&&(r.innerHTML=c.slides[n].content)}}function _(){const n=e.slideList.closest(".sidebar");n.addEventListener("dragover",t=>{p!==null&&D(t.clientY,n)}),n.addEventListener("dragleave",t=>{n.contains(t.relatedTarget)||I()}),n.addEventListener("drop",()=>I()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(F(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",t=>{const l=t.target.files[0];if(l){const d=new FileReader;d.onload=m=>F(m.target.result),d.readAsText(l)}}),[e.cropZoom,e.cropX,e.cropY].forEach(t=>{t.addEventListener("input",j)}),e.btnCloseImagePanel.addEventListener("click",B),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",t=>{const l=t.target.files[0];if(l&&u){const d=new FileReader;d.onload=m=>{u.src=m.target.result,g(),t.target.value=""},d.readAsDataURL(l)}}),e.btnTextBold.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("bold"),g()}),e.btnTextItalic.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("italic"),g()}),e.btnTextUnderline.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("underline"),g()}),e.colorSwatches.forEach(t=>{t.addEventListener("mousedown",l=>{l.preventDefault();const d=t.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,d),g()})});function o(t){document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontSize",!1,"7");const l=v.shadow.querySelector(".slide-frame");l&&(l.querySelectorAll("span").forEach(d=>{const m=d.style.fontSize;m&&(m.includes("xxx-large")||m==="-webkit-xxx-large")&&(d.style.fontSize=t+"px")}),l.querySelectorAll('font[size="7"]').forEach(d=>{const m=document.createElement("span");m.style.fontSize=t+"px",m.innerHTML=d.innerHTML,d.replaceWith(m)})),g()}e.inputSelFontSize.addEventListener("mousedown",t=>t.preventDefault()),e.inputSelFontSize.addEventListener("input",t=>{e.valSelFontSize.value=t.target.value,o(t.target.value)});let i=null;e.valSelFontSize.addEventListener("focus",()=>{const t=typeof v.shadow.getSelection=="function"?v.shadow.getSelection():document.getSelection();t&&t.rangeCount>0&&!t.isCollapsed&&(i=t.getRangeAt(0).cloneRange())}),e.valSelFontSize.addEventListener("change",t=>{const l=parseInt(t.target.value)||16;if(t.target.value=l,e.inputSelFontSize.value=l,i){const d=v.shadow.querySelector(".slide-frame");d&&d.focus();const m=typeof v.shadow.getSelection=="function"?v.shadow.getSelection():document.getSelection();m.removeAllRanges(),m.addRange(i),i=null,o(l)}});function r(t,l,d){t.addEventListener("input",m=>{l.value=m.target.value,d(m.target.value)}),l.addEventListener("input",m=>{t.value=m.target.value,d(m.target.value)})}r(e.inputTextFontSize,e.valFontSize,t=>{f&&(f.style.fontSize=t+"px",g())}),r(e.inputTextLineHeight,e.valLineHeight,t=>{f&&(f.style.lineHeight=t,g())});function a(){if(!f)return;const t=e.inputTextPosY.value||0,l=e.inputTextPosX.value||0;f.style.transform=`translate(${l}px, ${t}px)`,g()}r(e.inputTextPosY,e.valTextPosY,()=>a()),r(e.inputTextPosX,e.valTextPosX,()=>a()),e.btnCloseTextPanel.addEventListener("click",T),r(e.inputImgWidth,e.valImgWidth,t=>{!u||!u.parentElement||(u.parentElement.style.width=t+"%",g())}),r(e.inputImgHeight,e.valImgHeight,t=>{!u||!u.parentElement||(u.parentElement.style.height=t+"%",g())});function s(){if(!u||!u.parentElement)return;const t=e.inputImgPosY.value||0,l=e.inputImgPosX.value||0;u.parentElement.style.transform=`translate(${l}px, ${t}px)`,g()}r(e.inputImgPosY,e.valImgPosY,()=>s()),r(e.inputImgPosX,e.valImgPosX,()=>s()),document.querySelectorAll(".btn-reset").forEach(t=>{t.addEventListener("click",l=>{l.preventDefault();const d=t.dataset.slider,m=t.dataset.val,w=t.dataset.default,h=document.getElementById(d);if(h&&(h.value=w,h.dispatchEvent(new Event("input",{bubbles:!0}))),m){const L=document.getElementById(m);L&&(L.value=w)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{J(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(t=>{t.addEventListener("click",()=>{e.printLayoutCards.forEach(l=>l.classList.remove("active")),t.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const t=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),G(parseInt(t.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",t=>{t.target.isContentEditable||t.composedPath().some(d=>d.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||((t.key==="ArrowDown"||t.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&x(c.currentIndex+1),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&c.currentIndex>0&&x(c.currentIndex-1))})}function F(n){const i=new DOMParser().parseFromString(n,"text/html");c.globalStyles=Array.from(i.querySelectorAll("style")).map(a=>a.textContent).join(`
`);const r=i.querySelectorAll("section").length?Array.from(i.querySelectorAll("section")):i.querySelectorAll(".slide").length?Array.from(i.querySelectorAll(".slide")):[i.body];c.slides=r.map((a,s)=>({id:`imported-${s}`,content:a===i.body?a.innerHTML:a.outerHTML,css:""})),A(),x(0)}function H(){const n=document.querySelector(".editor-viewport"),o=e.editorContainer;if(!n||!o)return;const i=80,r=Math.min((n.clientWidth-i)/1122.52,(n.clientHeight-i)/793.7);o.style.transform=`scale(${Math.max(r,.1)}) translate(-50%, -50%)`,o.style.left="50%",o.style.top="50%",o.style.position="absolute"}function G(n=1){const o=e.printFrame,i=o.contentWindow.document,r={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},a=r[n]||r[1],s=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),t=97,l=68.6,d=3,m=((210-(t*2+d))/2).toFixed(1),w=(t/297).toFixed(6);let h="";if(n===1)h=c.slides.map(S=>`<div class="print-page">${S.content}</div>`).join("");else{const S=[];for(let y=0;y<c.slides.length;y+=n)S.push(c.slides.slice(y,y+n));h=S.map(y=>`<div class="handout-page">${y.map(Y=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${w}">${Y.content}</div></div>`).join("")}</div>`).join("")}const L=`
    @page { size: A4 ${a.orientation}; margin: 0; }
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
      grid-template-columns: repeat(${a.cols}, ${t}mm);
      grid-template-rows: repeat(${a.rows}, ${l}mm);
      column-gap: ${d}mm;
      padding: 0 ${m}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${t}mm; height: ${l}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${s}
  `;i.open(),i.write(`<html><head><style>${L}</style></head><body>${h}</body></html>`),i.close(),setTimeout(()=>{o.contentWindow.focus(),o.contentWindow.print()},500)}function J(n){let o=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const i=c.slides.map((l,d)=>`<div class="slide-a4-container" id="slide-${d}"><div class="slide-frame">${l.content}</div></div>`).join(`
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
    </style>`);const a=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${o} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${i}</div>${r}</body></html>`,s=new Blob([a],{type:"text/html"}),t=document.createElement("a");t.href=URL.createObjectURL(s),t.download="presentation.html",t.click()}U();
