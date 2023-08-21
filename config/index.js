const crypto = require('crypto');
const twilio = require('twilio');

//Fonction pour générer une clé secrète aléatoire
function generateSecretKey() {
  return crypto.randomBytes(64).toString('hex');
}



const accountSid = 'AC387ded2c479890e8b5c67bb0c4f196a0';
const authToken = 'e0d492eb3ba03b4076103852a3633ca7';
const twilioClient = twilio(accountSid, authToken);

module.exports = {
  keyConfirm: 'a4B94dFem8gR9B9fH9F3k4mD4Gg3fG9eK4Lw2x7C88rB9',
  secretKey: generateSecretKey(),
  twilioClient: twilioClient,
  userHistory: function(idUser, action, detail){
    const db = require('./db');
    dateAction = new Date();
    db.query('INSERT INTO user_history (user_id, action, detail, date) VALUES (?,?,?,?)', [idUser, action, detail, dateAction]);
  }
};
