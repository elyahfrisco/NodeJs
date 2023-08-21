const db = require('../config/db');

const Projet = {
    create: function(libelle, depart, arrive, id_user, callback) {
        const createdAt = new Date(); 
        const updatedAt = new Date(); 
        
        db.query('INSERT INTO projet (libelle, depart, arrive, id_user, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [libelle, depart, arrive, id_user, createdAt, updatedAt], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    getAll: function(idUser, callback){
        const sqlQuery = `
        SELECT DISTINCT p.id_projet, p.libelle, p.description, p.id_user,
            (SELECT c.libelle_collaborateur
             FROM collaborateur c
             WHERE c.id_projet = p.id_projet AND c.email_collaborateur = (SELECT email FROM user WHERE id_user = ?)
            ) AS libelle_collaborateur,
            p.created_at, p.updated_at
        FROM projet p
        LEFT JOIN user u ON p.id_user = u.id_user
        WHERE p.id_user = ?
        
        UNION

        SELECT DISTINCT p.id_projet, p.libelle, p.description, p.id_user, c.libelle_collaborateur, p.created_at, p.updated_at
        FROM projet p
        INNER JOIN collaborateur c ON p.id_projet = c.id_projet
        INNER JOIN user u ON c.email_collaborateur = u.email
        WHERE u.id_user = ?`;

        db.query(sqlQuery, [idUser, idUser, idUser], (err, results) => {
            if(err) throw err;
            callback(results);
        });
    },

    getById: function(idProjet, idUser, callback){
        db.query('SELECT * FROM projet WHERE id_projet = ? and id_user = ?', [idProjet, idUser], (err, results)=>{
            if(err) throw err;
            callback(results[0]);
        })
    },

    update: function(idProjet, idUser, libelle, depart, arrive, callback){
        const updatedAt = new Date();
        db.query('UPDATE projet SET libelle = ?, depart = ?, arrive = ?, updated_at = ? WHERE id_projet = ? and id_user = ?', [libelle, depart, arrive, updatedAt, idProjet, idUser], (err, results)=>{
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idProjet, idUser, callback){
        db.query('DELETE FROM projet WHERE id_projet = ? and id_user = ?', [idProjet, idUser], (err, results)=>{
            if(err) throw err;
            callback(results);
        })
    }
};

module.exports = Projet;