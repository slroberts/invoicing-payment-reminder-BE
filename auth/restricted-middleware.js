const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';

    if (token) {
      jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
        if (error) {
          next({
            apiCode: 401,
            apiMessage: 'invalid or missing credentials',
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      next({
        apiCode: 401,
        apiMessage: 'invalid or missing credentials',
      });
    }
  } catch (error) {
    next({
      apiCode: 500,
      apiMessage: 'error validating credentials',
      ...error,
    });
  }
};
