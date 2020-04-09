const { poolPromise } = require('../middleware/dbconfig')
const ClientModel = require('../models/ClientModel')

class ClientRepository{
    async GetClients() {
        return new Promise(async(resolve, reject) => {
          try {
            let lista = []
            await poolPromise.query('SELECT * FROM CLIENTE WHERE STATUS = $1',[1] ,(err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                res.rows.map(item => {
                  let project = new ClientModel({...item})
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
            await poolPromise.query('INSERT INTO CLIENTE (idcliente, cpf_cnpj, razaosocial, rua, numero, complemento, cep, bairro, uf, cidade, pais, status) VALUES ((SELECT MAX(idcliente)+1 FROM CLIENTE), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
            , [dados.cpf_cnpj, dados.razaosocial, dados.rua, dados.numero, dados.complemento, dados.cep, dados.bairro, dados.uf, dados.cidade, dados.pais, 1],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Cliente inserido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel inserir os dados do cliente", Code: 403 })
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
            await poolPromise.query('UPDATE CLIENTE SET CPF_CNPJ = $2, RAZAOSOCIAL = $3, RUA = $4, NUMERO = $5, COMPLEMENTO = $6, CEP = $7, BAIRRO = $8, UF = $9, CIDADE = $10, PAIS = $11 WHERE IDCLINTE = $1'
            , [dados.idcliente , dados.cpf_cnpj, dados.razaosocial, dados.rua, dados.numero, dados.complemento, dados.cep, dados.bairro, dados.uf, dados.cidade, dados.pais],(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Cliente alterado com sucesso", Code: 200 })
              } else {
                console.log(err)
                reject({ Mensagem: "Não foi possivel alterar os dados do cliente", Code: 403 })
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
            await poolPromise.query('UPDATE CLIENTE SET STATUS = $2 WHERE IDCLIENTE = $1', [id, 0] ,(err, res) =>{
              if (err == null) {
                resolve({ Mensagem: "Cliente excluido com sucesso", Code: 200 })
              } else {
                reject({ Mensagem: "Não foi possivel excluir o client", Code: 403 })
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
      async GetClientById(id){
        return new Promise(async(resolve, reject) => {
          try {
            let list = []
            await poolPromise.query('SELECT * FROM CLIENTE WHERE IDCLIENTE = $1 AND STATUS = $2', [id, 1], (err, res) => {
              if (err) {
                reject(err.stack)
              } else {
                if (res.rowCount == 1){
                    res.rows.map(item => {
                    let client = new ClientModel({...item})
                    list.push(client)
                    })
                    resolve(list)
                } else {
                reject({ Mensagem: "Cliente inexistente", Code: 403 })
                }
              }
            })
          } catch (err) {
            reject(err.stack)
          }
        })
      }
}
module.exports = new ClientRepository()