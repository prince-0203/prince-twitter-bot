require('./openShiftServer.js')();

const fs = require('fs');
const logSymbols = require('log-symbols');
const Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// prince
const prince = {
  screenName: 'prince__0203',
  id: '4637307672'
};

// 日付切取線
const krtr_date = {
  screenName: 'krtr_date',
  id: '194092144'
};

// 日付切取線のツイートを自動リツイート
(() => {
  const stream = twit.stream('statuses/filter', { follow: krtr_date.id });

  stream.on('tweet', (tweet) => {
    if(tweet.user.id_str === krtr_date.id && tweet.text.indexOf('✄------------') === 0) {
      // 自動でリツイート
      twit.post('statuses/retweet/:id', { id: tweet.id_str, trim_user: true }, (err, data) => {
        if(err) {
          console.log(logSymbols.error, 'リツイート中にエラーが発生しました…', err);
        } else {
          console.log(logSymbols.success, 'リツイートに成功しました。', data);
        }
      });
    }
  });

  stream.on('error', (err) => {
    console.log(logSymbols.error, 'Streamでエラーが発生しました…', err);
  });
})();

// 1分ごとにプロフィール画像を変更
(() => {
  fs.readdir('profile_images', (err, imageFileList) => {
    if (err) {
      console.log(logSymbols.error, 'プロフィール画像リストの読み込み中にエラーが発生しました…', err);
    } else {
      const imageFilesBase64 = imageFileList.map((imageFile) => {
        try {
          return fs.readFileSync('profile_images/' + imageFile).toString('base64');
        } catch(err) {
          console.log(logSymbols.error, 'プロフィール画像の読み込み中にエラーが発生しました…', err);
          return null;
        }
      });

      var i = 0;
      setInterval(() => {
        twit.post('account/update_profile_image', { image: imageFilesBase64[i], include_entities: false, skip_status: true }, (err, data) => {
          if(err) {
            console.log(logSymbols.error, 'プロフィール画像の設定中にエラーが発生しました…', err);
          } else {
            console.log(logSymbols.success, 'プロフィール画像の設定に成功しました。', data);
          }

          i++;
          if(i >= imageFilesBase64.length) {
            i = 0;
          }
        });
      }, 1000 * 60);
    }
  });
})();
