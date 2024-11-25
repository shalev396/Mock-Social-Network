//imports
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

//import to js files
import usersRoutes from "./routes/usersRoute.js";

//import util js file
import util from "./utils/util.js";

//middleware js
// import logRequest from "./middleware/logger.js";

//configs
dotenv.config();
const app = express();
const PORT = 3006; //3000-3005 are in use on my desktop
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

//routes
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
