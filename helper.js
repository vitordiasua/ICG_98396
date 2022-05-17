"use strict";

const helper = {

    initScene : function (sceneElements){

        sceneElements.sceneGraph = new THREE.Scene();

        const width = window.innerWidth;
        const height = window.innerHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);

        sceneElements.camera = camera;

        camera.position.set(0, 6, 20);



        // Light
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.8)
        sceneElements.sceneGraph.add(ambientLight);

        const spotLight = new THREE.PointLight('rgb(255, 255, 255)', 1 );
        spotLight.position.set(0,10,-20);
        sceneElements.sceneGraph.add(spotLight);

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        const spotLightHelper = new THREE.PointLightHelper( spotLight );
        sceneElements.sceneGraph.add( spotLightHelper );
        spotLight.name = "light";

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        sceneElements.control = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;


        const htmlElement = document.querySelector("#scenario");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
}