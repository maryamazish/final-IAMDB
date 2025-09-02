import { useLocation } from "react-router-dom";
import Container from "@comps/generals/Container";
import SearchBar from "@comps/generals/SearchBar";
import Backward from "@comps/Backward";
import MoviesListInfinite from "@comps/MoviesListInfinite";

const List = () => {

  const location = useLocation();

  let searchQuery = "";
  let searchType = "";
  const queries = new URLSearchParams(location.search);
  if (!!queries.get("name")) {
    searchType = "NAME";
    searchQuery = queries.get("name");
  }
  if (!!queries.get("type")) {
    searchType = "TYPE";
    searchQuery = queries.get("type");
  }

  return (
    <Container>
      <div className="flex flex-col mt-[32px] md:mt-[50px]">
        {/* کامپوننت بک و نمایش عنوان سرچ شده */}
        <Backward searchQuery={searchQuery} />
        {/* کامپوننت ذره بین و سرچ نام فیلم */}
        <SearchBar />
        {/* لود اسکرولی با روش Intersection Observer API */}
        {/* <MoviesList searchType={searchType} searchQuery={searchQuery} /> */}
        {/* لود اسکرولی با روش react-infinite-scroll-component */}
        <MoviesListInfinite searchType={searchType} searchQuery={searchQuery} />
      </div>
    </Container>
  );
};
export default List;
