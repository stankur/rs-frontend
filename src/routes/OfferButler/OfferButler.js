import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../../commonComponents/LoadingLoader/Loader";
import ErrorNotification from "../../commonComponents/Notification/ErrorNotification";
import useHasMuutAccount from "../../hooks/forum-bot/useHasMuutAccount";
import useHasPost from "../../hooks/forum-bot/useHasPost";

import MuutAccountForm from "./MuutAccountForm/MuutAccountForm";
import MuutPost from "./MuutPost";

function OfferButler() {
	const [userData, setAuthorizationHeader] = useOutletContext();
	const [muutAccount, requestUpdateHasMuutAccount] =
		useHasMuutAccount(userData);
	const [post, requestUpdateHasPost] = useHasPost(userData, muutAccount);

	console.log("user data is actually now: " + userData);

	if (muutAccount === undefined || post === undefined) {
		return <Loader />;
	}

	return (
		<>
			{!userData && (
				<ErrorNotification>
					You must be logged in to use Offer Butler!
				</ErrorNotification>
			)}
			<div
				style={{
					display: "flex",
					gap: "20px",
					flexWrap: "wrap",
					justifyContent: "center",
					padding: "10px",
				}}
			>
				<MuutAccountForm
					userData={userData}
					muutAccount={muutAccount}
					requestUpdate={requestUpdateHasMuutAccount}
				/>
				<MuutPost
					userData={userData}
					muutAccount={muutAccount}
					post={post}
					requestUpdate={requestUpdateHasPost}
				/>
			</div>
		</>
	);
}

export default OfferButler;
