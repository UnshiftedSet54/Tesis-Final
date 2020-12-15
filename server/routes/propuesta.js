const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.post('/propuesta', async (req, res) => {

    const { anuncio_id, username_freelancer, descripcion, user_prop } = req.body

    await pool.query('INSERT INTO propuesta (anuncio_id, username_freelancer, descripcion, user_prop) VALUES($1, $2, $3, $4)', [anuncio_id, username_freelancer, descripcion, user_prop])

    return res.status(200).json({ message: 'Propuesta enviada exitosamente' })

})

router.get('/propuesta/:id', async (req, res) => {

    const { id } = req.params

    let resp = await pool.query("SELECT * FROM propuesta WHERE user_prop = $1", [id])

    return res.status(200).json({ propuestas: resp.rows })

})

router.get('/propuestabyanuncio/:id', async (req, res) => {

    const { id } = req.params

    let resp = await pool.query('SELECT * FROM propuesta WHERE anuncio_id = $1', [id])

    return res.status(200).json({ propuestas: resp.rows })

})

module.exports = router
