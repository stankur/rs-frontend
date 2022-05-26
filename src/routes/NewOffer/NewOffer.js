import React, { useEffect, useState } from "react";
import Select from "react-select";

import RoomForm from "./RoomForm";
import PreferenceForm from "./PreferenceForm";
import RoomExpanded from "../../commonComponents/OfferPanel/RoomsInformation/RoomExpanded";
import OnePreference from "../../commonComponents/OfferPanel/PreferencesInformation/OnePreference";
import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import HighlightedText from "../../commonComponents/OfferPanel/HighlightedText";

import { getFilterOptions } from "../../mockData";

import { useOutletContext } from "react-router-dom";

import styled from "styled-components";

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

const CompactRoomExpanded = styled(RoomExpanded)`
	margin-top: 0;
`;

const CompactOnePreference = styled(OnePreference)`
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

const CurrentRoomsTitle = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#f4e0f8e6",
}))`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const PreferenceTitle = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#c3f9f999",
}))`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const AdditionalInformationTitle = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#c9e6f2a6",
}))`
	display: inline-flex;
	flex-direction: column;
	gap: 9px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const QuantitiesInformationTitle = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#f5f1d3e6",
}))`
	display: inline-flex;
	flex-direction: column;
	gap: 9px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const findOptionWithValue = (options) => {
	return (value) => {
		return options.find((option) => {
			return option.value === value;
		});
	};
};

function NewOffer() {
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
	const [additionalInformation, setAdditionalInformation] = useState([]);

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
		return;
	}

	if (!userData) {
		return <div>You must be logged in to be able to add a new offer!</div>;
	}

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<FormContainer>
				<CardsGroupContainer>
					<QuantitiesInformationTitle>
						Quantities Information
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
						notify={(newSignedRoom) =>
							setSignedRooms([...signedRooms, newSignedRoom])
						}
					/>
					<CardsGroupContainer>
						<CurrentRoomsTitle>Current Rooms</CurrentRoomsTitle>
						<CardsContainer>
							{signedRooms.map((signedRoom) => {
								return (
									<CompactRoomExpanded
										room={signedRoom.room}
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
						<PreferenceTitle>Preference</PreferenceTitle>
						<CardsContainer>
							{signedPreference.map((signedPreference) => {
								return (
									<CompactOnePreference
										options={
											getFilterOptions()["rooms"][
												"criteria"
											]
										}
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
							Please specify how you could be contacted about this
							offer!
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
			<input type="submit" />
		</form>
	);
}

export default NewOffer;
