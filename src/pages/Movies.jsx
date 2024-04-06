import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
import { MoviesContext } from "../contexts/MoviesContext";
import MovieSkeletonLoader, {
  MovieSkeletonLoaders,
} from "../components/MovieSkeletonLoader";
import ReactPaginate from "react-paginate";

const Movies = () => {
  //global states here...
  const {
    pageChanged,
    setPageChanged,
    movieName,
    setMovieName,
    handleIncrePage,
    handleDecrePage,
  } = useContext(MoviesContext);

  const navigate = useNavigate();
  // normal states
  const [searchedMovies, setSearchedMovies] = useState();
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState();
  //
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  //
  // check if user is logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (!users_data_exists) {
      navigate("/login");
    }
  }, []);

  // fetching the datas
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const movies1 = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
        );
        const data1 = await movies1.json();
        const movies2 = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
        );
        const data2 = await movies2.json();
        const movies3 = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
        );
        const data3 = await movies3.json();
        const movies4 = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
        );
        const data4 = await movies4.json();
        const total1 = data1.total_results;
        const total2 = data2.total_results;
        const total3 = data3.total_results;
        const total4 = data4.total_results;
        const total = total1 + total2 + total3 + total4;
        setTotal(total);
        const allMovies = [
          ...data1?.results,
          ...data2?.results,
          ...data3?.results,
          ...data4?.results,
        ];
        setMovies(allMovies);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getAllMovies();
  }, [page]);

  // set movie title limit
  const titleLimit = 25;
  const truncateTitle = (title) => {
    if (title.length > titleLimit) {
      let slicedTitle = title.slice(0, titleLimit);
      return slicedTitle + "...";
    }
    return title;
  };

  // handle search movies
  const handleSearchMovies = async (e) => {
    e.preventDefault();
    try {
      if (movieName === "") {
        return;
      } else {
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${movieName}&api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
        );
        const searchData = await searchRes.json();
        if (searchRes.ok) {
          setPageChanged(true);
          setSearchedMovies(searchData.results);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setMovieName("");
  };

  //
  const handlePageClick = ({ selected }) => {
    const params = new URLSearchParams();
    const page = selected + 1;
    params.set("page", page.toString());
    navigate({ search: params.toString() });
  };

  //
  return (
    <section className="all_movies_section">
      <form className="search_movie_form" onSubmit={handleSearchMovies}>
        <input
          type="text"
          placeholder="search movie..."
          onChange={(e) => setMovieName(e.target.value.toLowerCase())}
          value={movieName}
        />
        <button type="submit">
          <i className="bx bx-search"></i>
        </button>
      </form>

      {/*  */}
      <>
        {pageChanged === true ? (
          <article className="searched_movies_row">
            {searchedMovies &&
              searchedMovies.map((movie) => (
                <Link
                  to={`/movie_details/${movie.id}`}
                  key={movie.id}
                  state={{ movie }}
                >
                  <div className="searched_movie_column">
                    <div className="movie__loader_even">
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                        alt=""
                        className="searched_movies_img"
                      />
                    </div>
                    <div className="searched_movies_context">
                      <div className="searched_movie_title">
                        {movie.title || movie.name}
                      </div>
                      <div className="searched_movie_year">
                        <span>Released on:</span>
                        <span>
                          {movie.release_date || movie.first_air_date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </article>
        ) : (
          <>
            {isLoading && <MovieSkeletonLoaders />}
            <figure className="movies_display">
              {movies &&
                movies.map((movie, index) => (
                  <Link
                    to={`/movie_details/${movie.id}`}
                    key={index}
                    state={{ movie }}
                  >
                    <div className="home_movie_card all_movies">
                      <div className="movie__loader_even">
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                          className="home_movie_img"
                          alt=""
                        />
                      </div>
                      <div className="home_movie_context">
                        <div className="home_movie_name">
                          {truncateTitle(movie.title || movie.name)}
                        </div>
                        <div className="home_movie_date">
                          {movie.release_date || movie.first_air_date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </figure>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={total / 20}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="pagination"
              activeClassName="active"
            />
          </>
        )}
      </>
      {/*  */}
    </section>
  );
};

export default Movies;
