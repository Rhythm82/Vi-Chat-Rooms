import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.set("port", process.env.PORT || 8080);

const server = createServer(app);
const io = connectToSocket(server);

//routes define
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  return res.send("Hi from server");
});

const start = async () => {
  try {
    const connectMongoBd = await mongoose.connect(process.env.MONGO_URI,{
     useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGO Connected DDB Host: ${connectMongoBd.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }

  server.listen(app.get("port"), () => {
    console.log(`Server running in Localhost:8080`);
  });
};
start();
