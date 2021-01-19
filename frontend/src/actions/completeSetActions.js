import Axios from "axios";
import { COMPLETE_SET_REQUEST, COMPLETE_SET_SUCCESS, COMPLETE_SET_FAIL } from "../constants/completeSetConstants.js"
import { listImages } from '../actions/loadSetAction.js';
export const completeSet = (set_id, values) => async (dispatch) =>{
    dispatch({
        type : COMPLETE_SET_REQUEST
    });
    
    try{
        console.log('Sending values ', values, set_id);
        const {data} = await Axios.post('/api/getdata/completeSet', {set_id, values});
        //console.log('Action', data);
        dispatch({
            type : COMPLETE_SET_SUCCESS,
            payload : data
        });
        dispatch(listImages());
    }
    catch(error){
        dispatch({
            type : COMPLETE_SET_FAIL,
            payload : error.response && 
                        error.response.data.message 
                        ? error.response.data.message
                        : error.message 
        });
    }
}