import Axios from "axios";
import { RESTART_REQUEST, RESTART_SUCCESS, RESTART_FAIL } from "../constants/restartConstants.js"
import { listImages } from '../actions/loadSetAction.js';
export const restart = () => async (dispatch) =>{
    dispatch({
        type : RESTART_REQUEST
    });
    
    try{
        const {data} = await Axios.get('/api/getdata/restart');
        //console.log('Action', data);
        dispatch({
            type : RESTART_SUCCESS,
            payload : data
        });
        dispatch(listImages());
    }
    catch(error){
        dispatch({
            type : RESTART_FAIL,
            payload : error.response && 
                        error.response.data.message 
                        ? error.response.data.message
                        : error.message 
        });
    }
}