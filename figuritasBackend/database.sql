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
    direccion VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE figuritas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador VARCHAR(150) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    nro_figurita VARCHAR(20) NOT NULL UNIQUE,
    imagen_url VARCHAR(500)
);

CREATE TABLE publicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    figurita_id INT NOT NULL,
    usuario_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (figurita_id) REFERENCES figuritas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Passwords de los usuarios semilla: "1234" (texto plano, solo para desarrollo).
INSERT INTO usuarios (apellido, nombre, fecha_nacimiento, mail, direccion, password) VALUES
('Rando', 'Tomas', '2000-05-23', 'tomasrando@gmail.com', 'Av. Siempreviva 742', '1234'),
('Messi', 'Lionel', '1987-06-24', 'leo@example.com', 'Funes 123', '1234'),
('Di Maria', 'Angel', '1988-02-14', 'angel@example.com', 'Rosario 456', '1234');

INSERT INTO figuritas (jugador, pais, nro_figurita, imagen_url) VALUES
('Lionel Messi',       'Argentina',  'ARG01', 'https://placehold.co/300x400/4a90e2/ffffff/png?text=Lionel+Messi'),
('Angel Di Maria',     'Argentina',  'ARG02', 'https://placehold.co/300x400/4a90e2/ffffff/png?text=Angel+Di+Maria'),
('Emiliano Martinez',  'Argentina',  'ARG03', 'https://placehold.co/300x400/4a90e2/ffffff/png?text=Emiliano+Martinez'),
('Kylian Mbappe',      'Francia',    'FRA01', 'https://placehold.co/300x400/0055a4/ffffff/png?text=Kylian+Mbappe'),
('Antoine Griezmann',  'Francia',    'FRA02', 'https://placehold.co/300x400/0055a4/ffffff/png?text=Antoine+Griezmann'),
('Olivier Giroud',     'Francia',    'FRA03', 'https://placehold.co/300x400/0055a4/ffffff/png?text=Olivier+Giroud'),
('Neymar Jr',          'Brasil',     'BRA01', 'https://placehold.co/300x400/009c3b/ffffff/png?text=Neymar+Jr'),
('Vinicius Junior',    'Brasil',     'BRA02', 'https://placehold.co/300x400/009c3b/ffffff/png?text=Vinicius+Junior'),
('Casemiro',           'Brasil',     'BRA03', 'https://placehold.co/300x400/009c3b/ffffff/png?text=Casemiro'),
('Luka Modric',        'Croacia',    'CRO01', 'https://placehold.co/300x400/cc1f2d/ffffff/png?text=Luka+Modric'),
('Ivan Perisic',       'Croacia',    'CRO02', 'https://placehold.co/300x400/cc1f2d/ffffff/png?text=Ivan+Perisic'),
('Cristiano Ronaldo',  'Portugal',   'POR01', 'https://placehold.co/300x400/006600/ffffff/png?text=Cristiano+Ronaldo'),
('Bruno Fernandes',    'Portugal',   'POR02', 'https://placehold.co/300x400/006600/ffffff/png?text=Bruno+Fernandes'),
('Harry Kane',         'Inglaterra', 'ING01', 'https://placehold.co/300x400/cc0000/ffffff/png?text=Harry+Kane'),
('Jude Bellingham',    'Inglaterra', 'ING02', 'https://placehold.co/300x400/cc0000/ffffff/png?text=Jude+Bellingham');

INSERT INTO publicaciones (figurita_id, usuario_id, cantidad) VALUES
(1, 1, 3),
(4, 1, 2),
(7, 1, 5),
(2, 2, 1),
(10, 2, 4),
(12, 3, 2),
(14, 3, 1);
