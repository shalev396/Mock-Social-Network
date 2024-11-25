//Users
const createUserValidation = (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.birthday ||
    !req.body.phoneNumber
  ) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const loginUserValidation = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const validateUser = {
  createUserValidation,
  loginUserValidation,
};
const validator = {
  validateUser,
};
export default validator;
