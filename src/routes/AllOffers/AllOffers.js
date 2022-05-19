import React from "react";
import OffersFilter from "../../commonComponents/OffersFilter/OffersFilter";
import OfferPanel from "../../commonComponents/OfferPanel/OfferPanel";

import { getOfferJSONSample } from "../../mockData";
function AllOffers() {
	return (
		<div>
			All Offers
			<OffersFilter />
			<OfferPanel offerData={getOfferJSONSample()} />
		</div>
	);
}

export default AllOffers;
