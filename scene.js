"use strict";

//  Adapted from classes scripts
//      Daniel Rohmer tutorial
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
//      AND
//      https://www.ua.pt/pt/p/10320092
// 		J. Madeira - April 2021
//
//
//
//      Vítor Dias 98396



// Object structure to store the scene elements
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  
    renderer: null,
};


// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initScene(sceneElements);
loadObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);



// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

// To keep track of the keyboard - WASD and Arrows
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

// Key down events
function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 39: //right arrow
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 40: //down arrow
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 37: //left key
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
        case 38: //up arrow
            keyW = true;
            break;
    }
}

// Key up events
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 39: //right arrow
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 40: //down arrow
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 37: //left arrow
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
        case 38: //up arrow
            keyW = false;
            break;
    }
}


//////////////////////////////////////////////////////////////////
//  CAR CREATION FUNCTIONS
//////////////////////////////////////////////////////////////////
function createWheel(){
    const cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 1, 35 );
    const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0x444444} );

    const rimGeometry = new THREE.RingGeometry( 0.5, 0.75, 7 );
    const rimMaterial = new THREE.MeshBasicMaterial( { color: 0xdddddd, side: THREE.DoubleSide } );

    const tire = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    const rim = new THREE.Mesh( rimGeometry, rimMaterial );

    rim.translateY(0.51);
    rim.rotateX(Math.PI/2);

    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    rim.receiveShadow = true;

    const wheel = new THREE.Group();
    wheel.add(tire);
    wheel.add(rim);

    return wheel
}

function createCar(){
    const carX = 4;
    const carZ = 9;

    const bottomGeometry = new THREE.BoxGeometry(carX, 2, carZ);
    const bottomMaterial = new THREE.MeshPhongMaterial({ color:0xff0000 });
    const bottomObject = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottomObject.name = "bottomObject";
    bottomObject.geometry.computeBoundingBox();

    bottomObject.translateY(2);
    
    bottomObject.castShadow = true;
    bottomObject.receiveShadow = true;

    const leftFrontWheel = createWheel();
    leftFrontWheel.translateX(-carX/2);
    leftFrontWheel.translateZ(-carZ/2 + 2.2);
    leftFrontWheel.translateY(1);
    leftFrontWheel.rotateZ(Math.PI / 2);
    leftFrontWheel.name = "leftFrontWheel";

    const rightFrontWheel = createWheel();
    rightFrontWheel.translateX(carX/2);
    rightFrontWheel.translateZ(-carZ/2 + 2.2);
    rightFrontWheel.translateY(1);
    rightFrontWheel.rotateZ(-Math.PI / 2);
    rightFrontWheel.name = "rightFrontWheel";


    const rightBackWheel = createWheel();
    rightBackWheel.translateX(carX/2);
    rightBackWheel.translateZ(carZ/2 - 2.2);
    rightBackWheel.translateY(1);
    rightBackWheel.rotateZ(-Math.PI / 2);
    rightBackWheel.name = "rightBackWheel";


    const leftBackWheel = createWheel();
    leftBackWheel.translateX(-carX/2);
    leftBackWheel.translateZ(carZ/2 - 2.2);
    leftBackWheel.translateY(1);
    leftBackWheel.rotateZ(Math.PI / 2);
    leftBackWheel.name = "leftBackWheel";

    
    const length = 1.8, width = 0.5;
    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );
    const extrudeSettings = {
        steps: 2,
        depth: 5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 2
    };
    const roofGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const roofMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    const roofMesh = new THREE.Mesh( roofGeometry, roofMaterial ) ;

    roofMesh.castShadow = true;
    roofMesh.receiveShadow = true;
    
    roofMesh.translateY(3);
    roofMesh.translateX(-0.9);
    roofMesh.translateZ(-1.5);



    const length2 = 3.6, width2 = 1.6;
    const shape2 = new THREE.Shape();
    shape2.moveTo( 0,0 );
    shape2.lineTo( 0, width2 );
    shape2.lineTo( length2, width2 );
    shape2.lineTo( length2, 0 );
    shape2.lineTo( 0, 0 );
    const extrudeSettings2 = {
        steps: 2,
        depth: 4.5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 2
    };
    const roofTopGeometry = new THREE.ExtrudeGeometry( shape2, extrudeSettings2 );
    const roofTopMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    const roofTopMesh = new THREE.Mesh( roofTopGeometry, roofTopMaterial ) ;
    
    roofTopMesh.castShadow = true;
    roofTopMesh.receiveShadow = true;

    roofTopMesh.translateY(3);
    roofTopMesh.translateX(-1.8);
    roofTopMesh.translateZ(-1.2);


    const group = new THREE.Group();
    group.add(bottomObject)
    group.add(rightFrontWheel);
    group.add(leftFrontWheel);
    group.add(rightBackWheel);
    group.add(leftBackWheel);
    group.add(roofMesh);
    group.add(roofTopMesh);
    group.name = "car";
    group.add(sceneElements.camera);

    return group
}


