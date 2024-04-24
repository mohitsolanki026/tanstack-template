import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json'
        // 'bearer-token': localStorage.getItem('bearer-token')
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios;