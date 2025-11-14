-- Update produtos table to match spreadsheet data
UPDATE produtos SET 
  tipo_medicao = 'RELATIVO',
  certificados = '["CONFORMIDADE"]'::jsonb;