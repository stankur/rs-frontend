import React from "react";
import Title from "../../commonComponents/Title";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import useHasMuutAccount from "../../hooks/forum-bot/useHasMuutAccount";

const useHasPost = function() {

}

function MuutPost() {
	return (
		<ContainerDiv>
			<Title style={{ backgroundColor: "#f5f1d3e6" }}>
				Post Information
				<div
					style={{
						fontWeight: "normal",
						textAlign: "justify",
						textJustify: "inter-character",
					}}
				>
					Relevant information about the post that will be regularly
					uploaded to UBC Housing Forum uploaded to UBC Housing Forum
				</div>
			</Title>
		</ContainerDiv>
	);
}

export default MuutPost