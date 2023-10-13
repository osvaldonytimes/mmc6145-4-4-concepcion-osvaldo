const storedFavoriteBooks = localStorage.getItem("favoriteBooks");
let favoriteBooks;

// favoriteBooks should be the value from localStorage or an empty array if localStorage value is falsy
try {
  favoriteBooks = JSON.parse(storedFavoriteBooks);
  // Ensure parsed value is an array. If not, default to an empty array.
  if (!Array.isArray(favoriteBooks)) {
    favoriteBooks = [];
  }
} catch (error) {
  favoriteBooks = [];
}

const initialState = {
  bookSearchResults: [], // bookSearchResults should be an empty array
  favoriteBooks: favoriteBooks || [],
};

export default initialState;
