-- Schema export for table: empresas
-- Database: qualitec_catalogos

DROP TABLE IF EXISTS `empresas`;

CREATE TABLE `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(18) NOT NULL,
  `razao_social` varchar(255) DEFAULT NULL,
  `filial` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_cnpj` (`cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
