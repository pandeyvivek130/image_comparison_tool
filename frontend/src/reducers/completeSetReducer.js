import { COMPLETE_SET_REQUEST, COMPLETE_SET_SUCCESS, COMPLETE_SET_FAIL } from "../constants/completeSetConstants.js"

export const completeSetReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPLETE_SET_REQUEST:
        return { loading: true };
      case COMPLETE_SET_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case COMPLETE_SET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };