import { arrivalDiagram, securityDiagram } from './diagramas.js';
import { showVideo, setContact } from './contato.js';
const homeVideo = ['Estudo de caso residencial no YouTube', 'py4qGLD3PRU'];
const networkVideo = ['Conheça a rede da TI Avançado no YouTube', '5eVDZMcrP4Y'];
const tiles = items => '<div class="tiles">' + items.map(([name, value]) =>
  '<div class="tile"><b>' + name + '</b>' + value + '</div>').join('') + '</div>';

const themes = {
  orcamento: {
    title: 'Monte seu orçamento', intro: 'Conte um pouco sobre o imóvel para preparar o primeiro contato.',
    fields: [['Tipo de imóvel','Casa','Empresa'],['Fase do imóvel','Em construção','Em reforma','Em uso'],['Prioridade','Wi-Fi','Câmeras','Automação','Cabeamento']],
    draw([place, stage, goal]) {
      const tips = {'Em construção':'Com as paredes abertas, é mais fácil reservar caminhos para os cabos.', 'Em reforma':'A reforma permite aproveitar os trechos abertos para acrescentar pontos.', 'Em uso':'Com o imóvel ocupado, vale avaliar os caminhos existentes e combinar horários de instalação.'};
      return [tiles([['Imóvel',place],['Fase',stage],['Prioridade',goal]]),tips[stage], 'Gostaria de um orçamento. Imóvel: ' + place + '. Fase: ' + stage + '. Prioridade: ' + goal + '.'];
    }, video:homeVideo
  },
  automacao: {
    title:'Automação residencial', intro:'Monte sua cena “Cheguei em casa” e veja o que um único comando pode mudar.',
    fields:[['O que acionar na chegada?','Luz da entrada','Cortina','Luz e cortina']],
    draw([mode]) {
      const light = mode !== 'Cortina', open = mode !== 'Luz da entrada';
      return [arrivalDiagram(light, open), mode === 'Luz e cortina' ? 'A mesma cena acende a entrada e abre a cortina. Os dois dispositivos respondem ao mesmo comando.' : 'A cena aciona apenas o dispositivo escolhido. Experimente combinar luz e cortina.', 'Quero uma cena de chegada com esta opção: ' + mode + '.'];
    }, video:['Iluminação e cortinas em uma casa inteligente','sCRxNKpvuzA']
  },
  cftv: {
    title:'CFTV e segurança', intro:'O que você precisa enxergar? Escolha a área e compare dois enquadramentos ilustrativos.',
    fields:[['Área','Portão','Garagem'],['Enquadramento','Visão geral','Detalhe']],
    draw([area, framing]) {
      const close = framing === 'Detalhe';
      return [securityDiagram(area, close), (close ? 'O recorte destaca ' + (area==='Portão'?'a pessoa':'o veículo') + ' e reduz o entorno visível.' : 'A visão aberta mostra a movimentação e o entorno, com menos detalhe em cada objeto.'), 'Tenho interesse em câmeras. Área: '+area+'. Objetivo: '+framing+'.'];
    }, video:['Redes e câmeras IP na prática','SloqMWFqVhg']
  },
  cabeamento: {
    title:'Cabeamento e infraestrutura', intro:'Qual porta atende à recepção? Toque em uma porta do rack e depois experimente revelar as etiquetas.',
    fields:[['Etiquetas','Ocultas','Visíveis'],['Seu projeto','Organizar rack','Planejar pontos novos']],
    draw([labels, goal]) {
      const names = ['Caixa','Sala','Recepção','Wi-Fi'];
      return ['<div class="ports">'+names.map((name,i)=>'<button type="button" class="port" data-port="'+i+'">'+(i+1)+(labels==='Visíveis'?' · '+name:'')+'</button>').join('')+'</div>',labels==='Visíveis'?'As etiquetas associam cada porta a um destino. Teste a porta que atende à recepção.':'Sem identificação, portas iguais escondem destinos diferentes. Escolha uma para conferir.', 'Gostaria de ajuda com cabeamento. Meu objetivo é: '+goal+'.'];
    }, video:networkVideo
  },
  empresas: {
    title:'Soluções para empresas',intro:'Escolha sua operação e descubra como organizar os equipamentos de cada grupo.',
    fields:[['Operação','Loja','Escritório'],['Quem precisa de conexão?','Operação','Equipe','Visitantes']],
    draw([place, group]) {
      const device = group==='Visitantes'?'Celular do cliente':group==='Equipe'?'Notebook da equipe':place==='Loja'?'Terminal do caixa':'Estação de trabalho';
      const lesson = group==='Visitantes'?'Uma rede de convidados pode dar acesso à internet e manter os sistemas internos isolados.':group==='Equipe'?'Uma rede de equipe permite definir quais recursos internos cada pessoa pode acessar.':'Planejar a conexão dos equipamentos essenciais ajuda a identificar onde uma falha interromperia o atendimento.';
      return [tiles([['Ambiente',place],['Dispositivo',device],['Rede',group]]),lesson,'Quero planejar a rede de '+place.toLowerCase()+' para '+group.toLowerCase()+'.'];
    },video:networkVideo
  }
};

const find = id => document.getElementById(id);
const key = new URLSearchParams(location.search).get('tema');
const theme = Object.hasOwn(themes,key) ? themes[key] : null;
if (key === 'wifi') {
  import('./wifi.js');
} else if (!theme) {
  location.replace('./');
} else {
  document.title = theme.title + ' | RAVA';
  document.querySelector('h1').textContent = theme.title;
  find('intro').textContent = theme.intro;
  const choices = find('choices');
  theme.fields.forEach(([label,...items],index) => {
    const field = document.createElement('fieldset');
    field.innerHTML = '<legend>'+label+'</legend><div class="options">'+items.map((item,i) =>
      '<label><input type="radio" name="choice'+index+'" value="'+item+'" '+(i===0?'checked':'')+'> '+item+'</label>').join('')+'</div>';
    choices.append(field);
  });
  function refresh() {
    const selected = Array.from(choices.querySelectorAll(':checked'),input => input.value);
    const [scene,result,summary] = theme.draw(selected);
    find('scene').innerHTML = scene;
    find('result').textContent = result;
    setContact(summary);
  }
  find('scene').addEventListener('click',event => {
    const port = event.target.closest('[data-port]');
    if (port) find('result').textContent = port.dataset.port==='2'?'Encontrou! A porta 3 atende à recepção. Com cada ponto identificado, a próxima manutenção fica mais simples.':'Esse ponto atende a outro ambiente. Experimente outra porta ou revele as etiquetas.';
  });
  choices.addEventListener('change',refresh);
  showVideo(...theme.video);
  refresh();
}
