const express = require('express');
const itemController = require('../controllers/itemController');
const upload = require('../middlewares/mutlerUpload')
const verifyToken = require('../middlewares/verifyToken');
const roleAuthotization = require('../middlewares/roleAuthorization');
const router = express.Router();

router.post('/create', verifyToken,  upload.single('photo'), itemController.create);
router.get('/list/:id', verifyToken, itemController.list);
router.get('/getById/:id', verifyToken, itemController.getById);
router.put('/update/:id', verifyToken,   upload.single('photo'), itemController.update);
router.delete('/delete/:id', verifyToken,  itemController.delete);

module.exports = router;

