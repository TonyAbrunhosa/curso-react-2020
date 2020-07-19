import React from 'react'

export default (props) => (
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Preço</th>
                <th>Fornecedor</th>
                <th></th>
            </tr>                           
        </thead>
        <tbody>
            {
                props.produtos.map( (p,index) => {
                    return(
                        <tr key={index}>
                            <th>{p.nome}</th>
                            <th>{p.sku}</th>
                            <th>{p.preco}</th>
                            <th>{p.fornecedor}</th>
                            <th>
                                <button onClick={ () => props.editarAction(p.sku)} className="btn btn-primary">Editar</button>
                                <button onClick={ () => props.deletarAction(p.sku)} className="btn btn-danger">Remover</button>
                            </th>   
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
)