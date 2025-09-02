import { Link } from "react-router-dom";

const ShowGenres = ({ movieId, genres }) => {
  console.log("genres", genres);
  return (
    <ul className="flex gap-1.5 md:font-light md:text-xs text-white opacity-40">
      {genres.map((genre, index) => (
        <li key={movieId + genre}>
          <Link to={`/list?type=${genre}`}>
            {genre}
            {/* گذاشتن کاما بعد از هر آیتم */}
            {index !== genres.length - 1 && <span>,</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ShowGenres;
