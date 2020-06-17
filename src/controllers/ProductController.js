const ProductRepository = require('../repository/ProductRepository')
const ProductModel = require('../models/ProductModel')

class ProductController{
    async GetProduct(req, res){
        await ProductRepository.GetProduct().then(list => {
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
        await ProductRepository.Insert(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Edit(req, res){
        await ProductRepository.Edit(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async Delete(req, res){
        await ProductRepository.Delete(req.body).then(item => {
          res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
      }
      async GetProductById(req, res){
        let id = req.params.id
        await ProductRepository.GetProductById(id).then(produto => {
          if (!produto) {
            return res.status(404).json(produto)
          } else {
            return res.status(200).json(produto)
          }
        }).catch (err => {
          return res.status(500).json(`Erro interno:${err.Mensagem}`)
        })
      }
}
module.exports = new ProductController()