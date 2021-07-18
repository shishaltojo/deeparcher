import React, {
	useRef,
	useEffect,
	useState
} from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import {
	nets,
	detectSingleFace,
	matchDimensions,
	resizeResults,
	draw
} from 'face-api.js';
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

	&>canvas {
		position: absolute;
	}
`;

const FaceReader = () => {
	const faceReader = useRef(null);
	const canvas = useRef(null);
	const [result, setResult] = useState(null);

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
					.then(r => setResult(r));
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		printFaceLandmarks(faceReader);
	}, []);

	useEffect(() => {
		const displaySize = {
			width: faceReader.current.width,
			height: faceReader.current.height
		};
		canvas.current.width = displaySize.width;
		canvas.current.height = displaySize.height;

		matchDimensions(displaySize, canvas.current);

		if (result) {
			const resizedDetections = resizeResults(result, displaySize);
			draw.drawDetections(canvas.current, resizedDetections);
		}
	}, [result]);

	return (
		<FaceReaderContainer>
			<img ref={faceReader} src={bestoTwice} alt="besto twice" />
			<canvas ref={canvas} />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);