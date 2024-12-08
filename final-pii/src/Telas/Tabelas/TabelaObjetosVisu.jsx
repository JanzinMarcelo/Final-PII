import { Table, Button } from "react-bootstrap";

export default function TabelaObjetos({ listaObjetos, handleExcluirObjeto }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Local</th>
                    <th>Data</th>
                    <th>Pessoa</th>
                    <th>Foto</th>
                    <th>Observações</th>
                    <th>Ações</th>
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
                        <td>
                            <Button variant="danger" onClick={() => handleExcluirObjeto(objeto.id)}>
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
