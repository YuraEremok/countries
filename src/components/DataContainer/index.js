import React, {useState} from 'react';
import { get,uniqueId } from 'lodash'
import {strings} from "../../localization";
import FullInfo from "../FullInfo";

const DataContainer = ({data, error}) => {
   const [isFullData, toggleFullData] = useState(null);
   const isCountryCodes = get(data, 'length', []) > 240;
   if (error) return <h2 className='error'>{error}</h2>;
   const filterData = data && data.filter(el => el.name === isFullData);
   return (
      <div className="data_container">
         {data && !isCountryCodes && data.map(item => {
            return <div className="data" key={uniqueId()}>
               <div className='main_info'>
                  <img className="flag" src={item.flag} alt=""/>
                  <div><b>{strings.country}:</b><p>{item.name}</p></div>
                  <div><b>{strings.capital}:</b><p> {item.capital}</p></div>
                  <div className="currency">
                     <p><b>{strings.currency}:</b></p>
                     {item.currencies.map(el => el.code !== null ?
                        <span key={uniqueId()}>{el.code}</span> : null)}
                  </div>
                  <span className="info_toggle"
                        onClick={() => toggleFullData(!isFullData ? item.name : null)}>{isFullData === item.name ? strings.hide : strings.show} {strings.fullInfo}</span>
               </div>
               {isFullData === item.name && <FullInfo filterData={filterData}/>
               }
            </div>
         })}
         {isCountryCodes && data.map(el => {
            return <div key={uniqueId()} className='country_code'>{Object.entries(el).map(([key, value]) => `${key}: ${value}`)}</div>
         })}
      </div>
   );
};

export default DataContainer;