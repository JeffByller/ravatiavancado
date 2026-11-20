# Refatoração da página RAVA

A página reúne oito botões. Seis abrem conversas no WhatsApp. A proposta é que cada um desses seis abra primeiro uma experiência curta dentro da página. Mapa e Instagram continuam levando aos destinos indicados. A cópia de referência está em `dist/rava/index.html`.

## O que acontece em cada botão

| Botão atual | O que o visitante faz | O que aprende e leva para a conversa |
|---|---|---|
| Solicitar orçamento | Escolhe casa ou empresa, indica se está construindo, reformando ou usando o imóvel e marca sua prioridade. | Vê um resumo editável. Uma dica explica por que a fase da obra influencia a passagem dos cabos. Pode pedir orçamento com esse resumo. |
| Automação residencial | Experimenta a cena “Cheguei em casa”. Escolhe acender a entrada, abrir a cortina ou combinar as duas ações e toca em “Testar cena”. | Uma ilustração muda com a escolha. O texto explica como um comando pode acionar vários dispositivos. O contato leva a cena escolhida. |
| Redes e Wi-Fi | Alterna o ponto de acesso entre o canto e o centro de uma planta ilustrada e observa o quarto atrás de duas paredes. | Compara a cobertura ilustrativa e entende por que posição e obstáculos importam. Pode indicar em qual cômodo sente dificuldade. |
| CFTV e segurança | Escolhe portão ou garagem e alterna entre dois enquadramentos da mesma cena. | A prévia mostra a diferença entre ver a entrada inteira e distinguir detalhes. O contato leva a área e o objetivo escolhidos. |
| Cabeamento e infraestrutura | Tenta localizar o cabo da recepção em um pequeno rack. Depois ativa as etiquetas e repete a busca. | Descobre como identificar um ponto facilita a manutenção. Pode pedir ajuda para organizar um rack existente ou planejar pontos novos. |
| Soluções para empresas | Escolhe uma operação, como loja ou escritório, e prioriza caixa, equipe ou visitantes. | Um diagrama apresenta os equipamentos envolvidos e explica, por exemplo, por que separar a rede de visitantes da operação. A conversa começa com o cenário escolhido. |

Em cada experiência, apresentar a pergunta, permitir que a pessoa teste a escolha e mostrar o resultado em uma frase. Oferecer “Ver exemplo em vídeo”, “Voltar aos serviços” e “Conversar com a RAVA sobre este projeto”. Apenas a última ação abre o WhatsApp, com o número já usado pela RAVA e uma mensagem que o visitante pode revisar. O vídeo e a conclusão do exercício são opcionais.

## Sequência de execução

1. **Prototipar Redes e Wi-Fi.** Criar uma página local do tema e reutilizar a identidade visual da cópia. Entregar a planta com duas posições selecionáveis, resposta textual equivalente à visual e retorno à lista. Usar uma situação ilustrativa, sem prometer velocidade ou alcance.
2. **Testar com clientes.** Pedir que encontrem uma possível causa para o sinal fraco e decidam se querem falar com a equipe. Observar se entendem a ilustração, se conseguem voltar e se sabem qual botão abre a conversa. Revisar o piloto antes de replicar o formato.
3. **Construir as outras cinco jornadas.** Separar os textos, as opções, a referência de vídeo e a mensagem de contato de cada tema. Usar links internos por assunto para permitir compartilhar uma experiência ou voltar a ela pelo navegador.
4. **Fazer a curadoria do YouTube.** Para o piloto, avaliar o estudo de caso residencial que aborda o planejamento de rede, Wi-Fi e câmeras. Para cabeamento e empresas, avaliar o exemplo da infraestrutura usada pela própria TI Avançado. Assistir aos vídeos, selecionar o minuto que demonstra o conceito e escrever uma pergunta de observação. Para automação, selecionar um vídeo que mostre uma cena em funcionamento. Enquanto faltar um trecho pertinente, manter a experiência autossuficiente. [Estudo de caso residencial](https://www.youtube.com/watch?v=py4qGLD3PRU) · [Rede da TI Avançado](https://www.youtube.com/watch?v=5eVDZMcrP4Y) · [Canal](https://www.youtube.com/@TIAVANCADO)
5. **Validar os seis percursos em localhost.** Em celular e por teclado, abrir cada assunto, experimentar as opções, voltar e conferir o destinatário e a mensagem preparada. Verificar que nenhum primeiro clique abre o WhatsApp, que o vídeo só carrega sob demanda e que a explicação funciona mesmo quando o YouTube está indisponível.

## Critério para decidir se a mudança funcionou

No teste do piloto, registrar quantas pessoas conseguem explicar com suas palavras o que mudou na simulação e quantas identificam como pedir ajuda sem orientação. Na fase de uso real, acompanhar por tema as aberturas, as interações e os cliques voluntários no contato. Um clique indica intenção de conversar. A confirmação de uma conversa depende do atendimento.

Página de referência: [RAVA](https://tiavancado.com.br/rava/).
