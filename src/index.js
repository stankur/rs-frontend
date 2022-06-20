import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AllOffers from "./routes/AllOffers/AllOffers";
import MyOffers from "./routes/MyOffers";
import NewOffer from "./routes/NewOffer/NewOffer";
import Matches from "./routes/Matches";
import OfferButler from "./routes/OfferButler/OfferButler";

import SignUp from "./routes/SignUp";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import LogIn from "./routes/LogIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="" element={<Navigate to="/all-offers" />} />
					<Route path="all-offers" element={<AllOffers />} />
					<Route path="my-offers" element={<MyOffers />} />
					<Route path="new-offer" element={<NewOffer />} />
					<Route path="offer-butler" element={<OfferButler />} />
					<Route path="/matches" element={<Matches />} />
					<Route path="authentication/sign-up" element={<SignUp />} />
					<Route path="authentication/log-in" element={<LogIn />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
