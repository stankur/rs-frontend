import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MuutAccountForm from "./MuutAccountForm/MuutAccountForm";

function OfferButler() {
	const [userData, setAuthorizationHeader] = useOutletContext();
	console.log("user data is actually now: " + userData);
	return (
		<div>
			<div>
				<MuutAccountForm userData={userData} />
			</div>
		</div>
	);
}

export default OfferButler;
