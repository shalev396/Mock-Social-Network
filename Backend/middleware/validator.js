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
const verifyUniqueValidation = (req, res, next) => {
  if (!req.body.username && !req.body.email && !req.body.phoneNumber) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const validateUser = {
  createUserValidation,
  loginUserValidation,
  verifyUniqueValidation,
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

const validatePost = {
  createPostValidation,
  getallPostValidation,
  getPostByIdValidation,
};
//comments
const createCommentValidation = (req, res, next) => {
  if (!req.body.postId || !req.body.authorId || !req.body.text) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};

const getCommentsByPostIdValidation = (req, res, next) => {
  if (!req.params.id) {
    console.log(req.params);

    return res.status(400).send({
      message: "Missing Filed",
    });
  }

  next();
};
const validateComment = {
  createCommentValidation,
  getCommentsByPostIdValidation,
};
//object constructing
const validator = {
  validateUser,
  validatePost,
  validateComment,
};
export default validator;
