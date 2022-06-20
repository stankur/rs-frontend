import { Outlet, NavLink } from "react-router-dom";

import useIsLoggedIn from "./hooks/useIsLoggedIn";

import styled from "styled-components";

import Loader from "./commonComponents/LoadingLoader/Loader";
import ShadowedHighlightedText from "./commonComponents/OfferPanel/ShadowedHighlightedText";

const NameContainer = styled(ShadowedHighlightedText)`
	background-color: #ffffff93;
`;

const NavContainer = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	padding: 7px;

	margin-bottom: 7px;
	margin-left: -7px;
	margin-right: -7px;

	background-color: #d1d0d0b5;
`;

const ColoredNavLink = styled(NavLink)`
	font-family: sans-serif;
	font-size: 0.9em;
	text-decoration: none;
	color: black;
`;

const RoomSwitchTitle = styled.span`
	font-family: sans-serif;
	font-weight: bold;
	flex-grow: 1;

	font-size: 2em;
	@media (max-width: 500px) {
		font-size: 1.5em;
	}
`;

const FooterBar = styled.div`
	width: 100%;
	padding: 7px;
	margin-left: -7px;
	margin-right: -7px;
	margin-bottom: -7px;
	font-family: sans-serif;
	font-size: 0.75em;
`;

function NavBar({ to, children }) {
	return (
		<div style={{ display: "inline-block" }}>
			<ColoredNavLink to={to}>{children}</ColoredNavLink>
		</div>
	);
}

function AuthenticationSection({ userData }) {
	if (userData) {
		return (
			<span style={{ fontFamily: "sans-serif" }}>
				Hello,{" "}
				<NameContainer>{userData["user"]["username"]}</NameContainer>
			</span>
		);
	}

	return (
		<span style={{ display: "inline-flex", gap: "20px" }}>
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
					alignItems: "center",
					gap: "20px",
					paddingLeft: "27px",
					paddingTop: "20px",
					paddingBottom: "20px",
					paddingRight: "27px",
					marginLeft: "-7px",
					marginRight: "-7px",
					boxSizing: "content-box",
					backgroundColor: "#ebe9e9ff",
				}}
			>
				<div style={{ display: "inline-block", position: "relative" }}>
					<Loader
						size="30px"
						duration="5s"
						src="/transparentSwitchLogo.png"
					/>
				</div>
				<RoomSwitchTitle>Room Switch</RoomSwitchTitle>
				{userData !== undefined && (
					<AuthenticationSection userData={userData} />
				)}
			</div>
			<NavContainer>
				<span
					style={{
						display: "inline-flex",
						gap: "25px",
					}}
				>
					<NavBar to="/all-offers">All Offers</NavBar>{" "}
					<NavBar to="/my-offers">My Offers</NavBar>{" "}
					<NavBar to="/new-offer">New Offer</NavBar>{" "}
					<NavBar to="/offer-butler">Offer Butler</NavBar>
				</span>
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
				<FooterBar
					style={{
						display: "flex",
						gap: "20px",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#d1d0d0ce",
						fontWeight: "normal",
						marginBottom: 0,
						height: "50px",
					}}
				>
					<div
						style={{
							display: "inline-block",
							position: "relative",
						}}
					>
						<Loader
							size="30px"
							duration="5s"
							src="/transparentSwitchLogo.png"
						/>
					</div>
					<RoomSwitchTitle style={{ flexGrow: 0 }}>
						Room Switch
					</RoomSwitchTitle>
				</FooterBar>
				<FooterBar
					style={{
						backgroundColor: "#b2b2b2ce",
						fontWeight: "lighter",
						textAlign: "justify",
						textAlignLast: "center",
					}}
				>
					<span style={{ textJustify: "inter-character" }}>
						This website still has a lot to improve and I sincerely
						want to make your experience using this website as
						enjoyable and as useful as possible. I hope you don't
						mind to email me at terserahskurniawan@gmail.com for any
						suggestion, issues, or about anything on this website :)
						Please know that I really appreciate your feedbacks and
						I will immediately get back on my laptop to work on
						suggestions for imporvements as soon as i view your
						email. Thank you!
					</span>
				</FooterBar>
			</footer>
		</div>
	);
}

export default App;
