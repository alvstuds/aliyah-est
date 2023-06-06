import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

function Auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}

export default Auth;
