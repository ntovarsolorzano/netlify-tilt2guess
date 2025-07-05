export type WordDeck = {
  id: string;
  name: string;
  isPremium: boolean;
  stickerUrl: string;
  words: string[];
};

const decks: WordDeck[] = [
  {
    id: 'animals',
    name: 'Animal Kingdom',
    isPremium: false,
    stickerUrl: '/stickers/animal.png',
    words: ['Elephant', 'Tiger', 'Kangaroo', 'Penguin', 'Dolphin', 'Giraffe', 'Monkey', 'Zebra', 'Lion', 'Bear'],
  },
  {
    id: 'movies',
    name: 'Blockbuster Movies',
    isPremium: false,
    stickerUrl: '/stickers/movies.png',
    words: ['The Matrix', 'Jurassic Park', 'Titanic', 'Star Wars', 'The Avengers', 'Inception', 'Pulp Fiction', 'Forrest Gump', 'The Dark Knight', 'E.T.'],
  },
  {
    id: 'celebrities',
    name: 'Celebrity Stars',
    isPremium: false,
    stickerUrl: '/stickers/celebrity.png',
    words: ['Tom Hanks', 'Beyoncé', 'Dwayne Johnson', 'Taylor Swift', 'Leonardo DiCaprio', 'Oprah Winfrey', 'Will Smith', 'Adele', 'Brad Pitt', 'Rihanna'],
  },
  {
    id: 'foods',
    name: 'World Cuisine',
    isPremium: true,
    stickerUrl: '/stickers/cuisine.png',
    words: ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Hamburger', 'Curry', 'Croissant', 'Paella', 'Pho', 'Kebab'],
  },
  {
    id: 'landmarks',
    name: 'Famous Landmarks',
    isPremium: true,
    stickerUrl: '/stickers/landmarks.png',
    words: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty', 'Machu Picchu', 'Colosseum', 'Taj Mahal', 'Pyramids of Giza', 'Sydney Opera House', 'Christ the Redeemer', 'Stonehenge'],
  },
  {
    id: 'superheroes',
    name: 'Superhero Squad',
    isPremium: true,
    stickerUrl: '/stickers/superhero.png',
    words: ['Superman', 'Batman', 'Spider-Man', 'Wonder Woman', 'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Aquaman'],
  },
];

export async function getDecks(): Promise<WordDeck[]> {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 300));
  return decks;
}

export async function getDeckById(id: string): Promise<WordDeck | undefined> {
  await new Promise(res => setTimeout(res, 100));
  return decks.find(deck => deck.id === id);
}
