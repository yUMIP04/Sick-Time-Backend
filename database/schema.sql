CREATE TABLE Usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    apellidos VARCHAR(30),
    correo VARCHAR(255),
    edad INT,
    contrasena VARCHAR(255) NOT NULL,
    ciudad VARCHAR(20),
    pais VARCHAR(20),
    enfermedad VARCHAR(30),
    tiempo_Enfermedad VARCHAR(30),
    medicamentos VARCHAR(30)
);

CREATE TABLE Recordatorios_Alarmas(
    id_paciente INT NOT NULL REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    tipo_alarma VARCHAR(100),
    hora TIME,
    dia DATE,
    recordar_5min BOOLEAN,
    vibracion BOOLEAN,
    cancion VARCHAR(100)
);

CREATE TABLE Lista_Compras(
    id_lista SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    medicamentos VARCHAR(255),
    estado BOOLEAN DEFAULT 'false',
    cantidad INT 
)