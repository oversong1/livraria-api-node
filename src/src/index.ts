import app from './app';

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});



// VERSÃO DE TESTE
// import express, { Request, Response } from 'express';

// const app = express();
// const PORTA = 3000; // porta DENTRO do container - o docker-compose.yml mapeia 3333 (host) -> 3000 (container)

// // express.json(): middleware que ja vem com o Express - le o corpo de requisicoes
// // com Content-Type: application/json e preenche req.body automaticamente. Sem isso,
// // req.body viria undefined em qualquer POST/PUT que mandar JSON.
// app.use(express.json());

// // "Banco de dados" provisorio - um array em memoria. Some inteiro toda vez que o
// // servidor reinicia (por isso "provisorio": a Fase 5 troca isso pelo Postgres).
// interface Livro {
//   id: number;
//   titulo: string;
//   preco: number;
// }

// const livros: Livro[] = [
//   { id: 1, titulo: 'Dom Casmurro', preco: 29.9 },
//   { id: 2, titulo: 'O Cortiço', preco: 24.5 },
// ];

// // app.get: registra uma rota que so responde a requisicoes GET.
// // Request e Response (importados do 'express' acima): tipam os parametros req/res -
// // sem isso, o TypeScript nao saberia que req.body ou res.json existem.
// app.get('/livros', (req: Request, res: Response) => {
//   res.json(livros);
// });

// app.get('/livros/:id', (req: Request, res: Response) => {
//   // req.params: os pedacos dinamicos da URL (aqui, o ":id"). SEMPRE vem como string,
//   // mesmo se parecer um numero - por isso o Number(...) abaixo.
//   const id = Number(req.params.id);
//   const livro = livros.find((l) => l.id === id);

//   if (!livro) {
//     // res.status(404): sem isso, o Express responderia 200 (sucesso) mesmo pra um
//     // recurso que nao existe - o cliente da API teria que adivinhar pelo corpo vazio.
//     return res.status(404).json({ erro: 'Livro não encontrado' });
//   }

//   res.json(livro);
// });

// // app.listen: liga o servidor de verdade, escutando a porta. So a partir desta linha
// // o processo Node fica "escutando" - sem ela, nada do que foi registrado acima roda.
// app.listen(PORTA, () => {
//   console.log(`API rodando em http://localhost:${PORTA}`);
// });


git remote add origin https://github.com/oversong1/livraria-api-node.git
git remote -v
git push -u origin main --follow-tags