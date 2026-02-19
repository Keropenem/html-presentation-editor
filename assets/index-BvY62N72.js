(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const a={slides:[{id:"slide-1",content:`
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
      `}],currentIndex:0,globalStyles:""},t={app:document.getElementById("app"),slideList:document.getElementById("slide-list"),currentSlideHost:document.getElementById("current-slide-host"),editorContainer:document.getElementById("slide-editor-container"),btnPaste:document.getElementById("btn-paste"),btnImport:document.getElementById("btn-import"),btnExportHtml:document.getElementById("btn-export-html"),btnPrint:document.getElementById("btn-print"),pasteModal:document.getElementById("paste-modal"),pasteInput:document.getElementById("paste-input"),btnPasteConfirm:document.getElementById("btn-paste-confirm"),btnPasteCancel:document.getElementById("btn-paste-cancel"),btnClosePasteModal:document.getElementById("btn-close-paste-modal"),imagePanel:document.getElementById("image-editor-panel"),cropZoom:document.getElementById("input-crop-zoom"),cropX:document.getElementById("input-crop-x"),cropY:document.getElementById("input-crop-y"),btnCloseImagePanel:document.getElementById("btn-close-image-panel"),btnChangeImageAlt:document.getElementById("btn-change-image-alt"),textPanel:document.getElementById("text-editor-panel"),btnTextBold:document.getElementById("btn-text-bold"),inputTextColor:document.getElementById("input-text-color"),inputTextLineHeight:document.getElementById("input-text-lineheight"),btnCloseTextPanel:document.getElementById("btn-close-text-panel"),exportModal:document.getElementById("export-modal"),checkPresentationMode:document.getElementById("check-presentation-mode"),btnExportConfirm:document.getElementById("btn-export-confirm"),btnExportCancel:document.getElementById("btn-export-cancel"),btnCloseExportModal:document.getElementById("btn-close-export-modal"),fileInputHtml:document.getElementById("file-input-html"),fileInputImage:document.getElementById("file-input-image"),printFrame:document.getElementById("print-frame")};let c=null,d=null;class L{constructor(n){this.host=n,this.shadow=this.host.attachShadow({mode:"open"})}render(n){const o=a.slides[n];if(!o)return;this.shadow.innerHTML="";const s=document.createElement("style");let r=a.globalStyles+(o.css||"");r=r.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),r=r.replace(/:root/g,":host"),r=r.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),r=r.replace(/html(?=\s|\{|,)/gi,":host"),s.textContent=`
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

      ${r}
    `,this.shadow.appendChild(s);const i=document.createElement("div");i.className="slide-frame",i.innerHTML=o.content,i.contentEditable=!0,i.style.outline="none",this.shadow.appendChild(i),i.querySelectorAll("img").forEach(l=>{(l.dataset.cropZoom||l.dataset.cropX||l.dataset.cropY)&&b(l),l.parentElement&&(l.parentElement.style.overflow="hidden")}),i.addEventListener("input",()=>{a.slides[n].content=i.innerHTML,x(n)}),i.addEventListener("click",l=>{l.target.tagName==="IMG"?(h(),P(l.target)):l.target!==i?(u(),S(l.target)):(u(),h())})}}const I=new L(t.currentSlideHost);function y(){const e=t.slideList.clientWidth;if(e<=0)return;const o=(e-32)/1122.5;document.querySelectorAll(".thumb-preview").forEach(s=>{s.style.setProperty("--thumb-scale",o)})}const k=new ResizeObserver(()=>{y()});k.observe(t.slideList);function P(e){c&&c.classList.remove("active-editing"),c=e,c.classList.add("active-editing"),t.cropZoom.value=e.dataset.cropZoom||100,t.cropX.value=e.dataset.cropX||0,t.cropY.value=e.dataset.cropY||0,t.imagePanel.classList.remove("hidden")}function u(){c&&c.classList.remove("active-editing"),c=null,t.imagePanel.classList.add("hidden")}function S(e){d&&d.classList.remove("active-text-editing"),d=e,d.classList.add("active-text-editing");const n=window.getComputedStyle(e),o=n.color.match(/\d+/g);if(o&&o.length>=3){const r="#"+o.slice(0,3).map(i=>parseInt(i).toString(16).padStart(2,"0")).join("");t.inputTextColor.value=r}const s=parseFloat(n.lineHeight)/parseFloat(n.fontSize)||1.5;t.inputTextLineHeight.value=s.toFixed(1),t.textPanel.classList.remove("hidden")}function h(){d&&d.classList.remove("active-text-editing"),d=null,t.textPanel.classList.add("hidden")}function C(){c&&(c.dataset.cropZoom=t.cropZoom.value,c.dataset.cropX=t.cropX.value,c.dataset.cropY=t.cropY.value,b(c),p())}function b(e){const n=Math.max(1,(e.dataset.cropZoom||100)/100),o=parseFloat(e.dataset.cropX||0),s=parseFloat(e.dataset.cropY||0),r=50+o/2,i=50+s/2;e.style.setProperty("width","100%","important"),e.style.setProperty("height","100%","important"),e.style.setProperty("object-fit","cover","important"),e.style.setProperty("object-position",`${r}% ${i}%`,"important"),e.style.setProperty("transform-origin",`${r}% ${i}%`,"important"),e.style.setProperty("transform",`scale(${n})`,"important"),e.parentElement&&(e.parentElement.style.overflow="hidden")}function p(){const e=t.currentSlideHost.shadowRoot;if(!e)return;const n=e.querySelector(".slide-frame");n&&(a.slides[a.currentIndex].content=n.innerHTML,x(a.currentIndex))}function B(){v(),m(0),T(),f(),window.addEventListener("resize",f)}function m(e){a.currentIndex=e,I.render(e),document.querySelectorAll(".thumb-item").forEach((n,o)=>{n.classList.toggle("active",o===e)}),document.getElementById("current-index").textContent=e+1}function v(){t.slideList.innerHTML="",a.slides.forEach((e,n)=>{const o=document.createElement("div");o.className="thumb-item",o.onclick=()=>m(n);const s=document.createElement("div");s.className="thumb-preview";const r=s.attachShadow({mode:"open"});let i=a.globalStyles+(e.css||"");i=i.replace(/100vw/g,"100%").replace(/100vh/g,"100%"),i=i.replace(/:root/g,":host"),i=i.replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame"),i=i.replace(/html(?=\s|\{|,)/gi,":host"),r.innerHTML=`
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
        ${i}
      </style>
      <div class="slide-frame">${e.content}</div>
    `,o.appendChild(s),t.slideList.appendChild(o)}),setTimeout(y,0),document.getElementById("total-slides").textContent=a.slides.length}function x(e){const n=t.slideList.querySelectorAll(".thumb-item");if(n[e]){const s=n[e].querySelector(".thumb-preview").shadowRoot.querySelector(".slide-frame");s&&(s.innerHTML=a.slides[e].content)}}function T(){t.btnPaste.addEventListener("click",()=>{t.pasteInput.value="",t.pasteModal.classList.remove("hidden")}),t.btnPasteConfirm.addEventListener("click",()=>{t.pasteInput.value.trim()&&(g(t.pasteInput.value),t.pasteModal.classList.add("hidden"))}),t.btnPasteCancel.addEventListener("click",()=>t.pasteModal.classList.add("hidden")),t.btnClosePasteModal.addEventListener("click",()=>t.pasteModal.classList.add("hidden")),t.btnImport.addEventListener("click",()=>t.fileInputHtml.click()),t.fileInputHtml.addEventListener("change",e=>{const n=e.target.files[0];if(n){const o=new FileReader;o.onload=s=>g(s.target.result),o.readAsText(n)}}),[t.cropZoom,t.cropX,t.cropY].forEach(e=>{e.addEventListener("input",C)}),t.btnCloseImagePanel.addEventListener("click",u),t.btnChangeImageAlt.addEventListener("click",()=>t.fileInputImage.click()),t.fileInputImage.addEventListener("change",e=>{const n=e.target.files[0];if(n&&c){const o=new FileReader;o.onload=s=>{c.src=s.target.result,p(),e.target.value=""},o.readAsDataURL(n)}}),t.btnTextBold.addEventListener("click",()=>{if(!d)return;const e=d.style.fontWeight;d.style.fontWeight=e==="bold"||e==="700"?"normal":"bold",p()}),t.inputTextColor.addEventListener("input",e=>{d&&(d.style.color=e.target.value,p())}),t.inputTextLineHeight.addEventListener("input",e=>{d&&(d.style.lineHeight=e.target.value,p())}),t.btnCloseTextPanel.addEventListener("click",h),t.btnExportHtml.addEventListener("click",()=>t.exportModal.classList.remove("hidden")),t.btnExportConfirm.addEventListener("click",()=>{A(t.checkPresentationMode.checked),t.exportModal.classList.add("hidden")}),t.btnExportCancel.addEventListener("click",()=>t.exportModal.classList.add("hidden")),t.btnCloseExportModal.addEventListener("click",()=>t.exportModal.classList.add("hidden")),t.btnPrint.addEventListener("click",M),window.addEventListener("keydown",e=>{e.target.isContentEditable||e.composedPath().some(o=>o.isContentEditable)||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||((e.key==="ArrowDown"||e.key==="ArrowRight")&&a.currentIndex<a.slides.length-1&&m(a.currentIndex+1),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&a.currentIndex>0&&m(a.currentIndex-1))})}function g(e){const o=new DOMParser().parseFromString(e,"text/html");a.globalStyles=Array.from(o.querySelectorAll("style")).map(r=>r.textContent).join(`
`);const s=o.querySelectorAll("section").length?Array.from(o.querySelectorAll("section")):o.querySelectorAll(".slide").length?Array.from(o.querySelectorAll(".slide")):[o.body];a.slides=s.map((r,i)=>({id:`imported-${i}`,content:r===o.body?r.innerHTML:r.outerHTML,css:""})),v(),m(0)}function f(){const e=document.querySelector(".editor-viewport"),n=t.editorContainer;if(!e||!n)return;const o=80,s=Math.min((e.clientWidth-o)/1122.52,(e.clientHeight-o)/793.7);n.style.transform=`scale(${Math.max(s,.1)}) translate(-50%, -50%)`,n.style.left="50%",n.style.top="50%",n.style.position="absolute"}function M(){const e=t.printFrame,n=e.contentWindow.document,o=a.slides.map(s=>`<div class="print-page">${s.content}</div>`).join("");n.open(),n.write(`<html><head><style>@page { size: A4 landscape; margin: 0; } body { margin: 0; } .print-page { width: 297mm; height: 210mm; page-break-after: always; position: relative; overflow: hidden; background: white; } ${a.globalStyles}</style></head><body>${o}</body></html>`),n.close(),setTimeout(()=>{e.contentWindow.focus(),e.contentWindow.print()},500)}function A(e){let n=a.globalStyles.replace(/100vw/g,"100%").replace(/100vh/g,"100%").replace(/(^|,)\s*body(?=\s|\{|,)/gi,"$1 .slide-frame").replace(/html(?=\s|\{|,)/gi,".slide-frame");const o=a.slides.map((E,w)=>`<div class="slide-a4-container" id="slide-${w}"><div class="slide-frame">${E.content}</div></div>`).join(`
`);let s="";e&&(s=`
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
    </style>`);const r=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${n} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${o}</div>${s}</body></html>`,i=new Blob([r],{type:"text/html"}),l=document.createElement("a");l.href=URL.createObjectURL(i),l.download="presentation.html",l.click()}B();
