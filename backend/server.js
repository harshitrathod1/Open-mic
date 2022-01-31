require('dotenv').config();
const express = require('express');

const app = express();

const DbConnect = require('./database');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ACTIONS = require("./actions");

const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET','POST']
    }
});

app.use(cookieParser());
const corsOption = {
    credentials : true, 
    origin : ['http://localhost:3000']
};

app.use(cors(corsOption)) 
app.use('/storage',express.static('storage'))

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(bodyParser.json({ limit :'8mb'}));
app.use(router);

app.get('/', (req,res) => {
    res.send("Hello from express Js");
});

//Sockets
const socketUserMapping = { }

io.on('connection',(socket) => {
    socket.on(ACTIONS.JOIN,({ roomId,user }) => {
        //user object structure{_id,name,avatar,activated,createdAt}
        socketUserMapping[socket.id] = user;

        //Out of all rooms on server get me room with given roomId and clients in it
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId)|| []);
        
        //Send every client present in the room a invite
        clients.forEach(clientSocketId => {
            io.to(clientSocketId).emit(ACTIONS.ADD_PEER,{
                peerId: socket.id,
                createOffer: false,
                user
            });
            
            socket.emit(ACTIONS.ADD_PEER,{
                peerId : clientSocketId,
                createOffer: true,
                user : socketUserMapping[clientSocketId],
            });

        });
        socket.join(roomId);
    });

    //Handle ICE candidates
    socket.on(ACTIONS.RELAY_ICE,({ peerId, icecandidate}) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId : socket.id,
            icecandidate,
        })
    });

    //Handle relay offer and answers
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId : socket.id,
            sessionDescription, 
        })
    });

    //Handle mute and unmute
    socket.on(ACTIONS.MUTE,({ roomId, userId}) => {
        //Get all clients in a room
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        
        //Forward mute event to each client
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.MUTE,{
                peerId : socket.id,
                userId
            });
        })
    });

    socket.on(ACTIONS.UN_MUTE,({ roomId, userId}) => {
        //Get all clients in a room
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        
        //Forward un-mute event to each client
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.UN_MUTE,{
                peerId : socket.id,
                userId
            });
        })
    });

    //Leaving the room
    const leaveRoom = ({ roomId }) => {
        const { rooms } = socket;
        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                    peerId : socket.id,
                    userId : socketUserMapping[socket.id]?.id,
    
                })
                socket.emit(ACTIONS.REMOVE_PEER,{
                    peerId : clientId,
                    userId : socketUserMapping[clientId]?.id,
                })
    
                socket.leave(roomId);
            });
        
        })

        delete socketUserMapping[socket.id];
    };

    socket.on(ACTIONS.LEAVE,leaveRoom);
    socket.on('disconnecting',leaveRoom);
});

server.listen(PORT,() => console.log(`Listening on Port ${PORT}`)) ;


