import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import golbalData from "../globalData";

import styled from "styled-components";
import ContainerDiv from "../commonComponents/OfferPanel/ContainerDiv";
import { useNavigate } from "react-router-dom";

const ColoredInput = styled.input`
	display: block;
	border-style: solid;
	border-color: ${(props) => {
		if (props.error) {
			return "red";
		}

		return "green";
	}};
	&:focus {
		outline: none !important;
	}
`;

const SubmitError = styled(ContainerDiv)`
	flex-direction: row;
	align-items: center;
`;

function SignUp() {
	const [userData, setAuthorizationHeader] = useOutletContext();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [usernameError, setUsernameError] = useState(true);
	const [passwordError, setPasswordError] = useState(true);

	const [submitError, setSubmitError] = useState(false);

	if (userData === undefined) {
		return;
	}

	if (userData) {
		return <div>You already have an account!</div>;
	}

	const handleUsernameChange = (event) => {
		const newUsername = event.target.value;

		if (newUsername.length < 1) {
			setUsernameError(true);
			setSubmitError(false);
		} else {
			setUsernameError(false);
			setSubmitError(false);
		}

		setUsername(newUsername);
	};

	const handlePasswordChange = (event) => {
		const newPassword = event.target.value;

		if (newPassword.length < 8) {
			setPasswordError(true);
			setSubmitError(false);
		} else {
			setPasswordError(false);
			setSubmitError(false);
		}

		setPassword(newPassword);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (usernameError && passwordError) {
			return setSubmitError(
				"username and password have an invalid format"
			);
		}
		if (usernameError) {
			return setSubmitError("username has an invalid format");
		}

		if (passwordError) {
			return setSubmitError("password has an invalid format");
		}

		fetch(golbalData.API_URL + "/authentication/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => {
				console.log(
					"this is thhe original response: " +
						JSON.stringify(response)
				);
				return response.json();
			})
			.then((response) => {
				console.log(
					"this is the parsed response: " + JSON.stringify(response)
				);

				if (response["error"]) {
					return setSubmitError(response["error"]["message"]);
				}

				setAuthorizationHeader(response["token"]);
				return navigate("/");
			})
			.catch((err) => {
				console.log(
					"this is the error: " +
						JSON.stringify(err, Object.getOwnPropertyNames(err))
				);
				setSubmitError("failed to connect to the server");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			{submitError !== false && (
				<div>
					<SubmitError>{submitError}</SubmitError>
				</div>
			)}
			<label htmlFor="username">Username</label>
			<ColoredInput
				error={usernameError}
				type="text"
				id="username"
				name="username"
				value={username}
				onChange={handleUsernameChange}
			/>
			{usernameError && <div>Must have length of at least 1</div>}
			<label htmlFor="password">Password</label>
			<ColoredInput
				error={passwordError}
				type="password"
				id="password"
				name="password"
				value={password}
				onChange={handlePasswordChange}
			/>
			{passwordError && <div>Must have length of at least 8</div>}
			<input type="submit" />
		</form>
	);
}

export default SignUp;