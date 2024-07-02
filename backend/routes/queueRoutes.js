const express = require("express");
const {
  getQueue,
  updateQueue,
  resetQueue,
  previousQueue,
} = require("../controllers/queueController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:clinicCode", protect, getQueue);
router.put("/:clinicCode", protect, updateQueue);
router.put("/reset/:clinicCode", protect, resetQueue);
router.put("/previous/:clinicCode", protect, previousQueue);

module.exports = router;
