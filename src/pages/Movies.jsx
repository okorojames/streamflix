import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MoviesContext } from "../contexts/MoviesContext";

const Movies = () => {
  //global states here...
  const {
    page,
    pageChanged,
    setPageChanged,
    movieName,
    setMovieName,
    handleIncrePage,
    handleDecrePage,
  } = useContext(MoviesContext);

  // normal states
  const [searchedMovies, setSearchedMovies] = useState();

  //
  const navigate = useNavigate();
  // check if user is logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (!users_data_exists) {
      navigate("/login");
    }
  }, []);

  // fetching the datas
  const {
    data: movies,
    loading,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=${page}`
  );

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
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                      alt=""
                      className="searched_movies_img"
                    />
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
          <figure className="movies_display">
            {movies &&
              movies.map((movie) => (
                <Link
                  to={`/movie_details/${movie.id}`}
                  key={movie.id}
                  state={{ movie }}
                >
                  <div className="home_movie_card all_movies">
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                      className="home_movie_img"
                      alt=""
                    />
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
        )}
        <div className="next_and_previous_page">
          <button className="next_button" onClick={handleIncrePage}>
            <i className="bx bx-chevrons-left"></i>
          </button>
          <p>{page}</p>
          <button className="previous_button" onClick={handleDecrePage}>
            <i className="bx bx-chevrons-right"></i>
          </button>
        </div>
      </>
      {/*  */}
    </section>
  );
};

export default Movies;
