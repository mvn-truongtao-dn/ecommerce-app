// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
type Data = {
  message: string;
};
export const config = {
  api: {
    bodyParser: false,
  }
}
const proxy = httpProxy.createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve) => {
    console.log('login request');
    if (req.method !== 'POST') {
      return res.status(404).json({ message: 'method not support method' });
    }
    req.headers.cookie = '';
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', (chuck) => {
        body += chuck;
      });
      console.log(body);
      proxyRes.on('error', () => {
        try {
          const cookies = new Cookies(req, res);
          cookies.get('access_token');
          if (!cookies) {
            (res as NextApiResponse)
              .status(401)
              .json({ message: 'something went wrong' });
          }
        } catch (error) {}
      });
      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });
          if (accessToken === undefined) {
            (res as NextApiResponse)
              .status(401)
              .json({ message: 'Login failed' });
          } else {
            (res as NextApiResponse)
              .status(200)
              .json({ message: 'Login successfully' });
          }
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'Something went wrong' });
        }
        resolve(true);
      });
    };
    proxy.once('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: 'https://js-post-api.herokuapp.com',
      changeOrigin: true,
      selfHandleResponse: true,
    });
    proxy.on('error', () => {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Something went wrong');
    });
  });
}
