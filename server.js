const express   = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv');
const app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app);
const io = require('socket.io')(http);
// const JoinGame = require('./routes/io/joinGame');
// const MovePlayer = require('./routes/io/movePlayer');
// const BulletStorage = require('./routes/io/bulletStorage');

dotenv.config()
connectDB()

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', (socket) => {
    console.log('-----------Hello socket world---------------');
    // socket.on('JOIN_GAME', JoinGame(io, socket));
    // socket.on('MOVE_PLAYER', MovePlayer(io, socket));
    // socket.on('BULLET', BulletStorage(io, socket));
})

const PORT = process.env.PORT || 5000

http.listen(PORT, ()=> {
    console.log('listening on *:' + PORT);
});