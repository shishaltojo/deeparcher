import React, { useRef. useEffect } from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { detectSingleFace } from 'face-api.js';

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
    const detectionsWithLandmarks = await detectSingleFace(ref.current).withFaceLandmarks();
    console.log(detectionsWithLandmarks);
  }

  useEffect(() => {
    printFaceLandmarks(faceReader);
  }, [])

	return (
		<FaceReaderContainer>
			<img ref={faceReader} src={bestoTwice} alt="besto twice" />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);