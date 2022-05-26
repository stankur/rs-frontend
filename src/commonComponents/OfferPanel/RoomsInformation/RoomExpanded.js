import React from "react";

import KeyValues from "../KeyValues";

import ContainerDiv from "../ContainerDiv";
import HighlightedText from "../HighlightedText";

import styled from "styled-components";

const RoomInfo = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#f4e0f8e6",
}))`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const AdditionalRoomInfo = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#f8ebf1e6",
}))`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const RoomInfoCollection = styled(ContainerDiv)`
	justify-content: center;
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
			<div>
				<KeyValues>
					<AdditionalRoomInfo>Residence Type: </AdditionalRoomInfo>{" "}
					<HighlightedValue>{residenceType}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<AdditionalRoomInfo>Session: </AdditionalRoomInfo>{" "}
					<HighlightedValue>{session}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<AdditionalRoomInfo>Allowed Gender: </AdditionalRoomInfo>{" "}
					<HighlightedValue>{allowedGender}</HighlightedValue>
				</KeyValues>
			</div>
			<div>
				<KeyValues>
					<AdditionalRoomInfo>Minimum Age: </AdditionalRoomInfo>{" "}
					<HighlightedValue>
						{minimumAge === 1 ? "No Minimum" : minimumAge}
					</HighlightedValue>
				</KeyValues>
			</div>
		</RoomInfoCollection>
	);
}

export default RoomExpanded;
