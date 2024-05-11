import React from "react";
import { Header } from "../components/header/Header";
import Banner from "../components/main/Banner";
import { CollectionList } from "../components/Collection/CollectionList";
import Footer from "../components/footer/Footer";

type Props = {};

export const Home: React.FC<Props> = (props) => {
	console.log(props);
	return (
		<div>
			<header>
				<Header />
			</header>
			<main className="bg-slate-100 min-h-screen">
				<div className="pt-24 ml-auto mr-auto max-w-screen-xl px-5 py-4">
					<Banner />
					<div className="py-6">
						{/* Top collection */}
						<div className="flex justify-between items-center"></div>
						<CollectionList />
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
