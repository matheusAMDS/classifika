import nc from 'next-connect'
import { NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import multer from 'multer'

import middlewares from 'lib/middleware'
import multerConfig from 'config/multer'
import { UploadRequest, Request } from 'lib/ncInterfaces'
import { verifyToken } from 'lib/jwt'

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

interface Publicity {
  _id: string;
  title: string;
  description: string;
  category: string;
  whatsapp: string;
  byUser: User | string;
  createdAt: number;
}

export const config = {
  api: {
    bodyParser: false
  }
}

const uploader = multer(multerConfig)
const handler = nc<Request, NextApiResponse>()

handler.use(middlewares)

handler.get(async (req, res) => {
  const category = req.query.category as string
  const page = Number(req.query.page) || 1
  const totalDocuments = await req.db
    .collection('publicities')
    .countDocuments(category ? { category } : {})

  const publicities = await req.db
    .collection('publicities')
    .find(category ? { category } : {})
    .sort('createdAt', -1)
    .skip((page - 1) * 15)
    .limit(15)

  const serializedPublicities = await publicities
    .map(async (publicity:Publicity) => {
      const userId = new ObjectId(publicity.byUser as string)
      const user = await req.db
        .collection('users')
        .findOne({ _id: userId })

      return {
        ...publicity,
        byUser: {
          ...user,
          password: undefined
        }
      }
    })
    .toArray()
  
  return res.json({
    publicities: await Promise.all(serializedPublicities),
    total: totalDocuments
  })
})

handler.use(verifyToken)
handler.use(uploader.fields([
  { name: 'thumbnail', maxCount: 1 }, 
  { name: 'gallery', maxCount: 8 }
]))

handler.post<UploadRequest, NextApiResponse>(async (req, res) => {
  const userId = req.user
  const { title, description, whatsapp, category } = req.body
  const gallery = req.files['gallery']
    ? req.files['gallery'].map(file => file.path)
    : []

  const publicity = {
    title,
    description,
    whatsapp,
    category,
    byUser: userId,
    thumbnail: req.files['thumbnail'][0].path,
    gallery,
    createdAt: Date.now()
  }

  try {
    await req.db.collection('publicities').insertOne(publicity)
    return res.json(publicity)
  } catch (error) {
    console.log(error)
  }
})

export default handler