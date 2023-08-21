const express = require('express');
const itemController = require('../controllers/itemController');
const upload = require('../middlewares/mutlerUpload');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthorization = require('../middlewares/roleAuthorization');
const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer un item
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Item créé avec succès
 */
router.post('/create', verifyToken, upload.single('photo'), itemController.create);

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Liste des items par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la liste
 *     responses:
 *       200:
 *         description: Liste des items récupérée
 */
router.get('/list/:id', verifyToken, itemController.list);

/**
 * @swagger
 * /getById/{id}:
 *   get:
 *     summary: Obtenir un item par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'item
 *     responses:
 *       200:
 *         description: Item récupéré
 */
router.get('/getById/:id', verifyToken, itemController.getById);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Mettre à jour un item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'item
 *     responses:
 *       200:
 *         description: Item mis à jour
 */
router.put('/update/:id', verifyToken, upload.single('photo'), itemController.update);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer un item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'item
 *     responses:
 *       200:
 *         description: Item supprimé
 */
router.delete('/delete/:id', verifyToken, itemController.delete);

module.exports = router;
