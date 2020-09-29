# シンプルに生のJavascriptでSVGを外部ファイル化する方法（jQuery, Ajax通信を使用しない）

SVGを`index.html`に直書きするのが嫌でネットで調べたら、PHPかjQueryの`load()`、Javascriptの`XHttpRequest()`しかなかった（ローカル内でget通信するのは気持ち悪い）ので自分なりにベストプラクティスを考えてみた。

## まえがき
私は新卒2ヶ月で会社を辞めて、今無職である。今日がちょうど無職になってから90日目である。詳しくはideatrendに上げた[記事]()に書いてある。
そして前職はエンジニアとは関係なく、今は趣味プログラマーで在宅でクラウドワークスでもらったPythonで書かれたシステムのコード解析・エラー改修を継続して行ってる。ほぼボランティアに近い。CS学士ない、文系卒、エンジニア職の未経験の人間が書いている。

なのでこの記事は知見の共有として成り立てばこれほど嬉しい事はないが、こんな方法考えたけど、これってセキュリティ的とかエンジニアとしてはこういった書き方はしないな等、確かめる意味合いが強いので現役のエンジニアからアドバイスが頂けると嬉しい。

### Javascriptでしか書けない理由
現在、Youtubeの動画をダウンロードできるPythonスクリプトをデスクトップアプリにしようとしている。eelというelectronライクなライブラリーを使用してコードを書いてるためフロントエンドにhtml, css, jsが使用できる。eelの裏ではbottleが動作しているみたいなのでflaskみたいにtemplate構文が使用できればPHPの`incluude()`みたなことができるかもしれないが、最近ES6を勉強したのでせっかくならその知識を生かせないかと考えた次第である。

## コード
まえがきが長い割に内容はシンプルなので、コードを提示してから説明する。

**index.html**
ここはターゲットとする`h1`タグがあればいい。

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>AddSVG</title>
	</head>
	<body>
		<h1>Hello world🔥</h1>

	<script src="svgs/object-svgs.js"></script>
	<script src="scripts/addsvg.js"></script>
	</body>
	</html>

**object-svg.js**
SVGファイルで保存するのではなく、JSのオブジェクトにSVGで必要な要素を文字列リスト形式で格納する。これを`svg.returnAll()`でまとめて返す構造になっている。

	const svgs = {
		//allの中にsvgのパスを格納していけば外部ファイルに追加していける。
		all: ['\
					<defs>\
						<symbol id="download" viewBox="0 0 164 45">\
							<path d="M0 3C0 1.34315 1.33152 0 2.98838 0C15.6933 0 52.8204 0 82 0C111.114 0 148.441 0 161.007 0C162.664 0 164 1.34315 164 3V42C164 43.6569 162.657 45 161 45H3C1.34314 45 0 43.6569 0 42V3Z" />\
						</symbol>\
					</defs>\
				'
			],
		
		returnAll: function() {
			return this.all.reduce(function(sum, svg) {
				return sum + svg
			}, '')
			
		} 
		
	}

**addsvg.js**
ここで大事なのは`document.createElementNS()`これで`svg`タグを作成しないとsvgが上手く読み込めなくなる。`document.createElement()`で作成したsvgタグで囲っても上手く読み込まれない。出来上がる`html`ファイルに検証をかけても2つの違いは分らないため、ここで時間を浪費した。
下記のコードで`h1`タグの上部すなわち`body`の直下に配置することができる。なぜか`insertAfter()`がなくて`body`直下にできなかった。


	const svgAll = svgs.returnAll()

	function addElement () { 
		// 新しい div 要素を作成します 
		const newDiv = document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
		newDiv.innerHTML = svgAll; 
		const h1 = document.getElementsByTagName('h1')[0];
		document.body.insertBefore(newDiv, h1);
	}

		
	document.addEventListener('DOMContentLoaded', addElement);


### 参照
[document.createElementNS()-MDN](https://developer.mozilla.org/ja/docs/Web/API/Document/createElementNS)

最後まで読んで下さりありがとうございました。
記事に関するコメント等は

🕊：[Twitter](https://twitter.com/Unemployed_jp)
📺：[Youtube](https://www.youtube.com/channel/UCT3wLdiZS3Gos87f9fu4EOQ/featured?view_as=subscriber)
📸：[Instagram](https://www.instagram.com/unemployed_jp/)
👨🏻‍💻：[Github](https://github.com/wimpykid719?tab=repositories)

でも受け付けています。どこかにはいます。