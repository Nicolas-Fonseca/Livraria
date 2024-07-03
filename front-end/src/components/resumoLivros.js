import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { inAxios } from "../config_axios";

const ResumoLivros = () => {
    //return <h2>Resumo de Livros</h2>
    const [resumo, setResumo] = useState([]);
    const [grafico, setGrafico] = useState([]);

    const obterDados = async () => {
        try {
            const dadosResumo = await inAxios.get("livros/dados/resumo");
            setResumo(dadosResumo.data);

            const dadosGrafico = await inAxios.get("livros/dados/grafico");
            // array para a primeira linha
            const arrayGrafico = [["Ano", "R$ Total"]];
            // percorre as linhas do JSON e adiciona no array
            dadosGrafico.data.map((dado) => 
                dadosGrafico.push([dado.ano.toString(), dado.total])
            );
            setGrafico(arrayGrafico);
        } catch (error) {
            alert(`Error... Não foi possivel obter os dados: ${error}`);
        }
    };

    // metodo que executa o componente for renderizado 
    useEffect(() => {
        obterDados();
    }, []);

    return (
        <div className="container">
            <h4 className="mt-3">Resumo</h4>
            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">{resumo.num}</p>
                <p>N° de Livros Cadastrados</p>
            </span>
            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">
                    {Number(resumo.soma).toLocaleString("pt-br", {minimunFractionDigits: 2})}
                </p>
                <p>Total Investido em Livros</p>
            </span>
            <span className="btn btn-outline-primary btn-lg me-2">
                <p className="badge bg-danger">
                    {Number(resumo.maior).toLocaleString("pt-br", {minimunFractionDigits: 2})}
                </p>
                <p>Maior Preço Cadastrado</p>
            </span>
            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">
                    {Number(resumo.media).toLocaleString("pt-br", {minimunFractionDigits: 2})}
                </p>
                <p>Preço Médio Cadastrado</p>
            </span>

            <div className="d-flex justify-content-center">
                <Chart
                    width={1000}
                    height={420}
                    chartType="ColumnChart"
                    loader={<div>Carregando Grafico...</div>}
                    data={grafico}
                    options={{
                        title: "Total de Investimento em Livros - Por Ano de Publicação",
                        chartArena: {width: "80%"},
                        hAxis: { title: "Ano de Publição"},
                        vAxis: { title: "Preço Acumulado R$"},
                        legend: { position: "none"},
                    }}
                />
            </div>
        </div>
    );
};
export default ResumoLivros;