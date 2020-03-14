class ClientModel{
    constructor(
        idCliente
        , cpf_cnpj
        , razaoSocial
        , rua
        , numero
        , complemento
        , cep
        , bairro
        , uf
        , cidade
        , pais
    ){
        this.idCliente = idCliente
        this.cpf_cnpj = cpf_cnpj
        this.razaoSocial = razaoSocial
        this.rua = rua
        this.numero = numero
        this.complemento = complemento 
        this.cep = cep
        this.bairro = bairro
        this.uf = uf
        this.cidade = cidade
        this.pais = pais
    }
}
module.exports = ClientModel