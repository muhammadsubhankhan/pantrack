const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller.js')
const loginLimiter = require('../middleware/loginLimiter.js')

// @route /auth

router.route('/signin').post(loginLimiter, authController.login)
router.route('/signup').post(loginLimiter, authController.signup)

router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)

module.exports = router
