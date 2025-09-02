import { GoChevronLeft } from "react-icons/go"; // برای آیکون فلش
import { useNavigate } from "react-router-dom";

const Backward = ({ searchQuery }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-8 flex items-center">
      {/* دکمه برگشت */}
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-searchbar rounded-lg w-10 h-10"
      >
        <GoChevronLeft size={35} />
      </button>

      {/* نمایش ژانر یا عنوان سرچ شده */}
      {!! searchQuery && (
        <div className="flex-1 text-center">
          <h1 className="text-white font-semibold text-sm">Result</h1>
          <p className="text-gray-400 text-xs">for {searchQuery}</p>
        </div>
      )}
    </div>
  );
};
export default Backward;
