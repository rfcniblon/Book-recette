const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET;

require('dotenv').config();

module.exports = function (req, res, next) {
  const header = req.headers['authorization'];
  if (header !== undefined) {
    let tab = header.split(' ');
    let token = tab[1];
    req.token = token;
    jwt.verify(token, jwtsecret, (err, authenticationData) => {
      if (err) {
        res.status(401).send('Unauthorized: ' + err.toString());
      } else {
        req.authenticationData = authenticationData;
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
};
