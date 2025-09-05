import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import ShowGenres from "@comps/generals/ShowGenres";
import ButtonStyle from "@comps/generals/ButtonStyle";
import ProgressBar from "@comps/generals/ProgressBar";

export const ShowAboutSection = ({ movie, isFavorite }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[48px] w-full ">
          {movie.title}
        </h2>

        <div className="hidden md:block">
          {isFavorite ? (
            <GoHeartFill className="text-favorite" />
          ) : (
            <GoHeart className="text-white" />
          )}
        </div>
      </div>

      {movie.genres && <ShowGenres movieId={movie.id} genres={movie.genres} />}

      <p className="font-normal text-sm  mt-[18px] leading-6">
        {movie.plot}
      </p>

      <ul className="flex gap-3 mt-[18px] ">
        <li>
          <ButtonStyle name={movie.rated} />
        </li>
        <li>
          <ButtonStyle name={movie.year} />
        </li>
        <li>
          <ButtonStyle name={movie.runtime} />
        </li>
      </ul>
    </>
  );
};

export const ShowProgressBarSection = ({ rating, votes }) => {
  return (
    <>
      {/* پروگرس بار */}
      <ProgressBar percentage={rating * 10} />
      <div>
        <p className="font-bold text-base ">{votes}</p>
        <p className="font-normal text-sm  opacity-60">
          ratings on IMDB
        </p>
      </div>
    </>
  );
};

export const ShowRatingsSection = ({ ratings }) => {
  return (
    <>
      <ul className="font-normal text[13px]  opacity-50 mt-[30px]">
        {ratings &&
          ratings.map((rating) => (
            <li key={rating.Value}>
              <span>{rating.Value}</span>
              <span className="ml-2">{rating.Source}</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export const ShowDetailSection = ({ movie }) => {
  return (
    <>
      <p className="font-bold text-[28px]  leading-12 mt-[18px]">
        Details
      </p>
      <ul className="font-normal text-sm  ">
        <ShowDetail title="Directors" detail={movie.director} />
        <ShowDetail title="Writers" detail={movie.writer} />
        <ShowDetail title="Actors" detail={movie.actors} />
        <ShowDetail title="Country" detail={movie.country} />
        <ShowDetail title="Language" detail={movie.language} />
        <ShowDetail title="Awards" detail={movie.awards} />
      </ul>
    </>
  );
};

const ShowDetail = ({ title, detail }) => {
  return (
    <li className="flex pt-3 pb-3 border-b border-b-circle-line remove-line">
      <p className="flex-1/3">{title}</p>
      <p className="flex-1/2 opacity-60">{detail}</p>
    </li>
  );
};
