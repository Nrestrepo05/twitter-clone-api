const mongoose = require('mongoose');

const { Schema } = mongoose;

const TweetSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: [true, 'message is required'],
    minLength: [1, 'message should have at least 2 characters'],
    maxLength: [250, 'message is too long'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TweetModel = mongoose.model('tweets', TweetSchema);

module.exports = TweetModel;
