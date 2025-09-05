import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonStyle from "@comps/generals/ButtonStyle";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [count, setCount] = useState(4);
  const getGenres = async () => {
    try {
      const responseGenres = await fetch(
        `https://moviesapi.codingfront.dev/api/v1/genres`
      );
      const data = await responseGenres.json();
      setGenres(data);
      // console.log("genres", data);
    } catch (error) {
      console.log("error.message :", error.message);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {genres.slice(0, count).map((genre) => (
        <li key={genre.id} className="inline-block text-center">
          <Link to={`/list?type=${genre.name}`}>
            <ButtonStyle name={genre.name} />
          </Link>
        </li>
      ))}
      {count < genres.length ? (
        <button onClick={() => setCount(genres.length)}>
          <ButtonStyle name="Show More >"></ButtonStyle>
        </button>
      ) : (
        <button onClick={() => setCount(4)}>
          {count === genres.length && (
          <ButtonStyle name="Show Less >"></ButtonStyle>)}
        </button>
      )}
    </ul>
  );
};
export default Genres;
