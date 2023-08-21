const express = require('express');
const categoryController = require('../controllers/categorieController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthorization = require('../middlewares/roleAuthorization');
const router = express.Router();

router.post('/create', verifyToken, categoryController.create);
router.get('/list', verifyToken, categoryController.list);
router.get('/getById/:id', verifyToken, categoryController.getById);
router.delete('/delete/:id', verifyToken, categoryController.delete);

module.exports = router;
