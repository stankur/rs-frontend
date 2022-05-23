import { useEffect, useState } from "react";

function useAuthorizationHeader() {
	const [AuthorizationHeader, setAuthorizationHeader] = useState(undefined);

	useEffect(() => {
		if (AuthorizationHeader === undefined) {
			const previousAuthorizationHeader =
				localStorage.getItem("Authorization");

			if (previousAuthorizationHeader) {
				return setAuthorizationHeader(previousAuthorizationHeader);
			}

			return setAuthorizationHeader(false);
		}
	}, [AuthorizationHeader]);

	useEffect(() => {
		if (AuthorizationHeader === undefined) {
			return;
		}

		if (!AuthorizationHeader) {
			return localStorage.removeItem("Authorization");
		}

		return localStorage.setItem("Authorization", AuthorizationHeader);
	});

	return [AuthorizationHeader, setAuthorizationHeader];
}

export default useAuthorizationHeader;
