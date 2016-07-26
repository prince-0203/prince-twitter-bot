require('./openShiftServer.js')();

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

  stream.on('tweet', function(tweet) {
    // 自動でリツイート
    twit.post('statuses/retweet/:id', { id: tweet.id_str, trim_user: true }, function (err, data, response) {
      if(err) {
        console.log(logSymbols.error, 'リツイート中にエラーが発生しました…', err);
      } else {
        console.log(logSymbols.success, 'リツイートに成功しました。', data);
      }
    });
  });

  stream.on('error', function(err) {
    console.log(logSymbols.error, 'Streamでエラーが発生しました…', err);
  });
})();
