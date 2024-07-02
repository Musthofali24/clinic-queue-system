const express = require("express");
const path = require("path");
const router = express.Router();

// Route untuk halaman utama
router.get("/layarutama", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/index.html"));
});

// Route untuk halaman login
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/login.html"));
});

// Route untuk halaman register
router.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../..", "frontend", "views/register.html")
  );
});

// Route untuk halaman admin
router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/admin.html"));
});

// Route untuk halaman staff
router.get("/staff", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/staff.html"));
});

// Route untuk halaman lobby
router.get("/lobby", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/lobby.html"));
});

// Route untuk halaman klinik
router.get("/clinic", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "frontend", "views/clinic.html"));
});

module.exports = router;
