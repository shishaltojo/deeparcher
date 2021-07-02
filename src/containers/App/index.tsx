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
		const z = camera.position.z;
		const x = camera.position.x;

		let r:number = Math.sqrt(Math.pow(camera.position.z, 2) + Math.pow(camera.position.x, 2));
		let theta:number = Math.atan2(x, z);

		switch(e.key) {
		case 'w': 
			r -= 0.01;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			break;
		case 'W':
			r -= 0.01;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			break;
		case 'A':
			theta -= Math.PI / 2;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 2;
			break;
		case 'a':
			theta -= Math.PI / 2;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 2;
			break;
		case 's':
			r += 0.01;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			break;
		case 'S':
			r += 0.01;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			break;
		case 'D':
			theta -= Math.PI / 2;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 2;
			break;
		case 'd':
			theta -= Math.PI / 2;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 2;
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
