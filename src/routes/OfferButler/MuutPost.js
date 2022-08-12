import React, { useEffect, useState } from "react";
import Title from "../../commonComponents/Title";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import SmallerInput from "../../commonComponents/OffersFilter/IntervalInput/SmallerInput";
import ColoredInput from "../../commonComponents/ColoredInput";

import dayjs from "dayjs";
import globalData from "../../globalData";
import ErrorNotification from "../../commonComponents/Notification/ErrorNotification";

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

const MuutPostFormContainer = function ({ muutAccount, children }) {
	console.log("this is the muut account to me: " + muutAccount);
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

function MuutPost({ muutAccount, userData, post, requestUpdate }) {
	const [requestChangeAccount, setRequestChangeAccount] = useState(false);

	const [submitError, setSubmitError] = useState(false);

	// states related to controlled inputs and their errors
	const [postTitle, setPostTitle] = useState("");
	const [postTitleError, setPostTitleError] = useState(
		"Title is a required field"
	);
	const [postBody, setPostBody] = useState("");

	const [hourInterval, setHourInterval] = useState("");
	const [hourIntervalError, setHourIntervalError] = useState(
		"Hour interval must be at least 3 hours"
	);

	const [nextUploadDate, setNextUploadDate] = useState(
		dayjs().format("YYYY-MM-DD")
	);
	const [nextUploadTime, setNextUploadTime] = useState(
		dayjs().format("HH:mm")
	);

	useEffect(() => {
		setSubmitError(false);
	}, [
		userData,
		muutAccount,
		postTitle,
		postBody,
		hourInterval,
		nextUploadDate,
		nextUploadTime,
		requestChangeAccount,
	]);

	const handlePostTitleChange = (event) => {
		const newPostTitle = event.target.value;
		if (newPostTitle.length === 0) {
			setPostTitleError("Title is a required field");
		} else if (newPostTitle.trim().search(/ /) === -1) {
			setPostTitleError("Title must have more than one word");
		} else if (newPostTitle.length > 80) {
			setPostTitleError("Title must have a maximum of 80 characters");
		} else {
			setPostTitleError(false);
		}

		return setPostTitle(newPostTitle);
	};

	const handlePostBodyChange = (event) => {
		const newPostBody = event.target.value;

		return setPostBody(newPostBody);
	};

	const handleHourIntervalChange = (event) => {
		const value = event.target.value;
		const newHourInterval = Number.parseInt(event.target.value);

		if (value === "") {
			return setHourInterval("");
		}

		if (!!newHourInterval && newHourInterval > 0) {
			if (!(newHourInterval >= 3)) {
				setHourIntervalError("Hour interval must be at least 3 hours");
			} else {
				setHourIntervalError(false);
			}

			return setHourInterval(newHourInterval);
		}
	};

	const handleUpdatePost = (event) => {
		event.preventDefault();

		if (!userData) {
			return setSubmitError(
				"You must be logged in to be able to set Offer Butler up!"
			);
		}

		if (!muutAccount) {
			return setSubmitError(
				"You have to register a UBC Housing Forum Account before being able to set up the post information"
			);
		}

		if (postTitleError) {
			return setSubmitError(postTitleError);
		}

		if (hourIntervalError) {
			return setSubmitError(hourIntervalError);
		}

		fetch(
			globalData.API_URL +
				"/api/forum-bot/users/" +
				userData.user._id +
				"/future-posts",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("Authorization"),
				},
				body: JSON.stringify({
					title: postTitle,
					body: postBody,
					hourInterval,
					nextPost: dayjs(nextUploadDate, "YYYY-MM-DD")
						.hour(Number.parseInt(nextUploadTime.substring(0, 2)))
						.minute(Number.parseInt(nextUploadTime.substring(3, 5)))
						.valueOf(),
				}),
			}
		)
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return setSubmitError(response["error"]["message"]);
				}

				setRequestChangeAccount(false);

				return requestUpdate();
			});
	};

	if (post && !requestChangeAccount) {
		return (
			<MuutPostFormContainer muutAccount={muutAccount}>
				<MuutPostBodyContainer>
					<div>This is your registered post information: </div>
					<div>
						<span style={{ fontWeight: "bold" }}>Title: </span>
						<span>{post["title"]}</span>
					</div>
					<div>
						<span
							style={{
								fontWeight: "bold",
							}}
						>
							Body:{" "}
						</span>
						<span style={{ whiteSpace: "pre-line" }}>
							{post["body"]}
						</span>
					</div>
					<div>
						<span style={{ fontWeight: "bold" }}>
							Hour Interval:{" "}
						</span>
						<span>{post["hourInterval"]}</span>
					</div>

					<div>
						<span style={{ fontWeight: "bold" }}>
							Next Post Date and Time (accurate within 1 hour):{" "}
						</span>
						<span>
							{dayjs(post["nextPost"]).format(
								"ddd, D MMM YYYY [at] HH:mm a"
							)}
						</span>
					</div>
				</MuutPostBodyContainer>
				<MuutPostFooterContainer>
					<button
						onClick={(event) => {
							event.preventDefault();

							return setRequestChangeAccount(true);
						}}
					>
						Change Post Information
					</button>
				</MuutPostFooterContainer>
			</MuutPostFormContainer>
		);
	}

	return (
		<MuutPostFormContainer muutAccount={muutAccount}>
			<MuutPostBodyContainer>
				<div>
					Title
					<div
						style={{
							fontStyle: "italic",
							color: "#f96c6c",
						}}
					>
						(Max. 80 Characters)
					</div>
				</div>

				<ColoredInput
					value={postTitle}
					onChange={handlePostTitleChange}
					error={postTitleError}
				/>
				{!!postTitleError && (
					<ErrorNotification>{postTitleError}</ErrorNotification>
				)}
				<div>Body</div>
				<textarea
					style={{
						resize: "none",
						height: "100%",
						fontFamily: "sans-serif",
						padding: "7px",
						borderRadius: "5px",
						border: "none",
						outline: "none",
						boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
					}}
					value={postBody}
					onChange={handlePostBodyChange}
				/>
				<div>
					Hour Interval{" "}
					<div
						style={{
							fontStyle: "italic",
							color: "#f96c6c",
						}}
					>
						(Min. 3 hours)
					</div>
				</div>
				<ColoredInput
					value={hourInterval}
					onChange={handleHourIntervalChange}
					error={hourIntervalError}
				/>
				{!!hourIntervalError && (
					<ErrorNotification>{hourIntervalError}</ErrorNotification>
				)}
				<div>
					Next Upload Date and Time{" "}
					<div
						style={{
							fontStyle: "italic",
							color: "#f96c6c",
						}}
					>
						(If you pick a time that is before now, the next upload
						time will be regarded as now)
					</div>
				</div>
				<div style={{ display: "flex", gap: "10px" }}>
					<SmallerInput
						type="date"
						value={nextUploadDate}
						onChange={(event) =>
							setNextUploadDate(
								dayjs(event.target.value).format("YYYY-MM-DD")
							)
						}
						style={{ flexGrow: 1 }}
					/>
					<SmallerInput
						type="time"
						value={nextUploadTime}
						onChange={(event) => {
							return setNextUploadTime(event.target.value);
						}}
						style={{ flexGrow: 1 }}
					/>
				</div>
			</MuutPostBodyContainer>
			<MuutPostFooterContainer>
				{requestChangeAccount && (
					<button
						onClick={(event) => {
							event.preventDefault();

							return setRequestChangeAccount(false);
						}}
					>
						Cancel Change Post Information
					</button>
				)}
				<button onClick={handleUpdatePost}>
					Regularly Upload this Post
				</button>
				{!!submitError && (
					<ErrorNotification>{submitError}</ErrorNotification>
				)}
			</MuutPostFooterContainer>
		</MuutPostFormContainer>
	);
}

export default MuutPost;
