const express = require("express");
const {
  getQueue,
  updateQueue,
  resetQueue,
  previousQueue,
  getAllQueues
} = require("../controllers/queueController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:clinicCode", protect, getQueue);
router.put("/:clinicCode", protect, updateQueue);
router.put("/reset/:clinicCode", protect, resetQueue);
router.put("/previous/:clinicCode", protect, previousQueue);
router.get("/", protect, getAllQueues);  // Tetap menggunakan `protect`

module.exports = router;
