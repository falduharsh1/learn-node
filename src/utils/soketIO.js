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

            socket.on("Send_message", ({message,to}) => {
                console.log(message,to);
                
                io.to(to).emit("receive_message", message);
              });

              socket.on("group_name",(group) => {
                socket.join(group)
              })

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