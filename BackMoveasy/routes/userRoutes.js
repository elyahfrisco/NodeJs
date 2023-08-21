const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signupPhone', userController.signupPhone);
router.post('/forgotPassword', userController.passwordRecovery);
router.put('/newPassword', userController.newPassword);
router.post('/verifyPhone', userController.verifyPhone);
router.post('/login', userController.login);
router.get('/about', verifyToken, userController.about);
router.put('/update/:id', verifyToken, userController.updateUser);
router.get('/history', verifyToken, userController.history);

module.exports = router;