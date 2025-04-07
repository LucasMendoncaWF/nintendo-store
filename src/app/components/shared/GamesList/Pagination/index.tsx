import './pagination.scss';
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const lastPage = Number(totalPages.toFixed(0));
  const pagesRendered = () => {
    let pageRendered = currentPage < 3 ? 3 : currentPage;
    let hideLastPage = false;

    if(currentPage > lastPage - 2) {
      pageRendered = lastPage - 2;
    }

    if(currentPage > lastPage - 8) {
      hideLastPage = true;
    }
    const rendered: {value: number, isLast?: boolean}[] =  [
      {value: pageRendered-2},
      {value: pageRendered-1},
      {value: pageRendered},
      {value: pageRendered+1},
      {value: pageRendered+2},
    ];

    if(!hideLastPage) {
      rendered.push({value: lastPage, isLast: true});
    }
    return rendered;
  }
  const pages = pagesRendered();
  return (
    <div className="d-flex pagination justify-content-center">
      <button className='pagination__arrow' onClick={() => currentPage > 1 && onPageChange(1)}>&lt;&lt;</button>
      <button className='pagination__arrow' onClick={() => currentPage > 1 && onPageChange(currentPage-1)}>&lt;</button>
      {pages?.map(page => 
        <button className={currentPage === page.value ? 'selected' : ''} onClick={() => onPageChange(page.value)} key={page.value}>{page.isLast && '...'} {page.value}</button>
      )}
      <button className='pagination__arrow' onClick={() => currentPage < Math.round(lastPage) && onPageChange(currentPage+1)}>&gt;</button>
      <button className='pagination__arrow' onClick={() => currentPage < Math.round(lastPage) && onPageChange(lastPage)}>&gt;&gt;</button>
    </div>
  )
}