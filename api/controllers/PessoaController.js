const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()

            return res.status(200).json(todasAsPessoas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params

        try {
            const Umapessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })

            return res.status(200).json(Umapessoa)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)

            return res.status(200).json(novaPessoaCriada)

        } catch (error) {
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body

        try {

            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } }) //update nao retorna direto, retorna apenas 0 ou 1

            const pessoaEditada = await database.Pessoas.findOne({ where: { id: Number(id) } })

            return res.status(200).json(pessoaEditada)

        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async deletaPessoa(req, res) {
        const { id } = req.params

        try {

            await database.Pessoas.destroy({ where: { id: Number(id) } })

            return res.status(200).json({message: `id ${id} deletado com sucesso!`})
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController