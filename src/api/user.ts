import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

export function fetchUsers() {
    return axios.get(`${apiURL}users/`).then((response)=>{
        return response.data
    })
    .catch((error) => {
        throw error.response.data;
    })
}

export function createNewUser(userData: any) {
    return axios.post(`${apiURL}users/`, userData).then((response)=>{
        return response.data
    })
    .catch((error) => {
        throw error.response.data;
    })
}

export function updateExistingUserApi({id, ...userData}: any) {
    return axios.patch(`${apiURL}users/${id}`, userData).then((response)=>{
        return response.data
    })
    .catch((error) => {
        throw error.response.data;
    })
}

export function deleteUserApi(id: string) {
    return axios.delete(`${apiURL}users/${id}`).then((response)=>{
        return response.data
    })
    .catch((error) => {
        throw error.response.data;
    })
}