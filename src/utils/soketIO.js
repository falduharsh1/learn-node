const { Server } = require("socket.io");

const connectChat = () => {
    try {
        const io = new Server({
            cors: {
                origin: ["http://localhost:3000"]
              }
        });

        io.on("connection", (socket) => {
            console.log("socket", socket.id);

            socket.on("Send_message", (msg) => {
                console.log('Send_message');
                
                io.emit("receive_message", msg);
              });

        });

        io.on("connection", (socket) => {
            socket.emit("hello", "welcome");
          });

          

        io.listen(process.env.CHAT_PORT);



    } catch (error) {
        console.log(error);
    }
}

module.exports = connectChat