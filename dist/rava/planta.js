// Floor plan in design coordinates. The HTML controls use the same proportions.
export function drawHouse(canvas, source, room) {
  const ctx = canvas.getContext('2d');
  const w = 760, h = 560;
  const rect = (x,y,width,height,color) => {ctx.fillStyle=color;ctx.fillRect(x,y,width,height);};
  function furnishing(x,y,width,height,color,radius=5) {
    ctx.beginPath();ctx.roundRect(x,y,width,height,radius);
    ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#70604c';ctx.lineWidth=2;ctx.stroke();
  }
  function line(x,y,a,b,color,width=2) {
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(a,b);ctx.lineWidth=width;ctx.strokeStyle=color;ctx.stroke();
  }
  function plant(x,y) {
    for(let i=0;i<7;i++){
      ctx.save();ctx.translate(x,y);ctx.rotate(i*.9);
      ctx.beginPath();ctx.ellipse(0,-10,5,14,0,0,Math.PI*2);
      ctx.fillStyle=i%2?'#527957':'#73936c';ctx.fill();ctx.restore();
    }
  }
  ctx.clearRect(0,0,w,h);
  rect(40,32,680,496,'#d8c6a7');
  for(let y=34;y<526;y+=15){
    line(40,y,719,y,'#c7b696',1);
    for(let x=55+(y%4)*36;x<715;x+=110)line(x,y,x,y+15,'#c7b696',1);
  }
  rect(44,308,327,215,'#d2cec0');
  for(let x=44;x<370;x+=26)line(x,308,x,523,'#b8b5a9',1);
  for(let y=308;y<525;y+=26)line(44,y,371,y,'#b8b5a9',1);
  const bounds=[[45,37,326,261],[382,37,332,261],[45,308,326,215],[382,308,332,215]];
  const [x,y,bw,bh]=bounds[room];
  rect(x,y,bw,bh,'rgba(243,181,78,.19)');
  // Living room: woven rug, sectional sofa and coffee table.
  furnishing(105,83,203,116,'#c59d75',12);
  for(let y=91;y<193;y+=7)line(112,y,300,y,'#cfad88',1);
  furnishing(69,52,192,52,'#809589');
  for(let x=78;x<244;x+=57)furnishing(x,58,53,37,'#a6b4a1');
  furnishing(62,54,15,82,'#859a88');furnishing(75,107,51,43,'#a6b4a1');
  furnishing(169,130,79,38,'#ae8057',15);plant(207,150);plant(338,68);
  // Bedroom: bed, pillows, nightstands and wardrobe.
  furnishing(477,51,128,142,'#966e55');
  furnishing(481,58,120,126,'#eee5d1');furnishing(482,104,118,81,'#92a8a6');
  furnishing(486,65,48,26,'#fff5df');furnishing(550,65,48,26,'#fff5df');
  furnishing(440,56,27,33,'#bd9470');furnishing(616,56,27,33,'#bd9470');
  furnishing(673,53,29,117,'#b89771');plant(677,250);
  // Kitchen counters, burners, sink and island.
  furnishing(55,321,264,42,'#a5937c');furnishing(55,355,42,149,'#b5a691');
  furnishing(143,325,46,30,'#6e7b78');furnishing(148,329,36,22,'#c0c6bc');
  furnishing(223,324,47,30,'#454946');
  for(const x of [234,258])for(const y of [332,346])furnishing(x-5,y-5,10,10,'#757975',5);
  furnishing(156,382,104,32,'#b68d66');plant(281,486);
  // Office: desk, screen, keyboard, chair and bookcase.
  furnishing(475,323,163,49,'#ad8764');furnishing(523,325,65,13,'#414e4b');
  furnishing(530,346,50,12,'#e1d9c9');furnishing(534,380,43,31,'#72847a',10);
  furnishing(664,332,36,120,'#b18e6a');
  for(let y=342;y<440;y+=11)rect(669,y,24,6,y%2?'#83948a':'#d3c0a2');
  plant(440,482);
  // A soft coverage gradient and concentric contours follow the router.
  const rx=source.x*w/100,ry=source.y*h/100;
  ctx.save();ctx.beginPath();ctx.rect(42,35,675,490);ctx.clip();
  const glow=ctx.createRadialGradient(rx,ry,0,rx,ry,270);
  glow.addColorStop(0,'rgba(224,154,40,.32)');glow.addColorStop(1,'rgba(224,154,40,0)');
  rect(40,32,680,496,glow);
  for(const radius of [54,97,142,190]){
    ctx.beginPath();ctx.arc(rx,ry,radius,0,Math.PI*2);ctx.strokeStyle='rgba(145,86,6,.65)';ctx.lineWidth=2;ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle='#504e43';ctx.lineWidth=10;ctx.strokeRect(40,32,680,496);
  for(const [a,b,c,d] of [[376,34,376,233],[376,288,376,358],[376,414,376,526],[43,302,298,302],[353,302,454,302],[512,302,716,302]])line(a,b,c,d,'#504e43',9);
  for(const [a,b,c,d] of [[110,32,246,32],[485,32,602,32],[40,175,40,234],[720,100,720,192],[130,528,237,528],[500,528,610,528]]){
    line(a,b,c,d,'#f7eedc',8);line(a,b,c,d,'#91aaa5',2);
  }
}
