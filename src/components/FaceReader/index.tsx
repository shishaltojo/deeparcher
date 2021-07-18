import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

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
	return (
		<FaceReaderContainer>
			<img src={bestoTwice} alt="besto twice" />
		</FaceReaderContainer>
	);
};

export default hot(module)(FaceReader);