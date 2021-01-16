const express = require('express');
const router = express.Router();
const pool = require("../db");


router.post('/createChat', async (req, res) => {

    const { username_freelancer_two  } = req.body

    const checkExist = await pool.query('select * from chat where username_freelancer_two = $1 AND username_freelancer_one = $2', [username_freelancer_two, req.user.username_freelancer])

    if (checkExist.rows.length > 0) return res.status(200).json( { chatId : checkExist.rows[0].chat_id } )

    const resp = await pool.query("INSERT INTO chat (username_freelancer_one, username_freelancer_two) VALUES ($1, $2) RETURNING *", [req.user.username_freelancer, username_freelancer_two])

    return res.status(200).json( { chatId: resp.rows[0].chat_id  }  )

})

router.get('/chatback/:id', async(req, res) => {

    const { id } = req.params

    const resp = await pool.query("SELECT * FROM chat where chat_id = $1", [id])

    return res.status(200).json({ chat: resp.rows[0] })

})

router.get('/messages/:id', async (req, res) => {

    const { id } = req.params

    const resp = await pool.query("SELECT * FROM mensajes where chat_id = $1", [id])

    return res.status(200).json({ messages: resp.rows })

})

router.get('/chatuser', async (req, res) => {
       
    let resp
    
    try{
        if (req.user.isbussines) {
        
        resp = await pool.query("select * from chat inner join mensajes on chat.chat_id = mensajes.chat_id where username_freelancer_one = $1", [req.user.username_freelancer])
    
    
        } else {   
        resp = await pool.query('SELECT * FROM chat inner join mensajes on chat.chat_id = mensajes.chat_id where username_freelancer_two = $1', [req.user.username_freelancer])
        }

        
        const chats = resp.rows.map( (v, i) => {
            return {
                chat_id : v.chat_id,
                username_freelancer_one: v.username_freelancer_one,
                username_freelancer_two: v.username_freelancer_two
        }
    })
    
    const filterChats = chats.filter((v, i) => {
        return chats.findIndex(valor => valor.chat_id === v.chat_id ) === i
    })

    const mensajeInfo = filterChats.map(v => {
        return {
            ...v,
            lastMessage: resp.rows.filter(mensaje => mensaje.chat_id == v.chat_id ).map(value => {
                return {
                    mensaje_id: value.mensaje_id,
                    texto: value.texto,
                    username_freelancer: value.username_freelancer
                }
            }).reverse()[0]
        }
    })
    
    return res.status(200).json({ mensajeInfo })


    }catch {

    }
        
})

module.exports = router