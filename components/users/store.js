const { Types } = require('mongoose');
const UserModel = require('./model');

async function login(id) {
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
  let user;
  if (Types.ObjectId.isValid(id)) {
    user = await UserModel.findById(id, '-password');
  } else {
    user = await UserModel.findOne({ username: id }, '-password');
  }
  return user;
}

function addUser(user) {
  const newUser = new UserModel(user);
  return newUser.save();
}

async function updateUser(id, user) {
  const userUpdated = await UserModel.findOneAndUpdate({ _id: id }, user, { new: true });
  return userUpdated;
}

module.exports = {
  login,
  getUserById,
  addUser,
  updateUser,
};
