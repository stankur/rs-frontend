import React, { useState } from "react";
import styled from "styled-components";

import RoomsInformation from "./RoomsInformation";

const QuantifiedItem = styled.span`
	font-family: sans-serif;
	font-weight: bold;
	color: #4cbcecb2;
	font-size: 1.4em;

	background-color: #c9e6f2a6;
	border-radius: 3px;
	padding: 1px 5px;
`;
const PushedDiv = styled.div`
	display: inline-flex;
	flex-direction: column;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 10px;

	margin-left: 4px;
	margin-right: 4px;

	padding: 7px;
	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const QuantityInformation = styled.span`
	display: inline-flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;

	padding: 0 7px 7px 0;

	border-radius: 5px;

	gap: 3.5px;

	font-family: sans-serif;
	font-weight: bold;

	color: #414141;
`;

const PushedDownDiv = styled.div`
	padding-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

function OfferPanel({ offerData }) {
	const offerId = offerData["_id"];

	const numberOfPeople = offerData.numberOfPeople;
	const roomsWanted = offerData.roomsWanted;
	const numbeOfRoomsAvailable = offerData.rooms.length;

	const rooms = offerData.rooms;
	return (
		<PushedDiv>
			<QuantityInformation>
				<QuantifiedItem>
					{numberOfPeople}{" "}
					<span>{numberOfPeople > 1 ? "people" : "person"}</span>
				</QuantifiedItem>
				<span>having</span>
				<QuantifiedItem>
					{numbeOfRoomsAvailable}{" "}
					<span>{numbeOfRoomsAvailable > 1 ? "rooms" : "room"}</span>
				</QuantifiedItem>
				<span>looking</span> <span>for</span>
				<QuantifiedItem>
					{roomsWanted}{" "}
					<span>{roomsWanted > 1 ? "rooms" : "room"}</span>
				</QuantifiedItem>
			</QuantityInformation>
			<PushedDownDiv>
				<RoomsInformation rooms={rooms} />
			</PushedDownDiv>
		</PushedDiv>
	);
}

export default OfferPanel;
