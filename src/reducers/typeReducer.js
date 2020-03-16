
const initialState = {
    type: 'CLIENT'
}

export const authStoreState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                isAuthenticated: true,
                id: action.payload.user._id,
                token: action.payload.token
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                id: undefined,
                token: undefined
            }
        default:
            return state
    }
}