import { Server } from 'socket.io';
import './db.js'
import {pool} from "./db.js";
let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                try {
                    const result = await pool.query(
                        `UPDATE users SET socketid = $1 WHERE id = $2 RETURNING *`,
                        [socket.id, userId]
                    );
                    console.log(`User updated: ${result.rows[0]}`);
                } catch (error) {
                    console.error('Error updating user socketid:', error);
                }
            }else if(userType === 'captain'){
                try{
                    const result = await pool.query(
                        `UPDATE captaindetails SET socketid = $1 WHERE id = $2 RETURNING *`,
                        [socket.id, userId]
                    );
                    console.log(`User updated: ${result.rows[0]}`);
                }catch (error){
                    console.error('Error updating captain socketid:', error);
                }
            }
            console.log(`User joined: ${data}`);
            socket.join(data);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

export { initializeSocket, sendMessageToSocketId };
