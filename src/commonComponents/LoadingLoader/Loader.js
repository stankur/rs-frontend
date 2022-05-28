import React from "react";

import styled, {keyframes} from "styled-components";

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

const Centered = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function Loader({ size, duration }) {
	return (
		<Centered>
			<RotatingImage
				src="/transparentSwitchLogo.png"
				width={size ? size : "200px"}
				alt="lol"
                duration={duration}
			/>
		</Centered>
	);
}

export default Loader;
