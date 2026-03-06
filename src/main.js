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
  inputImgWidth: document.getElementById('input-img-width'),
  valImgWidth: document.getElementById('val-img-width'),
  inputImgHeight: document.getElementById('input-img-height'),
  valImgHeight: document.getElementById('val-img-height'),
  inputImgPosX: document.getElementById('input-img-pos-x'),
  valImgPosX: document.getElementById('val-img-pos-x'),
  inputImgPosY: document.getElementById('input-img-pos-y'),
  valImgPosY: document.getElementById('val-img-pos-y'),

  // テキスト書式パネル（選択テキスト用）
  textFormatPanel: document.getElementById('text-format-panel'),
  btnTextBold: document.getElementById('btn-text-bold'),
  btnTextItalic: document.getElementById('btn-text-italic'),
  btnTextUnderline: document.getElementById('btn-text-underline'),
  colorSwatches: document.querySelectorAll('.color-swatch'),

  // テキストボックスパネル（ブロック要素用）
  textPanel: document.getElementById('text-editor-panel'),
  inputTextFontSize: document.getElementById('input-text-fontsize'),
  valFontSize: document.getElementById('val-fontsize'),
  inputTextLineHeight: document.getElementById('input-text-lineheight'),
  valLineHeight: document.getElementById('val-lineheight'),
  inputTextPosY: document.getElementById('input-text-pos-y'),
  valTextPosY: document.getElementById('val-text-pos-y'),
  inputTextPosX: document.getElementById('input-text-pos-x'),
  valTextPosX: document.getElementById('val-text-pos-x'),
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
  printFrame: document.getElementById('print-frame'),
  printModal: document.getElementById('print-modal'),
  btnPrintConfirm: document.getElementById('btn-print-confirm'),
  btnPrintCancel: document.getElementById('btn-print-cancel'),
  btnClosePrintModal: document.getElementById('btn-close-print-modal'),
  printLayoutCards: document.querySelectorAll('.print-layout-card'),
};

let activeImage = null; // 現在編集中の画像要素（Shadow DOM内）
let activeTextElement = null; // 現在編集中のテキスト要素
let dragSourceIndex = null; // ドラッグ中のサムネイルのインデックス
let dropTargetIndex = null; // ドロップ先のギャップインデックス
let dragScrollRAF = null;   // ドラッグ中オートスクロール用

function clearDragIndicators() {
  document.querySelectorAll('.drop-zone').forEach(el => {
    el.classList.remove('active');
  });
  dropTargetIndex = null;
}

// ドラッグ中の自動スクロール
const SCROLL_MAX_SPEED = 10;   // 最大スクロール速度 (px/frame)
const SCROLL_ZONE_RATIO = 0.3; // サイドバー上下30%がスクロール域

function startDragAutoScroll(clientY, sidebarEl) {
  cancelDragAutoScroll();
  const rect = sidebarEl.getBoundingClientRect();
  const edgeZone = rect.height * SCROLL_ZONE_RATIO;

  const topDist = clientY - rect.top;
  const bottomDist = rect.bottom - clientY;

  let speed = 0;
  if (topDist < edgeZone) {
    speed = -SCROLL_MAX_SPEED * (1 - topDist / edgeZone);
  } else if (bottomDist < edgeZone) {
    speed = SCROLL_MAX_SPEED * (1 - bottomDist / edgeZone);
  }

  if (speed === 0) return;

  function scrollStep() {
    els.slideList.scrollTop += speed;
    dragScrollRAF = requestAnimationFrame(scrollStep);
  }
  dragScrollRAF = requestAnimationFrame(scrollStep);
}

function cancelDragAutoScroll() {
  if (dragScrollRAF !== null) {
    cancelAnimationFrame(dragScrollRAF);
    dragScrollRAF = null;
  }
}

