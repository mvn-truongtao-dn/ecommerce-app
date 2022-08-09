// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';
export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    if (cookies.get('access_token')) {
      req.headers.Authorization = `Bearer ${cookies.get('access_token')}`;
    }
    req.headers.cookie = '';
    proxy.web(req, res, {
      target: 'https://js-post-api.herokuapp.com',
      changeOrigin: true,
      selfHandleResponse: false,
    });
    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
