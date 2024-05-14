import React, { useState } from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { Stats } from "../components/learn/Stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

type Props = {};

export const LearnResult: React.FC<Props> = (props) => {
	return (
		<>
			<Header />
			<main className="bg-gray-100">
				<div className="pt-24 ml-auto mr-auto max-w-screen-xl px-5 py-4">
					<div className="flex flex-col gap-3 px-5 py-6 ">
						<h1 className="text-3xl font-bold text-blue-500">
							{" "}
							Learn Results <FontAwesomeIcon icon={faSquarePollVertical} />
						</h1>
						<p className="ml-4 text-xl text-gray-500">
							This result will show by chart
						</p>
					</div>
					<Stats />
				</div>
			</main>
			<Footer />
		</>
	);
};
