const { Router } = require("express");
const router = Router();
const pool = require("../db");


router.get('/rubros', async (req, res) => {
    try {
        const resp = await pool.query('SELECT * FROM rubro')
        return res.status(200).json({ rubros: resp.rows })
    } catch(err) {
        console.log("ERR", err)
    }
})

router.get('/rubro/:id', (req, res) => {

    let id = req.params.id
})

router.post('/rubro', async (req, res) => {

    const { nombre  } = req.body

    const resp = await pool.query("INSERT INTO RUBRO (nombre) VALUES ($1)", [nombre])

    return res.status(200).json({ message: "Rubro creado exitosamente" })

    // return res.json({resp: resp})

})


module.exports = router