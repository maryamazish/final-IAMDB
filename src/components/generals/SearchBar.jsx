/* کامپوننت ذره بین و سرچ نام فیلم */
import searchImg from "/images/search1.svg";
import micImg from "/images/microphone.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //با کلیک روی ذره بین به کامپوننت لیست برود
  const goToList = () => {
    navigate("/list?name=" + query);
  };

  const { handleSubmit } = useForm();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  useEffect(() => {
    if (listening) setQuery(transcript);
  }, [transcript, listening]);

  const stopListening = () => {
    SpeechRecognition.abortListening();
    // بعد از زدن دکمه استوپ هرچی که گفتیم داخل استیت کوئری قرار میگیرد
    setQuery(transcript);
  };

  const startListening = () => {
    // با شروع ضبط مقادیر گفته های قبلی ریست میشود
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <form
      onSubmit={handleSubmit(goToList)}
      className="bg-searchbar px-2 py-2 rounded-lg flex justify-between w-full"
    >
      <button type="submit" className="mr-2">
        <img src={searchImg} alt="magnifying glass" />
      </button>
      <input
        // value={query}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-gray-300"
      />

      {listening ? (
        <button type="button" className="ml-2 border-l-2 text-black pl-3" onClick={stopListening}>
          <img src={micImg} alt="mic" className={`opacity-50 grayscale`} />
        </button>
      ) : (
        <button type="button" onClick={startListening} className="ml-2 border-l-2 text-black pl-3">
          <img src={micImg} alt="mic" />
        </button>
      )}
    </form>
  );
};
export default SearchBar;
