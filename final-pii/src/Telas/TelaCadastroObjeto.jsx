import { Alert, Container, Spinner } from "react-bootstrap";
import Pagina from "../Templates/Pagina";
import FormularioCadObjeto from "./Formularios/FormCadObjeto";
import TabelaObjetos from "./Tabelas/TabelaObjetos";
import { useState, useEffect } from "react";
import { consultarObjetos } from "../services/servicoObjeto";

export default function TelaCadastroObjeto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [objetos, setObjetos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    // valores possíveis para situação: ok, erro, processando
    const [situacao, setSituacao] = useState('ok');
    const [objetoSelecionado, setObjetoSelecionado] = useState({
        id: '',
        nome: '',
        local: '',
        data: '',
        pessoa: '',
        urlFoto: 'IMG_1482.jpg',
        observacoes: ''
    });

    useEffect(() => {
        setSituacao('processando');
        consultarObjetos()
            .then((listaObjetos) => {
                setSituacao('ok');
                setObjetos(listaObjetos);
            })
            .catch((erro) => {
                console.error(erro.message);
                setSituacao('erro');
            });
    }, []);  // vazio indica que o useEffect será executado sempre que o componente for carregado -> didMount

    if (situacao === 'erro') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Objetos</h2>
                    <div>
                        <Alert variant="danger">Erro ao carregar os objetos.</Alert>
                    </div>
                </Container>
            </Pagina>
        );
    }
    else if (situacao === 'processando') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Objetos</h2>
                    <div className="d-flex">
                        <Spinner animation="border" />
                        <p>Recuperando os objetos do backend...</p>
                    </div>
                </Container>
            </Pagina>
        );
    }
    else {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Objetos</h2>
                    {
                        exibirTabela ? <TabelaObjetos
                            setExibirTabela={setExibirTabela}
                            listaObjetos={objetos}
                            setListaObjetos={setObjetos}
                            setObjetoSelecionado={setObjetoSelecionado}
                            setModoEdicao={setModoEdicao} />

                            : <FormularioCadObjeto
                                setExibirTabela={setExibirTabela}
                                listaObjetos={objetos}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                                objetoSelecionado={objetoSelecionado}
                                setObjetoSelecionado={setObjetoSelecionado} />
                    }
                </Container>
            </Pagina>
        );
    }
}