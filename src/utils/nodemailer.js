//nodemailer is used for send mail and in auth pass generate in stackoverflow website 

const nodemailer = require('nodemailer');

const sendMail = async (email,subject,message) => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'falduharsh1@gmail.com',
          pass: 'smdf xjdd iwnj eqtw'
        }
      });
      
      const mailOptions = {
        from: 'falduharsh1@gmail.com',
        to: email,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendMail

