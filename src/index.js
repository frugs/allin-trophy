import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import GLTFLoader from "three-gltf-loader";
const confetti = require("canvas-confetti");

const loader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const textureCube = cubeTextureLoader.load([
  'env_grad.png',
  'env_grad.png',
  'env_white.png',
  'env_white.png',
  'env_grad.png',
  'env_grad.png'
]);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "rendererCanvas";
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;

const scene = new THREE.Scene();
scene.background = textureCube;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 15, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.enableKeys = false;
controls.maxPolarAngle = Math.PI / 2 * 0.8;
controls.minPolarAngle = Math.PI / 2 * 0.8;
controls.target = new THREE.Vector3(0, 5, 0);

const plane = (() => {
  const geometry = new THREE.PlaneGeometry(500, 500);
  const material = new THREE.ShadowMaterial();
  return new THREE.Mesh(geometry, material);
})();
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

const ambientLight = new THREE.AmbientLight(0x666666, 5);
const mainLight = new THREE.DirectionalLight(0xFFFFFF);
mainLight.position.set(10, 15, -10);
mainLight.castShadow = true;
mainLight.shadow.camera.left = -10;
mainLight.shadow.camera.right = 10;
mainLight.shadow.camera.top = 10;
mainLight.shadow.camera.bottom = -10;
mainLight.shadow.radius = 2;

// scene.add(new THREE.CameraHelper(mainLight.shadow.camera));

scene.add(ambientLight);
scene.add(mainLight);

loader.load("trophy_minimal.glb", (gltf) => {
  scene.add(gltf.scene);

  const tableMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  tableMaterial.envMap = textureCube;
  tableMaterial.metalness = 0.2;
  tableMaterial.roughness = 0.2;
  tableMaterial.map = new THREE.TextureLoader().load("minotti_1.jpg");
  // tableMaterial.aoMap = new THREE.TextureLoader().load("TableAO.png");
  // tableMaterial.map = new THREE.TextureLoader().load("TableCombined.png");

  gltf.scene.children[0].material = tableMaterial;
  gltf.scene.children[0].receiveShadow = true;

  const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xFFC673});
  cubeMaterial.envMap = textureCube;
  cubeMaterial.metalness = 0.9;
  cubeMaterial.roughness = 0.1;

  gltf.scene.children[1].material = cubeMaterial;
  gltf.scene.children[1].castShadow = true;
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);

  confetti({
    particleCount: 5,
    angle: 60,
    spread: 55,
    origin: {
      x: 0
    }
  });
  confetti({
    particleCount: 5,
    angle: 120,
    spread: 55,
    origin: {
      x: 1
    }
  });

}

animate();
