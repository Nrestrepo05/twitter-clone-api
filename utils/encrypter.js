const bcrypt = require('bcrypt');

const encrypt = (toEncrypt) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encrypted = bcrypt.hashSync(toEncrypt, salt);
    return encrypted;
  } catch {
    console.error('encrypt error');
    return null;
  }
};

const compare = (toCompare, hash) => bcrypt.compareSync(toCompare, hash);

module.exports = {
  encrypt,
  compare,
};
