// Scene setup, lighting, ground, roads, rivers
export function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9dd8ee);
  scene.fog = new THREE.Fog(0x9dd8ee, 55, 150);
  return scene;
}

export function initLights(scene) {
  scene.add(new THREE.HemisphereLight(0xd9f3ff, 0x62774e, 2.0));
  const sun = new THREE.DirectionalLight(0xfff0d0, 2.3);
  sun.position.set(-45, 75, 35);
  sun.castShadow = true;
  sun.shadow.mapSize.set(512, 512);
  scene.add(sun);
  return sun;
}

export function createGround(scene) {
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x7fc16c, roughness: 1 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.12;
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}
