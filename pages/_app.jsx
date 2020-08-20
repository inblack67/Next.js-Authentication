import Layout from '../components/Layout';
import AuthState from '../context/auth/AuthState';

function MyApp({ Component, pageProps }) {
  return <AuthState>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthState>
}

export default MyApp
