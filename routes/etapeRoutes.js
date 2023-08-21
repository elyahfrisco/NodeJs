const express = require('express');
const etapeController = require('../controllers/etapeController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer une étape
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Étape créée avec succès
 */
router.post('/create', verifyToken, etapeController.create);

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Liste des étapes par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste
 *     responses:
 *       200:
 *         description: Liste des étapes récupérée
 */
router.get('/list/:id', verifyToken, etapeController.list);

/**
 * @swagger
 * /getById/{id}:
 *   get:
 *     summary: Obtenir une étape par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étape
 *     responses:
 *       200:
 *         description: Étape récupérée
 */
router.get('/getById/:id', verifyToken, etapeController.getById);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Mettre à jour une étape
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étape
 *     responses:
 *       200:
 *         description: Étape mise à jour
 */
router.put('/update/:id', verifyToken, etapeController.update);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer une étape
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'étape
 *     responses:
 *       200:
 *         description: Étape supprimée
 */
router.delete('/delete/:id', verifyToken, etapeController.delete);

module.exports = router;
