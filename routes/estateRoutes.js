const express = require("express");
const {
  getEstate
} = require("../controllers/estateController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/real-estate").get(getEstate);

module.exports = router;

