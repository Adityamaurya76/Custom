import axios from 'axios';

 const api= axios.create({
    baseURL:process.env.REACT_APP_SERVER_BASE_URL,
});

export function getCountry(){
    return api.get("/all?fields=name,population,region,capital,flags");
};
// console.log(getCountry);
 
export function getCountryIndddata(name){
    return api.get(
        `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
      );
}

// export default {getCountry , getCountryIndddata};
