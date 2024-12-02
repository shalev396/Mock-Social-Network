import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  // try {
  //   // Get the token from the Authorization header or cookie
  //   const token = req.headers.authorization?.split(" ")[1] || req.cookies?.jwt;

  //   if (!token) {
  //     return res.status(401).json({ message: "Authentication required" });
  //   }
  //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return res.status(401).json({ message: "Invalid or expired token" });
  //     }
  //     req.user = decoded;
  next();
  //   });
  // } catch (error) {
  //   console.error("Error during authentication:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};

export default authenticate;
