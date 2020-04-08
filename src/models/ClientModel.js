class ClientModel{
    constructor({
        idCliente
        , cpf_cnpj
        , razaosocial
        , rua
        , numero
        , complemento
        , cep
        , bairro
        , uf
        , cidade
        , pais
        , status
    }){
        this.idCliente = idCliente
        this.cpf_cnpj = cpf_cnpj
        this.razaosocial = razaosocial
        this.rua = rua
        this.numero = numero
        this.complemento = complemento 
        this.cep = cep
        this.bairro = bairro
        this.uf = uf
        this.cidade = cidade
        this.pais = pais
        this.status = status
    }
}
module.exports = ClientModel