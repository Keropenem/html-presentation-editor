(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&r(t)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();const c={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),inputSelFontSize:document.getElementById("input-sel-fontsize"),valSelFontSize:document.getElementById("val-sel-fontsize"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let u=null,g=null,p=null,C=null,L=null;function I(){document.querySelectorAll(".drop-zone").forEach(o=>{o.classList.remove("active")}),C=null}const M=10,D=.3;function O(o,n){S();const i=n.getBoundingClientRect(),r=i.height*D,l=o-i.top,s=i.bottom-o;let t=0;if(l<r?t=-M*(1-l/r):s<r&&(t=M*(1-s/r)),t===0)return;function a(){e.slideList.scrollTop+=t,L=requestAnimationFrame(a)}L=requestAnimationFrame(a)}function S(){L!==null&&(cancelAnimationFrame(L),L=null)}function T(o){if(p===null||o===p||o===p+1)return;I();const n=e.slideList.querySelector(`.drop-zone[data-gap-index="${o}"]`);n&&(n.classList.add("active"),C=o)}function W(o){if(p===null)return;if(o===p||o===p+1){I();return}let n=o;p<n&&n--;const i=c.slides[c.currentIndex].id,[r]=c.slides.splice(p,1);c.slides.splice(n,0,r);const l=c.slides.findIndex(s=>s.id===i);c.currentIndex=l>=0?l:0,I(),S(),p=null,z(),w(c.currentIndex)}class N{constructor(n){this.host=n,this.shadow=this.host.attachShadow({mode:"open"})}render(n){const i=c.slides[n];if(!i)return;this.shadow.innerHTML="";const r=document.createElement("style");let l=c.globalStyles+(i.css||"");l=l.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),l=l.replace(/:root/g,":host"),l=l.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),l=l.replace(/html(?=\s|\{|,)/gi,":host"),r.textContent=`
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

      ${l}
    `,this.shadow.appendChild(r);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=i.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(a=>{(a.dataset.cropZoom||a.dataset.cropX||a.dataset.cropY)&&A(a),a.parentElement&&(a.parentElement.style.overflow="hidden")}),s.addEventListener("input",()=>{c.slides[n].content=s.innerHTML,R(n)}),s.addEventListener("click",a=>{a.target.tagName==="IMG"?(F(),j(a.target)):a.target!==s?(k(),U(a.target)):(k(),F())});const t=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const a=typeof t.getSelection=="function"?t.getSelection():document.getSelection();a&&!a.isCollapsed&&a.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const E=new N(e.currentSlideHost);function q(){const o=e.slideList.clientWidth;if(o<=0)return;const i=(o-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(r=>{r.style.setProperty("--thumb-scale",i)})}const Z=new ResizeObserver(()=>{q()});Z.observe(e.slideList);function j(o){u&&u.classList.remove("active-editing"),u=o,u.classList.add("active-editing"),e.cropZoom.value=o.dataset.cropZoom||100,e.cropX.value=o.dataset.cropX||0,e.cropY.value=o.dataset.cropY||0,A(o);const n=o.parentElement;if(n){n.dataset.origW||(n.dataset.origW=n.offsetWidth,n.dataset.origH=n.offsetHeight,n.style.width=n.offsetWidth+"px",n.style.height=n.offsetHeight+"px");const i=parseFloat(n.dataset.origW),r=parseFloat(n.dataset.origH),l=parseFloat(n.style.width)||i,s=parseFloat(n.style.height)||r,t=Math.round(l/i*100),a=Math.round(s/r*100);e.inputImgWidth.value=t,e.valImgWidth.value=t,e.inputImgHeight.value=a,e.valImgHeight.value=a;const d=(i-l)/2,m=(r-s)/2;let y=0,f=0;const b=window.getComputedStyle(n).transform;if(b&&b!=="none"){const P=b.match(/matrix\(([^)]+)\)/);if(P){const H=P[1].split(",").map(Number);y=H[4]||0,f=H[5]||0}}const h=Math.round(y-d),B=Math.round(f-m);e.inputImgPosY.value=B,e.valImgPosY.value=B,e.inputImgPosX.value=h,e.valImgPosX.value=h}e.imagePanel.classList.remove("hidden")}function k(){u&&u.classList.remove("active-editing"),u=null,e.imagePanel.classList.add("hidden")}function U(o){g&&g.classList.remove("active-text-editing"),g=o,g.classList.add("active-text-editing");const n=window.getComputedStyle(o),i=Math.round(parseFloat(n.fontSize));e.inputTextFontSize.value=i,e.valFontSize.value=i;const r=parseFloat(n.lineHeight)/parseFloat(n.fontSize)||1.5;e.inputTextLineHeight.value=r.toFixed(1),e.valLineHeight.value=r.toFixed(1);let l=0,s=0;const t=n.transform;if(t&&t!=="none"){const a=t.match(/matrix\(([^)]+)\)/);if(a){const d=a[1].split(",").map(Number);l=Math.round(d[4])||0,s=Math.round(d[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=l,e.valTextPosX.value=l,e.textPanel.classList.remove("hidden")}function F(){g&&g.classList.remove("active-text-editing"),g=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){u&&(u.dataset.cropZoom=e.cropZoom.value,u.dataset.cropX=e.cropX.value,u.dataset.cropY=e.cropY.value,A(u),v())}function A(o){const n=Math.max(1,(o.dataset.cropZoom||100)/100),i=parseFloat(o.dataset.cropX||0),r=parseFloat(o.dataset.cropY||0),l=50+i/2,s=50+r/2;o.style.setProperty("width","100%","important"),o.style.setProperty("height","100%","important"),o.style.setProperty("object-fit","cover","important"),o.style.setProperty("object-position",`${l}% ${s}%`,"important"),o.style.setProperty("transform-origin",`${l}% ${s}%`,"important"),o.style.setProperty("transform",`scale(${n})`,"important"),o.parentElement&&(o.parentElement.style.overflow="hidden")}function v(){const o=e.currentSlideHost.shadowRoot;if(!o)return;const n=o.querySelector(".slide-frame");n&&(c.slides[c.currentIndex].content=n.innerHTML,R(c.currentIndex))}function G(){z(),w(0),J(),Y(),window.addEventListener("resize",Y)}function w(o){c.currentIndex=o,E.render(o),document.querySelectorAll(".thumb-item").forEach((n,i)=>{n.classList.toggle("active",i===o)}),document.getElementById("current-index").textContent=o+1}function $(o){const n=document.createElement("div");return n.className="drop-zone",n.dataset.gapIndex=o,n.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",T(o)}),n.addEventListener("dragleave",()=>{n.classList.remove("active")}),n.addEventListener("drop",i=>{i.preventDefault(),W(o)}),n}function z(){e.slideList.innerHTML="",c.slides.forEach((o,n)=>{e.slideList.appendChild($(n));const i=document.createElement("div");i.className="thumb-item",i.draggable=!0,i.onclick=()=>w(n),i.addEventListener("dragstart",t=>{p=n,i.classList.add("dragging"),t.dataTransfer.effectAllowed="move"}),i.addEventListener("dragover",t=>{if(t.preventDefault(),t.dataTransfer.dropEffect="move",p===null||p===n)return;const a=i.getBoundingClientRect(),d=(t.clientY-a.top)/a.height;d<.25?T(n):d>.75?T(n+1):I()}),i.addEventListener("dragleave",()=>{}),i.addEventListener("drop",t=>{t.preventDefault(),C!==null?W(C):I()}),i.addEventListener("dragend",()=>{i.classList.remove("dragging"),I(),S(),p=null});const r=document.createElement("div");r.className="thumb-preview";const l=r.attachShadow({mode:"open"});let s=c.globalStyles+(o.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),l.innerHTML=`
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
      <div class="slide-frame">${o.content}</div>
    `,i.appendChild(r),e.slideList.appendChild(i)}),e.slideList.appendChild($(c.slides.length)),setTimeout(q,0),document.getElementById("total-slides").textContent=c.slides.length}function R(o){const n=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(n[o]){const r=n[o].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");r&&(r.innerHTML=c.slides[o].content)}}function J(){const o=e.slideList.closest(".sidebar");o.addEventListener("dragover",t=>{p!==null&&O(t.clientY,o)}),o.addEventListener("dragleave",t=>{o.contains(t.relatedTarget)||S()}),o.addEventListener("drop",()=>S()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(X(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",t=>{const a=t.target.files[0];if(a){const d=new FileReader;d.onload=m=>X(m.target.result),d.readAsText(a)}}),[e.cropZoom,e.cropX,e.cropY].forEach(t=>{t.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",k),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",t=>{const a=t.target.files[0];if(a&&u){const d=new FileReader;d.onload=m=>{u.src=m.target.result,v(),t.target.value=""},d.readAsDataURL(a)}}),e.btnTextBold.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("bold"),v()}),e.btnTextItalic.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("italic"),v()}),e.btnTextUnderline.addEventListener("mousedown",t=>{t.preventDefault(),document.execCommand("underline"),v()}),e.colorSwatches.forEach(t=>{t.addEventListener("mousedown",a=>{a.preventDefault();const d=t.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,d),v()})});function n(t){document.execCommand("styleWithCSS",!1,!0),document.execCommand("fontSize",!1,"7");const a=E.shadow.querySelector(".slide-frame");a&&(a.querySelectorAll("span").forEach(d=>{const m=d.style.fontSize;m&&(m.includes("xxx-large")||m==="-webkit-xxx-large")&&(d.style.fontSize=t+"px")}),a.querySelectorAll('font[size="7"]').forEach(d=>{const m=document.createElement("span");m.style.fontSize=t+"px",m.innerHTML=d.innerHTML,d.replaceWith(m)})),v()}e.inputSelFontSize.addEventListener("mousedown",t=>t.preventDefault()),e.inputSelFontSize.addEventListener("input",t=>{e.valSelFontSize.value=t.target.value,n(t.target.value)});let i=null;e.valSelFontSize.addEventListener("focus",()=>{const t=typeof E.shadow.getSelection=="function"?E.shadow.getSelection():document.getSelection();t&&t.rangeCount>0&&!t.isCollapsed&&(i=t.getRangeAt(0).cloneRange())}),e.valSelFontSize.addEventListener("change",t=>{const a=parseInt(t.target.value)||16;if(t.target.value=a,e.inputSelFontSize.value=a,i){const d=E.shadow.querySelector(".slide-frame");d&&d.focus();const m=typeof E.shadow.getSelection=="function"?E.shadow.getSelection():document.getSelection();m.removeAllRanges(),m.addRange(i),i=null,n(a)}});function r(t,a,d){t.addEventListener("input",m=>{a.value=m.target.value,d(m.target.value)}),a.addEventListener("input",m=>{t.value=m.target.value,d(m.target.value)})}r(e.inputTextFontSize,e.valFontSize,t=>{g&&(g.style.fontSize=t+"px",v())}),r(e.inputTextLineHeight,e.valLineHeight,t=>{g&&(g.style.lineHeight=t,v())});function l(){if(!g)return;const t=e.inputTextPosY.value||0,a=e.inputTextPosX.value||0;g.style.transform=`translate(${a}px, ${t}px)`,v()}r(e.inputTextPosY,e.valTextPosY,()=>l()),r(e.inputTextPosX,e.valTextPosX,()=>l()),e.btnCloseTextPanel.addEventListener("click",F);function s(){if(!u||!u.parentElement)return;const t=u.parentElement,a=parseFloat(t.dataset.origW),d=parseFloat(t.dataset.origH);if(!a||!d)return;const m=a*parseFloat(e.inputImgWidth.value)/100,y=d*parseFloat(e.inputImgHeight.value)/100;t.style.width=m+"px",t.style.height=y+"px";const f=(a-m)/2,x=(d-y)/2,b=parseFloat(e.inputImgPosX.value)||0,h=parseFloat(e.inputImgPosY.value)||0;t.style.transform=`translate(${b+f}px, ${h+x}px)`,v()}r(e.inputImgWidth,e.valImgWidth,()=>s()),r(e.inputImgHeight,e.valImgHeight,()=>s()),r(e.inputImgPosY,e.valImgPosY,()=>s()),r(e.inputImgPosX,e.valImgPosX,()=>s()),document.querySelectorAll(".btn-reset").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();const d=t.dataset.slider,m=t.dataset.val,y=t.dataset.default,f=document.getElementById(d);if(f&&(f.value=y,f.dispatchEvent(new Event("input",{bubbles:!0}))),m){const x=document.getElementById(m);x&&(x.value=y)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(t=>{t.addEventListener("click",()=>{e.printLayoutCards.forEach(a=>a.classList.remove("active")),t.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const t=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(t.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",t=>{t.target.isContentEditable||t.composedPath().some(d=>d.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||((t.key==="ArrowDown"||t.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&w(c.currentIndex+1),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&c.currentIndex>0&&w(c.currentIndex-1))})}function X(o){const i=new DOMParser().parseFromString(o,"text/html");c.globalStyles=Array.from(i.querySelectorAll("style")).map(l=>l.textContent).join(`
`);const r=i.querySelectorAll("section").length?Array.from(i.querySelectorAll("section")):i.querySelectorAll(".slide").length?Array.from(i.querySelectorAll(".slide")):[i.body];c.slides=r.map((l,s)=>({id:`imported-${s}`,content:l===i.body?l.innerHTML:l.outerHTML,css:""})),z(),w(0)}function Y(){const o=document.querySelector(".editor-viewport"),n=e.editorContainer;if(!o||!n)return;const i=80,r=Math.min((o.clientWidth-i)/1122.52,(o.clientHeight-i)/793.7);n.style.transform=`scale(${Math.max(r,.1)}) translate(-50%, -50%)`,n.style.left="50%",n.style.top="50%",n.style.position="absolute"}function K(o=1){const n=e.printFrame,i=n.contentWindow.document,r={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},l=r[o]||r[1],s=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),t=97,a=68.6,d=3,m=((210-(t*2+d))/2).toFixed(1),y=(t/297).toFixed(6);let f="";if(o===1)f=c.slides.map(b=>`<div class="print-page">${b.content}</div>`).join("");else{const b=[];for(let h=0;h<c.slides.length;h+=o)b.push(c.slides.slice(h,h+o));f=b.map(h=>`<div class="handout-page">${h.map(P=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${y}">${P.content}</div></div>`).join("")}</div>`).join("")}const x=`
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
      grid-template-columns: repeat(${l.cols}, ${t}mm);
      grid-template-rows: repeat(${l.rows}, ${a}mm);
      column-gap: ${d}mm;
      padding: 0 ${m}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${t}mm; height: ${a}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${s}
  `;i.open(),i.write(`<html><head><style>${x}</style></head><body>${f}</body></html>`),i.close(),setTimeout(()=>{n.contentWindow.focus(),n.contentWindow.print()},500)}function V(o){let n=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const i=c.slides.map((a,d)=>`<div class="slide-a4-container" id="slide-${d}"><div class="slide-frame">${a.content}</div></div>`).join(`
`);let r="";o&&(r=`
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
    </style>`);const l=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${n} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${i}</div>${r}</body></html>`,s=new Blob([l],{type:"text/html"}),t=document.createElement("a");t.href=URL.createObjectURL(s),t.download="presentation.html",t.click()}G();
