const express = require('express');
const projetController = require('../controllers/projetController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer un projet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projet créé avec succès
 */
router.post('/create', verifyToken, projetController.create);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Liste des projets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des projets récupérée
 */
router.get('/list', verifyToken, projetController.list);

/**
 * @swagger
 * /getById/{id}:
 *   get:
 *     summary: Obtenir un projet par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet récupéré
 */
router.get('/getById/:id', verifyToken, projetController.getById);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Mettre à jour un projet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet mis à jour
 */
router.put('/update/:id', verifyToken, projetController.update);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer un projet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet supprimé
 */
router.delete('/delete/:id', verifyToken, projetController.delete);

module.exports = router;
