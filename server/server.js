const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/Auth");
const eventRoutes = require("./routes/events");
const cardRoutes = require("./routes/cards");
const folderRoutes = require("./routes/folders");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://lang-app-two.vercel.app"
  ]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/folders", folderRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.get("/api/test", (req, res) => {
      res.json({ message: "Server works!" });
    });

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}

startServer();