const { poolPromise } = require('../middleware/dbconfig')
const ProposalModel = require('../models/ProposalModel')
const CountModel = require('../models/CountModel')

class ProposalRepository{
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