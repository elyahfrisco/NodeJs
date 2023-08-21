const express = require('express');
const roleController = require('../controllers/roleController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthotization = require('../middlewares/roleAuthorization');
const router = express.Router()

router.put('/update', verifyToken, roleAuthotization, roleController.update);

module.exports = router;
