const db = require('../config/db');

const Item = {
    create: function(libelle, description, photo, qrcode, idProjet, categoryId, callback){
        const createdAt = new Date();
        const updateAt = new Date();

        db.query('INSERT INTO items (libelle, description, photo, qrcode, id_projet, id_categorie, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)', [libelle, description, photo, qrcode, idProjet, categoryId, createdAt, updateAt], (err, results) =>{
            if(err) throw err;
            callback(results);
        })
    },
    
    getAll: function(idProjet, callback){
        db.query('SELECT * FROM items WHERE id_projet = ?', [idProjet], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getById: function(idItem, callback){
        db.query('SELECT * FROM items WHERE id_item = ?', [idItem], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    update: function(idItem, libelle, description, photo, callback){
        const updateAt = new Date();
        db.query('UPDATE items SET libelle = ?, description = ?, photo = ?, updated_at = ? WHERE id_item = ?', [libelle, description, photo, updateAt, idItem], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idItem, callback){
        db.query('DELETE FROM items WHERE id_item = ?', [idItem], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    }
};

module.exports = Item;