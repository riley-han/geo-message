import { generateMockConversations } from "../mock-data/mock-data";

export const useGetConversations = () => {
  const conversations = generateMockConversations(10);
  return conversations;
};
