const { Router } = require("express");
const router = Router();
const pool = require("../db");

 
router.get('/userinfo/:id', async (req, res) => {

    const { id } = req.params

    try {

        const resp = await pool.query("select * from freelancerusuario inner join free_area on freelancerusuario.username_freelancer = free_area.username_freelancer inner join area on area.area_id = free_area.area_id where freelancerusuario.username_freelancer = $1", [id])
     
        let result = 
         {
             username_freelancer: resp.rows[0].username_freelancer,
             username_nombre: resp.rows[0].nombre_completo,
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


    } catch (err) {
        console.log(err)
    }


})

router.get('/getuserinfologged', async (req, res) => {

    

    if (req.user.isbussines) {



    } else {

        try {
            const resp = await pool.query("select * from freelancerusuario inner join free_area on freelancerusuario.username_freelancer = free_area.username_freelancer inner join rubro on rubro.rubro_id = free_area.rubro_id  inner join area on area.area_id = free_area.area_id where freelancerusuario.username_freelancer = $1", [req.user.username_freelancer])
    
            const propuestas = await pool.query("select * from propuesta where user_prop = $1", [req.user.username_freelancer])
    
            const rubro = await pool.query("select * from rubro")
    
            const checkPropuestasAreaName = await pool.query('select * from propuesta inner join anuncios_area on anuncios_area.anuncio_id = propuesta.anuncio_id inner join area on anuncios_area.area_id = area.area_id where user_prop = $1', [req.user.username_freelancer])
    
            const propuestasReadNumber = propuestas.rows.filter(v =>  v.isread === true ).length
    
            const filterRepeated = checkPropuestasAreaName.rows.filter((valor, i) => {
                return checkPropuestasAreaName.rows.findIndex(value => value.area_id === valor.area_id ) === i
            })
    
            const finalData = filterRepeated.map(valor => {
                return {
                    nombre: valor.nombre,
                    veces: checkPropuestasAreaName.rows.filter(value => value.area_id === valor.area_id  ).length
                }
            })
    
    
       let result = 
        {
            username_freelancer: resp.rows[0].username_freelancer,
            username_nombre: resp.rows[0].nombre_completo,
            estado: resp.rows[0].estado,
            pdf_url: resp.rows[0].pdf_url,
            rubro: rubro.rows.find(v => v.rubro_id === resp.rows[0].rubro_id ).nombre,
            area_info: resp.rows.map(v => {
                return {
                    nombre_area: v.nombre,
                    experiencia: v.experiencia
                }
            })
        }
    
        return res.status(200).json({ result, propuestasNumber: propuestas.rows.length, propuestasReadNumber: propuestasReadNumber, finalData  })

        } catch (err) {
            console.log(err)
        }


    }
})

router.put('/getuserinfologged', (req, res) => {

    const { newUrl } = req.body

    console.log("NEW URL", req.body)

    pool.query("UPDATE freelancerusuario set pdf_url = $1 where username_freelancer = $2 RETURNING *", [newUrl, req.user.username_freelancer])


})


module.exports = router