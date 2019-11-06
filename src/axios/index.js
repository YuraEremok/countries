import * as axios from "axios";

export const axiosInstance = axios.create({
   baseURL: 'http://restcountries.eu/rest/v2',
});
