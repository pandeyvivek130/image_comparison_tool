import { IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_LIST_FAIL } from "../constants/setConstants.js"


export const imageListReduer = (state = {loading : true, images:[], numberOfSetLeft:0, numberOfImagesLeft:0, numberOfImagesInCurrentSet:0, currentSetNumber:0}, action) => {
switch(action.type){
   case IMAGE_LIST_REQUEST:
       return { loading : true};        
   case IMAGE_LIST_SUCCESS:
        //console.log('Reducer', action.payload, action.numberOfSetLeft, action.numberOfImagesLeft, action.numberOfImagesInCurrentSet, action.currentSetNumber);
       return {
                loading:false,
                images:action.payload, 
                numberOfSetLeft:action.numberOfSetLeft,
                numberOfImagesLeft:action.numberOfImagesLeft,
                numberOfImagesInCurrentSet:action.numberOfImagesInCurrentSet,
                currentSetNumber:action.currentSetNumber
             };
   case IMAGE_LIST_FAIL:
       return {loading : false, error:action.payload};
   default:
       return state;
}
}
