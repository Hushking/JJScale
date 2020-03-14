class UserModel{
  constructor(
      id
      , name
      , cpf
      , email
      , status
    ){
      this.id = id
      this.name = name
      this.cpf = cpf
      this.email = email
      this.status = status
  }
}

module.exports = UserModel