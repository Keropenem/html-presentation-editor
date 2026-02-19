# SlideCraft V2 再構築計画

CSSの競合問題を根本解決し、堅牢で美しいプレゼンテーションエディターを構築する。

## 1. コアアーキテクチャ: Shadow DOM
- **目的**: エディターUIとスライドコンテンツの完全な分離。
- **実装**:
  - メインエディター画面 (`#current-slide-view`) を Shadow Host とする。
  - サムネイル (`.slide-thumb`) もそれぞれ独立した Shadow Host、または iframe、あるいは画像化して表示する（パフォーマンス的には画像化か、軽量なShadow DOM）。
  - インポートされたHTMLから `<style>` と `body` 内コンテンツを抽出し、Shadow DOM 内に展開する。
  - インポートCSSの `body` セレクタは `:host` またはラッパー要素 `.slide-frame` に置換して適用する。

## 2. 機能要件と実装方針

### 2.1 データ構造
- スライドデータはオブジェクト配列で管理。
  - `id`: ユニークID
  - `htmlContent`: スライドの中身 (HTML文字列)
  - `cssContent`: スライド固有のCSS (または全体共通CSS)
  - `thumbnail`: (オプション) サムネイル用データURL

### 2.2 エディターUI (App Shell)
- **テクノロジー**: Vanilla HTML/CSS/JS
- **デザイン**: ダークモードベース、グラスモルフィズム、アクセントカラー（Indigo/Purple）。
- **構成**:
  - `Sidebar`: スライド一覧、追加ボタン、インポートボタン。
  - `Main`: 現在のスライド表示エリア（中央配置、ズーム機能）。
  - `Toolbar/Modal`: 画像編集、エクスポート設定など。

### 2.3 スライドレンダリング (Renderer)
- `renderSlide(container, slideData, globalStyles)` 関数を作成。
- Shadow Root を作成 (`container.attachShadow({ mode: 'open' })`)。
- スタイル (`globalStyles` + スライド固有) を `<style>` タグとして注入。
- HTMLコンテンツを注入。
- `body` タグのスタイルを `:host` にマッピングする簡易パーサーを実装。

### 2.4 インポート機能
- HTMLファイル読み込み (`FileReader`)。
- `DOMParser` で解析。
- `<style>` タグの中身を抽出して `globalStyles` として保持。
- 各スライド（`.slide` や `<section>`）を配列化。

### 2.5 印刷・PDFエクスポート
- 印刷ボタン押下時:
  - 隠し `iframe` を生成。
  - 全スライドのHTMLとCSSを `iframe` 内に書き込む。
  - `iframe` 内で `@page { size: A4 landscape; margin: 0; }` を適用。
  - `iframe.contentWindow.print()` を実行。
  - これにより、エディターの表示状態に関わらず、完璧なA4出力を保証。

### 2.6 画像編集
- Shadow DOM 内の要素に対するイベントリスナー登録が必要。
- `composed: true` なイベントや、Shadow Root への直接リスナー登録で対応。

## 3. 実装ステップ

1. **プロジェクト初期化**: `index.html`, `style.css` (UI用), `main.js` のリセット。
2. **UI構築**: アプリの枠組み（サイドバー、メインエリア）を作成。
3. **レンダラー実装**: Shadow DOM を使ったスライド表示ロジックの実装。
4. **状態管理**: スライドデータの保持と操作（追加、切り替え）。
5. **インポート機能**: 外部HTMLのパースとロード。
6. **編集機能**: テキスト編集（contenteditable）、画像編集。
7. **印刷・エクスポート**: Iframe活用による安全な出力。

