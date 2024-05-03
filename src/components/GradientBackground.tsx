import { useSpring, animated } from "@react-spring/web";
import { ReactNode } from "react";

interface GradientBackgroundProps {
	children: ReactNode;
	weatherID: number;
}
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
	children,
	weatherID,
}) => {
	const getGradientColors = (weatherID: number) => {
		if (weatherID >= 200 && weatherID < 300)
			//Thunderstorm
			return { from: "#0F0C29", to: "#302B63", transition: "#24243E" };
		if (weatherID >= 300 && weatherID < 400)
			//Drizzle
			return { from: "#C9D6FF", to: "#E2E2E2", transition: "#E2E2E2" };
		if (weatherID >= 500 && weatherID < 600)
			//Rain
			return { from: "#2B2B2B", to: "#262626", transition: "#1E1E1E" };
		if (weatherID >= 600 && weatherID < 700)
			//Snow
			return { from: "#FFFFFF", to: "#B5D6FF", transition: "#B5D6FF" };
		if (weatherID >= 700 && weatherID < 800)
			//Atmosphere
			return { from: "#E0E0E0", to: "#BDBDBD", transition: "#BDBDBD" };
		if (weatherID >= 800) {
			// Clear
			if (weatherID > 800) {
				//Cloudy
				return { from: "#E8E8E8", to: "#BDBDBD", transition: "#BDBDBD" };
			}
			return { from: "#7AD7F0", to: "#FDFD96", transition: "#FDFD96" };
		}
		return { from: "#FFFFFF", to: "#FFFFFF", transition: "#FFFFFF" }; // Default to white gradient
	};
	const { from, to, transition } = getGradientColors(weatherID);

	// Define the animated styles for the gradient
	const styles = useSpring({
		from: { background: `linear-gradient(45deg, ${from}, ${to})` },
		to: { background: `linear-gradient(45deg, ${to}, ${transition})` },
		config: { duration: 5000 },
	});

	return (
		<animated.div style={{ ...styles, width: "100%", height: "100%" }}>
			{children}
		</animated.div>
	);
};

export default GradientBackground;
