import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MovieDetails = () => {
  let { state } = useLocation();
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  useEffect(() => {
    setMovie(state.movie);
    //
    // get movie trailer
    const getTrailer = async () => {
      try {
        const res = await fetch(
          `http://api.themoviedb.org/3/movie/${state.movie.id}/videos?api_key=296b046a3d7afb8c7d9de3d141e11353`
        );
        const trailerData = await res.json();
        setTrailer(trailerData.results[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getTrailer();
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
            </div>
          </div>
        </div>
      )}
      {/*  */}
      {/* Watch Trailer Here */}
      {trailer && (
        <div className="trailer_wrapper">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </article>
  );
};

export default MovieDetails;
