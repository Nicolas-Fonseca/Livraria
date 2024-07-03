import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import ItemLista from "./itemLista.js"

const ManutençãoLivros = () => {
    const [livros, setLivros] = useState([]);
    const {register, handleSubmit, reset} = useForm();

    const  obterLista = async () => {
        try {
            const lista = await inAxios.get("livros");
            setLivros(lista.data);
        } catch (error) {
            alert(`Erro... Não foi possível obter os dados: ${error}`);
        }
    };

    const filtrarLista = async (campos) => {
        try {
            const lista = await inAxios.get(`livros/filtro/${campos.palavra}`);
            lista.data.length 
                ? setLivros(lista.data) 
                : alert("Não há livros com a palavra-chave pesquisada...");
        } catch (error) {
            alert(`Error... Não foi possivel obter od dados: ${error}`);
        }
    };

    const excluir = async (id, titulo) => {
        if (!window.confirm(`Confirmar a exclusão do livro "${titulo}"?`)) {
            return;
        }
        try {
            await inAxios.delete(`livros/${id}`);
            setLivros(livros.filter((livro) => livro.id !== id));
        } catch (error) {
            alert(`Error... Não foi possivel excluir este livro: ${error}`)
        }
    };

    const alterar = async (id, titulo, index) => {
        const novoPreco = Number(prompt(`informe o novo preço do livro "${titulo}"`));
        if (isNaN(novoPreco) || novoPreco === 0) {
            return;
        }
        try {
            await inAxios.put(`livros/${id}`, {preco: novoPreco});
            const livrosAlteracao = [...livros]
            livrosAlteracao[index].preco = novoPreco;
            setLivros(livrosAlteracao);
        } catch (error) {
            alert(`Error... Não foi possivel alterar o valor do livro: ${error}`)
        }
    }

    // definir o metodo pra executar o componente
    useEffect(() => {
        obterLista();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" 
                            placeholder="Título ou Autor" required {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos"
                                onClick={() => { reset({palavra: ""}); obterLista(); } } />
                        </div>
                    </form>
                </div>
            </div>
            
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ano</th>
                        <th>Preço</th>
                        <th>Foto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <ItemLista key={livro.id} id={livro.id} titulo={livro.titulo}
                        autor={livro.autor} ano={livro.ano} preco={livro.preco} foto={livro.foto} 
                        excluirClick={() => excluir(livro.id, livro.titulo)}
                        alterarClick={() => alterar(livro.id, livro.titulo, index)} />
                    ))}
                </tbody>
            </table>
        </div>
    )
};
export default ManutençãoLivros;