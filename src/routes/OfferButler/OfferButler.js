import React from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../../commonComponents/LoadingLoader/Loader";
import ErrorNotification from "../../commonComponents/Notification/ErrorNotification";
import useHasMuutAccount from "../../hooks/forum-bot/useHasMuutAccount";
import useHasPost from "../../hooks/forum-bot/useHasPost";

import MuutAccountForm from "./MuutAccountForm/MuutAccountForm";
import MuutPost from "./MuutPost";

import styled from "styled-components";
import Title from "../../commonComponents/Title";

const FormsContainer = styled.div`
	display: flex;
	gap: 20px;
	justify-content: center;
	padding-top: 10px;
	padding-bottom: 10px;

	@media (max-width: 900px) {
		flex-direction: column;
	}
`;

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
			<div style={{paddingBottom: "15px", paddingTop: "10px", paddingLeft: "8px"}}>
				<div
					style={{
						fontWeight: "bold",
						fontFamily: "sans-serif",
                        paddingBottom: "10px"
					}}
				>
					Offer Butler
				</div>
				<div
					style={{
						fontWeight: "normal",
						fontFamily: "sans-serif",
					}}
				>
					Offer Butler schedules your post to be posted regularly to
					the UBC Hosusing Forum at an interval of your choice.
				</div>
			</div>
			<FormsContainer>
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
			</FormsContainer>
		</>
	);
}

export default OfferButler;
