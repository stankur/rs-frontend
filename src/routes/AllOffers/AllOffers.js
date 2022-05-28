import React, { useEffect, useState } from "react";
import OffersFilter from "../../commonComponents/OffersFilter/OffersFilter";
import OfferPanel from "../../commonComponents/OfferPanel/OfferPanel";
import PanelsHolder from "../../commonComponents/PanelsHolder";

import globalData from "../../globalData";

import { getOfferJSONSample } from "../../mockData";


function AllOffers() {
	const [appliedFilter, setAppliedFilter] = useState([]);
	const sendFilter = (filterJSON) => {
		fetch(
			globalData.API_URL +
				"/api/offers?filter=" +
				JSON.stringify(filterJSON)
		)
			.then((response) => response.json())
			.then((response) => {
				if (response["error"]) {
					return console.log(response["error"]["message"]);
				}
				setAppliedFilter(filterJSON);
				return setOffers(response);
			})
			.catch((err) => console.log(err));
	};

	const [offers, setOffers] = useState(undefined);

	useEffect(() => {
		if (offers === undefined) {
			fetch(globalData.API_URL + "/api/offers")
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						return console.log(response["error"]["message"]);
					}

					return setOffers(response);
				})
				.catch((err) => console.log(err));
		}
	});

	return (
		<div>
			<OffersFilter sendFilter={sendFilter} />
			<PanelsHolder>
				{!!offers &&
					offers.map((offerData) => (
						<OfferPanel offerData={offerData} key={offerData._id} />
					))}
			</PanelsHolder>
		</div>
	);
}

export default AllOffers;
