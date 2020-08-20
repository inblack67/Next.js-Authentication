import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth/authContext';

const Login = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            email: 'aman1@gmail.com',
            password: 'Aman123@',
        }
    });

    const { login } = useContext(AuthContext);

    const onLogin = formData => {
        setSubmitting(true);
        login(formData);
        setSubmitting(false);
    }

    return (
        <div className='container'>
            <p className="flow-text centr">Login</p>
            <form onSubmit={handleSubmit(onLogin)}>
                <div className="input-field">
                    <input type="email" name='email' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="email"></label>
                    {errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : <span className="helper-text">Email</span>}
                </div>
                <div className="input-field">
                    <input type="password" name='password' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="password"></label>
                    {errors.password ? <span className="helper-text red-text">{errors.password.message}</span> : <span className="helper-text">Password</span>}
                </div>
                <div className="input-field">
                    <button type="submit" className='btn black' disabled={submitting} >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
