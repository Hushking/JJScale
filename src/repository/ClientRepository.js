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
            await poolPromise.query('INSERT INTO CLIENTE (idcliente, cpf_cnpj, razaosocial, rua, numero, complemento, cep, bairro, uf, cidade, pais, status, log_data, log_usuario) VALUES ((SELECT MAX(idcliente)+1 FROM CLIENTE), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), $12)'
            , [dados.cpf_cnpj, dados.razaosocial, dados.rua, dados.numero, dados.complemento, dados.cep, dados.bairro, dados.uf, dados.cidade, dados.pais, 1, dados.idusuario],(err, res) =>{
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
      async Edit(client){
        return new Promise(async(resolve, reject) => {
          try{
            await poolPromise.query('UPDATE CLIENTE SET CPF_CNPJ = $2, RAZAOSOCIAL = $3, RUA = $4, NUMERO = $5, COMPLEMENTO = $6, CEP = $7, BAIRRO = $8, UF = $9, CIDADE = $10, PAIS = $11, LOG_DATA = NOW(), LOG_USUARIO = $12 WHERE IDCLIENTE = $1'
            , [client.idcliente , client.cpf_cnpj, client.razaosocial, client.rua, client.numero, client.complemento, client.cep, client.bairro, client.uf, client.cidade, client.pais, client.idusuario],(err, res) =>{
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
      async Delete(dados){
        return new Promise(async(resolve, reject) => {
          if(dados.id){
            console.log('lololo')
            try{
              await poolPromise.query('UPDATE CLIENTE SET STATUS = $2, LOG_DATA = NOW(), LOG_USUARIO = $3 WHERE IDCLIENTE = $1', [dados.id, 0, dados.idusuario] ,(err, res) =>{
                if (err == null) {
                  resolve({ Mensagem: "Cliente excluido com sucesso", Code: 200 })
                } else {
                  reject({ Mensagem: "Não foi possivel excluir o cliente", Code: 403 })
                }
              })
            } catch (err) {
              reject(err.stack)
            }
          } else {
            reject({ Mensagem: "Verifique os dados enviados", Code: 500 })
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