import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {imageListReduer} from "./reducers/loadSetReducer";
import {completeSetReducer} from './reducers/completeSetReducer';
import {restartReduer} from './reducers/restartReducer';

const initialState = {};

const reducer = combineReducers({
    imageList : imageListReduer,
    completeSet : completeSetReducer,
    restart : restartReduer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;