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

const getallPostValidation = (req, res, next) => {
  //TODO: verify only our website can get and add uid to url for customized content

  next();
};
const getPostByIdValidation = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }

  next();
};
//object constructing
const validatePost = {
  createPostValidation,
  getallPostValidation,
  getPostByIdValidation,
};
const validator = {
  validateUser,
  validatePost,
};
export default validator;
