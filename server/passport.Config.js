const LocalStrategy = require("passport-local").Strategy;

const pool = require("./db");

const { compare } = require("bcryptjs");

function initialize(passport) {
  const authenticateUser = async (username, password, isBussines, done) => {
    // if (isBussines) {
    //   try {
    //     const user = await pool.query(
    //       "SELECT * from business where username_business = $1",
    //       [username]
    //     );

    //     if (user.rows.length == 0)
    //       return done(null, false, { message: "Usuario no existente" });

    //     const checkCredentials = await compare(password, user.rows[0].password);

    //     if (checkCredentials) {
    //       /* Vaciamos la contraseña para que no se envie en el front */
    //       delete user.rows[0]["password"];

    //       return done(null, user.rows[0]);
    //     }

    //     return done(null, false, {
    //       message: "Contraseña o usuario incorrectos",
    //     });
    //   } catch (err) {
    //     console.log("ERR", err);
    //   }
    // }
    // if (isBussines === false) {
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

        return done(null, false, {
          message: "Contraseña o usuario incorrectos",
        });
      } catch (err) {
        console.log("ERR", err);
      }
    // }
    // if (isBussines === undefined) {
      // try {
      //   const userBusiness = await pool.query(
      //     "SELECT * from business where username_business = $1",
      //     [username]
      //   );

      //   const userFree = await pool.query(
      //     "SELECT * from freelancerUsuario where username_freelancer = $1",
      //     [username]
      //   );

      //   if (userBusiness.rows.length == 0 && userFree.rows.length == 0)
      //     return done(null, false, { message: "Usuario no existente" });

      //   if (userBusiness.rows.length > 0 && userFree.rows.length == 0) {
      //     const checkCredentials = await compare(
      //       password,
      //       userBusiness.rows[0].password
      //     );

      //     if (checkCredentials) {
      //       /* Vaciamos la contraseña para que no se envie en el front */
      //       delete userBusiness.rows[0]["password"];

      //       return done(null, userBusiness.rows[0]);
      //     }
      //     return done(null, false, {
      //       message: "Contraseña o usuario incorrectos",
      //     });
      //   }
      //   if (userBusiness.rows.length == 0 && userFree.rows.length > 0) {
      //     const checkCredentials = await compare(
      //       password,
      //       userFree.rows[0].password
      //     );

      //     if (checkCredentials) {
      //       /* Vaciamos la contraseña para que no se envie en el front */
      //       delete userFree.rows[0]["password"];

      //       return done(null, userFree.rows[0]);
      //     }
      //     return done(null, false, {
      //       message: "Contraseña o usuario incorrectos",
      //     });
      //   }
      // } catch (err) {
      //   console.log("ERROR", err);
      // }
    // }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        isBussines = req.body.isBussines;
        authenticateUser(email, password, isBussines, done);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser(async (userFinal, done) => {
    let user;
    // if (userFinal.isbussines) {
    //   user = await pool.query(
    //     "SELECT * from business where username_business = $1",
    //     [userFinal.username_business]
    //   );
    // } else {
      user = await pool.query(
        "SELECT * from freelancerUsuario where username_freelancer = $1",
        [userFinal.username_freelancer]
      );
    // }

    delete user.rows[0]["password"];

    return done(null, user.rows[0]);
  });
}

module.exports = initialize;
