const Pool = require('pg').Pool

let pool


if (process.env.NODE_ENV === 'production') {

      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });

} else {
   
      pool = new Pool({
        user: "postgres",
        password: "12345",
        host: "localhost",
        port: 5432,
        database: "PruebaTesis"
    }) 
}



pool.connect((err, client, done) => {
    if(err) {
        console.log("Error al conectar", err.stack)
    }else {
        console.log("Conectado satisfactoriamente")
    }
})

module.exports = pool