import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './views/home'
import CadastroProduto from './views/cadastro/produto'
import ConsultaProdutos from './views/Consulta/produtos'

export default () => {
    return (        
        <Switch>
            <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto}/>
            <Route exact path="/consulta-produtos" component={ConsultaProdutos}/>
            <Route exact path="/" component={Home} />
        </Switch>
    )
}