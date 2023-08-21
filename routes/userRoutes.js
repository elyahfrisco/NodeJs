const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur inscrit avec succès
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /signupPhone:
 *   post:
 *     summary: Inscription avec un numéro de téléphone
 *     responses:
 *       200:
 *         description: Utilisateur inscrit avec succès
 */
router.post('/signupPhone', userController.signupPhone);

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Récupération du mot de passe
 *     responses:
 *       200:
 *         description: Email de récupération envoyé
 */
router.post('/forgotPassword', userController.passwordRecovery);

/**
 * @swagger
 * /newPassword:
 *   put:
 *     summary: Définir un nouveau mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour avec succès
 */
router.put('/newPassword', userController.newPassword);

/**
 * @swagger
 * /verifyPhone:
 *   post:
 *     summary: Vérification du numéro de téléphone
 *     responses:
 *       200:
 *         description: Numéro de téléphone vérifié
 */
router.post('/verifyPhone', userController.verifyPhone);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /about:
 *   get:
 *     summary: À propos de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations sur l'utilisateur
 */
router.get('/about', verifyToken, userController.about);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 */
router.put('/update/:id', verifyToken, userController.updateUser);

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Historique de l'utilisateur
 *     responses:
 *       200:
 *         description: Historique de l'utilisateur récupéré
 */
router.get('/history', verifyToken, userController.history);

module.exports = router;
