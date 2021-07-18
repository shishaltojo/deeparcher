import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { detectSingleFace, nets } from 'face-api.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import bestoTwice from '../../images/bestoTwice.jpg';

const FaceReaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &>img {
    max-height: 80vh;
  }
`;

const FaceReader = () => {
	const faceReader = useRef(null);
	const canvas = useRef(null);

	const printFaceLandmarks = async (ref:any) => {
		(async () => {
			await nets.ssdMobilenetv1.loadFromUri('/models');
			await nets.faceLandmark68Net.loadFromUri('/models');
			await nets.faceRecognitionNet.loadFromUri('/models');
		})()
			.then(() => {
				detectSingleFace(ref.current)
					.withFaceLandmarks()
					.withFaceDescriptor()
					.then(result => console.log(result));
			})
			.catch(err => {
				console.log(err);
			});

	};

	useEffect(() => {
		const displaySize = {
			width: faceReader.current.width,
			height: faceReader.current.height
		};

		printFaceLandmarks(faceReader);
		console.log(displaySize);
	}, []);

	return (
		<FaceReaderContainer>
			<img ref={faceReader} src={bestoTwice} alt="besto twice" />
			<canvas ref={canvas} />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);