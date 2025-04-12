const twilio = require('twilio')

const sendOTP = () => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        client.verify.v2.services("VA2f2cd25c4b35e9404cba85061b4d1e76")
              .verifications
              .create({to: '+919104789646', channel: 'sms'})
              .then(verification => console.log(verification.sid));
    } catch (error) {
        console.log(error);
    }
}

const verificationOTP = async (otp) => {
    try {
        console.log(otp);
        
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

            const verificationCheck = await client.verify.v2
                .services("VA2f2cd25c4b35e9404cba85061b4d1e76")
                .verificationChecks.create({
                    code: otp,
                    to: "+919104789646",
                });

            console.log(verificationCheck.status);

        return verificationCheck.status

    } catch (error) {

    //   throw new Error(error.message)
        console.log(error);
        
    }
}

module.exports = { 
    sendOTP, 
    verificationOTP 
}