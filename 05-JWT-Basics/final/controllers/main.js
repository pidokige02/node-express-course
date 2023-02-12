// check username, password in post(login) request
// if both of them exist create new JWT
//  and send back to fron-end
// setup authentication so only the request with JWT can access the dasboard
// token 을 가지고 dashboard에 access 힐 수 있게 하기 위함임


const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body
  // option 1 : mongoose validation
  // option 2 : Joi package 를 이용하여 authentication 처리가 가능하다.
  // option 3 : check in the controller which is implemented in this course

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate()

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  // console.log(req.headers)

  const luckyNumber = Math.floor(Math.random() * 100)   // 0..99

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
