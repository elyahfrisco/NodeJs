const jwt = require('jsonwebtoken');
const Role = require('../models/role');
const config = require('../config');

const roleController = {
    create: function(idUserRole, idProjet, role){
        if(idUserRole && idProjet && role){
            Role.create(idUserRole, idProjet, role, () => {});
        }
    },

    update: function(req, res){
        const {idUserRole, idProjet, roleCollaborateur} = req.body;
        const {idUser, username, email, phone} = req.user;
        
        Role.getRole(idUserRole, idProjet, (roleUser) => {
            if(roleUser){
                Role.update(idUserRole, idProjet, roleCollaborateur, () => {
                    const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                    res.status(201).json({ message: "Mise à jour du rôle de collaborateur réussie", newtoken: newToken })
                })
                config.userHistory(idUser, 'modifier rôle', "modification du rôle "+roleUser[0].role+" en "+roleCollaborateur);
            }
        })
    },

    delete: function(idUserRole, idProjet){

        Role.getRole(idUserRole, idProjet, (roleUser) => {
            if(roleUser){
                Role.delete(idUserRole, idProjet, () => {})
            }
        })
    }
}

module.exports = roleController;