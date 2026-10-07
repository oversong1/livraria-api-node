// export interface Livro{
//     id: number;
//     titulo: string;
//     preco: number;
// }

export type TipoLivro = 'FISICO' | 'EBOOK';

interface LivroBase {
  id: number;
  titulo: string;
  preco: number;
}

export interface LivroFisico extends LivroBase {
  tipo: 'FISICO';
  estoque: number;
  arquivo_url: null;
}

export interface LivroEbook extends LivroBase {
  tipo: 'EBOOK';
  estoque: null;
  arquivo_url: string;
}

// Union discriminada: um Livro e UM OU OUTRO, nunca uma mistura dos dois.
export type Livro = LivroFisico | LivroEbook;

export type NovoLivroFisico = Omit<LivroFisico, 'id'>;
export type NovoLivroEbook = Omit<LivroEbook, 'id'>;
export type NovoLivro = NovoLivroFisico | NovoLivroEbook;