import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	faEdit,
	faEnvelopeOpenText,
	faShare,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface VocabularyItem {
	word: string;
	translation: string;
	mean: string;
	pronunciation: string;
	example: string;
}
interface CollectionItemProps {
	collectionID: string;
	name: string;
	desc: string;
	value: number;
	date: string;
	vocabulary: VocabularyItem[];
}

const CollectionItem: React.FC<CollectionItemProps> = ({
	collectionID,
	name,
	desc,
	value,
	date,
	vocabulary,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();
	const transferData = {
		id: collectionID,
		name: name,
		desc: desc,
		value: value,
		date: date,
		vocabulary: vocabulary,
	};
	const handleEditCollection = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(`/collection/${transferData.id}/edit`, { state: transferData });
	};
	return (
		<Link to={`/collection/${collectionID}`} state={transferData}>
			<div
				className="relative w-70 h-50 bg-gray-100 rounded-lg shadow-lg ease-linear z-0"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{isHovered && (
					<div className="absolute top-1 right-1 z-10 flex ">
						<button
							className="text-gray-500 hover:text-gray-700 mr-2"
							onClick={handleEditCollection}
						>
							<FontAwesomeIcon icon={faEdit} />
						</button>
						<button className="text-red-500 hover:text-red-700 mr-2">
							<FontAwesomeIcon icon={faTrash} />
						</button>
						<button className="text-blue-500 hover:text-red-700">
							<FontAwesomeIcon icon={faShare} />
						</button>
					</div>
				)}
				<div className="flex flex-col mt-1 p-4 gap-2">
					<h2 className="text-lg font-semibold">{name}</h2>
					<p className="text-sm text-gray-500">{desc}</p>
					<div className="flex gap-2 max-lg:flex-col">
						<div className="flex items-center gap-2">
							<FontAwesomeIcon icon={faEnvelopeOpenText} />
							<span className="">{value}</span>
							<span className="text-gray-500">word</span>
						</div>
						<span className="max-lg:hidden">|</span>
						<div className="flex items-center gap-2">
							<span className="text-gray-500">Last access:</span>
							<span className="">{date}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CollectionItem;
