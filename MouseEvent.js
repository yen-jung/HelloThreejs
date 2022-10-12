import { SkeletonUtils } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/utils/SkeletonUtils.js";

let _camera,_scene;
let currentIntersection = null;
let raycaster;
let mouse = new THREE.Vector2();



function setVariable(camera,scene){
    _camera=camera;
    _scene=scene;
    raycaster = new THREE.Raycaster();

}




function onmouseup(event){
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, _camera);
  var intersects = raycaster.intersectObjects( _scene.children, true );
  currentIntersection = intersects[0].object;
  
  
 }

 function mousedown(event){

  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, _camera);
  var intersects = raycaster.intersectObjects( _scene.children, true );
  currentIntersection = intersects[0].object;
  if(intersects.length>0){
    var objcolor=currentIntersection.material.color;
    colorlis.push(objcolor);
    if(lastid[lastid.length-1]!=clicklis[clicklis.length-1]){
        clicklis[clicklis.length-1].material.color=new THREE.Color("rgb("+Math.round(colorlis[0].r*255)+','+Math.round(colorlis[0].g*255)+','+Math.round(colorlis[0].b*255)+")");
    }
    const intersect = intersects[ 0 ];
    const voxel = new THREE.Mesh( obj[obj.length-1].geometry, obj[obj.length-1].material );
    voxel.position.copy( intersect.point ).add( intersect.face.normal );
    voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
		_scene.add( voxel);
    
  }
 }

 
 let clicklis=[];
 let colorlis=[];
 let lastid=[];
 let mouseposition=[];
 function mouseclick(event){
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, _camera);
  var intersects = raycaster.intersectObjects( _scene.children, true );
  var newobjid=currentIntersection.uuid;
  var objid=currentIntersection;
  lastid.push(newobjid);
  clicklis.push(objid);
  currentIntersection = intersects[0].object;
  intersects[0].object.material.color=new THREE.Color("rgb(255,0,0)");
  mouseposition.push(mouse.x,mouse.y);
  var voxelclone=SkeletonUtils.clone(clicklis[clicklis.length-1]);
  obj.push(voxelclone);
    
 }

 function onMouseMove( event ){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, _camera );
    var intersects = raycaster.intersectObjects( _scene.children, true );
        if(intersects.length>0){
          if( currentIntersection !=intersects[0].object & intersects[0].object.name!="test1" ){
            if ( currentIntersection ) {
            currentIntersection.material.emissive.setHex( currentIntersection.currentHex );
            currentIntersection = intersects[0].object;
            currentIntersection.currentHex = currentIntersection.material.emissive.getHex();
            currentIntersection.material.emissive.setHex( 0xfffff );
            }
          }
      
        } else {
          if ( currentIntersection ) {
            currentIntersection.material.color.setHex( currentIntersection.currentHex );
          }
          
          
          currentIntersection = null;
        }
        
  };


 
  const ViewerUI = {
    copy: document.getElementById('copyBtn'),
    cut:document.getElementById('cutBtn')
  };
  const objects = [];
  // ViewerUI.copy.onclick = function(event){
   
  //   document.addEventListener('mousemove', e=>{copyobjmove(e)});
   
  // }


  function copyobj(event){
    
    if(intersects.length>0){
      
      const voxel = clicklis[0].object;
      voxel.position.x=mouseposition[0];
      voxel.position.y=mouseposition[1];
    
            copyobjmove();
            console.log(123);
    }

  };
  
  const obj = [];
  function copyobjmove(event){
   
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, _camera);
    var intersects = raycaster.intersectObjects( _scene.children, true );
  
    if(intersects.length>0){
      const intersect = intersects[ 0 ];
      
      obj[obj.length-1].material.color=new THREE.Color("rgb(255,0,0)");
      obj[obj.length-1].material.opacity=0.5;
      obj[obj.length-1].material.transparent = true;
      obj[obj.length-1].position.copy( intersect.point ).add( intersect.face.normal );
      obj[obj.length-1].position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
     
      console.log( obj[obj.length-1]);
      
       
    }
    _scene.add(obj[obj.length-1])
       

  }


  export{mouseclick,mousedown,onmouseup,setVariable,onMouseMove,copyobj, copyobjmove};
 