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
    orbitControl: null,  
    firstPersonControl: null,
    renderer: null,
    clock: null,
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
var keyD = false, keyA = false, keyS = false, keyW = false, key1 = false, key2 = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
var cameraType = "ORBIT";
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
        case 49: //no 1 key
            key1 = true;
            break;
        case 50: //no 2 key
            key2 = true;
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
        case 49: //no 1 key
            key1 = false;
            break;
        case 50: //no 2 key
            key2 = false;
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

    const wheel = new THREE.Object3D();
    wheel.add(tire);
    wheel.add(rim);

    return wheel
}

function createSteeringWheel(){
    const steerGeometry = new THREE.RingGeometry( 0.5, 0.3, 1 );
    const steerMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide } );
    const steerMesh = new THREE.Mesh( steerGeometry, steerMaterial );

    steerMesh.translateY(3);
    steerMesh.translateZ(-1.8);
    steerMesh.rotateZ(Math.PI / 6);

    const torusGeometry = new THREE.TorusGeometry( 0.5, 0.1, 15, 100, 5 );
    const torus = new THREE.Mesh( torusGeometry, steerMaterial );

    torus.translateY(3);
    torus.translateZ(-1.8);
    torus.rotateZ(4 * Math.PI / 6 + 0.1);

    torus.name = "torus";
    steerMesh.name = "steer";

    const group = new THREE.Object3D();
    group.add(steerMesh);
    group.add(torus);

    return group;
}

