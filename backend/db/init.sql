CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14),
  telefone VARCHAR(20),
  endereco VARCHAR(200)
);

CREATE TABLE veiculo (
  id_veiculo SERIAL PRIMARY KEY,
  placa VARCHAR(10) NOT NULL,
  marca VARCHAR(50),
  modelo VARCHAR(50),
  ano INT,
  cor VARCHAR(30),
  id_cliente INT NOT NULL REFERENCES cliente(id_cliente)
);

CREATE TABLE manutencao (
  id_manutencao SERIAL PRIMARY KEY,
  id_veiculo INT NOT NULL REFERENCES veiculo(id_veiculo),
  data_entrada DATE NOT NULL,
  descricao VARCHAR(300),
  tipo VARCHAR(100),
  situacao VARCHAR(20) NOT NULL DEFAULT 'aguardando',
  data_entrega DATE,
  valor DECIMAL(10,2)
);

-- ==========================================
-- SEED
-- ==========================================

INSERT INTO cliente (nome, cpf, telefone, endereco) VALUES
('João Silva', '123.456.789-00', '(17) 99999-1111', 'Rua das Flores, 100'),
('Maria Oliveira', '987.654.321-00', '(17) 98888-2222', 'Avenida Brasil, 250'),
('Carlos Santos', '456.789.123-00', '(17) 97777-3333', 'Rua São Paulo, 50');

INSERT INTO veiculo (placa, marca, modelo, ano, cor, id_cliente) VALUES
('ABC1D23', 'Toyota', 'Corolla', 2020, 'Prata', 1),
('DEF4G56', 'Honda', 'Civic', 2019, 'Preto', 1),
('GHI7J89', 'Volkswagen', 'Gol', 2018, 'Branco', 2),
('JKL0M12', 'Chevrolet', 'Onix', 2022, 'Vermelho', 3);

INSERT INTO manutencao (id_veiculo, data_entrada, descricao, tipo, situacao, data_entrega, valor) VALUES
(1, '2026-09-01', 'Troca de óleo e filtro', 'Preventiva', 'concluida', '2026-09-01', 250.00),
(2, '2026-09-05', 'Problema no sistema de freios', 'Corretiva', 'em andamento', NULL, 600.00),
(3, '2026-09-08', 'Revisão geral do veículo', 'Preventiva', 'aguardando', NULL, 400.00);
