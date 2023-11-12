const {check, validationResult} = require('express-validator');

exports.Validator = [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
];

exports.validate = (req,res,next) => {
    // Validate user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
}