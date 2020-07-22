import { dbConnection } from 'middlewares/database'
import { ObjectId, Db } from 'mongodb'

let db:Db

dbConnection().then(res => db = res)

interface UserParams {
  name: string; 
  email: string;
  password: string;
}

interface UserType {
  _id: ObjectId;
  name: string; 
  email: string;
  password: string;
}

export default class User {
  /* collection: Db;
  _id: ObjectId;
  name: string; 
  email: string;
  password: string;

  constructor() {
    this.collection = collection
    
  } */
  static async create(data:UserParams) {
    const result = await db.collection('users').insertOne(data)
    const user:UserType = {
      _id: result.insertedId,
      ...data 
    }

    return user
  }

  static async findById() {}
}