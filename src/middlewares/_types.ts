import { NextApiRequest } from 'next'
import { Db } from 'mongodb';

export interface Request extends NextApiRequest {
  db: Db;
}

export interface WithAuthRequest extends Request {
  user: any;
  files: any;
}