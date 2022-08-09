// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'method not support' });
  }
  const cookies = new Cookies(req, res);
  cookies.set('access_token');
  res.status(200).json({ message: 'logout success' });
}
