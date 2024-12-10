import { Button, Container, Table } from "react-bootstrap";
import { excluirObjeto } from "../../services/servicoObjeto";

export default function TabelaObjetos(props) {
    
    function escolherObjetoEdicao(objeto) {
        props.setObjetoSelecionado(objeto);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    function apagarObjeto(id) {
        if (window.confirm("Tem certeza que deseja apagar o objeto?")) {
            excluirObjeto(id).then((resposta) => {
                if (resposta.status) {
                    // Limpando a lista original
                    const listaNova = props?.listaObjetos.filter((objeto) => {
                        return objeto.id !== id;
                    });
                    props.setListaObjetos(listaNova);
                } else {
                    alert(resposta.mensagem);
                }
            }).catch((erro) => {
                alert("Não foi possível se comunicar com o backend:" + erro.message);
            });
        }
    }

    return (
        <Container>
            <Button className="mt-3 mb-3" onClick={() => {
                props.setModoEdicao(false);
                props.setObjetoSelecionado({
                    id: '',
                    nome: '',
                    local: '',
                    data: '',
                    pessoa: '',
                    urlFoto: '',
                    observacoes: ''
                });
                props.setExibirTabela(false);
            }}>
                Novo Objeto
            </Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do Objeto</th>
                        <th>Local encontrado</th>
                        <th>Data de Encontro</th>
                        <th>Pessoa que encontrou</th>
                        <th>Foto do Objeto</th>
                        <th>Observações do Objeto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props?.listaObjetos.map((objeto) => {
                            return (
                                <tr key={objeto.id}>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.local}</td>
                                    <td>{objeto.data}</td>
                                    <td>{objeto.pessoa}</td>
                                    <td>{objeto.urlFoto}</td>
                                    <td>{objeto.observacoes}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            apagarObjeto(objeto.id);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6a.5.5 0 0 0 .5-.5z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </Button>
                                        <Button variant="warning" onClick={() => {
                                            escolherObjetoEdicao(objeto);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}
