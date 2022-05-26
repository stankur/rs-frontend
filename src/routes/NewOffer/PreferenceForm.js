import React, { useState } from "react";

import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";
import SelectableCollection from "../../commonComponents/OffersFilter/CheckableCollectionInput/SelecatableCollection";
import IntervalInput from "../../commonComponents/OffersFilter/IntervalInput/IntervalInput";

import StyleableSmallSelect from "../../commonComponents/StyleableSmallSelect";
import NumberHolder from "../../commonComponents/OffersFilter/IntervalInput/NumberHolder";

import { getFilterOptions } from "../../mockData";

import styled from "styled-components";

const MaxWidthBoundedContainer = styled(ContainerDiv)`
	max-width: 400px;
`;

const Container = styled.div`
	display: inline-flex;
	flex-direction: column;
	gap: 7px;
`;

const InputTitle = styled.div`
	font-family: sans-serif;
	white-space: nowrap;
	font-family: sans-serif;
`;

const InputFields = styled.span`
	display: inline-flex;
	gap: 7px;
`;

function PreferenceForm({ notify }) {

	const allRoomOptions = getFilterOptions().rooms.criteria;

	const residenceAreaOptions = allRoomOptions.residenceArea;
	const [preferredResidenceAreas, setPreferredResidenceAreas] = useState([]);

	const sessionOptions = allRoomOptions.generalInfo.session;
	const [preferredSessions, setPreferredSessions] = useState([]);

	const residenceTypeOptions = allRoomOptions.generalInfo.residenceType;
	const [preferredResidenceTypes, setPreferredResidenceTypes] = useState([]);

	const roomOptions = allRoomOptions.roomInfo.room;
	const [preferredRooms, setPreferredRooms] = useState([]);

	const [floorInterval, setFloorInterval] = useState([1, "Infinity"]);

	const washroomOptions = allRoomOptions.roomInfo.washroom;
	const [preferredWashrooms, setPreferredWashrooms] = useState([]);

	const [minimumAgeInterval, setMinimumAgeInterval] = useState([1, 19]);

	const allowedGenderOptions = allRoomOptions.eligibilityInfo.allowedGender;
	const [preferredAllowedGenders, setPreferredAllowedGenders] = useState([]);

	const getFinal = (preferred, options) => {
		if (preferred.length === 0) {
			return options;
		}

		return preferred;
	};

	const constructPreference = () => {
		return {
			residenceArea: getFinal(
				preferredResidenceAreas,
				residenceAreaOptions
			),
			roomInfo: {
				room: getFinal(preferredRooms, roomOptions),
				floor: {
					spec: "Interval",
					criteria: floorInterval,
				},
				washroom: getFinal(preferredWashrooms, washroomOptions),
			},
			generalInfo: {
				residenceType: getFinal(
					preferredResidenceTypes,
					residenceTypeOptions
				),
				session: getFinal(preferredSessions, sessionOptions),
			},
			eligibilityInfo: {
				allowedGender: getFinal(
					preferredAllowedGenders,
					allowedGenderOptions
				),
				minimumAge: {
					spec: "Interval",
					criteria: minimumAgeInterval,
				},
			},
		};
	};

	return (
		<MaxWidthBoundedContainer>
			<SelectableCollection
				inputName="residenceArea"
				notify={(newPreferred) =>
					setPreferredResidenceAreas(newPreferred)
				}
				options={residenceAreaOptions}
				criteria={preferredResidenceAreas}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>
			<SelectableCollection
				inputName="session"
				notify={(newPreferred) => setPreferredSessions(newPreferred)}
				options={sessionOptions}
				criteria={preferredSessions}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>
			<SelectableCollection
				inputName="residenceType"
				notify={(newPreferred) =>
					setPreferredResidenceTypes(newPreferred)
				}
				options={residenceTypeOptions}
				criteria={preferredResidenceTypes}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>

			<SelectableCollection
				inputName={"roomType"}
				notify={(newPreferred) => setPreferredRooms(newPreferred)}
				options={roomOptions}
				criteria={preferredRooms}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>
			<IntervalInput
				notify={(newFilter) => setFloorInterval(newFilter["criteria"])}
				inputName="floorRange"
				interval={floorInterval}
			/>
			<SelectableCollection
				inputName={"washroom"}
				notify={(newPreferred) => setPreferredWashrooms(newPreferred)}
				options={washroomOptions}
				criteria={preferredWashrooms}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>
			<Container>
				<InputTitle>Minumum Age: </InputTitle>
				<InputFields>
					<StyleableSmallSelect
						value={{ value: "≤", label: "≤" }}
						options={[{ value: "≤", label: "≤" }]}
					/>
					<NumberHolder
						number={minimumAgeInterval[1]}
						notify={(newNumber) =>
							setMinimumAgeInterval([1, newNumber])
						}
					/>
				</InputFields>
			</Container>
			<SelectableCollection
				inputName={"allowedGenders"}
				notify={(newPreferred) =>
					setPreferredAllowedGenders(newPreferred)
				}
				options={allowedGenderOptions}
				criteria={preferredAllowedGenders}
				selectedLabelBackgroundColor="#edd2f3e6"
			/>
			<button
				onClick={() => {
					notify({
						preference: constructPreference(),
						date: Date.now(),
					});
				}}
			>
				Add Preference
			</button>
		</MaxWidthBoundedContainer>
	);
}

export default PreferenceForm;
