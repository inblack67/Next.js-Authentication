import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import { useReducer } from 'react';
import { server } from '../../src/server';
import { USER_LOADED, LOGOUT } from '../types'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const AuthState = ({ children }) => {

    const initialState = {
        loading: true,
        isAuthenticated: false,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = async (formData) => {
        try {
            const res = await axios.post(`${server}/api/login`, formData, config);
            dispatch({
                type: USER_LOADED,
            });
            M.toast({ html: res.data.msg });
        } catch (err) {
            console.error(err);
            const res = err.response.data;
            if (res) {
                M.toast({ html: res.error });
            }
        }
    }

    const logout = async () => {
        try {
            const res = await axios.get(`${server}/api/logout`);
            dispatch({
                type: LOGOUT
            })
            M.toast({ html: res.data.msg });
        } catch (err) {
            console.error(err);
        }
    }

    const registerUser = async (formData) => {
        try {
            const res = await axios.post(`${server}/api/register`, formData, config);
            authenticate();
            M.toast({ html: res.data.msg });
        } catch (err) {
            console.error(err);
            const res = err.response.data;
            if (res) {
                M.toast({ html: res.error });
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                login,
                registerUser,
                logout
            }}>
            { children}
        </AuthContext.Provider>
    )
}

export default AuthState
