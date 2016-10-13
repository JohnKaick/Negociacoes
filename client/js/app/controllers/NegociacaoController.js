//_ e utilizado para o desenvolvedor não acessa os atributos da minha classe direto e sim por parametros
class NegociacaoController {

    constructor() {

        //Atributos do controller para não fica chamando nos metodos
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = ProxyFactory.create(new listaNegociacoes(), ['adiciona', 'esvazia'], (model) => {
            this._negociacoesView.update(model);
        })


        //Recebendo as views de negociacões
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        //Recebendo as views de mensagens
        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], (model) => {
            this._mensagemView.update(model);
        })
        new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

    }

    adiciona(event) {
        event.preventDefault(); //Parando o evento do HTML atualizar a cada incluida realizada
        this._listaNegociacoes.adiciona(this._criaNegociacao()); //Adicionando Negociacao na ListaNegociacoes

        //Informando uma mensagem para cada Negociacao incluida
        this._mensagem.texto = 'Negociação adicionada com sucesso';

        //Limpando os campos para uma nova negociação
        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia(); //Limpando a lista de Negociacao

        //Informando uma mensagem para Negociacões ixcluidas
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _criaNegociacao() {
        //Recebendo os dados de negociação
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {
        //Limpando os dados de negociacão
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}