import {combineReducers} from 'redux';
import commonReducer from './commonReducer';
import exercisesReducer from './exercisesReducer';
import booksReducer from './booksReducer';
import vocabularyReducer from './vocabularyReducer';

let createRootReducer = () => combineReducers({
	exercisesReducer: exercisesReducer, 
	commonReducer: commonReducer, 
	booksReducer: booksReducer,
	vocabularyReducer: vocabularyReducer	
})

export default createRootReducer;