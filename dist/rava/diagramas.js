// All coordinates use the same viewBox so the drawings scale with the card.
function diagram(title, drawing) {
  return `<svg class="architecture" viewBox="0 0 600 326" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#463c2c"/></pattern>
      <radialGradient id="lamp"><stop stop-color="#ffd774" stop-opacity=".84"/><stop offset="1" stop-color="#f2b84b" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="600" height="326" rx="12" fill="#171613"/><rect width="600" height="326" fill="url(#grid)"/>
    ${drawing}
  </svg>`;
}
function caption(x, y, words) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="600" fill="#fff0cf">${words}</text>`;
}

export function arrivalDiagram(light, open) {
  const curtainWidth = open ? 12 : 60;
  return diagram(`Casa vista de frente. Luz da entrada ${light?'acesa':'apagada'} e cortina ${open?'aberta':'fechada'}.`, `
    <path d="M40 256h520" stroke="#ac9063" stroke-width="4"/>
    <path d="M70 124 301 47l229 77v129H70z" fill="#40372b" stroke="#ab9671" stroke-width="3"/>
    <path d="M51 128 301 42l249 86" fill="none" stroke="#d2b281" stroke-width="9" stroke-linejoin="round"/>
    <path d="M307 106v146" stroke="#a58a64" stroke-width="3"/>
    <rect x="111" y="148" width="73" height="105" rx="2" fill="#6e5140" stroke="#b49c77" stroke-width="3"/>
    <circle cx="173" cy="205" r="3" fill="#f3cc7b"/>
    <path d="M101 254h93l11 9H90z" fill="#a28a62"/>
    <rect x="205" y="142" width="16" height="25" rx="4" fill="${light?'#ffe49b':'#635b4f'}" stroke="#c1a577"/>
    ${light?'<ellipse cx="214" cy="181" rx="82" ry="77" fill="url(#lamp)"/>':''}
    <rect x="338" y="137" width="132" height="87" rx="2" fill="#92a3a3" stroke="#dac6a3" stroke-width="5"/>
    <path d="M340 207l35-24 24 15 29-28 40 31v21H340z" fill="#63746b"/>
    <path d="M404 138v84" stroke="#eadac3" stroke-width="4"/>
    <g fill="#ba8550" stroke="#dcac73" stroke-width="2"><rect x="340" y="139" width="${curtainWidth}" height="81"/><rect x="${468-curtainWidth}" y="139" width="${curtainWidth}" height="81"/></g>
    <path d="M332 133h144" stroke="#e8cd9c" stroke-width="5"/>
    ${caption(165,295,light?'Entrada acesa':'Entrada apagada')}${caption(419,295,open?'Cortina aberta':'Cortina fechada')}
  `);
}

export function securityDiagram(area, detail) {
  const garage = area === 'Garagem';
  const cameraX = garage ? 495 : 113;
  const targetX = garage ? 416 : 180;
  const spread = detail ? 35 : 88;
  return diagram(`Vista superior da frente de uma casa. Câmera voltada para ${area.toLowerCase()} com campo de visão ${detail?'estreito':'amplo'}.`, `
    <rect x="46" y="38" width="508" height="220" rx="7" fill="#343129" stroke="#c2a678" stroke-width="5"/>
    <rect x="56" y="47" width="222" height="75" fill="#635747"/>
    <path d="M57 124h220V48M298 43v205" fill="none" stroke="#b59e7b" stroke-width="5"/>
    <path d="M57 131h220v112H57z" fill="#454436"/>
    <path d="M310 49h231v196H310z" fill="#514c43"/>
    <path d="M325 62v160h194V62" stroke="#a69c81" stroke-width="2" fill="none" stroke-dasharray="7 5"/>
    <rect x="388" y="112" width="55" height="98" rx="15" fill="#b6a992" stroke="#262720" stroke-width="4"/>
    <path d="M395 135h41l-4 15h-34z M397 185h36l3 10h-42z" fill="#4c5c5b"/>
    <path d="M65 251h200" stroke="#282723" stroke-width="12"/><path d="M65 251h200" stroke="#ad9879" stroke-width="8" stroke-dasharray="4 5"/>
    <ellipse cx="180" cy="191" rx="14" ry="8" fill="#b59262"/><circle cx="180" cy="188" r="8" fill="#e5c692"/>
    <path d="M${cameraX} 86 L${targetX-spread} 233 Q${targetX} 249 ${targetX+spread} 233 Z" fill="#ffc34f" fill-opacity=".30" stroke="#ffc34f" stroke-width="2"/>
    <circle cx="${cameraX}" cy="86" r="11" fill="#222019" stroke="#f2b84b" stroke-width="4"/>
    <circle cx="${cameraX}" cy="86" r="4" fill="#ffe5ac"/>
    ${caption(166,292,'Portão')}${caption(424,292,'Garagem')}
  `);
}
