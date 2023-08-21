const db = require('../config/db');

const User = {
  findByEmail: function (email, callback) {
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  },

  findByPhone: function (phone, callback) {
    db.query('SELECT * FROM user WHERE phone = ?', [phone], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  },

  create: function (username, email, phone, password, callback) {
    const createdAt = new Date(); 
    const updatedAt = new Date(); 

    db.query('INSERT INTO user (username, email, phone, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [username, email, phone, password, createdAt, updatedAt], (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },

  update: function (nouveauUsername, idUser, callback) {
    const updatedAt = new Date();
    db.query('UPDATE user SET username = ?, updated_at = ? WHERE id_user = ?', [nouveauUsername, updatedAt, idUser], (err, results) =>{
        if(err) throw err;
        callback(results);
    })
  },

  changePassword: function (newPassword, idUser, callback) {
    const updatedAt = new Date();
    db.query('UPDATE user SET password = ?, updated_at = ? WHERE id_user = ?', [newPassword, updatedAt, idUser], (err, results) =>{
        if(err) throw err;
        callback(results);
    })
  },

  history: function (idUser, callback) {
    db.query('SELECT * FROM user_history WHERE user_id = ?', [idUser], (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
};

module.exports = User;
