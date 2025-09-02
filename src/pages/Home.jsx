import Container from "@comps/generals/Container";
import SearchBar from "@comps/generals/SearchBar";
import Genres from "@comps/Genres";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-8 justify-center items-center">
        <div className="flex mt-[204px] md:mt-20"></div>
          <h1 className="text-white font-black w-fit text-[100px] md:text-[140px]">
          IAMDb
        </h1>

        {/* کامپوننت ذره بین و سرچ نام فیلم */}
        <SearchBar />

        {/* کامپوننت نمایش ژانرها */}
        <Genres />
      </div>
    </Container>
  );
};

export default Home;
