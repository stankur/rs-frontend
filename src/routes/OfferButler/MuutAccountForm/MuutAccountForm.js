import React, { useEffect, useState } from "react";
import ContainerDiv from "../../../commonComponents/OfferPanel/ContainerDiv";

import styled from "styled-components";

import globalData from "../../../globalData";
import CustomMuutAccountForm from "./CustomMuutAccountForm";
import {
	MuutAccountBodyContainer,
	MuutAccountFormContainer,
	MuutAccountFooterContainer,
} from "./commonComponents";
import ErrorNotification from "../../../commonComponents/Notification/ErrorNotification";

const AccountTypeSlider = styled(ContainerDiv)`
	width: 10px;
	height: 5px;
	position: absolute;
	background-color: white;
	top: 50%;
	transform: translateY(-50%);

	left: ${(props) => (props.isDefaultAccountType ? "4px" : "56px")};
	transition: all 100ms ease-in-out;
`;

const AccountTypePicker = function ({
	isDefaultAccountType,
	setIsDefaultAccountType,
}) {
	return (
		<div
			style={{
				display: "flex",
				gap: "10px",
				alignItems: "center",
				justifyContent: "center",
				paddingBottom: "10px",
				paddingLeft: "5px",
				paddingTop: "10px",
				borderBottom: "1px solid rgba(4, 3, 3, 0.1)",
				borderTop: "1px solid rgba(0, 0, 0, 0.1)",
			}}
		>
			<div
				style={{ fontWeight: "normal" }}
				onClick={() => setIsDefaultAccountType(true)}
			>
				default
			</div>
			<ContainerDiv
				onClick={() => setIsDefaultAccountType(!isDefaultAccountType)}
				style={{
					width: "70px",
					height: "14px",
					position: "relative",
					backgroundColor: "#c3f9f999",
				}}
			>
				<AccountTypeSlider
					isDefaultAccountType={isDefaultAccountType}
				/>
			</ContainerDiv>
			<div
				style={{ fontWeight: "normal" }}
				onClick={() => setIsDefaultAccountType(false)}
			>
				custom
			</div>
		</div>
	);
};


const MuutAccountForm = function ({ userData, muutAccount, requestUpdate }) {
	const [isDefaultAccountType, setIsDefaultAccountType] = useState(true);

	const [submitError, setSubmitError] = useState(false);
	const [requestChangeAccount, setRequestChangeAccount] = useState(false);

	useEffect(() => {
		return setSubmitError(false);
	}, [userData]);

	const submitMuutCredentials = (muutUsername, muutPassword) => {
		const bearerToken = localStorage.getItem("Authorization");
		setRequestChangeAccount(false);

		if (!userData) {
			return setSubmitError(
				"You must be logged in to be able to set up offer butler service!"
			);
		}

		console.log(
			"the username: " + muutUsername + ". The password: " + muutPassword
		);

		fetch(
			globalData.API_URL +
				"/api/forum-bot/users/" +
				userData.user._id +
				"/muut-account",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: bearerToken,
				},
				body: JSON.stringify({
					username: muutUsername,
					password: muutPassword,
				}),
			}
		)
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return setSubmitError(response["error"]["message"]);
				}

				return requestUpdate();
			});
	};

	const handleUseDefaultAccount = (event) => {
		event.preventDefault();
		const bearerToken = localStorage.getItem("Authorization");
		setRequestChangeAccount(false);

		if (!userData) {
			return setSubmitError(
				"You must be logged in to be able to set Offer Butler up!"
			);
		}

		fetch(
			globalData.API_URL +
				"/api/forum-bot/users/" +
				userData.user._id +
				"/muut-account",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: bearerToken,
				},
				body: JSON.stringify({}),
			}
		)
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return setSubmitError(response["error"]["message"]);
				}

				return requestUpdate();
			});
	};

	const handleCancelChangeAccount = () => setRequestChangeAccount(false);

	if (muutAccount && !requestChangeAccount) {
        console.log("I actually went here")
		return (
			<MuutAccountFormContainer>
				<MuutAccountBodyContainer>
					<div>
						This is your registered UBC Housing Forum Account:{" "}
					</div>
					<div>
						<span style={{ fontWeight: "bold" }}>Username: </span>
						<span>{muutAccount["username"]}</span>
					</div>
				</MuutAccountBodyContainer>
				<MuutAccountFooterContainer>
					<button onClick={() => setRequestChangeAccount(true)}>
						Change Housing Account
					</button>
				</MuutAccountFooterContainer>
			</MuutAccountFormContainer>
		);
	}
    

	return (
		<MuutAccountFormContainer>
			<AccountTypePicker
				isDefaultAccountType={isDefaultAccountType}
				setIsDefaultAccountType={setIsDefaultAccountType}
			/>
			{!isDefaultAccountType ? (
				<CustomMuutAccountForm
					userData={userData}
					submitMuutCredentials={submitMuutCredentials}
					requestChangeAccount={requestChangeAccount}
					cancelChangeAccount={handleCancelChangeAccount}
				/>
			) : (
				<>
					<MuutAccountBodyContainer>
						<div
							style={{
								display: "flex",
								flexGrow: 1,
								gap: "30px",
								justifyContent: "center",
								alignItems: "center",
								paddingBottom: "15px",
							}}
						>
							<img
								src="/plainButler.png"
								alt="Room Switch Butler"
								width="70px"
								height="70px"
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									gap: "10px",
								}}
							>
								<div>
									<span style={{ fontWeight: "bold" }}>
										Display Name:{" "}
									</span>
									<span>RoomSwitchButler</span>
								</div>
								<div>
									<span style={{ fontWeight: "bold" }}>
										Username:{" "}
									</span>
									<span>testeruser</span>
								</div>
							</div>
						</div>
					</MuutAccountBodyContainer>
					<MuutAccountFooterContainer>
						{requestChangeAccount && (
							<button onClick={handleCancelChangeAccount}>
								Cancel Change Account
							</button>
						)}
						<button onClick={handleUseDefaultAccount}>
							Use This Account
						</button>
						{!!submitError && (
							<ErrorNotification>{submitError}</ErrorNotification>
						)}
					</MuutAccountFooterContainer>
				</>
			)}
		</MuutAccountFormContainer>
	);
};

export default MuutAccountForm;
