const { Router } = require("express");
const router = Router();
const pool = require("../db");

 
router.get('/userinfo/:id', async (req, res) => {

    const { id } = req.params

   const resp = await pool.query("select * from freelancerusuario inner join free_area on freelancerusuario.username_freelancer = free_area.username_freelancer inner join area on area.area_id = free_area.area_id where freelancerusuario.username_freelancer = $1", [id])

   let result = 
    {
        username_freelancer: resp.rows[0].username_freelancer,
        estado: resp.rows[0].estado,
        pdf_url: resp.rows[0].pdf_url,
        rubro_id: resp.rows[0].rubro_id,
        area_info: resp.rows.map(v => {
            return {
                nombre_area: v.nombre,
                experiencia: v.experiencia
            }
        })
    }

   return res.status(200).json({ result })

})


module.exports = router