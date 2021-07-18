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
  
	const printFaceLandmarks = async (ref:any) => {
		nets.ssdMobilenetv1.loadFromUri('/models')
			.then(() => {
				detectSingleFace(ref.current).withFaceLandmarks();
			})
			.then(result => {
				console.log('Cho mama');
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			});

	};

	useEffect(() => {
		printFaceLandmarks(faceReader);
	}, []);

	return (
		<FaceReaderContainer>
			<img ref={faceReader} src={bestoTwice} alt="besto twice" />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);