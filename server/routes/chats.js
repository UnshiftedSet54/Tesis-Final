const express = require('express');
const router = express.Router();
const pool = require("../db");


router.post('/createChat', async (req, res) => {

    const { username_freelancer_two  } = req.body

    const resp = await pool.query("INSERT INTO chat (username_freelancer_one, username_freelancer_two) VALUES ($1, $2) RETURNING *", [req.user.username_freelancer, username_freelancer_two])

    return res.status(200).json( { chatId: resp.rows[0]  }  )

})

router.get('/chat/:id', async(req, res) => {

    const { id } = req.params

    const resp = await pool.query("SELECT * FROM chat where chat_id = $1", [id])

    return res.status(200).json({ chat: resp.rows[0] })

})

module.exports = router