//////////////////////////////////////////////////////////////////
//  LANDSCAPE/ROAD CREATION FUNCTIONS
//////////////////////////////////////////////////////////////////
function createLandscape(){
    const texture = new THREE.TextureLoader().load( "textures/grass.jpg" );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 50, 50 ); 

    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(0, 200, 0)', side: THREE.DoubleSide, map: texture });
    const groundObject = new THREE.Mesh(groundGeometry, groundMaterial);

    groundObject.translateY(-0.1);
    groundObject.rotateX(Math.PI / 2);
    
    groundObject.receiveShadow = true;

    const wallTexture = new THREE.TextureLoader().load( "textures/forest.jpg" );
    wallTexture.wrapS = wallTexture.wrapT = wallTexture.RepeatWrapping;

    const wallGeometry = new THREE.PlaneGeometry(1000, 500);
    const wallMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: wallTexture });
    
    const wallObjectFront = new THREE.Mesh(wallGeometry, wallMaterial);
    const wallObjectRight = new THREE.Mesh(wallGeometry, wallMaterial);
    const wallObjectLeft = new THREE.Mesh(wallGeometry, wallMaterial);
    const wallObjectBack = new THREE.Mesh(wallGeometry, wallMaterial);

    //wallObjectFront.rotateX(Math.PI/2);
    wallObjectFront.translateZ(-500);
    wallObjectFront.translateY(100);

    wallObjectRight.translateX(500);
    wallObjectRight.rotateY(Math.PI/2);
    wallObjectRight.translateY(100);

    wallObjectLeft.translateX(-500);
    wallObjectLeft.rotateY(- Math.PI/2);
    wallObjectLeft.translateY(100);

    wallObjectBack.translateZ(500);
    wallObjectBack.translateY(100);
    wallObjectBack.rotateY(Math.PI);

    const landscape = new THREE.Group()
    landscape.add(groundObject);
    landscape.add(wallObjectBack);
    landscape.add(wallObjectRight);
    landscape.add(wallObjectLeft);
    landscape.add(wallObjectFront);

    return landscape;
}

function createRoadPart(length){
    const planeGeometry = new THREE.PlaneGeometry(25, length);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 'rgb(50, 50, 50)', side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    mesh.receiveShadow = true;

    return mesh;
}

function createCurvePart(size, cutting = 1.5){
    const curveGeometry = new THREE.RingGeometry( size - 25, size, 32 , 30, 0, cutting);
    const curveMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(50, 50, 50)', side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( curveGeometry, curveMaterial );
    mesh.receiveShadow = true;

    return mesh;
}


