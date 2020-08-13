import nc from 'next-connect'
import { NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { Request } from 'lib/ncInterfaces'
import middlewares from 'lib/middleware'
import { generateToken } from 'lib/jwt'

const handler = nc<Request,NextApiResponse>()

handler.use(middlewares)

handler.post(async (req, res) => {
  const { name, email, password } = req.body

  let user = await req.db.collection('users').findOne({ email })
  
  if (user)
    return res.status(400).json({ error: "Email already registered" })

  const result = await req.db.collection('users').insertOne({
    name,
    email,
    password: bcrypt.hashSync(password, 10)
  }) 

  const token = generateToken({ id: result.insertedId }, 'access')

  return res.json({ token })
})

export default handler