-- Corrigir CNPJ da empresa de 03.117.117/0001-24 para 09.117.117/0001-24
UPDATE empresas 
SET cnpj = '09.117.117/0001-24' 
WHERE cnpj = '03.117.117/0001-24';