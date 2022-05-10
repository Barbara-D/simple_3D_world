import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Light } from "./fundamentals/lights.js";
import { Camera } from "./fundamentals/camera.js";

//CONSTANTS
const fov = 60;
const aspect = 1920 / 1080;
const near = 1.0;
const far = 1000;

//THE CONSTRUCTOR RUNS EACH TIME THE INSTANCE IS CREATED
class SimpleWorld {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer();

    //SHADOWS
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;

    //SIZING
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    //RESIZING
    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    //CAMERA SETUP
    this._camera = new Camera(fov, aspect, near, far);

    this._scene = new THREE.Scene();

    //light added from a class wiii
    const light = new Light("white");
    this._scene.add(light);

    //IDK IF THIS WORKS - DOES
    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "./resources/posx.jpg",
      "./resources/negx.jpg",
      "./resources/posy.jpg",
      "./resources/negy.jpg",
      "./resources/posz.jpg",
      "./resources/negz.jpg"
    ]);

    this._scene.background = texture;

    //FLOOR
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    //ELEMENTS OF THE SCENE
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({ color: 0x808080 })
    );
    box.position.set(0, 1, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this._scene.add(box);
    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({ color: "lightBlue" })
    );
    box2.position.set(2, 1, 4);
    box2.castShadow = true;
    box2.receiveShadow = true;
    this._scene.add(box2);
    //CALLS RENDER FUNCTION
    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._OnWindowResize();
      this._RAF();
    });
  }
}

//DOESN'T WORK (IN SANDBOX ONLY?)
// let _APP = null;
// window.addEventListener("DOMContentLoaded", (e) => {
//   console.log("initialized");
//   _APP = new SimpleWorld();
// });

let _APP = new SimpleWorld();
