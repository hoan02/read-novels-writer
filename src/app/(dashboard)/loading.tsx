const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    </div>
  );
};

export default Loading;
