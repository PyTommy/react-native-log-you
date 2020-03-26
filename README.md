# LogYou

## アプリの概要
LogYouは、ユーザーが自身の活動時間を計測し、日別・カテゴリー別に記録を閲覧するためのアプリです。<br>
v1.0.0では、食事・瞑想・運動・勉強の4項目の時間を計測できるようになっています。

[機能紹介動画（3分）](https://www.youtube.com/watch?v=0NtEcr2sTEY)<br>
[Google Play](https://play.google.com/store/apps/details?id=com.pytommy.logyou)


## 作成の動機
作成の動機は2つあり、一つ目がReact Nativeを使ってモバイルアプリケーションをリリースしてみたかったからです。<br>
もう一つが、自分の活動時間を計測・記録したかったからです。私は、勉強するときにストップウォッチを使って勉強時間を計測し、手書きでノートに毎回記録をしていました。<br>
写真<br>
ただ、記録・閲覧を手書きノートを使って行うのは面倒であると感じ、自分で時間を計測するアプリを作ってみようと思いました。

## 使用技術
- React 16
- React Native
- react-navigation v5
- Redux
- Expo
- SQLite

## 機能紹介

#### ストップウォッチ
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image1.png" alt="demo-image-1" width="200px">
  この画面では、活動時間を計り、記録または棄却することができます。
  画面中部のカテゴリー別の時間には、その日にその活動に費やした時間の類型が表示されています。

#### 特定の日の活動時間要約表示
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image2.png" alt="demo-image-2" width="200px">
  この画面では、特定の日にちのカテゴリー別累計活動時間が表示されています。<br>
  画面最上部にあるbackwardまたはforwardボタンを押すことで、日付を切り替えることができます。

#### 一日の活動履歴詳細表示
  <div>
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image0.png" alt="demo-image-0" width="200px">  
  &nbsp;
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image4.png" alt="demo-image-5" width="200px">
  </div>
  この画面では、特定の日の活動時間詳細を見たり、記録を削除することができます。

#### 特定カテゴリーの記録閲覧
  &nbsp;
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image5.png" width="200px"/>
  <br>この画面では、例えば、「勉強」の時間が日にちごとに表示されます。
  また、無限スクロールが可能であり、スムーズに過去の記録を閲覧することが可能です。

#### 設定
  <img src="https://github.com/PyTommy/react-native-log-you/blob/readmeImages/images/image3.png" width="200px"/>
  この画面でできることは以下の3つです

- AutoStopの設定 (自動的にストップウオッチを停止する時間)
- MinTimeの設定 (活動を記録するための最小経過時間)
- 全記録の削除

AutoStopを30分と設定すると、時間を計測し始めて30分後にストップウオッチが自動的に停止し、時間が保存されます。
MinTimeを1分に設定すると、ストップウオッチの経過時間1分以内だと、記録が保存されないようになります。


## データに関して
#### SQL
```sql
CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY NOT NULL, 
  category TEXT NOT NULL, 
  isoDate TEXT NOT NULL,
  startAt TEXT NOT NULL,
  stopAt TEXT NOT NULL,
  elapsedTime INT NOT NULL 
)
```

#### Snapshot of AsyncStorage
```JSON
{
  "settings": {
    "autoStop": 90,
    "minTime": 0
  }
}
```

#### Snapshot of Redux Store
```javascript
{
  logs: {
    "2020-01-01T15:00:00.000Z": [
      {
        id: '1',
        category: 'Study',
        startAt: '2020-01-01T09:00:00.000Z', // instance of Date
        stopAt: '2020-01-01T10:00:00.000Z', // instance of Date
        isoDate: '2020-01-01T15:00:00.000Z', // ISO String
        elapsedTime: 3600
      },
      {
        id: '2',
        category: 'Meditation',
        startAt: '2020-01-01T10:00:00.000Z', // instance of Date
        stopAt: '2020-01-01T10:30:00.000Z', // instance of Date
        isoDate: '2020-01-01T15:00:00.000Z', // ISO String
        elapsedTime: 1800
      }
    ]
  }, 
  summaries: {
    "2020-01-01T15:00:00.000Z": {
        Study: 3600,
        Meditation: 1800,
        Eating: 0,
        Sports: 0,
    }
  },
  alerts: [
    { 
      id: '123456789', 
      alertType: 'danger', 
      msg: 'Something went wrong!!' 
    }
  ],
  settings: { 
    autoStop: 90, 
    minTime: 0
  }
}
```

## 課題点
### 通信機能がない
短期間でReact Nativeを作成することにフォーカスしていたため、REST APIを作って、オンライン上にもデータを保存していおくということは行っていません。
今後、このアプリを改善していく予定はありませんが、もし、LogYouのweb版を作成することになったら、APIの作成やそれに応じたmobile版の改善を行っていこうと思います。

### マルチディバイスに対応していない
iPhone6とAndroid Studioを用いて、クロスプラットフォームのアプリケーションに仕上げました。しかし、画面サイズの違いには対応しきれておらず、知人にかりたAndroid端末でGoogle StoreからインストールしたLogYouを使ってみた際には、崩れが生じてしまっているところがありました。

### App Storeでリリースできていない
Windowsを使用しているため、App Storeにはリリースしていません。Macbookを購入し、資金と時間に余裕がありましたら、リリースしてみようと思います。
