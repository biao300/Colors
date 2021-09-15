const express = require('express');
const imageRoute = require('./images');

const router = express.Router();

router.use('/images', imageRoute);

module.exports = router;