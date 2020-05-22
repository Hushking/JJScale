const { poolPromise } = require('../middleware/dbconfig')
const ProductModel = require('../models/ProductModel')

class ProductRepository{
    async GetProduct() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT * FROM PRODUTO WHERE STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let product = new ProductModel({...item})
                  lista.push(product)
                })
                resolve(lista)
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async Insert(dados){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('INSERT INTO PRODUTO (idproduto, descricao, titulo, requisito, status) VALUES ((SELECT MAX(idproduto)+1 FROM PRODUTO), $1, $2, $3, $4)', [dados.descricao, dados.titulo, dados.requisito, 1],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Produto inserido com sucesso", Code: 200 })
              } else {
                console.log(err)
                reject({ Mensagem: "Não foi possivel inserir os dados do produto", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async Edit(project){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('UPDATE PRODUTO SET DESCRICAO = $2, REQUISITO = $3 WHERE IDPRODUTO = $1', [project.idproduto, project.descricao, project.requisito],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Produto alterado com sucesso", Code: 200 })
              } else {
                console.log(err)
                reject({ Mensagem: "Não foi possivel alterar os dados do produto", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async Delete(id){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('UPDATE PRODUTO SET STATUS = $2 WHERE IDPRODUTO = $1', [id, 0] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Produto excluido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir o produto", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async GetProductById(id){
        return new Promise(async(resolve, reject) => {
          try {
            let list = []
            await poolPromise.query('SELECT * FROM PRODUTO WHERE STATUS = $2 AND IDPRODUTO = $1', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                  res.rows.map(item => {
                    let product = new ProductModel({...item})
                    list.push(product)
                  })
                  resolve(list)
                } else {
                reject({ Mensagem: "Produto inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
}
module.exports = new ProductRepository()