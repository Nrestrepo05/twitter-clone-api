const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name is required'],
    minLength: [1, 'name should have at least 2 characters'],
    maxLength: [50, 'name is too long'],
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'username must be unique'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email is required'],
    unique: [true, 'email must be unique'],
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email must be valid'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastTimeLogin: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
