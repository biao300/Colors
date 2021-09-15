const express = require('express');
const { 
    getBitmapData 
} = require('../controllers/images');

const router = express.Router();

router.get('/', getBitmapData);

module.exports = router;