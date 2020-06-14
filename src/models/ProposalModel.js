class ProposalModel{
    constructor({
        idproposta
        , idprojeto
        , idaprovador
        , observacao
        , nome
    }){
        this.idproposta = idproposta
        this.idprojeto = idprojeto
        this.idaprovador = idaprovador
        this.observacao = observacao
        this.nome = nome
    }
}
module.exports = ProposalModel