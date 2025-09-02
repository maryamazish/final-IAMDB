import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import List from "@/pages/List";
import Movie from "@/pages/Movie";
import { useReducer } from "react";
import { FavoriteReducer } from "@/reducer/FavoriteReducer";
import { FavoriteContext } from "./context/FavoriteContext";
import Dictaphone from "./pages/Dictaphone";

const App = () => {
  const [favorites, dispatch] = useReducer(FavoriteReducer, []);
  return (
    <>
      <FavoriteContext.Provider value={{ favorites, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/Dictaphone" element={<Dictaphone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </FavoriteContext.Provider>
    </>
  );
};

export default App;
