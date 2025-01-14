import './style.css';
import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import textVertexShader from './shaders/textVertexShader.glsl';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Text } from 'troika-three-text';
// import { GUI } from 'lil-gui';
import gsap from 'gsap';

const blobs = [
  {
    name: 'Color Fusion',
    background: '#9D73F7',
    config: {
      "uPositionFrequency": 1,
      "uPositionStrength": 0.3,
      "uSmallWavePositionFrequency": 0.5,
      "uSmallWavePositionStrength": 0.9,
      "roughness": 0.2,
      "metalness": 1,
      "envMapIntensity": 0.5,
      "clearcoat": 0,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
      "map": "cd",
      "uSmallWaveTimeFrequency": 0.2
    },
  },
  {
    name: 'Purple Mirror',
    background: '#5300B1',
    config: {
      "uPositionFrequency": 0.584,
      "uPositionStrength": 0.276,
      "uSmallWavePositionFrequency": 0.899,
      "uSmallWavePositionStrength": 1.266,
      "roughness": 0,
      "metalness": 1,
      "envMapIntensity": 2,
      "clearcoat": 0,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
      "map": "cosmic-fusion",
      "uSmallWaveTimeFrequency": 0.1
    },
  },
  {
    name: 'Alien Goo',
    background: '#45ACD8',
    config: {
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 0.378,
      "uSmallWavePositionStrength": 0.341,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
      "map": "deep-ocean",
      "uSmallWaveTimeFrequency": 0.1
    },
  },
  {
    name: 'Iridescent',
    background: '#45ACD8',
    config: {
      "map": "foil",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 0.378,
      "uSmallWavePositionStrength": 1.341,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Sirens',
    background: '#45ACD8',
    config: {
      "map": "halloween",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 1.99,
      "uSmallWavePositionFrequency": 1.378,
      "uSmallWavePositionStrength": 0.341,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Hologram',
    background: '#45ACD8',
    config: {
      "map": "hologram",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 2.99,
      "uSmallWavePositionFrequency": 0.378,
      "uSmallWavePositionStrength": 1.341,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'imaginarium',
    background: '#45ACD8',
    config: {
      "map": "imaginarium",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 0.78,
      "uSmallWavePositionStrength": 0.41,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Iridescent',
    background: '#45ACD8',
    config: {
      "map": "iridescent",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 5.99,
      "uSmallWavePositionFrequency": 0.378,
      "uSmallWavePositionStrength": 0.9,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Lucky Day',
    background: '#45ACD8',
    config: {
      "map": "lucky-day",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 1.378,
      "uSmallWavePositionStrength": 1.64,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Passion',
    background: '#45ACD8',
    config: {
      "map": "passion",
      "uPositionFrequency": 1.02,
      "uPositionStrength": 0.9,
      "uSmallWavePositionFrequency": 0.78,
      "uSmallWavePositionStrength": 1.341,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name:'Pink-floyd',
    background: '#45ACD8',
    config: {
      "map": "pink-floyd",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 2.378,
      "uSmallWavePositionStrength": 0.19,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name : 'Purple Rain',
    background: '#45ACD8',
    config: {
      "map": "purple-rain",
      "uPositionFrequency": .022,
      "uPositionStrength": 1.38,
      "uSmallWavePositionFrequency": 1.978,
      "uSmallWavePositionStrength": 1.1,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name: 'Rainbow',
    background: '#45ACD8',
    config: {
      "map": "rainbow",
      "uPositionFrequency": 1.322,
      "uPositionStrength": .99,
      "uSmallWavePositionFrequency": .78,
      "uSmallWavePositionStrength": 2.1,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },
  {
    name : 'Sunset Vibes',
    background: '#45ACD8',
    config: {
      "map": "sunset-vibes",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 0.1,
      "uSmallWavePositionStrength": 4.0,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  },{
    name : 'White',
    background: '#45ACD8',
    config: {
      "map": "white",
      "uPositionFrequency": 1.022,
      "uPositionStrength": 0.99,
      "uSmallWavePositionFrequency": 0.78,
      "uSmallWavePositionStrength": 1.1,
      "roughness": 0.292,
      "metalness": 0.73,
      "envMapIntensity": 0.86,
      "clearcoat": 1,
      "clearcoatRoughness": 0,
      "transmission": 0,
      "flatShading": false,
      "wireframe": false,
    },
  }
]

let isAnimating = false;
let currentIndex = 0;
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#222');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  // alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Setup Three.js Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => console.log('Loading started');
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => console.log(`Loading: ${itemsLoaded} of ${itemsTotal}`);
loadingManager.onLoad = () => console.log('Loading complete');
loadingManager.onError = (url) => console.error(`Error loading: ${url}`);

// Load HDRI
const loader = new RGBELoader(loadingManager); // Use the loading manager for the RGBELoader
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = texture;
  scene.environment = texture;
});

// Create sphere
// const geometry = new THREE.IcosahedronGeometry(1, 100);
const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  map: new THREE.TextureLoader().load(`./gradients/${blobs[currentIndex].config.map}.png`),
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uPositionFrequency: { value: blobs[currentIndex].config.uPositionFrequency },
    uPositionStrength: { value: blobs[currentIndex].config.uPositionStrength },
    uTimeFrequency: { value: blobs[currentIndex].config.uTimeFrequency },
    uSmallWavePositionFrequency: { value: blobs[currentIndex].config.uSmallWavePositionFrequency },
    uSmallWavePositionStrength: { value: blobs[currentIndex].config.uSmallWavePositionStrength },
    uSmallWaveTimeFrequency: { value: blobs[currentIndex].config.uSmallWaveTimeFrequency },
    roughness: { value: blobs[currentIndex].config.roughness },
    metalness: { value: blobs[currentIndex].config.metalness },
  }
});

const mergedGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, 100));
mergedGeometry.computeTangents();
console.log(mergedGeometry.attributes)

const sphere = new THREE.Mesh(mergedGeometry, material);
scene.add(sphere);

camera.position.z = 2.9;

// OrbitControls setup
// const controls = new OrbitControls(camera, renderer.domElement);

// GUI setup
// const gui = new GUI();
// gui.domElement.style.position = 'absolute';
// gui.domElement.style.top = '10px';
// gui.domElement.style.right = '10px';
// gui.domElement.style.zIndex = '1000';

// gui.add(material.uniforms.uTime, 'value', 0, 1, 0.01).name('Time');
// gui.add(material.uniforms.uPositionFrequency, 'value', 0, 10, 0.01).name('Position Frequency');
// gui.add(material.uniforms.uPositionStrength, 'value', 0, 10, 0.01).name('Position Strength');
// gui.add(material.uniforms.uTimeFrequency, 'value', 0, 10, 0.01).name('Time Frequency');
// gui.add(material.uniforms.uSmallWavePositionFrequency, 'value', 0, 10, 0.01).name('Small Wave Position Frequency');
// gui.add(material.uniforms.uSmallWavePositionStrength, 'value', 0, 10, 0.01).name('Small Wave Position Strength');
// gui.add(material.uniforms.uSmallWaveTimeFrequency, 'value', 0, 10, 0.01).name('Small Wave Time Frequency');

// Additional GUI for color, metalness, roughness
// const materialProperties = gui.addFolder('Material Properties');
// materialProperties.addColor(material, 'color').name('Color');
// materialProperties.add(material, 'metalness', 0, 1, 0.01).name('Metalness');
// materialProperties.add(material, 'roughness', 0, 1, 0.01).name('Roughness');

const clock = new THREE.Clock();

const textMaterial = new THREE.ShaderMaterial({
  vertexShader: textVertexShader,
  fragmentShader: `void main(){
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Changed to white color
  }`,
  side: THREE.DoubleSide,
  uniforms: {
    progress: { value: 0 },
    direction: { value: 1 }
  }
});

const texts = []; // Create an array to hold text objects

blobs.map((blob, index) => {
  const myText = new Text();
  myText.text = blob.name;
  myText.fontWeight = 900;
  myText.material = textMaterial;
  myText.font = `./aften_screen.woff`
  myText.anchorX = 'center';
  myText.anchorY = 'middle';
  myText.position.set(0, 0, 2);

  if (index != 0) {
    myText.scale.set(0, 0, 0);
  }

  myText.letterSpacing = 0.01;
  myText.fontSize = window.innerWidth / 7000;
  myText.glyphGeometryDetail = 20;
  myText.sync();
  scene.add(myText);
  texts.push(myText); // Store the text object in the array
  return myText;
})

window.addEventListener('wheel', (event) => {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  let direction = Math.sign(event.deltaY);
  let next = (currentIndex + direction) % blobs.length;

  texts[next].scale.set(1, 1, 1);
  texts[next].position.x = direction * 3;

  gsap.to(textMaterial.uniforms.progress, {
    value: 0.5,
    duration: 1,
    ease: 'linear',
    onComplete: () => {
      currentIndex = next;
      isAnimating = false;
      textMaterial.uniforms.progress.value = 0;
    }

  })

  gsap.to(texts[currentIndex].position, {
    x: -direction * 3,
    // y: direction * 2,
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(texts[next].position, {
    x: 0,
    // y: direction * 2,
    duration: 1,
    ease: 'power1.inOut',
  })

  gsap.to(sphere.rotation, {
    // x: 0,
    y: sphere.rotation.y + Math.PI * 4 * -direction,
    duration: 1,
    ease: 'power1.inOut',
  })

  const bgColor = new THREE.Color(blobs[next].background);
  gsap.to(scene.background, {
    r: bgColor.r,
    g: bgColor.g,
    b: bgColor.b,
    duration: 1,
    ease: 'linear',
  })

  updateMaterial(blobs[next].config);

})

function updateMaterial(config) {
  if (config.uPositionFrequency !== undefined) gsap.to(material.uniforms.uPositionFrequency, { value: config.uPositionFrequency, duration: 1, ease: 'power2.inOut' });
  if (config.uPositionStrength !== undefined) gsap.to(material.uniforms.uPositionStrength, { value: config.uPositionStrength, duration: 1, ease: 'power2.inOut' });
  if (config.uSmallWavePositionFrequency !== undefined) gsap.to(material.uniforms.uSmallWavePositionFrequency, { value: config.uSmallWavePositionFrequency, duration: 1, ease: 'power2.inOut' });
  if (config.uSmallWavePositionStrength !== undefined) gsap.to(material.uniforms.uSmallWavePositionStrength, { value: config.uSmallWavePositionStrength, duration: 1, ease: 'power2.inOut' });
  if (config.uSmallWaveTimeFrequency !== undefined) gsap.to(material.uniforms.uSmallWaveTimeFrequency, { value: config.uSmallWaveTimeFrequency, duration: 1, ease: 'power2.inOut' });
  if (config.map !== undefined) {
    setTimeout(() => {
      material.map = new THREE.TextureLoader().load(`./gradients/${config.map}.png`);
    }, 400);
  }
  if (config.roughness !== undefined) gsap.to(material, { roughness: config.roughness, duration: 1, ease: 'power2.inOut' });
  if (config.metalness !== undefined) gsap.to(material, { metalness: config.metalness, duration: 1, ease: 'power2.inOut' });
  if (config.envMapIntensity !== undefined) gsap.to(material, { envMapIntensity: config.envMapIntensity, duration: 1, ease: 'power2.inOut' });
  if (config.clearcoat !== undefined) gsap.to(material, { clearcoat: config.clearcoat, duration: 1, ease: 'power2.inOut' });
  if (config.clearcoatRoughness !== undefined) gsap.to(material, { clearcoatRoughness: config.clearcoatRoughness, duration: 1, ease: 'power2.inOut' });
  if (config.transmission !== undefined) gsap.to(material, { transmission: config.transmission, duration: 1, ease: 'power2.inOut' });
  if (config.flatShading !== undefined) gsap.to(material, { flatShading: config.flatShading, duration: 1, ease: 'power2.inOut' });
  if (config.wireframe !== undefined) gsap.to(material, { wireframe: config.wireframe, duration: 1, ease: 'power2.inOut' });
}


loadingManager.onLoad = () => {
  // Animation loop
  function animate(time) {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    // controls.update();
    renderer.render(scene, camera);
  }

  const bgColor = new THREE.Color(blobs[currentIndex].background);
  gsap.to(scene.background, {
    r: bgColor.r,
    g: bgColor.g,
    b: bgColor.b,
    duration: 1,
    ease: 'linear',
  })
  animate();
}
// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // controls.reset().update();
});
