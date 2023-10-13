import * as actions from "./actions.js";

export default function reducer(state, action) {
  switch (action.action) {
    case actions.ADD_BOOK:
      const updatedBooks = [...state.favoriteBooks, action.payload];
      saveToLocalStorage(updatedBooks);
      return { ...state, favoriteBooks: updatedBooks };
    case actions.REMOVE_BOOK:
      const filteredBooks = state.favoriteBooks.filter(
        (book) => book.id !== action.payload
      );
      saveToLocalStorage(filteredBooks);
      return { ...state, favoriteBooks: filteredBooks };
    case actions.SEARCH_BOOKS:
      return { ...state, bookSearchResults: action.payload };
    default:
      return state;
  }
}

// This helper function stores the favoriteBook state in localStorage as a string
function saveToLocalStorage(favBooks) {
  localStorage.setItem("favoriteBooks", JSON.stringify(favBooks));
}
