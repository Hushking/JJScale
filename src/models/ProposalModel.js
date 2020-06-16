class ProposalModel{
    constructor({
        idproposta
        , idprojeto
        , idaprovador
        , observacao
        , nome
        , log_data
        , log_data_alteracao
        , usuario
    }){
        this.idproposta = idproposta
        this.idprojeto = idprojeto
        this.idaprovador = idaprovador
        this.observacao = observacao
        this.nome = nome
        this.log_data = log_data
        this.log_data_alteracao = log_data_alteracao
        this.usuario = usuario
    }
}
module.exports = ProposalModel