const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.get("/areas/:id", async (req, res) => {
  let rubro_id = req.params.id;

  try {
    const resp = await pool.query("SELECT * FROM area WHERE rubro_id = $1", [
      rubro_id,
    ]);
    return res.status(200).json({ areas: resp.rows });
  } catch (err) {
    console.log("ERR", err);
  }
});

router.post("/area", async (req, res) => {
  const { rubro_id, nombre } = req.body;

  console.log("RUBRO", req.body)

  try {
    const resp = await pool.query(
      "INSERT INTO area (rubro_id, nombre) VALUES ($1, $2)",
      [rubro_id, nombre]
    );

    return res.json({ resp: resp });
  } catch (err) {
    console.log("ERROR", err);
  }
});

/* Relaciono las areas con un user */
router.post("/arearelation", async (req, res) => {
  const { rubro, info } = req.body;

  const { user } = req
  
  let areas = [];

  try {
    info.map(async (v) => {
      const resp = await pool.query(
        "INSERT INTO free_area  (username_freelancer, rubro_id, area_id, experiencia) VALUES ($1, $2, $3, $4) RETURNING *",
        [user.username_freelancer, rubro.rubro_id, v.id, v.experiencia]
      );
      areas.push(resp.rows[0]);

      if (areas.length === info.length) {
        return res.status(200).json({ msg : 'Areas guardadas exitosamente' })
      }
    });
  } catch (err) {}
});

module.exports = router;
