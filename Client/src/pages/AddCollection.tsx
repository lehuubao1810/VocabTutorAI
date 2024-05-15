import React from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";

type Props = {
	// type of the props
};

export const AddCollection: React.FC<Props> = (props) => {
	console.log(props);
	return (
		<div>
			<header>
				<Header />
			</header>
			<main className="bg-gray-100">
				<div className="pt-20 ml-auto mr-auto max-w-screen-xl px-20 py-4">
					<div className="px-4 py-6">
						<h1 className="text-3xl font-bold">Add Collection</h1>
						<p className="text-xl font-semibold text-gray-600 pt-4 pb-2 px-5">
							Add collection page
						</p>
					</div>
					<div className="w-full h-98 rounded-xl border-1 bg-white">
						<div className="px-5 py-5">
							<div className="flex gap-4">
								<h2 className="font-semibold text-lg">
									Name collection you want to add :
								</h2>
								<input placeholder="Name" type="text" className="border-b-2 text-lg " />
							</div>
							<div className="flex gap-4">
								<h2 className="font-semibold text-lg">
									Description of this collection :
								</h2>
								<input placeholder="Description" type="text" className="border-b-2 text-lg " />
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
