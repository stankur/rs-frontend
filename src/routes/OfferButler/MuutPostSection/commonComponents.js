import React from "react";import ErrorNotification from "../../../commonComponents/Notification/ErrorNotification";
import ContainerDiv from "../../../commonComponents/OfferPanel/ContainerDiv";
import Title from "../../../commonComponents/Title";

const MuutPostFormContainer = function ({ muutAccount, children }) {
	return (
		<ContainerDiv style={{ gap: "20px", flexGrow: 2, flexBasis: "400px" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					flexGrow: 1,
				}}
			>
				<Title style={{ backgroundColor: "#f5f1d3e6" }}>
					Post Information
					<div
						style={{
							fontWeight: "normal",
							textAlign: "justify",
							textJustify: "inter-character",
						}}
					>
						Relevant information about the post that will be
						regularly uploaded to UBC Housing Forum uploaded to UBC
						Housing Forum
					</div>
				</Title>
				{!muutAccount && (
					<ErrorNotification>
						<span>
							You have to register a UBC Housing Forum Account
							before being able to set up the post information
						</span>
					</ErrorNotification>
				)}
			</div>
			{children}
		</ContainerDiv>
	);
};

const MuutPostBodyContainer = function ({ children }) {
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

const MuutPostFooterContainer = function ({ children }) {
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


export {
	MuutPostFormContainer,
	MuutPostBodyContainer,
	MuutPostFooterContainer,
};