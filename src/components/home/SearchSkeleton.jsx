const SearchSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {[1, 2, 3].map((item) => (

        <div
          key={item}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 animate-pulse"
        >

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>

            <div className="flex-1">

              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3"></div>

              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>

          <div className="space-y-3">

            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded"></div>

            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded"></div>

            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;