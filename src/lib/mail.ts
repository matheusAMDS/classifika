import nodemailer from 'nodemailer'

import mailConfig from 'config/mail'

const mailer = nodemailer.createTransport(mailConfig)

export default mailer
