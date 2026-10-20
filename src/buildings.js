// Building creation functions
export function createBundBuilding(THREE, box, mat, occupied, x, z, w, d, h, color, isLandmark) {
  const g = new THREE.Group();
  const base = box(w, h, d, color, 0, h/2, 0);
  g.add(base);
  const winMat = mat(0x9fd8ff, 0.35, 0.7);
  const winGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const floors = Math.max(2, Math.floor(h / 3));
  const cols = Math.max(2, Math.floor(w / 2.5));
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      const wx = -w/2 + 1.2 + c * (w - 2.4) / Math.max(1, cols - 1);
      const wy = 1.5 + f * (h - 2) / Math.max(1, floors - 1);
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(wx, wy, d/2 + 0.06);
      g.add(win);
    }
  }
  if (isLandmark) {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(w*0.35, 16, 12, 0, Math.PI*2, 0, Math.PI/2), mat(0x8b6914, 0.6, 0.3));
    dome.position.set(0, h + w*0.15, 0);
    g.add(dome);
  }
  g.position.set(x, 0, z);
  occupied.push({ x, z, w, d });
  return g;
}

export function createShikumenBlock(THREE, box, mat, occupied, x, z, w, d, h, color) {
  const g = new THREE.Group();
  const base = box(w, h, d, color, 0, h/2, 0);
  g.add(base);
  const doorMat = mat(0x4a2810, 0.8, 0.2);
  const door = box(1.2, 2.2, 0.1, doorMat, 0, 1.1, d/2 + 0.05);
  g.add(door);
  const roof = box(w + 0.5, 0.3, d + 0.5, mat(0x2a1a0a, 0.9, 0.1), 0, h + 0.15, 0);
  g.add(roof);
  g.position.set(x, 0, z);
  occupied.push({ x, z, w, d });
  return g;
}

export function createGlassTower(THREE, box, mat, occupied, x, z, w, d, h, color) {
  const g = new THREE.Group();
  const base = box(w, h, d, color, 0, h/2, 0);
  g.add(base);
  const winMat = mat(0x66ccff, 0.2, 0.8);
  const winGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const floors = Math.max(4, Math.floor(h / 2.5));
  const cols = Math.max(3, Math.floor(w / 2));
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      const wx = -w/2 + 1 + c * (w - 2) / Math.max(1, cols - 1);
      const wy = 1.5 + f * (h - 2) / Math.max(1, floors - 1);
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(wx, wy, d/2 + 0.06);
      g.add(win);
    }
  }
  g.position.set(x, 0, z);
  occupied.push({ x, z, w, d });
  return g;
}

export function createLandmark(THREE, box, mat, occupied, x, z, type) {
  const g = new THREE.Group();
  if (type === 'pearl') {
    const tower = box(2, 60, 2, mat(0xcccccc, 0.5, 0.5), 0, 30, 0);
    g.add(tower);
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 12), mat(0xff4444, 0.3, 0.7));
    sphere1.position.set(0, 20, 0);
    g.add(sphere1);
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 12), mat(0xff4444, 0.3, 0.7));
    sphere2.position.set(0, 40, 0);
    g.add(sphere2);
  } else if (type === 'tower') {
    const base = box(8, 40, 8, mat(0x888888, 0.4, 0.6), 0, 20, 0);
    g.add(base);
    const top = box(4, 20, 4, mat(0x888888, 0.4, 0.6), 0, 50, 0);
    g.add(top);
    const spire = box(1, 10, 1, mat(0xcccccc, 0.3, 0.7), 0, 65, 0);
    g.add(spire);
  } else if (type === 'clock') {
    const base = box(6, 30, 6, mat(0x8b7355, 0.7, 0.3), 0, 15, 0);
    g.add(base);
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.5, 16), mat(0xffdd44, 0.3, 0.7));
    clock.position.set(0, 25, 3.1);
    clock.rotation.x = Math.PI / 2;
    g.add(clock);
  }
  g.position.set(x, 0, z);
  occupied.push({ x, z, w: 10, d: 10 });
  return g;
}
