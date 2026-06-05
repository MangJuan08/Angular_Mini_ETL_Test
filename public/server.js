const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Create server
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

// Default middlewares (logger, static, etc.)
server.use(middlewares);

// Parse JSON bodies (IMPORTANT for json-server routes)
server.use(jsonServer.bodyParser);

// Serve uploaded files
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- FILE UPLOAD CONFIG ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ---------------- UPLOAD ROUTE ----------------
server.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    uploaded: true,
    file: {
      name: req.file.originalname,
      filename: req.file.filename,
      url: `http://localhost:3000/uploads/${req.file.filename}`,
    },
  });
});


// ---------------- ROUTES ----------------
server.use(router);

// ---------------- START SERVER ----------------
const PORT = 3002;

server.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
});