import nc from 'next-connect'
import { NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

import { Request } from 'lib/ncInterfaces'
import middlewares from 'lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middlewares)

handler.get(async(req, res) => {
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