import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Backward from "@comps/Backward";
import Container from "@comps/generals/Container";

import ShowDetail from "@comps/generals/ShowDetail";
import Poster from "@comps/generals/Poster";
import {
  ShowMovieAboutSection,
  ShowMovieProgressBarSection,
} from "@comps/generals/ShowMovieSections";

const Movie = () => {
  const params = useParams();
  //   console.log(params.id);

  //چون وب سرویس هی قطع میشد این رو بهصورت دستی گذاشتم ولی باید بعدا پاکش کنم
  const initialValue = {
    id: 3,
    title: "The Dark Knight",
    poster: "https://moviesapi.codingfront.dev/images/tt0468569.jpg",
    user_cover: null,
    year: "2008",
    rated: "PG-13",
    released: "18 Jul 2008",
    runtime: "152 min",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
    actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    country: "United States, United Kingdom",
    awards: "Won 2 Oscars. 159 wins & 163 nominations total",
    metascore: "84",
    imdb_rating: "9.1",
    imdb_votes: "2,528,462",
    imdb_id: "tt0468569",
    type: "movie",
    website: "N/A",
    language: "English, Mandarin",
    ratings: [
      { Value: "9.1/10", Source: "Internet Movie Database" },
      { Value: "94%", Source: "Rotten Tomatoes" },
      { Value: "84/100", Source: "Metacritic" },
    ],
    dvd: "09 Dec 2008",
    box_office: "$534,987,076",
    production: "N/A",
    response: "True",
    genres: ["Action", "Crime", "Drama"],
    images: ["https://moviesapi.codingfront.dev/images/tt0468569_backdrop.jpg"],
  };
  // const [movie, setMovie] = useState(initialValue);
  const [movie, setMovie] = useState({});

  //وقتی روی نام فیلم کلیک میشود در کامپوننت لینکش  وضعیت قلب پر یا قلب توخالی در کلید استیت به اینجا ارسال میشود.
  const { state } = useLocation();

  const getMovie = async () => {
    try {
      const responseMovie = await fetch(
        `https://moviesapi.codingfront.dev/api/v1/movies/${params.id}`
      );
      const data = await responseMovie.json();
      //چون مقدار ratings به صورت رشته است برای همین نیاز شد که تبدیل به آرایه بشود
      setMovie({ ...data, ratings: JSON.parse(data.ratings) });
      console.log("movie", data);
    } catch (error) {
      console.log("error.message :", error.message);
    }
  };

  useEffect(() => {
    getMovie();
  }, [params.id]);

  useEffect(() => {
    console.log("ratings", movie.ratings);
  }, [movie.ratings]);

  return (
    <>
      <div className="relative">
        {/* تصویر بزرگ عکس در هدر */}
        <Poster src={movie.images && movie.images[0]} alt={movie.title} />
        <div className="absolute inset-x-0 top-[50px] flex items-center justify-center">
          <Container>
            <div className="flex flex-col">
              <Backward />

              {/* دیزاین موبایل */}
              <div className="md:hidden mt-[60px]">
                <ShowMovieAboutSection movie={movie} isFavorite={state.isFavorite} />

                <div className="flex gap-[18px] items-center mt-4 w-full">
                  {/* پروگرس بار */}
                  {/* <ProgressBar percentage={movie.imdb_rating * 10} stroke={8} />
                  <div>
                    <p className="font-bold text-base text-white">
                      {movie.imdb_votes}
                    </p>
                    <p className="font-normal text-sm text-white opacity-60">
                      ratings on IMDB
                    </p>
                  </div> */}
                  <ShowMovieProgressBarSection movie={movie}/>
                  <ul className="font-normal text[13px] text-white opacity-50">
                    {movie.ratings &&
                      movie.ratings.map((rating) => (
                        <li key={rating.Value}>
                          <span>{rating.Value}</span>
                          <span className="ml-2">{rating.Source}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* دیزاین دسکتاپ */}
              <div className=" hidden md:flex gap-x-16 mt-[100px]">
                <div className="flex flex-col">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="md:w-[208px] md:h-[311.9px] rounded-[18px] mr-5"
                  />

                  <div className="flex gap-[18px] items-center mt-[30px]">
                    {/* پروگرس بار */}
                    {/* <ProgressBar
                      percentage={movie.imdb_rating * 10}
                      stroke={8}
                    />
                    <div>
                      <p className="font-bold text-base text-white">
                        {movie.imdb_votes}
                      </p>
                      <p className="font-normal text-sm text-white opacity-60">
                        ratings on IMDB
                      </p>
                    </div> */}
                                      <ShowMovieProgressBarSection movie={movie}/>

                  </div>

                  <ul className="font-normal text[13px] text-white opacity-50 mt-[30px]">
                    {movie.ratings &&
                      movie.ratings.map((rating) => (
                        <li key={rating.Value}>
                          <span>{rating.Value}</span>
                          <span className="ml-2">{rating.Source}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <ShowMovieAboutSection movie={movie} />

                  <p className="md:font-bold md:text-[28px] text-white leading-12 mt-[18px]">
                    Details
                  </p>
                  <ul className="font-normal text-sm text-white ">
                    <ShowDetail title="Directors" detail={movie.director} />
                    <ShowDetail title="Writers" detail={movie.writer} />
                    <ShowDetail title="Actors" detail={movie.actors} />
                    <ShowDetail title="Country" detail={movie.country} />
                    <ShowDetail title="Language" detail={movie.language} />
                    <ShowDetail title="Awards" detail={movie.awards} />
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Movie;
