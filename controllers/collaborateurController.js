const jwt = require('jsonwebtoken');
const Collaborateur = require('../models/collaborateur');
const User = require('../models/user');
const config = require('../config');
const mail = require('../controllers/mailController');
const role = require('../controllers/roleController');

const collaborateurController = {
    requestCollaborate: function(req, res){
        const {emailCollaborateur, libelleCollaborateur, idProjet} = req.body;
        const {idUser, username, email, phone} = req.user;

        if(emailCollaborateur && libelleCollaborateur && idProjet){
            const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
            mail.requestCollaborate(email, username, emailCollaborateur, libelleCollaborateur, jwt.sign({emailCollaborateur, libelleCollaborateur, idProjet}, config.keyConfirm));
            res.status(201).json({ message: "Demande collaborateur envoyé", newtoken: newToken })
            config.userHistory(idUser, 'demander collaborateur', "'demande collaborateur avec "+emailCollaborateur);
        }
    },

    confirm: function(req, res){
        const data = req.params.id;
        const {emailCollaborateur, libelleCollaborateur, idProjet} = jwt.verify(data, config.keyConfirm);
        User.findByEmail(emailCollaborateur, (user) => {
            if(user){
                Collaborateur.create(emailCollaborateur, libelleCollaborateur, idProjet, () => {
                    role.create(user.id_user,idProjet, "non admin");
                    res.status(201).json({ message: "confirmation collaborateur reussi, redirection vers le projet."})
                });
            }else{
                Collaborateur.create(emailCollaborateur, idProjet, () => {
                    res.status(201).json({ message: "redirection vers la formulaire d'inscription puis confirmation collaborateur reussi et redirection vers le projet."});
                    // role.create(user[0].id_user,idProjet, "non admin"); //cette partie attend l'user inscrit pour pouvoir lui attrubuer un rôle 
                });
            }
        })
    },

    list: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idProjet = req.params.id;

        Collaborateur.getAll(idProjet, (collaborateur) => {
            if(collaborateur){
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.json({collaborateur: collaborateur, newtoken: newToken});
            }else{
                res.status(500).json({message: 'Une erreur est survenue lors de la récupération des collaborateurs.'});                
            }
        })
    },

    delete: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idCollaborateur = req.params.id;
        
        Collaborateur.getById(idCollaborateur, (collaborateur) => {
            if(collaborateur){
                if(idCollaborateur){
                    Collaborateur.delete(idCollaborateur, () => {
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.json({ message: "collaborateur retiré avec succès.", newtoken: newToken })
                    });
                    User.findByEmail(collaborateur[0].email_collaborateur, (user) => {
                        role.delete(user.id_user, collaborateur[0].id_projet)
                    })
                    config.userHistory(idUser, 'retiré collaborateur', "retrait du collaborateur : "+collaborateur[0].email_collaborateur);
                }else{
                    res.status(404).json({ message: 'Erreur inattendu' });
                }
            }else{
                res.status(500).json({message: 'Une erreur est survenue lors de la récupération des collaborateurs.'});                
            }
        })
    }
}

module.exports = collaborateurController;