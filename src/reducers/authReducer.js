import localStorage from '@react-native-community/async-storage';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    typ: "CLIENT"
}

export default  (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case 'SET_TYPE':
            return {
                ...state,
                typ: action.payload.typ
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                user: undefined,
                token: undefined,
                typ: undefined
            }
        default:
            return state
    }
}