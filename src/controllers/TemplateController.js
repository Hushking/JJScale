const TemplateRepository = require('../repository/TemplateRepository')
const TemplateModel = require('../models/TemplateModel')

class TemplateController{
    async GetTemplate(req, res){
        await TemplateRepository.GetTemplate().then(list => {
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
        await TemplateRepository.Insert(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Edit(req, res){
        await TemplateRepository.Edit(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Delete(req, res){
        let id = req.params.id
        await TemplateRepository.Delete(id).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async GetTemplateById(req, res){
        let id = req.params.id
        await TemplateRepository.GetTemplateById(id).then(user => {
          if (!user) {
            return res.status(404).json(user)
          } else {
            return res.status(200).json(user)
          }
        }).catch (err => {
          return res.status(500).json(`Erro interno:${err.Mensagem}`)
        })
      }
}
module.exports = new TemplateController()