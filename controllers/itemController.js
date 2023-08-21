const jwt = require('jsonwebtoken');
const Item = require('../models/item');
const config = require('../config');
const QRCode = require('../controllers/qrCodeController');

const itemController = {
    create: async function(req, res){
        const {libelle, description, idProjet, categoryId} = req.body; 
        const {idUser, username, email, phone} = req.user;
        const photo = req.file.filename;
        
        if(libelle && idProjet && photo){
            const qrcode = await QRCode(libelle, description, photo);
            Item.create(libelle, description, photo, qrcode, idProjet, categoryId, () => { 
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({ message: "Création d'item réussie", newToken: newToken });
            });
            config.userHistory(idUser, 'créer item', "'création d'item "+libelle);
        } else {
            res.status(404).json({ message: 'Il y a quelques champs qui ne doivent pas être vides.' });
        }
    },

    list: function(req, res){
        const {idUser, username, email, phone} = req.user;
        const idProjet = req.params.id;
        
        Item.getAll(idProjet, (item) => {
            if(item){
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.json({items: item, newtoken: newToken});
            }else{
                res.status(500).json({message: 'Une erreur est survenue lors de la récupération des items.'});
            }
        })
    },

    getById: function(req, res){
        const idItem = req.params.id;
        const {idUser, username, email, phone} = req.user;

        Item.getById(idItem, (items) => {
            if(!items){
                res.status(401).json({ message: "Il n'y a pas d'item associé à cet id."});
            }else{
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({item: items, newToken: newToken});
            }
        });
    },

    update: function(req, res){
        const idItem = req.params.id;
        const {libelle, description} = req.body;
        const {idUser, username, email, phone} = req.user;
        const photo = req.file.filename;

        Item.getById(idItem, (items) => {
            if(!items){
                res.status(401).json({ message: "L'item n'existe pas" });
            }else{
                if(libelle, photo){
                    Item.update(idItem, libelle, description, photo, () => {
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.status(201).json({ message: "modification d'item reussie", newtoken: newToken })
                    });
                    config.userHistory(idUser, 'modifier item', (libelle != items[0].libelle) ? "modification d'item "+items[0].libelle+' en '+libelle : "modification d'item");
                }else{
                    res.status(404).json({ message: 'il y quelque champs qui ne doivent pas être vide.' });
                }
            }
        });
    },

    delete: function(req, res){
        const idItem = req.params.id;
        const {idUser, username, email, phone} = req.user;
        
        Item.getById(idItem, (items) => {
            if(!items){
                res.status(401).json({ message: "L'item n'existe pas" });
            }else{
                if(idItem){
                    Item.delete(idItem, () => {
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.json({ message: "item supprimé avec succès.", newtoken: newToken })
                    });
                    config.userHistory(idUser, 'supprimer item', "suppression d'item : "+items[0].libelle);
                }else{
                    res.status(404).json({ message: 'Erreur inattendu' });
                }
            }
        })
    }
}

module.exports = itemController;