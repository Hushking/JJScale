const { poolPromise } = require('../middleware/dbconfig')
const ApproverModel = require('../models/ApproverModel')

class ApproverRepository{
    async GetProposal() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT * FROM APROVADOR WHERE P.STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let proposal = new ApproverModel({...item})
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
            await poolPromise.query('INSERT INTO APROVADOR (nome, sobrenome, email, telefone, idcliente, cpf_cnpj, status, log_data, log_usuario) VALUES ($1, $2, $3, $4, $5, NOW(), $6)', [dados.nome, dados.sobrenome, dados.email, dados.telefone, dados.idcliente, dados.cpf_cnpj, 1, dados.idusuario],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Aprovaodor inserido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel inserir os dados do aprovador", Code: 403 })
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
            await poolPromise.query('UPDATE APROVADOR SET NOME = $2, SOBRENOME = $3, EMAIL = $4, TELEFONE = $5, IDCLIENTE = $6, CPF_CNPJ = $7, LOG_DATA = NOW(), LOG_USUARIO = $8 WHERE IDAPROVADOR = $1', [dados.idaprovador, dados.nome, dados.sobrenome, dados.email, dados.telefone, dados.idcliente, dados.cpf_cnpj, dados.idusuario],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Aprovador alterado com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel alterar os dados do aprovador", Code: 403 })
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
            await poolPromise.query('UPDATE APROVADOR SET STATUS = $2, LOG_DATA = NOW(), LOG_USUARIO = $3 WHERE IDAPROVADOR = $1', [dados.id, 0, dados.idusuario] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Aprovador excluido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir o aprovador", Code: 403 })
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
            await poolPromise.query('SELECT * WHERE IDAPROVADOR = $1 AND STATUS = $2', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                  res.rows.map(item => {
                    let project = new ApproverModel({...item})
                    project.razaosocial = item.razaosocial
                    list.push(project)
                  })
                  resolve(list)
                } else {
                reject({ Mensagem: "Aprovador inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
}
module.exports = new ApproverRepository()