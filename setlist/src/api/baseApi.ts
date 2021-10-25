import axios from 'axios'
// import {logOut} from '@/util/auth'

export default function api() {
    const api = axios.create({
        baseURL: 'http://localhost:8080',
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