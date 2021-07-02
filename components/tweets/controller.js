const store = require('./store');

async function getTweets() {
  const tweets = await store.getTweets();
  return tweets;
}

async function getTweetById(id) {
  return store.getTweet(id);
}

async function addTweet(tweet) {
  return store.addTweet(tweet);
}

module.exports = {
  addTweet,
  getTweetById,
  getTweets,
};
