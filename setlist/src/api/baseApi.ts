import axios from 'axios'
// import {logOut} from '@/util/auth'

export default function api() {
    console.log(process.env.REACT_APP_BASE_URL)
    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, //'http://localhost:8080',
        withCredentials: true,
        headers:{ 'Accept': 'application/json' } 
    })

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            // logOut()

            return Promise.reject()
        }

        return Promise.reject(error)
    })

    return api
}