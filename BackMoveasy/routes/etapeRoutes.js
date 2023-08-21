const express = require('express');
const etapeController = require('../controllers/etapeController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router()

router.post('/create', verifyToken, etapeController.create);
router.get('/list/:id', verifyToken, etapeController.list);
router.get('/getById/:id', verifyToken, etapeController.getById);
router.put('/update/:id', verifyToken, etapeController.update);
router.delete('/delete/:id', verifyToken, etapeController.delete);

module.exports = router;