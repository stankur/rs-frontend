import React from "react";
import ContainerDiv from "../../../commonComponents/OfferPanel/ContainerDiv";
import Title from "../../../commonComponents/Title";

const MuutAccountBodyContainer = function ({ children }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
				gap: "10px",
			}}
		>
			{children}
		</div>
	);
};

const MuutAccountFooterContainer = function ({ children }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "10px",
			}}
		>
			{children}
		</div>
	);
};

const MuutAccountFormContainer = function ({ children }) {
	return (
		<ContainerDiv style={{ width: "30vw", gap: "20px", minWidth: "400px" }}>
			<Title style={{ backgroundColor: "#c9e6f2a6" }}>
				UBC Housing Forum Account
				<div
					style={{
						fontWeight: "normal",
						textAlign: "justify",
						textJustify: "inter-character",
					}}
				>
					The account that will be used to post the scheduled post.
				</div>
			</Title>
			{children}
		</ContainerDiv>
	);
};

export {
	MuutAccountBodyContainer,
	MuutAccountFormContainer,
	MuutAccountFooterContainer,
};
