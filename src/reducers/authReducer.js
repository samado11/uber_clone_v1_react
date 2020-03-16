import localStorage from '@react-native-community/async-storage';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
}

export default  (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                user: undefined,
                token: undefined
            }
        default:
            return state
    }
}