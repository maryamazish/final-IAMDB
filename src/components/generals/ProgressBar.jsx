const ProgressBar = ({
  percentage ,
  color = "#724CF9",
  bgColor = "#222C4F",
}) => {
  return (
    // پرنت
    <div className="relative w-20 h-20">
      {/* دایره درصدی */}
      <div
        className="rounded-full w-20 h-20"
        style={{
          background: `conic-gradient(${color} 0% ${percentage}%, ${bgColor} ${percentage}% 100%)`,
        }}
      ></div>

      {/* دایره داخلی برای ضخامت */}
      <div
        className="absolute rounded-full bg-brand inset-2"
      ></div>

      {/* متن درصد وسط */}
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
        {percentage / 10}
      </div>
    </div>
  );
};
export default ProgressBar;
