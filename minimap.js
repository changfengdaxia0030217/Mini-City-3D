// Mini City 3D — live minimap overlay
const canvas = document.getElementById('minimap');
const ctx = canvas.getContext('2d');
const SIZE = canvas.width;
const WORLD = 300;
const scale = SIZE / WORLD;
const mapX = x => SIZE / 2 + x * scale;
const mapY = z => SIZE / 2 + z * scale;

function drawRoad(axis, center, width, extent) {
  ctx.fillStyle = '#424d5a';
  if (axis === 'x') ctx.fillRect(mapX(-extent), mapY(center) - width * scale / 2, extent * 2 * scale, width * scale);
  else ctx.fillRect(mapX(center) - width * scale / 2, mapY(-extent), width * scale, extent * 2 * scale);
}
function drawMap() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#83b96a';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Blocks and park
  ctx.fillStyle = '#9bd47d';
  ctx.fillRect(mapX(-70), mapY(-70), 20 * scale, 20 * scale);
  ctx.fillStyle = '#d9bda0';
  for (let gx = -1; gx <= 1; gx++) for (let gz = -1; gz <= 1; gz++) {
    if (gx === 0 || gz === 0) continue;
    const cx = gx * 40, cz = gz * 40;
    for (const dx of [-7, 7]) {
      ctx.fillRect(mapX(cx + dx) - 4.5 * scale, mapY(cz) - 5 * scale, 9 * scale, 10 * scale);
    }
  }

  // Outer ring and main streets
  for (const p of [-40, 40]) { drawRoad('x', p, 11, 80); drawRoad('z', p, 11, 80); }
  drawRoad('x', 0, 13, 80); drawRoad('z', 0, 13, 80);

  // Huangpu River across the northern part of the city
  ctx.beginPath();
  for (let x = -100; x <= 100; x += 2) {
    const z = -80 + 4.5 * Math.sin(x * .018) + 1.5 * Math.sin(x * .043);
    if (x === -100) ctx.moveTo(mapX(x), mapY(z));
    else ctx.lineTo(mapX(x), mapY(z));
  }
  for (let x = 100; x >= -100; x -= 2) {
    const z = -80 + 4.5 * Math.sin(x * .018) + 1.5 * Math.sin(x * .043) + 40;
    ctx.lineTo(mapX(x), mapY(z));
  }
  ctx.closePath();
  ctx.fillStyle = '#239fca';
  ctx.fill();

  // Soft sidewalk strips beside the central and secondary roads
  ctx.strokeStyle = '#d7d5c9';
  ctx.lineWidth = Math.max(1, 1.9 * scale);
  for (const p of [0, -40, 40]) {
    for (const offset of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(mapX(-80), mapY(p + offset * (p === 0 ? 8.15 : 7.15)));
      ctx.lineTo(mapX(80), mapY(p + offset * (p === 0 ? 8.15 : 7.15))); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mapX(p + offset * (p === 0 ? 8.15 : 7.15)), mapY(-80));
      ctx.lineTo(mapX(p + offset * (p === 0 ? 8.15 : 7.15)), mapY(80)); ctx.stroke();
    }
  }

  // Live AI traffic and pedestrians
  for (const item of (window.miniCityTraffic || [])) {
    if (!item.group?.visible) continue;
    ctx.fillStyle = '#f4f6fa';
    ctx.beginPath(); ctx.arc(mapX(item.group.position.x), mapY(item.group.position.z), 2.2, 0, Math.PI * 2); ctx.fill();
  }
  for (const p of (window.miniCityPedestrians || [])) {
    if (!p.group?.visible) continue;
    ctx.fillStyle = p.fleeTime > 0 ? '#ff784f' : '#26384a';
    ctx.beginPath(); ctx.arc(mapX(p.group.position.x), mapY(p.group.position.z), p.fleeTime > 0 ? 2.8 : 1.8, 0, Math.PI * 2); ctx.fill();
  }
  for (const p of (window.miniCityPolice || [])) {
    if (!p.group?.visible) continue;
    ctx.fillStyle = '#56c8ff';
    ctx.beginPath(); ctx.arc(mapX(p.group.position.x), mapY(p.group.position.z), 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.stroke();
  }

  // The parked car remains marked while the player is on foot.
  const car = window.miniCityCar;
  if (car) {
    const x = mapX(car.position.x), y = mapY(car.position.z);
    ctx.save(); ctx.translate(x, y); ctx.rotate(-car.rotation.y);
    ctx.fillStyle = '#ffbd4a'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(4, 4); ctx.lineTo(0, 2.5); ctx.lineTo(-4, 4); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.restore();
  }

  // Blue player marker switches on when walking; arrow points in the facing direction.
  if (window.miniCityOnFoot && window.miniCityAvatar) {
    const player = window.miniCityAvatar;
    ctx.save(); ctx.translate(mapX(player.position.x), mapY(player.position.z)); ctx.rotate(-player.rotation.y);
    ctx.fillStyle = '#48a5ff'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(5.5, 6); ctx.lineTo(0, 3.5); ctx.lineTo(-5.5, 6); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.restore();
  }

  // North indicator and legend
  ctx.fillStyle = '#ffffffed'; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center';
  ctx.fillText('N', SIZE - 15, 16);
  ctx.beginPath(); ctx.moveTo(SIZE - 15, 20); ctx.lineTo(SIZE - 20, 29); ctx.lineTo(SIZE - 10, 29); ctx.closePath(); ctx.fill();
  ctx.textAlign = 'left'; ctx.font = '9px system-ui'; ctx.fillStyle = '#ffffffed';
  ctx.fillText('● 你  ● 车辆  ● 警车', 7, SIZE - 8);
  requestAnimationFrame(drawMap);
}
drawMap();
