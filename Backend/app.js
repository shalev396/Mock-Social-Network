//imports
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
//import to js files
import usersRoutes from "./routes/usersRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import commentsRoutes from "./routes/commentsRoute.js";
import authenticator from "./middleware/Authenticator.js";

//import util js file
import util from "./utils/util.js";

//configs
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3006;
app.use(
  cors({
    credentials: true, // Enable credentials (cookies, etc.)
  })
);

//mongodb config
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//middleware
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Specify the allowed origin
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow required headers
  next();
});
app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Public routes (no authentication required)
app.use("/api/users", usersRoutes);

// Protected routes (authentication required)
app.use("/api/posts", authenticator, postsRoutes);
app.use("/api/comments", authenticator, commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
