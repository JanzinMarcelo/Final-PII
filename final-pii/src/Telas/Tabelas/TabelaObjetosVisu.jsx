import { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function TabelaObjetos({ listaObjetos, handleExcluirObjeto }) {
    const [mostrarExcluir, setMostrarExcluir] = useState(false);

    return (
        <>
            <Button 
                variant="warning" 
                onClick={() => setMostrarExcluir(!mostrarExcluir)}
                style={{ marginBottom: '10px' }}
            >
                {mostrarExcluir ? "Ocultar Botões de Exclusão" : "Produto Já Encontrado"}
            </Button>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Nome do Objeto</th>
                        <th>Local encontrado</th>
                        <th>Data de encontro</th>
                        <th>Pessoa que encontrou</th>
                        <th>Foto do Objeto</th>
                        <th>Observações do Objeto</th>
                        {mostrarExcluir && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {listaObjetos.map((objeto) => (
                        <tr key={objeto.id}>
                            <td>{objeto.nome}</td>
                            <td>{objeto.local}</td>
                            <td>{objeto.data}</td>
                            <td>{objeto.pessoa}</td>
                            <td><img src={objeto.urlFoto} alt="Foto" style={{ width: '50px' }} /></td>
                            <td>{objeto.observacoes}</td>
                            {mostrarExcluir && (
                                <td>
                                    <Button variant="danger" onClick={() => handleExcluirObjeto(objeto.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
