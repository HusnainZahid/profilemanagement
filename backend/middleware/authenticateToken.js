const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const User = db.user; 

const authToken = async (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {

      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;

      if (!token) {
        res.status(401).json({
          errors: [
            {
              msg: "Token not found",
            },
          ],
        });
      } else {
    
      const usertoken = await User.findAll({where:{accessToken:token}});
      const tokenMatch = token == usertoken[0]?.accessToken;
      console.log(tokenMatch);

      if (tokenMatch === false) {
        res.status(401).json({
          errors: [
            {
              msg: "Invalid Token",
            },
          ],
        });
      } else {
      // Authenticate token
      try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 1234);
        req.user = user.email;
        next();
      } catch (error) {
        res.status(403).json({
          errors: [
            {
              msg: "Invalid token",
            },
          ],
        });
      }
    }
  }
  } else {
      //If header is undefined return Forbidden (403)
      // res.sendStatus(403)
      res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
  }
};

module.exports = authToken;
