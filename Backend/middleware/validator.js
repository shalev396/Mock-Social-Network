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
const getUserByIdValidation = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const getUsersByUsernameValidation = (req, res, next) => {
  if (!req.params.username) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const followUserByIdValidation = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const editUserValidation = (req, res, next) => {
  if (
    !req.body.username &&
    req.body.email &&
    req.body.phoneNumber &&
    req.body.profilePic
  ) {
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
  getUserByIdValidation,
  getUsersByUsernameValidation,
  followUserByIdValidation,
  editUserValidation,
};
//posts
const createPostValidation = (req, res, next) => {
  if (!req.body.content || !req.body.media) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
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
const LikePostValidation = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const getPostByUserIdValidation = (req, res, next) => {
  if (!req.params.id) {
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
const getFollowerPostValidation = (req, res, next) => {
  //TODO: verify only our website can get and add uid to url for customized content
  console.log("follow");

  next();
};
const validatePost = {
  createPostValidation,
  getallPostValidation,
  getPostByIdValidation,
  LikePostValidation,
  getPostByUserIdValidation,
  getFollowerPostValidation,
};
//comments
const createCommentValidation = (req, res, next) => {
  if (!req.body.postId || !req.body.text) {
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
const LikeCommentValidation = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "Missing Filed",
    });
  }
  next();
};
const validateComment = {
  createCommentValidation,
  getCommentsByPostIdValidation,
  LikeCommentValidation,
};
//object constructing
const validator = {
  validateUser,
  validatePost,
  validateComment,
};
export default validator;
