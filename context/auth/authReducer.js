import { USER_LOADED, LOGOUT } from '../types';

const authReducer = (state, action) => {
    const { type } = action;

    switch (type) {
        case USER_LOADED:
            localStorage.setItem('isAuthenticated', true);
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT:
            localStorage.removeItem('isAuthenticated');
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default authReducer;