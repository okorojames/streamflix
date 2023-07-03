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

SwiperCore.use([Autoplay]);

const Home = () => {
  // states
  const [movies, setMovies] = useState();
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
        const allmovie = [...data1.results, ...data2.results];
        setMovies(allmovie);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);
  {
    movies && console.log(movies);
  }

  //
  return (
    <section className="home_page">
      <Header />
      {movies && (
        <div className="home_page_section">
          {/* trending */}
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
                delay: 3000,
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
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <div className="home_movie_card">
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                      className="home_movie_img"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/*  */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
