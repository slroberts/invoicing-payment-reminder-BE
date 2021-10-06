const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');
const { BCRYPT_ROUNDS, JWT_SECRET } = process.env;

// Register user
router.post('/register', async (req, res, next) => {
  const user = req.body;

  // Checking to see if users exists
  const userExist = await Users.findBy({ email: user.email }).first();
  if (userExist) {
    res.status(400).json({ message: 'user already exists, please log in!' });
  }

  // Securing password
  const rounds = BCRYPT_ROUNDS ? parseInt(BCRYPT_ROUNDS) : 10;
  const hash = bcryptjs.hashSync(user.password, rounds);
  user.password = hash;

  // Validating user
  try {
    if (isValid(user)) {
      const newUser = await Users.add(user);
      res.status(201).json({
        auth: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } else {
      next({
        apiCode: 400,
        apiMessage: 'name, email or password missing',
      });
    }
  } catch (error) {
    next({ apiCode: 500, apiMessage: 'error saving new user', ...error });
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // Validating user
  try {
    // Checking if user is valid
    if (!isValid(req.body)) {
      next({ apiCode: 400, apiMessage: 'email or password invalid' });
    } else {
      const user = await Users.findBy({ email }).first();

      // checking if user and password match
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: 'Welcome!',
          auth: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          token: token,
        });
      } else {
        next({ apiCode: 401, apiMessage: 'invalid credentials' });
      }
    }
  } catch (error) {
    next({ apiCode: 500, apiMessage: 'db error logging in', ...error });
  }
});

// Generate Token
function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  // Getting Secret from .env file
  const secret = JWT_SECRET;

  // Set expiration to 1 day
  const options = {
    expires: '1d',
  };

  //Constructing Token
  const token = jwt.sign(payload, secret, options);

  return token;
}

module.exports = router;
