import { useLocation } from "react-router-dom";

const TestComponents = () => {
	const location = useLocation();
	return (
		<div>
			<h1>{location.pathname.split("/")[1].toUpperCase()} Page</h1>
		</div>
	);
};

export default TestComponents;
