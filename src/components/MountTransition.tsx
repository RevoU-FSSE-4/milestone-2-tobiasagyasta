import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, ReactNode } from "react";

interface TransitionProps {
	children: ReactNode;
}

const MountTransition: React.FC<TransitionProps> = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []); // Trigger animation on component mount

	const fadeAndMoveOnMount = useSpring({
		opacity: isVisible ? 1 : 0,
		transform: isVisible ? "translateY(0)" : "translateY(50px)",
		from: { opacity: 0, transform: "translateY(50px)" },
		config: { duration: 750 },
	});

	return <animated.div style={fadeAndMoveOnMount}>{children}</animated.div>;
};

export default MountTransition;
