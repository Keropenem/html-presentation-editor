(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const d={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},e={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),inputImgWidth:document.getElementById("input-img-width"),valImgWidth:document.getElementById("val-img-width"),inputImgHeight:document.getElementById("input-img-height"),valImgHeight:document.getElementById("val-img-height"),inputImgPosX:document.getElementById("input-img-pos-x"),valImgPosX:document.getElementById("val-img-pos-x"),inputImgPosY:document.getElementById("input-img-pos-y"),valImgPosY:document.getElementById("val-img-pos-y"),textFormatPanel:document.getElementById("text-format-panel"),btnTextBold:document.getElementById("btn-text-bold"),btnTextItalic:document.getElementById("btn-text-italic"),btnTextUnderline:document.getElementById("btn-text-underline"),colorSwatches:document.querySelectorAll(".color-swatch"),textPanel:document.getElementById("text-editor-panel"),inputTextFontSize:document.getElementById("input-text-fontsize"),valFontSize:document.getElementById("val-fontsize"),inputTextLineHeight:document.getElementById("input-text-lineheight"),valLineHeight:document.getElementById("val-lineheight"),inputTextPosY:document.getElementById("input-text-pos-y"),valTextPosY:document.getElementById("val-text-pos-y"),inputTextPosX:document.getElementById("input-text-pos-x"),valTextPosX:document.getElementById("val-text-pos-x"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame"),printModal:document.getElementById("print-modal"),btnPrintConfirm:document.getElementById("btn-print-confirm"),btnPrintCancel:document.getElementById("btn-print-cancel"),btnClosePrintModal:document.getElementById("btn-close-print-modal"),printLayoutCards:document.querySelectorAll(".print-layout-card")};let c=null,u=null,p=null,w=null,x=null;function v(){document.querySelectorAll(".drop-zone").forEach(t=>{t.classList.remove("active")}),w=null}const k=10,D=.3;function q(t,o){E();const a=o.getBoundingClientRect(),n=a.height*D,i=t-a.top,s=a.bottom-t;let l=0;if(i<n?l=-k*(1-i/n):s<n&&(l=k*(1-s/n)),l===0)return;function r(){e.slideList.scrollTop+=l,x=requestAnimationFrame(r)}x=requestAnimationFrame(r)}function E(){x!==null&&(cancelAnimationFrame(x),x=null)}function P(t){if(p===null||t===p||t===p+1)return;v();const o=e.slideList.querySelector(`.drop-zone[data-gap-index="${t}"]`);o&&(o.classList.add("active"),w=t)}function F(t){if(p===null)return;if(t===p||t===p+1){v();return}let o=t;p<o&&o--;const a=d.slides[d.currentIndex].id,[n]=d.slides.splice(p,1);d.slides.splice(o,0,n);const i=d.slides.findIndex(s=>s.id===a);d.currentIndex=i>=0?i:0,v(),E(),p=null,B(),y(d.currentIndex)}class R{constructor(o){this.host=o,this.shadow=this.host.attachShadow({mode:"open"})}render(o){const a=d.slides[o];if(!a)return;this.shadow.innerHTML="";const n=document.createElement("style");let i=d.globalStyles+(a.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),n.textContent=`
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
    `,this.shadow.appendChild(n);const s=document.createElement("div");s.className="slide-frame",s.innerHTML=a.content,s.contentEditable=!0,s.style.outline="none",this.shadow.appendChild(s),s.querySelectorAll("img").forEach(r=>{(r.dataset.cropZoom||r.dataset.cropX||r.dataset.cropY)&&T(r);const m=r.parentElement;m&&(m.dataset.frameW||(r.style.setProperty("width","100%","important"),r.style.setProperty("height","100%","important"),m.style.overflow="hidden"))}),s.addEventListener("input",()=>{d.slides[o].content=s.innerHTML,z(o)}),s.addEventListener("click",r=>{r.target.tagName==="IMG"?(C(),j(r.target)):r.target!==s?(S(),U(r.target)):(S(),C())});const l=this.shadow;s.addEventListener("mouseup",()=>{setTimeout(()=>{const r=typeof l.getSelection=="function"?l.getSelection():document.getSelection();r&&!r.isCollapsed&&r.toString().trim()?e.textFormatPanel.classList.remove("hidden"):e.textFormatPanel.classList.add("hidden")},10)})}}const O=new R(e.currentSlideHost);function $(){const t=e.slideList.clientWidth;if(t<=0)return;const a=(t-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(n=>{n.style.setProperty("--thumb-scale",a)})}const N=new ResizeObserver(()=>{$()});N.observe(e.slideList);const Z="drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)";function j(t){c&&(c.classList.remove("active-editing"),c.parentElement&&(c.parentElement.style.filter="")),c=t,c.classList.add("active-editing"),e.cropZoom.value=t.dataset.cropZoom||100,e.cropX.value=t.dataset.cropX||0,e.cropY.value=t.dataset.cropY||0,T(t);const o=t.parentElement;if(o){o.dataset.origH||(o.dataset.origH=o.offsetHeight,o.dataset.origW=o.offsetWidth);const a=parseFloat(o.dataset.frameW)||100,n=parseFloat(o.dataset.frameH)||100;e.inputImgWidth.value=a,e.valImgWidth.value=a,e.inputImgHeight.value=n,e.valImgHeight.value=n;let i=0,s=0;const r=window.getComputedStyle(o).transform;if(r&&r!=="none"){const m=r.match(/matrix\(([^)]+)\)/);if(m){const f=m[1].split(",").map(Number);i=Math.round(f[4])||0,s=Math.round(f[5])||0}}e.inputImgPosY.value=s,e.valImgPosY.value=s,e.inputImgPosX.value=i,e.valImgPosX.value=i,b()}e.imagePanel.classList.remove("hidden")}function S(){c&&(c.classList.remove("active-editing"),c.parentElement&&(c.parentElement.style.filter="")),c=null,e.imagePanel.classList.add("hidden")}function U(t){u&&u.classList.remove("active-text-editing"),u=t,u.classList.add("active-text-editing");const o=window.getComputedStyle(t),a=Math.round(parseFloat(o.fontSize));e.inputTextFontSize.value=a,e.valFontSize.value=a;const n=parseFloat(o.lineHeight)/parseFloat(o.fontSize)||1.5;e.inputTextLineHeight.value=n.toFixed(1),e.valLineHeight.value=n.toFixed(1);let i=0,s=0;const l=o.transform;if(l&&l!=="none"){const r=l.match(/matrix\(([^)]+)\)/);if(r){const m=r[1].split(",").map(Number);i=Math.round(m[4])||0,s=Math.round(m[5])||0}}e.inputTextPosY.value=s,e.valTextPosY.value=s,e.inputTextPosX.value=i,e.valTextPosX.value=i,e.textPanel.classList.remove("hidden")}function C(){u&&u.classList.remove("active-text-editing"),u=null,e.textPanel.classList.add("hidden"),e.textFormatPanel.classList.add("hidden")}function _(){c&&(c.dataset.cropZoom=e.cropZoom.value,c.dataset.cropX=e.cropX.value,c.dataset.cropY=e.cropY.value,T(c),g())}function T(t){const o=Math.max(1,(t.dataset.cropZoom||100)/100),a=parseFloat(t.dataset.cropX||0),n=parseFloat(t.dataset.cropY||0),i=50+a/2,s=50+n/2;t.style.setProperty("object-fit","cover","important"),t.style.setProperty("object-position",`${i}% ${s}%`,"important"),t.style.setProperty("transform-origin",`${i}% ${s}%`,"important"),t.style.setProperty("transform",`scale(${o})`,"important")}function b(){if(!c||!c.parentElement)return;const t=c.parentElement,o=Math.min(parseFloat(e.inputImgWidth.value),100),a=parseFloat(e.inputImgHeight.value),n=parseFloat(t.dataset.origH)||t.offsetHeight,i=parseFloat(t.dataset.origW)||t.offsetWidth;t.dataset.frameW=o,t.dataset.frameH=a,t.style.filter="",c.style.removeProperty("filter"),c.style.setProperty("width","100%","important"),c.style.setProperty("height","100%","important"),c.style.removeProperty("position"),c.style.removeProperty("left"),c.style.removeProperty("top"),c.style.removeProperty("clip-path"),t.style.overflow="hidden";const s=o<100?(100-o)/2:0;let l=0;a>100&&n?(t.style.height=n*a/100+"px",t.style.width=i+"px",t.style.maxWidth="none"):a<100?(l=(100-a)/2,t.style.height="",t.style.width="",t.style.maxWidth=""):(t.style.height="",t.style.width="",t.style.maxWidth=""),t.style.clipPath=s||l?`inset(${l}% ${s}%)`:"";const r=parseFloat(e.inputImgPosX.value)||0,m=parseFloat(e.inputImgPosY.value)||0;t.style.transform=r||m?`translate(${r}px, ${m}px)`:"",g(),t.style.filter=Z}function g(){const t=e.currentSlideHost.shadowRoot;if(!t)return;const o=t.querySelector(".slide-frame");o&&(d.slides[d.currentIndex].content=o.innerHTML,z(d.currentIndex))}function G(){B(),y(0),J(),H(),window.addEventListener("resize",H)}function y(t){d.currentIndex=t,O.render(t),document.querySelectorAll(".thumb-item").forEach((o,a)=>{o.classList.toggle("active",a===t)}),document.getElementById("current-index").textContent=t+1}function M(t){const o=document.createElement("div");return o.className="drop-zone",o.dataset.gapIndex=t,o.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",P(t)}),o.addEventListener("dragleave",()=>{o.classList.remove("active")}),o.addEventListener("drop",a=>{a.preventDefault(),F(t)}),o}function B(){e.slideList.innerHTML="",d.slides.forEach((t,o)=>{e.slideList.appendChild(M(o));const a=document.createElement("div");a.className="thumb-item",a.draggable=!0,a.onclick=()=>y(o),a.addEventListener("dragstart",l=>{p=o,a.classList.add("dragging"),l.dataTransfer.effectAllowed="move"}),a.addEventListener("dragover",l=>{if(l.preventDefault(),l.dataTransfer.dropEffect="move",p===null||p===o)return;const r=a.getBoundingClientRect(),m=(l.clientY-r.top)/r.height;m<.25?P(o):m>.75?P(o+1):v()}),a.addEventListener("dragleave",()=>{}),a.addEventListener("drop",l=>{l.preventDefault(),w!==null?F(w):v()}),a.addEventListener("dragend",()=>{a.classList.remove("dragging"),v(),E(),p=null});const n=document.createElement("div");n.className="thumb-preview";const i=n.attachShadow({mode:"open"});let s=d.globalStyles+(t.css||"");s=s.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),s=s.replace(/:root/g,":host"),s=s.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),s=s.replace(/html(?=\s|\{|,)/gi,":host"),i.innerHTML=`
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
    `,a.appendChild(n),e.slideList.appendChild(a)}),e.slideList.appendChild(M(d.slides.length)),setTimeout($,0),document.getElementById("total-slides").textContent=d.slides.length}function z(t){const o=Array.from(e.slideList.querySelectorAll(".thumb-item"));if(o[t]){const n=o[t].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");n&&(n.innerHTML=d.slides[t].content)}}function J(){const t=e.slideList.closest(".sidebar");t.addEventListener("dragover",n=>{p!==null&&q(n.clientY,t)}),t.addEventListener("dragleave",n=>{t.contains(n.relatedTarget)||E()}),t.addEventListener("drop",()=>E()),e.btnPaste.addEventListener("click",()=>{e.pasteInput.value="",e.pasteModal.classList.remove("hidden")}),e.btnPasteConfirm.addEventListener("click",()=>{e.pasteInput.value.trim()&&(A(e.pasteInput.value),e.pasteModal.classList.add("hidden"))}),e.btnPasteCancel.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnClosePasteModal.addEventListener("click",()=>e.pasteModal.classList.add("hidden")),e.btnImport.addEventListener("click",()=>e.fileInputHtml.click()),e.fileInputHtml.addEventListener("change",n=>{const i=n.target.files[0];if(i){const s=new FileReader;s.onload=l=>A(l.target.result),s.readAsText(i)}}),[e.cropZoom,e.cropX,e.cropY].forEach(n=>{n.addEventListener("input",_)}),e.btnCloseImagePanel.addEventListener("click",S),e.btnChangeImageAlt.addEventListener("click",()=>e.fileInputImage.click()),e.fileInputImage.addEventListener("change",n=>{const i=n.target.files[0];if(i&&c){const s=new FileReader;s.onload=l=>{c.src=l.target.result,g(),n.target.value=""},s.readAsDataURL(i)}}),e.btnTextBold.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("bold"),g()}),e.btnTextItalic.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("italic"),g()}),e.btnTextUnderline.addEventListener("mousedown",n=>{n.preventDefault(),document.execCommand("underline"),g()}),e.colorSwatches.forEach(n=>{n.addEventListener("mousedown",i=>{i.preventDefault();const s=n.dataset.color;document.execCommand("styleWithCSS",!1,!0),document.execCommand("foreColor",!1,s),g()})});function o(n,i,s){n.addEventListener("input",l=>{i.value=l.target.value,s(l.target.value)}),i.addEventListener("input",l=>{n.value=l.target.value,s(l.target.value)})}o(e.inputTextFontSize,e.valFontSize,n=>{u&&(u.style.fontSize=n+"px",g())}),o(e.inputTextLineHeight,e.valLineHeight,n=>{u&&(u.style.lineHeight=n,g())});function a(){if(!u)return;const n=e.inputTextPosY.value||0,i=e.inputTextPosX.value||0;u.style.transform=`translate(${i}px, ${n}px)`,g()}o(e.inputTextPosY,e.valTextPosY,()=>a()),o(e.inputTextPosX,e.valTextPosX,()=>a()),e.btnCloseTextPanel.addEventListener("click",C),o(e.inputImgWidth,e.valImgWidth,()=>b()),o(e.inputImgHeight,e.valImgHeight,()=>b()),o(e.inputImgPosY,e.valImgPosY,()=>b()),o(e.inputImgPosX,e.valImgPosX,()=>b()),document.querySelectorAll(".btn-reset").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault();const s=n.dataset.slider,l=n.dataset.val,r=n.dataset.default,m=document.getElementById(s);if(m&&(m.value=r,m.dispatchEvent(new Event("input",{bubbles:!0}))),l){const f=document.getElementById(l);f&&(f.value=r)}})}),e.btnExportHtml.addEventListener("click",()=>e.exportModal.classList.remove("hidden")),e.btnExportConfirm.addEventListener("click",()=>{V(e.checkPresentationMode.checked),e.exportModal.classList.add("hidden")}),e.btnExportCancel.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnCloseExportModal.addEventListener("click",()=>e.exportModal.classList.add("hidden")),e.btnPrint.addEventListener("click",()=>e.printModal.classList.remove("hidden")),e.printLayoutCards.forEach(n=>{n.addEventListener("click",()=>{e.printLayoutCards.forEach(i=>i.classList.remove("active")),n.classList.add("active")})}),e.btnPrintConfirm.addEventListener("click",()=>{const n=document.querySelector('input[name="print-layout"]:checked');e.printModal.classList.add("hidden"),K(parseInt(n.value))}),e.btnPrintCancel.addEventListener("click",()=>e.printModal.classList.add("hidden")),e.btnClosePrintModal.addEventListener("click",()=>e.printModal.classList.add("hidden")),window.addEventListener("keydown",n=>{n.target.isContentEditable||n.composedPath().some(s=>s.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(n.target.tagName)||((n.key==="ArrowDown"||n.key==="ArrowRight")&&d.currentIndex<d.slides.length-1&&y(d.currentIndex+1),(n.key==="ArrowUp"||n.key==="ArrowLeft")&&d.currentIndex>0&&y(d.currentIndex-1))})}function A(t){const a=new DOMParser().parseFromString(t,"text/html");d.globalStyles=Array.from(a.querySelectorAll("style")).map(i=>i.textContent).join(`
`);const n=a.querySelectorAll("section").length?Array.from(a.querySelectorAll("section")):a.querySelectorAll(".slide").length?Array.from(a.querySelectorAll(".slide")):[a.body];d.slides=n.map((i,s)=>({id:`imported-${s}`,content:i===a.body?i.innerHTML:i.outerHTML,css:""})),B(),y(0)}function H(){const t=document.querySelector(".editor-viewport"),o=e.editorContainer;if(!t||!o)return;const a=80,n=Math.min((t.clientWidth-a)/1122.52,(t.clientHeight-a)/793.7);o.style.transform=`scale(${Math.max(n,.1)}) translate(-50%, -50%)`,o.style.left="50%",o.style.top="50%",o.style.position="absolute"}function K(t=1){const o=e.printFrame,a=o.contentWindow.document,n={1:{orientation:"landscape",cols:1,rows:1},4:{orientation:"portrait",cols:2,rows:2},6:{orientation:"portrait",cols:2,rows:3},8:{orientation:"portrait",cols:2,rows:4}},i=n[t]||n[1],s=d.globalStyles.replace(/@page\s*\{[^}]*\}/gi,"").replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi,"}"),l=97,r=68.6,m=3,f=((210-(l*2+m))/2).toFixed(1),X=(l/297).toFixed(6);let L="";if(t===1)L=d.slides.map(I=>`<div class="print-page">${I.content}</div>`).join("");else{const I=[];for(let h=0;h<d.slides.length;h+=t)I.push(d.slides.slice(h,h+t));L=I.map(h=>`<div class="handout-page">${h.map(Y=>`<div class="grid-cell"><div class="cell-slide" style="zoom:${X}">${Y.content}</div></div>`).join("")}</div>`).join("")}const W=`
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
      padding: 0 ${f}mm;
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
  `;a.open(),a.write(`<html><head><style>${W}</style></head><body>${L}</body></html>`),a.close(),setTimeout(()=>{o.contentWindow.focus(),o.contentWindow.print()},500)}function V(t){let o=d.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const a=d.slides.map((r,m)=>`<div class="slide-a4-container" id="slide-${m}"><div class="slide-frame">${r.content}</div></div>`).join(`
`);let n="";t&&(n=`
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
    </style>`);const i=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${o} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${a}</div>${n}</body></html>`,s=new Blob([i],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(s),l.download="presentation.html",l.click()}G();
