import './style.css';

/**
 * SlideCraft V2 - メインエントリーポイント
 * アーキテクチャ: Shadow DOM による隔離
 */

/* --- 状態管理 --- */
const state = {
  slides: [
    {
      id: 'slide-1',
      content: `
        <div class="slide">
          <h1>新しいプレゼンテーション</h1>
          <p>「HTMLを貼り付け」または「ファイルをインポート」してスライドを読み込んでください。</p>
        </div>
      `,
      css: `
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
      `
    }
  ],
  currentIndex: 0,
  globalStyles: '',
  zoom: 1
};

/* --- DOM 要素 --- */
const els = {
  app: document.getElementById('app'),
  slideList: document.getElementById('slide-list'),
  currentSlideHost: document.getElementById('current-slide-host'),
  editorContainer: document.getElementById('slide-editor-container'),

  // ボタン
  btnPaste: document.getElementById('btn-paste'),
  btnImport: document.getElementById('btn-import'),
  btnExportHtml: document.getElementById('btn-export-html'),
  btnPrint: document.getElementById('btn-print'),

  // モーダル
  pasteModal: document.getElementById('paste-modal'),
  pasteInput: document.getElementById('paste-input'),
  btnPasteConfirm: document.getElementById('btn-paste-confirm'),
  btnPasteCancel: document.getElementById('btn-paste-cancel'),
  btnClosePasteModal: document.getElementById('btn-close-paste-modal'),

  // 画像編集パネル
  imagePanel: document.getElementById('image-editor-panel'),
  cropZoom: document.getElementById('input-crop-zoom'),
  cropX: document.getElementById('input-crop-x'),
  cropY: document.getElementById('input-crop-y'),
  btnCloseImagePanel: document.getElementById('btn-close-image-panel'),
  btnChangeImageAlt: document.getElementById('btn-change-image-alt'),

  // テキスト編集パネル
  textPanel: document.getElementById('text-editor-panel'),
  btnTextBold: document.getElementById('btn-text-bold'),
  inputTextColor: document.getElementById('input-text-color'),
  inputTextLineHeight: document.getElementById('input-text-lineheight'),
  btnCloseTextPanel: document.getElementById('btn-close-text-panel'),

  // エクスポートモーダル
  exportModal: document.getElementById('export-modal'),
  checkPresentationMode: document.getElementById('check-presentation-mode'),
  btnExportConfirm: document.getElementById('btn-export-confirm'),
  btnExportCancel: document.getElementById('btn-export-cancel'),
  btnCloseExportModal: document.getElementById('btn-close-export-modal'),

  // 入力
  fileInputHtml: document.getElementById('file-input-html'),
  fileInputImage: document.getElementById('file-input-image'),

  // 印刷
  printFrame: document.getElementById('print-frame')
};

let activeImage = null; // 現在編集中の画像要素（Shadow DOM内）
let activeTextElement = null; // 現在編集中のテキスト要素

/* --- スライダレンダラー (Shadow DOM) --- */
class SlideRenderer {
  constructor(hostElement) {
    this.host = hostElement;
    this.shadow = this.host.attachShadow({ mode: 'open' });
  }

