const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.get("/anunciosnegocios", async (req, res) => {

    let array = Object.keys(req.query)
        .map((key) => req.query[key] )

    let anuncios = await pool.query('SELECT * FROM anuncios order by anuncio_id DESC')
    let anuncios_area = await pool.query("select * from anuncios_area INNER JOIN area on anuncios_area.area_id = area.area_id")

   let final_result = anuncios.rows.map(anuncio => {

        let filtro = anuncios_area.rows.filter(a_area  =>  a_area.anuncio_id == anuncio.anuncio_id).map(v => {
            return {
               rubroid: v.rubro_id,
               area_id: v.area_id,
               nombre : v.nombre
            }
        } )
        return {
            ...anuncio,
            area_Info : filtro,
            rubro_id : anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ) ? anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ).rubro_id : null
        }
    })


    if ( array.includes("0") && (req.query.value === undefined || req.query.value === "" )  ) {
        return res.status(200).json({ anuncios: final_result })

    }

    else {

        if (req.query.value == undefined) {

            let resultado_final = final_result.filter(v => { 
                return array.includes(v.rubro_id.toString())
              })
                       
             return res.status(200).json({ anuncios: resultado_final })

        }  else {

            let resultado_final = final_result.filter(v => { 
               return array.includes(v.rubro_id.toString()) && v.titulo.toLowerCase().includes(req.query.value.toLowerCase()) 
             })
                     
            return res.status(200).json({ anuncios: resultado_final })
        }

    }


});

router.get("/anunciosempleados", async (req, res) => {

    console.log("Anuncios de empleados")


});

router.post("/anunciosnegocios", async (req, res) => {

    /* El username_freelancer debe de traerse desde req.user */

    const { area_id, rubro_id, titulo, descripcion, disponibilidad } = req.body

    
    const resp = await pool.query("INSERT INTO anuncios (username_freelancer, titulo, descripcion, disponibilidad) VALUES ($1, $2, $3, $4) RETURNING *", 
    [
        req.user.username_freelancer,
        titulo,
        descripcion,
        disponibilidad
    ])

    area_id.map( async (v) => {
        await pool.query("INSERT INTO anuncios_area (anuncio_id, username_freelancer, area_id, rubro_id) VALUES($1, $2, $3, $4)", [
            resp.rows[0].anuncio_id,
            req.user.username_freelancer,
            v,
            rubro_id
        ])
    })

    return res.status(200).json({ message: 'Anuncio guardado exitosamente' })


});

router.post("/anunciosempleados", async (req, res) => {
    

});


router.get('/personalposts', async (req, res) => {

    let anuncios_res = await pool.query('SELECT * FROM anuncios WHERE username_freelancer = $1', [req.user.username_freelancer] )

    let anuncios = anuncios_res.rows.sort((a, b) =>  b.anuncio_id - a.anuncio_id  )
    let anuncios_area = await pool.query("select * from anuncios_area INNER JOIN area on anuncios_area.area_id = area.area_id where username_freelancer = $1", [req.user.username_freelancer])

    let final_result = anuncios.map(anuncio => {

        let filtro = anuncios_area.rows.filter(a_area  =>  a_area.anuncio_id == anuncio.anuncio_id).map(v => {
            return {
               rubroid: v.rubro_id,
               area_id: v.area_id,
               nombre : v.nombre
            }
        } )
        return {
            ...anuncio,
            area_Info : filtro,
            rubro_id : anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ) ? anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ).rubro_id : null
        }
    })

    return res.status(200).json({ anuncios: final_result })

})

router.delete('/personalposts/:id', async (req, res) => {

    /* Eliminacion cascada lista */
    await pool.query("DELETE FROM anuncios where anuncio_id = $1", [req.params.id] )

    return res.status(200).json({ message : 'Anuncio eliminado satisfactoriamente' })

})

router.put('/personalposts/:id', async (req, res) => {

    const { titulo, descripcion } = req.body

    await pool.query("UPDATE anuncios SET titulo = $1, descripcion = $2 where anuncio_id = $3", [titulo, descripcion, req.params.id])

    return res.status(200).json( { message: 'Anuncio modificado con exito' } )

})


module.exports = router;
