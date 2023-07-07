import { useState } from "react";
import { createContext } from "react";

export const MoviesContext = createContext();
const MoviesContextProvider = ({ children }) => {
  // movies context global states
  const [page, setPage] = useState(1);
  const [pageChanged, setPageChanged] = useState(false);
  const [movieName, setMovieName] = useState("");

  // global functions

  // incre page function
  const handleIncrePage = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
      scrollTo(0, 0);
    }
  };

  // decre page function
  const handleDecrePage = () => {
    if (page === 100) {
      return;
    } else {
      setPage(page + 1);
      scrollTo(0, 0);
    }
  };

  //
  return (
    <MoviesContext.Provider
      value={{
        page,
        setPage,
        pageChanged,
        setPageChanged,
        movieName,
        setMovieName,
        handleIncrePage,
        handleDecrePage,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
