import React, { useState } from "react";
import ExpandableTitle from "../ExpandableTitle";

import styled from "styled-components";

const ContainerDiv = styled.div`
	display: inline-flex;
	flex-direction: column;

	padding: 12px 7px 7px 7px;

	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const RoomInfo = styled.span`
	display: inline-flex;
	padding: 5px;

	background-color: #f4e0f8e6;
	border-radius: 5px;

	font-weight: bold;
	margin-top: 5px;
`;

const AdditionalRoomInfo = styled(RoomInfo)`
	background-color: #f8ebf1e6;
`;

const RoomInfoCollection = styled.div`
	font-family: sans-serif;
	padding-top: 10px;
	padding-right: 5px;
`;

function RoomMinimized({ room, className }) {
	const residenceArea = room["residenceArea"];
	const roomType = room["roomInfo"]["room"];
	const washroom = room["roomInfo"]["washroom"];
	const building = room["roomInfo"]["building"];
	const floor = room["roomInfo"]["floor"];

	return (
		<RoomInfoCollection className={className}>
			<div>
				<RoomInfo>Residence Area: </RoomInfo> {residenceArea}
			</div>
			<div>
				<RoomInfo>Room: </RoomInfo> {roomType}
			</div>
			<div>
				<RoomInfo>Washroom: </RoomInfo> {washroom}
			</div>
			<div>
				<RoomInfo>Floor: </RoomInfo> {floor}
			</div>
			<div>
				<RoomInfo>Building: </RoomInfo> {building}
			</div>
		</RoomInfoCollection>
	);
}

const BoxedRoomMinimized = styled(RoomMinimized)`
	padding: 0 7px 7px 7px;
	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const BoxedRoomsContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 10px;
	gap: 7px;
`;

function RoomsMininmized({ rooms }) {
	const length = rooms.length;
	if (length === 1) {
		const room = rooms[0];

		return <RoomMinimized room={room} />;
	} else {
		return (
			<BoxedRoomsContainer>
				{rooms.map((room) => {
					return <BoxedRoomMinimized room={room} />;
				})}
			</BoxedRoomsContainer>
		);
	}
}

const BoxedRoomExpanded = styled(RoomExpanded)`
	padding: 0 7px 7px 7px;
	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

function RoomExpanded({ room, className }) {
	const residenceArea = room["residenceArea"];

	const session = room["generalInfo"]["session"];
	const residenceType = room["generalInfo"]["residenceType"];

	const roomType = room["roomInfo"]["room"];
	const washroom = room["roomInfo"]["washroom"];
	const building = room["roomInfo"]["building"];
	const floor = room["roomInfo"]["floor"];

	const allowedGender = room["eligibilityInfo"]["allowedGender"];
	const minimumAge = room["eligibilityInfo"]["minimumAge"];
	return (
		<RoomInfoCollection className={className}>
			<div>
				<RoomInfo>Residence Area: </RoomInfo> {residenceArea}
			</div>
			<div>
				<RoomInfo>Room: </RoomInfo> {roomType}
			</div>
			<div>
				<RoomInfo>Washroom: </RoomInfo> {washroom}
			</div>
			<div>
				<RoomInfo>Floor: </RoomInfo> {floor}
			</div>
			<div>
				<RoomInfo>Building: </RoomInfo> {building}
			</div>
			<div>
				<AdditionalRoomInfo>Residence Type: </AdditionalRoomInfo>{" "}
				{residenceType}
			</div>
			<div>
				<AdditionalRoomInfo>Session: </AdditionalRoomInfo> {session}
			</div>
			<div>
				<AdditionalRoomInfo>Allowed Gender: </AdditionalRoomInfo>{" "}
				{allowedGender}
			</div>
			<div>
				<AdditionalRoomInfo>Minimum Age: </AdditionalRoomInfo>{" "}
				{minimumAge === 1 ? "No Minimum" : minimumAge}
			</div>
		</RoomInfoCollection>
	);
}

function RoomsExpanded({ rooms }) {
	const length = rooms.length;
	if (length === 1) {
		const room = rooms[0];

		return <RoomExpanded room={room} />;
	} else {
		return (
			<BoxedRoomsContainer>
				{rooms.map((room) => {
					return <BoxedRoomExpanded room={room} />;
				})}
			</BoxedRoomsContainer>
		);
	}
}

function RoomsInformation({ rooms }) {
	const [isDetailsDisplayed, setIsDetailsDisplayed] = useState(false);

	const changeIsDisplayed = () => {
		setIsDetailsDisplayed(!isDetailsDisplayed);
	};
	return (
		<ContainerDiv>
			<ExpandableTitle
				isDetailsDisplayed={isDetailsDisplayed}
				changeIsDisplayed={changeIsDisplayed}
				groupName={
					rooms.length > 1 ? "Available Rooms" : "Available Room"
				}
				backgroundColor={"#f4e0f8e6"}
				toggleIconColor={"#edd2f3e6"}
			/>
			{!isDetailsDisplayed ? (
				<RoomsMininmized rooms={rooms} />
			) : (
				<RoomsExpanded rooms={rooms} />
			)}
		</ContainerDiv>
	);
}

export default RoomsInformation;
