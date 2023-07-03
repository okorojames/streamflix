import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MovieDetails = () => {
  let { state } = useLocation();
  const [movie, setMovie] = useState();
  useEffect(() => {
    setMovie(state.movie);
  }, []);

  //
  return (
    <article className="movie_details_section">
      {movie && (
        <div className="movie_detail_overlay">
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            alt=""
            className="movie_details_overlay_img"
          />
          <div className="movie_details_overlay"></div>
        </div>
      )}
      {/*  */}
      {movie && (
        <div className="movie_details_card">
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            className="movie_details_card_img"
            alt=""
          />
          <div className="movie_details_context">
            <div className="movie_details_title">{movie.title}</div>
            {/*  */}
            <div className="details_date_and_rating">
              <div className="details_date">{movie.release_date}</div>
              <div className="details_votings">
                <span>{movie.vote_average}</span>
                <i className="bx bxs-star"></i>
              </div>
            </div>
            {/*  */}
            <div className="movie_details_desc">{movie.overview}</div>
            <div className="trailer_row">
              <p>Watch Trailer Here</p>
              <Link
              // to={`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=296b046a3d7afb8c7d9de3d141e11353`}
              >
                <i className="bx bx-play-circle"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/*  */}
    </article>
  );
};

export default MovieDetails;
