import React, { useState } from "react";
import MuutPostForm from "./MuutPostForm";
import MuutPostInfo from "./MuutPostInfo";

function MuutPostSection({ muutAccount, userData, post, requestUpdate }) {
	const [requestChangeAccount, setRequestChangeAccount] = useState(false);

	if (post && !requestChangeAccount) {
		return (
			<MuutPostInfo
				post={post}
				muutAccount={muutAccount}
				setRequestChangeAccount={setRequestChangeAccount}
			/>
		);
	}

	return (
		<MuutPostForm
			muutAccount={muutAccount}
			userData={userData}
			post={post}
			requestUpdate={requestUpdate}
			setRequestChangeAccount={setRequestChangeAccount}
		/>
	);
}

export default MuutPostSection;
