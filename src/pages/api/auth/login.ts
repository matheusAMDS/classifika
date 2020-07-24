import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import cors from 'cors'

import db from 'middlewares/database'
import { generateToken } from 'middlewares/auth'
import { Request } from 'middlewares/_types'

const handler = nc<NextApiRequest,NextApiResponse>()

handler.use(db)
handler.use(cors())

handler.post<Request, NextApiResponse>(async (req, res) => {
  const { email, password } = req.body

  let user = await req.db.collection('users').findOne({ email })
  
  if (!user)
    return res.status(403).json({ error: "Email not registered" })

  if (!await bcrypt.compare(password, user.password))
    return res.status(403).json({ error: "Wrong password" })

  return res.json({
    token: generateToken(user._id),
    user
  })
})

export default handler