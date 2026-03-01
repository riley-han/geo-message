export type Conversation = {
  id: string;
  title?: string;
  contactName?: string;
  unReadCount: number;
  lastMessagePreview?: string;
  imageUrl?: string;
  isGroup: boolean;
};
export const randomTextStrings = [
  "Hello, how are you?",
  "I'm fine, thank you!",
  "What are you doing?",
  "I'm working on a project",
  "What is your name?",
  "My name is John Doe",
  "What is your email?",
  "My email is john.doe@example.com",
  "What is your phone number?",
  "My phone number is 1234567890",
  "What is your address?",
  "My address is 123 Main St, Anytown, USA",
  "What is your city?",
  "My city is Anytown",
  "What is your state?",
  "My state is Anytown",
  "What is your zip code?",
  "My zip code is 12345",
  "What is your country?",
  "My country is USA",
  "What is your gender?",
  "My gender is male",
  "What is your age?",
  "My age is 25",
  "What is your occupation?",
  "My occupation is software engineer",
  "What is your favorite color?",
  "My favorite color is blue",
  "What is your favorite food?",
  "My favorite food is pizza",
  "What is your favorite animal?",
  "My favorite animal is dog",
  "What is your favorite movie?",
  "My favorite movie is The Matrix",
  "What is your favorite book?",
  "My favorite book is The Great Gatsby",
  "What is your favorite music?",
  "My favorite music is Rock",
  "What is your favorite sport?",
  "My favorite sport is basketball",
  "What is your favorite game?",
  "My favorite game is The Sims",
  "What is your favorite TV show?",
  "My favorite TV show is The Simpsons",
];

//super hero names
export const mockContactNames = [
  "Superman",
  "Batman",
  "Wonder Woman",
  "The Flash",
  "The Green Lantern",
  "Aquaman",
  "Cyborg",
  "The Martian Manhunter",
  "The Blue Beetle",
  "Iron Man",
  "Captain America",
  "Thor",
  "Hulk",
  "Black Widow",
  "Hawkeye",
  "Scarlet Witch",
  "Vision",
  "Black Panther",
  "Spider-Man",
];

export const mockGroupConversationTitles = [
  "Group Chat",
  "The Boys",
  "The Girls",
  "Super Friends",
  "The Avengers",
  "The Justice League",
  "The X-Men",
  "The Fantastic Four",
  "The Inhumans",
  "The X-Men",
  "The Fantastic Four",
  "The Inhumans",
];

export const mockAvatarUrls = [
  "https://unsplash.com/photos/a-young-man-wearing-glasses-standing-in-front-of-a-mountain-MSepzbKFz10",
  "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/2149530993/photo/digital-human-head-concept-for-ai-metaverse-and-facial-recognition-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=nyP4c-s5cSZy1nv1K0xn1ynC-Xuc1sY4Y29ZQqcrztA=",
];

export const generateMockConversations = (count: number): Conversation[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: `conversation-${index}`,
      title:
        mockGroupConversationTitles[index % mockGroupConversationTitles.length],
      contactName: mockContactNames[index % mockContactNames.length],
      unReadCount: Math.floor(Math.random() * 20),
      lastMessagePreview: randomTextStrings[index % randomTextStrings.length],
      isGroup: false,
      imageUrl: mockAvatarUrls[index % mockAvatarUrls.length],
    };
  });
};
