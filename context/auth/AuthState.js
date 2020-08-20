import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import { useReducer } from 'react';
import { server } from '../../src/server'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const AuthState = ({ children }) => {

    const initialState = {
        loading: true,
        user: null,
        stories: [],
        story: null,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = async (formData) => {
        try {
            const res = await axios.post(`${server}/api/login`, formData, config);
            console.log(res.data);
        } catch (err) {
            console.error(err);
            const res = err.response.data;
            if (res) {
                M.toast({ html: res.error });
            }
        }
    }

    const registerUser = async (formData) => {
        try {
            const res = await axios.post(`${server}/api/register`, formData, config);
            console.log(res.data);
        } catch (err) {
            console.error(err);
            const res = err.response.data;
            if (res) {
                M.toast({ html: res.error });
            }
        }
    }

    const loadUser = async () => {
        
    }

    return (
        <AuthContext.Provider
            value={{
                loading: state.loading,
                user: state.user,
                stories: state.stories,
                story: state.story,
                login,
                registerUser,
            }}>
            { children}
        </AuthContext.Provider>
    )
}

export default AuthState
