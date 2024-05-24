import React, { createRef, useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useParams } from "react-router-dom";
import {
  getConversation,
  sendMessage,
  setMessageUser,
} from "../redux/conversationSlice";
import { CircularProgress } from "@mui/material";
import { scrollTop } from "../utils/scrollTop";

export const RoomAI: React.FC = () => {
  const { conversation, loaddingMessage } = useAppSelector(
    (state) => state.conversationReducer
  );
  const dispatch = useAppDispatch();
  const { conversationID } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(conversationID);
    if (conversationID) {
      dispatch(getConversation(conversationID))
        .unwrap()
        .then((res) => {
          console.log("Join chat success", res);
          console.log("conversation", conversation);
        });
    }
  }, [conversationID]);

  const chatBoxRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    console.log("Send message: ", {
      conversationID: conversation._id,
      message,
    });
    dispatch(setMessageUser({ role: "user", parts: message }));
    setMessage("");

    dispatch(sendMessage({ conversationID: conversation._id, message }))
      .unwrap()
      .then((res) => {
        console.log("Send message success", res);
      });
  };

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-gray-100">
        <div className="pt-24 mx-auto max-w-screen-xl">
          {conversation._id !== undefined && (
            <div className="bg-white shadow-lg rounded-lg max-h-screen mx-auto overflow-hidden flex flex-col">
              {/* Header chat */}
              <div className="flex justify-between items-center bg-slate-200 py-2 px-5 fixed z-30 top-[73px] w-full max-w-screen-xl">
                <div className="flex items-center">
                  <img
                    src={
                      conversation.character?.image ||
                      "https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
                    }
                    alt={conversation.character?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <h2 className="ml-2 font-bold text-lg">
                    {conversation.character?.name}
                  </h2>
                </div>
              </div>
              {/* Body chat */}
              <div
                className="flex flex-col flex-grow overflow-auto mt-20 mb-16 px-2 pb-4"
                ref={chatBoxRef}
              >
                {conversation?.history.map((message, index) => (
                  <div
                    className={`flex ${
                      message.role === "model"
                        ? "self-start"
                        : "self-end flex-row-reverse"
                    }`}
                    key={index}
                  >
                    <img
                      src={
                        conversation.character?.image ||
                        "https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
                      }
                      alt={conversation.character?.name}
                      className="w-10 h-10 rounded-full mx-2"
                    />
                    <div
                      className={`${
                        message.role === "user"
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-slate-300 text-slate-800 rounded-tl-none"
                      } p-3 rounded-lg my-2 max-w-2xl break-words`}
                    >
                      {message.parts}
                    </div>
                  </div>
                ))}
                {loaddingMessage && (
                  <div className={`flex self-start w-1/3`}>
                    <img
                      src={
                        conversation.character?.image ||
                        "https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
                      }
                      alt={conversation.character?.name}
                      className="w-10 h-10 rounded-full mx-2"
                    />
                    <div
                      className={` bg-slate-300 text-slate-800 rounded-tr-none p-3 rounded-lg my-2`}
                    >
                      <CircularProgress size={25} />
                    </div>
                  </div>
                )}
              </div>
              {/* Input chat */}
              <div className="flex items-center bg-slate-200 p-2 py-4 gap-4 fixed bottom-0 z-40 w-full max-w-screen-xl">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-full border-none rounded-full py-2 px-4 bg-slate-100 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <div
                  className="bg-slate-300 px-2 py-1 rounded-full cursor-pointer hover:bg-slate-400"
                  onClick={handleSendMessage}
                >
                  <i className="fas fa-paper-plane text-blue-500"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer></footer>
    </>
  );
};