function createCar(colorSelected, dummy = false){
    const carX = 4;
    const carZ = 9;

    const bottomGeometry = new THREE.BoxGeometry(carX, 2, carZ);
    const bottomMaterial = new THREE.MeshPhongMaterial({ color:colorSelected, transparent: true, opacity:0 });
    const bottomObject = new THREE.Mesh(bottomGeometry, bottomMaterial);
    if(dummy == false)
        bottomObject.name = "bottomObject";
    bottomObject.geometry.computeBoundingBox();

    bottomObject.translateY(2);
    
    bottomObject.castShadow = true;
    bottomObject.receiveShadow = true;

    const sideGeometry = new THREE.BoxGeometry( 9, 2, 0.5 );
    const frontGeometry = new THREE.BoxGeometry( 4, 2, 0.5 );
    const topGeometry = new THREE.BoxGeometry( 2, 4, 0.5 );
    const botGeometry = new THREE.BoxGeometry( 9, 4, 1.2 );
    const botMaterial = new THREE.MeshPhongMaterial( {color: 0x555555, side: THREE.DoubleSide} );
    const sideMaterial = new THREE.MeshPhongMaterial( {color: colorSelected, side: THREE.DoubleSide} );
    const side1 = new THREE.Mesh( sideGeometry, sideMaterial );
    const side2 = new THREE.Mesh( sideGeometry, sideMaterial );
    const front = new THREE.Mesh(frontGeometry, sideMaterial);
    const back = new THREE.Mesh(frontGeometry, sideMaterial);
    const bot = new THREE.Mesh(botGeometry, botMaterial);
    const top = new THREE.Mesh(topGeometry, sideMaterial);
    
    side1.translateY(2);
    side1.translateX(1.9);
    side1.rotateY(Math.PI / 2);

    side1.castShadow = true;
    side1.receiveShadow = true;

    side2.translateY(2);
    side2.translateX(-1.9);
    side2.rotateY(Math.PI / 2);

    side2.castShadow = true;
    side2.receiveShadow = true;

    front.translateY(2);
    front.translateZ(-4.3);

    front.castShadow = true;
    front.receiveShadow = true;

    back.translateY(2);
    back.translateZ(4.3);

    back.castShadow = true;
    back.receiveShadow = true;

    bot.translateY(1.5);
    bot.rotateY(Math.PI / 2);
    bot.rotateX(Math.PI / 2);

    bot.castShadow = true;
    bot.receiveShadow = true;

    top.translateZ(-3);
    top.translateY(2.7);
    top.rotateY(Math.PI / 2);
    top.rotateX(Math.PI / 2);

    top.castShadow = true;
    top.receiveShadow = true;

    const leftFrontWheel = createWheel();
    leftFrontWheel.translateX(-carX/2);
    leftFrontWheel.translateZ(-carZ/2 + 2.2);
    leftFrontWheel.translateY(1);
    leftFrontWheel.rotateZ(Math.PI / 2);
    if(dummy == false)
        leftFrontWheel.name = "leftFrontWheel";

    const rightFrontWheel = createWheel();
    rightFrontWheel.translateX(carX/2);
    rightFrontWheel.translateZ(-carZ/2 + 2.2);
    rightFrontWheel.translateY(1);
    rightFrontWheel.rotateZ(-Math.PI / 2);
    if(dummy == false)
        rightFrontWheel.name = "rightFrontWheel";


    const rightBackWheel = createWheel();
    rightBackWheel.translateX(carX/2);
    rightBackWheel.translateZ(carZ/2 - 2.2);
    rightBackWheel.translateY(1);
    rightBackWheel.rotateZ(-Math.PI / 2);
    
    if(dummy == false)
        rightBackWheel.name = "rightBackWheel";


    const leftBackWheel = createWheel();
    leftBackWheel.translateX(-carX/2);
    leftBackWheel.translateZ(carZ/2 - 2.2);
    leftBackWheel.translateY(1);
    leftBackWheel.rotateZ(Math.PI / 2);

    if(dummy == false)
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
    const roofMaterial = new THREE.MeshPhongMaterial( { color: colorSelected , transparent: true, opacity:0.3 } );
    const roofMesh = new THREE.Mesh( roofGeometry, roofMaterial ) ;

    roofMesh.castShadow = true;
    roofMesh.receiveShadow = true;
    
    roofMesh.translateY(3);
    roofMesh.translateX(-0.9);
    roofMesh.translateZ(-1.5);

    
    const chairBotGeometry = new THREE.BoxGeometry(2, 2, 0.2);
    const chairMaterial = new THREE.MeshPhongMaterial({ color:0x222222 });
    const chairBot = new THREE.Mesh(chairBotGeometry, chairMaterial);

    chairBot.translateY(2.5);
    chairBot.rotateX(Math.PI / 2);

    const chairTopGeometry = new THREE.BoxGeometry(2.5, 2, 0.2);
    const chairTop = new THREE.Mesh(chairTopGeometry, chairMaterial);

    chairTop.translateY(3);
    chairTop.translateZ(1.5);
    chairTop.rotateZ(Math.PI / 2);
    chairTop.rotateY(- Math.PI / 10);


    const markGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.2, 35 );
    const markMaterial = new THREE.MeshPhongMaterial({ color:0x555555 });
    const markObject = new THREE.Mesh(markGeometry, markMaterial);

    if(dummy == false)
        markObject.name = "mark";

    markObject.translateZ(-4.5);
    markObject.translateY(3);
    markObject.rotateX(Math.PI / 2);


    const roofBaseGeometry = new THREE.BoxGeometry(0.5, 1.8, 0.5);
    const roofBaseMaterial = new THREE.MeshPhongMaterial({ color:colorSelected });
    const roofBase1 = new THREE.Mesh(roofBaseGeometry, roofBaseMaterial);
    const roofBase2 = new THREE.Mesh(roofBaseGeometry, roofBaseMaterial);
    const roofBase3 = new THREE.Mesh(roofBaseGeometry, roofBaseMaterial);
    const roofBase4 = new THREE.Mesh(roofBaseGeometry, roofBaseMaterial);

    roofBase1.castShadow = true;
    roofBase1.receiveShadow = true;
    roofBase2.castShadow = true;
    roofBase2.receiveShadow = true;
    roofBase3.castShadow = true;
    roofBase3.receiveShadow = true;
    roofBase4.castShadow = true;
    roofBase4.receiveShadow = true;

    roofBase1.translateY(3.8);
    roofBase1.translateZ(-2);
    roofBase1.translateX(-1.8);

    roofBase2.translateY(3.8);
    roofBase2.translateZ(4);
    roofBase2.translateX(-1.8);

    roofBase3.translateY(3.8);
    roofBase3.translateZ(4);
    roofBase3.translateX(1.8);

    roofBase4.translateY(3.8);
    roofBase4.translateZ(-2);
    roofBase4.translateX(1.8);


    const roofTopGeometry = new THREE.BoxGeometry(4, 0.5, 6.8);
    const roofTopMaterial = new THREE.MeshPhongMaterial({ color:colorSelected });
    const roofTop = new THREE.Mesh(roofTopGeometry, roofTopMaterial);

    roofTop.castShadow = true;
    roofTop.receiveShadow = true;

    roofTop.translateY(4.5);
    roofTop.translateZ(1);

    const steeringWheel = createSteeringWheel();
    if(dummy == false)
        steeringWheel.name = "steeringWheel";


    const group = new THREE.Object3D();
    group.add(bottomObject)
    group.add(side1);
    group.add(side2);
    group.add(front);
    group.add(back);
    group.add(bot);
    group.add(rightFrontWheel);
    group.add(leftFrontWheel);
    group.add(rightBackWheel);
    group.add(leftBackWheel);
    group.add(roofMesh);
    group.add(top);
    group.add(chairBot);
    group.add(chairTop);
    group.add(roofBase1);
    group.add(roofBase2);
    group.add(roofBase3);
    group.add(roofBase4);
    group.add(roofTop);
    group.add(steeringWheel);
    if(dummy == false){
        group.name = "car";
        group.add(sceneElements.camera);
    }
    group.add(markObject);

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

    const dummyCar = createCar(0x0000ff, true);
    dummyCar.translateX(20);
    dummyCar.translateZ(10);
    dummyCar.rotateY(Math.PI / 2);
    const dummyCar2 = createCar(0x00ffff, true);
    dummyCar2.translateX(20);
    dummyCar2.translateZ(20);
    dummyCar2.rotateY(Math.PI / 2);
    const dummyCar3 = createCar(0xffffff, true);
    dummyCar3.translateX(20);
    dummyCar3.translateZ(30);
    dummyCar3.rotateY(Math.PI / 2);
    const dummyCar4 = createCar(0xff00ff, true);
    dummyCar4.translateX(20);
    dummyCar4.translateZ(40);
    dummyCar4.rotateY(Math.PI / 2);
    const dummyCar5 = createCar(0x00000, true);
    dummyCar5.translateX(20);
    dummyCar5.translateZ(50);
    dummyCar5.rotateY(Math.PI / 2);
    const dummyCar6 = createCar(0x00ff00, true);
    dummyCar6.translateX(-20);
    dummyCar6.translateZ(10);
    dummyCar6.rotateY(- Math.PI / 2);
    const dummyCar7 = createCar(0xff0000, true);
    dummyCar7.translateX(-20);
    dummyCar7.translateZ(20);
    dummyCar7.rotateY(- Math.PI / 2);
    const dummyCar8 = createCar(0x5500ff, true);
    dummyCar8.translateX(-20);
    dummyCar8.translateZ(30);
    dummyCar8.rotateY(- Math.PI / 2);
    const dummyCar9 = createCar(0x0055ff, true);
    dummyCar9.translateX(-20);
    dummyCar9.translateZ(40);
    dummyCar9.rotateY(- Math.PI / 2);
    const dummyCar10 = createCar(0xff0055, true);
    dummyCar10.translateX(-20);
    dummyCar10.translateZ(50);
    dummyCar10.rotateY(- Math.PI / 2);

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
    circuit.add(dummyCar)
    circuit.add(dummyCar2)
    circuit.add(dummyCar3)
    circuit.add(dummyCar4)
    circuit.add(dummyCar5)
    circuit.add(dummyCar6)
    circuit.add(dummyCar7)
    circuit.add(dummyCar8)
    circuit.add(dummyCar9)
    circuit.add(dummyCar10)
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
    sceneGraph.add(createCar(0xff0000));
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
document.getElementById("checkpoints").innerHTML = "CHECKPOINT: 0/" + checkpointsArray.length;
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


