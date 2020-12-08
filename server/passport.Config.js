const LocalStrategy = require("passport-local").Strategy;

const pool = require("./db");

const { compare } = require("bcryptjs");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await pool.query(
        "SELECT * from freelancerUsuario where username_freelancer = $1",
        [username]
      );

      if (user.rows.length == 0)
        return done(null, false, { message: "Usuario no existente" });

      const checkCredentials = await compare(password, user.rows[0].password);

      if (checkCredentials) {
        /* Vaciamos la contraseña para que no se envie en el front */
        delete user.rows[0]["password"];

        return done(null, user.rows[0]);
      }

      return done(null, false, { message: "Contraseña o usuario incorrectos" });
    } catch (err) {
      console.log("ERR", err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.username_freelancer));

  passport.deserializeUser(async (id, done) => {
   const user = await pool.query("SELECT * from freelancerUsuario where username_freelancer = $1", [id])

   delete user.rows[0]["password"];
 
   return done(null, user.rows[0]);
      
    
  });
}

module.exports = initialize;
