import axios from "axios";

const API_URL = "https://api.punkapi.com/v2/beers";

async function getBeers(){
    return await axios.get(API_URL).then(response=>response.data);
}

async function getBeersByPageAndByPerPage(pageNumber,perPageQuantity){
    return await axios.get(API_URL+`?page=${pageNumber}&per_page=${perPageQuantity}`).then(response=>response.data);
}
export  {getBeers,getBeersByPageAndByPerPage}; 