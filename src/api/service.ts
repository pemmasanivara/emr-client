import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

export function fetchServices() {
    return axios.get(`${apiURL}service/`).then((response)=>{
        return response.data
    })
    .catch((error) => {
        throw error.response.data;
    })
}