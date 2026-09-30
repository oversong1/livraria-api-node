import { Livro } from '../types/livro';

// PROVISORIO: array em memoria, some ao reiniciar o container.
// A Fase 5 substitui TODO o conteudo deste arquivo por consultas ao Postgres,
// mas as funcoes exportadas (listar, buscarPorId) continuam com a MESMA assinatura -
// e por isso o controller (4.3, abaixo) nao vai precisar mudar nada na Fase 5.
const livros: Livro[] = [
  { id: 1, titulo: 'Dom Casmurro', preco: 29.9 },
  { id: 2, titulo: 'O Cortiço', preco: 24.5 },
];

export async function listar(): Promise<Livro[]> {
  return livros;
}

export async function buscarPorId(id: number): Promise<Livro | undefined> {
  return livros.find((l) => l.id === id);
}