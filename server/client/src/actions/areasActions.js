import axios from "axios";

import { GET_AREAS, SEND_AREAS } from "./types";

export const getAreas = (rubro_id) => async (dispatch) => {

  const resp = await axios.get("/areas/" + rubro_id);

  dispatch({ type: GET_AREAS, payload: resp.data.areas });

};

export const sendAreas = (data, user, history) => async (dispatch) => {

  let body = JSON.stringify({...data, user});

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resp = await axios.post("/arearelation", body, config )

  dispatch({ type : SEND_AREAS, payload: resp.data })


  history.push('/home?b0=0&')
}

export const getAreaById = (id) => {


  


}