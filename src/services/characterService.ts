import type { Character } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (
  searchQuery: string = '',
  page: number
): Promise<{ results: Character[]; totalPages: number }> => {
  const trimmedQuery = searchQuery.trim();

  const params = new URLSearchParams({
    page: String(page),
  });

  if (trimmedQuery) {
    params.set('name', trimmedQuery);
  }

  const url = `${BASE_URL}/?${params.toString()}`;
  const response = await fetch(url);

  if (response.status === 404) {
    return { results: [], totalPages: 0 };
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return {
    results: Array.isArray(data.results) ? data.results : [],
    totalPages: data.info?.pages ?? 1,
  };
};
