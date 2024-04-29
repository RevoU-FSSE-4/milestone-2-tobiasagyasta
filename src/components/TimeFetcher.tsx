import { useState, useEffect } from "react";
import moment from "moment-timezone";
const TimeFetcher = ({ timezone }: any) => {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = moment.tz(timezone);
			setCurrentDate(now.format("dddd, DD MMMM YYYY"));
			setCurrentTime(now.format("hh:mm:ss A"));
		}, 1000); // Update time every second
		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [timezone]);
	return (
		<div>
			<div>{currentDate}</div>
			<div>{currentTime}</div>
		</div>
	);
};

export default TimeFetcher;
