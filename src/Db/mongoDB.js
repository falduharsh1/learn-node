const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => {console.log("Connect SuccessFully");
        })
        .catch((error) => {console.log("Not Connect",error);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB