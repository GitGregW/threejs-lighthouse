import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

/**
 * Lights
 */

const light = new THREE.AmbientLight("#ffffff", 0.5); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Floor
// const floorAlphaTexture = textureLoader.load(
//   "./floor/aerial_rocks_04_1k/alpha.jpg"
// );
const floorColorTexture = textureLoader.load(
  "./materials/floor/aerial_rocks_04_1k/aerial_rocks_04_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./materials/floor/aerial_rocks_04_1k/aerial_rocks_04_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "./materials/floor/aerial_rocks_04_1k/aerial_rocks_04_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "./materials/floor/aerial_rocks_04_1k/aerial_rocks_04_disp_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// new THREE.MeshBasicMaterial({ color: "#e8edc4" });
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30, 100, 100),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.8,
    displacementBias: -0.25,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Lighthouse Exterior
const lighthouseExteriorColorTexture = textureLoader.load(
  "./materials/lighthouse-exterior/plastered_wall_1k/plastered_wall_diff_1k.jpg"
);
const lighthouseExteriorARMTexture = textureLoader.load(
  "./materials/lighthouse-exterior/plastered_wall_1k/plastered_wall_arm_1k.jpg"
);
const lighthouseExteriorNormalTexture = textureLoader.load(
  "./materials/lighthouse-exterior/plastered_wall_1k/plastered_wall_nor_gl_1k.jpg"
);
lighthouseExteriorColorTexture.colorSpace = THREE.SRGBColorSpace;

const lighthouse = new THREE.Group();
const lighthouseHeight = new THREE.BoxGeometry(4, 5, 4);
// Lighthouse Base
const lighthouseBottomRoom = new THREE.Mesh(
  lighthouseHeight,
  // new THREE.MeshBasicMaterial({ color: "#e8edc4", opacity: 20 }),
  new THREE.MeshStandardMaterial({
    emissive: 0x808080,
    map: lighthouseExteriorColorTexture,
    aoMap: lighthouseExteriorARMTexture,
    roughnessMap: lighthouseExteriorARMTexture,
    metalnessMap: lighthouseExteriorARMTexture,
    normalMap: lighthouseExteriorNormalTexture,
  })
);
lighthouseBottomRoom.translateY(2);
lighthouse.add(lighthouseBottomRoom);

// Lighthouse Mid
const lighthouseMidRoom = new THREE.Mesh(
  lighthouseHeight,
  new THREE.MeshStandardMaterial({
    color: 0xd62e2e,
    map: lighthouseExteriorColorTexture,
    aoMap: lighthouseExteriorARMTexture,
    roughnessMap: lighthouseExteriorARMTexture,
    metalnessMap: lighthouseExteriorARMTexture,
    normalMap: lighthouseExteriorNormalTexture,
  })
);
lighthouseMidRoom.translateY(7);
lighthouse.add(lighthouseMidRoom);

// Lighthouse Top
const lighthouseTopRoom = new THREE.Mesh(
  lighthouseHeight,
  new THREE.MeshStandardMaterial({
    emissive: 0x808080,
    map: lighthouseExteriorColorTexture,
    aoMap: lighthouseExteriorARMTexture,
    roughnessMap: lighthouseExteriorARMTexture,
    metalnessMap: lighthouseExteriorARMTexture,
    normalMap: lighthouseExteriorNormalTexture,
  })
);
lighthouseTopRoom.translateY(12);
lighthouse.add(lighthouseTopRoom);

// Lighthouse Lamp
const lighthouseLamp = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 3, 8),
  new THREE.MeshBasicMaterial({ color: "#e8edc4" })
);
lighthouseLamp.translateY(16);
lighthouse.add(lighthouseLamp);

// Lighthouse Lamp Base
const lighthouseLampBase = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.5, 5),
  new THREE.MeshStandardMaterial({
    map: lighthouseExteriorColorTexture,
    aoMap: lighthouseExteriorARMTexture,
    roughnessMap: lighthouseExteriorARMTexture,
    metalnessMap: lighthouseExteriorARMTexture,
    normalMap: lighthouseExteriorNormalTexture,
  })
);
lighthouseLampBase.translateY(17.5);
lighthouse.add(lighthouseLampBase);

// Lighthouse Lamp Roof
const lighthouseLampRoof = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.5, 5),
  new THREE.MeshStandardMaterial({
    map: lighthouseExteriorColorTexture,
    aoMap: lighthouseExteriorARMTexture,
    roughnessMap: lighthouseExteriorARMTexture,
    metalnessMap: lighthouseExteriorARMTexture,
    normalMap: lighthouseExteriorNormalTexture,
  })
);
lighthouseLampRoof.translateY(14.5);
lighthouse.add(lighthouseLampRoof);

lighthouse.translateX(8);
lighthouse.translateZ(8);
scene.add(lighthouse);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height);
camera.position.z = 50;
camera.position.x = 50;
camera.position.y = 30;
scene.add(camera);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// ...

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
const controls = new OrbitControls(camera, renderer.domElement);
// const gui = new GUI();

// gui
//   .add(floor.material, "displacementScale")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("floorDisplacementScale");
// gui
//   .add(floor.material, "displacementBias")
//   .min(-1)
//   .max(1)
//   .step(0.001)
//   .name("floorDisplacementBias");

import { Sky } from "three/addons/objects/Sky.js";

// let camera, scene, renderer;

let sky, sun;

function initSky() {
  // Add Sky
  sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  sun = new THREE.Vector3();

  /// GUI

  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: renderer.toneMappingExposure,
  };

  function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(scene, camera);
  }

  const gui = new GUI();

  gui.add(effectController, "turbidity", 0.0, 20.0, 0.1).onChange(guiChanged);
  gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
  gui
    .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
    .onChange(guiChanged);
  gui
    .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
    .onChange(guiChanged);
  gui.add(effectController, "elevation", 0, 90, 0.1).onChange(guiChanged);
  gui.add(effectController, "azimuth", -180, 180, 0.1).onChange(guiChanged);
  gui.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);

  guiChanged();
}

const render = () => {
  // update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(render);
};

initSky();
render();
