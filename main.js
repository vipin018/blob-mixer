import './style.css';
import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Load HDRI
const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = texture;
  scene.environment = texture;
});

// Create sphere
const geometry = new THREE.SphereGeometry(1, 100, 100);
const material = new THREE.MeshPhysicalMaterial({
  color: 'red',
  envMap: scene.environment,
  envMapIntensity: 1,
  roughness: 0,
  metalness: 0.1,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

// OrbitControls setup
// const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate(time) {
  requestAnimationFrame(animate);
  // material.uniforms.time.value = time * 0.001;
  // controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.reset().update();
});

animate();