const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, secret);
      req.user = user;
    } catch (err) {
      console.log(err);
    }
  }
  next();
};
