import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'

import { Request } from 'lib/ncInterfaces'

export interface Decoded {
  id: string;
  iat: number;
  exp: number;
}

export function generateToken(id:string) {
  const JWT_SECRET = process.env.ACCESS_SECRET_KEY
  
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '2h' })
}

export function verifyToken(req:Request, res:NextApiResponse, next:() => void) {
  const auth = req.headers.authorization

  if (!auth)
    return res.status(401).json({ error: "No credentials provided" })

  const authSplitted = auth.trim().split(' ')

  if (!(authSplitted.length === 2))
    return res.status(401).json({ error: "Malformed token" })

  const [type, token] = authSplitted

  if (type !== 'Bearer')  
    return res.status(401).json({ error: "It must be a Bearer token" })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY) as Decoded

    req.user = decoded.id
    next()
  } catch (error) {
    console.log(error)
  }
}

export function verifyIsExpired(token:string) {
  try {
    const decoded = jwt.decode(token) as Decoded
    const timeNow = Math.floor(Date.now() / 1000)

    return !(decoded.exp > timeNow)
  } catch (error) {
    return null
  }
}