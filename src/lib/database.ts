import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb:Db = null

export async function dbConnection() {
  if (cachedDb) 
    return cachedDb

  const uri = process.env.MONGO_URI
  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(url.parse(uri).pathname.substr(1))

  cachedDb = db
  return db
}
