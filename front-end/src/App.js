import { Routes, Route } from "react-router-dom";
import MenuSuperior from "./components/menuSuperior";
import InclusaoLivros from "./components/inclusaoLivros";
import ManutençãoLivros from "./components/manutencaoLivros";
import ResumoLivros from "./components/resumoLivros";

const App = () => {
  return(
    <>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<InclusaoLivros />}></Route>
        <Route path="manut" element={<ManutençãoLivros />}></Route>
        <Route path="controle" element={<ResumoLivros />}></Route>
      </Routes>
    </>
  );
};
export default App;