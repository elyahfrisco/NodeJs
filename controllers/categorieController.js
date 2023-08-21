const jwt = require('jsonwebtoken');
const Category = require('../models/categorie');
const config = require('../config');

const categoryController = {
    create: function(req, res){
        const {nomCategorie, codeCouleur} = req.body;
        const {idUser, username, email, phone} = req.user;

        if(nomCategorie && codeCouleur){
            Category.create(nomCategorie, codeCouleur, () => {
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({ message: "Création de catégorie réussie", newToken: newToken });
            });
        } else {
            res.status(404).json({ message: 'Les champs nomCategorie et codeCouleur ne doivent pas être vides.' });
        }
    },
   
    list: function(req, res){
        Category.getAll((categories) => {
            if(categories) {
                const newToken = jwt.sign(req.user, config.secretKey, { expiresIn: '1h' });
                res.json({categories: categories, newToken: newToken});
            } else {
                res.status(500).json({message: 'Une erreur est survenue lors de la récupération des catégories.'});
            }
        })
    },

    getById: function(req, res){
        const idCategory = req.params.id;

        Category.getById(idCategory, (category) => {
            if(!category || category.length == 0) {
                res.status(404).json({ message: "Il n'y a pas de catégorie associée à cet id."});
            } else {
                const newToken = jwt.sign(req.user, config.secretKey, { expiresIn: '1h' });
                res.json({category: category, newToken: newToken});
            }
        });
    },

    delete: function(req, res){
        const idCategory = req.params.id;

        Category.getById(idCategory, (category) => {
            if(!category || category.length == 0) {
                res.status(404).json({ message: "La catégorie n'existe pas" });
            } else {
                Category.delete(idCategory, () => {
                    const newToken = jwt.sign(req.user, config.secretKey, { expiresIn: '1h' });
                    res.json({ message: "Catégorie supprimée avec succès.", newToken: newToken });
                });
            }
        });
    }

}

module.exports = categoryController;
