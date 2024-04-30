import { useState, useEffect } from "react";
import moment from "moment-timezone";
import LoadingOverlay from "react-loading-overlay-nextgen";
const TimeFetcher = ({ timezone }: any) => {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [isActive, setIsActive] = useState<boolean>(true);
	const customStyles: React.CSSProperties = {
		color: "black",
		backgroundColor: "black",
		fill: "black",
	};
	const mergeSpinnerStyles = (
		base: React.CSSProperties
	): React.CSSProperties => {
		// Merge the base spinner styles with customStyles
		return {
			...base,
			...customStyles,
		};
	};
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
				<div>
					<div>{currentDate}</div>
					<div>{currentTime}</div>
				</div>
			) : (
				<div className='animate-bounce'>Getting date and time...</div>
			)}
		</>
	);
};

export default TimeFetcher;
