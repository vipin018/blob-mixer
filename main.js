import './style.css';
import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import simplexNoise4d from './shaders/simplexNoise4d.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'lil-gui';
import { uniform } from 'three/tsl';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  alpha: true
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
// const geometry = new THREE.IcosahedronGeometry(1, 100);
const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  // wireframe: true,
  color: '#DC143C',
  roughness: 0.5,
  metalness: 1,

  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uPositionFrequency: { value: 1.0 },
    uPositionStrength: { value: 1.0 },
    uTimeFrequency: { value: 0.3 },
    uSmallWavePositionFrequency: { value: 2.3 },
    uSmallWavePositionStrength: { value: 0.2 },
    uSmallWaveTimeFrequency: { value: 0.1 },
  }
});

const mergedGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, 100));
mergedGeometry.computeTangents();
console.log(mergedGeometry.attributes)

const sphere = new THREE.Mesh(mergedGeometry, material);
scene.add(sphere);

camera.position.z = 3;

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);

// GUI setup
const gui = new GUI();
gui.domElement.style.position = 'absolute';
gui.domElement.style.top = '10px';
gui.domElement.style.right = '10px';
gui.domElement.style.zIndex = '1000';

gui.add(material.uniforms.uTime, 'value', 0, 1, 0.01).name('Time');
gui.add(material.uniforms.uPositionFrequency, 'value', 0, 10, 0.01).name('Position Frequency');
gui.add(material.uniforms.uPositionStrength, 'value', 0, 10, 0.01).name('Position Strength');
gui.add(material.uniforms.uTimeFrequency, 'value', 0, 10, 0.01).name('Time Frequency');
gui.add(material.uniforms.uSmallWavePositionFrequency, 'value', 0, 10, 0.01).name('Small Wave Position Frequency');
gui.add(material.uniforms.uSmallWavePositionStrength, 'value', 0, 10, 0.01).name('Small Wave Position Strength');
gui.add(material.uniforms.uSmallWaveTimeFrequency, 'value', 0, 10, 0.01).name('Small Wave Time Frequency');

// Additional GUI for color, metalness, roughness
const materialProperties = gui.addFolder('Material Properties');
materialProperties.addColor(material, 'color').name('Color');
materialProperties.add(material, 'metalness', 0, 1, 0.01).name('Metalness');
materialProperties.add(material, 'roughness', 0, 1, 0.01).name('Roughness');

const clock = new THREE.Clock();

// Animation loop
function animate(time) {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // controls.reset().update();
});

animate();