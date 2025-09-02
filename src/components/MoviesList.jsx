import { AiFillStar } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Circle from "@comps/generals/Circle";
import ShowGenres from "@comps/generals/ShowGenres";

const MoviesList = ({ searchType, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  // به واسطه اینکه والدش یعنی کانپوننت لیست به کانتکس دسترسی دارد بنابراین این هم به کانتکس دسترسی دارد
  const { favorites, dispatch } = useContext(FavoriteContext);

  /*در این متد با توجه به پارامترهای ورودی کامپوننت چک میکند که چه یوآرالی باید برای گرفتن لیست فیلم ها ست شود*/
  const getMovies = async () => {
    let url = `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`;
    try {
      if (!!searchType && !!searchQuery) {
        switch (searchType) {
          case "NAME":
            url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${searchQuery.trim()}&page=${page}`;
            break;
          case "TYPE":
            url = `https://moviesapi.codingfront.dev/api/v1/genres/${searchQuery.trim()}/movies?page=${page}`;
            break;
        }
      }
      const responseMovies = await fetch(url);
      const data = await responseMovies.json();

      console.log("url", url);
      console.log("movies", data.data);

      setMovies((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("error.message :", error.message);
    } finally {
      setLoading(false);
    }
  };

  // فانکشن اضافه کردن فیلم به لیست موردعلاقهها یا خارج کردن از لیست موردعلاقه ها
  const isFavorite = (movieId) => {
    return favorites.some((favoriteId) => favoriteId === movieId);
  };
  const checkFavorites = (movieId) => {
    isFavorite(movieId)
      ? changeFavorites("REMOVE", movieId)
      : changeFavorites("ADD", movieId);
  };

  const changeFavorites = (type, movieId) => {
    dispatch({
      type: type,
      value: movieId,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMovies();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loader, page]);

  // useEffect(() => {
  //   console.log("page", page);
  // }, [page]);
  return (
    <>
      {movies.length && (
        <ul className="mt-8 ">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex gap-2 pb-5 mb-4 border-b border-b-circle-line remove-line"
            >
              <div>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-[137px] h-[137px] rounded-[18px] mr-5"
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/movie/${movie.id}`}
                  state={{ isFavorite: isFavorite(movie.id) }} //برای چک کردن وضعیت نمایش قلب توپر یا قلب توخالی
                  className="md:font-bold md:text-[28px] text-white"
                >
                  {movie.title}
                </Link>

                {/* نمایش لیست ژانرها */}
                {movie.genres && (
                  <ShowGenres movieId={movie.id} genres={movie.genres} />
                )}

                <ul className="flex font-normal text-lg text-white opacity-80 mt-1.5 ">
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
              <button
                // فراخوانی فانکشن چک کردن اضافه کردن فیلم به لیست موردعلاقه ها یا خارج کردن از لیست موردعلاقه ها
                onClick={() => checkFavorites(movie.id)}
                className="text-lg mr-2 inline-block w-6 h-6 "
              >
                {/*اگر فیلم در لیست موردعلاقه باشد قلب قرمز نمایش داده میشود در غیراینصورت قلب معمولی*/}
                {isFavorite(movie.id) ? (
                  <GoHeartFill className="text-heart" />
                ) : (
                  <GoHeart className="text-white hover:text-heart" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div ref={loader} style={{ padding: 20, textAlign: "center" }}>
        {loading ? "Loading..." : "↓ Scroll to load more"}
      </div>
    </>
  );
};
export default MoviesList;
