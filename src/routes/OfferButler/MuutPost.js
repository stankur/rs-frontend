import React, { useEffect, useState } from "react";
import Title from "../../commonComponents/Title";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import SmallerInput from "../../commonComponents/OffersFilter/IntervalInput/SmallerInput";
import ColoredInput from "../../commonComponents/ColoredInput";

import dayjs from "dayjs";
import globalData from "../../globalData";
import ErrorNotification from "../../commonComponents/Notification/ErrorNotification";
const useHasPost = function (userData, muutAccount) {
	const [post, setPost] = useState(undefined);
	const [updateRequest, setUpdateRequest] = useState(false);

	useEffect(() => {
		if (updateRequest) {
			setUpdateRequest(false);
		}

		if (userData === undefined || muutAccount === undefined) {
			return console.log("user data or muut account is still undefined");
		}

		if (!userData || !muutAccount) {
			return setPost(false);
		}

		fetch(
			globalData.API_URL +
				"/api/forum-bot/users/" +
				userData.user._id +
				"/future-posts",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("Authorization"),
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
                    console.log(response["error"]["message"])
					return setPost(false);
				}

				return setPost(response);
			});
	}, [userData, updateRequest, muutAccount]);

	const requestUpdate = () => {
		return setUpdateRequest(true);
	};

	return [post, requestUpdate];
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


const MuutPostFormContainer = function ({ muutAccount, children }) {
	return (
		<ContainerDiv style={{ gap: "20px", minWidth: "400px" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
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

function MuutPost({ muutAccount, userData }) {
	const [postTitle, setPostTitle] = useState("");
	const [postTitleError, setPostTitleError] = useState(
		"Title is a required field"
	);

	const [postBody, setPostBody] = useState("");

	const [hourInterval, setHourInterval] = useState("");
	const [hourIntervalError, setHourIntervalError] = useState(
		"Hour interval must be at least 24 hours"
	);

	const [nextUploadDate, setNextUploadDate] = useState(
		dayjs().format("YYYY-MM-DD")
	);
	const [nextUploadTime, setNextUploadTime] = useState(
		dayjs().format("HH:mm")
	);

	const [post, requestUpdate] = useHasPost(userData, muutAccount);

	const [submitError, setSubmitError] = useState(false);

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
			console.log(
				"I got here because new hour: " +
					newHourInterval +
					". And, new value: " +
					value
			);
			if (!(newHourInterval >= 24)) {
				setHourIntervalError("Hour interval must be at least 24 hours");
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

				return requestUpdate();
			});
	};

	if (post) {
		return <div>good, you have posted</div>;
	}

	return (
		<MuutPostFormContainer>
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
						(Min. 24 hours)
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
						onChange={(event) =>
							setNextUploadTime(
								dayjs(event.target.value).format("HH:mm")
							)
						}
						style={{ flexGrow: 1 }}
					/>
				</div>
			</MuutPostBodyContainer>
			<MuutPostFooterContainer>
				<button style={{ flexGrow: 1 }} onClick={handleUpdatePost}>
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
