import { useState } from "react";
import { createContext } from "react";

export const MoviesContext = createContext<any>(null);
const MoviesContextProvider = ({ children }: any) => {
  // movies context global states
  const [page, setPage] = useState<number>(1);
  const [pageChanged, setPageChanged] = useState<boolean>(false);
  const [movieName, setMovieName] = useState<any>("");

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
