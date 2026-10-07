ALTER TABLE livros ADD COLUMN tipo VARCHAR(10) NOT NULL DEFAULT 'FISICO';
ALTER TABLE livros ADD COLUMN estoque INTEGER;
ALTER TABLE livros ADD COLUMN arquivo_url VARCHAR(255);

ALTER TABLE livros ALTER COLUMN tipo DROP DEFAULT;

-- CHECK: o proprio Postgres recusa um INSERT/UPDATE que viole a regra - mesmo que,
-- no futuro, algum codigo (ou alguem direto no Adminer) tente gravar um livro
-- FISICO sem estoque, ou um EBOOK sem arquivo. Defesa na camada mais baixa possivel.
ALTER TABLE livros ADD CONSTRAINT livros_tipo_valido
    CHECK (tipo IN ('FISICO', 'EBOOK'));

ALTER TABLE livros ADD CONSTRAINT livros_campos_por_tipo
    CHECK (
        (tipo = 'FISICO' AND estoque IS NOT NULL AND arquivo_url IS NULL)
        OR
        (tipo = 'EBOOK' AND arquivo_url IS NOT NULL AND estoque IS NULL)
    );