  render(slideIndex) {
    const slide = state.slides[slideIndex];
    if (!slide) return;

    this.shadow.innerHTML = '';

    const styleEl = document.createElement('style');
    let combinedCss = (state.globalStyles + (slide.css || ''));

    combinedCss = combinedCss.replace(/100vw/g, '100%').replace(/100vh/g, '100%');
    combinedCss = combinedCss.replace(/:root/g, ':host');
    combinedCss = combinedCss.replace(/(^|,)\s*body(?=\s|\{|,)/gi, '$1 .slide-frame');
    combinedCss = combinedCss.replace(/html(?=\s|\{|,)/gi, ':host');

    styleEl.textContent = `
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

      ${combinedCss}
    `;
    this.shadow.appendChild(styleEl);

    const wrapper = document.createElement('div');
    wrapper.className = 'slide-frame';
    wrapper.innerHTML = slide.content;
    wrapper.contentEditable = true;
    wrapper.style.outline = 'none';

    this.shadow.appendChild(wrapper);

    // インポートされた画像の設定を復元（調整済みの画像のみ）
    wrapper.querySelectorAll('img').forEach(img => {
      if (img.dataset.cropZoom || img.dataset.cropX || img.dataset.cropY) {
        applyImageTransform(img);
      }
      // コンテナからはみ出さないように設定
      if (img.parentElement) img.parentElement.style.overflow = 'hidden';
    });

    wrapper.addEventListener('input', () => {
      state.slides[slideIndex].content = wrapper.innerHTML;
      updateThumbnail(slideIndex);
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        closeTextPanelFunc();
        selectImageForEdit(e.target);
      } else if (e.target !== wrapper) {
        closeImagePanelFunc();
        selectTextForEdit(e.target);
      } else {
        closeImagePanelFunc();
        closeTextPanelFunc();
      }
    });
  }
}

const mainRenderer = new SlideRenderer(els.currentSlideHost);

/* --- サイドバー・プレビュー制御 --- */

// 全てのサムネイルの縮小率を一括更新する
function updateThumbnailsScale() {
  const sidebarWidth = els.slideList.clientWidth;
  if (sidebarWidth <= 0) return;

  // 実際のプレビュー枠の幅を計算 (padding 1rem = 16px * 2)
  const targetWidth = sidebarWidth - 32;
  const scale = targetWidth / 1122.5;

  // 全てのプレビュー枠にスケール値をセット
  document.querySelectorAll('.thumb-preview').forEach(el => {
    el.style.setProperty('--thumb-scale', scale);
  });
}

// サイドバーのサイズ変更を監視
const sidebarObserver = new ResizeObserver(() => {
  updateThumbnailsScale();
});
sidebarObserver.observe(els.slideList);

/* --- 画像編集ロジック --- */

function selectImageForEdit(img) {
  if (activeImage) activeImage.classList.remove('active-editing');
  activeImage = img;
  activeImage.classList.add('active-editing');

  els.cropZoom.value = img.dataset.cropZoom || 100;
  els.cropX.value = img.dataset.cropX || 0;
  els.cropY.value = img.dataset.cropY || 0;

  els.imagePanel.classList.remove('hidden');
}

function closeImagePanelFunc() {
  if (activeImage) activeImage.classList.remove('active-editing');
  activeImage = null;
  els.imagePanel.classList.add('hidden');
}

/* --- テキスト編集ロジック --- */

function selectTextForEdit(el) {
  if (activeTextElement) activeTextElement.classList.remove('active-text-editing');
  activeTextElement = el;
  activeTextElement.classList.add('active-text-editing');

  // 現在のスタイルをUIに反映
  const style = window.getComputedStyle(el);

  // 文字色 (rgb -> hex 変換)
  const rgb = style.color.match(/\d+/g);
  if (rgb && rgb.length >= 3) {
    const hex = "#" + rgb.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    els.inputTextColor.value = hex;
  }

  // 行間
  const lh = parseFloat(style.lineHeight) / parseFloat(style.fontSize) || 1.5;
  els.inputTextLineHeight.value = lh.toFixed(1);

  els.textPanel.classList.remove('hidden');
}

function closeTextPanelFunc() {
  if (activeTextElement) activeTextElement.classList.remove('active-text-editing');
  activeTextElement = null;
  els.textPanel.classList.add('hidden');
}

function updateActiveImageCrop() {
  if (!activeImage) return;

  activeImage.dataset.cropZoom = els.cropZoom.value;
  activeImage.dataset.cropX = els.cropX.value;
  activeImage.dataset.cropY = els.cropY.value;

  applyImageTransform(activeImage);
  saveCurrentSlideState();
}

function applyImageTransform(img) {
  const zoom = Math.max(1, (img.dataset.cropZoom || 100) / 100);
  const x = parseFloat(img.dataset.cropX || 0);
  const y = parseFloat(img.dataset.cropY || 0);

  // スライダーの値 (-100〜100) を パーセント (0%〜100%) に変換
  const posX = 50 + (x / 2);
  const posY = 50 + (y / 2);

  // 1. 画像の比率を維持したまま、枠を埋める (歪み防止)
  img.style.setProperty('width', '100%', 'important');
  img.style.setProperty('height', '100%', 'important');
  img.style.setProperty('object-fit', 'cover', 'important');

  // 2. object-position で「元々の比率によるはみ出し」を調整
  img.style.setProperty('object-position', `${posX}% ${posY}%`, 'important');

  // 3. transform-origin を同じ座標に設定し、scale でズーム
  // これがポイントです。ズームの基点を動かすことで、拡大された画像内の
  // 上下左右どの端へも、スライダー一つでアクセスできるようになります。
  img.style.setProperty('transform-origin', `${posX}% ${posY}%`, 'important');
  img.style.setProperty('transform', `scale(${zoom})`, 'important');

  // 親要素からはみ出た部分を隠す
  if (img.parentElement) {
    img.parentElement.style.overflow = 'hidden';
  }
}

function saveCurrentSlideState() {
  const shadow = els.currentSlideHost.shadowRoot;
  if (!shadow) return;
  const frame = shadow.querySelector('.slide-frame');
  if (frame) {
    state.slides[state.currentIndex].content = frame.innerHTML;
    updateThumbnail(state.currentIndex);
  }
}

/* --- アプリロジック --- */

function init() {
  renderSidebar();
  loadSlide(0);
  setupEventListeners();
  updateZoom();
  window.addEventListener('resize', updateZoom);
}

function loadSlide(index) {
  state.currentIndex = index;
  mainRenderer.render(index);
  document.querySelectorAll('.thumb-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
  document.getElementById('current-index').textContent = index + 1;
}

function renderSidebar() {
  els.slideList.innerHTML = '';

  state.slides.forEach((slide, index) => {
    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'thumb-item';
    thumbContainer.onclick = () => loadSlide(index);

    const previewRoot = document.createElement('div');
    previewRoot.className = 'thumb-preview';

    const shadow = previewRoot.attachShadow({ mode: 'open' });

    let combinedCss = (state.globalStyles + (slide.css || ''));
    combinedCss = combinedCss.replace(/100vw/g, '100%').replace(/100vh/g, '100%');
    combinedCss = combinedCss.replace(/:root/g, ':host');
    combinedCss = combinedCss.replace(/(^|,)\s*body(?=\s|\{|,)/gi, '$1 .slide-frame');
    combinedCss = combinedCss.replace(/html(?=\s|\{|,)/gi, ':host');

    shadow.innerHTML = `
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
        ${combinedCss}
      </style>
      <div class="slide-frame">${slide.content}</div>
    `;

    thumbContainer.appendChild(previewRoot);
    els.slideList.appendChild(thumbContainer);
  });

  setTimeout(updateThumbnailsScale, 0);
  document.getElementById('total-slides').textContent = state.slides.length;
}

function updateThumbnail(index) {
  const thumbs = els.slideList.querySelectorAll('.thumb-item');
  if (thumbs[index]) {
    const shadow = thumbs[index].querySelector('.thumb-preview').shadowRoot;
    const frame = shadow.querySelector('.slide-frame');
    if (frame) frame.innerHTML = state.slides[index].content;
  }
}

function setupEventListeners() {
  // インポート
  els.btnPaste.addEventListener('click', () => {
    els.pasteInput.value = '';
    els.pasteModal.classList.remove('hidden');
  });
  els.btnPasteConfirm.addEventListener('click', () => {
    if (els.pasteInput.value.trim()) {
      processHtml(els.pasteInput.value);
      els.pasteModal.classList.add('hidden');
    }
  });
  els.btnPasteCancel.addEventListener('click', () => els.pasteModal.classList.add('hidden'));
  els.btnClosePasteModal.addEventListener('click', () => els.pasteModal.classList.add('hidden'));

  els.btnImport.addEventListener('click', () => els.fileInputHtml.click());
  els.fileInputHtml.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => processHtml(ev.target.result);
      reader.readAsText(file);
    }
  });

  // 画像編集
  [els.cropZoom, els.cropX, els.cropY].forEach(el => {
    el.addEventListener('input', updateActiveImageCrop);
  });
  els.btnCloseImagePanel.addEventListener('click', closeImagePanelFunc);
  els.btnChangeImageAlt.addEventListener('click', () => els.fileInputImage.click());
  els.fileInputImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && activeImage) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        activeImage.src = ev.target.result;
        saveCurrentSlideState();
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  });

  // テキスト編集
  els.btnTextBold.addEventListener('click', () => {
    if (!activeTextElement) return;
    const current = activeTextElement.style.fontWeight;
    activeTextElement.style.fontWeight = (current === 'bold' || current === '700') ? 'normal' : 'bold';
    saveCurrentSlideState();
  });

  els.inputTextColor.addEventListener('input', (e) => {
    if (!activeTextElement) return;
    activeTextElement.style.color = e.target.value;
    saveCurrentSlideState();
  });

  els.inputTextLineHeight.addEventListener('input', (e) => {
    if (!activeTextElement) return;
    activeTextElement.style.lineHeight = e.target.value;
    saveCurrentSlideState();
  });

  els.btnCloseTextPanel.addEventListener('click', closeTextPanelFunc);

  // エクスポート
  els.btnExportHtml.addEventListener('click', () => els.exportModal.classList.remove('hidden'));
  els.btnExportConfirm.addEventListener('click', () => {
    handleExport(els.checkPresentationMode.checked);
    els.exportModal.classList.add('hidden');
  });
  els.btnExportCancel.addEventListener('click', () => els.exportModal.classList.add('hidden'));
  els.btnCloseExportModal.addEventListener('click', () => els.exportModal.classList.add('hidden'));

  els.btnPrint.addEventListener('click', handlePrint);

  window.addEventListener('keydown', (e) => {
    const isEditing = e.target.isContentEditable ||
      e.composedPath().some(el => el.isContentEditable) ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
    if (isEditing) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (state.currentIndex < state.slides.length - 1) loadSlide(state.currentIndex + 1);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (state.currentIndex > 0) loadSlide(state.currentIndex - 1);
    }
  });
}

function processHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  state.globalStyles = Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join('\n');
  const elements = doc.querySelectorAll('section').length ? Array.from(doc.querySelectorAll('section')) :
    doc.querySelectorAll('.slide').length ? Array.from(doc.querySelectorAll('.slide')) : [doc.body];
  state.slides = elements.map((el, i) => ({
    id: `imported-${i}`,
    content: (el === doc.body) ? el.innerHTML : el.outerHTML,
    css: ''
  }));
  renderSidebar();
  loadSlide(0);
}

function updateZoom() {
  const viewport = document.querySelector('.editor-viewport');
  const container = els.editorContainer;
  if (!viewport || !container) return;
  const padding = 80;
  const scale = Math.min((viewport.clientWidth - padding) / 1122.52, (viewport.clientHeight - padding) / 793.7);
  container.style.transform = `scale(${Math.max(scale, 0.1)}) translate(-50%, -50%)`;
  container.style.left = '50%'; container.style.top = '50%'; container.style.position = 'absolute';
}

function handlePrint() {
  const iframe = els.printFrame;
  const doc = iframe.contentWindow.document;
  const slidesHtml = state.slides.map(s => `<div class="print-page">${s.content}</div>`).join('');
  doc.open();
  doc.write(`<html><head><style>@page { size: A4 landscape; margin: 0; } body { margin: 0; } .print-page { width: 297mm; height: 210mm; page-break-after: always; position: relative; overflow: hidden; background: white; } ${state.globalStyles}</style></head><body>${slidesHtml}</body></html>`);
  doc.close();
  setTimeout(() => { iframe.contentWindow.focus(); iframe.contentWindow.print(); }, 500);
}

