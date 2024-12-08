import TelaCadastroObjeto from "./Telas/TelaCadastroObjeto";
import TelaMenu from "./Telas/TelaMenu";
import Tela404 from "./Telas/Tela404";
import TelaLogin from "./Telas/TelaLogin";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import TelaCadastroObjetoVisu from "./Telas/TelaCadastroObjetoVisu";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({
    "email": "teste@teste",
    "logado": false
  });

  if (usuario.logado) {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={{usuario, setUsuario}}>
          <BrowserRouter>
            <Routes>
              <Route path="/cliente" element={<TelaCadastroObjeto />} />
              <Route path="/" element={<TelaCadastroObjetoVisu />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={{usuario, setUsuario}}>
          <TelaLogin />
        </ContextoUsuario.Provider>
      </div>
    );
  }
}

export default App;
