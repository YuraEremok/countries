import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getStorageData, errorCityAction, getData, onChangeValue, pushInputAction} from "./reducers/rootReducer";
import {PLACEHOLDERS} from './constants';

const App = ({getStorageData, data:{data}, inputValue, onChangeValue, getData, storageData}) => {
  const [placeholder,setPlaceholder] = useState(PLACEHOLDERS.name);

   useEffect(() => {
      getStorageData()
   }, [getStorageData]);

   console.log(data)
   return (
      <div className="app">
            <input
               id="name"
               type="text"
               className="form-control"
               placeholder={placeholder}
               value={inputValue}
               onChange={e => onChangeValue(e.target.value)}
            />
            <div className="search_buttons">
               <input
                  type="button"
                  onClick={getData('name')}
                  value="Search by name"
                  onMouseOver={()=>setPlaceholder(PLACEHOLDERS.name)}
               />
               <input
                  type="button"
                  onClick={getData('fullName')}
                  value="Search by full name"
                  onMouseOver={()=>setPlaceholder(PLACEHOLDERS.fullName)}
               />
               <input
                  type="button"
                  onClick={getData('code')}
                  value="Search by code"
                  onMouseOver={()=>setPlaceholder(PLACEHOLDERS.code)}

               />
               <input
                  type="button"
                  onClick={getData('currency')}
                  value="Search by currency"
                  onMouseOver={()=>setPlaceholder(PLACEHOLDERS.currency)}
               />
            </div>

            <input
               type="button"
               value="get list of country codes"
               onClick={getData('codeList')}
            />
            <div className="data_container">
            </div>
         </div>
         );
         };

         const mapStateToProps = (state) => {
         return {
         storageData: state.reducer.storageData,
         inputValue: state.reducer.inputValue,
         data: state.reducer.data,
         error: state.reducer.error,
      }
      };

         export default connect(mapStateToProps, {
         onChangeValue,
         getStorageData,
         getData,
         pushInputAction,
         errorCityAction,
      })(App)

