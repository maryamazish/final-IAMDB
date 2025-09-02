/* کامپوننت ذره بین و سرچ نام فیلم */
import searchImg from "/images/search1.svg";
import micImg from "/images/mic.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  //با کلیک روی ذره بین به کامپوننت لیست برود
  const goToList =  () => {
    navigate("/list?name=" + query);
  };

  const{handleSubmit} = useForm()

  
  return (
    <form onSubmit={handleSubmit(goToList)}  className="bg-searchbar px-2 py-2 rounded-lg flex justify-between w-full">
      <button type="submit"  className="mr-2">
        <img src={searchImg}  alt="magnifying glass"/>
      </button>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-gray-300"
      />
      <button type="submit" className="ml-2">
        <img src={micImg}  alt="mic"/>
      </button>
      {/* <Link to="/list?type=crime" className="ml-2">
            <img src={micImg} />
          </Link> */}
    </form>
  );
};
export default SearchBar;
