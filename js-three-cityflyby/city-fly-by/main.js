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

camera.position.set(0, 5, -100);
camera.lookAt(0, 5, -101);

// helpers
//const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 100);
gridHelper.position.set(0, 0, 0);
scene.add(gridHelper);
// plane
// const geometry = new THREE.PlaneGeometry( 200, 200 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, material );
// scene.add( plane );



// // center cube
// const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// const wireframeMaterialWhite = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
// const cube = new THREE.Mesh( cubeGeometry, wireframeMaterialWhite );

// cube.position.set(0, 0, 0);
// scene.add(cube);

// lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 5, -100);
scene.add(pointLight);


function between(x, min, max) {
  return x >= min && x <= max;
}


function placeSkyscrapers() {
  // const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
  const material = new THREE.MeshStandardMaterial( {color: 0x8db1eb} );
  const buildings = [];

  for (let row = 1; row < 50; row+=3) {
    for (let col = 1; col < 50; col++) {

      const [x, z] = [(col - 25) * 4, (row - 25) * 4];
      const range = 16;
      if (between(x, -range, range)) {
        continue;
      }
      // skip a random amount
      const skipVal = THREE.MathUtils.randInt(0, 2);
        if (skipVal == 2) {

        // place a skyscraper
        const size = THREE.MathUtils.randInt(1, 3);
        const height = THREE.MathUtils.randInt(1,  50);    
        const cubeGeometry = new THREE.BoxGeometry(size * 4, height, size * 4);
        const building = new THREE.Mesh( cubeGeometry, material );

        building.position.set(x, height/2, z);
        buildings.push(building);
        scene.add( building );
        // increment col step based on size
        col += size;
      }
    }
  }
  return buildings;
}
const skyScrapers = placeSkyscrapers();


function setBuildingHeights(newHeight) {
  skyScrapers.forEach((ent) => {
    ent.scale.set(ent.scale.x, newHeight, ent.scale.z);
    ent.position.set(ent.position.x, ent.position.y, ent.position.z)
  });
}


function pingPongVal(cvalAcend, max, step) {
  var currVal = cvalAcend[0];
  var accend = cvalAcend[1];
  if (currVal >= max || currVal <= 1) {
    accend = !accend;
  }
  if (accend) {
    currVal += step;
  } else {
    currVal -= step;
  }
  console.log([currVal, accend]);
  return [currVal, accend];
}


var cval = [20, false];
function animate() {
  requestAnimationFrame( animate );
  //controls.update();

  //cval = pingPongVal(cval, 24, 0.02);
  //setBuildingHeights(cval[0]);

  if (camera.position.z < 200) {
    camera.position.z += 0.2;
    pointLight.position.z += 0.2;
  }
  renderer.render( scene, camera );
}
animate()
