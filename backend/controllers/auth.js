const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../models");
const User = db.user; 

require("dotenv").config();

const SignUp = async (req, res) => {
    const { email, password } = req.body;

    // Validate if user already exists
    let user = await User.findAll({where:{email:req.body.email}});
    if (user.length !== 0) {
        res.send({message:"Email Already Exist",status:0})
    } else {

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save email and password to database/array
    const newuser = {
      email,
      password: hashedPassword,
    };

    // Do not include sensitive information in JWT
    const accessToken = await JWT.sign(
      { newuser },
      process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 1234 ,
      // {
      //   expiresIn: "10s",
      // }
    );
    newuser.accessToken = accessToken;
    User.create(newuser);

    res.json({
      accessToken,
    });
    }
};
  

const Login = async (req, res) => {
    const { email, password } = req.body;
    console.log('BODY',req.body)

    // Look for user email in the database
    let user = await User.findAll({where:{email:email}});

    if (user.length === 0) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }
  
    // Compare hased password with user password to see if they are valid
    let isMatch = await bcrypt.compare(password, user[0].password);
  
    if (!isMatch) {
      return res.status(401).json({
        errors: [
          {
            msg: "Email or password is invalid",
          },
        ],
      });
    }

    const newuser = {
        email:user[0].email,
        password: user[0].password,
      };
  
    // Send JWT
    const accessToken = await JWT.sign(
      { newuser },
      process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 1234 ,
      // {
      //   expiresIn: "10s",
      // }
    );

    User.update({accessToken:accessToken}, {
        where: { id: user[0].id }
    });

    res.json({
      accessToken,
    });  
}
const Logout = async (req, res) => {
    const header = req.headers['authorization'];  
    const bearer = header.split(' ');
    const token = bearer[1];
    const usertoken = await User.findAll({where:{accessToken:token}});

    if (!usertoken[0]?.id) {
        return res.status(401).json({
          errors: [
            {
              msg: "User not found",
            },
          ],
        });
      }
  
    let body = {
        accessToken:null
    };

    User.update(body, {
        where: { id: usertoken[0]?.id }
      }).then(num => {
    if (num == 1) {
        res.send({
        message: "Logout successfully."
        });
    } else {
        res.send({
            message: `Cannot Logout with id=${id}. Maybe User was not found!`
        });
        }
    });
  
}


module.exports = {
    SignUp,
    Login,
    Logout
};