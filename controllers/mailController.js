const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elyahfrisco7@gmail.com',
    pass: 'bkxeqiamvdsvxear'
  }
});





module.exports = {
  sendMailUser: function(sendTo, subject, text){
    let mailOptions = {
      from: 'elyahfrisco7@gmail.com',
      to: sendTo,
      subject: subject,
      text: text
    };
      
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });
  },
  requestCollaborate: function(email, username, sendTo, poste, data) {
    let mailOptions = {
      from: email,
      to: sendTo,
      subject: 'Confirmation de collaboration',
      html: `
        <p>Bonjour,</p>
        <p>Je me permets de vous contacter aujourd'hui pour vous proposer une collaboration potentielle sur notre projet. En tant que professionnel(le) respecté(e) dans votre domaine, je pense que vous pourriez apporter une valeur significative à notre travail.</p>
        <p>Poste proposé : ${poste}</p>
        <p>Si vous êtes intéressé, veuillez confirmer votre intérêt en cliquant sur le bouton "Confirmer" ci-dessous:</p>
        <a href='http://localhost:3000/collaborateur/confirm/${data}' style='display: inline-block; width: 200px; height: 50px; background-color: blue; color: white; text-align: center; line-height: 50px; text-decoration: none;'>Confirmer collaboration</a>
        <p>Si vous avez des questions ou souhaitez discuter plus en détail, n'hésitez pas à me contacter.</p>
        <p>Dans l'attente de votre réponse,</p>
        <p>${username}</p>
      `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });
  }

}