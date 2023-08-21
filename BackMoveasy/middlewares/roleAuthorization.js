const formidable = require('formidable');
const Role = require('../models/role')
function roleAuthorization(req, res, next) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send('Erreur lors de l\'analyse des données de formulaire');
    }else{
        const idUser = req.user.idUser;
        const idProjet = fields.idProjet; // Accédez à idProjet depuis les champs analysés
        
        Role.getRole(idUser, idProjet, (roleUser) => {
            if(roleUser){
              if(roleUser[0].role != 'admin'){
                return res.status(403).json({ message: "Vous n'êtes pas autorisé pour réaliser cet action." });
              }else{
                  // Transférez les champs et les fichiers à req.body pour qu'ils soient disponibles pour Multer
                  req.body = fields;
                  req.files = files;
              
                  next();
              }
            }
        })
    }
  });
}


module.exports = roleAuthorization;
