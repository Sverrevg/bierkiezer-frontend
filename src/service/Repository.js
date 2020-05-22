// Repository.js

import axios from "axios";
// import UserStorage from "../helpers/UserStorage";
// import JWTDecode from 'jwt-decode'

const baseDomain = "https://bierkiezer-api-production.herokuapp.com";
// const baseDomain = "http://localhost:8090";
const baseURL = `${baseDomain}/api/v1`;

// // Source:
// // https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
// axios.interceptors.request.use((response) => {
//         if (response.status !== 200) {
//             const token = UserStorage.getToken();
//
//             if (token !== "") {
//                 // Check if token is expired.
//                 if ((token).exp < Date.now()) {
//
//                 }
//             }
//         }
//     }
// );

export default axios.create({

    //60 sec timeout
    timeout: 60000,

    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,

    //cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,

    baseURL,

    // Set validatstatus so axios accepts all status codes.
    validateStatus: function (status) {
        return status >= 200 && status <= 503;
    }
});
