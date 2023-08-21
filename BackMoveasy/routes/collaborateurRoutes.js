const express = require('express');
const collaborateurController = require('../controllers/collaborateurController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthotization = require('../middlewares/roleAuthorization');
const router = express.Router()

router.post('/add', verifyToken, collaborateurController.requestCollaborate);
router.get('/confirm/:id', collaborateurController.confirm);
router.get('/list/:id', verifyToken, collaborateurController.list);
router.delete('/remove/:id', verifyToken, roleAuthotization, collaborateurController.delete);

module.exports = router;