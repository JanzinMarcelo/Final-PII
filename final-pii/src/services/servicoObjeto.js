const urlBase = "http://localhost:4000/objetos";

export async function consultarObjetos() {
    const resposta = await fetch(urlBase, { method: "GET" });
    const listaObjetos = await resposta.json();
    return listaObjetos;
}

export async function cadastrarObjeto(objeto) {
    const resultado = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    });
    const resposta = await resultado.json();
    return resposta;
}

export async function alterarObjeto(objeto) {
    const resultado = await fetch(`${urlBase}/${objeto.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    });
    const resposta = await resultado.json();
    return resposta;
}

export async function excluirObjeto(id) {
    const resultado = await fetch(`${urlBase}/${id}`, { method: "DELETE" });
    const resposta = await resultado.json();
    return resposta;
}
