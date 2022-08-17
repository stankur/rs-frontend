import { useEffect, useState } from "react";
import globalData from "../globalData"

function useOffers(userData) {
	const [offers, setOffers] = useState(undefined);
	const [updateRequest, setUpdateRequest] = useState(false);

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
						return;
					}

					return setOffers(response);
				});
		}

		if (updateRequest) {
			setUpdateRequest(false);
		}
	}, [userData, updateRequest]);

	const requestUpdate = () => {
		setUpdateRequest(true);
	};

	return [offers, requestUpdate];
}

export default useOffers;
