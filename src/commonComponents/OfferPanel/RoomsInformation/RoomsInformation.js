import React, { useState } from "react";
import ExpandableTitle from "../../ExpandableTitle";

import styled from "styled-components";

import ContainerDiv from "../ContainerDiv";
import HighlightedText from "../HighlightedText";
import RoomExpanded from "./RoomExpanded";

import KeyValues from "../KeyValues";

const RoomInfo = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#f4e0f8e6",
}))`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const RoomInfoCollection = styled(ContainerDiv)`
	margin-top: 10px;
	background-color: ${(props) => {
		return props.backgroundColor;
	}};
`;

const HighlightedValue = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#ffffff",
}))`
	font-weight: normal;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

function RoomMinimized({ room, className }) {
	const residenceArea = room["residenceArea"];
	const roomType = room["roomInfo"]["room"];
	const washroom = room["roomInfo"]["washroom"];
	const building = room["roomInfo"]["building"];
	const floor = room["roomInfo"]["floor"];

	return (
		<RoomInfoCollection backgroundColor={"#faf0fbb1"} className={className}>
			<div>
				<KeyValues>
					<RoomInfo>Residence Area: </RoomInfo>{" "}
					<HighlightedValue>{residenceArea}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<RoomInfo>Room: </RoomInfo>{" "}
					<HighlightedValue>{roomType}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<RoomInfo>Washroom: </RoomInfo>{" "}
					<HighlightedValue>{washroom}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<RoomInfo>Floor: </RoomInfo>{" "}
					<HighlightedValue>{floor}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<RoomInfo>Building: </RoomInfo>{" "}
					<HighlightedValue>
						{!building ? "Single Building" : building}
					</HighlightedValue>
				</KeyValues>
			</div>
		</RoomInfoCollection>
	);
}

const BoxedRoomsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	flex-wrap: wrap;
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
					return <RoomMinimized key={room["_id"]} room={room} />;
				})}
			</BoxedRoomsContainer>
		);
	}
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
					return <RoomExpanded key={room._id} room={room} />;
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
