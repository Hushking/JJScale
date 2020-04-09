const { poolPromise } = require('../middleware/dbconfig')
const ProjectModel = require('../models/ProjectModel')

class ProjectRepository{
    async GetProjects() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT P.*, C.RAZAOSOCIAL FROM PROJETO P JOIN CLIENTE C ON C.IDCLIENTE = P.IDCLIENTE WHERE P.STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let project = new ProjectModel({...item})
                  project.razaosocial = item.razaosocial
                  lista.push(project)
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
            await poolPromise.query('INSERT INTO PROJETO (idprojeto, nome, apelido, idcliente, status) VALUES ((SELECT MAX(idprojeto)+1 FROM PROJETO), $1, $2, $3, $4)', [dados.nome, dados.apelido, dados.idcliente, 1],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Projeto inserido com sucesso", Code: 200 })
              } else {
                console.log(err)
                reject({ Mensagem: "Não foi possivel inserir os dados do projeto", Code: 403 })
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
            await poolPromise.query('UPDATE PROJETO SET NOME = $2, APELIDO = $3 WHERE IDPROJETO = $1', [project.id, project.nome, project.apelido],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Projeto alterado com sucesso", Code: 200 })
              } else {
                console.log(err)
                reject({ Mensagem: "Não foi possivel alterar os dados do projeto", Code: 403 })
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
            await poolPromise.query('UPDATE PROJETO SET STATUS = $2 WHERE IDPROJETO = $1', [id, 0] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Projeto excluido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir o projeto", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async GetProjectById(id){
        return new Promise(async(resolve, reject) => {
          try {
            let list = []
            await poolPromise.query('SELECT P.*, C.RAZAOSOCIAL FROM PROJETO P JOIN CLIENTE C ON C.IDCLIENTE = P.IDCLIENTE WHERE P.IDPROJETO = $1 AND P.STATUS = $2', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                  res.rows.map(item => {
                    let project = new ProjectModel({...item})
                    project.razaosocial = item.razaosocial
                    list.push(project)
                  })
                  resolve(list)
                } else {
                reject({ Mensagem: "Projeto inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
}
module.exports = new ProjectRepository()