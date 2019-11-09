import {axiosInstance} from "../axios";
import { get } from 'lodash'
import {
   GET_COUNTRIES,
   ADD_VALUE,
   PUSH_STORAGE,
   GET_STORAGE_DATA,
   PUSH_INPUT,
   GET_ERROR,
   CLEAR_CHANGE,
   NOT_FOUND_TEXT,
   SET_LANGUAGE,
} from '../constants'

const clearInput = () => ({type: CLEAR_CHANGE});
export const getError = (e) => ({type: GET_ERROR, e});
export const pushInput = (e) => ({type: PUSH_INPUT, e});
export const onChangeValue = (value) => ({type: ADD_VALUE, value});
export const pushToStorage = () => ({type: PUSH_STORAGE});
export const getStorage = (obj) => ({type: GET_STORAGE_DATA, obj});
export const getCountryies = (data) => ({type: GET_COUNTRIES, data});
export const setLanguage = (data) => ({type: SET_LANGUAGE, data});

export const getData = (type) => (dispatch, getState) => () => {
   const value = getState().reducer.inputValue;
   localStorage.setItem('key', getState().reducer.storageData);
   dispatch(pushToStorage());

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
      dispatch(getCountryies((par)));
      dispatch(clearInput());
   }).catch((error) => dispatch(getError(get(error,'response.status'))))
};

export const getStorageData = () => (dispatch) => {
   let object = localStorage.getItem('key');
   if (object) {
      object = object.split(',')
   } else {
      object = []
   }
   dispatch(getStorage(object));
};

let initialState = {
   inputValue: '',
   storageData: [],
   data: '',
   error: '',
   language:localStorage.getItem('language') ? localStorage.getItem('language'): 'en',
};

const RootReducer = (state = initialState, action) => {

   switch (action.type) {
      case ADD_VALUE: {
         return {...state, inputValue: action.value, error: ''}
      }
      case PUSH_STORAGE: {
         return {
            ...state,
            storageData: [...state.storageData.filter((item) => item !== state.inputValue), state.inputValue]
         }
      }
      case GET_STORAGE_DATA: {
         return {...state, storageData: action.obj}
      }
      case GET_COUNTRIES: {
         return {...state, data: action.data}
      }
      case PUSH_INPUT: {
         return {...state, inputValue: action.e, error: ''}
      }
      case GET_ERROR: {
         return {...state, error: action.e === 404 || action.e === 400 ? NOT_FOUND_TEXT : action.e, inputValue: ''}
      }
      case CLEAR_CHANGE: {
         return {...state, inputValue: ''}
      }
      case SET_LANGUAGE: {
         localStorage.setItem('language', action.data);
         return {...state, language: action.data}
      }
      default:
         return state;

   }

};

export default RootReducer;
