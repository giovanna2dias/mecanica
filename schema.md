CREATE TABLE Cliente (
    Id_cliente SERIAL PRIMARY KEY,
    Nome_cliente VARCHAR(100),
    CPF_cliente VARCHAR(14),
    Telefone_Cliente VARCHAR(20),
    Endereço_cliente VARCHAR(200)
);


CREATE TABLE Veículo (
    Id_ver SERIAL PRIMARY KEY,
    Placa_vei VARCHAR(10),
    Marca_vei VARCHAR(50),
    Modelo_vei VARCHAR(50),
    Ano_vei INT,
    Cor_vei VARCHAR(30),
    Id_cliente INT REFERENCES Cliente(Id_cliente)
);


CREATE TABLE Manutenção (
    Id_manu SERIAL PRIMARY KEY,
    Data_manu DATE,
    Descri_manu VARCHAR(300),
    Tipo_manu VARCHAR(100),
    Situa_manu VARCHAR(20),
    Datentreg_manu DATE,
    Valor_manu DECIMAL(10,2),
    Id_ver INT REFERENCES Veículo(Id_ver)
);

-- ==========================================
-- INSERINDO CLIENTES
-- ==========================================

INSERT INTO Cliente (Nome_cliente, CPF_cliente, Telefone_Cliente, Endereço_cliente)
VALUES
('João Silva', '123.456.789-00', '(17) 99999-1111', 'Rua das Flores, 100'),
('Maria Oliveira', '987.654.321-00', '(17) 98888-2222', 'Avenida Brasil, 250'),
('Carlos Santos', '456.789.123-00', '(17) 97777-3333', 'Rua São Paulo, 50');


-- ==========================================
-- INSERINDO VEÍCULOSs
-- ==========================================

INSERT INTO Veículo (Placa_vei, Marca_vei, Modelo_vei, Ano_vei, Cor_vei, Id_cliente)
VALUES
('ABC1D23', 'Toyota', 'Corolla', 2020, 'Prata', 1),
('DEF4G56', 'Honda', 'Civic', 2019, 'Preto', 1),
('GHI7J89', 'Volkswagen', 'Gol', 2018, 'Branco', 2),
('JKL0M12', 'Chevrolet', 'Onix', 2022, 'Vermelho', 3);


-- ==========================================
-- INSERINDO MANUTENÇÕES
-- ==========================================

INSERT INTO Manutenção 
(Data_manu, Descri_manu, Tipo_manu, Situa_manu, Datentreg_manu, Valor_manu, Id_ver)
VALUES
('2026-09-01', 'Troca de óleo e filtro', 'Preventiva', 'concluída', '2026-09-01', 250.00, 1),

('2026-09-05', 'Problema no sistema de freios', 'Corretiva', 'em andamento', NULL, 600.00, 2),

('2026-09-08', 'Revisão geral do veículo', 'Preventiva', 'aguardando', NULL, 400.00, 3);