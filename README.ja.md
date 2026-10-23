# Start Page

[English](README.md)

作者のブラウザのスタートページ。<https://sp.ycookiey.com>でCloudflare Pagesから配信している。このリポジトリは作者のリンクを含むページそのもの。

## 特徴

- CSSとページのスクリプトを`index.html`の中に直接書いている。フレームワークもビルドの手順も無い
- ページ上部の検索欄: ページのどこで文字を打っても、入力は検索欄に入る。リンクのあいまい検索には[yfuzzy](https://github.com/ycookiey/yfuzzy)のバンドル`yfuzzy.min.js`を使う。検索欄から開いた回数が多いリンクは、検索結果での順位が少し上がる
- Enterで選択中の検索結果を開く。URLの形の入力は入力したURLを開き、一致するリンクが無い入力はGoogleで検索する
- 文字を打った後にEscを押し、続けて`g`・`x`・`n`のどれかを押すと、入力をGemini・Grok・Naniに送る。入力の前に`g `のようにキーと空白を付けてEnterを押しても同じ
- 検索結果のリンクのアイコンは`favicons/<ホスト名>.png`・`.svg`・`.ico`から、ブラウザの処理が空いたときに読み込む。通信量を減らす設定(Save-Data)が有効なら読み込まない
- WebアプリのマニフェストとService Workerを置いている。Service Workerはページと、ページが読み込むファイルをキャッシュに保存し、キャッシュから返す。新しいデプロイを検知するとバナーを表示し、バナーを押すか、検索欄が空のときにEnterを押すと、新しいバージョンを読み込む
- フォントのFrauncesはラテン文字だけに絞ったファイルをこのサイトから配信している。ライトとダークのテーマはOSの設定に従う

`redirect.ycookiey.com/r/`のリンクは作者のサインインが必要で、ほかの人には開けない。

## ライセンス

このリポジトリのために書いたファイルはMIT License([LICENSE](LICENSE))。次の同梱するファイルは、それぞれのライセンスに従う:

- `yfuzzy.min.js`: MIT。ライセンスがMITのwanakanaと、BSD-3-ClauseのMozcのローマ字の表を含む
- `fonts/fraunces-latin.woff2`: Fraunces、[SIL Open Font License 1.1](https://openfontlicense.org/)
- `favicons/`: リンク先のサイトのロゴ。権利は各サイトの持ち主にある