var steeringWheelAngle = 0;

var cameraControl = false;

var laps = 0;

// Function for frame updates
function computeFrame(time) {

    const car = sceneElements.sceneGraph.getObjectByName("car");

    const leftFrontWheel = car.getObjectByName("leftFrontWheel");
    const rightFrontWheel = car.getObjectByName("rightFrontWheel");
    const leftBackWheel = car.getObjectByName("leftBackWheel");
    const rightBackWheel = car.getObjectByName("rightBackWheel");

    const steer = car.getObjectByName("steeringWheel").getObjectByName("steer");
    const torus = car.getObjectByName("steeringWheel").getObjectByName("torus");



    if (keyD) {     // Rotate right
        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(- Math.PI/2);

        steer.rotation.z = (-Math.PI / 4) + Math.PI / 6;
        torus.rotation.z = (-Math.PI / 4) + (4 * Math.PI / 6 + 0.1);

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

        steer.rotation.z = (Math.PI / 4) + (Math.PI / 6);
        torus.rotation.z = (Math.PI / 4) + (4 * Math.PI / 6 + 0.1);

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
        else{                    // If going backwards
            car.rotateY(0.01 * -1);
        }

        steer.rotation.z = (Math.PI / 4) + (Math.PI / 6);
        torus.rotation.z = (Math.PI / 4) + (4 * Math.PI / 6 + 0.1);
    }
    if(!keyD && !keyA){  // If no rotating key is pressed
        leftFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        leftFrontWheel.rotateZ(Math.PI / 2);
        leftFrontWheel.rotateX(- Math.atan(car_x/car_z));

        rightFrontWheel.lookAt(car.position.x, car.position.y + 1, car.position.z);
        rightFrontWheel.rotateZ(-Math.PI / 2);
        rightFrontWheel.rotateX(- Math.atan(car_x/car_z));

        steer.rotation.z = (Math.PI / 6);
        torus.rotation.z = 4 * Math.PI / 6 + 0.1;
    }

    if((key1 && cameraType == "FPS") || cameraControl == true){
        if(cameraControl == false)
            sceneElements.firstPersonControl.enabled = false;
        else{
            sceneElements.orbitControl.enabled = false;
            cameraControl = false;
        }

        cameraType = "ORBIT"
        sceneElements.orbitControl = new THREE.OrbitControls(sceneElements.camera, sceneElements.renderer.domElement);
        sceneElements.orbitControl.screenSpacePanning = true;
        sceneElements.orbitControl.maxPolarAngle = Math.PI / 2;
        sceneElements.orbitControl.maxZoom = 100;

        sceneElements.camera.position.set(0, 6, 20)
    }
    else if(key2  && cameraType == "ORBIT" ){
        cameraType = "FPS"

        sceneElements.firstPersonControl = new THREE.FlyControls( sceneElements.camera, sceneElements.renderer.domElement );
        sceneElements.firstPersonControl.rollSpeed = 1;
        sceneElements.firstPersonControl.movementSpeed = 0;
        sceneElements.firstPersonControl.dragToLook = true;

        sceneElements.orbitControl.enabled = false;

        sceneElements.camera.position.set(0,4,0);
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


    // Reset car bounding box
    carBoundingBox.copy( car.getObjectByName("bottomObject").geometry.boundingBox ).applyMatrix4( car.getObjectByName("bottomObject").matrixWorld );

    // Check if car hits a checkpoint
    if( carBoundingBox.intersectsSphere(checkpointBoundingSphere)){
        sceneElements.sceneGraph.remove(sceneElements.sceneGraph.getObjectByName("checkpoint" + checkpointIndex));
        if(checkpointIndex > 5){
            checkpointIndex = 0;
            laps++;
            document.getElementById("laps").innerHTML = "LAPS: " + laps;
        }
        checkpoint = checkpointsArray[checkpointIndex++];
        document.getElementById("checkpoints").innerHTML = "CHECKPOINT: " +  (checkpointIndex - 1) + "/" + checkpointsArray.length;
        checkpoint.name = "checkpoint" + checkpointIndex;
        sceneElements.sceneGraph.add(checkpoint);
        checkpointCoordinates = new THREE.Vector3(checkpoint.position.x, 0, checkpoint.position.z);
        checkpointBoundingSphere = new THREE.Sphere(checkpointCoordinates, 12.5);
    }

    if( cameraType == "FPS"){
        sceneElements.firstPersonControl.update( sceneElements.clock.getDelta() );
    }
    else if(cameraType == "ORBIT")
        sceneElements.camera.lookAt(car.position.x, car.position.y + 2, car.position.z);


    const cameraPosition = new THREE.Vector3().setFromMatrixPosition(sceneElements.camera.matrixWorld);
    if(cameraPosition.x > 500 || cameraPosition.x < -500)
        cameraControl = true;
    if(cameraPosition.z > 500 || cameraPosition.z < -500)
        cameraControl = true;

    if(car.position.x > 500 )
        car.position.x = 499;
    else if(car.position.x < -500)
        car.position.x = -499;
    if(car.position.z > 500 )
        car.position.z = 499 ;
    else if(car.position.z < -500)
        car.position.z = -499;

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}
