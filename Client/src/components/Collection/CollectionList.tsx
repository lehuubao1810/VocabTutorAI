import React from "react";
import CollectionItem from "./CollectionItem";
import { dummyData } from "../../dataTest/dataVocab";
import { Link, useNavigate } from "react-router-dom";

type collectionProps = {};

export const CollectionList: React.FC<collectionProps> = () => {
	const data = dummyData;
	const Navigate = useNavigate();
	const HandleAddCollection = () => {
		Navigate("/add-collection");
	};
	return (
		<>
			<div className="flex justify-between items-center">
				<h1>
					<Link
						to="#!"
						className="text-3xl font-semibold underline underline-offset-4"
					>
						Collection
					</Link>
				</h1>
				<button
					onClick={HandleAddCollection}
					className="w-60 border-2 rounded-lg bg-blue-400 text-white 
						font-medium py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 
						focus:ring-blue-600 focus:ring-opacity-75
						max-sm:w-40"
				>
					Add Collection
				</button>
			</div>
			{/* Collection list */}
			<div className="relative z-0 grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
				{data.map((item) => (
					<CollectionItem
						key={item.name}
						name={item.name}
						desc={item.desc}
						value={item.value}
						date={item.date}
						collectionID={item.collectionID}
						vocabulary={item.vocabulary}
					/>
				))}
			</div>
		</>
	);
};
