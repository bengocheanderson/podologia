const SERVICOS = [
  ['Unha encravada', 'Alívio da dor e da inflamação, com cuidado para evitar que volte.'],
  ['Calos e calosidades', 'Remoção segura e orientação para reduzir o atrito que os causa.'],
  ['Fungos e micoses', 'Avaliação das unhas e da pele e cuidados para tratar com acompanhamento.'],
  ['Rachaduras e pés ressecados', 'Esfoliação e hidratação profunda para recuperar o conforto.'],
  ['Verrugas plantares', 'Identificação e orientação do melhor caminho de tratamento.'],
  ['Cuidado preventivo e manutenção', 'Corte correto das unhas, higiene e rotina de cuidados para o dia a dia.']
];
const DEPOS = [
  ['Clair Albertina Rosa', 'Esse é o meu segundo encontro, fiquei encantada com o atendimento, o carinho e o profissionalismo! Saí renovada, parabéns e sem sombra de dúvidas voltarei! Obrigada, nota dez!'],
  ['Jean Lazarotto', 'Profissional exemplar, atendimento impecável. Procura entender todo o caso e tratar não só de forma local, mas também entende a realidade de cada paciente para tratar da melhor forma. Recomendo sempre.'],
  ['Túlio Souza de Freitas', 'Excelente atendimento. A Simone, entre uma atividade e outra, vai descontraindo o ambiente e deixando o paciente mais tranquilo. Primeira consulta já saí muito aliviado. Agora é dar sequência no tratamento. Recomendo!']
];
const FAQ = [
  ['Como funciona a primeira consulta?', 'A Simone conversa com você, avalia seus pés e explica o que pode ser feito. Só depois seguem os procedimentos.'],
  ['Dói fazer o tratamento?', 'O objetivo é aliviar. A Simone trabalha com calma e conversa durante a consulta para que você fique à vontade.'],
  ['Preciso levar algo?', 'Venha com calçados confortáveis. Se tiver exames, laudos ou uma lista de medicamentos, leve também.'],
  ['Como confirmo meu horário?', 'Envie o pedido pelo formulário acima ou chame no WhatsApp (51) 99898-3084. A confirmação é feita por lá.']
];

// Serviços
document.getElementById('servGrid').innerHTML = SERVICOS.map(([t, d], i) => `
  <article class="card ${i % 2 ? 'alt' : ''}">
    <svg width="28" height="32" viewBox="0 0 60 68" aria-hidden="true"><use href="#pe"/></svg>
    <h3>${t}</h3><p>${d}</p>
    <a href="#agendar" data-servico="${t}">Agendar este cuidado</a>
  </article>`).join('');
const sel = document.getElementById('servico');
sel.innerHTML = SERVICOS.map(s => `<option>${s[0]}</option>`).join('') + '<option>Outro / não sei ao certo</option>';
document.querySelectorAll('[data-servico]').forEach(a => a.addEventListener('click', () => { sel.value = a.dataset.servico; }));

// Depoimentos
let di = 0, timer;
const dots = document.getElementById('dots');
dots.innerHTML = DEPOS.map((_, i) => `<button aria-label="Depoimento ${i + 1}" data-i="${i}"></button>`).join('');
function showDepo(i) {
  di = (i + DEPOS.length) % DEPOS.length;
  const [n, t] = DEPOS[di];
  document.getElementById('depoTxt').textContent = '“' + t + '”';
  document.getElementById('depoNome').textContent = n;
  document.getElementById('depoIni').textContent = n[0];
  [...dots.children].forEach((d, k) => d.classList.toggle('on', k === di));
}
function auto() { clearInterval(timer); timer = setInterval(() => showDepo(di + 1), 8000); }
document.getElementById('prev').onclick = () => { showDepo(di - 1); auto(); };
document.getElementById('next').onclick = () => { showDepo(di + 1); auto(); };
dots.onclick = e => { if (e.target.dataset.i) { showDepo(+e.target.dataset.i); auto(); } };
showDepo(0); auto();

// FAQ
const faq = document.getElementById('faq');
faq.innerHTML = FAQ.map(([q, a], i) => `
  <div class="faq-item">
    <h3><button aria-expanded="false" aria-controls="f${i}">${q}
      <svg class="chev" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#D6307A" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7l6 6 6-6"/></svg></button></h3>
    <div id="f${i}" class="faq-corpo"><div><p>${a}</p></div></div>
  </div>`).join('');
faq.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  b.setAttribute('aria-expanded', b.closest('.faq-item').classList.toggle('aberto'));
});

// Menu mobile
const mBtn = document.getElementById('menuBtn'), mNav = document.getElementById('menuMob');
mBtn.onclick = () => mBtn.setAttribute('aria-expanded', mNav.classList.toggle('aberto'));
mNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mNav.classList.remove('aberto'); mBtn.setAttribute('aria-expanded', 'false'); }));

// Formulário → WhatsApp
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome'), err = nome.parentElement.querySelector('.erro');
  if (!nome.value.trim()) { err.classList.add('on'); nome.focus(); return; }
  err.classList.remove('on');
  const obs = document.getElementById('obs').value.trim();
  const msg = `Olá, Simone! Me chamo ${nome.value.trim()} e gostaria de agendar uma consulta.\n` +
    `Interesse: ${sel.value}\nMelhor período: ${document.getElementById('periodo').value}` + (obs ? `\nObservação: ${obs}` : '');
  window.open('https://wa.me/5551998983084?text=' + encodeURIComponent(msg), '_blank', 'noopener');
});

// Botão fixo
const fab = document.getElementById('fab');
addEventListener('scroll', () => fab.classList.toggle('on', scrollY > 600), { passive: true });

document.getElementById('ano').textContent = new Date().getFullYear();
