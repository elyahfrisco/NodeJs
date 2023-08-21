const express = require('express');
const roleController = require('../controllers/roleController');
const verifyToken = require('../middlewares/verifyToken');
const roleAuthorization = require('../middlewares/roleAuthorization');
const router = express.Router();

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Mettre à jour un rôle
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *       401:
 *         description: Non autorisé
 */
router.put('/update', verifyToken, roleAuthorization, roleController.update);

module.exports = router;
