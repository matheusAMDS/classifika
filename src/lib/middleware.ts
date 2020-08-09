import nc from 'next-connect'
import { NextApiResponse } from 'next'
import cors from 'cors'
import { Request } from 'lib/ncInterfaces'
import { Middleware } from 'next-connect'

import { dbConnection } from 'lib/database'

const db: Middleware<Request, NextApiResponse> = async (req, res, next) => {
  try {
    const db = await dbConnection()

    req.db = db
    next()
  } catch (error) {
    console.log(error)
  }
}

const handler = nc<Request, NextApiResponse>()

handler
  .use(db)
  .use(cors())

export default handler