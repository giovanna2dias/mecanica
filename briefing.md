Briefing: Sistema de Oficina Mecânica
Uma oficina mecânica registra seus clientes, veículos e serviços realizados utilizando fichas de papel. Essa forma de organização dificulta descobrir quem é o proprietário de cada veículo e consultar o histórico de manutenções realizadas.
O proprietário deseja desenvolver um sistema para organizar essas informações.
Necessidades do cliente
O sistema deverá permitir:
· Cadastrar clientes, informando nome, CPF, telefone e endereço.
· Cadastrar veículos, informando placa, marca, modelo, ano e cor.
· Identificar o cliente proprietário de cada veículo.
· Registrar manutenções, informando data de entrada, descrição do problema, tipo de serviço, situação e valor.
· Registrar a data de entrega quando a manutenção for concluída.
· Consultar os veículos de cada cliente.
· Consultar o histórico de manutenções de cada veículo.
Regras de negócio
1. Um cliente pode ser cadastrado mesmo sem possuir um veículo registrado.
2. Um cliente pode possuir vários veículos.
3. Cada veículo deve pertencer a apenas um cliente.
4. Um veículo pode ser cadastrado antes de possuir uma manutenção registrada.
5. Um veículo pode passar por várias manutenções ao longo do tempo.
6. Cada manutenção deve estar vinculada a apenas um veículo.
7. A situação da manutenção pode ser: aguardando, em andamento ou concluída.
8. A data de entrega ficará sem preenchimento enquanto a manutenção não estiver concluída.
9. Para esta avaliação, não será necessário controlar mecânicos, peças, pagamentos ou trocas de proprietário.