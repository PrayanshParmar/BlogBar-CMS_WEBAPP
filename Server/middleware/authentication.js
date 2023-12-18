const {verifyToken} = require('../services/authJwt');


const authentication = (req, res, next) => {
    
    try {
      const token = req.cookies.jwtoken; 
      // console.log(token);
      const data = verifyToken(token);
      req.data = data;
      
      next();
    } catch (error) {
      res.status(403).json({ message: 'Unauthorized' });
      console.log(error);
    }

  };

  module.exports = authentication;
  

  