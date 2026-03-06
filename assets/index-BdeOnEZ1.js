(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const c={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let d=null,u=null,p=null,S=null,E=null;function v(){document.querySelectorAll(".drop-zone").forEach(n=>{n.classList.remove("active")}),S=null}const M=10,D=.3;function R(n,t){I();const s=t.getBoundingClientRect(),o=s.height*D,i=n-s.top,a=s.bottom-n;let l=0;if(i<o?l=-M*(1-i/o):a<o&&(l=M*(1-a/o)),l===0)return;function r(){e.slideList.scrollTop+=l,E=requestAnimationFrame(r)}E=requestAnimationFrame(r)}function I(){E!==null&&(cancelAnimationFrame(E),E=null)}function B(n){if(p===null||n===p||n===p+1)return;v();const t=e.slideList.querySelector(`.drop-zone[data-gap-index="${n}"]`);t&&(t.classList.add("active"),S=n)}function z(n){if(p===null)return;if(n===p||n===p+1){v();return}let t=n;p<t&&t--;const s=c.slides[c.currentIndex].id,[o]=c.slides.splice(p,1);c.slides.splice(t,0,o);const i=c.slides.findIndex(a=>a.id===s);c.currentIndex=i>=0?i:0,v(),I(),p=null,H(),b(c.currentIndex)}class q{constructor(t){this.host=t,this.shadow=this.host.attachShadow({mode:"open"})}render(t){const s=c.slides[t];if(!s)return;this.shadow.innerHTML="";const o=document.createElement("style");let i=c.globalStyles+(s.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),o.textContent=`
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
    `,this.shadow.appendChild(o);const a=document.createElement("div");a.className="slide-frame",a.innerHTML=s.content,a.contentEditable=!0,a.style.outline="none",this.shadow.appendChild(a),a.querySelectorAll("img").forEach(r=>{(r.dataset.cropZoom||r.dataset.cropX||r.dataset.cropY)&&k(r);const m=r.parentElement;m&&(m.dataset.frameW||(r.style.setProperty("width","100%","important"),r.style.setProperty("height","100%","important"),m.style.overflow="hidden"))}),a.addEventListener("input",()=>{c.slides[t].content=a.innerHTML,Y(t)}),a.addEventListener("click",r=>{r.target.tagName==="IMG"?(C(),j(r.target)):r.target!==a?(T(),U(r.target)):(T(),C())});const l=this.shadow;a.addEventListener("mouseup",()=>{setTimeout(()=>{const r=typeof l.getSelection=="function"?l.getSelection():document.getSelection();r&&!r.isCollapsed&&r.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const O=new q(e.currentSlideHost);function X(){const n=e.slideList.clientWidth;if(n<=0)return;const s=(n-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(o=>{o.style.setProperty("--thumb-scale",s)})}const N=new ResizeObserver(()=>{X()});N.observe(e.slideList);const Z="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(n){d&&(d.classList.remove("active-editing"),d.parentElement&&(d.parentElement.style.filter="")),d=n,d.classList.add("active-editing"),e.cropZoom.value=n.dataset.cropZoom||100,e.cropX.value=n.dataset.cropX||0,e.cropY.value=n.dataset.cropY||0,k(n);const t=n.parentElement;if(t){if(!t.dataset.origH){const m=t.style.height,g=t.style.width;t.style.height="",t.style.width="",t.style.maxWidth="",t.style.marginLeft="",t.style.marginRight="",t.dataset.origH=t.offsetHeight,t.dataset.origW=t.offsetWidth,t.style.height=m,t.style.width=g}const s=parseFloat(t.dataset.frameW)||100,o=parseFloat(t.dataset.frameH)||100;e.inputImgWidth.value=s,e.valImgWidth.value=s,e.inputImgHeight.value=o,e.valImgHeight.value=o;let i=0,a=0;const r=window.getComputedStyle(t).transform;if(r&&r!=="none"){const m=r.match(/matrix\(([^)]+)\)/);if(m){const g=m[1].split(",").map(Number);i=Math.round(g[4])||0,a=Math.round(g[5])||0}}e.inputImgPosY.value=a,e.valImgPosY.value=a,e.inputImgPosX.value=i,e.valImgPosX.value=i,x()}e.imagePanel.classList.remove("hidden")}function T(){d&&(d.classList.remove("active-editing"),d.style.removeProperty("filter"),d.parentElement&&(d.parentElement.style.filter="")),d=null,e.imagePanel.classList.add("hidden")}function U(n){u&&u.classList.remove("active-text-editing"),u=n,u.classList.add("active-text-editing");const t=window.getComputedStyle(n),s=Math.round(parseFloat(t.fontSize));e.inputTextFontSize.value=s,e.valFontSize.value=s;const o=parseFloat(t.lineHeight)/parseFloat(t.fontSize)||1.5;e.inputTextLineHeight.value=o.toFixed(1),e.valLineHeight.value=o.toFixed(1);let i=0,a=0;const l=t.transform;if(l&&l!=="none"){const r=l.match(/matrix\(([^)]+)\)/);if(r){const m=r[1].split(",").map(Number);i=Math.round(m[4])||0,a=Math.round(m[5])||0}}e.inputTextPosY.value=a,e.valTextPosY.value=a,e.inputTextPosX.value=i,e.valTextPosX.value=i,e.textPanel.classList.remove("hidden")}function C(){u&&u.classList.remove("active-text-editing"),u=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){d&&(d.dataset.cropZoom=e.cropZoom.value,d.dataset.cropX=e.cropX.value,d.dataset.cropY=e.cropY.value,k(d),f())}function k(n){const t=Math.max(1,(n.dataset.cropZoom||100)/100),s=parseFloat(n.dataset.cropX||0),o=parseFloat(n.dataset.cropY||0),i=50+s/2,a=50+o/2;n.style.setProperty("object-fit","cover","important"),n.style.setProperty("object-position",`${i}% ${a}%`,"important"),n.style.setProperty("transform-origin",`${i}% ${a}%`,"important"),n.style.setProperty("transform",`scale(${t})`,"important")}function x(){if(!d||!d.parentElement)return;const n=d.parentElement,t=parseFloat(e.inputImgWidth.value),s=parseFloat(e.inputImgHeight.value),o=parseFloat(n.dataset.origH)||n.offsetHeight;n.dataset.frameW=t,n.dataset.frameH=s;const i=t>100||s>100;n.style.filter="",d.style.removeProperty("filter"),n.style.width="",n.style.maxWidth="",n.style.height="",n.style.marginLeft="",n.style.marginRight="",n.style.marginBottom="";const a=Math.max(t,100),l=Math.max(s,100);d.style.setProperty("width",a+"%","important"),d.style.setProperty("height",l+"%","important");const r=s<100?(100-s)/2:0,m=s<100?(100-s)/2:-(s-100),g=t<100?(100-t)/2:-(t-100)/2,L=t<100?(100-t)/2:-(t-100)/2;n.style.overflow=i?"visible":"hidden",r||m||g||L?n.style.clipPath=`inset(${r}% ${L}% ${m}% ${g}%)`:n.style.clipPath="",d.style.removeProperty("clip-path"),i?(d.style.setProperty("position","relative","important"),d.style.setProperty("left",t>100?`${-(a-100)/2}%`:"0","important"),d.style.setProperty("top","0","important"),s>100&&(n.style.marginBottom=o*(s-100)/100+"px")):(d.style.removeProperty("position"),d.style.removeProperty("left"),d.style.removeProperty("top"));const h=parseFloat(e.inputImgPosX.value)||0,w=parseFloat(e.inputImgPosY.value)||0;n.style.transform=h||w?`translate(${h}px, ${w}px)`:"",f(),n.style.filter=Z}function f(){const n=e.currentSlideHost.shadowRoot;if(!n)return;const t=n.querySelector(".slide-frame");t&&(c.slides[c.currentIndex].content=t.innerHTML,Y(c.currentIndex))}function G(){H(),b(0),J(),F(),window.addEventListener("resize",F)}function b(n){c.currentIndex=n,O.render(n),document.querySelectorAll(".thumb-item").forEach((t,s)=>{t.classList.toggle("active",s===n)}),document.getElementById("current-index").textContent=n+1}function A(n){const t=document.createElement("div");return t.className="drop-zone",t.dataset.gapIndex=n,t.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move",B(n)}),t.addEventListener("dragleave",()=>{t.classList.remove("active")}),t.addEventListener("drop",s=>{s.preventDefault(),z(n)}),t}function H(){e.slideList.innerHTML="",c.slides.forEach((n,t)=>{e.slideList.appendChild(A(t));const s=document.createElement("div");s.className="thumb-item",s.draggable=!0,s.onclick=()=>b(t),s.addEventListener("dragstart",l=>{p=t,s.classList.add("dragging"),l.dataTransfer.effectAllowed="move"}),s.addEventListener("dragover",l=>{if(l.preventDefault(),l.dataTransfer.dropEffect="move",p===null||p===t)return;const r=s.getBoundingClientRect(),m=(l.clientY-r.top)/r.height;m<.25?B(t):m>.75?B(t+1):v()}),s.addEventListener("dragleave",()=>{}),s.addEventListener("drop",l=>{l.preventDefault(),S!==null?z(S):v()}),s.addEventListener("dragend",()=>{s.classList.remove("dragging"),v(),I(),p=null});const o=document.createElement("div");o.className="thumb-preview";const i=o.attachShadow({mode:"open"});let a=c.globalStyles+(n.css||"");a=a.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),a=a.replace(/:root/g,":host"),a=a.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),a=a.replace(/html(?=\s|\{|,)/gi,":host"),i.innerHTML=`
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
    `,s.appendChild(o),e.slideList.appendChild(s)}),e.slideList.appendChild(A(c.slides.length)),setTimeout(X,0),document.getElementById("total-slides").textContent=c.slides.length}function Y(n){const t=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(t[n]){const o=t[n].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");o&&(o.innerHTML=c.slides[n].content)}}function J(){const n=e.slideList.closest(".sidebar");n.addEventListener("dragover",o=>{p!==null&&R(o.clientY,n)}),n.addEventListener("dragleave",o=>{n.contains(o.relatedTarget)||I()}),n.addEventListener("drop",()=>I()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&($(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",o=>{const i=o.target.files[0];if(i){const a=new FileReader;a.onload=l=>$(l.target.result),a.readAsText(i)}}),[e.cropZoom,e.cropX,e.cropY].forEach(o=>{o.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",T),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",o=>{const i=o.target.files[0];if(i&&d){const a=new FileReader;a.onload=l=>{d.src=l.target.result,f(),o.target.value=""},a.readAsDataURL(i)}}),e.btnTextBold.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("bold"),f()}),e.btnTextItalic.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("italic"),f()}),e.btnTextUnderline.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("underline"),f()}),e.colorSwatches.forEach(o=>{o.addEventListener("mousedown",i=>{i.preventDefault();const a=o.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,a),f()})});function t(o,i,a){o.addEventListener("input",l=>{i.value=l.target.value,a(l.target.value)}),i.addEventListener("input",l=>{o.value=l.target.value,a(l.target.value)})}t(e.inputTextFontSize,e.valFontSize,o=>{u&&(u.style.fontSize=o+"px",f())}),t(e.inputTextLineHeight,e.valLineHeight,o=>{u&&(u.style.lineHeight=o,f())});function s(){if(!u)return;const o=e.inputTextPosY.value||0,i=e.inputTextPosX.value||0;u.style.transform=`translate(${i}px, ${o}px)`,f()}t(e.inputTextPosY,e.valTextPosY,()=>s()),t(e.inputTextPosX,e.valTextPosX,()=>s()),e.btnCloseTextPanel.addEventListener("click",C),t(e.inputImgWidth,e.valImgWidth,()=>x()),t(e.inputImgHeight,e.valImgHeight,()=>x()),t(e.inputImgPosY,e.valImgPosY,()=>x()),t(e.inputImgPosX,e.valImgPosX,()=>x()),document.querySelectorAll(".btn-reset").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const a=o.dataset.slider,l=o.dataset.val,r=o.dataset.default,m=document.getElementById(a);if(m&&(m.value=r,m.dispatchEvent(new Event("input",{bubbles:!0}))),l){const g=document.getElementById(l);g&&(g.value=r)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(o=>{o.addEventListener("click",()=>{e.printLayoutCards.forEach(i=>i.classList.remove("active")),o.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const o=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(o.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",o=>{o.target.isContentEditable||o.composedPath().some(a=>a.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(o.target.tagName)||((o.key==="ArrowDown"||o.key==="ArrowRight")&&c.currentIndex<c.slides.length-1&&b(c.currentIndex+1),(o.key==="ArrowUp"||o.key==="ArrowLeft")&&c.currentIndex>0&&b(c.currentIndex-1))})}function $(n){const s=new DOMParser().parseFromString(n,"text/html");c.globalStyles=Array.from(s.querySelectorAll("style")).map(i=>i.textContent).join(`
`);const o=s.querySelectorAll("section").length?Array.from(s.querySelectorAll("section")):s.querySelectorAll(".slide").length?Array.from(s.querySelectorAll(".slide")):[s.body];c.slides=o.map((i,a)=>({id:`imported-${a}`,content:i===s.body?i.innerHTML:i.outerHTML,css:""})),H(),b(0)}function F(){const n=document.querySelector(".editor-viewport"),t=e.editorContainer;if(!n||!t)return;const s=80,o=Math.min((n.clientWidth-s)/1122.52,(n.clientHeight-s)/793.7);t.style.transform=`scale(${Math.max(o,.1)}) translate(-50%, -50%)`,t.style.left="50%",t.style.top="50%",t.style.position="absolute"}function K(n=1){const t=e.printFrame,s=t.contentWindow.document,o={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},i=o[n]||o[1],a=c.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),l=97,r=68.6,m=3,g=((210-(l*2+m))/2).toFixed(1),L=(l/297).toFixed(6);let h="";if(n===1)h=c.slides.map(P=>`<div class="print-page">${P.content}</div>`).join("");else{const P=[];for(let y=0;y<c.slides.length;y+=n)P.push(c.slides.slice(y,y+n));h=P.map(y=>`<div class="handout-page">${y.map(W=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${L}">${W.content}</div></div>`).join("")}</div>`).join("")}const w=`
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
      grid-template-columns: repeat(${i.cols}, ${l}mm);
      grid-template-rows: repeat(${i.rows}, ${r}mm);
      column-gap: ${m}mm;
      padding: 0 ${g}mm;
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
  `;s.open(),s.write(`<html><head><style>${w}</style></head><body>${h}</body></html>`),s.close(),setTimeout(()=>{t.contentWindow.focus(),t.contentWindow.print()},500)}function V(n){let t=c.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const s=c.slides.map((r,m)=>`<div class="slide-a4-container" id="slide-${m}"><div class="slide-frame">${r.content}</div></div>`).join(`
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
    </style>`);const i=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${t} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${s}</div>${o}</body></html>`,a=new Blob([i],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(a),l.download="presentation.html",l.click()}G();
