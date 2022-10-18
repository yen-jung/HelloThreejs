
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import * as mouseevent from "./MouseEvent.js";
import * as listener from './Listener.js';
import { OutlinePass } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass  } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/shaders/FXAAShader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.121.1/examples/jsm/postprocessing/ShaderPass.js';


let renderer, scene, camera;
let plane;
let outlinePass,composer,effectFXAA;
let mouse = new THREE.Vector2();
let raycaster=new THREE.Raycaster();;


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
  camera.position.set(30, 30, 8);
  camera.lookAt(scene.position);

  // 三軸座標輔助
  let axes = new THREE.AxesHelper(20);
  axes.name="test";
  scene.add(axes)

 
  // 渲染器設定
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add( new THREE.AmbientLight( 0xaaaaaa, 0.2) );
  

  // 簡單的 spotlight 
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 80, -10);
  spotLight.castShadow=true;
  spotLight.shadow.mapSize.width=2000;
  spotLight.shadow.mapSize.height=2000;
  scene.add(spotLight);
  // let spotHelper = new THREE.SpotLightHelper(spotLight)
  // scene.add(spotHelper)

  

  // 將渲染出來的畫面放到網頁上的 DOM
  document.body.appendChild(renderer.domElement)
  
  createPlane();
  mouseevent.setVariable(camera,scene);
  
  
 
  listener.setVariable(camera,scene);
  document.addEventListener( 'keydown', e=>{listener.onKeyDown(e)});
  document.addEventListener( 'keyup', e=>{listener.onKeyUp(e)});
  document.addEventListener( 'mousewheel', e=>{listener.onWheel(e)});
  document.addEventListener( 'mouseup', e=>{listener.onMouseUP(e)});
  document.addEventListener( 'mousedown', e=>{listener.onMouseDown(e)});
  document.addEventListener( 'mousemove', e=>{listener.onPointerMove(e)});
  
 
  cube();

  composer = new EffectComposer( renderer );
  const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
  outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera,[cube]);
  outlinePass.renderToScreen=true;
  outlinePass.edgeStrength=3;
  // outlinePass.usepatternTexture=true;
  // outlinePass.visibleEdgeColor.set('yellow');

  composer.addPass( outlinePass );

  const textureLoader = new THREE.TextureLoader();
				textureLoader.load( './texture/tri_pattern.jpg', function ( texture ) {
					outlinePass.patternTexture = texture;
					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;
        })


  effectFXAA = new ShaderPass( FXAAShader );
  effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
  composer.addPass( effectFXAA );
  // renderer.domElement.style.touchAction = 'none';
	renderer.domElement.addEventListener( 'pointermove', onPointerMove );
  // composer.setSize( window.innerWidth, window.innerHeight );
  
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
	
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
 length
});

   //簡單的地板
function createPlane(){
  const geometry = new THREE.PlaneGeometry( 800, 800 );
  geometry.rotateX( - Math.PI / 2 );
  plane = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color:0xaaaaaa,visible: true} ) );
  plane.receiveShadow=true;
  plane.name='plane';
  scene.add( plane );
  
  // const gridHelper = new THREE.GridHelper( 1000, 20 );
  // scene.add( gridHelper );

  }

  //建立方體
function cube(){
  const cube = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  
  const head = new THREE.Mesh(cube, cubeMaterial);
  head.name="cube";
  head.position.set(0, 6, 0);
  head.castShadow=true;
  head.receiveShadow=true;
  
  scene.add( head );

}
 

function onPointerMove( event ) {

  // if ( event.isPrimary === false ) return;

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  checkIntersection();
  composer.render();


}

let selectedObjects = [];
function addSelectedObject( object ) {

  selectedObjects = [];
  selectedObjects.push( object );

}

function checkIntersection() {

  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObject( scene, true );
  for (var i=0; i < intersects.length ; i++){
    console.log(intersects[i].object.name);
  }
  
  if ( intersects.length >1) {
    const selectedObject = intersects[ 0 ].object;
    addSelectedObject( selectedObject);
    outlinePass.selectedObjects=selectedObjects;
    
    

  } else {

     //linePass.selectedObjects = [];

  }

}

