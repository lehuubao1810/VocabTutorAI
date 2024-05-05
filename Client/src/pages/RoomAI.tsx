import React from "react";
import { Nav } from "../components/common/Nav";
import { useParams } from "react-router-dom";
import { charactersAI } from "../dataTest/characterAi";
import { conversationsAI } from "../dataTest/conversationAI";

type Props = {
  // type of the props
};

export const RoomAI: React.FC<Props> = (props) => {
  console.log(props);

  const { idCharacterAI } = useParams();

  const characterAI = charactersAI.find(
    (characterAI) => characterAI.id === idCharacterAI
  );

  const conversationAI = conversationsAI
    .filter((conversationAI) => conversationAI.botId === idCharacterAI)
    .find((conversationAI) => conversationAI.uid === "1");

  return (
    <>
      <header className="h-0">
        <Nav />
      </header>
      <div className="bg-slate-100 overflow-hidden pt-36">
        {/* Chat ui */}
        {/* header chat */}
        <div className="flex justify-between items-center bg-slate-200 p-2 fixed z-30 w-screen top-[76px]">
          <div className="flex items-center">
            <img
              src={characterAI?.image}
              alt={characterAI?.name}
              className="w-12 h-12 rounded-full"
            />
            <h2 className="ml-2 font-bold text-lg">{characterAI?.name}</h2>
          </div>
          {/* <div>
            <div className="bg-slate-300 px-2 py-1 rounded-full">
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div> */}
        </div>
        {/* body chat */}
        <div className="flex flex-col max-h-[36rem] overflow-auto px-2">
          {conversationAI?.history.map((message, index) => (
            <div
              className={`flex ${
                message.role === "ai" ? "self-start" : "self-end flex-row-reverse"
              }`}
              key={index}
            >
              <img
                src={characterAI?.image}
                alt={characterAI?.name}
                className="w-10 h-10 rounded-full mx-2"
              />
              <div
                className={`max-w-2/3 ${
                  message.role === "ai"
                    ? "bg-blue-500 text-white rounded-tl-none"
                    : "bg-slate-300 text-slate-800 rounded-tr-none"
                } p-3 rounded-lg my-2 `}
              >
                {message.parts}
              </div>
            </div>
          ))}
        </div>
        {/* input chat */}
        <div className="flex items-center bg-slate-200 p-2 py-4 gap-4 fixed bottom-0 w-screen z-40">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full border-none rounded-full py-2 px-4 bg-slate-100"
          />
          <div className="bg-slate-300 px-2 py-1 rounded-full cursor-pointer hover:bg-slate-400">
            <i className="fas fa-paper-plane text-blue-500"></i>
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
};
