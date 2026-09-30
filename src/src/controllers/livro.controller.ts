import { Request, Response } from 'express';
import * as livrosRepo from '../data/livros';


export async function index(req: Request, res: Response) {
  const livros = await livrosRepo.listar();
  res.json(livros);
}

export async function show(req: Request, res: Response) {
  const id = Number(req.params.id);
  const livro = await livrosRepo.buscarPorId(id);

  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  res.json(livro);
}