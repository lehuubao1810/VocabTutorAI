import React from "react";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
// import { charactersAI } from "../dataTest/characterAI";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	createConversation,
	getConversation,
} from "../redux/conversationSlice";
import { notify } from "../utils/notify";
import { changeStatusCharacter } from "../redux/characterSlice";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

type Props = {
	//
};

export const CharactersAI: React.FC<Props> = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { charactersAI } = useAppSelector((state) => state.characterReducer);
	const { conversation } = useAppSelector((state) => state.conversationReducer);
	const { user } = useAppSelector((state) => state.authReducer);

	const handleJoinChat = (conversationID: string) => {
		console.log("Join chat with AI character id: ", conversationID);
		dispatch(getConversation(conversationID))
			.unwrap()
			.then((res) => {
				console.log("Join chat success", res);
				navigate(`/characters-ai/${conversationID}`);
			});
	};

	const handleCreateChat = (characterId: string) => {
		console.log("Create chat with AI character id: ", characterId);
		dispatch(createConversation({ character: characterId, uid: user.uid }))
			.unwrap()
			.then((res) => {
				console.log("Create chat success", res);
				dispatch(
					changeStatusCharacter({
						characterID: characterId,
						status: true,
						conversationID: res._id,
					})
				);
			})
			.then(() => {
				navigate(`/characters-ai/${conversation._id}`);
			});
	};

	return (
		<>
			<Header />
			<main className=" bg-gray-100">
				<div className="pt-20 ml-auto mr-auto max-w-screen-xl px-5 py-4">
					<div className="my-4">
						<h1 className="text-3xl font-bold text-blue-600 px-5">
							<FontAwesomeIcon icon={faRocketchat} /> Characters AI
						</h1>
					</div>
					{/* list card AI to chat*/}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{charactersAI.map((character) => (
							<div
								key={character._id}
								className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
							>
								<div className="mb-2">
									<img
										src={
											character.image ||
											"https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
										}
										alt={character.name}
										className="w-full h-60 object-cover rounded-lg"
									/>
									<div className="my-2">
										<h2 className="text-xl font-semibold text-slate-800">
											{character.name}
										</h2>
										<p className="text-slate-500">{character.description}</p>
									</div>
								</div>

								{/* button */}
								<div
									className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg text-center"
									onClick={() => {
										if (character.isChat) {
											console.log(character.conversationID);
											if (character.conversationID) {
												handleJoinChat(character.conversationID);
											} else {
												notify(
													"error",
													"Can't join chat, please try again later!"
												);
											}
										} else {
											handleCreateChat(character._id);
										}
									}}
								>
									{character.isChat ? "Continue chat" : "Start chat"}
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};
