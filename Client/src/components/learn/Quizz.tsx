import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Vocabulary } from "../../type/Vocabulary";
import { useNavigate } from "react-router-dom";

interface Props {
	LearningData: Vocabulary[];
}

export const Quizz: React.FC<Props> = ({ LearningData }) => {
	const [currentVocabulary, setCurrentVocabulary] = useState<Vocabulary>(
		LearningData[0]
	);
	const [randomVocabularies, setRandomVocabularies] = useState<Vocabulary[]>(
		[]
	);
	const [correctAnswer, setCorrectAnswer] = useState<Vocabulary | null>(null);
	const [isAnswered, setIsAnswered] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		generateNewQuestion();
	}, []);

	const generateNewQuestion = () => {
		const randomIndexes: number[] = [];
		while (randomIndexes.length < 4) {
			const randomIndex = Math.floor(Math.random() * LearningData.length);
			if (!randomIndexes.includes(randomIndex)) {
				randomIndexes.push(randomIndex);
			}
		}
		const randomVocabularies = randomIndexes.map(
			(index) => LearningData[index]
		);

		const randomCorrectIndex = Math.floor(
			Math.random() * randomVocabularies.length
		);
		const correctAnswer = randomVocabularies[randomCorrectIndex];

		setRandomVocabularies(randomVocabularies);
		setCorrectAnswer(correctAnswer);
		setCurrentVocabulary(correctAnswer);
		setIsAnswered(false);
	};

	const handleAnswerClick = (selectedVocabulary: Vocabulary) => {
		if (selectedVocabulary === correctAnswer) {
			setIsAnswered(true);
			setTimeout(() => {
				generateNewQuestion();
			}, 2000);
			toast.success("Correct!");
		} else {
			setIsAnswered(false);
			toast.error("Incorrect!");
		}
	};
	const handleStop = () => {
		toast.info("Quiz stopped");
		navigate("/");
	};
	if (!Array.isArray(LearningData) || LearningData.length === 0) {
		return <div>No vocabulary data available</div>;
	}

	return (
		<>
			{LearningData.length === 0 ? (
				<div>
					<h1>NO DATA TO LEARN</h1>
				</div>
			) : (
				<div className="mt-5 mb-10 h-full flex flex-col items-center">
					<ToastContainer />
					<div className="text-center mb-10">
						<h1 className="text-3xl font-bold text-gray-600">
							Study with Quizzes
						</h1>
						<p className="mt-2 text-xl font-semibold text-gray-500">
							Choose the correct answer to the question below.
						</p>
					</div>
					<div className="relative w-2/3 h-44 py-10 flex flex-col items-center gap-4 bg-white border-2 rounded-2xl max-sm:w-full max-sm:pt-14">
						{correctAnswer && (
							<div className="flex flex-col items-center gap-4">
								<p className="text-2xl font-semibold">{correctAnswer.word}</p>
								<p>{correctAnswer.pronunciation}</p>
							</div>
						)}
					</div>
					<div className="my-10 grid grid-cols-2 gap-4 w-2/3 max-sm:grid-cols-1 max-sm:w-full max-sm:gap-1 max-sm:my-5">
						{randomVocabularies.map((vocabulary, index) => (
							<button
								key={index}
								className={`px-5 py-3 border-2 rounded-xl ${
									isAnswered && vocabulary === correctAnswer
										? "bg-green-200"
										: isAnswered && vocabulary !== correctAnswer
										? "bg-red-200"
										: "bg-white"
								}`}
								onClick={() => handleAnswerClick(vocabulary)}
							>
								{vocabulary.translation}
							</button>
						))}
					</div>
					<button
						className="px-5 py-3 mt-5 border-2 rounded-xl bg-red-300"
						onClick={handleStop}
					>
						Stop Quiz
					</button>
				</div>
			)}
		</>
	);
};
