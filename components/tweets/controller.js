const store = require('./store');

async function getTweets() {
  const tweets = await store.getTweets();
  return tweets;
}

async function getTweetById(id) {
  return store.getTweet(id);
}

async function getTweetsByUser(userId) {
  return store.getTweetsByUser(userId);
}

async function addTweet(tweet) {
  return store.addTweet(tweet);
}

async function likeTweet(tweetId, userId) {
  return store.likeTweet(tweetId, userId);
}

module.exports = {
  addTweet,
  getTweetById,
  getTweets,
  likeTweet,
  getTweetsByUser,
};