// 指定ギャップのドロップゾーンをアクティブ化
function activateDropZone(gapIndex) {
  if (dragSourceIndex === null) return;
  if (gapIndex === dragSourceIndex || gapIndex === dragSourceIndex + 1) return;
  clearDragIndicators();
  const zone = els.slideList.querySelector(`.drop-zone[data-gap-index="${gapIndex}"]`);
  if (zone) {
    zone.classList.add('active');
    dropTargetIndex = gapIndex;
  }
}

// 指定ギャップにドロップ実行
function executeDropAtGap(gapIndex) {
  if (dragSourceIndex === null) return;
  if (gapIndex === dragSourceIndex || gapIndex === dragSourceIndex + 1) {
    clearDragIndicators();
    return;
  }

  let targetIndex = gapIndex;
  if (dragSourceIndex < targetIndex) targetIndex--;

  const currentSlideId = state.slides[state.currentIndex].id;
  const [moved] = state.slides.splice(dragSourceIndex, 1);
  state.slides.splice(targetIndex, 0, moved);

  const newIndex = state.slides.findIndex(s => s.id === currentSlideId);
  state.currentIndex = newIndex >= 0 ? newIndex : 0;

  clearDragIndicators();
  cancelDragAutoScroll();
  dragSourceIndex = null;
  renderSidebar();
  loadSlide(state.currentIndex);
}

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
      img.active-editing { outline: none; }

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

    // インポートされた画像の設定を復元
    wrapper.querySelectorAll('img').forEach(img => {
      if (img.dataset.cropZoom || img.dataset.cropX || img.dataset.cropY) {
        applyImageTransform(img);
      }
      const p = img.parentElement;
      if (p) {
        // フレーム編集済みの画像はinlineスタイルが保存済み
        if (!p.dataset.frameW) {
          img.style.setProperty('width', '100%', 'important');
          img.style.setProperty('height', '100%', 'important');
          p.style.overflow = 'hidden';
        }
      }
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

    // テキスト選択の検知 → インライン書式パネルの表示/非表示
    const shadowRef = this.shadow;
    wrapper.addEventListener('mouseup', () => {
      setTimeout(() => {
        const sel = typeof shadowRef.getSelection === 'function'
          ? shadowRef.getSelection()
          : document.getSelection();
        if (sel && !sel.isCollapsed && sel.toString().trim()) {
          els.textFormatPanel.classList.remove('hidden');
        } else {
          els.textFormatPanel.classList.add('hidden');
        }
      }, 10);
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

const IMG_EDIT_FILTER = 'drop-shadow(0 0 3px #6366f1) drop-shadow(0 0 1px #6366f1)';

function selectImageForEdit(img) {
  if (activeImage) {
    activeImage.classList.remove('active-editing');
    if (activeImage.parentElement) activeImage.parentElement.style.filter = '';
  }
  activeImage = img;
  activeImage.classList.add('active-editing');

  els.cropZoom.value = img.dataset.cropZoom || 100;
  els.cropX.value = img.dataset.cropX || 0;
  els.cropY.value = img.dataset.cropY || 0;

  // 画像が親要素を埋めるようにする
  applyImageTransform(img);

  // 親要素のフレーム・位置を読み取り
  const parent = img.parentElement;
  if (parent) {
    // 元のサイズを記録（初回のみ）
    if (!parent.dataset.origH) {
      parent.dataset.origH = parent.offsetHeight;
      parent.dataset.origW = parent.offsetWidth;
    }

    // フレームサイズ: data属性から復元（なければ100%）
    const wPct = parseFloat(parent.dataset.frameW) || 100;
    const hPct = parseFloat(parent.dataset.frameH) || 100;
    els.inputImgWidth.value = wPct;
    els.valImgWidth.value = wPct;
    els.inputImgHeight.value = hPct;
    els.valImgHeight.value = hPct;

    // ボックス位置: transformから読み取り
    let imgPosX = 0, imgPosY = 0;
    const pStyle = window.getComputedStyle(parent);
    const ptx = pStyle.transform;
    if (ptx && ptx !== 'none') {
      const m = ptx.match(/matrix\(([^)]+)\)/);
      if (m) {
        const vals = m[1].split(',').map(Number);
        imgPosX = Math.round(vals[4]) || 0;
        imgPosY = Math.round(vals[5]) || 0;
      }
    }
    els.inputImgPosY.value = imgPosY;
    els.valImgPosY.value = imgPosY;
    els.inputImgPosX.value = imgPosX;
    els.valImgPosX.value = imgPosX;

    // フレーム設定を適用（編集インジケータも含む）
    applyImageFrame();
  }

  els.imagePanel.classList.remove('hidden');
}

function closeImagePanelFunc() {
  if (activeImage) {
    activeImage.classList.remove('active-editing');
    if (activeImage.parentElement) activeImage.parentElement.style.filter = '';
  }
  activeImage = null;
  els.imagePanel.classList.add('hidden');
}

/* --- テキスト編集ロジック --- */

function selectTextForEdit(el) {
  if (activeTextElement) activeTextElement.classList.remove('active-text-editing');
  activeTextElement = el;
  activeTextElement.classList.add('active-text-editing');

  const style = window.getComputedStyle(el);

  // 文字サイズ
  const fs = Math.round(parseFloat(style.fontSize));
  els.inputTextFontSize.value = fs;
  els.valFontSize.value = fs;

  // 行間
  const lh = parseFloat(style.lineHeight) / parseFloat(style.fontSize) || 1.5;
  els.inputTextLineHeight.value = lh.toFixed(1);
  els.valLineHeight.value = lh.toFixed(1);

  // 上下・左右位置 (transformから読み取り)
  let posX = 0, posY = 0;
  const tx = style.transform; // matrix(a,b,c,d,e,f) or none
  if (tx && tx !== 'none') {
    const m = tx.match(/matrix\(([^)]+)\)/);
    if (m) {
      const vals = m[1].split(',').map(Number);
      posX = Math.round(vals[4]) || 0;
      posY = Math.round(vals[5]) || 0;
    }
  }
  els.inputTextPosY.value = posY;
  els.valTextPosY.value = posY;
  els.inputTextPosX.value = posX;
  els.valTextPosX.value = posX;

  els.textPanel.classList.remove('hidden');
}

function closeTextPanelFunc() {
  if (activeTextElement) activeTextElement.classList.remove('active-text-editing');
  activeTextElement = null;
  els.textPanel.classList.add('hidden');
  els.textFormatPanel.classList.add('hidden');
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

  // object-fit/position でクロップ制御（width/heightはapplyImageFrameで管理）
  img.style.setProperty('object-fit', 'cover', 'important');
  img.style.setProperty('object-position', `${posX}% ${posY}%`, 'important');
  img.style.setProperty('transform-origin', `${posX}% ${posY}%`, 'important');
  img.style.setProperty('transform', `scale(${zoom})`, 'important');
}

// 画像フレーム: 幅≤100%(clip-path)、高さ>100%可(parent実height変更)
function applyImageFrame() {
  if (!activeImage || !activeImage.parentElement) return;
  const parent = activeImage.parentElement;

  const wPct = Math.min(parseFloat(els.inputImgWidth.value), 100); // 幅は100%上限
  const hPct = parseFloat(els.inputImgHeight.value);
  const origH = parseFloat(parent.dataset.origH) || parent.offsetHeight;
  const origW = parseFloat(parent.dataset.origW) || parent.offsetWidth;

  // data属性に保存（復元用）
  parent.dataset.frameW = wPct;
  parent.dataset.frameH = hPct;

  // 編集インジケータをクリア（save前に除去して保存対象外にする）
  parent.style.filter = '';
  activeImage.style.removeProperty('filter');

  // 画像は常にparent内100%
  activeImage.style.setProperty('width', '100%', 'important');
  activeImage.style.setProperty('height', '100%', 'important');
  activeImage.style.removeProperty('position');
  activeImage.style.removeProperty('left');
  activeImage.style.removeProperty('top');
  activeImage.style.removeProperty('clip-path');
  parent.style.overflow = 'hidden';

  // --- 幅: clip-pathで中心基準クロップ（≤100%のみ） ---
  const hInset = wPct < 100 ? (100 - wPct) / 2 : 0;

  // --- 高さ ---
  let vInset = 0;
  if (hPct > 100 && origH) {
    // 拡大: parent実heightを変更（下にコンテンツを押し出す）
    parent.style.height = (origH * hPct / 100) + 'px';
    // 幅をピン留め（CSSアスペクト比連動を防止）
    parent.style.width = origW + 'px';
    parent.style.maxWidth = 'none';
  } else if (hPct < 100) {
    // 縮小: clip-path
    vInset = (100 - hPct) / 2;
    parent.style.height = '';
    parent.style.width = '';
    parent.style.maxWidth = '';
  } else {
    parent.style.height = '';
    parent.style.width = '';
    parent.style.maxWidth = '';
  }

  // clip-path適用（幅縮小 or 高さ縮小）
  parent.style.clipPath = (hInset || vInset) ? `inset(${vInset}% ${hInset}%)` : '';

  // ボックス位置
  const posX = parseFloat(els.inputImgPosX.value) || 0;
  const posY = parseFloat(els.inputImgPosY.value) || 0;
  parent.style.transform = (posX || posY)
    ? `translate(${posX}px, ${posY}px)`
    : '';

  saveCurrentSlideState();

  // 編集インジケータ（保存後に適用 → innerHTMLに含まれない）
  parent.style.filter = IMG_EDIT_FILTER;
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

function createDropZone(gapIndex) {
  const zone = document.createElement('div');
  zone.className = 'drop-zone';
  zone.dataset.gapIndex = gapIndex;

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    activateDropZone(gapIndex);
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('active');
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    executeDropAtGap(gapIndex);
  });

  return zone;
}

function renderSidebar() {
  els.slideList.innerHTML = '';

  state.slides.forEach((slide, index) => {
    // スライドの前にドロップゾーンを挿入
    els.slideList.appendChild(createDropZone(index));

    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'thumb-item';
    thumbContainer.draggable = true;
    thumbContainer.onclick = () => loadSlide(index);

    // ドラッグ&ドロップによる並べ替え
    thumbContainer.addEventListener('dragstart', (e) => {
      dragSourceIndex = index;
      thumbContainer.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    // サムネイルの上1/4・下1/4もドロップ範囲として扱う
    thumbContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (dragSourceIndex === null || dragSourceIndex === index) return;
      const rect = thumbContainer.getBoundingClientRect();
      const ratio = (e.clientY - rect.top) / rect.height;
      if (ratio < 0.25) {
        activateDropZone(index);       // 上1/4 → この位置の前に挿入
      } else if (ratio > 0.75) {
        activateDropZone(index + 1);   // 下1/4 → この位置の後に挿入
      } else {
        clearDragIndicators();          // 中央部分はドロップ対象外
      }
    });

    thumbContainer.addEventListener('dragleave', () => {
      // dragleaveはdrop-zone側のdragoverで処理されるので何もしない
    });

    thumbContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      if (dropTargetIndex !== null) {
        executeDropAtGap(dropTargetIndex);
      } else {
        clearDragIndicators();
      }
    });

    thumbContainer.addEventListener('dragend', () => {
      thumbContainer.classList.remove('dragging');
      clearDragIndicators();
      cancelDragAutoScroll();
      dragSourceIndex = null;
    });

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

  // 最後のスライドの後にもドロップゾーンを追加
  els.slideList.appendChild(createDropZone(state.slides.length));

  setTimeout(updateThumbnailsScale, 0);
  document.getElementById('total-slides').textContent = state.slides.length;
}

function updateThumbnail(index) {
  const thumbs = Array.from(els.slideList.querySelectorAll('.thumb-item'));
  if (thumbs[index]) {
    const shadow = thumbs[index].querySelector('.thumb-preview').shadowRoot;
    const frame = shadow.querySelector('.slide-frame');
    if (frame) frame.innerHTML = state.slides[index].content;
  }
}

function setupEventListeners() {
  // ドラッグ中の自動スクロール（サイドバー全域＝ヘッダー・フッター含む）
  const sidebar = els.slideList.closest('.sidebar');
  sidebar.addEventListener('dragover', (e) => {
    if (dragSourceIndex !== null) startDragAutoScroll(e.clientY, sidebar);
  });
  sidebar.addEventListener('dragleave', (e) => {
    // サイドバー外に出たらスクロール停止
    if (!sidebar.contains(e.relatedTarget)) cancelDragAutoScroll();
  });
  sidebar.addEventListener('drop', () => cancelDragAutoScroll());

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

  // === インライン書式パネル（選択テキスト用） ===
  // mousedown + preventDefault でフォーカスを奪わず選択範囲を保持
  els.btnTextBold.addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.execCommand('bold');
    saveCurrentSlideState();
  });

  els.btnTextItalic.addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.execCommand('italic');
    saveCurrentSlideState();
  });

  els.btnTextUnderline.addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.execCommand('underline');
    saveCurrentSlideState();
  });

  els.colorSwatches.forEach(swatch => {
    swatch.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const color = swatch.dataset.color;
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('foreColor', false, color);
      saveCurrentSlideState();
    });
  });

  // === ブロック編集パネル（テキストボックス用） ===
  // ヘルパー: スライダーと数値入力の双方向バインド
  function bindSliderAndInput(slider, numInput, applyFn) {
    slider.addEventListener('input', (e) => {
      numInput.value = e.target.value;
      applyFn(e.target.value);
    });
    numInput.addEventListener('input', (e) => {
      slider.value = e.target.value;
      applyFn(e.target.value);
    });
  }

  bindSliderAndInput(els.inputTextFontSize, els.valFontSize, (v) => {
    if (!activeTextElement) return;
    activeTextElement.style.fontSize = v + 'px';
    saveCurrentSlideState();
  });

  bindSliderAndInput(els.inputTextLineHeight, els.valLineHeight, (v) => {
    if (!activeTextElement) return;
    activeTextElement.style.lineHeight = v;
    saveCurrentSlideState();
  });

  function applyTextPosition() {
    if (!activeTextElement) return;
    const y = els.inputTextPosY.value || 0;
    const x = els.inputTextPosX.value || 0;
    activeTextElement.style.transform = `translate(${x}px, ${y}px)`;
    saveCurrentSlideState();
  }

  bindSliderAndInput(els.inputTextPosY, els.valTextPosY, () => applyTextPosition());
  bindSliderAndInput(els.inputTextPosX, els.valTextPosX, () => applyTextPosition());

  els.btnCloseTextPanel.addEventListener('click', closeTextPanelFunc);

  bindSliderAndInput(els.inputImgWidth, els.valImgWidth, () => applyImageFrame());
  bindSliderAndInput(els.inputImgHeight, els.valImgHeight, () => applyImageFrame());
  bindSliderAndInput(els.inputImgPosY, els.valImgPosY, () => applyImageFrame());
  bindSliderAndInput(els.inputImgPosX, els.valImgPosX, () => applyImageFrame());

  // リセットボタン: スライダーをデフォルト値に戻す
  document.querySelectorAll('.btn-reset').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sliderId = btn.dataset.slider;
      const valId = btn.dataset.val;
      const defaultVal = btn.dataset.default;
      const slider = document.getElementById(sliderId);
      if (slider) {
        slider.value = defaultVal;
        slider.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (valId) {
        const valInput = document.getElementById(valId);
        if (valInput) valInput.value = defaultVal;
      }
    });
  });

  // エクスポート
  els.btnExportHtml.addEventListener('click', () => els.exportModal.classList.remove('hidden'));
  els.btnExportConfirm.addEventListener('click', () => {
    handleExport(els.checkPresentationMode.checked);
    els.exportModal.classList.add('hidden');
  });
  els.btnExportCancel.addEventListener('click', () => els.exportModal.classList.add('hidden'));
  els.btnCloseExportModal.addEventListener('click', () => els.exportModal.classList.add('hidden'));

  // 印刷設定モーダル
  els.btnPrint.addEventListener('click', () => els.printModal.classList.remove('hidden'));
  els.printLayoutCards.forEach(card => {
    card.addEventListener('click', () => {
      els.printLayoutCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
  els.btnPrintConfirm.addEventListener('click', () => {
    const selected = document.querySelector('input[name="print-layout"]:checked');
    els.printModal.classList.add('hidden');
    handlePrint(parseInt(selected.value));
  });
  els.btnPrintCancel.addEventListener('click', () => els.printModal.classList.add('hidden'));
  els.btnClosePrintModal.addEventListener('click', () => els.printModal.classList.add('hidden'));

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

function handlePrint(slidesPerPage = 1) {
  const iframe = els.printFrame;
  const doc = iframe.contentWindow.document;

  const layouts = {
    1: { orientation: 'landscape', cols: 1, rows: 1 },
    4: { orientation: 'portrait',  cols: 2, rows: 2 },
    6: { orientation: 'portrait',  cols: 2, rows: 3 },
    8: { orientation: 'portrait',  cols: 2, rows: 4 },
  };
  const layout = layouts[slidesPerPage] || layouts[1];

  // globalStylesから@pageルールとbody/htmlルールを除去（印刷CSS競合防止）
  const printSafeStyles = state.globalStyles
    .replace(/@page\s*\{[^}]*\}/gi, '')
    .replace(/(?:^|\})\s*(?:html|body)\s*\{[^}]*\}/gi, '}');

  // 配付資料レイアウトの寸法計算 (A4縦: 210mm x 297mm)
  const cellW = 97;    // mm
  const cellH = 68.6;  // mm (A4比率: 97 / 1.414)
  const gap = 3;       // mm
  const marginX = ((210 - (cellW * 2 + gap)) / 2).toFixed(1);
  const marginY = 8;   // mm
  const zoomFactor = (cellW / 297).toFixed(6);

  let bodyHtml = '';
  if (slidesPerPage === 1) {
    bodyHtml = state.slides.map(s =>
      `<div class="print-page">${s.content}</div>`
    ).join('');
  } else {
    const chunks = [];
    for (let i = 0; i < state.slides.length; i += slidesPerPage) {
      chunks.push(state.slides.slice(i, i + slidesPerPage));
    }
    bodyHtml = chunks.map(chunk => {
      const cells = chunk.map(s =>
        `<div class="grid-cell"><div class="cell-slide" style="zoom:${zoomFactor}">${s.content}</div></div>`
      ).join('');
      return `<div class="handout-page">${cells}</div>`;
    }).join('');
  }

  const css = `
    @page { size: A4 ${layout.orientation}; margin: 0; }
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
      grid-template-columns: repeat(${layout.cols}, ${cellW}mm);
      grid-template-rows: repeat(${layout.rows}, ${cellH}mm);
      column-gap: ${gap}mm;
      padding: 0 ${marginX}mm;
      align-content: space-evenly;
    }
    .grid-cell {
      width: ${cellW}mm; height: ${cellH}mm;
      overflow: hidden; border: 0.5px solid #ccc;
      background: white;
    }
    .cell-slide {
      width: 297mm; height: 210mm;
      overflow: hidden;
    }
    ${printSafeStyles}
  `;

  doc.open();
  doc.write(`<html><head><style>${css}</style></head><body>${bodyHtml}</body></html>`);
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
