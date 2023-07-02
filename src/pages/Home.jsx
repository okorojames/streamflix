import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "react-slick";
import useFetch from "../hooks/useFetch";

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
  // react slick settings
  // const home_carousel = {
  //   dots: true,
  //   infinite: true,
  //   speed: 800,
  //   slidesToShow: 5,
  //   slidesToScroll: 2,
  //   // autoplay: true,
  //   autoplaySpeed: 6000,
  //   arrows: false,
  //   draggable: true,
  //   pauseOnHover: false,
  //   pauseOnFocus: false,
  //   centerMode: true,
  //   centerPadding: "60px",
  // };

  //

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
            <div className="your-class">
              {movies.map((movie) => (
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
