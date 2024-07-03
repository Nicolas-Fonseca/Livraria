const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Olá... Bem-Vindo!');
});

app.get('/Web-Service', (req, res) => {
    res.send('<h2>Web-Service: Usando Express</h2>');
});

// para reconhecer os dados recebidos como um objeto no formato JSON
app.use(express.json());
app.post('/filmes', (req, res) => {
    // const titulo = req.body.titulo;
    // const genero = req.body.genero;
    const {titulo, genero} = req.body;
    res.send(`Filme: ${titulo} - Gênero: ${genero}, recebido...`);
});

// Rota do cadastro dos livros
const livros = require('./livros');
app.use('/livros', livros);  // identifica a rota

// Middleware
function log(req, res, next) {
    console.log(`................ Acessando em ${new Date()}`);
    next();
}

app.get('/transfere', log, (req, res) => {
    res.send('OK! Valor tranferido com sucesso...');
});

app.listen(port, () =>{
    console.log(`Servirdor rodando em http://localhost:${port}`);
});
