const UserModel = require('./model');

async function getUser(id) {
  const searchExpression = {
    $or: [
      { email: id },
      { username: id },
    ],
  };
  const user = await UserModel.findOneAndUpdate(searchExpression, { lastTimeLogin: Date.now() });
  return user;
}

async function getUserById(id) {
  const user = await UserModel.findById(id);
  return user;
}

function addUser(user) {
  const newUser = new UserModel(user);
  return newUser.save();
}

module.exports = {
  getUser,
  getUserById,
  addUser,
};
