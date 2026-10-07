import { Request, Response } from 'express';
import * as livrosRepo from '../repositories/livro.repository';

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

// Validacao ainda "na unha" aqui - propositalmente ingenua. A Fase 8 substitui
// tudo isso por schemas do Zod, com mensagens melhores e checagem completa.
export async function store(req: Request, res: Response) {
  const { titulo, preco, tipo, estoque, arquivo_url } = req.body;

  if (!titulo || !preco || !tipo) {
    return res.status(400).json({ erro: 'titulo, preco e tipo são obrigatórios' });
  }

  const livro = await livrosRepo.criar({ titulo, preco, tipo, estoque, arquivo_url });
  // 201 Created: o metodo HTTP correto pra "acabei de criar um recurso novo" -
  // diferente de 200 (generico) ou 204 (sucesso sem corpo, usado no destroy abaixo).
  res.status(201).json(livro);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { titulo, preco, tipo, estoque, arquivo_url } = req.body;

  const livro = await livrosRepo.atualizar(id, { titulo, preco, tipo, estoque, arquivo_url });

  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  res.json(livro);
}

export async function destroy(req: Request, res: Response) {
  const id = Number(req.params.id);
  const apagou = await livrosRepo.remover(id);

  if (!apagou) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  // 204 No Content: sucesso, mas nao tem nada pra devolver no corpo (o recurso
  // deixou de existir) - por isso NAO se chama res.json() aqui, so res.status(204).send().
  res.status(204).send();
}