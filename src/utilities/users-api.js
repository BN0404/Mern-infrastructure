// * The users-service.js module will definitely need to make AJAX requests to the Express server.

import { getToken } from "./users-service";

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)

// export async function signUp(userData) {
//     const BASE_URL = '/api/users';

//     const res = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(userData) // makes the JS object to a string to be send over the internet
//     });

//     if (res.ok) {
//         return res.json(); // JWT Token
//     } else {
//         throw new Error('Invalid Sign Up!')
//     }
// }


// //* Login
// export async function login(credentials) {
//     const BASE_URL = '/api/users';
//     const res = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials)
//     });

//     if (res.ok) {
//         return res.json();
//     } else {
//     throw new Error('Invalid Sign In!')
//     }
// }


const BASE_URL = '/api/users';
//*Sign Up
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}
//*Login
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}



//*Check Token
export function checkToken() {
return sendRequest(`${BASE_URL}/check-token`)
}


/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
    }
    
    //sends token to backend
    const token = getToken();

    if (token) {
    //header is created only if had payload
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

