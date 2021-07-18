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

import Loader from '../Loader';

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
	const video = useRef(null);
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
		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then(stream => {
				video.current.srcObject = stream;
				video.current.play();
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const displaySize = {
			width: video.current.width,
			height: video.current.height
		};
		canvas.current.width = displaySize.width;
		canvas.current.height = displaySize.height;

		matchDimensions(displaySize, canvas.current);

		if (result) {
			const resizedDetections = resizeResults(result, displaySize);
			draw.drawDetections(canvas.current, resizedDetections);
			draw.drawFaceLandmarks(canvas.current, resizedDetections);
		}
	}, [result]);

	return (
		<FaceReaderContainer>
			{
				result ?
					null :
					<Loader message="Detecting faces..." />
			}
			<video ref={video} width="400" height="300" onLoadedMetadata={() => printFaceLandmarks(video)} ></video>
			<canvas ref={canvas} />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);