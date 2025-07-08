interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center my-4 space-x-2">
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={idx}
            className={`px-4 py-1 border rounded ${
              isActive ? "bg-orange-500 text-black " : "bg-white text-gray-400"
            }  transition`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
