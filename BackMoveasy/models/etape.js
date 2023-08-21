const db = require('../config/db');

const Etape = {
    create: function(libelle, idItem, callback){
        const createdAt = new Date();
        const updateAt = new Date();

        db.query('INSERT INTO etapes (libelle, id_item, created_at, updated_at) VALUES (?,?,?,?)', [libelle, idItem, createdAt, updateAt], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getAll: function(idItem, callback) {
        db.query('SELECT * FROM etapes WHERE id_item = ?', [idItem], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getById: function(idEtape, callback){
        db.query('SELECT * FROM etapes WHERE id_etape = ?', [idEtape], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    update: function(idEtape, libelle, callback){
        const updateAt = new Date();
        db.query('UPDATE etapes SET libelle = ?, updated_at = ? WHERE id_etape = ?', [libelle, updateAt, idEtape], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idEtape, callback){
        db.query('DELETE FROM etapes WHERE id_etape = ?', [idEtape], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    }
}

module.exports = Etape;