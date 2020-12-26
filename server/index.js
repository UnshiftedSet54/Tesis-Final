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

const path = require('path')


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

        console.log("SOCKET JOIN", message)
        console.log("ROOM", socket.room)

       const resp = await pool.query("INSERT INTO mensajes (chat_id, username_freelancer, texto) VALUES ($1, $2, $3) RETURNING *", [socket.room, message.username, message.texto])

        // socket.broadcast.to(socket.room).emit('message', { user: message.username, text: message.texto })

        io.to(socket.room).emit('message',  { mensaje_id: resp.rows[0].mensaje_id, chat_id: resp.rows[0].chat_id, username_freelancer: message.username, texto: message.texto } )

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
app.use(require('./routes/chats'))


if (process.env.NODE_ENV === 'production') {
    console.log("ENTRA")
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} 

const PORT = process.env.PORT || 5000

//Escuchando
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

