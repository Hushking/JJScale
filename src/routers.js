const rotas = require('express').Router()
const middleware = require('./middleware/jwtconfig')
const {
  UserController,
  ProjectController,
  SecurityController
} = require('./controllers')

rotas.post('/token', SecurityController.Login)

// rotas.use(middleware.checkToken)

rotas.get('/user', UserController.GetUsers)
rotas.get('/user/:id', UserController.GetUserById)
rotas.post('/user', UserController.Insert)
rotas.put('/user', UserController.Edit)
rotas.put('/user/:id', UserController.Delete)

rotas.get('/projeto', ProjectController.GetProjects)
rotas.get('/projeto/:id', ProjectController.GetProjectById)
rotas.post('/projeto', ProjectController.Insert)
rotas.put('/projeto', ProjectController.Edit)
rotas.put('/projeto/:id', ProjectController.Delete)


module.exports = rotas