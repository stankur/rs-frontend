import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Loader from "../../commonComponents/LoadingLoader/Loader";
import useHasMuutAccount from "../../hooks/forum-bot/useHasMuutAccount";

import MuutAccountForm from "./MuutAccountForm/MuutAccountForm";
import MuutPost from "./MuutPost";

function OfferButler() {
	const [userData, setAuthorizationHeader] = useOutletContext();
	const [muutAccount, requestUpdate] = useHasMuutAccount(userData);

	console.log("user data is actually now: " + userData);

	if (muutAccount === undefined) {
		return <Loader />;
	}

	return (
		<div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent:"center", padding:"10px" }}>
			<MuutAccountForm
				userData={userData}
				muutAccount={muutAccount}
				requestUpdate={requestUpdate}
			/>
			<MuutPost userData={userData} muutAccount={muutAccount} />
		</div>
	);
}

export default OfferButler;
