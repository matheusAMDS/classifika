import { NextApiRequest } from 'next'
import { Db } from 'mongodb'

interface Files {
  thumbnail: {}
}

export interface Request extends NextApiRequest {
  db: Db;
  user?: string;
}

export interface UploadRequest extends Request {
  files: any;
}