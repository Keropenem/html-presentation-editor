(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const d={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let c=null,u=null,p=null,w=null,x=null;function v(){document.querySelectorAll(".drop-zone").forEach(o=>{o.classList.remove("active")}),w=null}const H=10,q=.3;function R(o,t){E();const a=t.getBoundingClientRect(),n=a.height*q,i=o-a.top,s=a.bottom-o;let l=0;if(i<n?l=-H*(1-i/n):s<n&&(l=H*(1-s/n)),l===0)return;function r(){e.slideList.scrollTop+=l,x=requestAnimationFrame(r)}x=requestAnimationFrame(r)}function E(){x!==null&&(cancelAnimationFrame(x),x=null)}function S(o){if(p===null||o===p||o===p+1)return;v();const t=e.slideList.querySelector(`.drop-zone[data-gap-index="${o}"]`);t&&(t.classList.add("active"),w=o)}function F(o){if(p===null)return;if(o===p||o===p+1){v();return}let t=o;p<t&&t--;const a=d.slides[d.currentIndex].id,[n]=d.slides.splice(p,1);d.slides.splice(t,0,n);const i=d.slides.findIndex(s=>s.id===a);d.currentIndex=i>=0?i:0,v(),E(),p=null,k(),y(d.currentIndex)}class W{constructor(t){this.host=t,this.shadow=this.host.attachShadow({mode:"open"})}render(t){const a=d.slides[t];if(!a)return;this.shadow.innerHTML="";const n=document.createElement("style");let i=d.globalStyles+(a.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),n.textContent=`
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
    `,this.shadow.appendChild(n);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=a.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(r=>{(r.dataset.cropZoom||r.dataset.cropX||r.dataset.cropY)&&C(r);const m=r.parentElement;m&&(m.dataset.frameW||(r.style.setProperty("width","100%","important"),r.style.setProperty("height","100%","important"),m.style.overflow="hidden"))}),s.addEventListener("input",()=>{d.slides[t].content=s.innerHTML,X(t)}),s.addEventListener("click",r=>{r.target.tagName==="IMG"?(T(),j(r.target)):r.target!==s?(B(),U(r.target)):(B(),T())});const l=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const r=typeof l.getSelection=="function"?l.getSelection():document.getSelection();r&&!r.isCollapsed&&r.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const O=new W(e.currentSlideHost);function z(){const o=e.slideList.clientWidth;if(o<=0)return;const a=(o-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(n=>{n.style.setProperty("--thumb-scale",a)})}const N=new ResizeObserver(()=>{z()});N.observe(e.slideList);const Z="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(o){c&&(c.classList.remove("active-editing"),c.parentElement&&(c.parentElement.style.filter="")),c=o,c.classList.add("active-editing"),e.cropZoom.value=o.dataset.cropZoom||100,e.cropX.value=o.dataset.cropX||0,e.cropY.value=o.dataset.cropY||0,C(o);const t=o.parentElement;if(t){if(!t.dataset.origH){const m=t.style.height;t.style.height="",t.dataset.origH=t.offsetHeight,t.style.height=m}const a=parseFloat(t.dataset.frameW)||100,n=parseFloat(t.dataset.frameH)||100;e.inputImgWidth.value=a,e.valImgWidth.value=a,e.inputImgHeight.value=n,e.valImgHeight.value=n;let i=0,s=0;const r=window.getComputedStyle(t).transform;if(r&&r!=="none"){const m=r.match(/matrix\(([^)]+)\)/);if(m){const g=m[1].split(",").map(Number);i=Math.round(g[4])||0,s=Math.round(g[5])||0}}e.inputImgPosY.value=s,e.valImgPosY.value=s,e.inputImgPosX.value=i,e.valImgPosX.value=i,b(),t.style.filter=Z}e.imagePanel.classList.remove("hidden")}function B(){c&&(c.classList.remove("active-editing"),c.parentElement&&(c.parentElement.style.filter="")),c=null,e.imagePanel.classList.add("hidden")}function U(o){u&&u.classList.remove("active-text-editing"),u=o,u.classList.add("active-text-editing");const t=window.getComputedStyle(o),a=Math.round(parseFloat(t.fontSize));e.inputTextFontSize.value=a,e.valFontSize.value=a;const n=parseFloat(t.lineHeight)/parseFloat(t.fontSize)||1.5;e.inputTextLineHeight.value=n.toFixed(1),e.valLineHeight.value=n.toFixed(1);let i=0,s=0;const l=t.transform;if(l&&l!=="none"){const r=l.match(/matrix\(([^)]+)\)/);if(r){const m=r[1].split(",").map(Number);i=Math.round(m[4])||0,s=Math.round(m[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=i,e.valTextPosX.value=i,e.textPanel.classList.remove("hidden")}function T(){u&&u.classList.remove("active-text-editing"),u=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){c&&(c.dataset.cropZoom=e.cropZoom.value,c.dataset.cropX=e.cropX.value,c.dataset.cropY=e.cropY.value,C(c),f())}function C(o){const t=Math.max(1,(o.dataset.cropZoom||100)/100),a=parseFloat(o.dataset.cropX||0),n=parseFloat(o.dataset.cropY||0),i=50+a/2,s=50+n/2;o.style.setProperty("object-fit","cover","important"),o.style.setProperty("object-position",`${i}% ${s}%`,"important"),o.style.setProperty("transform-origin",`${i}% ${s}%`,"important"),o.style.setProperty("transform",`scale(${t})`,"important")}function b(){if(!c||!c.parentElement)return;const o=c.parentElement,t=parseFloat(e.inputImgWidth.value),a=parseFloat(e.inputImgHeight.value),n=parseFloat(o.dataset.origH)||o.offsetHeight;o.dataset.frameW=t,o.dataset.frameH=a,o.style.height="";const i=(100-t)/2;let s,l;a<=100?s=l=(100-a)/2:(s=0,l=-(a-100)),i!==0||s!==0||l!==0?o.style.clipPath=`inset(${s}% ${i}% ${l}% ${i}%)`:o.style.clipPath="";const r=Math.max(t,100),m=Math.max(a,100);c.style.setProperty("width",r+"%","important"),c.style.setProperty("height",m+"%","important"),o.style.overflow=t>100||a>100?"visible":"hidden",t>100||a>100?(c.style.setProperty("position","relative","important"),c.style.setProperty("left",t>100?`${-(r-100)/2}%`:"0","important"),c.style.setProperty("top","0","important")):(c.style.removeProperty("position"),c.style.removeProperty("left"),c.style.removeProperty("top")),a>100?o.style.marginBottom=n*(a-100)/100+"px":o.style.marginBottom="";const g=parseFloat(e.inputImgPosX.value)||0,I=parseFloat(e.inputImgPosY.value)||0;o.style.transform=g||I?`translate(${g}px, ${I}px)`:"",f()}function f(){const o=e.currentSlideHost.shadowRoot;if(!o)return;const t=o.querySelector(".slide-frame");t&&(d.slides[d.currentIndex].content=t.innerHTML,X(d.currentIndex))}function G(){k(),y(0),J(),$(),window.addEventListener("resize",$)}function y(o){d.currentIndex=o,O.render(o),document.querySelectorAll(".thumb-item").forEach((t,a)=>{t.classList.toggle("active",a===o)}),document.getElementById("current-index").textContent=o+1}function M(o){const t=document.createElement("div");return t.className="drop-zone",t.dataset.gapIndex=o,t.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",S(o)}),t.addEventListener("dragleave",()=>{t.classList.remove("active")}),t.addEventListener("drop",a=>{a.preventDefault(),F(o)}),t}function k(){e.slideList.innerHTML="",d.slides.forEach((o,t)=>{e.slideList.appendChild(M(t));const a=document.createElement("div");a.className="thumb-item",a.draggable=!0,a.onclick=()=>y(t),a.addEventListener("dragstart",l=>{p=t,a.classList.add("dragging"),l.dataTransfer.effectAllowed="move"}),a.addEventListener("dragover",l=>{if(l.preventDefault(),l.dataTransfer.dropEffect="move",p===null||p===t)return;const r=a.getBoundingClientRect(),m=(l.clientY-r.top)/r.height;m<.25?S(t):m>.75?S(t+1):v()}),a.addEventListener("dragleave",()=>{}),a.addEventListener("drop",l=>{l.preventDefault(),w!==null?F(w):v()}),a.addEventListener("dragend",()=>{a.classList.remove("dragging"),v(),E(),p=null});const n=document.createElement("div");n.className="thumb-preview";const i=n.attachShadow({mode:"open"});let s=d.globalStyles+(o.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),i.innerHTML=`
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
    `,a.appendChild(n),e.slideList.appendChild(a)}),e.slideList.appendChild(M(d.slides.length)),setTimeout(z,0),document.getElementById("total-slides").textContent=d.slides.length}function X(o){const t=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(t[o]){const n=t[o].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");n&&(n.innerHTML=d.slides[o].content)}}function J(){const o=e.slideList.closest(".sidebar");o.addEventListener("dragover",n=>{p!==null&&R(n.clientY,o)}),o.addEventListener("dragleave",n=>{o.contains(n.relatedTarget)||E()}),o.addEventListener("drop",()=>E()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(A(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",n=>{const i=n.target.files[0];if(i){const s=new FileReader;s.onload=l=>A(l.target.result),s.readAsText(i)}}),[e.cropZoom,e.cropX,e.cropY].forEach(n=>{n.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",B),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",n=>{const i=n.target.files[0];if(i&&c){const s=new FileReader;s.onload=l=>{c.src=l.target.result,f(),n.target.value=""},s.readAsDataURL(i)}}),e.btnTextBold.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("bold"),f()}),e.btnTextItalic.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("italic"),f()}),e.btnTextUnderline.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("underline"),f()}),e.colorSwatches.forEach(n=>{n.addEventListener("mousedown",i=>{i.preventDefault();const s=n.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,s),f()})});function t(n,i,s){n.addEventListener("input",l=>{i.value=l.target.value,s(l.target.value)}),i.addEventListener("input",l=>{n.value=l.target.value,s(l.target.value)})}t(e.inputTextFontSize,e.valFontSize,n=>{u&&(u.style.fontSize=n+"px",f())}),t(e.inputTextLineHeight,e.valLineHeight,n=>{u&&(u.style.lineHeight=n,f())});function a(){if(!u)return;const n=e.inputTextPosY.value||0,i=e.inputTextPosX.value||0;u.style.transform=`translate(${i}px, ${n}px)`,f()}t(e.inputTextPosY,e.valTextPosY,()=>a()),t(e.inputTextPosX,e.valTextPosX,()=>a()),e.btnCloseTextPanel.addEventListener("click",T),t(e.inputImgWidth,e.valImgWidth,()=>b()),t(e.inputImgHeight,e.valImgHeight,()=>b()),t(e.inputImgPosY,e.valImgPosY,()=>b()),t(e.inputImgPosX,e.valImgPosX,()=>b()),document.querySelectorAll(".btn-reset").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault();const s=n.dataset.slider,l=n.dataset.val,r=n.dataset.default,m=document.getElementById(s);if(m&&(m.value=r,m.dispatchEvent(new Event("input",{bubbles:!0}))),l){const g=document.getElementById(l);g&&(g.value=r)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(n=>{n.addEventListener("click",()=>{e.printLayoutCards.forEach(i=>i.classList.remove("active")),n.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const n=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(n.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",n=>{n.target.isContentEditable||n.composedPath().some(s=>s.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(n.target.tagName)||((n.key==="ArrowDown"||n.key==="ArrowRight")&&d.currentIndex<d.slides.length-1&&y(d.currentIndex+1),(n.key==="ArrowUp"||n.key==="ArrowLeft")&&d.currentIndex>0&&y(d.currentIndex-1))})}function A(o){const a=new DOMParser().parseFromString(o,"text/html");d.globalStyles=Array.from(a.querySelectorAll("style")).map(i=>i.textContent).join(`
`);const n=a.querySelectorAll("section").length?Array.from(a.querySelectorAll("section")):a.querySelectorAll(".slide").length?Array.from(a.querySelectorAll(".slide")):[a.body];d.slides=n.map((i,s)=>({id:`imported-${s}`,content:i===a.body?i.innerHTML:i.outerHTML,css:""})),k(),y(0)}function $(){const o=document.querySelector(".editor-viewport"),t=e.editorContainer;if(!o||!t)return;const a=80,n=Math.min((o.clientWidth-a)/1122.52,(o.clientHeight-a)/793.7);t.style.transform=`scale(${Math.max(n,.1)}) translate(-50%, -50%)`,t.style.left="50%",t.style.top="50%",t.style.position="absolute"}function K(o=1){const t=e.printFrame,a=t.contentWindow.document,n={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},i=n[o]||n[1],s=d.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),l=97,r=68.6,m=3,g=((210-(l*2+m))/2).toFixed(1),I=(l/297).toFixed(6);let P="";if(o===1)P=d.slides.map(L=>`<div class="print-page">${L.content}</div>`).join("");else{const L=[];for(let h=0;h<d.slides.length;h+=o)L.push(d.slides.slice(h,h+o));P=L.map(h=>`<div class="handout-page">${h.map(D=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${I}">${D.content}</div></div>`).join("")}</div>`).join("")}const Y=`
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
    ${s}
  `;a.open(),a.write(`<html><head><style>${Y}</style></head><body>${P}</body></html>`),a.close(),setTimeout(()=>{t.contentWindow.focus(),t.contentWindow.print()},500)}function V(o){let t=d.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const a=d.slides.map((r,m)=>`<div class="slide-a4-container" id="slide-${m}"><div class="slide-frame">${r.content}</div></div>`).join(`
`);let n="";o&&(n=`
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
    </style>`);const i=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${t} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${a}</div>${n}</body></html>`,s=new Blob([i],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(s),l.download="presentation.html",l.click()}G();
