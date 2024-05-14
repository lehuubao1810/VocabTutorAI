import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { CharactersAI } from "./pages/CharactersAI";
import { AddCollection } from "./pages/AddCollection";
import { Collection } from "./pages/Collection";
import { PageNotFound } from "./pages/PageNotFound";
import { EditCollection } from "./pages/EditCollection";
import { Learn } from "./pages/Learn";
import { RoomAI } from "./pages/RoomAI";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { useAppDispatch } from "./redux/hooks";
import { setAuth } from "./redux/authSlice";
import { getListCharacterAI } from "./redux/characterSlice";
import { LearnResult } from "./pages/LearnResult";

type isAuth = "checking" | boolean;

function App() {
	const [isAuth, setIsAuth] = useState<isAuth>("checking");
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuth(true);
				console.log(user);
				dispatch(
					setAuth({
						username: user.displayName,
						email: user.email,
						uid: user.uid,
					})
				);
				dispatch(getListCharacterAI(user.uid));
			} else {
				setIsAuth(false);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<BrowserRouter>
			{isAuth === "checking" ? (
				<LoadingScreen />
			) : (
				<Routes>
					<Route
						path="/login"
						element={isAuth ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/signup"
						element={isAuth ? <Navigate to="/" /> : <SignUp />}
					/>

					<Route
						path="/"
						element={!isAuth ? <Navigate to="/login" /> : <Home />}
					/>
					<Route
						path="/characters-ai"
						element={!isAuth ? <Navigate to="/login" /> : <CharactersAI />}
					/>
					<Route
						path="/add-collection"
						element={!isAuth ? <Navigate to="/login" /> : <AddCollection />}
					/>
					<Route
						path="/collection/:idCollection"
						element={!isAuth ? <Navigate to="/login" /> : <Collection />}
					/>
					<Route
						path="/collection/:idCollection/edit"
						element={!isAuth ? <Navigate to="/login" /> : <EditCollection />}
					/>
					<Route
						path="/collection/:idCollection/learn"
						element={!isAuth ? <Navigate to="/login" /> : <Learn />}
					/>
					<Route
						path="/learnResult"
						element={!isAuth ? <Navigate to="/login" /> : <LearnResult />}
					/>
					<Route
						path="/characters-ai/:conversationID"
						element={!isAuth ? <Navigate to="/login" /> : <RoomAI />}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;
