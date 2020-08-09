import nc from 'next-connect'
import { NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import middlewares from 'lib/middleware'
import { generateToken } from 'lib/jwt'
import { Request } from 'lib/ncInterfaces'

const handler = nc<Request, NextApiResponse>()

handler.use(middlewares)

handler.post(async (req, res) => {
  const { email, password } = req.body

  let user = await req.db.collection('users').findOne({ email })
  
  if (!user)
    return res.status(403).json({ error: "Email not registered" })

  if (!await bcrypt.compare(password, user.password))
    return res.status(403).json({ error: "Wrong password" })

  return res.json({
    token: generateToken(user._id)
  })
})

export default handler