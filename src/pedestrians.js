// Pedestrian NPC creation, AI, combat
export function createPedestrian(x, z, index) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  return g;
}
