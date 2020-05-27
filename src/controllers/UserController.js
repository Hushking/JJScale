const UserRepository = require('../repository/UserRepository')
const UserModel = require('../models/UserModel')

class UserController {
  async GetUsers(req, res){
    await UserRepository.GetUsers().then(list => {
      if (!list) {
        return res.status(404).json(list)
      } else {
        return res.status(200).json(list)
      }
    }).catch (err => {
      return res.status(500).json(`Erro interno:${err}`)
    })
  }
  async Insert(req, res){
    let user = new UserModel(
      null
      , req.body.name
      , req.body.cpf 
      , req.body.email
    )
    await UserRepository.Insert(user).then(item => {
      res.status(200).json(item)
    }).catch(error => {
        res.status(500).json(error)
    })
  }
  async Edit(req, res){
    let user = new UserModel(
      req.body.id
      , req.body.name
      , req.body.cpf 
      , req.body.email
    )
    await UserRepository.Edit(user).then(item => {
      res.status(200).json(item)
    }).catch(error => {
        res.status(500).json(error)
    })
  }
  async Delete(req, res){
    await UserRepository.Delete(req.body).then(item => {
      res.status(200).json(item)
    }).catch(error => {
        res.status(500).json(error)
    })
  }
  async GetUserById(req, res){
    let id = req.params.id
    await UserRepository.GetUserById(id).then(user => {
      if (!user) {
        return res.status(404).json(user)
      } else {
        return res.status(200).json(user)
      }
    }).catch (err => {
      return res.status(500).json(`Erro interno:${err.Mensagem}`)
    })
  }
  async VerifyUser(req, res){
    let cpf = req.params.cpf
    await UserRepository.VerifyUser(cpf).then(item => {
      res.status(200).json(item)
    }).catch(error => {
        res.status(500).json(error)
    })
  }
}

module.exports = new UserController()