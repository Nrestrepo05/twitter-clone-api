const users = require('../components/users/network');
const tweets = require('../components/tweets/network');

const routes = (server) => {
  server.use('/tweets', tweets);
  server.use('/users', users);
};

module.exports = routes;
