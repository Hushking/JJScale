const ProposalRepository = require('../repository/ProposalRepository')
const ProposalModel = require('../models/ProposalModel')

class ProposalController{
    async GetProposalByClient(req, res){
        await ProposalRepository.GetProposalByClient().then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    async GetProposalByUser(req, res){
        await ProposalRepository.GetProposalByUser().then(item => {
            res.status(200).json(item)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
}
module.exports = new ProposalController()