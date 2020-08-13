import nc from 'next-connect'
import { NextApiResponse } from 'next'
import bcryptjs from 'bcryptjs'

import { Request } from 'lib/ncInterfaces'
import middlewares from 'lib/middleware'
import mailer from 'lib/mail'
import { generateToken } from 'lib/jwt'

const handler = nc<Request, NextApiResponse>()

handler.use(middlewares)

handler.post(async (req, res) => {
  const { email } = req.body
  const token = generateToken({ email }, 'email')
  const url = `http://localhost:3000/forgotpassword?token=${token}`

  mailer.sendMail({
    from: 'ClassifiKa <no-reply@classifika.com>',
    to: email,
    subject: 'Redefinição de senha',
    html: `
      <h1>Redefinição de senha</h1>
      <p>
        Olá, recebemos sua solicitação de redefinição de senha. Acesse o link abaixo:
        <a href="${url}" target="_blank">
          ${url}
        </a>
      </p>
    `
  })

  return res.status(204).end()
})

handler.put(async (req, res) => {
  const { newpassword, email } = req.body 
  
  await req.db.collection('users').findOneAndUpdate({ email }, { 
    '$set': { password: bcryptjs.hashSync(newpassword, 10)}
  })

  return res.status(204).end()
})

export default handler