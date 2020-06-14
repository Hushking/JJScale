const { poolPromise } = require('../middleware/dbconfig')
const ProposalModel = require('../models/ProposalModel')
const CountModel = require('../models/CountModel')

class ProposalRepository{
    async GetProposal() {
      return new Promise(async(resolve, reject) => {
        try {
          let lista = []
          await poolPromise.query('SELECT * FROM PROPOSTA WHERE STATUS = $1',[1] ,(err, res) => {
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
          await poolPromise.query('INSERT INTO PROPOSTA (idprojeto, idaprovador, status, log_data, log_usuario, observacao) VALUES ($1, $2, $3, NOW(), $4, 5$)', [dados.idprojeto, dados.idaprovador, 1, dados.idusuario, dados.observacao],(err, res) =>{
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
          await poolPromise.query('UPDATE PROPOSTA SET IDPROJETO = $2, IDAPROVADOR = $3, LOG_DATA = NOW(), LOG_USUARIO = $4, OBSERVACAO = 5$ WHERE IDPROPOSTA = $1', [dados.idproposta, dados.idprojeto, dados.idaprovador, dados.idusuario, dados.observacao],(err, res) =>{
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
    async Delete(dados){
      return new Promise(async(resolve, reject) => {
        try{
          await poolPromise.query('UPDATE PROPOSTA SET STATUS = $2, LOG_DATA = NOW(), LOG_USUARIO = $3 WHERE IDPROPOSTA = $1', [dados.id, 0, dados.idusuario] ,(err, res) =>{
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
          await poolPromise.query('SELECT * FROM PROPOSTA WHERE IDPROPOSTA = $1 AND STATUS = $2', [id, 1], (err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              if (res.rowCount == 1){
                res.rows.map(item => {
                  let proposal = new ProposalModel({...item})
                  list.push(proposal)
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
    async GetProposalByUser(){
      return new Promise(async(resolve, reject) => {
        try {
          let lista = []
          await poolPromise.query('SELECT COUNT(*), USERS.NAME AS NOME FROM PROPOSTA JOIN USERS ON PROPOSTA.LOG_USUARIO = USERS.ID GROUP BY USERS.ID',(err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              res.rows.map(item => {
                let count = new CountModel({...item})
                count.color = "#"+((1<<24)*Math.random()|0).toString(16)
                lista.push(count)
              })
              resolve(lista)
            }
          })
        } catch (err) {
          reject(err.stack)
        }
      })
    }
    async GetProposalByClient(){
      return new Promise(async(resolve, reject) => {
        try {
          let lista = []
          await poolPromise.query('SELECT COUNT(*), PROJETO.NOME FROM PROPOSTA JOIN PROJETO ON PROPOSTA.IDPROJETO = PROJETO.IDPROJETO GROUP BY PROJETO.IDPROJETO',(err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              res.rows.map(item => {
                let count = new CountModel({...item})
                count.color = "#"+((1<<24)*Math.random()|0).toString(16)
                lista.push(count)
              })
              resolve(lista)
            }
          })
        } catch (err) {
          reject(err.stack)
        }
      })
    }
}
module.exports = new ProposalRepository()