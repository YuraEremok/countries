import {axiosInstance} from "../axios";

const GET_WATER = 'GET_WATER';
const VALUE_INPUT = 'VALUE_INPUT';
const ADD_EVENT = 'ADD_EVENT';
const GET_DATA = 'GET_DATA';
const PUSH_INPUT = 'PUSH_INPUT';
const ERROR_CITY = 'ERROR_CITY';
const CLEAR_CHANGE = 'CLEAR_CHANGE';

const clearChangeAction = () => ({type: CLEAR_CHANGE});
export const errorCityAction = (e) => ({type: ERROR_CITY, e});
export const pushInputAction = (e) => ({type: PUSH_INPUT, e});
export const onChangeValue = (value) => ({type: VALUE_INPUT, value});
export const submitValueAction = () => ({type: ADD_EVENT});
export const getDataAction = (obj) => ({type: GET_DATA, obj});
export const getWater = (p) => ({type: GET_WATER, p});


export const getData = (type) => (dispatch, getState) => () => {
   const value = getState().reducer.inputValue;
   localStorage.setItem('key', getState().reducer.storageData);
   dispatch(submitValueAction());

   let query;
   switch (type) {
      case 'name' :
         query = `/name/${value}`;
         break;
      case 'fullName' :
         query = `/name/${value}/?fullText=true`;
         break;
      case 'code' :
         query = `/alpha/${value}`;
         break;
      case 'currency' :
         query = `/currency/${value}`;
         break;
      case 'codeList' :
         query = `/all?fields=alpha3Code`;
         break;
      default:
         return;
   }


   axiosInstance.get(query).then((par) => {
      dispatch(getWater((par)));
      dispatch(clearChangeAction());
   }).catch((error) => dispatch(errorCityAction(error.response.data.message)))
};

export const getStorageData = () => (dispatch) => {
   let object = localStorage.getItem('key');
   if (object) {
      object = object.split(',')
   } else {
      object = []
   }
   dispatch(getDataAction(object));
};

let initialState = {
   inputValue: '',
   storageData: [],
   data: '',
   error: '',

};

const RootReducer = (state = initialState, action) => {

   switch (action.type) {
      case VALUE_INPUT: {
         return {...state, inputValue: action.value, error: ''}
      }
      case ADD_EVENT: {
         return {
            ...state,
            storageData: [...state.storageData.filter((item) => item !== state.inputValue), state.inputValue]
         }
      }
      case GET_DATA: {
         return {...state, storageData: action.obj}
      }
      case GET_WATER: {
         return {...state, data: action.p}
      }
      case PUSH_INPUT: {
         return {...state, inputValue: action.e, error: ''}
      }
      case ERROR_CITY: {
         return {...state, error: action.e, inputValue: ''}
      }
      case CLEAR_CHANGE: {
         return {...state, inputValue: ''}
      }
      default:
         return state;

   }

};

export default RootReducer;
