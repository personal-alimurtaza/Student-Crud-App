import express from "express";
import cors from "cors";
import { morgan, rateLimiter } from "#middlewares";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());

export default app;
