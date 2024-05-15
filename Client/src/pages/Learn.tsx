import React, { useState } from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import essay from "../assets/icon/essay.png";
import quizz from "../assets/icon/quizz.png";
import { Quizz } from "../components/learn/Quizz";
import { Essay } from "../components/learn/Essay";
import { useLocation } from "react-router-dom";
import { Vocabulary } from "../type/Vocabulary";
type Props = {
  // type of the props
};

export const Learn: React.FC<Props> = (props) => {
  // State để điều khiển sự hiển thị của phần tử
  const [showWelcome, setShowWelcome] = useState(true);
  const [isQuizz, setIsQuizz] = useState(false);
  const [isEssay, setIsEssay] = useState(false);
  console.log(props);
  const location = useLocation();
  const data = location.state as Vocabulary[] | undefined;

  return (
    <>
      <header>
        <Header />
      </header>
      {!data ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-gray-600">No data to learn</h1>
        </div>
      ) : (
        <main className="bg-gray-100">
          <div className="pt-24 ml-auto mr-auto max-w-screen-xl px-5 py-4">
            {showWelcome && (
              <div className="py-10 flex flex-col items-center gap-8 bg-white border-2 rounded-2xl">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-600">
                    Welcome to the vocabulary learning page!
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-gray-500">
                    Choose the form you want to study
                  </p>
                </div>
                <div className="flex gap-6 w-2/3">
                  <div className="">
                    <img src={essay} alt="" className="" />
                    <button
                      className="w-full h-14 border-2 rounded-xl bg-neutral-300 text-gray-600 font-semibold hover:bg-neutral-400"
                      onClick={() => {
                        // Ẩn phần tử khi click vào button
                        setShowWelcome(false);
                        setIsEssay(true);
                      }}
                    >
                      Learn through word filling
                    </button>
                  </div>
                  <div>
                    <img src={quizz} alt="" />
                    <button
                      className="w-full h-14 border-2 rounded-xl bg-yellow-500 text-neutral-100 font-semibold hover:bg-yellow-600 "
                      onClick={() => {
                        setIsQuizz(true);
                        setShowWelcome(false);
                      }}
                    >
                      Learn along with quizzes
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isQuizz && <Quizz LearningData={data} />}
            {isEssay && <Essay LearningData={data} />}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};
