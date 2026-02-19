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
      // デフォルト: シンプルなクリーンなスライド
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
  globalStyles: '', // インポートされた <style> の内容
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
  btnAdd: document.getElementById('btn-add-slide'),
  btnExportHtml: document.getElementById('btn-export-html'),
  btnPrint: document.getElementById('btn-print'),

  // モーダル関連
  pasteModal: document.getElementById('paste-modal'),
  pasteInput: document.getElementById('paste-input'),
  btnClosePasteModal: document.getElementById('btn-close-paste-modal'),
  btnPasteConfirm: document.getElementById('btn-paste-confirm'),
  btnPasteCancel: document.getElementById('btn-paste-cancel'),

  // 入力
  fileInputHtml: document.getElementById('file-input-html'),
  fileInputImage: document.getElementById('file-input-image'),

  // 印刷用
  printFrame: document.getElementById('print-frame')
};

/* --- スライダレンダラー (Shadow DOM) --- */
class SlideRenderer {
  constructor(hostElement) {
    this.host = hostElement;
    this.shadow = this.host.attachShadow({ mode: 'open' });
  }

  render(slideIndex) {
    const slide = state.slides[slideIndex];
    if (!slide) return;

    // Shadow DOM をリセット
    this.shadow.innerHTML = '';

    // 1. グローバルおよびスライド固有の CSS を注入
    const styleEl = document.createElement('style');
    // インポートされたCSSの 'body' セレクタを '.slide-frame' に変換して適用
    let combinedCss = (state.globalStyles + (slide.css || ''));

    combinedCss = combinedCss.replace(/body\s*\{/gi, '.slide-frame {');
    combinedCss = combinedCss.replace(/html\s*\{/gi, ':host {');

    styleEl.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .slide-frame {
        width: 100%;
        height: 100%;
        display: block; 
        position: relative;
        overflow: hidden;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      ${combinedCss}
    `;
    this.shadow.appendChild(styleEl);

    // 2. HTML コンテンツを注入
    const wrapper = document.createElement('div');
    wrapper.className = 'slide-frame';
    wrapper.innerHTML = slide.content;

    // 編集を有効化
    wrapper.contentEditable = true;
    wrapper.style.outline = 'none';

    this.shadow.appendChild(wrapper);

    // 3. イベントリスナー (状態への同期)
    wrapper.addEventListener('input', () => {
      state.slides[slideIndex].content = wrapper.innerHTML;
      updateThumbnail(slideIndex);
    });

    // 画像クリックハンドラ
    wrapper.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        if (confirm('この画像を差し替えますか？')) {
          activeImageElement = e.target;
          els.fileInputImage.click();
        }
      }
    });
  }
}

const mainRenderer = new SlideRenderer(els.currentSlideHost);
let activeImageElement = null;

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

  // メインビューをレンダリング
  mainRenderer.render(index);

  // サイドバーの選択状態を更新
  document.querySelectorAll('.thumb-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // カウンターを更新
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
    previewRoot.style.transform = 'scale(0.2)';
    previewRoot.style.width = '500%';
    previewRoot.style.height = '500%';

    const shadow = previewRoot.attachShadow({ mode: 'open' });

    let combinedCss = (state.globalStyles + (slide.css || ''));
    combinedCss = combinedCss.replace(/body\s*\{/gi, '.slide-frame {');

    shadow.innerHTML = `
      <style>
        :host { display: block; overflow: hidden; }
        .slide-frame { width: 100%; height: 100%; overflow: hidden; }
        ${combinedCss}
      </style>
      <div class="slide-frame">${slide.content}</div>
    `;

    thumbContainer.appendChild(previewRoot);
    els.slideList.appendChild(thumbContainer);
  });

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
  // インポート (貼り付け)
  els.btnPaste.addEventListener('click', () => {
    els.pasteInput.value = '';
    els.pasteModal.classList.remove('hidden');
  });

  els.btnClosePasteModal.addEventListener('click', () => els.pasteModal.classList.add('hidden'));
  els.btnPasteCancel.addEventListener('click', () => els.pasteModal.classList.add('hidden'));

  els.btnPasteConfirm.addEventListener('click', () => {
    const html = els.pasteInput.value;
    if (html.trim()) {
      processHtml(html);
      els.pasteModal.classList.add('hidden');
    }
  });

  // インポート (ファイル)
  els.btnImport.addEventListener('click', () => els.fileInputHtml.click());
  els.fileInputHtml.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => processHtml(ev.target.result);
    reader.readAsText(file);
  });

  // スライド追加
  els.btnAdd.addEventListener('click', () => {
    state.slides.push({
      id: `slide-${Date.now()}`,
      content: '<div class="slide"><h1>新しいスライド</h1></div>',
      css: state.slides[0]?.css || ''
    });
    renderSidebar();
    loadSlide(state.slides.length - 1);
  });

  // 画像差し替え
  els.fileInputImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && activeImageElement) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        activeImageElement.src = ev.target.result;
        state.slides[state.currentIndex].content = mainRenderer.shadow.querySelector('.slide-frame').innerHTML;
        updateThumbnail(state.currentIndex);
      };
      reader.readAsDataURL(file);
    }
  });

  // 印刷
  els.btnPrint.addEventListener('click', handlePrint);

  // 書き出し
  els.btnExportHtml.addEventListener('click', handleExport);

  // キーボード操作
  window.addEventListener('keydown', (e) => {
    if (e.target.isContentEditable) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (state.currentIndex < state.slides.length - 1) loadSlide(state.currentIndex + 1);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (state.currentIndex > 0) loadSlide(state.currentIndex - 1);
    }
  });
}

/**
 * HTML 解析 & 読み込み
 */
function processHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // CSS 抽出
  const styles = Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join('\n');
  state.globalStyles = styles;

  // スライド要素抽出
  let newSlides = [];
  const sections = doc.querySelectorAll('section');
  const slideClasses = doc.querySelectorAll('.slide');

  let elements = [];
  if (sections.length > 0) elements = Array.from(sections);
  else if (slideClasses.length > 0) elements = Array.from(slideClasses);
  else elements = [doc.body];

  newSlides = elements.map((el, i) => {
    let content = (el === doc.body) ? el.innerHTML : el.outerHTML;
    return {
      id: `imported-${i}`,
      content: content,
      css: ''
    };
  });

  if (newSlides.length > 0) {
    state.slides = newSlides;
    renderSidebar();
    loadSlide(0);
  }
}

/**
 * レイアウトのズーム調整
 */
function updateZoom() {
  const viewport = document.querySelector('.editor-viewport');
  const container = els.editorContainer;
  if (!viewport || !container) return;

  const padding = 80;
  const vw = viewport.clientWidth - padding;
  const vh = viewport.clientHeight - padding;
  const baseW = 1123;
  const baseH = 794;

  const scale = Math.min(vw / baseW, vh / baseH);
  container.style.transform = `scale(${Math.max(scale, 0.2)})`;
}

/**
 * 印刷処理
 */
function handlePrint() {
  const iframe = els.printFrame;
  const doc = iframe.contentWindow.document;

  const slidesHtml = state.slides.map(s => {
    return `<div class="print-page">${s.content}</div>`;
  }).join('');

  const css = state.globalStyles;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>印刷プレビュー</title>
      <style>
        @page { size: A4 landscape; margin: 0; }
        body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
        .print-page {
          width: 297mm;
          height: 210mm;
          page-break-after: always;
          position: relative;
          overflow: hidden;
          background: white; 
        }
        ${css}
      </style>
    </head>
    <body>
      ${slidesHtml}
    </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 500);
}

/**
 * HTML 書き出し
 */
function handleExport() {
  const slidesHtml = state.slides.map(s => `<div class="slide">${s.content}</div>`).join('\n');
  const css = state.globalStyles;

  const exportDoc = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 0; background: #eee; }
  ${css}
  .slide {
    width: 297mm; height: 210mm; 
    background: white; 
    margin: 20px auto; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }
  @media print {
    body { background: none; }
    .slide { margin: 0; box-shadow: none; page-break-after: always; }
  }
</style>
</head>
<body>
${slidesHtml}
</body>
</html>`;

  const blob = new Blob([exportDoc], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'presentation.html';
  a.click();
}

init();
