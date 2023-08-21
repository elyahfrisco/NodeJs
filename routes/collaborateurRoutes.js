const express = require('express');
const collaborateurController = require('../controllers/collaborateurController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthorization = require('../middlewares/roleAuthorization');
const router = express.Router();

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Demander une collaboration
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Demande de collaboration envoyée
 */
router.post('/add', verifyToken, collaborateurController.requestCollaborate);

/**
 * @swagger
 * /confirm/{id}:
 *   get:
 *     summary: Confirmer une collaboration
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la collaboration
 *     responses:
 *       200:
 *         description: Collaboration confirmée
 */
router.get('/confirm/:id', collaborateurController.confirm);

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Liste des collaborateurs par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste
 *     responses:
 *       200:
 *         description: Liste des collaborateurs récupérée
 */
router.get('/list/:id', verifyToken, collaborateurController.list);

/**
 * @swagger
 * /remove/{id}:
 *   delete:
 *     summary: Supprimer un collaborateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du collaborateur
 *     responses:
 *       200:
 *         description: Collaborateur supprimé
 */
router.delete('/remove/:id', verifyToken, roleAuthorization, collaborateurController.delete);

module.exports = router;
