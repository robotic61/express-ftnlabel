const express = require("express");
const ftnController = require("../controllers/ftnController");

const router = express.Router();

router.get("/findbyftn", ftnController.findByFtnNo);

module.exports = router;
