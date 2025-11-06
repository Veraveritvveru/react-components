import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onChange,
}) => {
  if (total <= 1) return null;
  const getPages = (
    current: number,
    total: number,
    numberOfButtons: number
  ) => {
    const half = Math.floor(numberOfButtons / 2);
    let start = Math.max(1, current - half);
    const end = Math.min(total, numberOfButtons + start - 1);

    if (end - start + 1 < numberOfButtons) {
      start = Math.max(1, end - numberOfButtons + 1);
    }

    return Array.from({ length: numberOfButtons }, (_, i) => start + i);
  };

  const pages = getPages(current, total, 5);

  return (
    <nav aria-label="Pagination">
      <ul className={styles.paginationWrapper}>
        <button
          onClick={() => onChange(1)}
          aria-label="First page"
          disabled={current === 1}
          className={styles.button}
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => onChange(current - 1)}
          aria-label="Previous page"
          disabled={current === 1}
          className={styles.button}
        >
          {' '}
          &lt;{' '}
        </button>
        {pages.map((page, id) => (
          <li key={id}>
            <button
              onClick={() => onChange(page)}
              className={
                page === current ? styles.currentNumber : styles.number
              }
            >
              {page}
            </button>
          </li>
        ))}
        <button
          onClick={() => onChange(current + 1)}
          aria-label="Next page"
          disabled={current === total}
          className={styles.button}
        >
          &gt;
        </button>
        <button
          onClick={() => onChange(total)}
          aria-label="Last page"
          disabled={current === total}
          className={styles.button}
        >
          &gt;&gt;
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
