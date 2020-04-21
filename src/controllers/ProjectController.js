const ProjectRepository = require('../repository/ProjectRepository')
const ProjectModel = require('../models/ProjectModel')

class ProjectController{
    async GetProjects(req, res){
      await ProjectRepository.GetProjects().then(list => {
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
      await ProjectRepository.Insert(req.body).then(item => {
        res.status(200).json(item)
      }).catch(error => {
          res.status(500).json(error)
      })
    }
    async Edit(req, res){
      await ProjectRepository.Edit(req.body).then(item => {
        res.status(200).json(item)
      }).catch(error => {
          res.status(500).json(error)
      })
    }
    async Delete(req, res){
      let id = req.params.id
      await ProjectRepository.Delete(id).then(item => {
        res.status(200).json(item)
      }).catch(error => {
          res.status(500).json(error)
      })
    }
    async GetProjectById(req, res){
      let id = req.params.id
      await ProjectRepository.GetProjectById(id).then(user => {
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
module.exports = new ProjectController()