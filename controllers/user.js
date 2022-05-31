const User = require("../models/user");
const { validationResult } = require("express-validator");

const error = require("../util/error-handler");
const { userExist } = require("../util/finder");

module.exports.userSignUp = async (req, res, next) => {
  const email = req.body.email;

  try {
    // Check for Validation errors
    const validationErrors = validationResult(req);
    error.validationError(validationErrors, res);

    // Check if user email already exist
    const emailExist = await userExist("email", email);
    if (emailExist) {
      error.errorHandler(res, "Email already exists", "email");
    } else {
      // Create new user
      const user = new User({
        email,
      });

      // Save user to database
      const newUser = await user.save();

      // Send response
      res
        .status(200)
        .json({ message: "Sign up successful", type: "user", newUser });
    }
  } catch (err) {
    error.error(err, next);
  }
};

/** User Log in **/
module.exports.userLogin = async (req, res, next) => {
  const email = req.body.email;

  try {
    // Check for validation errors
    const validationErrors = validationResult(req);
    error.validationError(validationErrors, res);

    // Check if user exist
    const emailExist = await userExist("email", email);
    if (!emailExist) error.errorHandler(res, "incorrect email", "email");

    // Continue if no errors
    const user = emailExist
    res.status(200).json({ message: "Sign in successful", type: "user", user });
  } catch (err) {
    error.error(err, next);
  }
};
