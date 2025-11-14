-- Add sample data to certificados and tipo_medicao columns
UPDATE produtos SET 
  tipo_medicao = CASE 
    WHEN categoria LIKE '%MANOMETRO%' THEN 'Pressão'
    WHEN categoria LIKE '%TEMPERATURA%' THEN 'Temperatura'
    ELSE 'Pressão'
  END,
  certificados = CASE 
    WHEN id % 3 = 0 THEN '["INMETRO", "CE"]'::jsonb
    WHEN id % 3 = 1 THEN '["INMETRO"]'::jsonb
    ELSE '["CE"]'::jsonb
  END
WHERE tipo_medicao IS NULL AND certificados IS NULL;