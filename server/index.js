//Inicializaciones
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

const http = require('http')
const socketio = require('socket.io')

const session = require('express-session')
const passport = require('passport')
const cookieSession = require('cookie-session')

const server = http.createServer(app)
const io = socketio(server)

const cookieParser = require('cookie-parser')

const initializePassport = require('./passport.Config')


//Middlewares
app.use(express.json())
app.use(cors())


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))


// app.use(cookieSession({
//     name: 'WORK APP',
//     keys: ['very secret key'],
//     maxAge: 30 * 24 * 60 * 60 * 1000
// }))

app.use(cookieParser('secretcode'))
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport)

io.on('connection', (socket) => {

    socket.on('join', ({room}) => {
        socket.join(room) 

        socket.room = room
        
    })

    socket.on('sendMessage', async (message) => {

    //    await pool.query("INSERT INTO chat (chat_id, from_user, to_user, texto) VALUES ($1, $2, $3, $4)", [socket.room, message.username, message.toUser, message.texto])

        socket.broadcast.to(socket.room).emit('message', { user: message.username, text: message.texto })

        // io.to('123456').emit('message', )

    })

    socket.on('disconnect', () => {
        console.log("User had left")
    })
    
})

//Rutas
app.use(require('./routes/auth'))
app.use(require('./routes/rubro'))
app.use(require('./routes/area'))
app.use(require('./routes/auncios'))
app.use(require('./routes/propuesta'))
app.use(require('./routes/userinfo'))

const PORT = process.env.PORT || 5000

//Escuchando
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

