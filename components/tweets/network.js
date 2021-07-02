const { Router } = require('express');
const controller = require('./controller');
const response = require('../../network/responses');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tweets = await controller.getTweets();
    return response.success(req, res, tweets);
  } catch (error) {
    return response.error(req, res, 'Server Error', 500, error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await controller.getTweetById(id);
    if (!tweet) {
      const tweetDoesNotExist = new Error('a tweet with this ID does not exist');
      tweetDoesNotExist.name = 'TweetDoesNotExist';
      throw tweetDoesNotExist;
    }
    return response.success(req, res, tweet, 200);
  } catch (error) {
    let errorMessage;
    let statusCode;

    if (error.name === 'TweetDoesNotExist') {
      errorMessage = error.message;
      statusCode = 404;
    } else if (error.name === 'CastError') {
      errorMessage = 'invalid ID';
      statusCode = 404;
    } else {
      errorMessage = 'Server Error';
      statusCode = 500;
    }

    return response.error(req, res, errorMessage, statusCode, error.message);
  }
});

router.post('/new', async (req, res) => {
  try {
    const tweet = await controller.addTweet(req.body);
    return response.success(req, res, tweet, 201);
  } catch (error) {
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      if (error.message.includes('phone_number')) {
        errors.phone_number = 'phone number must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.last_name) errors.last_name = error.errors.last_name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.phone_number) errors.phone_number = error.errors.phone_number.message;
      if (error.errors.company) errors.message = error.errors.company.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

module.exports = router;
