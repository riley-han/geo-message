export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type Message = {
  id: string;
  content: string;
  isRead: boolean;
  conversationId: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  geoLocked: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

export const mockMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    content: "Hello, how are you?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I am good, thank you!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "Are you stoked for Hawaii?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I literally cannot wait! It's going to be amazing!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 40.78551230319113,
      longitude: -111.98723734405075,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "We Made it to Hawaii!!",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 21.876421554224525,
      longitude: -159.44017862191336,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Delta sky lounge is nice huh babe?!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 33.94568475247558,
      longitude: -118.40577150433006,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Hello, how are you?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I am good, thank you!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "Are you stoked for Hawaii?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I literally cannot wait! It's going to be amazing!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 40.78551230319113,
      longitude: -111.98723734405075,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "We Made it to Hawaii!!",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 21.876421554224525,
      longitude: -159.44017862191336,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Delta sky lounge is nice huh babe?!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 33.94568475247558,
      longitude: -118.40577150433006,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Hello, how are you?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I am good, thank you!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "Are you stoked for Hawaii?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I literally cannot wait! It's going to be amazing!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 40.78551230319113,
      longitude: -111.98723734405075,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "We Made it to Hawaii!!",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 21.876421554224525,
      longitude: -159.44017862191336,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Delta sky lounge is nice huh babe?!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 33.94568475247558,
      longitude: -118.40577150433006,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Hello, how are you?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I am good, thank you!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "Are you stoked for Hawaii?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I literally cannot wait! It's going to be amazing!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 40.78551230319113,
      longitude: -111.98723734405075,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "We Made it to Hawaii!!",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 21.876421554224525,
      longitude: -159.44017862191336,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Delta sky lounge is nice huh babe?!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 33.94568475247558,
      longitude: -118.40577150433006,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Hello, how are you?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I am good, thank you!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "Are you stoked for Hawaii?",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: false,
    coordinates: null,
  },
  {
    id: crypto.randomUUID(),
    content: "I literally cannot wait! It's going to be amazing!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 40.78551230319113,
      longitude: -111.98723734405075,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "We Made it to Hawaii!!",
    isRead: false,
    conversationId: "1",
    senderId: "123",
    senderName: "Riley Hansen",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 21.876421554224525,
      longitude: -159.44017862191336,
    },
  },
  {
    id: crypto.randomUUID(),
    content: "Delta sky lounge is nice huh babe?!",
    isRead: false,
    conversationId: "1",
    senderId: "456",
    senderName: "Matilynn Bird",
    createdAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    updatedAt: {
      seconds: 1714732800,
      nanoseconds: 0,
    },
    geoLocked: true,
    coordinates: {
      latitude: 33.94568475247558,
      longitude: -118.40577150433006,
    },
  },
];
