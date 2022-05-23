import { useEffect, useState } from "react";
import globalData from "../globalData";

import useAuthorizationHeader from "./useAuthorizationHeader";

function useIsLoggedIn() {
	const [userData, setUserData] = useState(undefined);
	const [AuthorizationHeader, setAuthorizationHeader] =
		useAuthorizationHeader();

	useEffect(() => {
		if (!(AuthorizationHeader === undefined)) {
			if (AuthorizationHeader) {
				fetch(globalData.API_URL + "/authentication", {
					headers: {
						Authorization: AuthorizationHeader,
					},
				})
					.then((response) => {
						return response.json();
					})
					.then((response) => {
						if (response["error"]) {
							setAuthorizationHeader(false);
							return setUserData(false);
						}

						return setUserData(response);
					})
					.catch(() => {
						return setUserData(undefined);
					});
			} else {
				return setUserData(false);
			}
		}
	}, [AuthorizationHeader, setAuthorizationHeader]);

	return [userData, setAuthorizationHeader];
}

export default useIsLoggedIn;
