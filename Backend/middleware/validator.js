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
//posts
const createPostValidation = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.media ||
    !req.body.authorId
  ) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const validatePost = {
  createPostValidation,
};
const validator = {
  validateUser,
  validatePost,
};
export default validator;
