const ClientRepository = require('../repository/ClientRepository')
const ClientModel = require('../models/ClientModel')

class ClientController{
    async GetClients(req, res){
        await ClientRepository.GetClients().then(list => {
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
        await ClientRepository.Insert(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Edit(req, res){
        await ClientRepository.Edit(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Delete(req, res){
        console.log(req.body)
        await ClientRepository.Delete(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async GetClientById(req, res){
        let id = req.params.id
        await ClientRepository.GetClientById(id).then(client => {
          if (!client) {
            return res.status(404).json(client)
          } else {
            return res.status(200).json(client)
          }
        }).catch (err => {
          return res.status(500).json(`Erro interno:${err.Mensagem}`)
        })
      }
}
module.exports = new ClientController()