import io, {Socket} from "socket.io-client"

class SocketApi {
    static socket = null;
    static createConnection() {
       this.socket = io("http://localhost:3200/");

       this.socket.on("connect", () => {
            console.log('CONNECTED');
       })

       this.socket.on("disconnect", (e) => {
            console.log('DISCONNECTED');
        })
    }
}

export default SocketApi;