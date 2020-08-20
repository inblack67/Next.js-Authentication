import axios from 'axios';

const fetchData = async (url, ctx, redirectUrl) => {
    const cookie = ctx.req.headers.cookie;
    const config = {
        headers: {
            cookie: cookie ?? null
        }
    }
    let res;
    try {
        res = await axios(url, config);
        return res.data;
    } catch (err) {
        console.error(err);
        ctx.res.writeHead(302, {
            Location: redirectUrl
        })
        ctx.res.end();
        return;
    }
}

export default fetchData;