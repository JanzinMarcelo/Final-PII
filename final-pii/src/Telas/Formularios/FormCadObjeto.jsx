import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate
import { cadastrarObjeto, alterarObjeto } from "../../services/servicoObjeto";

export default function FormularioCadastroObjeto(props) {
    const [objeto, setObjeto] = useState({
        nome: '',
        local: '',
        data: '',
        pessoa: '',
        urlFoto: '',
        observacoes: ''
    });

    const [validado, setValidado] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const navigate = useNavigate(); // Inicializa o useNavigate

    // Atualiza o estado do objeto quando props.objetoSelecionado muda
    useEffect(() => {
        if (props.objetoSelecionado) {
            setObjeto({
                nome: props.objetoSelecionado.nome || '',
                local: props.objetoSelecionado.local || '',
                data: props.objetoSelecionado.data || '',
                pessoa: props.objetoSelecionado.pessoa || '',
                urlFoto: props.objetoSelecionado.urlFoto || '',
                observacoes: props.objetoSelecionado.observacoes || ''
            });
        }
    }, [props.objetoSelecionado]);

    // Limpa o URL da imagem ao desmontar o componente
    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);

    function atualizarObjeto(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setObjeto({ ...objeto, [nome]: valor });
    }

    function handleFileChange(evento) {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            setObjeto({ ...objeto, urlFoto: arquivo.name }); // Armazena apenas o nome do arquivo
            setPreviewURL(URL.createObjectURL(arquivo)); // Cria uma URL temporária para a pré-visualização
        }
    }

    async function cadastrarObjetoHandler(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const formulario = evento.currentTarget;

        if (formulario.checkValidity()) {
            setValidado(false);

            try {
                if (!props.modoEdicao) {
                    const resposta = await cadastrarObjeto(objeto);
                    if (resposta.status) {
                        props.listaObjetos.push(objeto);
                        navigate("/"); // Redireciona para a página inicial
                    } else {
                        alert(resposta.mensagem);
                    }
                } else {
                    const resposta = await alterarObjeto(objeto);
                    if (resposta.status) {
                        const indice = props.listaObjetos.findIndex((obj) => obj.id === objeto.id);
                        props.listaObjetos[indice] = objeto;
                        props.setModoEdicao(false);
                        props.setObjetoSelecionado(null); // Reseta o objeto selecionado
                        navigate("/"); // Redireciona para a página inicial
                    } else {
                        alert(resposta.mensagem);
                    }
                }
            } catch (erro) {
                console.error("Erro:", erro);
                if (erro.message.includes("Unexpected token")) {
                    alert("Erro no servidor. A API retornou algo inesperado.");
                } else {
                    alert("Não foi possível se comunicar com o backend: " + erro.message);
                }
            }
        } else {
            setValidado(true);
        }
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrarObjetoHandler}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Nome do Objeto:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome do Objeto"
                        value={objeto.nome}
                        id="nome"
                        name="nome"
                        onChange={atualizarObjeto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o Objeto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Local encontrado:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Local"
                        id="local"
                        name="local"
                        onChange={atualizarObjeto}
                        value={objeto.local}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o local!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Data de local encontrado:</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        id="data"
                        name="data"
                        onChange={atualizarObjeto}
                        value={objeto.data}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Pessoa que encontrou:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Pessoa"
                        id="pessoa"
                        name="pessoa"
                        onChange={atualizarObjeto}
                        value={objeto.pessoa}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a pessoa!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Foto do objeto:</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".png"
                        name="urlFoto"
                        onChange={handleFileChange}
                    />
                    {previewURL && <img src={previewURL} alt="Preview" style={{ width: '200px', height: '200px', marginTop: '10px' }} />}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Observações sobre o Objeto:</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Observações"
                        id="observacoes"
                        name="observacoes"
                        onChange={atualizarObjeto}
                        value={objeto.observacoes}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe as observações!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>
            <Button variant="secondary" type="button" onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}
