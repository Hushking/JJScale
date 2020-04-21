const rotas = require('express').Router()
const middleware = require('./middleware/jwtconfig')
const {
  UserController,
  ProjectController,
  SecurityController,
  ProductController,
  ClientController
} = require('./controllers')

rotas.post('/token', SecurityController.Login)

// rotas.use(middleware.checkToken)

rotas.get('/user', UserController.GetUsers)
rotas.get('/user/:id', UserController.GetUserById)
rotas.get('/user/check/:cpf', UserController.VerifyUser)
rotas.post('/user', UserController.Insert)
rotas.put('/user', UserController.Edit)
rotas.put('/user/:id', UserController.Delete)

rotas.get('/projeto', ProjectController.GetProjects)
rotas.get('/projeto/:id', ProjectController.GetProjectById)
rotas.post('/projeto', ProjectController.Insert)
rotas.put('/projeto', ProjectController.Edit)
rotas.put('/projeto/:id', ProjectController.Delete)

rotas.get('/cliente', ClientController.GetClients)
rotas.get('/cliente/:id', ClientController.GetClientById)
rotas.post('/cliente', ClientController.Insert)
rotas.put('/cliente', ClientController.Edit)
rotas.put('/cliente/:id', ClientController.Delete)

rotas.get('/produto', ProductController.GetProduct)
rotas.get('/produto/:id', ProductController.GetProductById)
rotas.post('/produto', ProductController.Insert)
rotas.put('/produto', ProductController.Edit)
rotas.put('/produto/:id', ProductController.Delete)

module.exports = rotas