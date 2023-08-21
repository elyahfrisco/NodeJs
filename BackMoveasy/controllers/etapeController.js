const jwt = require('jsonwebtoken');
const Etape = require('../models/etape');
const config = require('../config');

const etapeController = {
    create: function(req, res){
        const {libelle, idItem} = req.body;
        const {idUser, username, email, phone} = req.user;
        
        if(libelle && idItem){
            Etape.create(libelle, idItem, () => {
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({ message: "Creation d'étape réussie", newtoken: newToken })
            });
            config.userHistory(idUser, 'créer étape', "'création d'étape "+libelle);
        }
    },

    list: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idItem = req.params.id;

        Etape.getAll(idItem, (etape) => {
            if(etape){
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.json({etape: etape, newtoken: newToken});
            }else{
                res.status(500).json({message: 'Une erreur est survenue lors de la récupération des étapes.'});                
            }
        })
    },

    getById: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idEtape = req.params.id;
        
        Etape.getById(idEtape, (etape) => {
            if(etape){
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.json({etape: etape, newtoken: newToken});
            }else{
                res.status(401).json({message: "Il n'y a pas d'étape associé à cet id."});                
            }
        })
    },

    update: function(req, res){
        const {libelle} = req.body;
        const {idUser, username, email, phone} = req.user;
        const idEtape = req.params.id;

        Etape.getById(idEtape, (etape) => {
            if(!etape){
                res.status(401).json({ message: "L'étape n'existe pas."});
            }else{
                if(libelle){
                    Etape.update(idEtape, libelle, () => {
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.status(201).json({ message: "modification d'étape reussie", newtoken: newToken })
                    });
                    config.userHistory(idUser, 'modifier étape', (libelle != etape[0].libelle) ? "modification d'étape "+etape[0].libelle+' en '+libelle : "modification d'étape");
                }else{
                    res.status(404).json({ message: 'le champs libelle ne doit pas être vide.' });
                }
            }
        });
    },

    delete: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idEtape = req.params.id;

        Etape.getById(idEtape, (etape) => {
            if(!etape){
                res.status(401).json({ message: "L'étape n'existe pas."});
            }else{
                if(idEtape){
                    Etape.delete(idEtape, () => {
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.json({ message: "étape supprimé avec succès.", newtoken: newToken })
                    });
                    config.userHistory(idUser, 'supprimer étape', "suppression d'étape : "+etape[0].libelle);
                }else{
                    res.status(404).json({ message: 'Erreur inattendu' });
                }
            }
        });
    }
}

module.exports = etapeController;