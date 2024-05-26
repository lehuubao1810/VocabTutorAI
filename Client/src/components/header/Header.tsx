import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/authSlice";
import { TranslateInput } from "./TranslateInput";
import { UserModal } from "./UserModal";
import { Nav } from "./Nav";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLanguage } from "@fortawesome/free-solid-svg-icons";

type Props = {
	//
};

export const Header: React.FC<Props> = () => {
	const [modalUser, setModalUser] = useState(false);
	const [isTranslateOpen, setIsTranslateOpen] = useState(false);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.authReducer);

	// const { translated } = useAppSelector((state) => state.dictionaryReducer);

	const handleLogout = () => {
		dispatch(logOut())
			.unwrap()
			.then(() => {
				console.log("Logout success");
			});
	};

	const handleTranslateOpen = () => {
		setIsTranslateOpen(true);
		if (isNavOpen) {
			setIsNavOpen(false);
		}
	};
	const handleNavbarOpen = () => {
		setIsNavOpen(true);
		if (isTranslateOpen) {
			setIsTranslateOpen(false);
		}
	};
	return (
		<header className="fixed top-0 left-0 w-full z-[500]">
			<div className="max-w-screen-xl mx-auto px-5 py-4 bg-white rounded-xl shadow-md z-10">
				<div className="flex justify-between items-center gap-2">
					{/* Logo */}
					<div className="flex items-center gap-3">
						<button
							type="button"
							title="Menu"
							className="hidden max-sm:block"
							onClick={handleNavbarOpen}
						>
							<FontAwesomeIcon icon={faBars} />
						</button>
						<h1
							className="text-2xl font-bold text-cyan-500 cursor-pointer"
							onClick={() => {
								navigate("/");
							}}
						>
							TutorAI.
						</h1>
					</div>
					{/* Navbar */}

					<div className="max-sm:hidden">
						<Nav />
					</div>
					{isNavOpen && (
						<div className="absolute top-20 left-4 bg-white shadow-lg rounded-lg p-4 pt-2">
							<Nav />
						</div>
					)}
					{/* dictionary */}
					<button
						className="hidden text-gray-700 flex justify-center items-center gap-2 max-sm:block"
						onClick={handleTranslateOpen}
					>
						<FontAwesomeIcon icon={faLanguage} />
						Translate
					</button>
					<div className="w-6/12 max-lg:w-4/12 max-sm:hidden">
						<TranslateInput />
					</div>
					{/* user */}
					<div
						className="flex gap-2 items-center cursor-pointer"
						onClick={() => setModalUser(!modalUser)}
					>
						<img
							// src="https://randomuser.me/api/portraits/men/73.jpg"
							src={user?.photoURL}
							alt=""
							className="w-10 h-10 rounded-full"
						/>
					</div>
					{modalUser && <UserModal user={user} handleLogout={handleLogout} />}
				</div>
				{isTranslateOpen && (
					<div className="hidden mt-5 max-sm:block">
						<TranslateInput />
					</div>
				)}
			</div>
		</header>
	);
};
