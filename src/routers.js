const rotas = require('express').Router()
const middleware = require('./middleware/jwtconfig')
const {
  UserController,
  ProjectController,
  SecurityController,
  ProductController,
  ClientController,
  TemplateController
} = require('./controllers')

rotas.post('/token', SecurityController.Login)

// rotas.use(middleware.checkToken)

rotas.get('/user', UserController.GetUsers)
rotas.get('/user/:id', UserController.GetUserById)
rotas.get('/user/check/:cpf', UserController.VerifyUser)
rotas.post('/user', UserController.Insert)
rotas.put('/user', UserController.Edit)
rotas.delete('/user/:id', UserController.Delete)

rotas.get('/projeto', ProjectController.GetProjects)
rotas.get('/projeto/:id', ProjectController.GetProjectById)
rotas.post('/projeto', ProjectController.Insert)
rotas.put('/projeto', ProjectController.Edit)
rotas.delete('/projeto', ProjectController.Delete)

rotas.get('/cliente', ClientController.GetClients)
rotas.get('/cliente/:id', ClientController.GetClientById)
rotas.post('/cliente', ClientController.Insert)
rotas.put('/cliente', ClientController.Edit)
rotas.delete('/cliente', ClientController.Delete)

rotas.get('/modelo', TemplateController.GetTemplate)
rotas.get('/modelo', TemplateController.GetTemplateById)
rotas.post('/modelo', TemplateController.Insert)
rotas.put('/modelo', TemplateController.Edit)
rotas.delete('/modelo', TemplateController.Delete)

rotas.get('/produto', ProductController.GetProduct)
rotas.get('/produto/:id', ProductController.GetProductById)
rotas.post('/produto', ProductController.Insert)
rotas.put('/produto', ProductController.Edit)
rotas.delete('/produto', ProductController.Delete)

module.exports = rotas