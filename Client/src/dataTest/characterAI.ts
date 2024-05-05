import { CharacterAIType } from "../type/CharacterAI";

export const charactersAI: CharacterAIType[] = [
  {
    id: "1",
    name: "Teacher AI",
    image:
      "https://th.bing.com/th/id/OIG2.mcrnNGNPuB00Kvtjh9Co?w=1024&h=1024&rs=1&pid=ImgDetMain",
    // short description describe characteristic of AI
    description:
      "A teacher of high school, who is very kind and friendly to students.",
    isChat: true,
  },
  {
    id:"2",
    name: "Student AI",
    image:
      "https://th.bing.com/th/id/OIG1.UxYHvzYIn00PZgPTgLz.?w=1024&h=1024&rs=1&pid=ImgDetMain",
    description: "A student of university, who is very active and smart.",
    isChat: false,
  },
  {
    id: "3",
    name: "Singer AI",
    image:
      "https://th.bing.com/th/id/OIG2.XGvpU06uJC3JPkmjdcbe?w=1024&h=1024&rs=1&pid=ImgDetMain",
    description: "A singer of pop music, who is very famous and talented.",
    isChat: false,
  },
  {
    id: "4",
    name: "Programmer AI",
    image:
      "https://th.bing.com/th/id/OIG3.DuvlTtjEouHrwLjaDdGS?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
    description:
      "A programmer of software, who is very intelligent and creative.",
    isChat: true,
  },
  {
    id: "5",
    name: "King AI",
    image: "https://th.bing.com/th/id/OIG1.ulmA.LMTi9PpCmcIFdkQ?pid=ImgGn",
    description: "A king of kingdom, who is very powerful and wise.",
    isChat: true,
  },
];
