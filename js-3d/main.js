import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// npm run dev

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( {
  canvas: document.querySelector('#bg'),
} );
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

// helpers
// const gridHelper = new THREE.GridHelper(200, 50);
//const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(gridHelper);

const torusGemoetry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const wireframeMaterialWhite = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
const torus = new THREE.Mesh( torusGemoetry, wireframeMaterialWhite );

scene.add(torus);


function placeIcosahedron() {
  
  const decal = THREE.MathUtils.randFloat(1, 3);

  const IcosahedronGeometry = new THREE.IcosahedronGeometry( decal );
  const wireframeMaterialWhite = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
  const icosahedron = new THREE.Mesh( IcosahedronGeometry, wireframeMaterialWhite );
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 300 ) );
  const s = THREE.MathUtils.randFloat( 1, 5 ) ;

  icosahedron.position.set(x, y, z);
  icosahedron.scale.set(s, s, s);
  
  scene.add( icosahedron );

}
Array(100).fill().forEach(placeIcosahedron)


function rotateCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = rotateCamera;
rotateCamera();


function animate() {
  requestAnimationFrame( animate );
  //controls.update();
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  
  renderer.render( scene, camera );
}

animate()



