const express = require('express');
const categoryController = require('../controllers/categorieController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthorization = require('../middlewares/roleAuthorization');
const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer une catégorie
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Catégorie créée avec succès
 */
router.post('/create', verifyToken, categoryController.create);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Liste des catégories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée
 */
router.get('/list', verifyToken, categoryController.list);

/**
 * @swagger
 * /getById/{id}:
 *   get:
 *     summary: Obtenir une catégorie par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie récupérée
 */
router.get('/getById/:id', verifyToken, categoryController.getById);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée
 */
router.delete('/delete/:id', verifyToken, categoryController.delete);

module.exports = router;
