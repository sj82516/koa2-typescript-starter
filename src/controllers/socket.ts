import config from "../config/local";
import errorMsg from "../utils/errorMsg";
import logger from "../utils/logger";

// socket 
export default function () {
    global.io.on('connection', async function (socket: any) {
        let user_id = socket.handshake.query.user_id

        try {
            socket.on('client_init', async function (data: any) {
                
                socket.emit("machine_setting");
            });

            socket.on('disconnect', async function () {
            })

            socket.on('reconnect', async function () { 
                
            })
        } catch (error) {
            logger.error(error)
        }
    })
}