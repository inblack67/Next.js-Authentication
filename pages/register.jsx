import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth/authContext';

const Register = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: 'Aman',
            email: 'aman@gmail.com',
            password: 'Aman123@',
        }
    });

    const { registerUser } = useContext(AuthContext);

    const onLogin = formData => {
        setSubmitting(true);
        registerUser(formData);
        setSubmitting(false);
    }

    return (
        <div className='container'>
            <p className="flow-text centr">Register</p>
            <form onSubmit={handleSubmit(onLogin)}>
                <div className="input-field">
                    <input type="text" name='name' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="name"></label>
                    {errors.name ? <span className="helper-text red-text">{errors.name.message}</span> : <span className="helper-text">Name</span>}
                </div>
                <div className="input-field">
                    <input type="email" name='email' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="email"></label>
                    {errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : <span className="helper-text">Email</span>}
                </div>
                <div className="input-field">
                    <input type="password" name='password' ref={register({
                        required: 'Required!',
                        minLength: {
                            value: 8,
                            message: 'Must be 8 chars'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Cannot exceed 16 chars'
                        },
                        validate: value => {
                            return (
                                [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                    pattern.test(value)
                                ) || "Must include lower, upper, number, and special chars"
                            );
                        },
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

export default Register
