const TweetModel = require('./model');
const UserModel = require('../users/model');

async function getTweet(id) {
  const tweet = await TweetModel.findById(id).populate('user', '-password');
  return tweet;
}

async function addTweet(tweet) {
  const newTweet = await new TweetModel(tweet).save();
  return newTweet;
}

async function getTweets() {
  const tweets = await TweetModel.find().populate('user', '-password').sort('-date');
  return tweets;
}

async function getTweetsByUser(userId) {
  const tweets = await TweetModel.find({ user: userId }).populate('user', '-password').sort('-date');
  return tweets;
}

async function likeTweet(tweetId, userId) {
  const tweet = await TweetModel.findById(tweetId);
  const user = await UserModel.findById(userId);
  let tweetUpdated;
  if (tweet && user && tweet.likes.includes(userId)) {
    tweetUpdated = await TweetModel.findOneAndUpdate(
      { _id: tweetId }, { $pull: { likes: userId } }, { new: true },
    );
  } else if (tweet && user && !tweet.likes.includes(userId)) {
    tweetUpdated = await TweetModel.findOneAndUpdate(
      { _id: tweetId }, { $push: { likes: userId } }, { new: true },
    );
  } else {
    return null;
  }
  return tweetUpdated;
}

module.exports = {
  getTweet,
  getTweets,
  addTweet,
  likeTweet,
  getTweetsByUser,
};
