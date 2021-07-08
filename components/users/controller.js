const store = require('./store');
const { encrypt, compare } = require('../../utils/encrypter');

async function getUserById(id) {
  return store.getUserById(id);
}

async function addUser(user) {
  const newUser = { ...user };
  if (user.password) {
    const encryptedPassword = encrypt(user.password);
    newUser.password = encryptedPassword;
  }
  return store.addUser(newUser);
}

async function login(user) {
  let userResponse;
  if (user.email) {
    userResponse = await store.login(user.email);
  } else if (user.username) {
    userResponse = await store.login(user.username);
  } else {
    throw new Error('user does not exists');
  }
  const passwordCoincidence = compare(user.password, userResponse.password);
  if (passwordCoincidence) {
    return userResponse;
  }
  const error = new Error('credentials do not match');
  error.name = 'CredentialsError';
  throw error;
}

async function updateUser(id, user) {
  const userUpdated = await store.updateUser(id, user);
  return userUpdated;
}

module.exports = {
  addUser,
  login,
  getUserById,
  updateUser,
};
