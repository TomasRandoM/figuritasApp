CREATE DATABASE IF NOT EXISTS figuritas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE figuritas;

DROP TABLE IF EXISTS publicaciones;
DROP TABLE IF EXISTS figuritas;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apellido VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    mail VARCHAR(150) NOT NULL UNIQUE,
    direccion VARCHAR(255)
);

CREATE TABLE figuritas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador VARCHAR(150) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    nro_figurita VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE publicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    figurita_id INT NOT NULL,
    usuario_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (figurita_id) REFERENCES figuritas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (apellido, nombre, fecha_nacimiento, mail, direccion) VALUES
('Rando', 'Tomas', '2000-05-23', 'tomasrando@gmail.com', 'Av. Siempreviva 742'),
('Messi', 'Lionel', '1987-06-24', 'leo@example.com', 'Funes 123'),
('Di Maria', 'Angel', '1988-02-14', 'angel@example.com', 'Rosario 456');

INSERT INTO figuritas (jugador, pais, nro_figurita) VALUES
('Lionel Messi',       'Argentina',  'ARG01'),
('Angel Di Maria',     'Argentina',  'ARG02'),
('Emiliano Martinez',  'Argentina',  'ARG03'),
('Kylian Mbappe',      'Francia',    'FRA01'),
('Antoine Griezmann',  'Francia',    'FRA02'),
('Olivier Giroud',     'Francia',    'FRA03'),
('Neymar Jr',          'Brasil',     'BRA01'),
('Vinicius Junior',    'Brasil',     'BRA02'),
('Casemiro',           'Brasil',     'BRA03'),
('Luka Modric',        'Croacia',    'CRO01'),
('Ivan Perisic',       'Croacia',    'CRO02'),
('Cristiano Ronaldo',  'Portugal',   'POR01'),
('Bruno Fernandes',    'Portugal',   'POR02'),
('Harry Kane',         'Inglaterra', 'ING01'),
('Jude Bellingham',    'Inglaterra', 'ING02');

INSERT INTO publicaciones (figurita_id, usuario_id, cantidad) VALUES
(1, 1, 3),
(4, 1, 2),
(7, 1, 5),
(2, 2, 1),
(10, 2, 4),
(12, 3, 2),
(14, 3, 1);
