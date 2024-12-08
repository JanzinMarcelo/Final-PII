import { Button, Form } from "react-bootstrap";
import { ContextoUsuario } from "../../App";
import { useContext, useRef } from "react";


export default function FormLogin(props){
    const contextoUsuario = useContext(ContextoUsuario);        
    const email = useRef("");
    const senha = useRef("");

    function processarLogin(evento){
        if (email.current.value==="joaoconstante@gmail.com" && senha.current.value==='1234'){
            contextoUsuario.setUsuario({
                email: email.current.value,
                logado: true
            });
        } 
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form className="border p-2" onSubmit={processarLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="digite seu email"
            ref={email} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="informe a senha"
            ref={senha} />
        </Form.Group>
        <Button style={{ background: "linear-gradient(to right, #6a0dad, #0000ff)",fontWeight: "bold" }} variant="primary" type="submit">
          Login
        </Button>
      </Form>

    );
}