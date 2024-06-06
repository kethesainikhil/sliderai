import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/auth';

//@ts-ignore
const handler = NextAuth(authOptions);

export const GET = (req, res) => {
  return handler(req, res);
};

export const POST = (req, res) => {
  // NextAuth handles authentication callback with POST method
  return handler(req, res);
};