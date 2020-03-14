const jwt = require('jsonwebtoken')
const config = require('../helper/Config')
const security = require('../../config/security')

class SecurityController {
  
  Login(req, res) {
    if (req.body.grant_type === 'password'){
      let { username, password } = req.body
      if (username && password) {
        if (username == security.User && password == security.Password) {
          let token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' })
          res.status(200).json({
            AccessToken: token,
            TokenType: 'bearer',
            ExpiredIn: 86399
          })
        } else {
          res.status(403).json({
            success: false,
            message: 'Incorrect username or password'
          })
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        })
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Grant_Type failed! Please check the request'
      });
    }
  }
}

module.exports = new SecurityController()