const rotas = require('express').Router()
const middleware = require('./middleware/jwtconfig')
const {
  UserController,
  SecurityController
} = require('./controllers')

rotas.post('/token', SecurityController.Login)

// rotas.use(middleware.checkToken)

rotas.get('/user', UserController.GetUsers)
rotas.get('/user/:id', UserController.GetUserById)
rotas.post('/user', UserController.Insert)
rotas.put('/user', UserController.Edit)
rotas.put('/user/:id', UserController.Delete)



module.exports = rotas