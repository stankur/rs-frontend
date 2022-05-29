import "./App.css";
import { Outlet, NavLink } from "react-router-dom";

import useIsLoggedIn from "./hooks/useIsLoggedIn";

import styled from "styled-components";

import ContainerDiv from "./commonComponents/OfferPanel/ContainerDiv";
import Loader from "./commonComponents/LoadingLoader/Loader";
import ShadowedHighlightedText from "./commonComponents/OfferPanel/ShadowedHighlightedText";

const NavContainer = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-left: 3.5px;
	margin-right: 3.5px;
	margin-bottom: 7px;
`;

const ColoredNavLink = styled(NavLink).attrs(() => ({
	style: ({ isActive }) => (isActive ? { fontWeight: "bold" } : {}),
}))`
	text-decoration: none;
	color: black;
`;

function NavBar({ to, children }) {
	return (
		<ContainerDiv>
			<ColoredNavLink to={to}>{children}</ColoredNavLink>
		</ContainerDiv>
	);
}

function AuthenticationSection({ userData }) {
	if (userData) {
		return (
			<span style={{fontFamily: "sans-serif"}}>
				Welcome back{" "}
				<ShadowedHighlightedText>
					{userData["user"]["username"]}
				</ShadowedHighlightedText>
			</span>
		);
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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				padding: "0 7px",
			}}
		>
			<div
				style={{
					display: "inline-flex",
					gap: "25px",
					paddingLeft: "20px",
				}}
			>
				<div style={{ display: "inline-block", position: "relative" }}>
					<Loader
						size="30px"
						duration="5s"
						src="/transparentSwitchLogo.png"
					/>
				</div>
				<h1
					style={{ display: "inline-flex", fontFamily: "sans-serif" }}
				>
					Room Switch
				</h1>
			</div>
			<NavContainer>
				<span style={{ display: "inline-flex", gap: "7px" }}>
					<NavBar to="/all-offers">All Offers</NavBar>{" "}
					<NavBar to="/my-offers">My Offers</NavBar>{" "}
					<NavBar to="/new-offer">New Offer</NavBar>
				</span>
				{userData !== undefined && (
					<AuthenticationSection userData={userData} />
				)}
			</NavContainer>
			<div
				style={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					position: "relative",
				}}
			>
				<Outlet context={[userData, setAuthorizationHeader]} />
			</div>
			<footer style={{ paddingBottom: "7px" }}>
				<ContainerDiv
					style={{ width: "100%", boxSizing: "border-box" }}
				>
					Please email beckkrot@gmail.com for bug reports or any
					feedback.
				</ContainerDiv>
			</footer>
		</div>
	);
}

export default App;