function handleExport(includePresentationMode) {
  let exportCss = state.globalStyles
    .replace(/100vw/g, '100%')
    .replace(/100vh/g, '100%')
    .replace(/(^|,)\s*body(?=\s|\{|,)/gi, '$1 .slide-frame')
    .replace(/html(?=\s|\{|,)/gi, '.slide-frame');
  const slidesHtml = state.slides.map((s, i) => {
    return `<div class="slide-a4-container" id="slide-${i}"><div class="slide-frame">${s.content}</div></div>`;
  }).join('\n');
  let presentationStuff = '';
  if (includePresentationMode) {
    presentationStuff = `
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
    </script>
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
    </style>`;
  }
  const exportDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 0; background: #eee; } .slide-frame { width: 100%; height: 100%; position: relative; overflow: hidden; } ${exportCss} .slide-a4-container { width: 297mm; height: 210mm; background: white; margin: 20px auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: relative; overflow: hidden; } #container { display: flex; flex-direction: column; align-items: center; } @media print { body { background: none; } .slide-a4-container { margin: 0; box-shadow: none; page-break-after: always; } #container { display: block; } }</style></head><body><div id="container">${slidesHtml}</div>${presentationStuff}</body></html>`;
  const blob = new Blob([exportDoc], { type: 'text/html' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'presentation.html'; a.click();
}

init();
