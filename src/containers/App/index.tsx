import * as React from 'react';
import * as THREE from 'three';
import { hot } from 'react-hot-loader';

const App = () => {
	let camera:THREE.PerspectiveCamera;
	let scene:THREE.Scene;
	let renderer:THREE.WebGL1Renderer;
	let geometry:THREE.BoxGeometry;
	let material:THREE.MeshNormalMaterial;
	let mesh:THREE.Mesh;

	const init = () => {
		
		camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			10
		);
		camera.position.z = 1;

		scene = new THREE.Scene();
		
		geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		material = new THREE.MeshNormalMaterial();
		
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );
		
		renderer = new THREE.WebGL1Renderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setAnimationLoop( animation );
		document.body.appendChild( renderer.domElement );
	};
	
	const cameraMovement = (e:any) => {
		switch(e.key) {
		case 'w': 
			camera.position.z -= 0.01;
			break;
		case 'W':
			camera.position.z -= 0.01;
			break;
		case 's':
			camera.position.z += 0.01;
			break;
		case 'S':
			camera.position.z += 0.01;
			break;
		default:
			break;
		}
	};

	const animation = (time:number) => {
		mesh.rotation.x = time / 2000;
		mesh.rotation.y = time / 1000;

		renderer.render( scene, camera );
	};

	init();

	document.addEventListener('keypress', e => cameraMovement(e));

	return (
		<div />
	);
};

export default hot(module)(App);
