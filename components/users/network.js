const { Router } = require('express');
const controller = require('./controller');
const response = require('../../network/responses');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await controller.getUserById(id);
    if (!user) {
      const userDoesNotExist = new Error('A user with this ID does not exist');
      userDoesNotExist.name = 'UserDoesNotExist';
      throw userDoesNotExist;
    }
    return response.success(req, res, user, 200);
  } catch (error) {
    let errorMessage;
    let statusCode;

    if (error.name === 'UserDoesNotExist') {
      errorMessage = error.message;
      statusCode = 400;
    } else {
      errorMessage = 'Server Error';
      statusCode = 500;
    }

    return response.error(req, res, errorMessage, statusCode, error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userUpdated = await controller.updateUser(id, user);
    if (!userUpdated) {
      const userDoesNotExist = new Error('A user with this ID does not exist');
      userDoesNotExist.name = 'UserDoesNotExist';
      throw userDoesNotExist;
    }
    return response.success(req, res, userUpdated, 200);
  } catch (error) {
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      if (error.message.includes('username')) {
        errors.username = 'username must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.username) errors.username = error.errors.username.message;
      if (error.errors.password) errors.password = error.errors.password.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const userResponse = await controller.addUser(req.body.user);
    return response.success(req, res, userResponse, 201);
  } catch (error) {
    const errors = {};
    let statusCode;
    if (error.name === 'MongoError') {
      if (error.message.includes('username')) {
        errors.username = 'username must be unique';
      }
      if (error.message.includes('email')) {
        errors.email = 'email must be unique';
      }
    }

    if (error.name !== 'MongoError') {
      if (error.errors.name) errors.name = error.errors.name.message;
      if (error.errors.email) errors.email = error.errors.email.message;
      if (error.errors.username) errors.username = error.errors.username.message;
      if (error.errors.password) errors.password = error.errors.password.message;
    }

    if (errors) { statusCode = 400; } else { statusCode = 500; }

    return response.error(req, res, errors || 'Server Error', statusCode, error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user } = req.body;
    const userResponse = await controller.login(user);
    if (!user) {
      const userDoesNotExist = new Error('A user with this ID does not exist');
      userDoesNotExist.name = 'UserDoesNotExist';
      throw userDoesNotExist;
    }
    return response.success(req, res, userResponse, 200);
  } catch (error) {
    let errorMessage;
    let statusCode;

    if (error.name === 'UserDoesNotExist') {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.name === 'CredentialsError') {
      errorMessage = error.message;
      statusCode = 400;
    } else {
      errorMessage = 'Server Error';
      statusCode = 500;
    }

    return response.error(req, res, errorMessage, statusCode, error.message);
  }
});

module.exports = router;
