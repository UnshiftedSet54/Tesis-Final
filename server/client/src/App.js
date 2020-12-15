import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Redirect } from "react-router-dom";

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* HOC */
import PrivateRoute from './Hoc/PrivateRouter'
import PrivateRouteRegister from './Hoc/PrivateRouterRegister'
import PrivateRouteLoggedIn from './Hoc/isLoggedIn'

/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'
import HomeProfesional from './Pages/homeProfesional'
import Principal from './Pages/principal'
import RegisterProfesional from './Pages/registerProfesional'
import RegistroBusiness from './Pages/registerBusiness'
import PostRegister from './Pages/postRegisterPage'
import Rubro from './Pages/rubroPage'
import Dashboard from './Pages/dashboard'
import MiCuenta from './Pages/miCuenta'
import MiPerfil from './Pages/miPerfil'
import Publicaciones from "./Pages/publicaciones";
import Proyectos from "./Pages/proyectos";
import ChatPage from "./Pages/chatPage"
import PropuestaPage from "./Pages/propuestaPage"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        { console.log("USER", JSON.parse(localStorage.getItem("user"))) }

        <PrivateRouteLoggedIn exact path = "/" component = {Principal} />

        {/* <Route exact path = "/" component = {Principal} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Register} />
        
        <Route path = "/registro/profesional" component = {RegisterProfesional} />
        <Route path = "/registro/empresa" component = {RegistroBusiness} />

        <Route path = '/chat/:id' component = {ChatPage} />

        <PrivateRouteRegister path = "/registro/postregister" component={PostRegister} />
        <PrivateRouteRegister  path = "/registro/rubro" component={Rubro}  />
        <PrivateRoute path = "/dashboard" component={Dashboard} />

        <PrivateRoute path = "/mispublicaciones" component={Publicaciones} />
        <PrivateRoute path = "/misproyectos" component={Proyectos} />

        {/* <Route path = "/registro/postregister" component = {PostRegister} />
        <Route path = "/registro/rubro" component = {Rubro} /> */}
        <PrivateRoute path = "/home" component={HomeProfesional} />
        <PrivateRoute path = "/micuenta" component={MiCuenta} />
        <PrivateRoute path = "/miperfil" component={MiPerfil} />
        <PrivateRoute path = "/propuesta/:id" component={PropuestaPage} />

      </div>
    </BrowserRouter>
  );
}

export default App;
