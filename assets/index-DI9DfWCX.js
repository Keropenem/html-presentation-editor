(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const d={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let m=null,u=null,p=null,L=null,x=null;function y(){document.querySelectorAll(".drop-zone").forEach(n=>{n.classList.remove("active")}),L=null}const H=10,D=.3;function R(n,t){E();const a=t.getBoundingClientRect(),o=a.height*D,i=n-a.top,s=a.bottom-n;let l=0;if(i<o?l=-H*(1-i/o):s<o&&(l=H*(1-s/o)),l===0)return;function r(){e.slideList.scrollTop+=l,x=requestAnimationFrame(r)}x=requestAnimationFrame(r)}function E(){x!==null&&(cancelAnimationFrame(x),x=null)}function S(n){if(p===null||n===p||n===p+1)return;y();const t=e.slideList.querySelector(`.drop-zone[data-gap-index="${n}"]`);t&&(t.classList.add("active"),L=n)}function $(n){if(p===null)return;if(n===p||n===p+1){y();return}let t=n;p<t&&t--;const a=d.slides[d.currentIndex].id,[o]=d.slides.splice(p,1);d.slides.splice(t,0,o);const i=d.slides.findIndex(s=>s.id===a);d.currentIndex=i>=0?i:0,y(),E(),p=null,k(),v(d.currentIndex)}class q{constructor(t){this.host=t,this.shadow=this.host.attachShadow({mode:"open"})}render(t){const a=d.slides[t];if(!a)return;this.shadow.innerHTML="";const o=document.createElement("style");let i=d.globalStyles+(a.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),o.textContent=`
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
    `,this.shadow.appendChild(o);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=a.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(r=>{(r.dataset.cropZoom||r.dataset.cropX||r.dataset.cropY)&&B(r);const c=r.parentElement;c&&(c.dataset.frameW||(r.style.setProperty("width","100%","important"),r.style.setProperty("height","100%","important"),c.style.overflow="hidden"))}),s.addEventListener("input",()=>{d.slides[t].content=s.innerHTML,W(t)}),s.addEventListener("click",r=>{r.target.tagName==="IMG"?(T(),j(r.target)):r.target!==s?(C(),U(r.target)):(C(),T())});const l=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const r=typeof l.getSelection=="function"?l.getSelection():document.getSelection();r&&!r.isCollapsed&&r.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const O=new q(e.currentSlideHost);function z(){const n=e.slideList.clientWidth;if(n<=0)return;const a=(n-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(o=>{o.style.setProperty("--thumb-scale",a)})}const N=new ResizeObserver(()=>{z()});N.observe(e.slideList);const Z="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(n){m&&(m.classList.remove("active-editing"),m.parentElement&&(m.parentElement.style.filter="")),m=n,m.classList.add("active-editing"),e.cropZoom.value=n.dataset.cropZoom||100,e.cropX.value=n.dataset.cropX||0,e.cropY.value=n.dataset.cropY||0,B(n);const t=n.parentElement;if(t){if(!t.dataset.origH){const c=t.style.height,g=t.style.width;t.style.height="",t.style.width="",t.style.maxWidth="",t.style.marginLeft="",t.style.marginRight="",t.dataset.origH=t.offsetHeight,t.dataset.origW=t.offsetWidth,t.style.height=c,t.style.width=g}const a=parseFloat(t.dataset.frameW)||100,o=parseFloat(t.dataset.frameH)||100;e.inputImgWidth.value=a,e.valImgWidth.value=a,e.inputImgHeight.value=o,e.valImgHeight.value=o;let i=0,s=0;const r=window.getComputedStyle(t).transform;if(r&&r!=="none"){const c=r.match(/matrix\(([^)]+)\)/);if(c){const g=c[1].split(",").map(Number);i=Math.round(g[4])||0,s=Math.round(g[5])||0}}e.inputImgPosY.value=s,e.valImgPosY.value=s,e.inputImgPosX.value=i,e.valImgPosX.value=i,b(),t.style.filter=Z}e.imagePanel.classList.remove("hidden")}function C(){m&&(m.classList.remove("active-editing"),m.parentElement&&(m.parentElement.style.filter="")),m=null,e.imagePanel.classList.add("hidden")}function U(n){u&&u.classList.remove("active-text-editing"),u=n,u.classList.add("active-text-editing");const t=window.getComputedStyle(n),a=Math.round(parseFloat(t.fontSize));e.inputTextFontSize.value=a,e.valFontSize.value=a;const o=parseFloat(t.lineHeight)/parseFloat(t.fontSize)||1.5;e.inputTextLineHeight.value=o.toFixed(1),e.valLineHeight.value=o.toFixed(1);let i=0,s=0;const l=t.transform;if(l&&l!=="none"){const r=l.match(/matrix\(([^)]+)\)/);if(r){const c=r[1].split(",").map(Number);i=Math.round(c[4])||0,s=Math.round(c[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=i,e.valTextPosX.value=i,e.textPanel.classList.remove("hidden")}function T(){u&&u.classList.remove("active-text-editing"),u=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){m&&(m.dataset.cropZoom=e.cropZoom.value,m.dataset.cropX=e.cropX.value,m.dataset.cropY=e.cropY.value,B(m),h())}function B(n){const t=Math.max(1,(n.dataset.cropZoom||100)/100),a=parseFloat(n.dataset.cropX||0),o=parseFloat(n.dataset.cropY||0),i=50+a/2,s=50+o/2;n.style.setProperty("object-fit","cover","important"),n.style.setProperty("object-position",`${i}% ${s}%`,"important"),n.style.setProperty("transform-origin",`${i}% ${s}%`,"important"),n.style.setProperty("transform",`scale(${t})`,"important")}function b(){if(!m||!m.parentElement)return;const n=m.parentElement,t=parseFloat(e.inputImgWidth.value),a=parseFloat(e.inputImgHeight.value),o=parseFloat(n.dataset.origH)||n.offsetHeight,i=parseFloat(n.dataset.origW)||n.offsetWidth;n.dataset.frameW=t,n.dataset.frameH=a,m.style.setProperty("width","100%","important"),m.style.setProperty("height","100%","important"),m.style.removeProperty("position"),m.style.removeProperty("left"),m.style.removeProperty("top"),n.style.overflow="hidden";const s=t<100?(100-t)/2:0,l=a<100?(100-a)/2:0;if(n.style.clipPath=s||l?`inset(${l}% ${s}%)`:"",t>100&&i){const g=i*t/100,I=g-i;n.style.width=g+"px",n.style.maxWidth="none",n.style.marginLeft=-I/2+"px",n.style.marginRight=-I/2+"px",a<=100&&(n.style.height=o+"px")}else n.style.width="",n.style.maxWidth="",n.style.marginLeft="",n.style.marginRight="";a>100&&o?(n.style.height=o*a/100+"px",t<=100&&(n.style.width=i+"px",n.style.maxWidth="none")):t<=100&&(n.style.height="");const r=parseFloat(e.inputImgPosX.value)||0,c=parseFloat(e.inputImgPosY.value)||0;n.style.transform=r||c?`translate(${r}px, ${c}px)`:"",h()}function h(){const n=e.currentSlideHost.shadowRoot;if(!n)return;const t=n.querySelector(".slide-frame");t&&(d.slides[d.currentIndex].content=t.innerHTML,W(d.currentIndex))}function G(){k(),v(0),J(),F(),window.addEventListener("resize",F)}function v(n){d.currentIndex=n,O.render(n),document.querySelectorAll(".thumb-item").forEach((t,a)=>{t.classList.toggle("active",a===n)}),document.getElementById("current-index").textContent=n+1}function A(n){const t=document.createElement("div");return t.className="drop-zone",t.dataset.gapIndex=n,t.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",S(n)}),t.addEventListener("dragleave",()=>{t.classList.remove("active")}),t.addEventListener("drop",a=>{a.preventDefault(),$(n)}),t}function k(){e.slideList.innerHTML="",d.slides.forEach((n,t)=>{e.slideList.appendChild(A(t));const a=document.createElement("div");a.className="thumb-item",a.draggable=!0,a.onclick=()=>v(t),a.addEventListener("dragstart",l=>{p=t,a.classList.add("dragging"),l.dataTransfer.effectAllowed="move"}),a.addEventListener("dragover",l=>{if(l.preventDefault(),l.dataTransfer.dropEffect="move",p===null||p===t)return;const r=a.getBoundingClientRect(),c=(l.clientY-r.top)/r.height;c<.25?S(t):c>.75?S(t+1):y()}),a.addEventListener("dragleave",()=>{}),a.addEventListener("drop",l=>{l.preventDefault(),L!==null?$(L):y()}),a.addEventListener("dragend",()=>{a.classList.remove("dragging"),y(),E(),p=null});const o=document.createElement("div");o.className="thumb-preview";const i=o.attachShadow({mode:"open"});let s=d.globalStyles+(n.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),i.innerHTML=`
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
    `,a.appendChild(o),e.slideList.appendChild(a)}),e.slideList.appendChild(A(d.slides.length)),setTimeout(z,0),document.getElementById("total-slides").textContent=d.slides.length}function W(n){const t=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(t[n]){const o=t[n].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");o&&(o.innerHTML=d.slides[n].content)}}function J(){const n=e.slideList.closest(".sidebar");n.addEventListener("dragover",o=>{p!==null&&R(o.clientY,n)}),n.addEventListener("dragleave",o=>{n.contains(o.relatedTarget)||E()}),n.addEventListener("drop",()=>E()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(M(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",o=>{const i=o.target.files[0];if(i){const s=new FileReader;s.onload=l=>M(l.target.result),s.readAsText(i)}}),[e.cropZoom,e.cropX,e.cropY].forEach(o=>{o.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",C),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",o=>{const i=o.target.files[0];if(i&&m){const s=new FileReader;s.onload=l=>{m.src=l.target.result,h(),o.target.value=""},s.readAsDataURL(i)}}),e.btnTextBold.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("bold"),h()}),e.btnTextItalic.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("italic"),h()}),e.btnTextUnderline.addEventListener("mousedown",o=>{o.preventDefault(),document.execCommand("underline"),h()}),e.colorSwatches.forEach(o=>{o.addEventListener("mousedown",i=>{i.preventDefault();const s=o.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,s),h()})});function t(o,i,s){o.addEventListener("input",l=>{i.value=l.target.value,s(l.target.value)}),i.addEventListener("input",l=>{o.value=l.target.value,s(l.target.value)})}t(e.inputTextFontSize,e.valFontSize,o=>{u&&(u.style.fontSize=o+"px",h())}),t(e.inputTextLineHeight,e.valLineHeight,o=>{u&&(u.style.lineHeight=o,h())});function a(){if(!u)return;const o=e.inputTextPosY.value||0,i=e.inputTextPosX.value||0;u.style.transform=`translate(${i}px, ${o}px)`,h()}t(e.inputTextPosY,e.valTextPosY,()=>a()),t(e.inputTextPosX,e.valTextPosX,()=>a()),e.btnCloseTextPanel.addEventListener("click",T),t(e.inputImgWidth,e.valImgWidth,()=>b()),t(e.inputImgHeight,e.valImgHeight,()=>b()),t(e.inputImgPosY,e.valImgPosY,()=>b()),t(e.inputImgPosX,e.valImgPosX,()=>b()),document.querySelectorAll(".btn-reset").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const s=o.dataset.slider,l=o.dataset.val,r=o.dataset.default,c=document.getElementById(s);if(c&&(c.value=r,c.dispatchEvent(new Event("input",{bubbles:!0}))),l){const g=document.getElementById(l);g&&(g.value=r)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(o=>{o.addEventListener("click",()=>{e.printLayoutCards.forEach(i=>i.classList.remove("active")),o.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const o=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(o.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",o=>{o.target.isContentEditable||o.composedPath().some(s=>s.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(o.target.tagName)||((o.key==="ArrowDown"||o.key==="ArrowRight")&&d.currentIndex<d.slides.length-1&&v(d.currentIndex+1),(o.key==="ArrowUp"||o.key==="ArrowLeft")&&d.currentIndex>0&&v(d.currentIndex-1))})}function M(n){const a=new DOMParser().parseFromString(n,"text/html");d.globalStyles=Array.from(a.querySelectorAll("style")).map(i=>i.textContent).join(`
`);const o=a.querySelectorAll("section").length?Array.from(a.querySelectorAll("section")):a.querySelectorAll(".slide").length?Array.from(a.querySelectorAll(".slide")):[a.body];d.slides=o.map((i,s)=>({id:`imported-${s}`,content:i===a.body?i.innerHTML:i.outerHTML,css:""})),k(),v(0)}function F(){const n=document.querySelector(".editor-viewport"),t=e.editorContainer;if(!n||!t)return;const a=80,o=Math.min((n.clientWidth-a)/1122.52,(n.clientHeight-a)/793.7);t.style.transform=`scale(${Math.max(o,.1)}) translate(-50%, -50%)`,t.style.left="50%",t.style.top="50%",t.style.position="absolute"}function K(n=1){const t=e.printFrame,a=t.contentWindow.document,o={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},i=o[n]||o[1],s=d.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),l=97,r=68.6,c=3,g=((210-(l*2+c))/2).toFixed(1),I=(l/297).toFixed(6);let P="";if(n===1)P=d.slides.map(w=>`<div class="print-page">${w.content}</div>`).join("");else{const w=[];for(let f=0;f<d.slides.length;f+=n)w.push(d.slides.slice(f,f+n));P=w.map(f=>`<div class="handout-page">${f.map(Y=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${I}">${Y.content}</div></div>`).join("")}</div>`).join("")}const X=`
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
      column-gap: ${c}mm;
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
    ${s}
  `;a.open(),a.write(`<html><head><style>${X}</style></head><body>${P}</body></html>`),a.close(),setTimeout(()=>{t.contentWindow.focus(),t.contentWindow.print()},500)}function V(n){let t=d.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const a=d.slides.map((r,c)=>`<div class="slide-a4-container" id="slide-${c}"><div class="slide-frame">${r.content}</div></div>`).join(`
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
    </style>`);const i=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${t} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${a}</div>${o}</body></html>`,s=new Blob([i],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(s),l.download="presentation.html",l.click()}G();
