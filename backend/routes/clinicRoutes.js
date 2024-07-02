const express = require("express");
const {
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinicController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getClinics);
router.post("/", protect, createClinic);
router.put("/:id", protect, updateClinic);
router.delete("/:code", protect, deleteClinic);

module.exports = router;
