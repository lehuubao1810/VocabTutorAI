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

export const Essay: React.FC<Props> = ({ LearningData }) => {
	const [currentVocabulary, setCurrentVocabulary] = useState<Vocabulary>(
		LearningData[0]
	);
	const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(1);
	const [userInput, setUserInput] = useState("");
	const [hintLevel, setHintLevel] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setCurrentVocabulary(LearningData[currentVocabularyIndex]);
		setUserInput("");
		setHintLevel(0);
	}, [LearningData, currentVocabularyIndex]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value);
	};

	const handleCheckAnswer = () => {
		if (
			currentVocabulary &&
			userInput.trim().toLowerCase() === currentVocabulary.word.toLowerCase()
		) {
			toast.success("Correct!");

			// Phát âm ngay lập tức khi chọn đúng
			if (!isMuted && currentVocabulary) {
				const synth = window.speechSynthesis;
				const utterance = new SpeechSynthesisUtterance(currentVocabulary.word);
				const voices = synth.getVoices();
				const voice = voices.find((v) => v.lang === "en-US") || voices[0];
				utterance.voice = voice;
				synth.speak(utterance);
			}

			// Chờ vài giây trước khi chuyển sang từ mới
			setTimeout(() => {
				setCurrentVocabularyIndex((prevIndex) => prevIndex + 1);
			}, 2000);
		} else {
			toast.error("Incorrect! Please try again.");
		}
	};

	const handleGiveHint = () => {
		setHintLevel((prevHintLevel) => Math.min(prevHintLevel + 1, 2));
		if (hintLevel === 0) {
			setUserInput(currentVocabulary.word.slice(0, 2));
		} else if (hintLevel === 1) {
			setUserInput(currentVocabulary.word);
		}
	};

	const handleStopQuiz = () => {
		toast.info("Quiz stopped!");
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
							Learn by filling in words
						</h1>
						<p className="mt-2 text-xl font-semibold text-gray-500">
							Please fill in the words according to the meaning you have learned
						</p>
					</div>
					<div className="relative w-2/3 h-60 py-10 flex flex-col items-center gap-4 bg-white border-2 rounded-2xl max-sm:w-full max-sm:pt-14">
						<p className="text-lg font-semibold">
							{currentVocabulary?.translation}
						</p>
						<p>{currentVocabulary?.mean}</p>
						<div className="flex gap-2 max-sm:flex-col">
							<input
								title="Answer"
								type="text"
								value={userInput}
								onChange={handleInputChange}
								className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<button
								type="button"
								onClick={handleCheckAnswer}
								className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
							>
								Check Answer
							</button>
						</div>
						<div className="absolute top-2 right-2 flex gap-2">
							<button
								type="button"
								onClick={handleGiveHint}
								className="px-5 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
							>
								Help?
							</button>

							<button
								onClick={toggleMute}
								className="text-gray-500 bg-slate-200 rounded-full p-2 hover:bg-slate-300"
							>
								<FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
							</button>
						</div>
					</div>
					<div className="mt-10">
						<button
							type="button"
							onClick={handleStopQuiz}
							className="px-5 py-2 bg-red-300 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
						>
							Stop Essay
						</button>
					</div>
				</div>
			)}
		</>
	);
};
