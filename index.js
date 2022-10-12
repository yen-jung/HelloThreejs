
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import * as mouseevent from "./MouseEvent.js";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import * as listener from './Listener.js'


let renderer, scene, camera;
const objects = [];
let plane;




init();
render();
animate();




// 畫面初始化
function init() {
  
  scene = new THREE.Scene();

  // 相機設定
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(300, 300, 300);
  camera.lookAt(scene.position)

  // 三軸座標輔助
  let axes = new THREE.AxesHelper(20);
  axes.name="test";
  scene.add(axes)

 
  // 渲染器設定
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  
  //load GLTF

  const gltfLoad=new GLTFLoader;
  gltfLoad.load('CV_building.gltf', function (gltfScene){
  scene.add(gltfScene.scene); 
  
  
  });

  

  // 簡單的 spotlight 
  let spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(1000, -4000, 3000)
  scene.add(spotLight)
  let spotHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotHelper)



  // 將渲染出來的畫面放到網頁上的 DOM
  document.body.appendChild(renderer.domElement)
  
  createPlane();
  mouseevent.setVariable(camera,scene);
  document.addEventListener('mousemove', e=>{mouseevent.onMouseMove(e)});
  document.addEventListener('click', e=>{mouseevent.mouseclick(e)});
  document.addEventListener('mouseup', e=>{mouseevent.onmouseup(e)});  
  document.addEventListener('mousedown', e=>{mouseevent.mousedown(e)});  
  

  listener.setVariable(camera,scene);
  document.addEventListener( 'keydown', e=>{listener.onKeyDown(e)});
  document.addEventListener( 'keyup', e=>{listener.onKeyUp(e)});
  document.addEventListener( 'mousewheel', e=>{listener.onWheel(e)});
  document.addEventListener( 'mouseup', e=>{listener.onMouseUP(e)});
  document.addEventListener( 'mousedown', e=>{listener.onMouseDown(e)});
  // document.addEventListener( 'mousemove', e=>{listener.onPointerMove(e)});
  
}

function animate() {
  requestAnimationFrame(animate);

  

}

function render() {
    requestAnimationFrame(render);
    renderer.setClearColor(0xeeeeee, 1.0);
    renderer.render(scene, camera); 

    
}


window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  
 
});

   //簡單的地板
function createPlane(){
  const geometry = new THREE.PlaneGeometry( 1000, 1000 );
  geometry.rotateX( - Math.PI / 2 );

  plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
  scene.add( plane );

  
  const gridHelper = new THREE.GridHelper( 1000, 20 );
      scene.add( gridHelper );

  }
    

 


