const db = require('../config/db');

const Category = {
    create: function(nomCategorie, codeCouleur, callback){
        db.query('INSERT INTO categories (nom_categorie, code_couleur) VALUES (?, ?)', [nomCategorie, codeCouleur], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getAll: function(callback){
        db.query('SELECT * FROM categories', [], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getById: function(idCategorie, callback){
        db.query('SELECT * FROM categories WHERE id_categorie = ?', [idCategorie], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    update: function(idCategorie, nomCategorie, codeCouleur, callback){
        db.query('UPDATE categories SET nom_categorie = ?, code_couleur = ? WHERE id_categorie = ?', [nomCategorie, codeCouleur, idCategorie], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idCategorie, callback){
        db.query('DELETE FROM categories WHERE id_categorie = ?', [idCategorie], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    }
};

module.exports = Category;
