import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  //
  const navigate = useNavigate();
  // check if user is logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (!users_data_exists) {
      navigate("/login");
    }
  }, []);
  const {
    data: movies,
    loading,
    error,
  } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=1"
  );

  // react slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    draggable: false,
  };

  //
  // set movie desc limit
  const titleLimit = 180;
  const truncateTitle = (title) => {
    if (title.length > titleLimit) {
      let slicedTitle = title.slice(0, titleLimit);
      return slicedTitle + "...";
    }
    return title;
  };

  // Rendering the data in the UI
  return (
    <header className="header_section">
      {movies && (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className="movie_poster" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt=""
                className="movie_poster_img"
              />
              <div className="header_text_overlay">
                <div className="header_title">{movie.title}</div>
                <div className="date_and_rating">
                  <div className="header_date">{movie.release_date}</div>
                  <div className="header_votings">
                    <span>{movie.vote_average}</span>
                    <i className="bx bxs-star"></i>
                  </div>
                </div>
                <div className="header_desc">
                  {truncateTitle(movie.overview)}
                </div>
              </div>
              <div className="header_overlay"></div>
            </div>
          ))}
        </Slider>
      )}
      {/*second header content card of the image*/}
    </header>
  );
};

export default Header;
