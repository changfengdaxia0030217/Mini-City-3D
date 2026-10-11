// Mini City 3D — live minimap overlay
const canvas = document.getElementById('minimap');
const ctx = canvas.getContext('2d');
const SIZE = canvas.width;
const WORLD = 240;
const scale = SIZE / WORLD;
const roadWidth = 13 * scale;
function mapX(x) { return SIZE / 2 + x * scale; }
function mapY(z) { return SIZE / 2 + z * scale; }

function drawMap() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#83b96a';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // City blocks and park
  ctx.fillStyle = '#9bd47d';
  ctx.fillRect(mapX(-103), mapY(-103), 25 * scale, 25 * scale);
  ctx.fillStyle = '#424d5a';
  for (const p of [-60, 0, 60]) {
    ctx.fillRect(mapX(-120), mapY(p) - 5.5 * scale, SIZE, 11 * scale);
    ctx.fillRect(mapX(p) - 5.5 * scale, mapY(-120), 11 * scale, SIZE);
  }
  // Building footprints roughly match the generated city blocks
  ctx.fillStyle = '#d9bda0';
  for (let gx = -2; gx <= 2; gx++) for (let gz = -2; gz <= 2; gz++) {
    if (gx === 0 || gz === 0) continue;
    const cx = gx * 40, cz = gz * 40;
    for (const dx of [-7, 7]) {
      const bx = cx + dx, bz = cz;
      ctx.fillRect(mapX(bx) - 4.5 * scale, mapY(bz) - 5 * scale, 9 * scale, 10 * scale);
    }
  }
  // North indicator
  ctx.fillStyle = '#ffffffd9';
  ctx.font = 'bold 12px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('N', SIZE - 15, 16);
  ctx.beginPath();
  ctx.moveTo(SIZE - 15, 20);
  ctx.lineTo(SIZE - 20, 29);
  ctx.lineTo(SIZE - 10, 29);
  ctx.closePath();
  ctx.fill();

  const car = window.miniCityCar;
  if (car) {
    const x = mapX(car.position.x), y = mapY(car.position.z);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-car.rotation.y);
    ctx.fillStyle = '#ffbd4a';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(5.5, 6);
    ctx.lineTo(0, 3.5);
    ctx.lineTo(-5.5, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  requestAnimationFrame(drawMap);
}
drawMap();
