const db = require('../config/db');

const Role = {
    create: function(idUser, idProjet, role, callback){
        const createdAt = new Date();
        const updatedAt = new Date();

        db.query('INSERT INTO role (id_user, id_projet, role, created_at, updated_at) VALUES (?,?,?,?,?)', [idUser, idProjet, role, createdAt, updatedAt], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    getRole: function(idUSer, idProjet, callback){
        db.query('SELECT * FROM role WHERE id_user = ? and id_projet = ?', [idUSer, idProjet], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    update: function(idUSer, idProjet, role, callback){
        const updatedAt = new Date();

        db.query('UPDATE role SET role = ?, updated_at = ? WHERE id_user = ? and id_projet = ?', [role, updatedAt, idUSer, idProjet], (err, results) => {
            if(err) throw err;
            callback(results);
        })
    },

    delete: function(idUSer, idProjet, callback){
        db.query('DELETE FROM role WHERE id_user = ? and id_projet = ?', [idUSer, idProjet], (err, results) => {
            if(err) throw err;
            callback(results)
        })
    }
}

module.exports = Role;