function createCircuit(){

    const planeObject = createRoadPart(300);

    planeObject.rotateX( Math.PI / 2);
    planeObject.translateY(150);


    const curveMesh = createCurvePart(110);
    curveMesh.rotateX(-Math.PI/2);
    curveMesh.translateX(-97.5);

    const part2Road = createRoadPart(200);
    part2Road.rotateX( Math.PI / 2);
    part2Road.translateX(-189.5);
    part2Road.translateY(-97.5);
    part2Road.rotateZ(-Math.PI / 2);


    const curvePart2 = createCurvePart(110);
    curvePart2.rotateX(-Math.PI/2);
    curvePart2.translateX(-280);
    curvePart2.translateY(195);
    curvePart2.rotateZ(Math.PI);


    const curvePart3 = createCurvePart(110);
    curvePart3.rotateX(-Math.PI/2);
    curvePart3.translateX(-280);
    curvePart3.translateY(185);
    curvePart3.rotateZ(Math.PI / 2);


    const part3Road = createRoadPart(600);
    part3Road.rotateX( Math.PI / 2);
    part3Road.translateX(20);
    part3Road.translateY(-282.5);
    part3Road.rotateZ(-Math.PI / 2);

    const curvePart4 = createCurvePart(110);
    curvePart4.rotateX(-Math.PI/2);
    curvePart4.translateX(311);
    curvePart4.translateY(185);

    const curvePart5 = createCurvePart(110);
    curvePart5.rotateX(-Math.PI/2);
    curvePart5.translateX(311.5);
    curvePart5.translateY(196);
    curvePart5.rotateZ( - Math.PI/2 );

    const curvePart6 = createCurvePart(110);
    curvePart6.rotateX(-Math.PI/2);
    curvePart6.translateX(311.5);
    curvePart6.translateY(1);
    curvePart6.rotateZ(Math.PI / 2);
    
    const part4Road = createRoadPart(95);
    part4Road.rotateX( Math.PI / 2);
    part4Road.translateX(214.5);
    part4Road.translateY(33);

    const curvePart7 = createCurvePart(175, 0.7);
    curvePart7.rotateX(-Math.PI/2);
    curvePart7.translateX(149.25);
    curvePart7.translateY(-320);

    const part5Road = createRoadPart(50);
    part5Road.rotateX( Math.PI / 2);
    part5Road.translateX(260);
    part5Road.translateY(195.5);
    part5Road.rotateZ(-Math.PI / 5);

    const curvePart8 = createCurvePart(175, 0.7);
    curvePart8.rotateX(-Math.PI/2);
    curvePart8.translateX(377);
    curvePart8.translateY(-80);
    curvePart8.rotateZ( - Math.PI);

    const curvePart9 = createCurvePart(175);
    curvePart9.rotateX(-Math.PI/2);
    curvePart9.translateX(150);
    curvePart9.translateY(-299.5);
    curvePart9.rotateZ( - Math.PI / 2);

    const curvePart10 = createCurvePart(175);
    curvePart10.rotateX(-Math.PI/2);
    curvePart10.translateX(162.5);
    curvePart10.translateY(-300);
    curvePart10.rotateZ( Math.PI);

    const circuit = new THREE.Group();
    circuit.add(planeObject);
    circuit.add(curveMesh);
    circuit.add(part2Road);
    circuit.add(curvePart2);
    circuit.add(curvePart3);
    circuit.add(part3Road);
    circuit.add(curvePart4);
    circuit.add(curvePart5);
    circuit.add(curvePart6);
    circuit.add(part4Road);
    circuit.add(curvePart7);
    circuit.add(part5Road);
    circuit.add(curvePart8);
    circuit.add(curvePart9);
    circuit.add(curvePart10);
    return circuit;
}



// Create the race checkpoints
function createCheckpoint(x, z){
    const geometry = new THREE.CylinderGeometry( 12.5, 12.5, 100, 40 );
    const material = new THREE.MeshPhongMaterial( {color: 0xaaaaff, transparent: true, opacity:0.5} );
    const cp = new THREE.Mesh( geometry, material );
    cp.translateY(50);
    cp.translateX(x);
    cp.translateZ(z);
    return cp;
}

// Fill the checkpoints array
function fillCheckpoints(){
    const checkpoints = [];

    const cp1 = createCheckpoint(-376,-200);
    const cp2 = createCheckpoint(408 , -200);
    const cp3 = createCheckpoint(215,0);
    const cp4 = createCheckpoint(310,300);
    const cp5 = createCheckpoint(150,460);
    const cp6 = createCheckpoint(0,0);

    checkpoints.push(cp1);
    checkpoints.push(cp2);
    checkpoints.push(cp3);
    checkpoints.push(cp4);
    checkpoints.push(cp5);
    checkpoints.push(cp6);

    return checkpoints;
}

// Create and insert in the scene graph the models of the 3D scene
function loadObjects(sceneGraph) {

    sceneGraph.add(createLandscape());
    sceneGraph.add(createCircuit());
    sceneGraph.add(createCar());
}

// Create the car bounding box
var carBoundingBox = new THREE.Box3();

// Bounding helper for the car
// Uncomment if needed
//const boundinghelper = new THREE.Box3Helper( carBoundingBox, 0xffff00 );
//sceneElements.sceneGraph.add( boundinghelper );

// Set the checkpoints array
const checkpointsArray = fillCheckpoints();

// Set the first checkpoint and add the bounding sphere
var checkpoint = checkpointsArray[0];
checkpoint.name = "checkpoint1";
sceneElements.sceneGraph.add(checkpoint);    

