import React from 'react';
import { useState, useEffect } from 'react';
import type { Character } from '../types';
import { fetchCharacters } from '../services/characterService';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import NoResults from '../components/NoResults/NoResults';
import Pagination from '../components/Pagination/Pagination';
// import CardList from '../components/CardList/CardList';
import CardList2 from '../components/CardList2/CardList2';

const ResultsPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadCharacters = async (
    value: string = '',
    page = 1
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { results, totalPages } = await fetchCharacters(value, page);
      setSearchResults(results);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(inputValue);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmitButton = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    loadCharacters(inputValue);
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    await loadCharacters(inputValue, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearchSubmit={handleSubmitButton}
      />

      {isLoading ? (
        <Loader />
      ) : searchResults.length ? (
        <>
          {/* <CardList results={searchResults} /> */}
          <CardList2 results={searchResults} />
          <div>
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <NoResults />
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ResultsPage;
