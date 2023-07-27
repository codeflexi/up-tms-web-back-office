import axios from "axios";


//axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.baseURL = "https://api-tms.upecommerce.app";


//axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// // Authorization: options.token ? `Bearer ${options.token}` : '',
if (localStorage.getItem('token')){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}else{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + ''
}

console.log('adding token')
console.log( axios.defaults.headers.common['Authorization'])