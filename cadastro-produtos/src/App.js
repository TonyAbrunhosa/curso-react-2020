import React from 'react';
import Navbar from './Components/navbar'
import Rotas from './rotas'
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar/>               
      </div>     
      <div className="container">
        <Rotas/> 
        </div>   
    </HashRouter>
  );
}

export default App;
