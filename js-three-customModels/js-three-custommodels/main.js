import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( {
  canvas: document.querySelector('#bg'),
} );
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.set(0, 20, 0);

// helpers
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 100);
gridHelper.position.set(0, 0, 0);
scene.add(gridHelper);


// center cube
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const wireframeMaterialWhite = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
const cube = new THREE.Mesh( cubeGeometry, wireframeMaterialWhite );

cube.position.set(0, 5, 0);
scene.add(cube);

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}
animate()
