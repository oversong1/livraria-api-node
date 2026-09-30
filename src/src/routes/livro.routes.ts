import  { Router } from 'express';
import * as livroController from '../controllers/livro.controller';

// Router: um "mini app" do Express, so com rotas - e "encaixado" no app principal
// (app.ts) atraves do app.use('/livros', livroRoutes). Por isso as rotas aqui
// dentro NAO repetem "/livros" - ja esta implicito pelo use() no app.ts.
const  router = Router();

router.get('/', livroController.index);
router.get('/:id', livroController.show);

export default router;