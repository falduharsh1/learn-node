//nodemailer is used for send mail and in auth , pass generate in stackoverflow website 

const nodemailer = require('nodemailer');
const Resend = require('resend')

// const sendMail = async (email,subject,message) => {
//     const transporter = await nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'falduharsh1@gmail.com',
//           pass: 'smdf xjdd iwnj eqtw'
//         }
//       });

//       const mailOptions = {
//         from: 'falduharsh1@gmail.com',
//         to: email,
//         subject: subject,
//         text: message
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// }

const sendMail = async (email, subject, message) => {
  try {
    const resend = new Resend(process.env.RESEND_EMAIL);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: message
    });

    return true

  } catch (error) {
    throw new Error("error in resend otp through mail")
  }
}

const resetToken = () => {

}

module.exports = {
  sendMail,
  resetToken
}

