import Axios from "axios";
import { IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_LIST_FAIL } from "../constants/setConstants.js"

export const listImages = () => async (dispatch) =>{
    dispatch({
        type : IMAGE_LIST_REQUEST
    });
    
    try{
        const {data} = await Axios.get('/api/getdata/images');
        //console.log('Action', data);
        dispatch({
            type : IMAGE_LIST_SUCCESS,
            payload : data.imageData,
            numberOfSetLeft : data.numberOfSetLeft,
            numberOfImagesLeft : data.numberOfImagesLeft,
            numberOfImagesInCurrentSet : data.imageData.length - 1,
            currentSetNumber : data.imageData[0].set_id
        });
    }
    catch(error){
        dispatch({
            type : IMAGE_LIST_FAIL,
            payload : error.response && 
                        error.response.data.message 
                        ? error.response.data.message
                        : error.message 
        });
    }
}