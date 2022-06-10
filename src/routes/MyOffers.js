import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import PanelsHolder from "../commonComponents/PanelsHolder";
import OfferPanel from "../commonComponents/OfferPanel/OfferPanel";
import HighlightedText from "../commonComponents/OfferPanel/HighlightedText";
import Loader from "../commonComponents/LoadingLoader/Loader";

import globalData from "../globalData";

import styled from "styled-components";
import ErrorNotification from "../commonComponents/Notification/ErrorNotification";

const ExpandableSpan = styled.span`
	display: inline-flex;
	width: 100%;
	gap: 7px;
	justify-content: flex-end;

	@media (max-width: 540px) {
		justify-content: center;
	}
	align-items: center;
`;

const ClickableButton = styled(HighlightedText)`
	cursor: pointer;
`;

const DeleteButton = styled(ClickableButton).attrs(() => ({
	backgroundColor: "#fdb3b3ff",
}))`
	border: 1px solid #f96c6cff;
	&:hover {
		background-color: #f98181ff;
	}
`;

const FindMatchesButton = styled(ClickableButton).attrs(() => ({
	backgroundColor: "#a6d2fcff",
}))`
	border: 1px solid #6cb5f9ff;
	&:hover {
		background-color: #8cc3f7ff;
	}
`;

const BumpButton = styled(ClickableButton).attrs(() => ({
	backgroundColor: "#b1fac8ff",
}))`
	border: 1px solid #7ff0a3ff;
	&:hover {
		background-color: #98f9b7ff;
	}
`;

function MyOffers() {
	const [userData, setAuthorizationHeader] = useOutletContext();

	const [offers, setOffers] = useState(undefined);
	const [toBeRemoved, setToBeRemoved] = useState(null);
	const [toBeBumped, setToBeBumped] = useState(null);

	useEffect(() => {
		if (toBeRemoved) {
			fetch(globalData.API_URL + "/api/offers/" + toBeRemoved, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("Authorization"),
				},
			})
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						console.log("the id: " + toBeRemoved);
						console.log(
							"the error: " + response["error"]["message"]
						);
						return console.log("failed to delete retrying");
					}

					return setToBeRemoved(null);
				})
				.catch((err) => console.log(Object.keys(err)));
		}
	});

	useEffect(() => {
		if (toBeBumped) {
			fetch(globalData.API_URL + "/api/offers/" + toBeBumped + "/date", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("Authorization"),
				},
			})
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						console.log("the id: " + toBeRemoved);
						console.log(
							"the error: " + response["error"]["message"]
						);
						return console.log("failed to bump retrying");
					}

					return setToBeBumped(null);
				})
				.catch((err) => console.log(Object.keys(err)));
		}
	});

	useEffect(() => {
		if (!!userData) {
			fetch(
				globalData.API_URL +
					"/api/users/" +
					userData.user._id +
					"/offers"
			)
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						return console.log(response["error"]["message"]);
					}

					return setOffers(response);
				});
		}
	}, [userData, toBeRemoved]);

	const navigate = useNavigate();
	if (userData === undefined) {
		return <Loader />;
	}

	if (!userData) {
		return (
			<ErrorNotification>
				You must be logged in to view your offers!
			</ErrorNotification>
		);
	}

	if (offers === undefined) {
		return <Loader />;
	}

	return (
		<PanelsHolder>
			{!!offers &&
				offers.map((offer) => (
					<OfferPanel offerData={offer} key={offer._id}>
						<ExpandableSpan>
							<BumpButton
								onClick={() => {
									setToBeBumped(offer._id);
								}}
							>
								Bring Up
							</BumpButton>
							<FindMatchesButton
								onClick={() =>
									navigate("/matches", {
										state: {
											offerData: offer,
										},
									})
								}
							>
								Find Matches
							</FindMatchesButton>
							<DeleteButton
								onClick={() => {
									setToBeRemoved(offer._id);
									setOffers(undefined);
								}}
							>
								Delete
							</DeleteButton>
						</ExpandableSpan>
					</OfferPanel>
				))}
		</PanelsHolder>
	);
}

export default MyOffers;
