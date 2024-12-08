import { Alert, Container, Spinner, Button } from "react-bootstrap";
import Pagina from "../Templates/Pagina";
import TabelaObjetos from "./Tabelas/TabelaObjetosVisu";
import { useState, useEffect } from "react";
import { consultarObjetos, excluirObjeto, alterarObjeto } from "../services/servicoObjeto";

export default function TelaCadastroObjetoVisu(props) {
    const [objetos, setObjetos] = useState([]);
    const [situacao, setSituacao] = useState('ok');

    // Recupera a lista de objetos cadastrados
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
    }, []);

    // Função para excluir um objeto
    function handleExcluirObjeto(id) {
        if (window.confirm("Tem certeza que deseja excluir este objeto?")) {
            excluirObjeto(id)
                .then(() => {
                    setObjetos(objetos.filter(objeto => objeto.id !== id));
                    alert("Objeto excluído com sucesso!");
                })
                .catch((erro) => {
                    console.error(erro.message);
                    alert("Erro ao excluir o objeto. Tente novamente.");
                });
        }
    }

    // Função para atualizar um objeto
    function handleAtualizarObjeto(id, novoObjeto) {
        alterarObjeto(id, novoObjeto)
            .then((resposta) => {
                alert("Objeto atualizado com sucesso!");
                setObjetos(
                    objetos.map((objeto) =>
                        objeto.id === id ? { ...objeto, ...novoObjeto } : objeto
                    )
                );
            })
            .catch((erro) => {
                console.error("Erro ao atualizar objeto:", erro.message);
                alert("Erro ao atualizar objeto. Verifique os campos e tente novamente.");
            });
    }

    if (situacao === 'erro') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de visualização de objetos</h2>
                    <div>
                        <Alert variant="danger">Erro ao carregar os objetos.</Alert>
                    </div>
                </Container>
            </Pagina>
        );
    } else if (situacao === 'processando') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de visualização de objetos</h2>
                    <div className="d-flex">
                        <Spinner animation="border" />
                        <p>Recuperando os objetos do backend...</p>
                    </div>
                </Container>
            </Pagina>
        );
    } else {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de visualização de objetos</h2>
                    <TabelaObjetos
                        listaObjetos={objetos}
                        handleExcluirObjeto={handleExcluirObjeto}
                        handleAtualizarObjeto={handleAtualizarObjeto}
                    />
                </Container>
            </Pagina>
        );
    }
}
