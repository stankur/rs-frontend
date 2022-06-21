import { useEffect, useState } from "react";
import globalData from "../../globalData";

const useHasPost = function (userData, muutAccount) {
	const [post, setPost] = useState(undefined);
	const [updateRequest, setUpdateRequest] = useState(false);

	useEffect(() => {
		if (updateRequest) {
			setUpdateRequest(false);
		}

		if (userData === undefined || muutAccount === undefined) {
			return console.log("user data or muut account is still undefined");
		}

		if (!userData || !muutAccount) {
			return setPost(false);
		}

		fetch(
			globalData.API_URL +
				"/api/forum-bot/users/" +
				userData.user._id +
				"/future-posts",
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
					console.log(response["error"]["message"]);
					return setPost(false);
				}

				return setPost(response);
			});
	}, [userData, updateRequest, muutAccount]);

	const requestUpdate = () => {
		return setUpdateRequest(true);
	};

	return [post, requestUpdate];
};

export default useHasPost;
