const store = require('./store');
const { encrypt, compare } = require('../../utils/encrypter');

async function getUserById(id) {
  return store.getUser(id);
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
    userResponse = await store.getUser(user.emailemail);
  } else if (user.username) {
    userResponse = await store.getUser(user.username);
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

module.exports = {
  addUser,
  login,
  getUserById,
};
