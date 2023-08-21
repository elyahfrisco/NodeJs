const express = require('express');
const projetController = require('../controllers/projetController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router()

router.post('/create', verifyToken, projetController.create);
router.get('/list', verifyToken, projetController.list);
router.get('/getById/:id', verifyToken, projetController.getById);
router.put('/update/:id', verifyToken, projetController.update);
router.delete('/delete/:id', verifyToken, projetController.delete);

module.exports = router;