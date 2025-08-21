interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  setOffset: (newOffset: number) => void;
  loading?: boolean;
}

const THREE_DOTS = '...';

export function Pagination({
  offset,
  limit,
  total,
  setOffset,
  loading,
}: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const getPages = (): (string | number)[] => {
    const pages: (string | number)[] = [];

    // Показ номеров, в зависимости от количества страниц
    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, THREE_DOTS, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, THREE_DOTS, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, THREE_DOTS, currentPage, THREE_DOTS, totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      const newOffset = (page - 1) * limit;
      if (newOffset !== offset) {
        setOffset(newOffset);
      }
    }
  };

  return (
    <div className="flex items-end gap-2 justify-center py-4 mt-auto">
      <button
        className="px-3 py-1 text-xl disabled:opacity-30"
        onClick={() => setOffset(offset - limit)}
        disabled={currentPage === 1 || loading}
      >
        {'<'}
      </button>

      {getPages().map((page, index) => (
        <button
          key={`page-${index}`}
          className={`px-4 py-2 rounded-md ${
            page === currentPage
              ? 'bg-black text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
          onClick={() => handlePageClick(page)}
          disabled={page === THREE_DOTS || loading}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 text-xl disabled:opacity-30"
        onClick={() => setOffset(offset + limit)}
        disabled={currentPage === totalPages || loading}
      >
        {'>'}
      </button>
    </div>
  );
}
