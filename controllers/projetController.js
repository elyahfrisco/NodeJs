const jwt = require('jsonwebtoken');
const Projet = require('../models/projet');
const config = require('../config')

const projetController = {
    create: function(req, res){
        const {libelle, depart, arrive} = req.body;
        const {idUser, username, email, phone} = req.user;

        if (libelle) {
            Projet.create(libelle, depart, arrive, idUser, ()=>{
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({ message: 'Creation projet reussie', newToken: newToken })
            });
            config.userHistory(idUser, 'créer projet', 'création projet '+libelle);

        // Vous pouvez renvoyer le nouveau token dans la réponse si nécessaire.
        } else {
            res.status(404).json({ message: 'Le champ libbelé ne doit pas être vide.' });
        }
    },

    list: function(req, res){
        const {idUser, username, email, phone} = req.user;

        Projet.getAll(idUser, (projects)=>{
            if(projects){
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({projet: projects, newToken: newToken});
            }else{
                res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des projets.' });
            }
        })
    },

    getById: function(req, res){
        const projectId = req.params.id;
        const {idUser, username, email, phone} = req.user;

        Projet.getById(projectId, idUser, (project)=>{
            if(!project){
                res.status(401).json({ message: "Il n'y a pas de projet associé à ce id." });
            }else{
                const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                res.status(201).json({projet: project, newToken: newToken});
            }
        });
    },

    update: function(req, res){
        const projectId = req.params.id;
        const {libelle, depart, arrive} = req.body;
        const {idUser, username, email, phone} = req.user;
        
        Projet.getById(projectId, idUser, (projet)=>{
            if(!projet){
                res.status(401).json({ message: "Le projet n'existe pas" });
            }else{
                if (libelle && projectId && idUser) {
                    Projet.update(projectId, idUser, libelle, depart, arrive, ()=>{
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.status(201).json({ message: 'Modification projet reussie.', newToken: newToken })
                    })
                    config.userHistory(idUser, 'modifier projet', (libelle != projet.libelle) ? 'modification du projet '+projet.libelle+' en '+libelle : 'modification du projet');                    
        
                // Vous pouvez renvoyer le nouveau token dans la réponse si nécessaire.
                } else {
                    res.status(404).json({ message: 'Le champ libellé, id_user, id_projet ne doivent pas être vide.' });
                }  
            }
        });      
    },

    delete: function(req, res){
        const projectId = req.params.id;
        const {idUser, username, email, phone} = req.user;
        Projet.getById(projectId, idUser, (projet)=>{
            if(!projet){
                res.status(401).json({ message: "Le projet n'existe pas" });
            }else{
                if (idUser) {
                    Projet.delete(projectId, idUser, ()=>{
                        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
                        res.json({ message: "Projet supprimé avec succès.", newToken: newToken })
                    });
                    config.userHistory(idUser, 'supprimer projet', 'suppression du : '+projet.libelle);
                
                // Vous pouvez renvoyer le nouveau token dans la réponse si nécessaire.
                } else {
                    res.status(404).json({ message: 'Erreur inattendu' });
                }  
            }
        });
    }
}
module.exports = projetController;