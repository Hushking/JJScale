class ProposalModel{
    constructor({
        idproposta
        , idprojeto
        , observacao
        , nome
        , log_data
        , log_data_alteracao
        , usuario
        , usuario_editor
        , id_usuario_criador
    }){
        this.idproposta = idproposta
        this.idprojeto = idprojeto
        this.observacao = observacao
        this.nome = nome
        this.log_data = log_data
        this.log_data_alteracao = log_data_alteracao
        this.usuario = usuario
        this.usuario_editor = usuario_editor
        this.id_usuario_criador = id_usuario_criador
    }
}
module.exports = ProposalModel