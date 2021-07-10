import * as React from 'react';
import * as THREE from 'three';
import { hot } from 'react-hot-loader';

const App = () => {
	let camera:THREE.PerspectiveCamera;
	let geometry:THREE.BoxGeometry;
	let ambientLight: THREE.AmbientLight;
	let material:THREE.MeshStandardMaterial;
	let mesh:THREE.Mesh;
	let renderer:THREE.WebGL1Renderer;
	let scene:THREE.Scene;
	let pointLight: THREE.PointLight;

	let skyboxGeo: THREE.BoxGeometry;
	let skybox: THREE.Mesh;

	const ft = new THREE.TextureLoader().load('../../textures/Daylight Box_Front.bmp');
	const bk = new THREE.TextureLoader().load('../../textures/Daylight Box_Back.bmp');
	const up = new THREE.TextureLoader().load('../../textures/Daylight Box_Top.bmp');
	const dn = new THREE.TextureLoader().load('../../textures/Daylight Box_Bottom.bmp');
	const rt = new THREE.TextureLoader().load('../../textures/Daylight Box_Right.bmp');
	const lf = new THREE.TextureLoader().load('../../textures/Daylight Box_Left.bmp');

	const materialArray = [
		new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide }),
		new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide }),
		new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }),
		new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide }),
		new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide }),
		new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide }),
	];

	const init = () => {	
		camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			30000
		);
		camera.position.z = 1;

		scene = new THREE.Scene();
		
		geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		material = new THREE.MeshStandardMaterial();
		
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );
		
		ambientLight = new THREE.AmbientLight( 0xb1def9, 0.1 );
		scene.add( ambientLight );

		pointLight = new THREE.PointLight( 0xff8787, 1, 0 );
		pointLight.position.set( -50, 10, -10 );
		scene.add( pointLight );

		skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
		skybox = new THREE.Mesh(skyboxGeo, materialArray);
		scene.add(skybox);

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
			theta -= Math.PI / 180;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 180;
			break;
		case 'a':
			theta -= Math.PI / 180;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y -= Math.PI / 180;
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
			theta += Math.PI / 180;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y += Math.PI / 180;
			break;
		case 'd':
			theta += Math.PI / 180;
			camera.position.z = r * Math.cos(theta);
			camera.position.x = r * Math.sin(theta);
			camera.rotation.y += Math.PI / 180;
			break;
		default:
			break;
		}
	};

	const animation = () => {
		renderer.render( scene, camera );
	};

	init();

	document.addEventListener('keypress', e => cameraMovement(e));

	return (
		<div />
	);
};

export default hot(module)(App);
