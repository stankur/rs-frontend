import React, { useState } from "react";
import SelectableCollection from "./CheckableCollectionInput/SelecatableCollection";
import IntervalInput from "./IntervalInput/IntervalInput";

import ExpandableTitle from "../ExpandableTitle";

import { cloneDeep } from "lodash";
import styled from "styled-components";
import HighlightedText from "../OfferPanel/HighlightedText";
import ShadowedHighlightedText from "../OfferPanel/ShadowedHighlightedText";

const CustomizableDisplay = styled.div`
	display: ${(props) => {
		if (!props.isDetailsDisplayed) {
			return "none";
		} else {
			return "flex";
		}
	}};
	flex-wrap: wrap;
	padding-top: 12px;
	gap: 13px;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const Displays = styled.span`
	display: inline-flex;
	gap: 13px;
`;

const ColumnDisplays = styled(Displays)`
	flex-direction: column;
`;

const GroupedFiltersDisplay = styled(Displays)`
	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const ClickableSpan = styled.span`
	cursor: pointer;
`;
const PushedDiv = styled.div`
	padding: 12px 7px 7px 7px;

	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

	color: #414141;
`;

function FilterGroup({
	groupName,
	filterJSON,
	notify,
	filterOptions,
	children,
	main,
	handleApply,
}) {
	const [isDetailsDisplayed, setIsDetailsDisplayed] = useState(false);

	const changeIsDisplayed = () => {
		setIsDetailsDisplayed(!isDetailsDisplayed);
	};

	const isRealObject = (JSON) => {
		return typeof JSON === "object" && !(JSON instanceof Array);
	};

	if (isRealObject(filterJSON)) {
		const isNotDefaultFilter = (subGroupToTest) => {
			return (
				subGroupToTest instanceof Object &&
				Object.keys(subGroupToTest).length === 2 &&
				Object.keys(subGroupToTest).includes("spec") &&
				Object.keys(subGroupToTest).includes("criteria")
			);
		};

		const isIntervalFilter = (subGroupToTest) => {
			return (
				isNotDefaultFilter(subGroupToTest) &&
				subGroupToTest["spec"] === "Interval"
			);
		};

		const isIncludesFilter = (subGroupToTest) => {
			return (
				isNotDefaultFilter(subGroupToTest) &&
				subGroupToTest["spec"] === "Includes"
			);
		};

		const getNotified = (updatedFilter, name) => {
			const copyOfFilterJSON = cloneDeep(filterJSON);

			if (!Object.keys(filterJSON).includes(name)) {
				throw new Error("given name is not present in the filterJSON");
			}

			if (isIncludesFilter(copyOfFilterJSON[name])) {
				copyOfFilterJSON[name]["criteria"] = updatedFilter;
			} else {
				copyOfFilterJSON[name] = updatedFilter;
			}
			return notify(copyOfFilterJSON, groupName);
		};

		return (
			<PushedDiv>
				<span
					style={{
						display: "inline-flex",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<ExpandableTitle
						isDetailsDisplayed={isDetailsDisplayed}
						changeIsDisplayed={changeIsDisplayed}
						groupName={groupName}
						backgroundColor={"#f5f1d3e6"}
						toggleIconColor={"#f2e89eda"}
					/>
					{!!main && (
						<ClickableSpan onClick={() => handleApply()}>
							<ShadowedHighlightedText
								style={{ fontFamily: "sans-serif" }}
								backgroundColor={"#f5f1d3e6"}
							>
								Apply
							</ShadowedHighlightedText>
						</ClickableSpan>
					)}
				</span>
				<CustomizableDisplay isDetailsDisplayed={isDetailsDisplayed}>
					{Object.keys(filterJSON).filter((subGroupName) => {
						const subGroup = filterJSON[subGroupName];

						return (
							subGroup instanceof Array ||
							isIntervalFilter(subGroup)
						);
					}).length > 0 && (
						<ColumnDisplays>
							{Object.keys(filterJSON).map((subGroupName) => {
								const subGroup = filterJSON[subGroupName];
								const subGroupOptions =
									filterOptions[subGroupName];

								if (subGroup instanceof Array) {
									return (
										<SelectableCollection
											inputName={subGroupName}
											notify={getNotified}
											options={subGroupOptions}
											criteria={subGroup}
											key={subGroupName}
										/>
									);
								}

								if (isIntervalFilter(subGroup)) {
									return (
										<IntervalInput
											inputName={subGroupName}
											notify={getNotified}
											interval={subGroup["criteria"]}
											key={subGroupName}
										/>
									);
								}

								if (isIncludesFilter(subGroup)) {
									return <></>;
								}

								if (subGroup instanceof Object) {
									return <></>;
								}

								throw new Error(
									"sub group of name: " +
										subGroupName +
										" is of invalid format!"
								);
							})}
						</ColumnDisplays>
					)}
					{Object.keys(filterJSON).filter((subGroupName) => {
						const subGroup = filterJSON[subGroupName];

						return (
							!(
								subGroup instanceof Array ||
								isIntervalFilter(subGroup)
							) &&
							(isIncludesFilter(subGroup) ||
								subGroup instanceof Object)
						);
					}).length > 0 && (
						<GroupedFiltersDisplay>
							{Object.keys(filterJSON).map((subGroupName) => {
								const subGroup = filterJSON[subGroupName];
								const subGroupOptions =
									filterOptions[subGroupName];

								if (subGroup instanceof Array) {
									return <></>;
								}

								if (isIntervalFilter(subGroup)) {
									return <></>;
								}

								if (isIncludesFilter(subGroup)) {
									return (
										<FilterGroup
											groupName={subGroupName}
											filterJSON={subGroup["criteria"]}
											notify={getNotified}
											filterOptions={
												subGroupOptions["criteria"]
											}
											key={subGroupName}
										/>
									);
								}

								if (subGroup instanceof Object) {
									return (
										<FilterGroup
											groupName={subGroupName}
											filterJSON={subGroup}
											notify={getNotified}
											filterOptions={subGroupOptions}
											key={subGroupName}
										/>
									);
								}

								throw new Error(
									"sub group of name: " +
										subGroupName +
										" is of invalid format!"
								);
							})}
						</GroupedFiltersDisplay>
					)}
				</CustomizableDisplay>
				{children}
			</PushedDiv>
		);
	}
	throw new Error("filterJSON given is invalid!");
}

export default FilterGroup;
