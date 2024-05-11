import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Props {
	LearningData: {
		word: string;
		translation: string;
		mean: string;
		pronunciation: string;
		example: string;
	};
}
interface Vocabulary {
	word: string;
	translation: string;
	mean: string;
	pronunciation: string;
	example: string;
}

export const Essay: React.FC<Props> = ({ LearningData }) => {
	// Kiểm tra nếu LearningData không phải là mảng hoặc rỗng, trả về một thông báo lỗi
	if (!Array.isArray(LearningData) || LearningData.length === 0) {
		return <div>No vocabulary data available</div>;
	}

	const [currentVocabulary, setCurrentVocabulary] = useState<Vocabulary>(
		LearningData[0]
	);
	const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(1);
	const [userInput, setUserInput] = useState("");
	const [IsHelp, setIsHelp] = useState(false);

	useEffect(() => {
		setCurrentVocabulary(LearningData[currentVocabularyIndex]);
		setUserInput("");
	}, [currentVocabularyIndex]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value);
	};

	const handleCheckAnswer = () => {
		if (
			currentVocabulary &&
			userInput.trim().toLowerCase() === currentVocabulary.word.toLowerCase()
		) {
			toast.success("Correct!");
			setTimeout(() => {
				setCurrentVocabularyIndex(currentVocabularyIndex + 1);
			}, 2000);
		} else {
			toast.error("Incorrect! Please try again.");
		}
	};
	const HandleHelp = () => {
		setIsHelp(true);
	};
	return (
		<div className="mt-5 mb-10 h-full flex flex-col items-center">
			<ToastContainer />
			<div className="text-center mb-10">
				<h1 className="text-3xl font-bold text-gray-600">
					Learn by filling in words
				</h1>
				<p className="mt-2 text-xl font-semibold text-gray-500">
					Please fill in the words according to the meaning you have learned
				</p>
			</div>
			<div className="relative w-2/3 h-60 py-10 flex flex-col items-center gap-4 bg-white border-2 rounded-2xl">
				<p className="text-lg font-semibold">
					{currentVocabulary?.translation}
				</p>
				<p>{IsHelp ? currentVocabulary?.mean : ""}</p>
				<div className=" flex gap-2">
					<input
						type="text"
						value={userInput}
						onChange={handleInputChange}
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
					/>
					<button
						onClick={handleCheckAnswer}
						className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					>
						Check Answer
					</button>
				</div>
				<div className="absolute top-2 right-2">
					<button
						onClick={HandleHelp}
						className="px-5 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					>
						Help ?
					</button>
				</div>
			</div>
		</div>
	);
};
