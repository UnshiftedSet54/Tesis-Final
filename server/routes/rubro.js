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

})


router.get('/rubroinfo/:id', async (req, res) => {

    const { id } = req.params
  
    const resp = await pool.query('SELECT free_area.rubro_id, free_area.username_freelancer, rubro.nombre FROM free_area inner join rubro ON free_area.rubro_id = rubro.rubro_id WHERE free_area.rubro_id = $1', [id])

    const users_total = await pool.query('SELECT * FROM freelancerusuario WHERE isbussines = $1', [false])

    const filtar_array = resp.rows.filter((valor, i) => resp.rows.findIndex(value => value.username_freelancer === valor.username_freelancer ) === i )

    if (!!resp.rows.length) {
        
        const data_final = {
          rubro_id : resp.rows[0].rubro_id,
          nombre: resp.rows[0].nombre,
          count: filtar_array.length,
          users_total : users_total.rows.length
        }
      
        return res.status(200).json({ msg: 'Data enviada exitosamente', data : data_final })

    } else {
        return res.status(200).json({ msg : 'No hay informacion del rubro seleccionado', data : null })
    }

  
  })


module.exports = router