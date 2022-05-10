import * as THREE from "three";

class Light extends THREE.DirectionalLight {
  constructor(l_color) {
    super(l_color);
    this.position.set(100, 100, 100);
    this.target.position.set(0, 0, 0);
    this.castShadow = true;
    this.shadow.bias = -0.06;
    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2048;
    this.shadow.camera.near = 1.0;
    this.shadow.camera.far = 500;
    this.shadow.camera.left = 200;
    this.shadow.camera.right = -200;
    this.shadow.camera.top = 200;
    this.shadow.camera.bottom = -200;
  }
}

export { Light };
