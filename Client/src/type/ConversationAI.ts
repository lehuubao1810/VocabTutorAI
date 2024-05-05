
export type MessageAIType = {
    role: string;
    parts: string;
}

export type ConversationAIType = {
    id: string;
    name: string;
    description: string;
    image: string;
    uid: string;
    botId: string;
    history: MessageAIType[];
}