const express = require("express");
const ftnController = require("../controllers/ftnController");

const router = express.Router();

router.get("/findbyftn", ftnController.findByFtnNo);

router.get("/ftnlabel", ftnController.ftnLabelCreation);

module.exports = router;
