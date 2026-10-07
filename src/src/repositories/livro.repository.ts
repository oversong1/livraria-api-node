// Usado Na fase 5
import { pool } from '../config/database';
import { Livro, NovoLivro } from '../types/livro';

// As DUAS funcoes abaixo tem a MESMA assinatura das que existiam no array em
// memoria (Fase 4) - e por isso o controller nao muda UMA linha nesta fase.
export async function listar(): Promise<Livro[]> {
  // pool.query: pega uma conexao do pool, roda a query, devolve o resultado, e
  // devolve a conexao pro pool - tudo isso e assincrono (por isso o await).
  // const resultado = await pool.query<Livro>('SELECT id, titulo, preco FROM livros ORDER BY id'); //Usado até a fase 5
  const resultado = await pool.query<Livro>('SELECT * FROM livros ORDER BY id');
  return resultado.rows;
}

export async function buscarPorId(id: number): Promise<Livro | undefined> {
  // $1: placeholder de query PARAMETRIZADA - o pg substitui pelo valor de forma
  // segura, escapando automaticamente. NUNCA monte SQL concatenando string
  // (`'SELECT * FROM livros WHERE id = ' + id`) - isso abre brecha pra SQL Injection
  // (alguem mandar um "id" que na verdade e um pedaco de SQL malicioso).
  // const resultado = await pool.query<Livro>('SELECT id, titulo, preco FROM livros WHERE id = $1', [id]); //Usado até a fase 5
  const resultado = await pool.query<Livro>('SELECT * FROM livros WHERE id = $1', [id]);
  return resultado.rows[0];
}

export async function criar(dados: NovoLivro): Promise<Livro> {
  // RETURNING *: pede pro Postgres devolver a linha inteira recem-criada (com o id
  // gerado pelo SERIAL) na mesma query - sem isso, precisariamos de uma 2a consulta
  // so pra descobrir o id que acabou de ser gerado.
  const resultado = await pool.query<Livro>(
    `INSERT INTO livros (titulo, preco, tipo, estoque, arquivo_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [dados.titulo, dados.preco, dados.tipo, dados.estoque, dados.arquivo_url],
  );
  return resultado.rows[0];
}

export async function atualizar(id: number, dados: NovoLivro): Promise<Livro | undefined> {
  const resultado = await pool.query<Livro>(
    `UPDATE livros
     SET titulo = $1, preco = $2, tipo = $3, estoque = $4, arquivo_url = $5
     WHERE id = $6
     RETURNING *`,
    [dados.titulo, dados.preco, dados.tipo, dados.estoque, dados.arquivo_url, id],
  );
  return resultado.rows[0];
}

export async function remover(id: number): Promise<boolean> {
  const resultado = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
  // rowCount: quantas linhas o DELETE realmente afetou - 0 significa "nao existia
  // esse id", util pro controller decidir entre 204 (apagou) e 404 (nao achou).
  return (resultado.rowCount ?? 0) > 0;
}
// Usado até a fase 4
// import { Livro } from '../types/livro';

// // PROVISORIO: array em memoria, some ao reiniciar o container.
// // A Fase 5 substitui TODO o conteudo deste arquivo por consultas ao Postgres,
// // mas as funcoes exportadas (listar, buscarPorId) continuam com a MESMA assinatura -
// // e por isso o controller (4.3, abaixo) nao vai precisar mudar nada na Fase 5.
// const livros: Livro[] = [
//   { id: 1, titulo: 'Dom Casmurro', preco: 29.9 },
//   { id: 2, titulo: 'O Cortiço', preco: 24.5 },
// ];

// export async function listar(): Promise<Livro[]> {
//   return livros;
// }

// export async function buscarPorId(id: number): Promise<Livro | undefined> {
//   return livros.find((l) => l.id === id);
// }