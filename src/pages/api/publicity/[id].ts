import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import cors from 'cors'

import db from 'middlewares/database'
import { Request } from 'middlewares/_types'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(db)
handler.use(cors())

handler.get<Request, NextApiResponse>(async(req, res) => {
  const id = req.query.id
  const publicity = await req.db
    .collection('publicities')
    .findOne({ _id: new ObjectId(id as string) })

  const user = await req.db
    .collection('users')
    .findOne({ _id: new ObjectId(publicity.byUser as string) })

  return res.json({
    ...publicity,
    byUser: user
  })
})

export default handler