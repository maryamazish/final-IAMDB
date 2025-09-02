const Poster = ({src , alt}) => {
  return (
    <div className="relative w-full h-[400px]">
      {/* عکس هدر */}
      <img
        src={src}
        alt={alt}
        className="opacity-50 md:opacity-100 w-full h-full object-cover"
      />

      {/* لایه محوکننده پایین */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand to-transparent" />
    </div>
  );
};
export default Poster;