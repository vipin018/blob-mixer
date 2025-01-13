import * as THREE from 'three';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader
const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0,2,4));
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create sphere
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    time: { value: 0 }
  }
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

// Animation loop
function animate(time) {
  requestAnimationFrame(animate);
  material.uniforms.time.value = time * 0.001;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();