class ProjectModel{
    constructor({
        idprojeto
        , nome
        , apelido
        , idcliente
        , status
    }){
        this.idprojeto = idprojeto
        this.nome = nome
        this.apelido = apelido
        this.idcliente = idcliente
        this.status = status
    }
}
module.exports = ProjectModel