import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {combineReducers, createStore, applyMiddleware} from "redux";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import RootReducer from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import './styles/index.scss';

const superReducer = combineReducers({
   reducer: RootReducer,
});

const store = createStore(superReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}> <App/></Provider>, document.getElementById('root'));





