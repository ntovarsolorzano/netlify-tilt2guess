export type WordDeck = {
  id: string;
  name: string;
  isPremium: boolean;
  words: string[];
};

const decks: WordDeck[] = [
  {
    id: 'animals',
    name: 'Animal Kingdom',
    isPremium: false,
    words: ['Elephant', 'Tiger', 'Kangaroo', 'Penguin', 'Dolphin', 'Giraffe', 'Monkey', 'Zebra', 'Lion', 'Bear'],
  },
  {
    id: 'movies',
    name: 'Blockbuster Movies',
    isPremium: false,
    words: ['The Matrix', 'Jurassic Park', 'Titanic', 'Star Wars', 'The Avengers', 'Inception', 'Pulp Fiction', 'Forrest Gump', 'The Dark Knight', 'E.T.'],
  },
  {
    id: 'celebrities',
    name: 'Celebrity Stars',
    isPremium: false,
    words: ['Tom Hanks', 'Beyoncé', 'Dwayne Johnson', 'Taylor Swift', 'Leonardo DiCaprio', 'Oprah Winfrey', 'Will Smith', 'Adele', 'Brad Pitt', 'Rihanna'],
  },
  {
    id: 'foods',
    name: 'World Cuisine',
    isPremium: true,
    words: ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Hamburger', 'Curry', 'Croissant', 'Paella', 'Pho', 'Kebab'],
  },
  {
    id: 'landmarks',
    name: 'Famous Landmarks',
    isPremium: true,
    words: ['Eiffel Tower', 'Great Wall of China', 'Statue of Liberty', 'Machu Picchu', 'Colosseum', 'Taj Mahal', 'Pyramids of Giza', 'Sydney Opera House', 'Christ the Redeemer', 'Stonehenge'],
  },
  {
    id: 'superheroes',
    name: 'Superhero Squad',
    isPremium: true,
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
