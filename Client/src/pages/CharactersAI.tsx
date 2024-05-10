import React from "react";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { charactersAI } from "../dataTest/characterAI";
import Footer from "../components/footer/Footer";

type Props = {
	//
};

export const CharactersAI: React.FC<Props> = () => {
	const navigate = useNavigate();

	const handleJoinChat = (characterId: string) => {
		console.log("Join chat with AI character id: ", characterId);
		navigate(`/characters-ai/${characterId}`);
	};

	return (
		<div>
			<header>
				<Header />
			</header>
			<main className="bg-slate-100">
				<div className="pt-24 ml-auto mr-auto max-w-screen-xl px-5 py-4">
					<div className="my-4">
						<h1 className="text-2xl font-bold text-slate-900">Characters AI</h1>
					</div>
					{/* list card AI to chat*/}
					<div className="pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
						{charactersAI.map((character) => (
							<div
								key={character.id}
								className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
							>
								<div className="mb-2">
									<img
										src={character.image}
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
									onClick={() => handleJoinChat(character.id)}
								>
									{character.isChat ? "Continue chat" : "Start chat"}
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
