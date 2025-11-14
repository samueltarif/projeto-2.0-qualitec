-- Schema export for table: produtos
-- Database: qualitec_catalogos

DROP TABLE IF EXISTS `produtos`;

CREATE TABLE `produtos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo_erp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `part_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fabricante` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_medicao` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diametro_montagem` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `posicao_montagem` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conexao_instrumento` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material_involucro` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material_internos` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classe_exatidao` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unidade_leitura` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `faixa_trabalho` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glicerina` tinyint(1) NOT NULL DEFAULT '0',
  `certificados` json DEFAULT NULL,
  `tubo_sifao` tinyint(1) NOT NULL DEFAULT '0',
  `selo_diafragma` tinyint(1) NOT NULL DEFAULT '0',
  `contato_eletrico` tinyint(1) NOT NULL DEFAULT '0',
  `valvula_isolamento` tinyint(1) NOT NULL DEFAULT '0',
  `ncm` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estoque` int NOT NULL DEFAULT '0',
  `preco` decimal(12,2) NOT NULL DEFAULT '0.00',
  `imagens` json DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_produtos_codigo_erp` (`codigo_erp`),
  UNIQUE KEY `uk_produtos_part_number` (`part_number`),
  KEY `idx_produtos_categoria` (`categoria`),
  KEY `idx_produtos_fabricante` (`fabricante`),
  KEY `idx_produtos_ncm` (`ncm`),
  KEY `idx_produtos_ativo` (`ativo`)
) ENGINE=InnoDB AUTO_INCREMENT=2155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
