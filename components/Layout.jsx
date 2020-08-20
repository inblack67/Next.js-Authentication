import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => {

    return (
        <div>
            <Head>
                <title>Nextjs | Realtime</title>
                <meta name="description" content="Authentication in Next.js" />
                <meta name="keywords" content="Next.js, JWT, Bcrypt.js, Materialize" />

                <link rel="icon" href="./vercel.svg" type="svg" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </Head>
            <Navbar />
            { children}
        </div>
    )
}

export default Layout
