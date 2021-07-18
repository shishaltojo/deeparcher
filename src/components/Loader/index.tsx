import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoaderWrap = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF80;

  & > p {
    font-size: 30px;
  }
`;

const Loader = ({ message }) => {
	return (
		<LoaderWrap>
			<p>{ message }</p>
		</LoaderWrap>
	);
};

Loader.propTypes = {
	message: PropTypes.string,
};

export default Loader;