import './pagination.scss';

interface Props {
  currentPage: number;
  totalPages?: number;
  gamesLength?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  gamesLength,
  onPageChange,
}: Props) {
  if (!totalPages || totalPages <= 1 || !gamesLength) {
    return null;
  }

  const lastPage = Math.ceil(totalPages);
  const pagesRendered = () => {
    let pageRendered = currentPage < 3 ? 3 : currentPage;
    let hideLastPage = false;

    if (currentPage > lastPage - 2) {
      pageRendered = lastPage - 2;
    }

    if (currentPage > lastPage - 8) {
      hideLastPage = true;
    }
    let rendered: { value: number; isLast?: boolean }[] = [
      { value: pageRendered - 2 },
      { value: pageRendered - 1 },
      { value: pageRendered },
      { value: pageRendered + 1 },
      { value: pageRendered + 2 },
    ];

    if (totalPages < 5) {
      const result = Array.from(
        { length: Math.ceil(totalPages) },
        (_, i) => i + 1,
      );
      rendered = result?.map((number) => {
        return {
          value: number,
        };
      });
    }

    if (!hideLastPage) {
      rendered.push({ value: lastPage, isLast: true });
    }
    return rendered;
  };
  const pages = pagesRendered();
  return (
    <div className="d-flex pagination justify-content-center">
      <button
        className="pagination__arrow"
        onClick={() => currentPage > 1 && onPageChange(1)}
      >
        &lt;&lt;
      </button>
      <button
        className="pagination__arrow"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pages?.map((page) => (
        <button
          className={currentPage === page.value ? 'selected' : ''}
          onClick={() => onPageChange(page.value)}
          key={page.value}
        >
          {page.isLast && '...'}
          {page.value}
        </button>
      ))}
      <button
        className="pagination__arrow"
        onClick={() =>
          currentPage < Math.ceil(lastPage) && onPageChange(currentPage + 1)
        }
      >
        &gt;
      </button>
      <button
        className="pagination__arrow"
        onClick={() =>
          currentPage < Math.ceil(lastPage) && onPageChange(lastPage)
        }
      >
        &gt;&gt;
      </button>
    </div>
  );
}
