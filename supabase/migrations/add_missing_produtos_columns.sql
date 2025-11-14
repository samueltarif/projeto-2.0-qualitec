-- Add missing columns to produtos table for certificados and tipo_medicao
ALTER TABLE produtos 
ADD COLUMN tipo_medicao varchar(150),
ADD COLUMN certificados jsonb;