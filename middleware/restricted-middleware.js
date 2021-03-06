const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRETS || 'SECRET PASSWORD'

    jwt.verify(authorization, secret, function(err, decodedToken){
      if (err) {
        res.status(401).json({message: "Invalid Token"})
      } else {
        req.token = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({message: 'Please log in then try again!'})
  };
};