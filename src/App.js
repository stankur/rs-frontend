import "./App.css";
import { Outlet, NavLink } from "react-router-dom";

function App() {
	return (
		<div>
			<h1>Room Switch</h1>
			<nav>
				<NavLink to="/all-offers">All Offers</NavLink>{" "}
				<NavLink to="/my-offers">My Offers</NavLink>{" "}
				<NavLink to="/">+</NavLink>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
