-- Atualizar tabela usuarios com campos de perfil se não existirem (compatível com MySQL 5.7/8.0)

-- full_name
SET @sql := (
  SELECT IF(COUNT(*) = 0,
    'ALTER TABLE `usuarios` ADD COLUMN `full_name` VARCHAR(255) NULL AFTER `email`',
    'SELECT 1'
  )
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'full_name'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- sector
SET @sql := (
  SELECT IF(COUNT(*) = 0,
    'ALTER TABLE `usuarios` ADD COLUMN `sector` VARCHAR(100) NULL AFTER `full_name`',
    'SELECT 1'
  )
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'sector'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- whatsapp
SET @sql := (
  SELECT IF(COUNT(*) = 0,
    'ALTER TABLE `usuarios` ADD COLUMN `whatsapp` VARCHAR(20) NULL AFTER `sector`',
    'SELECT 1'
  )
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'whatsapp'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;