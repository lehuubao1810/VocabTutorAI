import {
  faArrowLeft,
  faArrowRight,
  // faArrowRotateLeft,
  faGear,
  // faPenToSquare,
  faPlay,
  // faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./VocabularyCard.css";
import { useNavigate } from "react-router-dom";
import TextToSpeech from "./TextToSpeech";
interface VocabularyItem {
  word: string;
  translation: string;
  mean: string;
  pronunciation: string;
  example: string;
}

export const VocabularyFlipCard: React.FC<{
  Data: {
    id: string;
    vocabulary: VocabularyItem[];
  };
}> = ({ Data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const vocabularyData = Data.vocabulary;
  console.log("Data", Data);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextVocabulary = () => {
    const newIndex = (currentVocabularyIndex + 1) % vocabularyData.length;
    setCurrentVocabularyIndex(newIndex);
    setIsFlipped(false);
  };

  const handlePrevVocabulary = () => {
    const newIndex =
      (currentVocabularyIndex - 1 + vocabularyData.length) %
      vocabularyData.length;
    setCurrentVocabularyIndex(newIndex);
    setIsFlipped(false);
  };

  const handleEditCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/collection/${Data.id}/edit`, {
      state: Data,
    });
  };

  useEffect(() => {
    const newProgress =
      ((currentVocabularyIndex + 1) / vocabularyData.length) * 100;
    setProgress(newProgress);
  }, [currentVocabularyIndex, vocabularyData]);

  const currentVocabulary = vocabularyData[currentVocabularyIndex];

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div
          onClick={handleFlip}
          className={`w-full h-80 border-2 bg-white rounded-xl ${
            isFlipped ? "flipped" : ""
          }`}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front flex flex-col justify-center items-center gap-4 p-5">
              <p className="text-4xl font-sans">{currentVocabulary.word}</p>

              <TextToSpeech text={currentVocabulary.word} />

              <p>{currentVocabulary.pronunciation}</p>
              <p className="text-center">
                <span className="font-semibold">Suggest:</span>
                {currentVocabulary.mean}
              </p>
            </div>
            <div className="flip-card-back flex flex-col justify-center items-center gap-4 p-5">
              <p className="text-4xl font-sans">
                {currentVocabulary.translation}
              </p>
              <p className="text-center">
                <span className="font-semibold">Example:</span>
                {currentVocabulary.example}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            type="button"
            title="tool"
            className="w-10 h-10 flex justify-center items-center rounded-full text-gray-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <div className="mt-5 mb-2 flex justify-between items-center gap-10">
            <button
              type="button"
              title="tool"
              className="w-10 h-10 rounded-full bg-gray-500 text-gray-50 hover:bg-gray-400"
              onClick={handlePrevVocabulary}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <p className="text-gray-500 font-semibold">
              {currentVocabularyIndex + 1} / {vocabularyData.length}
            </p>
            <button
              type="button"
              title="tool"
              className="w-10 h-10 rounded-full bg-gray-500 text-gray-50 hover:bg-gray-400"
              onClick={handleNextVocabulary}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="relative">
            <button
              type="button"
              title="tool"
              onClick={handleEditCollection}
              className=" text-gray-600 hover:transform-gpus hover:scale-110"
            >
              <FontAwesomeIcon icon={faGear} />
            </button>
            {/* <div
              className={`${
                isSetting ? "flex" : "hidden"
              } flex-col gap-2 w-44 h-20 absolute -top-8 right-0 transition-all duration-300 ease-linear`}
            >
              <button
                type="button"
                title="tool"
                className="ml-8 text-blue-600 hover:opacity-60"
                onClick={handleEditCollection}
              >
                Edit vocabulary <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                type="button"
                title="tool"
                className="mr-4 text-red-600 hover:opacity-60"
              >
                Delete vocabulary <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                type="button"
                title="tool"
                onClick={handleSetting}
                className="ml-28 text-blue-600 hover:opacity-60"
              >
                Back <FontAwesomeIcon icon={faArrowRotateLeft} />
              </button>
            </div> */}
          </div>
        </div>
        <div className="w-full h-1 rounded-sm bg-gray-200 mt-2">
          <div
            className="h-full rounded-sm bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-xl font-semibold text-gray-600">
          The list has: {vocabularyData.length} words
        </h2>
        {vocabularyData.map((item, index) => (
          <div className="mt-5 w-full h-30 bg-white rounded-xl">
            <div key={index} className="px-10 py-5">
              <div className="flex gap-4 items-center">
                {item.pronunciation ? (
                  <p className="text-lg font-semibold text-left">
                    {item.word} / {item.pronunciation} /
                  </p>
                ) : (
                  <p className="text-lg font-semibold text-left">{item.word}</p>
                )}
                <TextToSpeech text={item.word} />
              </div>

              <p className="pt-2 text-base font-semibold text-left ">
                Translation:
              </p>
              <p className="text-base text-left">{item.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
