import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import { Link, useNavigate } from "react-router-dom";

SwiperCore.use([Autoplay]);

const Home = () => {
  //
  const navigate = useNavigate();
  // check if user is logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (!users_data_exists) {
      navigate("/login");
    }
  }, []);
  // states
  const [movies, setMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [mostRated, setMostRated] = useState();
  // fetching the movies
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res1 = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=1"
        );
        const data1 = await res1.json();
        const res2 = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=2"
        );
        const data2 = await res2.json();
        //
        const res3 = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=1"
        );
        const data3 = await res3.json();
        //
        const res4 = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=2"
        );
        const data4 = await res4.json();
        //
        const res5 = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=296b046a3d7afb8c7d9de3d141e11353&language=en-US&page=1"
        );
        const data5 = await res5.json();
        const allmovie = [...data1.results, ...data2.results];
        const allUpcoming = [...data3.results, ...data4.results];
        setMovies(allmovie);
        setUpcomingMovies(allUpcoming);
        setMostRated(data5.results);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

  // set movie title limit
  const titleLimit = 25;
  const truncateTitle = (title) => {
    if (title.length > titleLimit) {
      let slicedTitle = title.slice(0, titleLimit);
      return slicedTitle + "...";
    }
    return title;
  };

  //
  return (
    <section className="home_page">
      <Header />
      {movies && (
        <div className="home_page_section">
          {/* upcoming */}
          {upcomingMovies && (
            <div className="trending_section">
              <div className="trending_header_text">
                <p>Upcoming</p>
                <span></span>
              </div>
              {/*  */}
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5.5,
                    spaceBetween: 50,
                  },
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
                }}
              >
                {upcomingMovies.map((movie, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/movie_details/${movie.id}`} state={{ movie }}>
                      <div className="home_movie_card">
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
                  </SwiperSlide>
                ))}
              </Swiper>
              {/*  */}
            </div>
          )}
          {/* trending Movies */}
          <div className="trending_section">
            <div className="trending_header_text">
              <p>Trending</p>
              <span></span>
            </div>
            {/*  */}
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 2300,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5.5,
                  spaceBetween: 50,
                },
              }}
              style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/movie_details/${movie.id}`} state={{ movie }}>
                    <div className="home_movie_card">
                      <div className="movie__loader_even">
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                          className="home_movie_img"
                          alt=""
                          loading="lazy"
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
                </SwiperSlide>
              ))}
            </Swiper>
            {/*  */}
          </div>
          {/*  */}
          {/* top rated Movies */}
          {mostRated && (
            <div className="trending_section">
              <div className="trending_header_text">
                <p>Top Rated</p>
                <span></span>
              </div>
              {/*  */}
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 1800,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5.5,
                    spaceBetween: 50,
                  },
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
                }}
              >
                {mostRated.map((movie, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/movie_details/${movie.id}`} state={{ movie }}>
                      <div className="home_movie_card">
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
                  </SwiperSlide>
                ))}
              </Swiper>
              {/*  */}
            </div>
          )}
          {/*  */}
        </div>
      )}
    </section>
  );
};

export default Home;
