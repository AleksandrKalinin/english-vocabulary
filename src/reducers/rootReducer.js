import {combineReducers} from 'redux';
import settingsReducer from './settingsReducer';
import exercisesReducer from './exercisesReducer';
import booksReducer from './booksReducer';
import vocabularyReducer from './vocabularyReducer';
import testsReducer from './testsReducer';
import resultsReducer from './resultsReducer';

let createRootReducer = () => combineReducers({
	exercisesReducer: exercisesReducer, 
	settingsReducer: settingsReducer, 
	booksReducer: booksReducer,
	vocabularyReducer: vocabularyReducer,
	testsReducer: testsReducer,
	resultsReducer: resultsReducer		
})

export default createRootReducer;