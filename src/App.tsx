import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WeatherCountry from "./pages/WeatherCountry";
import Display from "./pages/Display";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Display />}></Route>
				<Route path='/:capital' element={<WeatherCountry />}></Route>
			</Routes>
		</>
	);
}

export default App;
