import React from "react";
import styled from "styled-components";

import ContainerDiv from "./ContainerDiv";
import HighlightedText from "./HighlightedText";

import KeyValues from "./KeyValues";

const GreenHighlightedText = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#c3f9f999",
}))``;

const ShadowedGreenHighlightedText = styled(GreenHighlightedText)`
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const HighlightedValue = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#ffffff",
}))`
	font-weight: normal;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const PreferenceContainer = styled(ContainerDiv)`
	margin-top: 10px;
	background-color: #e1fafa99;
`;

const BoxedPreferenceContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
`;

function OnePreference({ onePreference, options }) {
	const isAny = (criteria, possibilities) => {
		return criteria.length === possibilities.length;
	};

	const isAnyInterval = (interval) => {
		const lower = interval[0];
		const higher = interval[1];

		return (
			lower === 1 &&
			(higher === "Infinity" || higher === Number.MAX_SAFE_INTEGER)
		);
	};

	const parseInterval = (interval) => {
		const lower = interval[0];
		const higher = interval[1];

		if (lower === higher) {
			return lower;
		}

		if (higher === "Infinity" || higher === Number.MAX_SAFE_INTEGER) {
			return "≥ " + lower;
		}

		if (lower === 1) {
			return "≤ " + higher;
		}

		return "from " + lower + " to " + higher;
	};

	const generateKeyValues = (name, values) => {
		return (
			<KeyValues>
				<ShadowedGreenHighlightedText>
					{name + ": "}
				</ShadowedGreenHighlightedText>
				{values.map((value) => {
					return (
						<span>
							{" "}
							<HighlightedValue>{value}</HighlightedValue>
						</span>
					);
				})}
			</KeyValues>
		);
	};

	return (
		<PreferenceContainer>
			{!isAny(onePreference["residenceArea"], options["residenceArea"]) &&
				generateKeyValues(
					"Residence Area",
					onePreference["residenceArea"]
				)}
			{!isAny(
				onePreference["generalInfo"]["residenceType"],
				options["generalInfo"]["residenceType"]
			) &&
				generateKeyValues(
					"Residence Type",
					onePreference["generalInfo"]["residenceType"]
				)}
			{!isAny(
				onePreference["generalInfo"]["session"],
				options["generalInfo"]["session"]
			) &&
				generateKeyValues(
					"Session",
					onePreference["generalInfo"]["session"]
				)}
			{!isAny(
				onePreference["roomInfo"]["room"],
				options["roomInfo"]["room"]
			) && generateKeyValues("Room", onePreference["roomInfo"]["room"])}
			{!isAnyInterval(onePreference["roomInfo"]["floor"]["criteria"]) &&
				generateKeyValues("Floor", [
					parseInterval(
						onePreference["roomInfo"]["floor"]["criteria"]
					),
				])}
			{!isAny(
				onePreference["roomInfo"]["washroom"],
				options["roomInfo"]["washroom"]
			) &&
				generateKeyValues(
					"Washroom",
					onePreference["roomInfo"]["washroom"]
				)}
			{!isAny(
				onePreference["eligibilityInfo"]["allowedGender"],
				options["eligibilityInfo"]["allowedGender"]
			) &&
				generateKeyValues(
					"Allowed Gender",
					onePreference["eligibilityInfo"]["allowedGender"]
				)}
			{!isAnyInterval(
				onePreference["eligibilityInfo"]["minimumAge"]["criteria"]
			) &&
				generateKeyValues("Minimum Age", [
					parseInterval(
						onePreference["eligibilityInfo"]["minimumAge"][
							"criteria"
						]
					),
				])}
		</PreferenceContainer>
	);
}

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
