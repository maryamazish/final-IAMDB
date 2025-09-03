import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Backward from "@comps/Backward";
import Container from "@comps/generals/Container";
import Poster from "@comps/generals/Poster";
import {
  ShowAboutSection,
  ShowProgressBarSection,
  ShowRatingsSection,
  ShowDetailSection,
} from "@comps/generals/ShowMovieSections";
import { FavoriteContext } from "@/context/FavoriteContext";
import { isFavorite } from "@/utils/FavoriteChecker";

const Movie = () => {
  const params = useParams();

  const [movie, setMovie] = useState({});

  //وقتی روی نام فیلم کلیک میشود در کامپوننت لینکش  وضعیت قلب پر یا قلب توخالی در کلید استیت به اینجا ارسال میشود.
  const { state } = useLocation();

  // به واسطه اینکه والدش یعنی کانپوننت لیست به کانتکس دسترسی دارد بنابراین این هم به کانتکس دسترسی دارد
  const { favorites, dispatch } = useContext(FavoriteContext);

  // فانکشن اضافه کردن فیلم به لیست موردعلاقهها یا خارج کردن از لیست موردعلاقه ها
  const changeFavorites = (movieId) => {
    dispatch({
      type: isFavorite(favorites, movieId) ? "REMOVE" : "ADD",
      value: movieId,
    });
  };

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
              <div className="md:hidden mt-[60px] mb-10">
                <ShowAboutSection movie={movie} isFavorite={state.isFavorite} />

                <div className="flex gap-[18px] items-center mt-4 w-full">
                  <ShowProgressBarSection
                    rating={movie.imdb_rating}
                    votes={movie.imdb_votes}
                  />{" "}
                  {movie.ratings && (
                    <ShowRatingsSection ratings={movie.ratings} />
                  )}
                </div>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-[18px] mt-[18px] object-contain"
                />
                <ShowDetailSection movie={movie} />
                <button
                  onClick={() => changeFavorites(movie.id)}
                  className="h-[41px] leading-[41px] rounded-[12px] text-white font-normal text-sm fixed bottom-3 right-0 left-0 "
                >
                  {/*اگر فیلم در لیست موردعلاقه باشد دکمه ریمو از لسیت نمایش داده میشود در غیراینصورت دکمه ادد تو لیست*/}
                  {isFavorite(favorites, movie.id) ? (
                    <div className="bg-circle-line h-full rounded-xl">
                      Remove from Favorite
                    </div>
                  ) : (
                    <div className="bg-favorite h-fullbg-circle-line h-full rounded-xl">
                      Add to Favorite
                    </div>
                  )}
                </button>
              </div>

              {/* دیزاین دسکتاپ */}
              <div className=" hidden md:flex gap-x-16 mt-[100px]">
                <div className="flex flex-col">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-[208px] h-[311.9px] rounded-[18px] mr-5"
                  />

                  <div className="flex gap-[18px] items-center mt-[30px]">
                    <ShowProgressBarSection
                      rating={movie.imdb_rating}
                      votes={movie.imdb_votes}
                    />
                  </div>

                  {movie.ratings && (
                    <ShowRatingsSection ratings={movie.ratings} />
                  )}
                </div>

                <div className="flex-1">
                  <ShowAboutSection
                    movie={movie}
                    isFavorite={state.isFavorite}
                  />
                  <ShowDetailSection movie={movie} />
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
