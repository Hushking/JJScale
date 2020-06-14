const ProposalRepository = require('../repository/ProposalRepository')
const ProposalModel = require('../models/ProposalModel')

class ProposalController{
    async GetProposal(req, res){
        await ProposalRepository.GetProposal().then(list => {
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
        await ProposalRepository.Insert(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Edit(req, res){
        await ProposalRepository.Edit(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Delete(req, res){
        await ProposalRepository.Delete(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async GetProposalById(req, res){
        let id = req.params.id
        await ProposalRepository.GetProposalById(id).then(user => {
          if (!user) {
            return res.status(404).json(user)
          } else {
            return res.status(200).json(user)
          }
        }).catch (err => {
          return res.status(500).json(`Erro interno:${err.Mensagem}`)
        })
      }
    async GetProposalByClient(req, res){
        await ProposalRepository.GetProposalByClient().then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    async GetProposalByUser(req, res){
        await ProposalRepository.GetProposalByUser().then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
}
module.exports = new ProposalController()