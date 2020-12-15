import axios from "axios";

/* Tipos */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADING,
  NOT_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGOUT_SUCCESS
} from "../actions/types";

import { returnErrors } from "./errorActions";

/*** Funcion que realizara el login en comunicacion con el reducer */
export const login = (username, password, history) => async (dispatch) => {
  let body = JSON.stringify({ username, password });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: USER_LOADING });

    let res = await axios.post("/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...res.data.user,
      })
    );

    history.push("/home");
  } catch (err) {
    if (err.response.data.message === "Usuario no existente") {
      dispatch(returnErrors(err.response.data, err.response.status, NOT_USER));
      dispatch({ type: AUTH_ERROR });
    } else {
      dispatch(
        returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
      );
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const register = (user, history) => async (dispatch) => {
  console.log("USER INFO", user)
  let body = JSON.stringify(user);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: USER_LOADING });

    let res = await axios.post("/registro", body, config);

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...res.data.user,
      })
    );

    dispatch({ type: USER_LOADED });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    if (user.isBussines) {
      history.push('/home')
    } else {
      history.push("/registro/postregister");
    }

  } catch (err) {
    if (err.response.data.message === "Usuario ya existente") {
      dispatch(
        returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
      );
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const logOut = (history) => async (dispatch) => {

  let resp = await axios.get('/logout')

  dispatch({ type: LOGOUT_SUCCESS })

  localStorage.removeItem('user')


}
