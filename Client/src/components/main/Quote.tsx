import {
  faChevronLeft,
  faChevronRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    translation: "Cách duy nhất để làm việc tuyệt vời là yêu những gì bạn làm.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    translation:
      "Cuộc sống là những gì xảy ra khi bạn đang bận rộn với những kế hoạch khác.",
    author: "John Lennon",
  },
  {
    text: "The purpose of our lives is to be happy.",
    translation: "Mục đích của cuộc sống chúng ta là để hạnh phúc.",
    author: "Dalai Lama",
  },
  {
    text: "Get busy living or get busy dying.",
    translation: "Hãy bận rộn sống hoặc bận rộn chết.",
    author: "Stephen King",
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    translation: "Bạn chỉ sống một lần, nhưng nếu bạn làm đúng, một lần là đủ.",
    author: "Mae West",
  },
//   {
//     text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
//     translation:
//       "Nhiều thất bại của cuộc đời là những người không nhận ra họ đã gần thành công như thế nào khi họ từ bỏ.",
//     author: "Thomas A. Edison",
//   },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    translation:
      "Nếu bạn muốn sống một cuộc đời hạnh phúc, hãy gắn nó với một mục tiêu, không phải với con người hay vật chất.",
    author: "Albert Einstein",
  },
  {
    text: "Never let the fear of striking out keep you from playing the game.",
    translation: "Đừng bao giờ để nỗi sợ thất bại ngăn cản bạn chơi trò chơi.",
    author: "Babe Ruth",
  },
  {
    text: "Money and success don’t change people; they merely amplify what is already there.",
    translation:
      "Tiền bạc và thành công không thay đổi con người; chúng chỉ khuếch đại những gì đã có.",
    author: "Will Smith",
  },
  {
    text: "Your time is limited, don’t waste it living someone else’s life.",
    translation:
      "Thời gian của bạn có hạn, đừng lãng phí nó để sống cuộc đời của người khác.",
    author: "Steve Jobs",
  },
];

const Quote: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-100 max-sm:p-2">
      <div
        onClick={handlePrev}
        className="absolute left-0 p-4 text-gray-300 rounded-full hover:text-gray-500 max-sm:-left-5 cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-10 h-10" />
      </div>
      <div className="bg-white px-20 pt-10 pb-5 rounded-lg shadow-lg w-full text-center">
        {/* <span className="block w-1 h-52 bg-slate-500 mr-5"></span> */}

        <div className="flex flex-col">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className=" text-gray-600 text-5xl mb-3"
          />
          <p className="text-2xl font-semibold mb-4">
            {quotes[currentIndex].text}
          </p>
          <p className="text-gray-500 mb-4">
            {quotes[currentIndex].translation}
          </p>
          <p className="text-gray-700 font-medium">
            - {quotes[currentIndex].author}
          </p>
          <div className="flex justify-center mt-10">
            {quotes.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={handleNext}
        className="absolute right-0 p-4 text-gray-300 rounded-full hover:text-gray-500 max-sm:-right-5 cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-10 h-10" />
      </div>
      <div className="flex items-center justify-center mt-4"></div>
    </div>
  );
};

export default Quote;
