const express = require("express");
const ftnController = require("../controllers/ftnController");

const router = express.Router();

router.get("/findbyftn", ftnController.findByFtnNo);

router.get("/ftnlabel", ftnController.ftnLabelCreation);
// use like: http://localhost:3000/ftnlabel?ftnNo=2001000026

module.exports = router;
