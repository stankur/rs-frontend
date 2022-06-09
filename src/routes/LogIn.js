import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CenteredDiv from "../commonComponents/CenteredDiv";
import ContainerDiv from "../commonComponents/OfferPanel/ContainerDiv";
import SmallerInput from "../commonComponents/OffersFilter/IntervalInput/SmallerInput";

import globalData from "../globalData";

function LogIn() {
	const [userData, setAuthorizationHeader] = useOutletContext();
	const [submitError, setSubmitError] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	if (userData === undefined) {
		return;
	}

	if (userData) {
		return <div>You are already logged in!</div>;
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(globalData.API_URL + "/authentication/log-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return setSubmitError(response["error"]["message"]);
				}

				setSubmitError(false);

				setAuthorizationHeader(response["token"]);
				return navigate("/");
			})
			.catch((err) => setSubmitError("failed to connect to server"));
	};

	const handleUsernameChange = (event) => {
		setSubmitError(false);
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setSubmitError(false);
		setPassword(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CenteredDiv
				style={{ display: "inline-block", fontFamily: "sans-serif" }}
			>
				<ContainerDiv>
					{submitError && <div>{submitError}</div>}
					<span>Username</span>

					<SmallerInput
						value={username}
						onChange={handleUsernameChange}
					/>
					<span>Password</span>

					<SmallerInput
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<button type="submit">Log In</button>
				</ContainerDiv>
			</CenteredDiv>
		</form>
	);
}

export default LogIn;
