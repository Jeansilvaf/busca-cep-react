
import api from './services/api';
import { useState } from 'react';
import './estilos/style.css';
import { FiSearch } from "react-icons/fi";

function App() {

  // Declaração e trabalho da manipulação dos estados em React
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  
  async function handleSearch() {
    
    
    if(input === '') {
      alert("Preencha o CEP!");
    }

    try {
      const resposta = await api.get(`${input}/json`);
      setCep(resposta.data);
      setInput("");
      
    } catch {
      alert("CEP não existe");
      setInput("");
    }
  }


  return (
    <div className="container">
      <div className="Box">
        <h1 className="title">Jean Busca CEP</h1>
        
        <div className="InputBox">
          <input 
              type="text" 
              placeholder="Digite seu CEP..." 
              value={input}
              onChange={ (e) => setInput(e.target.value) }/>

          <button type="button" className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="grey"/>
          </button>
        </div>
        
        {/* reinderização condicional para apresentação do quadro branco na aplicação */}
        {Object.keys(cep).length > 0 && (

            <main className="main">
                <h2>CEP: {cep.cep}</h2>

                <span>{cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>
            </main>

        )}
        
        </div>
    </div>
  );
}


export default App;