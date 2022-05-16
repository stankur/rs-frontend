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

export { getFilterOptions };
