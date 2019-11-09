import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getStorageData, getError, getData, onChangeValue, setLanguage, pushInput} from "./reducers/rootReducer";
import DataContainer from "./components/DataContainer";
import {strings} from "./localization";
import rus from './rus.png'
import usa from './usa.png'

const App = ({
                getStorageData,
                data: {data},
                inputValue,
                language,
                setLanguage,
                onChangeValue,
                pushInput,
                getData,
                storageData,
                error
             }) => {

   const [isStorageInput, toggleStorageInput] = useState(false);
   const [searchType, setSearchType] = useState('fullName');

   useEffect(() => {
      getStorageData()
   }, [getStorageData]);

   const getDataHandler = () => {
      toggleStorageInput(false);
      getData(searchType)()
   };

   const handleLanguageChange = (e) => setLanguage(e.target.value);

   strings.setLanguage(language);
   return (
      <div className="app">
         <div className='localization'>
            <select onChange={handleLanguageChange}>
               <option value="en">En</option>
               <option selected={language === 'ru'} value="ru">Ru</option>
            </select>
            <img alt="" className='image_loc' src={language === 'ru' ? rus : usa}/>
         </div>
         <div className='search'>
            <span className='input'>
               <input
                  autoComplete="off"
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder={strings.placeholders[searchType]}
                  value={inputValue}
                  onChange={e => onChangeValue(e.target.value)}
                  onClick={() => toggleStorageInput(!isStorageInput)}
               />
               {isStorageInput && <div className='input_storage'>
                  {storageData.map((el) =>
                     <span onClick={() =>
                        pushInput(el, toggleStorageInput(!isStorageInput))}
                     >
                  {el}
               </span>)
                  }
               </div>
               }
            </span>
            <span className='search_button'>{strings.searchBy} </span>
            <select required onChange={(e) => setSearchType(e.target.value)}>
               <option value="name">{strings.name}</option>
               <option value="fullName" selected>{strings.fullName}</option>
               <option value="code">{strings.code}</option>
               <option value="currency">{strings.currency}</option>
            </select>
            <input
               type="button"
               onClick={getDataHandler}
               value="Search"
               disabled={!inputValue.length}
            />

         </div>
         <input
            className='code_button'
            type="button"
            value={strings.listCode}
            onClick={getData('codeList')}

         />
         <DataContainer data={data} error={error} storageData={storageData}/>
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      storageData: state.reducer.storageData,
      inputValue: state.reducer.inputValue,
      data: state.reducer.data,
      error: state.reducer.error,
      language: state.reducer.language,
   }
};

export default connect(mapStateToProps, {
   onChangeValue,
   getStorageData,
   getData,
   pushInput,
   getError,
   setLanguage,
})(App)

