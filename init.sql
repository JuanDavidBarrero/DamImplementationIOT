-- Crear la tabla de Válvulas
CREATE TABLE `Valves` (
  `valves_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
);

-- Crear la tabla de Dispositivos con un índice único en valve_id
CREATE TABLE `Devices` (
  `device_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `valve_id` int NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp,
  UNIQUE KEY (`valve_id`)  -- Índice único para valve_id
);

-- Crear la tabla de Logs
CREATE TABLE `Logs` (
  `logs_id` int PRIMARY KEY AUTO_INCREMENT,
  `logs` varchar(20) NOT NULL,
  `valve_id` int NOT NULL,
  `date` timestamp DEFAULT (now())
);

-- Crear la tabla de Mediciones
CREATE TABLE `measurements` (
  `measurement_id` int PRIMARY KEY AUTO_INCREMENT,
  `date` timestamp DEFAULT (now()),
  `data` varchar(100),
  `device_id` int
);

-- Añadir claves foráneas
ALTER TABLE `Devices` ADD CONSTRAINT `fk_valve_id` FOREIGN KEY (`valve_id`) REFERENCES `Valves` (`valves_id`);

ALTER TABLE `Logs` ADD FOREIGN KEY (`valve_id`) REFERENCES `Valves` (`valves_id`);

ALTER TABLE `measurements` ADD FOREIGN KEY (`device_id`) REFERENCES `Devices` (`device_id`);



-- Insertar Válvulas
INSERT INTO `Valves` (`name`) VALUES
('Valve1'),
('Valve2'),
('Valve3');

-- Insertar Dispositivos, cada uno con una válvula y ubicación específica
INSERT INTO `Devices` (`name`, `location`, `valve_id`) VALUES
('Device1', 'ZONA ESTE', 1),  -- Device1 con Valve1 en ZONA ESTE
('Device2', 'ZONA OESTE', 2),  -- Device2 con Valve2 en ZONA OESTE
('Device3', 'ZONA NORTE', 3);  -- Device3 con Valve2 en ZONA NORTE

-- Insertar Logs (12 logs con estado de válvula: abierta o cerrada)
-- Insertar Logs con los estados 'open' o 'close'
INSERT INTO `Logs` (`logs`, `valve_id`, `date`) VALUES
('open', 1, NOW()),
('close', 1, NOW()),
('open', 2, NOW()),
('close', 2, NOW()),
('open', 3, NOW()),
('close', 3, NOW()),
('open', 1, NOW()),
('close', 1, NOW()),
('open', 2, NOW()),
('close', 2, NOW()),
('open', 3, NOW()),
('close', 3, NOW());


-- Insertar Mediciones (20 mediciones con valores variados)
INSERT INTO `measurements` (`data`, `device_id`, `date`) VALUES
('34%', 1, NOW()),
('78%', 1, NOW()),
('50%', 1, NOW()),
('45%', 1, NOW()),
('60%', 1, NOW()),
('55%', 1, NOW()),
('80%', 2, NOW()),
('67%', 2, NOW()),
('71%', 2, NOW()),
('59%', 2, NOW()),
('63%', 2, NOW()),
('48%', 2, NOW()),
('70%', 3, NOW()),
('74%', 3, NOW()),
('80%', 3, NOW()),
('56%', 3, NOW()),
('65%', 3, NOW()),
('68%', 3, NOW()),
('52%', 3, NOW()),
('77%', 3, NOW());

