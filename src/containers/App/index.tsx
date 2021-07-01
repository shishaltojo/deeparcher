import * as React from 'react';
import * as THREE from 'three';
import { hot } from 'react-hot-loader';
import { 
	BoxGeometry,
	Mesh,
	MeshNormalMaterial,
	PerspectiveCamera,
	Scene,
	WebGL1Renderer
} from 'three';

const App = () => {
	let camera:PerspectiveCamera, scene:Scene, renderer:WebGL1Renderer;
	let geometry:BoxGeometry, material:MeshNormalMaterial, mesh:Mesh;

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
	
	const animation = (time:number) => {
		mesh.rotation.x = time / 2000;
		mesh.rotation.y = time / 1000;

		renderer.render( scene, camera );
	};

	init();

	return (
		<div />
	);
};

export default hot(module)(App);
