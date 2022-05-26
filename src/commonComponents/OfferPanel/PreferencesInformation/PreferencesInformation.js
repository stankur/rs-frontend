import React from "react";
import styled from "styled-components";

import ContainerDiv from "../ContainerDiv";
import HighlightedText from "../HighlightedText";
import OnePreference from "./OnePreference";

const GreenHighlightedText = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#c3f9f999",
}))``;

const BoxedPreferenceContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
`;

function PreferencesInformation({ preference, options }) {
	return (
		<ContainerDiv>
			<span>
				<GreenHighlightedText>
					{preference.length > 1 ? "Preferences" : "Preference"}
				</GreenHighlightedText>
			</span>
			{preference.length === 1 ? (
				<OnePreference
					onePreference={preference[0]}
					options={options}
				/>
			) : (
				<BoxedPreferenceContainer>
					{preference.map((preference) => {
						return (
							<OnePreference
								onePreference={preference}
								options={options}
								key={preference["_id"]}
							/>
						);
					})}
				</BoxedPreferenceContainer>
			)}
		</ContainerDiv>
	);
}

export default PreferencesInformation;
