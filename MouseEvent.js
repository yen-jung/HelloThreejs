import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.121.1/examples/jsm/utils/SkeletonUtils.js";

let _camera,_scene;
let currentIntersection = null;
let raycaster;
let mouse = new THREE.Vector2();
var localPoint = new THREE.Vector3();
let closestPoint = new THREE.Vector3();
let clicklis=[];
let colorlis=[];
let lastid=[];

let _render;



var edgeGeom = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(),
  new THREE.Vector3()
]);
var edge = new THREE.Line(edgeGeom, new THREE.LineBasicMaterial({
  color: "aqua"
}));




function setVariable(camera,scene){
    _camera=camera;
    _scene=scene;
    raycaster = new THREE.Raycaster();
}



  
  
       
    

 






  export{setVariable};
 