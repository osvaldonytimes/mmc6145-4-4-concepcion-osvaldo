import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { useBookContext } from "../../context/book";
import styles from "./style.module.css";
import { actions } from "../../context/book/actions.js";

export default function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [{ bookSearchResults, favoriteBooks }, dispatch] = useBookContext();

  let isFavoriteBook = false;
  let book = favoriteBooks.find((book) => book.id === bookId);
  if (book) isFavoriteBook = true;
  else book = bookSearchResults.find((book) => book.id === bookId);
  if (!book) return <Navigate to="/favorites" />;

  const handleAddToFavorites = () => {
    dispatch({ type: actions.ADD_BOOK, payload: { book } });
  };

  const handleRemoveFromFavorites = () => {
    dispatch({ type: actions.REMOVE_BOOK, payload: { book } });
  };

  return (
    <main>
      <BookInfo isFavorite={isFavoriteBook} {...book} />
      <div className={styles.controls}>
        {isFavoriteBook ? (
          <button onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </button>
        ) : (
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        )}
        <Link onClick={() => navigate(-1)}>Return</Link>
      </div>
    </main>
  );
}

function BookInfo({
  title,
  authors,
  thumbnail,
  description,
  isFavorite,
  pageCount,
  categories,
  previewLink,
}) {
  return (
    <>
      <div className={styles.titleGroup}>
        <div>
          <h1>
            {title}
            {isFavorite && <sup>⭐</sup>}
          </h1>
          {authors && (
            <h2>By: {authors.join(", ").replace(/, ([^,]*)$/, ", and $1")}</h2>
          )}
          {categories && (
            <h3>
              Category:{" "}
              {categories.join(", ").replace(/, ([^,]*)$/, ", and $1")}
            </h3>
          )}
        </div>
        <a
          target="_BLANK"
          href={previewLink}
          className={styles.imgContainer}
          rel="noreferrer"
        >
          <img
            src={
              thumbnail
                ? thumbnail
                : "https://via.placeholder.com/128x190?text=NO COVER"
            }
            alt={title}
          />
          <span>Look Inside!</span>
        </a>
      </div>
      <p>
        Description:
        <br />
        {description}
      </p>
      <p>Pages: {pageCount}</p>
      <div className={styles.links}>
        <span>Order online:</span>
        <a
          target="_BLANK"
          href={`https://www.amazon.com/s?k=${title} ${
            authors ? authors[0] : ""
          }`}
          rel="noreferrer"
        >
          Amazon
        </a>
        <a
          target="_BLANK"
          href={`https://www.barnesandnoble.com/s/${title} ${
            authors ? authors[0] : ""
          }`}
          rel="noreferrer"
        >
          Barnes & Noble
        </a>
      </div>
    </>
  );
}
