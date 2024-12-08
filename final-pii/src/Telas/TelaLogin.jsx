import { Container } from "react-bootstrap";
import FormLogin from "./Formularios/FormLogin";

export default function TelaLogin(props) {
    return (
        <Container 
            className="d-flex justify-content-center align-items-center vh-100" 
           
        >
            <div className="w-50 p-4 border rounded shadow">
                <FormLogin />
            </div>
        </Container>
    );
}
