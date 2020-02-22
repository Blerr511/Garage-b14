import * as THREE from 'three';
import THREEMTLLoader from 'three-react-mtl-loader';
import GLTFLoader from 'three-gltf-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
require('three-obj-loader')(THREE);
const THREEFBXLoader = require('three-fbx-loader');
class ModelViewer {
  constructor(width = 600, height = 600, color = 0x404040, envPath) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(-0.5, 0.2, -4);
    const ambientLight = new THREE.AmbientLight(color);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    this.scene = scene;
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.renderer = null;
    this.cameraX = 0;
    this.cameraY = 100;
    this.cameraZ = 100;
    this.rotateObject = true;
    scene.add(ambientLight);
  }
  set envMap(map) {
    this.envMap = map;
  }
  get envMap() {
    return this.envMap;
  }
  set rotation(r) {
    this.rotateObject = r == true;
  }
  set canvasWidth(width) {
    this.width = width;
  }

  set canvasHeigth(height) {
    this.height = height;
  }
  set cameraPosition({ x, y, z }) {
    if (x) this.cameraX = x;
    if (y) this.cameraY = y;
    if (z) this.cameraZ = z;
  }
  get canvasWidth() {
    return this.width;
  }
  get canvasHeigth() {
    return this.height;
  }
  installOnCanvas(canvasRef) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef
    });
    canvasRef.width = this.width;
    canvasRef.height = this.height;
    renderer.setClearColor(0x111111);
    renderer.setSize(this.width, this.height);
    this.controls = new OrbitControls(this.camera, canvasRef);
    this.controls.target.set(0, 0, 0);
    this.controls.keys = {
      LEFT: null, //left arrow
      UP: null, // up arrow
      RIGHT: null, // right arrow
      BOTTOM: null // down arrow,
    };
    this.hundleKeys = e => {
      if (e.keyCode === 37) {
        this.camera.position.x += 0.05;
      } else if (e.keyCode === 38) {
        this.camera.position.z += 0.05;
      } else if (e.keyCode === 39) {
        this.camera.position.x -= 0.05;
      } else if (e.keyCode === 40) {
        this.camera.position.z -= 0.05;
      }
    };

    this.controls.panSpeed = 0.1;
    this.controls.enableZoom = true;
    // this.controls.autoRotate = true;
    const animate = () => {
      this.controls.update();
      if (this.lastObj && this.rotateObject)
        this.lastObj.scene.rotation.y += 0.005;
      renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };
    animate();
    this.renderer = renderer;
    this.renderer.domElement.addEventListener('keydown', this.hundleKeys);

    return renderer;
  }
  removeLast() {
    if (this.lastObj) this.scene.remove(this.lastObj.scene);
  }
  addObject(object) {
    this.removeLast();
    this.scene.add(object.scene);
    this.lastObj = object;
    this.controls.target.set(0, 0, 1);
    this.camera.lookAt(object);
  }
  addSprite(sprite) {
    this.scene.children.map(el => this.scene.remove(el));
    this.scene.add(sprite);
  }
  onUnMount() {
    this.renderer.domElement.removeEventListener('keydown', this.hundleKeys);
  }
  static GLTFLoader(gltfUrl, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        gltfUrl,
        gltf => {
          resolve(gltf);
          var parser = gltf.parser;
        },
        progress,
        reject
      );
    });
  }
  static ImageLoader(imgPath, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(
        imgPath,
        map => {
          const material = new THREE.SpriteMaterial({
            map: map,
            color: 0xffffff
          });
          const sprite = new THREE.Sprite(material);
          resolve(sprite);
        },
        progress,
        reject
      );
    });
  }
  static TextureLoader(texturePath, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(texturePath, resolve, progress, reject);
    });
  }
  static CubeTextureLoader(
    path,
    cubeTextures = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    progress = () => {}
  ) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.CubeTextureLoader();
      loader.setPath(path);
      loader.load(cubeTextures, resolve, progress, reject);
    });
  }
  static RGBELoader(rgbePath, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const loader = new RGBELoader();
      loader.setDataType(TextureDataType);
      loader.load(rgbePath, resolve, progress, reject);
    });
  }
  static OBJLoader(objUrl, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.OBJLoader();
      loader.load(objUrl, resolve, progress, reject);
    });
  }
  static MTLLoader(mtlUrl, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const MTLloader = new THREEMTLLoader();
      MTLloader.load(mtlUrl, resolve, progress, reject);
    });
  }
  static FBXLoader(fbxUrl, progress = () => {}) {
    return new Promise((resolve, reject) => {
      const _FBXLoader = new THREEFBXLoader();
      _FBXLoader.load(fbxUrl, resolve, progress, reject);
    });
  }
  static textureArrayToObj(textureArray) {
    const retObj = {};
    const isEmpty = true;
    if (textureArray instanceof Array) {
      for (let i = 0; i < textureArray.length; i++) {
        const txt = textureArray[i];
        if (txt.match(/(_baseColor)|(_diffuse)/i)) {
          retObj.map = txt;
          isEmpty = false;
        } else if (txt.match(/_Roughness/i)) {
          retObj.roughnessMap = txt;
          isEmpty = false;
        } else if (txt.match(/(_metallic)|(_metalness)/i)) {
          retObj.metalnessMap = txt;
          isEmpty = false;
        } else if (txt.match(/_normal/i)) {
          retObj.normalMap = txt;
          isEmpty = false;
        } else if (txt.match(/_emissive/i)) {
          retObj.emissiveMap = txt;
          isEmpty = false;
        } else if (txt.match(/(_spec)|(_specular)/i)) {
          retObj.bumpMap = txt;
          isEmpty = false;
        }
      }
      if (isEmpty) {
        retObj.map = textureArray[0];
      }
    }
    return retObj;
  }
}

export default ModelViewer;
