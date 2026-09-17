const API = '/api';

// ---------- abas ----------
document.querySelectorAll('.aba-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.aba-btn').forEach((b) => b.classList.remove('ativo'));
    document.querySelectorAll('.aba').forEach((a) => a.classList.remove('ativo'));
    btn.classList.add('ativo');
    document.getElementById(`aba-${btn.dataset.aba}`).classList.add('ativo');
  });
});

// ---------- clientes ----------
const tabelaClientes = document.querySelector('#tabela-clientes tbody');
const selectClienteVeiculo = document.querySelector('#form-veiculo select[name="id_cliente"]');
const divVeiculosCliente = document.getElementById('veiculos-do-cliente');

async function carregarClientes() {
  const res = await fetch(`${API}/clientes`);
  const clientes = await res.json();

  tabelaClientes.innerHTML = '';
  selectClienteVeiculo.innerHTML = '<option value="">Selecione o cliente</option>';

  clientes.forEach((c) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id_cliente}</td>
      <td>${c.nome}</td>
      <td>${c.cpf ?? ''}</td>
      <td>${c.telefone ?? ''}</td>
      <td>${c.endereco ?? ''}</td>
      <td><button type="button" data-id="${c.id_cliente}" data-nome="${c.nome}" class="ver-veiculos">Ver</button></td>
    `;
    tabelaClientes.appendChild(tr);

    const opt = document.createElement('option');
    opt.value = c.id_cliente;
    opt.textContent = c.nome;
    selectClienteVeiculo.appendChild(opt);
  });
}

tabelaClientes.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('ver-veiculos')) return;
  const id = e.target.dataset.id;
  const res = await fetch(`${API}/clientes/${id}/veiculos`);
  const veiculos = await res.json();

  if (veiculos.length === 0) {
    divVeiculosCliente.innerHTML = `<p>${e.target.dataset.nome} não possui veículos cadastrados.</p>`;
    return;
  }

  const itens = veiculos
    .map((v) => `<li>${v.placa} — ${v.marca} ${v.modelo} (${v.ano}, ${v.cor})</li>`)
    .join('');
  divVeiculosCliente.innerHTML = `<p>Veículos de ${e.target.dataset.nome}:</p><ul>${itens}</ul>`;
});

document.getElementById('form-cliente').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const dados = Object.fromEntries(new FormData(form).entries());
  await fetch(`${API}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  form.reset();
  carregarClientes();
});

// ---------- veiculos ----------
const tabelaVeiculos = document.querySelector('#tabela-veiculos tbody');
const selectVeiculoManutencao = document.querySelector('#form-manutencao select[name="id_veiculo"]');

async function carregarVeiculos() {
  const res = await fetch(`${API}/veiculos`);
  const veiculos = await res.json();

  tabelaVeiculos.innerHTML = '';
  selectVeiculoManutencao.innerHTML = '<option value="">Selecione o veículo</option>';

  veiculos.forEach((v) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${v.id_veiculo}</td>
      <td>${v.placa}</td>
      <td>${v.marca ?? ''}</td>
      <td>${v.modelo ?? ''}</td>
      <td>${v.ano ?? ''}</td>
      <td>${v.cor ?? ''}</td>
      <td>${v.nome_cliente}</td>
      <td><button type="button" data-id="${v.id_veiculo}" class="ver-historico">Ver</button></td>
    `;
    tabelaVeiculos.appendChild(tr);

    const opt = document.createElement('option');
    opt.value = v.id_veiculo;
    opt.textContent = `${v.placa} — ${v.marca} ${v.modelo}`;
    selectVeiculoManutencao.appendChild(opt);
  });
}

tabelaVeiculos.addEventListener('click', (e) => {
  if (!e.target.classList.contains('ver-historico')) return;
  document.querySelector('[data-aba="manutencoes"]').click();
  selectVeiculoManutencao.value = e.target.dataset.id;
  carregarHistorico(e.target.dataset.id);
});

document.getElementById('form-veiculo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const dados = Object.fromEntries(new FormData(form).entries());
  await fetch(`${API}/veiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  form.reset();
  carregarVeiculos();
});

// ---------- manutencoes ----------
const tabelaManutencoes = document.querySelector('#tabela-manutencoes tbody');

async function carregarHistorico(idVeiculo) {
  if (!idVeiculo) {
    tabelaManutencoes.innerHTML = '';
    return;
  }
  const res = await fetch(`${API}/veiculos/${idVeiculo}/manutencoes`);
  const manutencoes = await res.json();

  tabelaManutencoes.innerHTML = '';
  manutencoes.forEach((m) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.id_manutencao}</td>
      <td>${idVeiculo}</td>
      <td>${m.data_entrada.slice(0, 10)}</td>
      <td>${m.descricao ?? ''}</td>
      <td>${m.tipo ?? ''}</td>
      <td>
        <select data-id="${m.id_manutencao}" class="situacao-select">
          <option value="aguardando" ${m.situacao === 'aguardando' ? 'selected' : ''}>Aguardando</option>
          <option value="em andamento" ${m.situacao === 'em andamento' ? 'selected' : ''}>Em andamento</option>
          <option value="concluida" ${m.situacao === 'concluida' ? 'selected' : ''}>Concluída</option>
        </select>
      </td>
      <td><input type="date" class="entrega-input" data-id="${m.id_manutencao}" value="${m.data_entrega ? m.data_entrega.slice(0, 10) : ''}" /></td>
      <td>${m.valor ?? ''}</td>
      <td><button type="button" class="salvar-manutencao" data-id="${m.id_manutencao}">Salvar</button></td>
    `;
    tabelaManutencoes.appendChild(tr);
  });
}

selectVeiculoManutencao.addEventListener('change', (e) => {
  carregarHistorico(e.target.value);
});

tabelaManutencoes.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('salvar-manutencao')) return;
  const id = e.target.dataset.id;
  const linha = e.target.closest('tr');
  const situacao = linha.querySelector('.situacao-select').value;
  const data_entrega = linha.querySelector('.entrega-input').value || null;

  await fetch(`${API}/manutencoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ situacao, data_entrega }),
  });
  carregarHistorico(selectVeiculoManutencao.value);
});

document.getElementById('form-manutencao').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const dados = Object.fromEntries(new FormData(form).entries());
  await fetch(`${API}/manutencoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  carregarHistorico(dados.id_veiculo);
  carregarVeiculos();
});

// ---------- inicial ----------
carregarClientes();
carregarVeiculos();
