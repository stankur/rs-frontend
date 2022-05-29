import { useEffect, useState } from "react";
import dayjs from "dayjs";

function useLastUpdatedOfferTime() {
	const [lastUpdatedOfferTime, setLastUpdatedOfferTime] = useState(undefined);

	useEffect(() => {
		if (lastUpdatedOfferTime === undefined) {
			const fromStorage = localStorage.getItem("lastUpdatedOfferTime");

			if (fromStorage) {
				return setLastUpdatedOfferTime(Number.parseInt(fromStorage));
			}

			return setLastUpdatedOfferTime(
				dayjs().subtract(2, "hour").valueOf()
			);
		}

		if (
			!dayjs(
				Number.parseInt(localStorage.getItem("lastUpdatedOfferTime"))
			).isSame(dayjs(lastUpdatedOfferTime))
		) {
			return localStorage.setItem(
				"lastUpdatedOfferTime",
				lastUpdatedOfferTime
			);
		}
	}, [lastUpdatedOfferTime]);

	const renew = () => {
		const now = dayjs(Date.now()).valueOf();
		localStorage.setItem("lastUpdatedOfferTime", now);
		return setLastUpdatedOfferTime(localStorage);
	};

	return [lastUpdatedOfferTime, renew];
}

export default useLastUpdatedOfferTime;
