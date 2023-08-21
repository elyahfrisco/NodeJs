const db = require('../config/db');

const Collaborateur = {
    create: function(email, libelleCollaborateur, idProjet, callback){
        const createdAt = new Date();

        db.query('INSERT INTO collaborateur (email_collaborateur, libelle_collaborateur, id_projet, created_at) VALUES (?,?,?,?)', [email, libelleCollaborateur, idProjet, createdAt], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getAll: function(idProjet, callback){
        db.query('SELECT * FROM collaborateur WHERE id_projet = ?', [idProjet], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getById: function(idCollaborateur, callback){
        db.query('SELECT * FROM collaborateur WHERE id_collaborateur = ?', [idCollaborateur], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idCollaborateur, callback){
        db.query('DELETE FROM collaborateur WHERE id_collaborateur = ?', [idCollaborateur], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    }
}

module.exports = Collaborateur;