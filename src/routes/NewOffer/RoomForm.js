import React, { useCallback, useEffect, useState } from "react";
import { getResidences } from "../../mockData";

import SmallSelect from "../../commonComponents/SmallSelect";
import NumberHolder from "../../commonComponents/OffersFilter/IntervalInput/NumberHolder";

import styled from "styled-components";

import ContainerDiv from "../../commonComponents/OfferPanel/ContainerDiv";

function RoomForm({ notify }) {
	const residences = getResidences().residences;

	const residenceAreas = residences.map((residence) => residence.name);
	const residenceAreaOptions = residenceAreas.map((residenceArea) => ({
		value: residenceArea,
		label: residenceArea,
	}));

	const [residenceArea, setResidenceArea] = useState(residenceAreas[0]);

	const getOptions = useCallback(
		(residenceArea, pathArray) => {
			let currentLayer = residences.find(
				(residence) => residence.name === residenceArea
			);

			if (pathArray.length !== 0) {
				pathArray.forEach((path) => {
					try {
						currentLayer = currentLayer[path];
					} catch (err) {
						currentLayer = [];
					}
				});
			}

			if (currentLayer) {
				return currentLayer.map((value) => ({ value, label: value }));
			}

			return [];
		},
		[residences]
	);

	const getValues = (options) => {
		return options.map((option) => {
			return option.value;
		});
	};

	const includesValue = useCallback((options, value) => {
		return getValues(options).includes(value);
	}, []);

	const sessionOptions = getOptions(residenceArea, ["sessions"]);

	const [session, setSession] = useState(sessionOptions[0].value);

	useEffect(() => {
		if (!includesValue(sessionOptions, session)) {
			return setSession(sessionOptions[0].value);
		}
	}, [residenceArea, session, includesValue, sessionOptions]);

	const roomOptions = getOptions(residenceArea, ["rooms"]);

	const [room, setRoom] = useState(roomOptions[0].value);

	useEffect(() => {
		if (!includesValue(roomOptions, room)) {
			return setRoom(roomOptions[0].value);
		}
	}, [residenceArea, room, includesValue, roomOptions]);

	const [floor, setFloor] = useState(1);

	const washroomOptions = ["Communal", "private"].map((value) => ({
		value,
		label: value,
	}));

	const [washroom, setWashroom] = useState("Communal");

	const buildingOptions = getOptions(residenceArea, ["buildings"]);

	const [building, setBuilding] = useState(
		(() => {
			try {
				return buildingOptions[0].value;
			} catch (err) {}
		})()
	);

	useEffect(() => {
		if (
			buildingOptions.length > 0 &&
			!includesValue(buildingOptions, building)
		) {
			return setBuilding(buildingOptions[0].value);
		}

		if (buildingOptions.length === 0) {
			return setBuilding(undefined);
		}
	}, [residenceArea, building, includesValue, buildingOptions]);

	const [allowedGender, setAllowedGender] = useState("Any");
	const allowedGenderOptions = ["Male", "Female", "Any"].map((value) => ({
		value,
		label: value,
	}));

	const constructRoom = () => {
		const base = {
			residenceArea: residenceArea,
			generalInfo: {
				session: session,
				residenceType: residences.find((res) => {
					return res.name === residenceArea;
				}).type,
			},
			roomInfo: {
				room: room,
				floor: floor,
				washroom: washroom,
			},
			eligibilityInfo: {
				allowedGender: allowedGender,
				minimumAge: residences.find((res) => {
					return res.name === residenceArea;
				}).minimumAge,
			},
		};

		if (!building) {
			return base;
		}

		base["roomInfo"]["building"] = building;

		return base;
	};

	return (
		<ContainerDiv>
			<label htmlFor="residenceArea">Residence Area: </label>
			<SmallSelect
				value={residenceAreaOptions.find((option) => {
					return option.value === residenceArea;
				})}
				onChange={(option) => setResidenceArea(option.value)}
				id="residenceArea"
				name="residenceArea"
				options={residenceAreaOptions}
			/>
			<label htmlFor="session">Session: </label>
			<SmallSelect
				value={sessionOptions.find(
					(option) => option.value === session
				)}
				onChange={(option) => setSession(option.value)}
				id="session"
				name="session"
				options={sessionOptions}
			/>
			<label htmlFor="room">Room: </label>
			<SmallSelect
				value={roomOptions.find((option) => option.value === room)}
				onChange={(option) => setRoom(option.value)}
				id="room"
				name="room"
				options={roomOptions}
			/>
			<label htmlFor="floor">Floor: </label>
			<NumberHolder
				number={floor}
				notify={(newFloor) => setFloor(newFloor)}
			/>
			<label htmlFor="washroom">Washroom: </label>
			<SmallSelect
				value={washroomOptions.find(
					(option) => option.value === washroom
				)}
				onChange={(option) => setWashroom(option.value)}
				id="washroom"
				name="washroom"
				options={washroomOptions}
			/>
			{buildingOptions.length > 0 && (
				<>
					<label htmlFor="building">Building: </label>

					<SmallSelect
						value={buildingOptions.find(
							(option) => option.value === building
						)}
						onChange={(option) => setBuilding(option.value)}
						id="building"
						name="building"
						options={buildingOptions}
					/>
				</>
			)}
			<label htmlFor="allowedGender">Allowed Gender: </label>
			<SmallSelect
				value={allowedGenderOptions.find(
					(option) => option.value === allowedGender
				)}
				onChange={(option) => setAllowedGender(option.value)}
				id="allowedGender"
				name="allowedGender"
				options={allowedGenderOptions}
			/>
			<button
				onClick={() =>
					notify({ room: constructRoom(), date: Date.now() })
				}
			>
				Add Room
			</button>
		</ContainerDiv>
	);
}

export default RoomForm;
