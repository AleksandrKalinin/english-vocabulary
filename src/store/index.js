import {createStore} from 'redux';
import createRootReducer from '../reducers/rootReducer';

let initialState = {};

export default function configureStore(){
	let store = createStore(createRootReducer(), initialState);
	return store;
}