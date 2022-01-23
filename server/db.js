const Pool = require('pg').Pool

let pool

if (process.env.NODE_ENV === 'production') {

      pool = new Pool({
        connectionString: /* process.env.DATABASE_URL */"postgresql://postgres:123@localhost:5432/tesis2",
        ssl: {
          rejectUnauthorized: false
        }
      });

} else {
   
      pool = new Pool({
        user: "postgres",
        password: "123",
        host: "localhost",
        port: 5432,
        database: "tesis2"
    }) 
}



pool.connect((err, client, done) => {
    if(err) {
        console.log("Error al conectar", err.stack)
    }else {
        console.log("Conectado satisfactoriamente")
        console.log(process.env.DATABASE_URL)
    }
})

module.exports = pool