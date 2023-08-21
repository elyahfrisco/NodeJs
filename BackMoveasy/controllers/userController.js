// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const mail = require('../controllers/mailController');
// const { use } = require('../routes/projetRoutes');
const twilioClient = config.twilioClient;
let verificationCode = null;
let phoneVerify = null;
function generateVerificationCode() {
  // Générez un code de vérification aléatoire (vous pouvez utiliser une logique plus complexe si nécessaire)
  return Math.floor(1000 + Math.random() * 9000);
}

function generateCode() {
  // Générez un code de vérification aléatoire (vous pouvez utiliser une logique plus complexe si nécessaire)
  return Math.floor(1000 + Math.random() * 9000);
}

const userController = {
  signup: function (req, res) {
    const { username, email, phone, password } = req.body;

    // Vérifier que l'utilisateur n'existe pas déjà dans la base de données
    User.findByEmail(email, (user) => {
      if (user) {
        res.status(409).json({ message: 'Cet utilisateur existe déjà' });
      } else {
        // Hasher le mot de passe avant de le stocker dans la base de données
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;

          // Insérer l'utilisateur dans la base de données avec le mot de passe haché
          User.create(username, email, phone, hash, () => {
            res.status(201).json({ message: 'Inscription réussie' });
            mail.sendMailUser(email);
          });
        });
      }
    });
  },

  signupPhone: function (req, res) {
    const { phoneNumber } = req.body;
  
    if (!phoneNumber) {
      return res.status(400).json({ message: "Le numéro de téléphone est requis." });
    }

    User.findByPhone(phoneNumber, (user)=>{
      if (user) {
        res.status(409).json({ message: 'Le numéro de téléphone existe déjà' });
      } else {
        phoneVerify = phoneNumber;
        verificationCode = generateVerificationCode();
        
        twilioClient.messages
          .create({
            body: `Votre code de vérification est : ${verificationCode}`,
            from: '+19033076958',
            to: phoneNumber
          })
          .then(message => {
            console.log(message.sid);
            res.json({ message: "Le code de vérification a été envoyé avec succès." });
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de l'envoi du code de vérification." });
          });
      }
    });  
  },

  verifyPhone: function (req, res) {
    const {codeConfirmation, username, email, phoneVerify, password} = req.body;
    // Mettre à jour le nom d'utilisateur dans la base de données
    if (codeConfirmation == verificationCode) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Insérer l'utilisateur dans la base de données avec le mot de passe haché
        User.create(username, email, phoneVerify, hash, () => {
          res.status(201).json({ message: 'Code de vérification valide. Inscription réussie!' });
        });
      });
    } else {
      // Le code est invalide, renvoyez un message d'erreur
      res.status(400).json({ message: 'Code de vérification incorrect. Veuillez réessayer.'});
    }
  },

  login: function (req, res) {
    const { email, phone, password } = req.body;

    if(email){
      // Récupérer l'utilisateur depuis la base de données
      User.findByEmail(email, (user) => {
        if (!user) {
          res.status(401).json({ message: "L'utilisateur n'existe pas" });
        } else {
          // Vérifier le mot de passe haché
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              // Générer un token JWT pour l'authentification avec une durée d'expiration de 1 heure (3600 secondes)
              const token = jwt.sign({ idUser: user.id_user, username: user.username, email: user.email, phone: user.phone }, config.secretKey, { expiresIn: '1h' });
              res.json({ token });
            } else {
              res.status(401).json({ message: 'Mot de passe incorrect' });
            }
          });
        }
      });
    }else if (phone) {
      // Récupérer l'utilisateur depuis la base de données
      User.findByPhone(phone, (user) => {
        if (!user) {
          res.status(401).json({ message: "L'utilisateur n'existe pas" });
        } else {
          // Vérifier le mot de passe haché
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              // Générer un token JWT pour l'authentification avec une durée d'expiration de 1 heure (3600 secondes)
              const token = jwt.sign({ idUser: user.id_user, username: user.username, email: user.email, phone: user.phone }, config.secretKey, { expiresIn: '1h' });
              res.json({ token });
            } else {
              res.status(401).json({ message: 'Mot de passe incorrect' });
            }
          });
        }
      });
    }
  },

  about: function (req, res) {
    // Vous pouvez accéder aux informations de l'utilisateur à partir de req.user
    const userEmail = req.user.email;
    const userPhone = req.user.phone;

    if(userEmail){
      // Vous pouvez utiliser ces informations pour rechercher plus de détails sur l'utilisateur dans la base de données
      User.findByEmail(userEmail, (user) => {
        if (user) {
          console.log(user);
          // Renvoyer les informations de l'utilisateur dans la réponse
          res.json({
            message: 'Ressource accessible. Token valide.',
            user: {
              idUser: user.id_user,
              username: user.username,
              email: user.email,
              phone: user.phone,
              // Ajoutez d'autres propriétés de l'utilisateur que vous souhaitez exposer
            },
          });

          // Renouvellement du token avec une nouvelle durée d'expiration de 1 heure
          const newToken = jwt.sign({ idUser: user.id_user, username: user.username, email: user.email, phone: user.phone }, config.secretKey, { expiresIn: '1h' });
          res.json({token: newToken});
          // Vous pouvez renvoyer le nouveau token dans la réponse si nécessaire.
        } else {
          res.status(404).json({ message: 'Utilisateur introuvable' });
        }
      });
    }else if(userPhone){
      User.findByPhone(userPhone, (user) => {
        if (user) {
          // Renvoyer les informations de l'utilisateur dans la réponse
          res.json({
            message: 'Ressource accessible. Token valide.',
            user: {
              idUser: user.id_user,
              username: user.username,
              email: user.email,
              phone: user.phone,
              // Ajoutez d'autres propriétés de l'utilisateur que vous souhaitez exposer
            },
          });

          // Renouvellement du token avec une nouvelle durée d'expiration de 1 heure
          const newToken = jwt.sign({ idUser: user.id_user, username: user.username, email: user.email, phone: user.phone }, config.secretKey, { expiresIn: '1h' });
          res.json({token: newToken});
          // Vous pouvez renvoyer le nouveau token dans la réponse si nécessaire.
        } else {
          res.status(404).json({ message: 'Utilisateur introuvable' });
        }
      });
    }
  },

  updateUser: function (req, res) {
    // Récupérer le nom d'utilisateur (username) et l'email depuis l'objet req.user
    const id = req.params.id;
    const {nouveauUsername} = req.body;
    const {idUser, username} = req.user;
    // Mettre à jour le nom d'utilisateur dans la base de données
    User.update(nouveauUsername, id, (results) => {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Aucune mise à jour effectuée. Utilisateur introuvable." });
      }
      config.userHistory(idUser, 'modifier projet', "mise a jour de l'attribut username "+username+" en "+nouveauUsername);
      const newToken = jwt.sign({ idUser: user.id_user, username: user.username, email: user.email, phone: user.phone }, config.secretKey, { expiresIn: '1h' });
          
      res.json({ message: "Mise à jour réussie.", newToken: newToken });
    });
  },

  passwordRecovery: function(req, res){
    const email = req.body.email;
    console.log("test");
    User.findByEmail(email, (user) =>{
      if (user) {
        recoveryCode = generateCode()
        textRecovery = `
        Cher/Chère ${user.username},
        Il semble que vous ayez demandé à réinitialiser votre mot de passe pour votre compte.
        Code de vérification: ${recoveryCode}
        Cordialement,
        L'équipe de Moveasy
        `
        mail.sendMailUser(email, 'Récupération de mot de passe', textRecovery)
        res.json({
          message: 'Nous avons envoyé un code de récuperation à votre email',
        });
      } else {
        res.status(404).json({ message: 'Utilisateur introuvable' });
      }
    })
  },

  newPassword: function(req, res){
    const {email, code, password} = req.body;
    User.findByEmail(email, (user) => {
      if(user){
        if(code == recoveryCode){
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
  
            // Insérer l'utilisateur dans la base de données avec le mot de passe haché
            User.changePassword(hash, user.id_user, () => {
              res.status(201).json({ message: 'Mise à jour mot de passe réussi' });
            })
          });
        }else{
          res.status(403).json({ message: 'Code invalide'});
        }
      }
    })
  },

  history: function(req, res){
    const {idUser, username, email, phone} = req.user;
    User.history(idUser, (results)=>{
      if(results){
        const newToken = jwt.sign({ idUser: idUser, username: username, email: email, phone: phone }, config.secretKey, { expiresIn: '1h' });
        res.json({Response: results, newToken: newToken});
      }else{
          res.status(404).json({ message: "Aucune action n'a été effectué" });
      }
    })
  }
};

module.exports = userController;
