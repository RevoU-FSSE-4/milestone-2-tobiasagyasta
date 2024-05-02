import { useState, useEffect } from "react";
import moment from "moment-timezone";
import MountTransition from "./MountTransition";
const TimeFetcher = ({ timezone }: any) => {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [isActive, setIsActive] = useState<boolean>(true);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = moment.tz(timezone);
			setCurrentDate(now.format("dddd, DD MMMM YYYY"));
			setCurrentTime(now.format("hh:mm:ss A"));
			setIsActive(false);
		}, 1000); // Update time every second
		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [timezone]);
	return (
		<>
			{currentDate !== "" && currentTime !== "" && !isActive ? (
				<MountTransition>
					<div>
						<div>{currentDate}</div>
						<div>{currentTime}</div>
					</div>
				</MountTransition>
			) : null}
		</>
	);
};

export default TimeFetcher;
