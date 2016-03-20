# OpenShift上のNode.jsを使用したTwitterBotのサンプル

## 使い方
### 1. Node.jsのバージョンを指定
このリポジトリではNode.jsのバージョンは4.4.0になっています。変更する場合はこのリポジトリをForkし、以下のファイルを変更してください。

- `package.json`の11行目
- `nodejs-4-lts-openshift/.openshift/markers/NODEJS_VERSION`の5行目

### 2. OpenShift client tools (rhc)のインストール
まだインストールしていない場合、<a href="https://developers.openshift.com/en/getting-started-overview.html" target="_blank">こちら</a>の指示に従ってOpenShift client tools (rhc)をインストールしてください。
なお、現時点でWindowsバージョンは正常に動作しないようですので、Windowsを使用している場合はCygwin Terminal上で以下のコマンドでインストールし、OpenShift関連の操作はCygwin Terminalを使用して行ってください。

```shell
$ gem install rhc
```

### 2. NameSpaceの作成
まだNameSpaceを作成していない場合は、以下のコマンドで作成してください。

```shell
rhc domain create <yournamespace>
```

### 3. アプリケーションの作成
OpenShift上でアプリケーションを作成します。OpenShiftに登録した後<a href="https://openshift.redhat.com/app/console/application_type/cart!nodejs-0.10" target="_blank">こちら</a>にアクセスし、以下の通り入力してください。

| 項目                             | 内容                                 |
|----------------------------------|--------------------------------------|
| Application name                 | アプリの名前です。                   |
| Optional URL to a Git repository | 通常は`https://github.com/prince-0203/nodejs-4-lts-openshift.git`としてください。1番の手順でForkした場合は、そのリポジトリのURLにしてください。 |
| Branch/tag                       | `master`としてください。             |
| Scaling                          | 変更せず`No scaling`としてください。 |
| Region                           | サーバーの(物理的な)場所です。<a href="https://docs.aws.amazon.com/ja_jp/general/latest/gr/rande.html" target="_blank">こちら</a>の表から最適な場所を確認してください。 |

入力が終わったら、`Create Application`をクリックしてください。

### 4. 完了
GitリポジトリのURLが表示されるので、Cloneして自由に編集してください。ただし、以下の点に気を付けてください。
- アプリはプッシュ時に自動でデプロイされます。
- `package.json`の`scripts.start`に書かれているコマンドがデプロイ後に自動で開始されます。
- `index.js`のHTTPサーバのコードはデプロイ後の自動動作確認に必要なので、削除しないでください。削除するとデプロイ(プッシュ)に失敗します。TwitterBotのコードはその下に書いてください。
