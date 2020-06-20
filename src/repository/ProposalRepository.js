const { poolPromise } = require('../middleware/dbconfig')
const ProposalModel = require('../models/ProposalModel')
const CountModel = require('../models/CountModel')
const CountMonthModel = require('../models/CountMonthModel')
const moment = require('moment')

class ProposalRepository{
    async GetProposal() {
      return new Promise(async(resolve, reject) => {
        try {
          let lista = []
          await poolPromise.query('SELECT PR.LOG_USUARIO AS id_usuario_criador, PR.OBSERVACAO, PR.IDPROPOSTA, PR.IDPROJETO, PJ.NOME, PR.LOG_DATA, PR.LOG_DATA_ALTERACAO, USERS.NAME AS usuario, (SELECT NAME FROM USERS WHERE PR.LOG_USUARIO_EDITOR = ID) AS usuario_editor FROM PROPOSTA PR JOIN USERS ON PR.LOG_USUARIO = USERS.ID LEFT JOIN PROJETO PJ ON PR.IDPROJETO = PJ.IDPROJETO WHERE PR.STATUS = $1 AND USERS.STATUS = $1',[1] ,(err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              res.rows.map(item => {
                let proposal = new ProposalModel({...item})
                proposal.log_data == null ? null : moment(proposal.log_data).format('YYYY-MM-DD')
                proposal.log_data_alteracao == null ? null : moment(proposal.log_data_alteracao).format('YYYY-MM-DD')
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
          await poolPromise.query('INSERT INTO PROPOSTA (idproposta, idprojeto, status, log_data, log_usuario, observacao) VALUES ((SELECT MAX(idproposta)+1 FROM PROPOSTA), $1, $2, NOW(), $3 ,$4)', [dados.idprojeto, 1, dados.idusuario, dados.observacao],(err, res) =>{
            if (err == null) {
              resolve({ Mensagem: "Proposta inserida com sucesso", Code: 200 })
            } else {
              console.log(err)
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
          await poolPromise.query('UPDATE PROPOSTA SET LOG_DATA_ALTERACAO = NOW(), LOG_USUARIO_EDITOR = $2, OBSERVACAO = $3 WHERE IDPROPOSTA = $1', [dados.idproposta, dados.idusuario, dados.observacao],(err, res) =>{
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
          await poolPromise.query('SELECT PR.LOG_USUARIO AS id_usuario_criador, PR.OBSERVACAO, PR.IDPROPOSTA, PR.IDPROJETO, PJ.NOME, PR.LOG_DATA, PR.LOG_DATA_ALTERACAO, USERS.NAME AS usuario, (SELECT NAME FROM USERS WHERE PR.LOG_USUARIO_EDITOR = ID) AS usuario_editor FROM PROPOSTA PR JOIN USERS ON PR.LOG_USUARIO = USERS.ID LEFT JOIN PROJETO PJ ON PR.IDPROJETO = PJ.IDPROJETO WHERE PR.IDPROPOSTA = $1 AND PR.STATUS = $2 AND USERS.STATUS = $2', [id, 1], (err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              if (res.rowCount == 1){
                res.rows.map(item => {
                  let proposal = new ProposalModel({...item})
                  proposal.log_data = moment(proposal.log_data).format('YYYY-MM-DD')
                  proposal.log_data_alteracao == null ? null : moment(proposal.log_data_alteracao).format('YYYY-MM-DD')
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
          await poolPromise.query('SELECT COUNT(*), USERS.NAME AS NOME FROM PROPOSTA JOIN USERS ON PROPOSTA.LOG_USUARIO = USERS.ID WHERE USERS.STATUS = $1 AND PROPOSTA.STATUS = $1 GROUP BY USERS.ID',[1],(err, res) => {
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
          await poolPromise.query('SELECT COUNT(*), PROJETO.NOME FROM PROPOSTA JOIN PROJETO ON PROPOSTA.IDPROJETO = PROJETO.IDPROJETO WHERE PROJETO.STATUS = $1 AND PROPOSTA.STATUS = $1 GROUP BY PROJETO.IDPROJETO',[1],(err, res) => {
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
    async GetProposalByMonth(){
      return new Promise(async(resolve, reject) => {
        try {
          let lista = []
          await poolPromise.query("select count(idproposta) as qtd_proposta, TO_CHAR(proposta.log_data, 'Month') as mes_criacao_proposta  from proposta  join users on users.id = proposta.log_usuario where proposta.status = $1 and users.status = $1 group by mes_criacao_proposta",[1],(err, res) => {
            if (err) {
              reject(err.stack)
            } else {
              res.rows.map(item => {
                let count = new CountMonthModel({...item})
                count.mes_criacao_proposta = count.mes_criacao_proposta.trim()
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