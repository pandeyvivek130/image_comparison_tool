import { RESTART_REQUEST, RESTART_SUCCESS, RESTART_FAIL } from "../constants/restartConstants.js"


export const restartReduer = (state = {loading : true, data:{}}, action) => {
switch(action.type){
   case RESTART_REQUEST:
       return { loading : true};        
   case RESTART_SUCCESS:
       return {
                loading:false,
                data:action.payload, 
             };
   case RESTART_FAIL:
       return {loading : false, error:action.payload};
   default:
       return state;
}
}
