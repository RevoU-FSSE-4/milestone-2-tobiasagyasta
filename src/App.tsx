import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WeatherCountry from "./pages/WeatherCountry";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/:capital' element={<WeatherCountry />}></Route>
			</Routes>
		</>
	);
}

export default App;
