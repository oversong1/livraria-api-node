import express from 'express';
import livroRoutes from './routes/livro.routes';

const app = express();

app.use(express.json());

// Todas as rotas de /livros ficam registradas aqui, vindas de um arquivo proprio -
// o app.ts nao sabe (nem precisa saber) o que tem dentro de cada rota.
app.use('/livros', livroRoutes);

export default app;