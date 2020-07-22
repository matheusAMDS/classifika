import { MongoClient } from 'mongodb'
import url from 'url'
import { NextApiResponse } from 'next'

import { Request } from 'middlewares/_types'

let cachedDb = null

export async function dbConnection() {
  if (cachedDb) 
    return cachedDb

  const uri = process.env.MONGO_URI
  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = await client.db(url.parse(uri).pathname.substr(1))

  cachedDb = db
  return db
}

async function db(req:Request, res:NextApiResponse, next:() => void) {
  try {
    const db = await dbConnection()

    req.db = db
    next()
  } catch (error) {
    console.log(error)
  }
}

export default db
