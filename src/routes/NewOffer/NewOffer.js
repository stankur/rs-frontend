import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import RoomForm from "./RoomForm";
import PreferenceForm from "./PreferenceForm";
import RoomExpanded from "../../commonComponents/OfferPanel/RoomsInformation/RoomExpanded";
import OnePreference from "../../commonComponents/OfferPanel/PreferencesInformation/OnePreference";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import HighlightedText from "../../commonComponents/OfferPanel/HighlightedText";
import ErrorNotification from "../../commonComponents/Notification/ErrorNotification";

import { getFilterOptions } from "../../mockData";
import dayjs from "dayjs";

import globalData from "../../globalData";

import useLastUpdatedOfferTime from "../../hooks/useLastAddedOfferTime";
import { useNavigate, useOutletContext } from "react-router-dom";

import styled from "styled-components";
import Loader from "../../commonComponents/LoadingLoader/Loader";
import Title from "../../commonComponents/Title";
import ShadowedHighlightedText from "../../commonComponents/OfferPanel/ShadowedHighlightedText";

const PageContainer = styled(ContainerDiv)`
	display: inline-flex;
	flex-direction: row;
	align-items: stretch;
	box-sizing: border-box;

	@media (max-width: 700px) {
		flex-direction: column-reverse;
	}
`;
const SmallSelect = styled(Select)`
	display: inline-flex;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
`;

function RemovableOnePreference({
	className,
	options,
	onePreference,
	identifier,
	removePreference,
}) {
	return (
		<div
			style={{ display: "inline-block" }}
			onClick={() => removePreference(identifier)}
		>
			<OnePreference
				className={className}
				options={options}
				onePreference={onePreference}
			/>
		</div>
	);
}

function RemovableRoomExpanded({ className, room, identifier, removeRoom }) {
	return (
		<div
			style={{ display: "inline-block" }}
			onClick={() => removeRoom(identifier)}
		>
			<RoomExpanded className={className} room={room} />
		</div>
	);
}

const CompactRoomExpanded = styled(RemovableRoomExpanded)`
	&:hover {
		background-color: #fdbebe84;
	}

	margin-top: 0;
`;

const CompactOnePreference = styled(RemovableOnePreference)`
	&:hover {
		background-color: #fdbebe84;
	}

	margin-top: 0;
`;

const CardsGroupContainer = styled(ContainerDiv)`
	display: inline-flex;
	flex-direction: column;
	align-items: stretch;
	flex-grow: 1;
`;

const CardsContainer = styled(ContainerDiv)`
	flex-grow: 1;
	flex-direction: row;
	align-content: flex-start;
	flex-wrap: wrap;
	min-height: 50px;
`;


const CurrentRoomsTitle = styled(Title).attrs(() => ({
	backgroundColor: "#f4e0f8e6",
}))``;

const PreferenceTitle = styled(Title).attrs(() => ({
	backgroundColor: "#c3f9f999",
}))``;

const AdditionalInformationTitle = styled(Title).attrs(() => ({
	backgroundColor: "#c9e6f2a6",
}))``;

const QuantitiesInformationTitle = styled(Title).attrs(() => ({
	backgroundColor: "#f5f1d3e6",
}))``;

const findOptionWithValue = (options) => {
	return (value) => {
		return options.find((option) => {
			return option.value === value;
		});
	};
};

