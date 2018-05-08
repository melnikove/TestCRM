import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
 
import deals from './deals';
import persons from './persons';

export default combineReducers({
	routing: routerReducer,
	deals,
	persons
});