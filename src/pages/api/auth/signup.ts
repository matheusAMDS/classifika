import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import db from 'middlewares/database'
import { Request } from 'middlewares/_types'

import { generateToken } from 'middlewares/auth'

const handler = nc<NextApiRequest,NextApiResponse>()

handler.use(db)

handler.post<Request, NextApiResponse>(async (req, res) => {
  const { name, email, password } = req.body

  let user = await req.db.collection('users').findOne({ email })
  
  if (user)
    return res.status(400).json({ error: "Email already registered" })

  user = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    createdAt: new Date()
  }
  await req.db.collection('users').insertOne(user)

  return res.json({
    token: generateToken(user._id),
    user
  })
})

export default handler