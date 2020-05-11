const { poolPromise } = require('../middleware/dbconfig')
const ProposalModel = require('../models/ProposalModel')

class ProposalRepository{
    async GetProposal() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT * FROM PROPOSTA WHERE P.STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let proposal = new ProposalModel({...item})
                  lista.push(proposal)
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
            await poolPromise.query('INSERT INTO PROPOSTA (idprojeto, idaprovador, status) VALUES ($1, $2, $3)', [dados.idprojeto, dados.idaprovador, 1],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Proposta inserida com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel inserir os dados da proposta", Code: 403 })
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
            await poolPromise.query('UPDATE PROPOSTA SET IDPROJETO = $2, IDAPROVADOR = $3 WHERE IDPROPOSTA = $1', [dados.idproposta, dados.idprojeto, dados.idaprovador],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Proposta alterada com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel alterar os dados da proposta", Code: 403 })
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
            await poolPromise.query('UPDATE PROPOSTA SET STATUS = $2 WHERE IDPROPOSTA = $1', [id, 0] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Proposta excluida com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir a proposta", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async GetProposalById(id){
        return new Promise(async(resolve, reject) => {
          try {
            let list = []
            await poolPromise.query('SELECT * FROM PROPOSTA WHERE IDPROPOSTA = $1 AND P.STATUS = $2', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                  res.rows.map(item => {
                    let project = new ProposalModel({...item})
                    project.razaosocial = item.razaosocial
                    list.push(project)
                  })
                  resolve(list)
                } else {
                reject({ Mensagem: "Proposta inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
}
module.exports = new ProposalRepository()