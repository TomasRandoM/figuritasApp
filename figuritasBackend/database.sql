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
    latitud DOUBLE,
    longitud DOUBLE,
    maps_link VARCHAR(500),
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
INSERT INTO usuarios (apellido, nombre, fecha_nacimiento, mail, direccion, latitud, longitud, maps_link, password) VALUES
('Rando',    'Tomas',   '2000-05-23', 'tomasrando@gmail.com', 'Av. Siempreviva 742', -34.603722, -58.381592, 'https://maps.google.com/?q=-34.603722,-58.381592', '1234'),
('Messi',    'Lionel',  '1987-06-24', 'leo@example.com',      'Funes 123',           -32.946820, -60.639317, 'https://maps.google.com/?q=-32.946820,-60.639317', '1234'),
('Di Maria', 'Angel',   '1988-02-14', 'angel@example.com',    'Rosario 456',         -32.957851, -60.660259, 'https://maps.google.com/?q=-32.957851,-60.660259', '1234');

INSERT INTO figuritas (jugador, pais, nro_figurita, imagen_url) VALUES
-- Argentina
('Lionel Messi',         'Argentina',     '001', 'https://flagcdn.com/w320/ar.png'),
('Angel Di Maria',       'Argentina',     '002', 'https://flagcdn.com/w320/ar.png'),
('Emiliano Martinez',    'Argentina',     '003', 'https://flagcdn.com/w320/ar.png'),
('Lautaro Martinez',     'Argentina',     '004', 'https://flagcdn.com/w320/ar.png'),
('Julian Alvarez',       'Argentina',     '005', 'https://flagcdn.com/w320/ar.png'),
('Rodrigo De Paul',      'Argentina',     '006', 'https://flagcdn.com/w320/ar.png'),
('Enzo Fernandez',       'Argentina',     '007', 'https://flagcdn.com/w320/ar.png'),
('Alexis Mac Allister',  'Argentina',     '008', 'https://flagcdn.com/w320/ar.png'),
('Cristian Romero',      'Argentina',     '009', 'https://flagcdn.com/w320/ar.png'),
('Nicolas Otamendi',     'Argentina',     '010', 'https://flagcdn.com/w320/ar.png'),
('Nahuel Molina',        'Argentina',     '011', 'https://flagcdn.com/w320/ar.png'),
('Marcos Acuna',         'Argentina',     '012', 'https://flagcdn.com/w320/ar.png'),
-- Francia
('Kylian Mbappe',        'Francia',       '013', 'https://flagcdn.com/w320/fr.png'),
('Antoine Griezmann',    'Francia',       '014', 'https://flagcdn.com/w320/fr.png'),
('Olivier Giroud',       'Francia',       '015', 'https://flagcdn.com/w320/fr.png'),
('Aurelien Tchouameni',  'Francia',       '016', 'https://flagcdn.com/w320/fr.png'),
('Eduardo Camavinga',    'Francia',       '017', 'https://flagcdn.com/w320/fr.png'),
('Ousmane Dembele',      'Francia',       '018', 'https://flagcdn.com/w320/fr.png'),
('N''Golo Kante',        'Francia',       '019', 'https://flagcdn.com/w320/fr.png'),
('Theo Hernandez',       'Francia',       '020', 'https://flagcdn.com/w320/fr.png'),
('Raphael Varane',       'Francia',       '021', 'https://flagcdn.com/w320/fr.png'),
('Hugo Lloris',          'Francia',       '022', 'https://flagcdn.com/w320/fr.png'),
('Adrien Rabiot',        'Francia',       '023', 'https://flagcdn.com/w320/fr.png'),
('Jules Kounde',         'Francia',       '024', 'https://flagcdn.com/w320/fr.png'),
-- Brasil
('Neymar Jr',            'Brasil',        '025', 'https://flagcdn.com/w320/br.png'),
('Vinicius Junior',      'Brasil',        '026', 'https://flagcdn.com/w320/br.png'),
('Casemiro',             'Brasil',        '027', 'https://flagcdn.com/w320/br.png'),
('Rodrygo',              'Brasil',        '028', 'https://flagcdn.com/w320/br.png'),
('Raphinha',             'Brasil',        '029', 'https://flagcdn.com/w320/br.png'),
('Richarlison',          'Brasil',        '030', 'https://flagcdn.com/w320/br.png'),
('Marquinhos',           'Brasil',        '031', 'https://flagcdn.com/w320/br.png'),
('Thiago Silva',         'Brasil',        '032', 'https://flagcdn.com/w320/br.png'),
('Alisson Becker',       'Brasil',        '033', 'https://flagcdn.com/w320/br.png'),
('Ederson',              'Brasil',        '034', 'https://flagcdn.com/w320/br.png'),
('Lucas Paqueta',        'Brasil',        '035', 'https://flagcdn.com/w320/br.png'),
('Bruno Guimaraes',      'Brasil',        '036', 'https://flagcdn.com/w320/br.png'),
-- Croacia
('Luka Modric',          'Croacia',       '037', 'https://flagcdn.com/w320/hr.png'),
('Ivan Perisic',         'Croacia',       '038', 'https://flagcdn.com/w320/hr.png'),
('Marcelo Brozovic',     'Croacia',       '039', 'https://flagcdn.com/w320/hr.png'),
('Mateo Kovacic',        'Croacia',       '040', 'https://flagcdn.com/w320/hr.png'),
('Andrej Kramaric',      'Croacia',       '041', 'https://flagcdn.com/w320/hr.png'),
('Josko Gvardiol',       'Croacia',       '042', 'https://flagcdn.com/w320/hr.png'),
('Dominik Livakovic',    'Croacia',       '043', 'https://flagcdn.com/w320/hr.png'),
('Dejan Lovren',         'Croacia',       '044', 'https://flagcdn.com/w320/hr.png'),
('Bruno Petkovic',       'Croacia',       '045', 'https://flagcdn.com/w320/hr.png'),
('Mario Pasalic',        'Croacia',       '046', 'https://flagcdn.com/w320/hr.png'),
-- Portugal
('Cristiano Ronaldo',    'Portugal',      '047', 'https://flagcdn.com/w320/pt.png'),
('Bruno Fernandes',      'Portugal',      '048', 'https://flagcdn.com/w320/pt.png'),
('Bernardo Silva',       'Portugal',      '049', 'https://flagcdn.com/w320/pt.png'),
('Joao Felix',           'Portugal',      '050', 'https://flagcdn.com/w320/pt.png'),
('Ruben Dias',           'Portugal',      '051', 'https://flagcdn.com/w320/pt.png'),
('Pepe',                 'Portugal',      '052', 'https://flagcdn.com/w320/pt.png'),
('Diogo Jota',           'Portugal',      '053', 'https://flagcdn.com/w320/pt.png'),
('Joao Cancelo',         'Portugal',      '054', 'https://flagcdn.com/w320/pt.png'),
('Rafael Leao',          'Portugal',      '055', 'https://flagcdn.com/w320/pt.png'),
('Vitinha',              'Portugal',      '056', 'https://flagcdn.com/w320/pt.png'),
-- Inglaterra
('Harry Kane',           'Inglaterra',    '057', 'https://flagcdn.com/w320/gb-eng.png'),
('Jude Bellingham',      'Inglaterra',    '058', 'https://flagcdn.com/w320/gb-eng.png'),
('Phil Foden',           'Inglaterra',    '059', 'https://flagcdn.com/w320/gb-eng.png'),
('Bukayo Saka',          'Inglaterra',    '060', 'https://flagcdn.com/w320/gb-eng.png'),
('Declan Rice',          'Inglaterra',    '061', 'https://flagcdn.com/w320/gb-eng.png'),
('Marcus Rashford',      'Inglaterra',    '062', 'https://flagcdn.com/w320/gb-eng.png'),
('Jordan Pickford',      'Inglaterra',    '063', 'https://flagcdn.com/w320/gb-eng.png'),
('Kyle Walker',          'Inglaterra',    '064', 'https://flagcdn.com/w320/gb-eng.png'),
('John Stones',          'Inglaterra',    '065', 'https://flagcdn.com/w320/gb-eng.png'),
('Trent Alexander-Arnold','Inglaterra',   '066', 'https://flagcdn.com/w320/gb-eng.png'),
-- España
('Rodri',                'España',        '067', 'https://flagcdn.com/w320/es.png'),
('Pedri',                'España',        '068', 'https://flagcdn.com/w320/es.png'),
('Gavi',                 'España',        '069', 'https://flagcdn.com/w320/es.png'),
('Alvaro Morata',        'España',        '070', 'https://flagcdn.com/w320/es.png'),
('Lamine Yamal',         'España',        '071', 'https://flagcdn.com/w320/es.png'),
('Nico Williams',        'España',        '072', 'https://flagcdn.com/w320/es.png'),
('Dani Olmo',            'España',        '073', 'https://flagcdn.com/w320/es.png'),
('Fabian Ruiz',          'España',        '074', 'https://flagcdn.com/w320/es.png'),
('Aymeric Laporte',      'España',        '075', 'https://flagcdn.com/w320/es.png'),
('Unai Simon',           'España',        '076', 'https://flagcdn.com/w320/es.png'),
-- Alemania
('Toni Kroos',           'Alemania',      '077', 'https://flagcdn.com/w320/de.png'),
('Joshua Kimmich',       'Alemania',      '078', 'https://flagcdn.com/w320/de.png'),
('Ilkay Gundogan',       'Alemania',      '079', 'https://flagcdn.com/w320/de.png'),
('Jamal Musiala',        'Alemania',      '080', 'https://flagcdn.com/w320/de.png'),
('Florian Wirtz',        'Alemania',      '081', 'https://flagcdn.com/w320/de.png'),
('Kai Havertz',          'Alemania',      '082', 'https://flagcdn.com/w320/de.png'),
('Leroy Sane',           'Alemania',      '083', 'https://flagcdn.com/w320/de.png'),
('Niclas Fullkrug',      'Alemania',      '084', 'https://flagcdn.com/w320/de.png'),
('Manuel Neuer',         'Alemania',      '085', 'https://flagcdn.com/w320/de.png'),
('Antonio Rudiger',      'Alemania',      '086', 'https://flagcdn.com/w320/de.png'),
-- Países Bajos
('Virgil van Dijk',      'Países Bajos',  '087', 'https://flagcdn.com/w320/nl.png'),
('Frenkie de Jong',      'Países Bajos',  '088', 'https://flagcdn.com/w320/nl.png'),
('Memphis Depay',        'Países Bajos',  '089', 'https://flagcdn.com/w320/nl.png'),
('Cody Gakpo',           'Países Bajos',  '090', 'https://flagcdn.com/w320/nl.png'),
('Denzel Dumfries',      'Países Bajos',  '091', 'https://flagcdn.com/w320/nl.png'),
('Matthijs de Ligt',     'Países Bajos',  '092', 'https://flagcdn.com/w320/nl.png'),
('Steven Bergwijn',      'Países Bajos',  '093', 'https://flagcdn.com/w320/nl.png'),
('Nathan Ake',           'Países Bajos',  '094', 'https://flagcdn.com/w320/nl.png'),
('Tijjani Reijnders',    'Países Bajos',  '095', 'https://flagcdn.com/w320/nl.png'),
('Xavi Simons',          'Países Bajos',  '096', 'https://flagcdn.com/w320/nl.png'),
-- Bélgica
('Kevin De Bruyne',      'Bélgica',       '097', 'https://flagcdn.com/w320/be.png'),
('Romelu Lukaku',        'Bélgica',       '098', 'https://flagcdn.com/w320/be.png'),
('Thibaut Courtois',     'Bélgica',       '099', 'https://flagcdn.com/w320/be.png'),
('Eden Hazard',          'Bélgica',       '100', 'https://flagcdn.com/w320/be.png'),
('Thomas Meunier',       'Bélgica',       '101', 'https://flagcdn.com/w320/be.png'),
('Jeremy Doku',          'Bélgica',       '102', 'https://flagcdn.com/w320/be.png'),
('Youri Tielemans',      'Bélgica',       '103', 'https://flagcdn.com/w320/be.png'),
('Axel Witsel',          'Bélgica',       '104', 'https://flagcdn.com/w320/be.png'),
('Jan Vertonghen',       'Bélgica',       '105', 'https://flagcdn.com/w320/be.png'),
('Leandro Trossard',     'Bélgica',       '106', 'https://flagcdn.com/w320/be.png'),
-- Italia
('Federico Chiesa',      'Italia',        '107', 'https://flagcdn.com/w320/it.png'),
('Nicolo Barella',       'Italia',        '108', 'https://flagcdn.com/w320/it.png'),
('Gianluigi Donnarumma', 'Italia',        '109', 'https://flagcdn.com/w320/it.png'),
('Lorenzo Insigne',      'Italia',        '110', 'https://flagcdn.com/w320/it.png'),
('Ciro Immobile',        'Italia',        '111', 'https://flagcdn.com/w320/it.png'),
('Marco Verratti',       'Italia',        '112', 'https://flagcdn.com/w320/it.png'),
('Leonardo Bonucci',     'Italia',        '113', 'https://flagcdn.com/w320/it.png'),
('Giorgio Chiellini',    'Italia',        '114', 'https://flagcdn.com/w320/it.png'),
('Mateo Retegui',        'Italia',        '115', 'https://flagcdn.com/w320/it.png'),
('Davide Frattesi',      'Italia',        '116', 'https://flagcdn.com/w320/it.png'),
-- Uruguay
('Federico Valverde',    'Uruguay',       '117', 'https://flagcdn.com/w320/uy.png'),
('Darwin Nunez',         'Uruguay',       '118', 'https://flagcdn.com/w320/uy.png'),
('Edinson Cavani',       'Uruguay',       '119', 'https://flagcdn.com/w320/uy.png'),
('Luis Suarez',          'Uruguay',       '120', 'https://flagcdn.com/w320/uy.png'),
('Ronald Araujo',        'Uruguay',       '121', 'https://flagcdn.com/w320/uy.png'),
('Diego Godin',          'Uruguay',       '122', 'https://flagcdn.com/w320/uy.png'),
('Rodrigo Bentancur',    'Uruguay',       '123', 'https://flagcdn.com/w320/uy.png'),
('Jose Maria Gimenez',   'Uruguay',       '124', 'https://flagcdn.com/w320/uy.png'),
('Sergio Rochet',        'Uruguay',       '125', 'https://flagcdn.com/w320/uy.png'),
('Maxi Gomez',           'Uruguay',       '126', 'https://flagcdn.com/w320/uy.png');

-- IDs por país: Argentina 1-12, Francia 13-24, Brasil 25-36, Croacia 37-46,
-- Portugal 47-56, Inglaterra 57-66, España 67-76, Alemania 77-86,
-- Países Bajos 87-96, Bélgica 97-106, Italia 107-116, Uruguay 117-126.
INSERT INTO publicaciones (figurita_id, usuario_id, cantidad) VALUES
(1,   1, 3),
(4,   1, 2),
(13,  1, 5),
(57,  1, 3),
(87,  1, 1),
(117, 1, 2),
(7,   2, 1),
(25,  2, 4),
(67,  2, 2),
(97,  2, 2),
(31,  2, 3),
(37,  3, 2),
(47,  3, 1),
(77,  3, 4),
(107, 3, 3),
(70,  3, 1);
