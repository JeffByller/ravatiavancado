import { drawHouse } from './planta.js';

const sheet = document.createElement('link');
sheet.rel = 'stylesheet';
sheet.href = 'wifi.css';
document.head.append(sheet);
document.body.className = 'wifi';
document.title = 'Casa interativa · Redes e Wi-Fi | RAVA';
const main = document.querySelector('main');
main.innerHTML = `
<header><a class="brand" href="./">RAVA<span>Automação e Tecnologia</span></a><a href="./">‹ Serviços</a></header>
<section class="hero"><p class="eyebrow">Redes e Wi-Fi</p><h1>Por onde anda o seu <em>Wi-Fi?</em></h1><p>Toque em um cômodo e leve o roteador para outro lugar. Veja como o sinal muda dentro da casa.</p></section>
<div class="workshop"><section class="mapPanel"><div class="mapTitle"><h2>Explore a casa</h2><span>Planta interativa</span></div>
<div class="plan"><canvas aria-hidden="true" width="760" height="560"></canvas><div class="router" aria-hidden="true"><i></i>⌁</div></div>
<div class="legend"><span><i></i> Roteador</span><span><b></b> Cômodo escolhido</span></div></section>
<section class="control"><h2>Onde fica o roteador?</h2><fieldset><legend class="sr">Posição do roteador</legend><div class="switch"></div></fieldset>
<div class="reading" aria-live="polite"><span class="eyebrow" id="room"></span><div class="meter" aria-hidden="true"><i></i><i></i><i></i></div><h3 id="signal"></h3><p id="story"></p></div>
<small>Simulação ilustrativa. Na sua casa, os materiais das paredes também influenciam o alcance.</small></section></div>
<section class="follow"><div><h2>Como é na sua casa?</h2><p>Leve o cômodo escolhido para a conversa com a RAVA.</p></div><div><details><summary>Revisar mensagem</summary><label for="message">Mensagem para a equipe</label><textarea id="message" rows="3"></textarea></details><a class="cta" id="contact" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div></section>
<a class="film" href="https://www.youtube.com/watch?v=py4qGLD3PRU" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span> Veja um projeto residencial no YouTube · TI Avançado</a>`;

const rooms = [
  {name:'Sala', x:27,y:42,activity:['O filme pode parar para carregar.', 'O filme roda, mas pode pausar de vez em quando.', 'Prepare a pipoca. O filme tem sinal para rodar com folga.']},
  {name:'Quarto', x:74,y:41,activity:['O vídeo na cama pode parar para carregar.','O vídeo chega ao quarto, com possíveis pausas.', 'O vídeo chega ao quarto com boa cobertura.']},
  {name:'Cozinha', x:27,y:79,activity:['A música pode cortar enquanto você cozinha.','A playlist toca, com possíveis interrupções.', 'A playlist acompanha o preparo do jantar.']},
  {name:'Escritório', x:74,y:79,activity:['A imagem da chamada pode congelar.', 'A chamada funciona, mas a imagem pode oscilar.', 'A chamada tem sinal para seguir com a imagem estável.']}
];
const positions = [
  {name:'Na entrada',x:10,y:52,levels:[3,1,2,1]},
  {name:'No centro',x:49,y:53,levels:[3,2,3,2]},
  {name:'No quarto',x:83,y:29,levels:[2,3,1,2]}
];
let room = 1, position = 0;
const get = id => document.getElementById(id);
const plan = main.querySelector('.plan');
const canvas = plan.querySelector('canvas');
const controls = main.querySelector('.switch');
const labels = ['Sinal fraco','Sinal razoável','Sinal forte'];
rooms.forEach((item,index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = item.name;
  button.style.left = item.x + '%';
  button.style.top = item.y + '%';
  button.onclick = () => {room=index; render();};
  plan.append(button);
});
positions.forEach((item,index) => {
  const label = document.createElement('label');
  label.innerHTML = '<input type="radio" name="router" '+(index===0?'checked':'')+'><span>'+item.name+'</span>';
  label.onchange = () => {position=index; render();};
  controls.append(label);
});
function contact() {get('contact').href='https://wa.me/5583988984828?text='+encodeURIComponent(get('message').value);}
function render() {
  const selected = rooms[room], source = positions[position], level = source.levels[room];
  drawHouse(canvas, source, room);
  const router = plan.querySelector('.router');
  router.style.left=source.x+'%'; router.style.top=source.y+'%';
  plan.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===room)));
  get('room').textContent=selected.name;
  get('signal').textContent=labels[level-1];
  get('story').textContent=selected.activity[level-1]+' '+(position===0 && room===1?'Da entrada até aqui, o sinal atravessa a casa. Experimente colocar o roteador no centro.':position===2 && room===1?'O roteador está no mesmo cômodo.':'Compare com outra posição do roteador.');
  main.querySelectorAll('.meter i').forEach((bar,i)=>bar.classList.toggle('on',i<level));
  get('message').value='Olá, RAVA! Quero melhorar o Wi-Fi neste ambiente: '+selected.name+'. Na simulação, testei o roteador '+source.name.toLowerCase()+'.';
  contact();
}
get('message').oninput=contact;
render();
