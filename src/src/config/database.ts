import { Pool, types } from 'pg';
import 'dotenv/config'; // carrega o .env em process.env assim que este arquivo e importado

// O driver "pg" devolve coluna NUMERIC/DECIMAL do Postgres como STRING por padrao
// (ex: "29.90", nao 29.9) - e uma decisao de design do driver, pra nao arriscar
// perder precisao ao converter pra float automaticamente. O problema: nosso tipo
// `Livro.preco` (Fase 6) e `number`, nao `string` - sem esta linha, TODA resposta
// da API teria `preco` como texto, mesmo o TypeScript "garantindo" que e number (o
// compilador confia no `pool.query<Livro>(...)`, mas nao confere o dado de verdade
// que volta do banco - so em runtime isso apareceria errado). 1700 e o OID fixo do
// tipo "numeric" no Postgres; setTypeParser troca a conversao padrao por parseFloat,
// pro pool INTEIRO, de uma vez so - resolve pra toda query feita a partir daqui.
types.setTypeParser(1700, (valor) => parseFloat(valor));

// Pool: mantem varias conexoes abertas com o Postgres, prontas pra reaproveitar -
// em vez de abrir/fechar uma conexao TCP nova a cada requisicao.
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// SEM ISSO, O SERVIDOR INTEIRO CAI numa queda de conexao (nao so a requisicao que
// tava em andamento): o Pool mantem clientes OCIOSOS abertos entre requisicoes: se o
// Postgres reiniciar, cair, ou so soltar uma conexao ociosa por qualquer motivo, o
// `pg` emite um evento "error" nesse cliente ocioso - e o Node, por padrao, trata um
// evento "error" do EventEmitter SEM NENHUM LISTENER como excecao nao tratada, o que
// MATA O PROCESSO INTEIRO (nao so devolve 500 pra quem tava esperando resposta -
// derruba a API inteira, ate a proxima requisicao que nem tinha nada a ver com essa
// conexao). Esse listener evita isso: o erro so vira um log, o processo continua de
// pe, e a proxima query simplesmente abre uma conexao nova quando o banco voltar.
pool.on('error', (err) => {
  console.error('Erro inesperado num cliente ocioso do pool:', err);
});