const TweetModel = require('./model');

async function getTweet(id) {
  const tweet = await TweetModel.findById(id).populate().populate('user', '-password');
  return tweet;
}

async function addTweet(tweet) {
  const newTweet = await new TweetModel(tweet).save();
  return newTweet;
}

async function getTweets() {
  const tweets = await TweetModel.find().populate('user', '-password');
  return tweets;
}

module.exports = {
  getTweet,
  getTweets,
  addTweet,
};
