import { SET_RENDER } from '../actions/types'

const initialState = {
    firstRender : true
};
  
export default function (state = initialState, action) {

    switch (action.type) {

        case SET_RENDER:
            return {
                ...state, 
                firstRender : false
            }
        default: 
            return state
    }


} 