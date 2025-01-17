const jwt = require("jsonwebtoken")

const SECRET_KEY = "12345"

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
}

const validateToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}
module.exports = {
  signToken,
  validateToken,
}
