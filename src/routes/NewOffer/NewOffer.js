import React, { useEffect, useState } from "react";
import Select from "react-select";

import RoomForm from "./RoomForm";
import PreferenceForm from "./PreferenceForm";
import RoomExpanded from "../../commonComponents/OfferPanel/RoomsInformation/RoomExpanded";
import OnePreference from "../../commonComponents/OfferPanel/PreferencesInformation/OnePreference";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import HighlightedText from "../../commonComponents/OfferPanel/HighlightedText";

import { getFilterOptions } from "../../mockData";
import dayjs from "dayjs";

import globalData from "../../globalData";

import useLastUpdatedOfferTime from "../../hooks/useLastAddedOfferTime";
import { useNavigate, useOutletContext } from "react-router-dom";

import styled from "styled-components";
import Loader from "../../commonComponents/LoadingLoader/Loader";
import ShadowedHighlightedText from "../../commonComponents/OfferPanel/ShadowedHighlightedText";

const PageContainer = styled(ContainerDiv)`
	display: inline-flex;
	flex-direction: row;
	align-items: stretch;
	box-sizing: border-box;
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
`;

const Title = styled(HighlightedText)`
	display: inline-flex;
	flex-direction: column;
	gap: 9px;

	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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

	if (userData === undefined) {
		return <Loader />;
	}

	if (!userData) {
		return (
			<ContainerDiv>
				You must be logged in to be able to add a new offer!
			</ContainerDiv>
		);
	}
	if (lastUpdatedOfferTime === undefined) {
		return <Loader />;
	}

	if (dayjs(lastUpdatedOfferTime).add(1, "hour").isAfter(dayjs())) {
		return (
			<div style={{ fontFamily: "sans-serif" }}>
				Sorry, you must wait until{" "}
				<ShadowedHighlightedText>
					{dayjs(lastUpdatedOfferTime)
						.add(1, "hour")
						.format("ddd, D MMM YYYY HH:mm")}
				</ShadowedHighlightedText>
				. The reason new offer creation is limited is because the
				requests could made in this app is limited by the hosting
				service provider.
			</div>
		);
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

		if (signedRooms.length > numberOfPeople) {
			return;
		}

		if (additionalInformation.length < 1) {
			return;
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

				renew();
				return navigate("/my-offers");
			})
			.catch((err) => {
				return console.log("error while submitting!");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormContainer>
				<CardsGroupContainer>
					<QuantitiesInformationTitle>
						Quantities Information
						<div style={{ fontWeight: "normal" }}>
							Number of people who are represented by this offer
							and the number of rooms you are looking for
						</div>
						<div style={{ fontStyle: "italic", color: "#f96c6c" }}>
							Note that each offer could only represent a maximum
							number of 2 people (eg. you and your roomate).
						</div>
					</QuantitiesInformationTitle>
					<CardsContainer style={{ alignItems: "center" }}>
						<label htmlFor="numberOfPeople">
							Number of People:{" "}
						</label>
						<SmallSelect
							value={findOptionWithValue(numberOfPeopleOptions)(
								numberOfPeople
							)}
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
							onChange={(option) => setRoomsWanted(option.value)}
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
							{signedRooms.map((signedRoom) => {
								return (
									<CompactRoomExpanded
										removeRoom={removeRoom}
										room={signedRoom.room}
										identifier={signedRoom.date}
										key={signedRoom.date}
									/>
								);
							})}
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
							{signedPreference.map((signedPreference) => {
								return (
									<CompactOnePreference
										options={
											getFilterOptions()["rooms"][
												"criteria"
											]
										}
										removePreference={removePreference}
										identifier={signedPreference.date}
										onePreference={
											signedPreference.preference
										}
										key={signedPreference.date}
									/>
								);
							})}
						</CardsContainer>
					</CardsGroupContainer>
				</PageContainer>
				<CardsGroupContainer style={{ height: "40vh" }}>
					<AdditionalInformationTitle>
						Additional Information
						<div style={{ fontWeight: "normal" }}>
							Any additional details to be shown to other users
							and how you could be contacted about this offer
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
			<ContainerDiv style={{ marginTop: "10px", marginBottom: "10px" }}>
				<button type="submit">Add New Offer</button>
			</ContainerDiv>
		</form>
	);
}

export default NewOffer;
