import React from 'react'
import Card from '../../Components/card'
import ProdutoService from '../../app/produtoService'
import ProdutosTable from '../Consulta/produtosTable'
import { withRouter } from 'react-router-dom'
import produto from '../cadastro/produto'

class ConsultaProdutos extends React.Component{

    state = {
        produtos: []
    }

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    componentDidMount(){
        const produtos = this.service.obterProdutos();
        this.setState({produtos})
    }

    preparaEditar = (sku) => {        
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku);
        this.setState({produtos})
    }

    render(){
        return(
            <Card header={'Consulta de Produtos'}>
                <ProdutosTable 
                    produtos={this.state.produtos}
                    editarAction={this.preparaEditar}
                    deletarAction={this.deletar}
                ></ProdutosTable>
            </Card>
        )
    }
}

export default withRouter(ConsultaProdutos)