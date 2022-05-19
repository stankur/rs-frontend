const getFilterOptions = () => {
	return {
		numberOfPeople: [1, 2],
		roomsWanted: [1, 2],
		rooms: {
			spec: "Includes",
			criteria: {
				residenceArea: [
					"Orchard Commons",
					"Place Vanier",
					"Totem Park",
					"Brock Commons – Tallwood House",
					"Exchange",
					"Fairview Crescent",
					"Fraser Hall",
					"Iona House",
					"Marine Drive",
					"Ponderosa Commons",
					"Ritsumeikan-UBC House",
					"tə šxʷhəleləm̓s tə k̓ʷaƛ̓kʷəʔaʔɬ",
					"Thunderbird",
					"Walter Gage",
					"Acadia Park",
					"Green College",
					"St. John's College",
				],

				generalInfo: {
					residenceType: [
						"First Year",
						"Upper Year",
						"Student Families",
						"Graduate Colleges",
					],
					session: ["Year Round", "Winter Session", "Summer Session"],
				},

				roomInfo: {
					room: [
						"Shared Room",
						"Connected Single Room",
						"Single Traditional Room",
						"Six Bedroom Suite",
						"Four Bedroom Suite",
						"Three Bedroom Suite",
						"Two Bedroom Suite",
						"One Bedroom Suite",
						"Studio Suite",
						"Nano Suite",
						"Townhouse",
					],
					floor: {
						spec: "Interval",
						criteria: [1, "Infinity"],
					},
					washroom: ["Private", "Communal"],
				},

				eligibilityInfo: {
					minimumAge: [1, 18, 19],
					allowedGenders: ["Male", "Female", "Any"],
				},
			},
		},
	};
};

const getOfferJSONSample = () => {
	return {
		_id: "6283aa18a8792c8e94d2270c",
		numberOfPeople: 2,
		roomsWanted: 2,
		rooms: [
			{
				residenceArea: "Totem Park",
				generalInfo: {
					session: "Winter Session",
					_id: "6283aa18a8792c8e94d2270e",
					residenceType: "First Year",
				},
				roomInfo: {
					room: "Shared Room",
					floor: 1,
					washroom: "Communal",
					building: "Nootka House",
					_id: "6283aa18a8792c8e94d2270f",
				},
				eligibilityInfo: {
					allowedGender: "Male",
					_id: "6283aa18a8792c8e94d22710",
					minimumAge: 1,
				},
				_id: "6283aa18a8792c8e94d2270d",
			},
			{
				residenceArea: "Orchard Commons",
				generalInfo: {
					session: "Winter Session",
					_id: "6283aa18a8792c8e94d2270e",
					residenceType: "First Year",
				},
				roomInfo: {
					room: "Shared Room",
					floor: 1,
					washroom: "Communal",
					building: "Bartlett House",
					_id: "6283aa18a8792c8e94d2270f",
				},
				eligibilityInfo: {
					allowedGender: "Male",
					_id: "6283aa18a8792c8e94d22710",
					minimumAge: 1,
				},
				_id: "6283aa18a8792c8e94d2270d",
			},
		],
		preference: [
			{
				residenceArea: [
					"Orchard Commons",
					"Totem Park",
					"Exchange",
					"Fraser Hall",
				],
				roomInfo: {
					room: [
						"Shared Room",
						"Connected Single Room",
						"Single Traditional Room",
						"Six Bedroom Suite",
						"Four Bedroom Suite",
						"Three Bedroom Suite",
						"Two Bedroom Suite",
						"One Bedroom Suite",
						"Studio Suite",
						"Nano Suite",
						"Townhouse",
					],
					floor: {
						spec: "Interval",
						criteria: [1, 9],
						_id: "6283aa18a8792c8e94d22713",
					},
					washroom: ["Private", "Communal"],
					_id: "6283aa18a8792c8e94d22712",
				},
				_id: "6283aa18a8792c8e94d22711",
				generalInfo: {
					residenceType: [
						"First Year",
						"Upper Year",
						"Student Families",
						"Graduate Colleges",
					],
					session: ["Year Round", "Winter Session", "Summer Session"],
					_id: "6283aa18a8792c8e94d22714",
				},
				eligibilityInfo: {
					allowedGender: ["Male", "Female", "Any"],
					_id: "6283aa18a8792c8e94d22715",
					minimumAge: {
						spec: "Interval",
						criteria: [1, 9007199254740991],
						_id: "6283aa18a8792c8e94d22716",
					},
				},
			},
		],
		dateCreated: "2022-05-17T13:58:48.456Z",
		__v: 0,
	};
};
export { getFilterOptions, getOfferJSONSample };
