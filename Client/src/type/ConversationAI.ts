import { CharacterAIType } from "./CharacterAI";

export type MessageAIType = {
    role: "user" | "model";
    parts: string;
}

export type ConversationAIType = {
    _id: string;
    name: string;
    description: string;
    image: string;
    uid: string;
    character: CharacterAIType;
    history: MessageAIType[];
}