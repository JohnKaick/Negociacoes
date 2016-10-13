//_ e utilizado para o desenvolvedor não acessa os atributos da minha classe direto e sim por parametros
class ListaNegociacoes {

    constructor() {
        this._negociacoes = []; //Criação de ListaNegociacoes
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao); //Adiciona uma nova negociacao na ListaNegociacoes
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = []; //Substitui com uma lista vazia
    }
}