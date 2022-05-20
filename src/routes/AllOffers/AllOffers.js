import React from "react";
import OffersFilter from "../../commonComponents/OffersFilter/OffersFilter";
import OfferPanel from "../../commonComponents/OfferPanel/OfferPanel";

import styled from "styled-components";

import { getOfferJSONSample } from "../../mockData";

const PanelsHolder = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: space-evenly;
`;
function AllOffers() {
	return (
		<div>
			All Offers
			<OffersFilter />
			<PanelsHolder>
				<OfferPanel offerData={getOfferJSONSample()} />
				<OfferPanel offerData={getOfferJSONSample()} />
				<OfferPanel offerData={getOfferJSONSample()} />
				<OfferPanel offerData={getOfferJSONSample()} />
			</PanelsHolder>
		</div>
	);
}

export default AllOffers;
