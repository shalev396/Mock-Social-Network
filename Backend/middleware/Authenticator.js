import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.jwt;
    // const cookieHeader = req.headers.cookie;
    // console.log(cookieHeader);

    // if (!cookieHeader) {
    //   return res.status(401).json({ message: "Authentication required" });
    // }
    // // Get the token
    // const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    //   const [key, value] = cookie.trim().split("=");
    //   acc[key] = value;
    //   return acc;
    // }, {});

    // const token = cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      // console.log(req.user);
      next();
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authenticate;
