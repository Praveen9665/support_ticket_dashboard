import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS
app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      console.log(`📡 CORS Request from: ${origin}`);

      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.originalUrl}`);
  next();
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.send("Live Support Ticket API running...");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Live Support Ticket API healthy",
    timestamp: new Date().toISOString(),
    currentDir: __dirname,
  });
});

// API routes
app.use("/api", ticketRoutes);

// React fallback route for mywindowshosting 
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err);

  if (req.path.startsWith("/api/")) {
    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
    });
  }

  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});