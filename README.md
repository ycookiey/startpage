# Start Page

超高速ロードを実現するブラウザスタートページ（フロントエンド）です。

## 構成
- URL: `https://sp.ycookiey.com`
- プラットフォーム: Cloudflare Pages
- 特徴: 究極のパフォーマンス（インラインCSS、最小HTML）、PWA対応
- **バックエンド (Private)**: [ycookiey/redirect-api](https://github.com/ycookiey/redirect-api)

## メンテナンス手順

### 1. リンクの追加・変更
`index.html` を直接編集してください。
プライベートリンクを追加する場合は、まず `redirect-api` 側でIDを発行し、そのIDを使って以下のように記述します。

```html
<div class="section">
    <h2>Category</h2>
    <div class="link-grid">
        <!-- パブリックリンク -->
        <a href="https://google.com">Google</a>
        
        <!-- プライベートリンク (API経由) -->
        <a href="https://redirect.ycookiey.com/r/ランダムID">表示名</a>
    </div>
</div>
```

### 2. ロゴ（favicon）の追加
`favicons/` にホスト名ベースで配置してください。
例: `https://github.com/` → `favicons/github.com.png`

一括取得する場合は以下を実行します。
```bash
pwsh ./scripts/fetch-favicons.ps1
```

取得元を切り替える場合は `-Provider` を指定できます。
```bash
pwsh ./scripts/fetch-favicons.ps1 -Provider duckduckgo
```

### 3. 検索ライブラリ (yfuzzy) の更新
リンク検索は [@ycookiey/yfuzzy](https://github.com/ycookiey/yfuzzy) 同梱のブラウザ向けバンドル `yfuzzy.min.js` を使用しています。
最新版に取得し直すには以下を実行します (使用中のバージョンはファイル先頭のコメントで確認できます)。

```bash
curl -Lo yfuzzy.min.js https://unpkg.com/@ycookiey/yfuzzy/dist/yfuzzy.min.js
```

`sw.js` のプリキャッシュ対象のため、更新時は `version.json` / `sw.js` のバージョンも上げます (pre-commit hook が検知します)。

### 4. ローカル確認
Node.jsが必要です。
```bash
npx serve .
```
`http://localhost:3000` で確認できます。

### 5. デプロイ
```bash
npx wrangler pages deploy . --project-name startpage --branch main
```
Cloudflareアカウントへのログインが求められた場合は、画面の指示に従ってください。
