import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import AuthContext from '../context/auth/authContext'
import { useContext } from 'react'
import { server } from '../src/server'
import axios from 'axios'
import Router from 'next/router'

const guestLinks = <Fragment>
    <li>
        <Link href='/login'>
            <a>
                Login
        </a>
        </Link>
    </li>
    <li>
        <Link href='/register'>
            <a>
                Register
         </a>
        </Link>
    </li>
</Fragment>


const Navbar = () => {

    const [isAuth, setAuth] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const query = localStorage.getItem('isAuthenticated');
        if (query) {
            setAuth(query);
        }
    }, [isAuthenticated]);

    const onLogout = async e => {
        try {
            const res = await axios.get(`${server}/api/logout`);
            localStorage.removeItem('isAuthenticated');
            setAuth(false);
            M.toast({ html: res.data.msg });
            Router.replace('/login');
        } catch (err) {
            console.error(err);
            if (err.response) {
                M.toast({ html: err.response.error });
            }
        }
    }


    const authLinks = <Fragment>
        <li>
            <Link href='/'>
                <a>
                    Home
                </a>
            </Link>
        </li>
        <li>
            <Link href='#!'>
                <a onClick={onLogout}>
                    Logout
                </a>
            </Link>
        </li>
    </Fragment>

    return (
        <nav className='red'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            Next.js | Auth
                        </a>
                    </Link>
                    <ul className="right">
                        {isAuth ? authLinks : guestLinks}
                        <li className='hide-on-med-and-down'>
                            <Link href='/about'>
                                <a>
                                    About
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;