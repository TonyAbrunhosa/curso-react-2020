import React from 'react'
import ProdutoService from '../../app/produtoService'
import Card from '../../Components/card'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component{

    state = estadoInicial;

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) =>{
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor })
    }

    limparCampos = () =>{
        this.setState(estadoInicial)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku
        
        if(sku){
            const resultado = this.service.obterProdutos().filter( p => p.sku === sku)

            if(resultado.length === 1){                
                const produtoEncontrado = resultado[0]
                this.setState({ ...produtoEncontrado, atualizando: true})
            }
        }
    }

    onSubmit = (event) =>{
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try{
            this.service.salvar(produto);
            this.limparCampos();
            this.setState({sucesso: true});
            
        }catch(erro){
            const er = erro.errors
            this.setState({errors: er})
        }        
    }

    render(){
        return(
            <Card header={this.state.atualizando ? 'Atualização de Produtos' : 'Cadastro de Produtos'}> 
                <form id="frmProdutos" onSubmit={this.onSubmit}>

                    { this.state.sucesso &&

                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            Cadastro realizado com <strong>sucesso!</strong>
                        </div>
                    }

                    { this.state.errors.length > 0  &&
                    this.state.errors.map( msg => {
                        return(
                            <div className="alert alert-dismissible alert-danger">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                <strong>Atenção!</strong> {msg}
                            </div>
                        )
                    })                        
                    }

                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome: *</label>
                            <input type="text" 
                                name="nome" 
                                onChange={this.onChange}
                                value={this.state.nome} 
                                className="form-control"/> 
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>SKU: *</label>
                            <input type="text" 
                                name="sku" 
                                onChange={this.onChange}
                                value={this.state.sku} 
                                disabled={this.state.atualizando}
                                className="form-control"/> 
                        </div>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Descrição:</label>
                            <textarea className="form-control" 
                                    name="descricao" 
                                    onChange={this.onChange}
                                    value={this.state.descricao}/> 
                        </div>
                    </div>

                    </div>

                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Preço: *</label>
                            <input type="text" 
                                name="preco" 
                                onChange={this.onChange}
                                value={this.state.preco} 
                                className="form-control"/> 
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Fornecedor: *</label>
                            <input type="text" 
                                name="fornecedor" 
                                onChange={this.onChange}
                                value={this.state.fornecedor} 
                                className="form-control"/> 
                        </div>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-success">
                        {this.state.atualizando ? 'Atualizar' : 'Salvar'} 
                        </button>
                    </div>

                    <div className="col-md-1">
                        <button onClick={this.limparCampos} className="btn btn-primary">Limpar</button>
                    </div>
                    </div>
                </form>
                
            </Card>
        )
    }
}

export default withRouter(CadastroProduto)