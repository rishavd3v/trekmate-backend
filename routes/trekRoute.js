const express = require('express');
const { getAllTreks } = require('../controller/trekController');
const router = express.Router();

router.get("/treks",getAllTreks);

module.exports = router;