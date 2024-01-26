import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Scene  
const scene = new THREE.Scene();

//Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)

//Add material to sphere
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5,
  metalness: 0.5,
})

//Mesh is the combination of geometry and material
const mesh = new THREE.Mesh(geometry, material);
//Add it to the scene
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);
scene.add(light);


//Add camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera);



//Time to render the scene
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas, gammaOutput: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2); //increase quality of sphere, outline looks smooth
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
