//nodemailer is used for send mail and in auth pass generate using 

const nodemailer = require('nodemailer');

const sendMail = async () => {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'falduharsh1@gmail.com',
          pass: 'smdf xjdd iwnj eqtw'
        }
      });
      
      const mailOptions = {
        from: 'falduharsh1@gmail.com',
        to: 'tirth.patel6521@gmail.com',
        subject: 'visit dubai',
        text: 'for toilet cleaning'
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

