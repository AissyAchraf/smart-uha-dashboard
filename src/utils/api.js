import axios from 'axios';

let URL = localStorage.getItem("REACT_APP_SERVER_URL");
if(typeof URL === 'undefined') { URL = null; }
const baseURL = URL != null ? URL : "http://localhost:8000";
const apiUrl = baseURL + "/api";

function apiRequest(method, url, datas = {}) {
    const o = {
        method: method,
        url: apiUrl + url,
        data: datas,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + sessionStorage.getItem("token"),
        },
        timeout: 5000
    };
    return axios(o);
}

export default {

    authenticate: async function(email, password){
        const o = {
            method: 'POST',
            url: baseURL + '/authenticate',
            data: {
                email,
                password,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000,
        };
        return await axios.post('http://localhost:8000/authenticate', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    getUser: function() {
        return apiRequest('GET', '/user/me');
    },

    getDemands: function() {
        return apiRequest('GET', '/demands/all');
    }
}