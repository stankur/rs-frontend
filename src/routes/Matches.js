import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import OfferPanel from "../commonComponents/OfferPanel/OfferPanel";
import PanelsHolder from "../commonComponents/PanelsHolder";
import ShadowedHighlightedText from "../commonComponents/OfferPanel/ShadowedHighlightedText";
import Loader from "../commonComponents/LoadingLoader/Loader";

import globalData from "../globalData";

import styled from "styled-components";

const Title = styled(ShadowedHighlightedText)`
	display: inline-flex;
	align-self: stretch;
	background-color: ${(props) => props.backgroundColor};
`;

function Matches() {
	const { state } = useLocation();
	const [matches, setMatches] = useState(undefined);

	useEffect(() => {
		if (matches === undefined) {
			fetch(
				globalData.API_URL +
					"/api/offers/" +
					state.offerData._id +
					"/matches"
			)
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						return;
					}

					return setMatches(response);
				})
				.catch((err) => {
					console.log("failed to fetch");
					console.log(err);
					return setMatches(undefined);
				});
		}
	}, [matches, state]);

	if (matches === undefined) {
		return <Loader />;
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					fontFamily: "sans-serif",
				}}
			>
				<Title backgroundColor="#e0ecf9ff">Selected Offer:</Title>
				<OfferPanel offerData={state.offerData} />
			</div>
			<div
				style={{
					fontFamily: "sans-serif",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Title backgroundColor="#f5f1d3e6">
					Matches to Your Preference:{" "}
				</Title>
				{!!matches && (
					<PanelsHolder>
						{matches.length === 0 ? (
							<div>No match yet :( Try to check again later!</div>
						) : (
							matches.map((offerData) => (
								<OfferPanel
									offerData={offerData}
									key={offerData._id}
								/>
							))
						)}
					</PanelsHolder>
				)}
			</div>
		</div>
	);
}

export default Matches;
