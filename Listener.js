let INTERSECTED,rotate,draging;
const pointer = new THREE.Vector2();
const firstPointer = new THREE.Vector2();
let _scene, _camera,raycaster;

function setVariable(camera,scene){
    _camera = camera
    _scene = scene
    raycaster = new THREE.Raycaster()
}

function onKeyDown(event) {
    if(event.key == 'Shift')
    {
        rotate = true
    }
}

function onKeyUp(event){
    if(event.key == 'shift')
    {
        rotate = false
    }
}

function onWheel(event)
{
    _camera.fov += event.wheelDelta * 0.02
    _camera.updateProjectionMatrix()
}

function onMouseDown(event)
{
    if (event.button==1)
    {
        firstPointer.x = event.clientX
        firstPointer.y = event.clientY
        draging = true
    }
    if (event.button==0)
    {
        
    }
    
}

function onMouseUP(event)
{
    if (event.button==1)
    {
        draging=false
    }
}

// function onPointerMove(event) {
//     if(draging & !rotate)
//     {
//         _camera.position.x += (firstPointer.x-event.clientX)/3000
//         _camera.position.z += (firstPointer.y-event.clientY)/3000
//     }
//     if(draging & rotate)
//     {
//         _camera.quaternion.y -= event.movementX/1000
//         _camera.quaternion.x -= event.movementY/1000
//     }
    
//     pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
//     pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1

//     raycaster.setFromCamera(pointer,_camera)
//     let intersects = raycaster.intersectObjects( _scene.children, false )
//     if ( intersects.length > 0 ) {
//         if ( INTERSECTED != intersects[0].object & intersects[0].object.name!="axes") {
//             if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex )
//             INTERSECTED = intersects[ 0 ].object
//             INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
//             INTERSECTED.material.emissive.setHex( 0xfff000 )
//         }
//     } else {
//         if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex )
//         INTERSECTED = null
//     }   
// }
  
  export {setVariable, onKeyDown, onKeyUp, onWheel, onMouseDown, onMouseUP};