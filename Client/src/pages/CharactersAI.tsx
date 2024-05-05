import React from "react";
import { Nav } from "../components/common/Nav";

type Props = {
  // type of the props
};

export const CharactersAI: React.FC<Props> = () => {
  const charactersAI = [
    {
      id: 1,
      name: "Teacher AI",
      image:
        "https://th.bing.com/th/id/OIG2.mcrnNGNPuB00Kvtjh9Co?w=1024&h=1024&rs=1&pid=ImgDetMain",
      // short description describe characteristic of AI
      description:
        "A teacher of high school, who is very kind and friendly to students.",
      isChat: true,
    },
    {
      id: 2,
      name: "Student AI",
      image:
        "https://th.bing.com/th/id/OIG1.UxYHvzYIn00PZgPTgLz.?w=1024&h=1024&rs=1&pid=ImgDetMain",
      description: "A student of university, who is very active and smart.",
      isChat: false,
    },
    {
      id: 3,
      name: "Singer AI",
      image:
        "https://th.bing.com/th/id/OIG2.XGvpU06uJC3JPkmjdcbe?w=1024&h=1024&rs=1&pid=ImgDetMain",
      description: "A singer of pop music, who is very famous and talented.",
      isChat: false,
    },
    {
      id: 4,
      name: "Programmer AI",
      image:
        "https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
      description:
        "A programmer of software, who is very intelligent and creative.",
      isChat: true,
    },
    {
      id: 5,
      name: "King AI",
      image: "https://th.bing.com/th/id/OIG1.ulmA.LMTi9PpCmcIFdkQ?pid=ImgGn",
      description: "A king of kingdom, who is very powerful and wise.",
      isChat: true,
    },
  ];

  return (
    <div>
      <header>
        <Nav />
      </header>
      <main className="container bg-slate-100 min-h-screen pt-20 px-16">
        <div className="my-4">
          <h1 className="text-2xl font-bold text-slate-900">Characters AI</h1>
        </div>
        {/* list card AI to chat*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {charactersAI.map((character) => (
            <div
              key={character.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div className="mb-2">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <div className="my-2">
                  <h2 className="text-xl font-semibold text-slate-800">
                    {character.name}
                  </h2>
                  <p className="text-slate-500">{character.description}</p>
                </div>
              </div>

              {/* button */}
              <div className="flex">
                <div className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg">
                  {character.isChat ? "Continue chat" : "Start chat"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
