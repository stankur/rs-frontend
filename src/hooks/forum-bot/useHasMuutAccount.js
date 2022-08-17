import { useEffect, useState } from "react";
import globalData from "../../globalData";

const useHasMuutAccount = function (userData) {
	const [muutAccount, setMuutAccount] = useState(undefined);
	const [updateRequest, setUpdateRequest] = useState(false);

	useEffect(() => {
		if (updateRequest) {
			setUpdateRequest(false);
		}
		if (userData === undefined) {
			return ;
		}

		if (!userData) {
			return setMuutAccount(false);
		}

		if (userData) {
			fetch(
				globalData.API_URL +
					"/api/forum-bot/users/" +
					userData.user._id +
					"/muut-account",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("Authorization"),
					},
				}
			)
				.then((response) => response.json())
				.then((response) => {
					if (response["error"]) {
						return setMuutAccount(false);
					}

					return setMuutAccount(response);
				});
		}
	}, [userData, updateRequest]);

	const requestUpdate = () => {
		setUpdateRequest(true);
	};

	return [muutAccount, requestUpdate];
};

export default useHasMuutAccount;
