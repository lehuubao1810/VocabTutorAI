import React from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { VocabularyFlipCard } from "../components/vocabulary/VocabularyCard";
type Props = {
	// type of the props
};

export const Collection: React.FC<Props> = (props) => {
	const location = useLocation();
	const data = location.state as {
		id: string;
		name: string;
		desc: string;
		value: number;
		date: string;
		vocabulary: {
			word: string;
			translation: string;
			mean: string;
			pronunciation: string;
			example: string;
		}[];
	};
	return (
		<div>
			<header>
				<Header />
			</header>
			<main className="bg-gray-100">
				<div className="pt-20 ml-auto mr-auto max-w-screen-xl px-20 py-4">
					<div className="px-4 py-6">
						<h1 className="text-3xl font-bold">{data.name}</h1>
						<p className="text-xl font-semibold text-gray-600 pt-4 pb-2 px-5">
							{data.desc}
						</p>
						<span className="text-lg font-semibold px-5">
							<FontAwesomeIcon icon={faCalendar} /> {data.date}
						</span>
					</div>
					<div className="flex justify-between items-center gap-8">
						<Link
							to={`/learn/${data.id}`}
							state={data.vocabulary}
							className="w-full h-12 rounded-md border-2 pt-2 text-lg text-center font-semibold bg-white hover:bg-gray-300"
						>
							Learn vocabulary
						</Link>
						<button className="w-full h-12 rounded-md border-2 text-lg font-semibold bg-blue-400 text-white hover:bg-blue-300">
							Share this vocabulary{" "}
							<FontAwesomeIcon icon={faShareFromSquare} className="ml-3" />
						</button>
					</div>
					<div className="mt-5">
						{/* Flip card */}
						<VocabularyFlipCard vocabularyData={data.vocabulary} />{" "}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
