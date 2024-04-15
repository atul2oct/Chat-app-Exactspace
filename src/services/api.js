const BASE_URL = process.env.REACT_APP_BASE_URL

// API ENDPOINTS
export const endpoints = {
    DATA_API: BASE_URL + '/api/chats',
    SIGNUP_API: BASE_URL + "/api/user/signup",
    LOGIN_API: BASE_URL + "/api/user/login",
}