const express = require("express");
const { createFooter, getFooters } = require("../controllers/footerController");

const router = express.Router();

// POST route to create a new footer
router.post("/add", createFooter);

// GET route to fetch all footers
router.get("/", getFooters);

// Export router
module.exports = router;
