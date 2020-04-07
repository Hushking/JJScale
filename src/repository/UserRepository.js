const { poolPromise } = require('../middleware/dbconfig')
const UserModel = require('../models/UserModel')

class UserRepository {
  async GetUsers() {
    return new Promise(async(resolve, reject) => {
      try {
        let lista = []
        await poolPromise.query('SELECT * FROM USERS WHERE STATUS = $1',[1] ,(err, res) => {
          if (err) {
            reject(err.stack)
          } else {
            res.rows.map(item => {
              let user = new UserModel({...item})
              lista.push(user)
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
        await poolPromise.query('INSERT INTO USERS (name, cpf, email, status) VALUES ($1, $2, $3, $4)', [dados.name, dados.cpf, dados.email, 1],(err, res) =>{
          if (err == null) {
            resolve({ Mensagem: "Usuário inserido com sucesso", Code: 200 })
          } else {
            reject({ Mensagem: "Não foi possivel inserir os dados do usuário", Code: 403 })
          }
        })
      } catch (err) {
        reject(err.stack)
      }
    })
  }
  async Edit(user){
    return new Promise(async(resolve, reject) => {
      try{
        await poolPromise.query('UPDATE USERS SET NAME = $2, CPF = $3, EMAIL = $4 WHERE ID = $1', [user.id, user.name, user.cpf, user.email],(err, res) =>{
          if (err == null) {
            resolve({ Mensagem: "Usuário alterado com sucesso", Code: 200 })
          } else {
            reject({ Mensagem: "Não foi possivel alterar os dados do usuário", Code: 403 })
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
        await poolPromise.query('UPDATE USERS SET STATUS = $2 WHERE ID = $1', [id, 0] ,(err, res) =>{
          if (err == null) {
            resolve({ Mensagem: "Usuário excluido com sucesso", Code: 200 })
          } else {
            reject({ Mensagem: "Não foi possivel excluir o usuário", Code: 403 })
          }
        })
      } catch (err) {
        reject(err.stack)
      }
    })
  }
  async GetUserById(id){
    return new Promise(async(resolve, reject) => {
      try {
        let list = []
        await poolPromise.query('SELECT * FROM USERS WHERE ID = $1 AND STATUS = $2', [id, 1], (err, res) => {
          if (err) {
            reject(err.stack)
          } else {
            if (res.rowCount == 1){
              res.rows.map(item => {
                let user = new UserModel({...item})
                list.push(user)
              })
              resolve(list)
            } else {
              reject({ Mensagem: "Usuário inexistente", Code: 403 })
            }
          }
        })
      } catch (err) {
        reject(err.stack)
      }
    })
  }
  async VerifyUser(cpf){
    return new Promise(async(resolve, reject) => {
      try{
        let user;
        await poolPromise.query('SELECT * FROM USERS WHERE CPF = $1', [cpf], (err, res) => {
          if (err) {
            reject(err.stack)
          } else {
            if (res.rowCount == 1){
              res.rows.map(item => {
                 user = new UserModel({...item})
              })
              resolve(user)
            } else {
              reject({ Mensagem: "Usuário inexistente", Code: 403 })
            }
          }
        })
      }catch (err){
        reject(err.stack)
      }
    })
  }

}

module.exports = new UserRepository()