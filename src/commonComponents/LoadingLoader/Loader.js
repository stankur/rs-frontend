import React from "react";

import styled, { keyframes } from "styled-components";
import CenteredDiv from "../CenteredDiv";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotatingImage = styled.img`
	animation: ${rotate} 2.5s ease-in-out infinite alternate;
	animation-duration: ${(props) => {
		if (props.duration) {
			return props.duration;
		}
	}};
`;

function Loader({ size, duration, src }) {
	return (
		<CenteredDiv>
			<RotatingImage
				src={src ? src : "/transparentGray.png"}
				width={size ? size : "200px"}
				alt="Room Switch"
				duration={duration}
			/>
		</CenteredDiv>
	);
}

export default Loader;
