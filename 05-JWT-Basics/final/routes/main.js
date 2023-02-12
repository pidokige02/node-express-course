const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)  // authMiddleware 을 실행하고 dashboard 을 실행한다.
router.route('/login').post(login)

module.exports = router
