import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
    return (
        <Container>
            <Cabecalho color="green" texto="Sistema de Achados e Perdidos" />
            <Menu />
            {
                props.children
            }
        </Container>
    );
}