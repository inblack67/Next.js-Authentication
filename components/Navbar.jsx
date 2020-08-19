import Link from 'next/link'
import { Fragment } from 'react'

const Navbar = () => {

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
                        {guestLinks}
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

export default Navbar
