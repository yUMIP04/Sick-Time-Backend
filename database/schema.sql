CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    apellidos VARCHAR(30),
    correo VARCHAR(255) UNIQUE NOT NULL,
    edad INT,
    contrasena VARCHAR(255) NOT NULL,
    ciudad VARCHAR(20),
    pais VARCHAR(20),
    enfermedad VARCHAR(30),
    tiempo_Enfermedad VARCHAR(30),
    medicamentos VARCHAR(500)
);

CREATE TABLE lista_compras(
    id_lista SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    medicamentos VARCHAR(255),
    estado BOOLEAN DEFAULT FALSE,
    cantidad INT 
);

CREATE TABLE recordatorios_alarmas(
    id_alarma SERIAL PRIMARY KEY,
    id_listacompras INT REFERENCES lista_compras(id_lista) ON DELETE CASCADE,
    id_paciente INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    tipo_alarma VARCHAR(100),
    medicamento VARCHAR(100),
    hora TIME,
    dia DATE,
    recordar_5min BOOLEAN DEFAULT TRUE,
    vibracion BOOLEAN DEFAULT TRUE,
    cancion VARCHAR(100)
);