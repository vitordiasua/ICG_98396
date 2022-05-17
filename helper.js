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


// Object containing all the functions regarding the scene initialization
const helper = {

    // Initialize scene
    initScene : function (sceneElements){

        // Create Scene and configure it
        sceneElements.sceneGraph = new THREE.Scene();
        
        // Browser window sizes
        const width = window.innerWidth;
        const height = window.innerHeight;


        // Create Camera 
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
        sceneElements.camera = camera;
        camera.position.set(0, 6, 20);



        // Create Ambient Light and PointLight
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.8)
        sceneElements.sceneGraph.add(ambientLight);

        const pointLight = new THREE.PointLight('rgb(255, 255, 255)', 1, 900 );
        pointLight.position.set(0,700,-20);
        sceneElements.sceneGraph.add(pointLight);

        // Enable Shadows created by the PointLight
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 2048 * 2;
        pointLight.shadow.mapSize.height = 2048 * 2;

        // Pointlight helper in case of need
        //const pointLightHelper = new THREE.PointLightHelper( pointLight );
        //sceneElements.sceneGraph.add( pointLightHelper );

        // Initialize and configure Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        // Enable shadow rendering
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create Orbit Controls around the camera
        sceneElements.control = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;


        // Connect the scene to the HTML element
        const htmlElement = document.querySelector("#scenario");
        htmlElement.appendChild(renderer.domElement);
    },

    // Render the scene
    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    }
}