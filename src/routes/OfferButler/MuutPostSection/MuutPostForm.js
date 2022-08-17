import React, { useState, useEffect } from "react";
import ErrorNotification from "../../../commonComponents/Notification/ErrorNotification";
import SmallerInput from "../../../commonComponents/OffersFilter/IntervalInput/SmallerInput";
import ColoredInput from "../../../commonComponents/ColoredInput";

import {
	MuutPostFormContainer,
	MuutPostBodyContainer,
	MuutPostFooterContainer,
} from "./commonComponents";

import dayjs from "dayjs";
import globalData from "../../../globalData";

const ifDefinedDoElse = (object, doToObject, defaultFunction) => {
	return object ? doToObject(object) : defaultFunction();
};

const ifDefinedKeyElse = (object, key, defaultValue) => {
	return !!object ? object[key] : defaultValue;
};

const ifDefinedElse = (object, value, defaultValue) => {
	return !!object ? value : defaultValue;
};

function MuutPostForm({
	muutAccount,
	userData,
	post,
	requestUpdate,
	setRequestChangeAccount,
}) {
	const [submitError, setSubmitError] = useState(false);

	const [postTitle, setPostTitle] = useState(
		ifDefinedKeyElse(post, "title", "")
	);
	const [postTitleError, setPostTitleError] = useState(
		ifDefinedElse(post, "", "Title is a required field")
	);

	const [postBody, setPostBody] = useState(
		ifDefinedKeyElse(post, "body", "")
	);

	const [hourInterval, setHourInterval] = useState(
		ifDefinedKeyElse(post, "hourInterval", "")
	);
	const [hourIntervalError, setHourIntervalError] = useState(
		ifDefinedElse(post, "", "Hour interval must be at least 3 hours")
	);

	const [nextUploadDate, setNextUploadDate] = useState(
		ifDefinedDoElse(
			post,
			(post) => dayjs(post["nextPost"]).format("YYYY-MM-DD"),
			() => {
				return dayjs().format("YYYY-MM-DD");
			}
		)
	);

	const [nextUploadTime, setNextUploadTime] = useState(
		ifDefinedDoElse(
			post,
			(post) => dayjs(post["nextPost"]).format("HH:mm"),
			() => {
				return dayjs().format("HH:mm");
			}
		)
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
				{post && (
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

export default MuutPostForm;
