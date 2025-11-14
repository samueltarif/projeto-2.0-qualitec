-- Contagens por valor nas colunas booleanas
SELECT 'glicerina' AS col, glicerina AS val, COUNT(*) AS cnt FROM produtos GROUP BY glicerina;
SELECT 'tubo_sifao' AS col, tubo_sifao AS val, COUNT(*) AS cnt FROM produtos GROUP BY tubo_sifao;
SELECT 'selo_diafragma' AS col, selo_diafragma AS val, COUNT(*) AS cnt FROM produtos GROUP BY selo_diafragma;
SELECT 'contato_eletrico' AS col, contato_eletrico AS val, COUNT(*) AS cnt FROM produtos GROUP BY contato_eletrico;
SELECT 'valvula_isolamento' AS col, valvula_isolamento AS val, COUNT(*) AS cnt FROM produtos GROUP BY valvula_isolamento;