var checkpointCoordinates = new THREE.Vector3(checkpoint.position.x, 0, checkpoint.position.z);
var checkpointBoundingSphere = new THREE.Sphere(checkpointCoordinates, 12.5);


// Car accelaration values
var accelaration = 0;

// Index to use the checkpoints array
var checkpointIndex = 1;

// Car part dimensions to handle the wheels
var car_x = 2;
var car_z = 2.3;

// Function for frame updates
function computeFrame(time) {

    const car = sceneElements.sceneGraph.getObjectByName("car");
    const leftFrontWheel = car.getObjectByName("leftFrontWheel");
    const rightFrontWheel = car.getObjectByName("rightFrontWheel");
    const leftBackWheel = car.getObjectByName("leftBackWheel");
    const rightBackWheel = car.getObjectByName("rightBackWheel");


    if (keyD) {     // Rotate right
        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(- Math.PI/2);

        leftFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        leftFrontWheel.rotateZ( - Math.PI/2);
        leftFrontWheel.rotateX( - Math.PI / 2);
        if(accelaration < 0)     // If gowing forward
            car.rotateY(-0.01);
        else if(accelaration > 0)// If gowing backwards
            car.rotateY(0.01);
    }
    else{           // Reset wheels position due to 2 keys pressed conflict
        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(Math.PI / 2);
        rightFrontWheel.rotateX(- Math.atan(car_x/car_z));

        leftFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        leftFrontWheel.rotateZ(-Math.PI / 2);
        leftFrontWheel.rotateX(- Math.atan(car_x/car_z));
    }
    if (keyW ) {    // Accelarate
        if(accelaration > -2)
            accelaration -= 0.003;
    }
    if (keyA) {     // Rotate Left
        leftFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        leftFrontWheel.rotateZ(Math.PI / 2);

        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(-Math.PI / 2);
        rightFrontWheel.rotateX(-Math.PI / 2);
        if(accelaration < 0)           // If going forwards
            car.rotateY(0.01);       
        else if(accelaration > 0)      // If going backwards
            car.rotateY(0.01 * -1);
    }
    if (keyS) {         // Break/Go backwards
        if (accelaration < 0.3) 
            accelaration += 0.01;
    }
    if(!keyW && !keyS && accelaration < 0){ // If no movement key is pressed and moving forward
        accelaration += 0.002
    }
    else if(!keyW && !keyS && accelaration > 0) // If no movement key is pressed and moving backward
        accelaration -= 0.002
    if(keyD && keyA && accelaration != 0){ // Solve key conflit
        if( accelaration < 0)   // If going forwards
            car.rotateY(0.01);
        else                    // If going backwards
            car.rotateY(0.01 * -1);
    }
    if(!keyD && !keyA){  // If no rotating key is pressed
        leftFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        leftFrontWheel.rotateZ(Math.PI / 2);
        leftFrontWheel.rotateX(- Math.atan(car_x/car_z));

        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(-Math.PI / 2);
        rightFrontWheel.rotateX(- Math.atan(car_x/car_z));
    }

    // Set accelaration to 0 if it is close from that
    if(accelaration > -0.001 && accelaration < 0.001 ){
        accelaration = 0;
    }

    // Move the car
    car.translateZ(accelaration);

    // Rotate the wheels
    rightFrontWheel.rotateY(accelaration*50);
    leftFrontWheel.rotateY(-accelaration*50);
    rightBackWheel.rotateY(accelaration);
    leftBackWheel.rotateY(-accelaration);

    // Keep the camera looking at the car
    sceneElements.camera.lookAt(car.position );

    // Reset car bounding box
    carBoundingBox.copy( car.getObjectByName("bottomObject").geometry.boundingBox ).applyMatrix4( car.getObjectByName("bottomObject").matrixWorld );

    // Check if car hits a checkpoint
    if( carBoundingBox.intersectsSphere(checkpointBoundingSphere)){
        sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("checkpoint" + checkpointIndex));
        if(checkpointIndex > 5)
        checkpointIndex = 0;
        checkpoint = checkpointsArray[checkpointIndex++];
        checkpoint.name = "checkpoint" + checkpointIndex;
        sceneElements.sceneGraph.add(checkpoint);
        checkpointCoordinates = new THREE.Vector3(checkpoint.position.x, 0, checkpoint.position.z);
        checkpointBoundingSphere = new THREE.Sphere(checkpointCoordinates, 12.5);
    }

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}
