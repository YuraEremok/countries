import React from "react";
import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
   en:{
      name:"Name",
      fullName:"Full name",
      code:"Code",
      currency:"Currency",
      listCode:'get list of country codes',
      placeholders : {
         name: 'Enter country native name or partial name',
         fullName: 'Enter country full name',
         code: 'Enter 3-letter country code or ISO 3166-1 2-letter',
         currency: 'Enter ISO 4217 currency code',
      },
      searchBy: 'Search by',
      country:'Country',
      capital:'Capital',
      currencyInfo:'Currency',
      fullInfo:'Full Info',
      hide:'Hide',
      show:'Show',
   },
   ru: {
      name:"Имени",
      fullName:"Полному имени",
      code:"Коду",
      currency:"Валюте",
      listCode:'получить список кодов стран',
      placeholders : {
         name: 'Введите название страны или ее часть',
         fullName: 'Введите полное название страны',
         code: 'Введите трехбуквенный код страны или ISO 3166-1 двухбуквенный',
         currency: 'Введите код валюты ISO 4217',
      },
      searchBy: 'Поиск по',
      country:'Страна',
      capital:'Cтолица',
      currencyInfo:'Валюта',
      fullInfo:'Полную Информацию',
      hide:'Cпрятать',
      show:'Показать',
   }
});
