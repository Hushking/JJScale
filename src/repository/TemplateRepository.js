const { poolPromise } = require('../middleware/dbconfig')
const TemplateModel = require('../models/TemplateModel')

class TemplateRepository{
    async GetTemplate() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT * FROM MODELO WHERE STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let modelo = new TemplateModel({...item})
                  lista.push(modelo)
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
            await poolPromise.query('INSERT INTO MODELO (topico, descricao, json, status, log_data, log_usuario) VALUES ($1, $2, $3, $4, NOW(), $5)', [dados.topico, dados.descricao, dados.json, 1, dados.idusuario],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Modelo inserido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel inserir os dados do modelo", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async Edit(dados){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('UPDATE MODELO SET TOPICO = $2, DESCRICAO = $3, JSON = $4, LOG_DATA = NOW(), LOG_USUARIO = $5 WHERE IDMODELO = $1', [dados.idmodelo, dados.topico, dados.descricao, dados.json, dados.idusuario],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Modelo alterado com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel alterar os dados do modelo", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async Delete(dados){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('UPDATE MODELO SET STATUS = $2, LOG_DATA = NOW(), LOG_USUARIO = $3 WHERE IDMODELO = $1', [dados.id, 0, dados.idusuario] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Modelo excluido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir o modelo", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async GetTemplateById(id){
        return new Promise(async(resolve, reject) => {
          try {
            let list = []
            await poolPromise.query('SELECT * FROM MODELO WHERE IDMODELO = $1 AND STATUS = $2', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                  res.rows.map(item => {
                    let project = new TemplateModel({...item})
                    project.razaosocial = item.razaosocial
                    list.push(project)
                  })
                  resolve(list)
                } else {
                reject({ Mensagem: "Modelo inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }

}
module.exports = new TemplateRepository()