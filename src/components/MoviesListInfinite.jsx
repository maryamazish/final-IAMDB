import { AiFillStar } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Circle from "@comps/generals/Circle";
import ShowGenres from "@comps/generals/ShowGenres";
import InfiniteScroll from "react-infinite-scroll-component";
import { FavoriteContext } from "@/context/FavoriteContext";
import { isFavorite } from "@/utils/FavoriteChecker";

const MoviesListInfinite = ({ searchType, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  // به واسطه اینکه والدش یعنی کانپوننت لیست به کانتکس دسترسی دارد بنابراین این هم به کانتکس دسترسی دارد
  const { favorites, dispatch } = useContext(FavoriteContext);

  /*در این متد با توجه به پارامترهای ورودی کامپوننت چک میکند که چه یوآرالی باید برای گرفتن لیست فیلم ها ست شود*/
  const makeURL = (pageNumber) => {
    let url = `https://moviesapi.codingfront.dev/api/v1/movies?page=${pageNumber}`;
    if (!!searchType && !!searchQuery) {
      switch (searchType) {
        case "NAME":
          return `https://moviesapi.codingfront.dev/api/v1/movies?q=${searchQuery.trim()}&page=${pageNumber}`;
        case "TYPE":
          return `https://moviesapi.codingfront.dev/api/v1/genres/${searchQuery.trim()}/movies?page=${pageNumber}`;
        default:
          return url;
      }
    }
    return url;
  };

  // چون فیلمهای پیج اول را دوبار در لیست نمایش میداد برای همین لود فیلمهای صفحه اول رو از لود بقیه فیلمها جدا کردم
  // گرفتن فیلمهای صفحه اول
  const getMoviesFirstPage = async () => {
    try {
      const responseMovies = await fetch(makeURL(1));
      const moviesList = await responseMovies.json();
      const data = moviesList.data;

      setMovies(data);

      // console.log("movies", data);
    } catch (error) {
      console.log("error.message :", error.message);
    }
  };

  // گرفتن لیست فیلمهای سایر صفحات
  const getMoreMovies = async () => {
    const responseMovies = await fetch(makeURL(page));
    const moviesList = await responseMovies.json();
    const data = moviesList.data;

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setMovies((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  };

  //از یوزممو نمیشه استفاده کرد چون فانکشن getMoviesFirstPage آسینک هست
  useEffect(() => {
    getMoviesFirstPage();
  }, [searchQuery]);


  // useEffect(() => {
  //   console.log("hasMore", hasMore);
  // }, [hasMore]);

  // فانکشن اضافه کردن فیلم به لیست موردعلاقهها یا خارج کردن از لیست موردعلاقه ها
  const changeFavorites = (movieId) => {
    dispatch({
      type: isFavorite(favorites, movieId) ? "REMOVE" : "ADD",
      value: movieId,
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length} // تعداد آیتم فعلی
        next={getMoreMovies} // فانکشنی که داده جدید میاره
        hasMore={hasMore} // آیا هنوز داده‌ای هست یا نه
        loader={
          (!!movies.length && hasMore) ? <h4 className="text-black">Loading...</h4> : <h4 className="text-black">No Result...</h4>
        }
      >
        {movies.length ? (
          <ul className="mt-8 w-full flex flex-col">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex py-5 border-b border-b-circle-line remove-line"
              >
                <div className="mr-5">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-[122px] h-[122px] md:w-[137px] md:h-[137px] rounded-[18px] object-cover "
                  />
                </div>
                <div className="flex flex-col w-full flex-1">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/movie/${movie.id}`}
                      state={{ isFavorite: isFavorite(favorites, movie.id) }} //برای چک کردن وضعیت نمایش قلب توپر یا قلب توخالی
                      className="font-bold text-2xl md:text-[28px] text-white flex-1"
                    >
                      {movie.title}
                    </Link>

                    <button
                      // فراخوانی فانکشن چک کردن اضافه کردن فیلم به لیست موردعلاقه ها یا خارج کردن از لیست موردعلاقه ها
                      onClick={() => changeFavorites(movie.id)}
                      className="text-2xl w-6 h-6 mr-2"
                    >
                      {/*اگر فیلم در لیست موردعلاقه باشد قلب آبی نمایش داده میشود در غیراینصورت قلب بیرنگ*/}
                      {isFavorite(favorites, movie.id) ? (
                        <GoHeartFill className="text-favorite" />
                      ) : (
                        <GoHeart className="text-white hover:text-favorite" />
                      )}
                    </button>
                  </div>
                  {/* نمایش لیست ژانرها */}
                  {movie.genres && (
                    <ShowGenres movieId={movie.id} genres={movie.genres} />
                  )}

                  <ul className="flex flex-wrap font-normal text-base text-white opacity-80 mt-1.5 ">
                    <li>{movie.year}</li>
                    <li>
                      <Circle />
                    </li>
                    <li>{movie.country}</li>
                    <li>
                      <Circle />
                    </li>

                    <li className="flex items-center leading-0">
                      <span className="text-star text-lg mr-2 inline-block w-[14px] h-[14px]">
                        <AiFillStar />
                      </span>
                      {movie.imdb_rating}
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // اگر نتیجه ای نداشت مقدار 0 چاپ نشود
          ""
        )}
      </InfiniteScroll>
    </>
  );
};
export default MoviesListInfinite;
