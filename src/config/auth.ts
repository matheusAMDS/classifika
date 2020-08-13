export default {
  access: {
    SECRET: process.env.ACCESS_SECRET_KEY,
    options: {
      expiresIn: '2h'
    }
  },
  email: {
    SECRET: process.env.EMAIL_SECRET_KEY,
    options: {
      expiresIn: '1h'
    }
  }
}