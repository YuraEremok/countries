import React from 'react';
import {isArray, isNumber, isPlainObject, isString} from "lodash";

const FullInfo = ({filterData}) => (
   <div className='full_info'>
      <div>
         {filterData.map(el => Object.keys(el).map(el => <span>{el}:</span>))}
      </div>
      <div>
         {filterData.map(el => Object.values(el).map(el => {
            if (isString(el) || isNumber(el)) return <span> {el}</span>;
            else if (isPlainObject(el)) {
               return <span>{Object.keys(el).map((el, i, arr) => el + (i !== arr.length - 1 ? ", " : ""))}</span>
            } else if (isArray(el) && !isPlainObject(el[0])) {
               return <span>{el.map((el, i, arr) => el + (i !== arr.length - 1 ? ", " : ""))}</span>
            } else if (isArray(el) && isPlainObject(el[0])) {
               return <span> {Object.entries(el[0]).flatMap(([key, value]) => `${key}: ${value}, `)}</span>
            }
            return null
         }))}
      </div>
   </div>
);

export default FullInfo;