import "./App.css";
import { Outlet, NavLink } from "react-router-dom";

import useIsLoggedIn from "./hooks/useIsLoggedIn";

import styled from "styled-components";

import ContainerDiv from "./commonComponents/OfferPanel/ContainerDiv";

const NavContainer = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-left: 3.5px;
	margin-right: 3.5px;
	margin-bottom: 7px;
`;

function NavBar({ to, children }) {
	return (
		<ContainerDiv>
			<NavLink to={to}>{children}</NavLink>
		</ContainerDiv>
	);
}

function AuthenticationSection({ userData }) {
	if (userData) {
		return <span>Welcome back {userData["user"]["username"]}!</span>;
	}

	return (
		<span>
			{" "}
			<NavBar to="/authentication/sign-up">Sign Up</NavBar>{" "}
			<NavBar to="/authentication/log-in">Log In</NavBar>{" "}
		</span>
	);
}

function App() {
	const [userData, setAuthorizationHeader] = useIsLoggedIn();

	return (
		<div>
			<h1>Room Switch</h1>
			<NavContainer>
				<span>
					<NavBar to="/all-offers">All Offers</NavBar>{" "}
					<NavBar to="/my-offers">My Offers</NavBar>{" "}
					<NavBar to="/">New Offer</NavBar>
				</span>
				{userData !== undefined && (
					<AuthenticationSection userData={userData} />
				)}
			</NavContainer>
			<Outlet context={[userData, setAuthorizationHeader]} />
			<footer>
				<ContainerDiv>by stankur</ContainerDiv>
			</footer>
		</div>
	);
}

export default App;