function NewOffer() {
	const navigate = useNavigate();
	const [userData, setAuthorizationHeader] = useOutletContext();

	const [submitError, setSubmitError] = useState(false);

	useEffect(() => {
		setSubmitError(false);
	}, [userData]);

	const [numberOfPeople, setNumberOfPeople] = useState(1);
	const numberOfPeopleOptions = [
		{ value: 1, label: 1 },
		{ value: 2, label: 2 },
	];

	const [roomsWanted, setRoomsWanted] = useState(1);
	const getRoomsWantedOptions = (numberOfPeople) => {
		if (numberOfPeople === 1) {
			return [{ value: 1, label: 1 }];
		}

		return [
			{ value: 1, label: 1 },
			{ value: 2, label: 2 },
		];
	};

	const [signedRooms, setSignedRooms] = useState([]);
	const [signedPreference, setSignedPreference] = useState([]);
	const [additionalInformation, setAdditionalInformation] = useState("");

	const [lastUpdatedOfferTime, renew] = useLastUpdatedOfferTime();

	const roomsWantedOptions = getRoomsWantedOptions(numberOfPeople);

	useEffect(() => {
		if (
			!getRoomsWantedOptions(numberOfPeople)
				.map((option) => option.value)
				.includes(roomsWanted)
		) {
			return setRoomsWanted(
				getRoomsWantedOptions(numberOfPeople)[0].value
			);
		}
	}, [numberOfPeople, roomsWanted]);

	const checkDelayError = useCallback(() => {
		return dayjs(lastUpdatedOfferTime).add(15, "minute").isAfter(dayjs());
	}, [lastUpdatedOfferTime]);

	const getDelayErrorNotification = useCallback(() => {
		if (checkDelayError()) {
			return (
				<ErrorNotification>
					Sorry, you must wait until{" "}
					<span style={{ fontWeight: "bold" }}>
						{dayjs(lastUpdatedOfferTime)
							.add(15, "minute")
							.format("ddd, D MMM YYYY HH:mm")}
					</span>
					. The reason new offer creation is limited is because the
					requests could made in this app is limited by the hosting
					service provider.
				</ErrorNotification>
			);
		}

		return undefined;
	}, [lastUpdatedOfferTime, checkDelayError]);

	const checkNotSignedInError = useCallback(() => {
		return !userData;
	}, [userData]);

	const getNotSignedInErrorNotification = () => {
		if (checkNotSignedInError()) {
			return (
				<ErrorNotification>
					You must be logged in to be able to add a new offer!
				</ErrorNotification>
			);
		}

		return undefined;
	};

	if (userData === undefined) {
		return <Loader />;
	}

	if (lastUpdatedOfferTime === undefined) {
		return <Loader />;
	}

	const removeRoom = (identifier) => {
		setSignedRooms(
			signedRooms.filter(
				(signedRoom) =>
					!dayjs(signedRoom.date).isSame(dayjs(identifier))
			)
		);
	};

	const removePreference = (identifier) => {
		setSignedPreference(
			signedPreference.filter(
				(signedPreference) =>
					!dayjs(signedPreference.date).isSame(dayjs(identifier))
			)
		);
	};

	const constructOffer = () => {
		return {
			numberOfPeople: numberOfPeople,
			roomsWanted: roomsWanted,
			rooms: signedRooms.map((signedRoom) => signedRoom.room),
			preference: signedPreference.map(
				(signedPreference) => signedPreference.preference
			),
			user: userData.user._id,
			additionalInformation: additionalInformation,
		};
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (checkNotSignedInError()) {
			return setSubmitError("You must be signed in to add a new offer!");
		}

		if (checkDelayError()) {
			return setSubmitError(
				"You must wait for the amount of time stated on top to create a new offer!"
			);
		}

		if (signedRooms.length > numberOfPeople) {
			return setSubmitError(
				"Number of rooms must be less than or equal to number of people!"
			);
		}

		if (additionalInformation.length < 1) {
			return setSubmitError(
				"You haven't added any additional information, which is required."
			);
		}

		fetch(globalData.API_URL + "/api/offers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
			body: JSON.stringify({
				offer: constructOffer(),
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return console.log(response["error"]["message"]);
				}

				setSubmitError(false);
				renew();
				return navigate("/my-offers");
			})
			.catch((err) => {
				return setSubmitError(
					"Error encountered while submitting, please retry!"
				);
			});
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
			{checkNotSignedInError()
				? getNotSignedInErrorNotification()
				: checkDelayError()
				? getDelayErrorNotification()
				: false}
			<form onSubmit={handleSubmit}>
				<FormContainer>
					<CardsGroupContainer>
						<QuantitiesInformationTitle>
							Quantities Information
							<div style={{ fontWeight: "normal" }}>
								Number of people who are represented by this
								offer and the number of rooms you are looking
								for
							</div>
							<div
								style={{
									fontStyle: "italic",
									color: "#f96c6c",
								}}
							>
								Note that each offer could only represent a
								maximum number of 2 people (eg. you and your
								roomate).
							</div>
						</QuantitiesInformationTitle>
						<CardsContainer style={{ alignItems: "center" }}>
							<label htmlFor="numberOfPeople">
								Number of People:{" "}
							</label>
							<SmallSelect
								value={findOptionWithValue(
									numberOfPeopleOptions
								)(numberOfPeople)}
								onChange={(option) =>
									setNumberOfPeople(option.value)
								}
								name="numberOfPeople"
								id="numberOfPeople"
								options={numberOfPeopleOptions}
							/>
							<label htmlFor="roomsWanted">
								Number Of Rooms Wanted:{" "}
							</label>
							<SmallSelect
								value={findOptionWithValue(roomsWantedOptions)(
									roomsWanted
								)}
								onChange={(option) =>
									setRoomsWanted(option.value)
								}
								id="roomsWanted"
								name="roomsWanted"
								options={roomsWantedOptions}
							/>
						</CardsContainer>
					</CardsGroupContainer>
					<PageContainer>
						<RoomForm
							notify={(newSignedRoom) => {
								if (signedRooms.length < 2) {
									return setSignedRooms([
										...signedRooms,
										newSignedRoom,
									]);
								}
							}}
						/>
						<CardsGroupContainer>
							<CurrentRoomsTitle>
								Current Rooms{" "}
								<span
									style={{
										fontStyle: "italic",
										color: "#f96c6c",
									}}
								>
									(Max. 2 Rooms)
								</span>
								<div style={{ fontWeight: "normal" }}>
									All the rooms associated with this offer
								</div>
							</CurrentRoomsTitle>

							<CardsContainer>
								{signedRooms.length > 0 ? (
									signedRooms.map((signedRoom) => {
										return (
											<CompactRoomExpanded
												removeRoom={removeRoom}
												room={signedRoom.room}
												identifier={signedRoom.date}
												key={signedRoom.date}
											/>
										);
									})
								) : (
									<div
										style={{
											color: "#838282",
											alignSelf: "center",
										}}
									>
										No room has been added. Selected rooms
										will appear here.
									</div>
								)}
							</CardsContainer>
						</CardsGroupContainer>
					</PageContainer>
					<PageContainer>
						<PreferenceForm
							notify={(newSignedPreference) =>
								setSignedPreference([
									...signedPreference,
									newSignedPreference,
								])
							}
						/>
						<CardsGroupContainer>
							<PreferenceTitle>
								Preference
								<div style={{ fontWeight: "normal" }}>
									Your preferred features in the new room(s)
								</div>
							</PreferenceTitle>
							<CardsContainer>
								{signedPreference.length > 0 ? (
									signedPreference.map((signedPreference) => {
										return (
											<CompactOnePreference
												options={
													getFilterOptions()["rooms"][
														"criteria"
													]
												}
												removePreference={
													removePreference
												}
												identifier={
													signedPreference.date
												}
												onePreference={
													signedPreference.preference
												}
												key={signedPreference.date}
											/>
										);
									})
								) : (
									<div
										style={{
											color: "#838282",
											alignSelf: "center",
										}}
									>
										No preference has been added. Selected
										preferences will appear here.
									</div>
								)}
							</CardsContainer>
						</CardsGroupContainer>
					</PageContainer>
					<CardsGroupContainer style={{ height: "40vh" }}>
						<AdditionalInformationTitle>
							Additional Information
							<div style={{ fontWeight: "normal" }}>
								Any additional details to be shown to other
								users and how you could be contacted about this
								offer
							</div>
						</AdditionalInformationTitle>
						<textarea
							style={{
								resize: "none",
								height: "100%",
								fontFamily: "sans-serif",
								padding: "7px",
							}}
							value={additionalInformation}
							onChange={(event) =>
								setAdditionalInformation(event.target.value)
							}
						/>
					</CardsGroupContainer>
				</FormContainer>
				<div
					style={{
						display: "flex",
						marginTop: "10px",
						marginBottom: "10px",
						gap: "7px",
					}}
				>
					<ContainerDiv>
						<button type="submit">Add New Offer</button>
					</ContainerDiv>
					{submitError && (
						<ErrorNotification style={{ flexGrow: 1 }}>
							{submitError}
						</ErrorNotification>
					)}
				</div>
			</form>
		</div>
	);
}

export default NewOffer;
