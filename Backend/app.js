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

const corsOptions = {
  origin: "https://shalevmockinstagram.vercel.app/", // Allow only this origin
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
  // methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  // Allow cookies and other credentials
};
app.options("*", cors(corsOptions));

// Public routes (no authentication required)
app.use("/api/users", usersRoutes);

// Protected routes (authentication required)
app.use("/api/posts", authenticator, postsRoutes);
app.use("/api/comments", authenticator, commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
