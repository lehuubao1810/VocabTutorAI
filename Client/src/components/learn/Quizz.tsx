import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Vocabulary } from "../../type/Vocabulary";
import { useNavigate } from "react-router-dom";

import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	LearningData: Vocabulary[];
}

export const Quizz: React.FC<Props> = ({ LearningData }) => {
	const [randomVocabularies, setRandomVocabularies] = useState<Vocabulary[]>(
		[]
	);
	const [correctAnswer, setCorrectAnswer] = useState<Vocabulary | null>(null);
	const [isAnswered, setIsAnswered] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
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

		setIsAnswered(false);
	};

	const handleAnswerClick = (selectedVocabulary: Vocabulary) => {
		if (selectedVocabulary === correctAnswer) {
			setIsAnswered(true);
			toast.success("Correct!");

			// Phát âm ngay lập tức khi chọn đúng
			if (!isMuted && correctAnswer) {
				const synth = window.speechSynthesis;
				const utterance = new SpeechSynthesisUtterance(correctAnswer.word);
				const voices = synth.getVoices();
				const voice = voices.find((v) => v.lang === "en-US") || voices[0];
				if (voice) {
					utterance.voice = voice;
					synth.speak(utterance);
				}
				utterance.voice = voice;
				synth.speak(utterance);
			}

			// Chờ vài giây trước khi chuyển sang từ mới
			setTimeout(() => {
				generateNewQuestion();
			}, 2000);
		} else {
			setIsAnswered(false);
			toast.error("Incorrect!");
		}
	};

	const handleStop = () => {
		toast.info("Quiz stopped");
		navigate("/");
	};

	const toggleMute = () => {
		setIsMuted((prev) => !prev);
	};

	if (!Array.isArray(LearningData) || LearningData.length === 0) {
		return <div>No vocabulary data available</div>;
	}

	return (
		<>
			<ToastContainer />
			{LearningData.length === 0 ? (
				<div>
					<h1>NO DATA TO LEARN</h1>
				</div>
			) : (
				<div className="mt-5 mb-10 h-full flex flex-col items-center">
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
								<p>{correctAnswer?.pronunciation}</p>
							</div>
						)}
						<div className="absolute top-5 right-5">
							<div
								onClick={toggleMute}
								className="text-gray-500 w-10 h-10 bg-slate-200 rounded-full p-2 hover:bg-slate-300 cursor-pointer"
							>
								<FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
							</div>
						</div>
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
