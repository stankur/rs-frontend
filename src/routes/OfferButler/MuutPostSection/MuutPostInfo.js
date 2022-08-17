import React from "react";
import dayjs from "dayjs";
import {
	MuutPostFormContainer,
	MuutPostBodyContainer,
	MuutPostFooterContainer,
} from "./commonComponents";

function MuutPostInfo({ post, muutAccount, setRequestChangeAccount }) {
	return (
		<MuutPostFormContainer muutAccount={muutAccount}>
			<MuutPostBodyContainer>
				<div>This is your registered post information: </div>
				<div>
					<span style={{ fontWeight: "bold" }}>Title: </span>
					<span>{post["title"]}</span>
				</div>
				<div>
					<span
						style={{
							fontWeight: "bold",
						}}
					>
						Body:{" "}
					</span>
					<span style={{ whiteSpace: "pre-line" }}>
						{post["body"]}
					</span>
				</div>
				<div>
					<span style={{ fontWeight: "bold" }}>Hour Interval: </span>
					<span>{post["hourInterval"]}</span>
				</div>

				<div>
					<span style={{ fontWeight: "bold" }}>
						Next Post Date and Time (accurate within 1 hour):{" "}
					</span>
					<span>
						{dayjs(post["nextPost"]).format(
							"ddd, D MMM YYYY [at] HH:mm a"
						)}
					</span>
				</div>
			</MuutPostBodyContainer>
			<MuutPostFooterContainer>
				<button
					onClick={(event) => {
						event.preventDefault();

						return setRequestChangeAccount(true);
					}}
				>
					Change Post Information
				</button>
			</MuutPostFooterContainer>
		</MuutPostFormContainer>
	);
}

export default MuutPostInfo;