import { useEffect, useState } from 'react';
import { PokemonAPIResponse } from '../../types/PokemonAPIResponse';
import useSearchQuery from '../../hooks/routers/useSearchQuery';
import { useSearchParams } from 'react-router-dom';

const MAX_POKEMON_DISPLAY = 12;

type PokemonInfo = {
  id: string;
  name: string;
};

type SortOptionState = 'name' | 'id';

const pokemonAPIResponseAdapter = (
  fullData: PokemonAPIResponse,
  page: number
) => {
  const SLICE_INDEX = MAX_POKEMON_DISPLAY * page;
  const slicedPokemon = fullData.results.slice(
    SLICE_INDEX,
    SLICE_INDEX + MAX_POKEMON_DISPLAY
  );

  const result = slicedPokemon.map((pokemon) => {
    const splitedURL = pokemon.url.split('/');
    const extractedId = splitedURL[splitedURL.length - 2];
    return {
      id: extractedId,
      name: pokemon.name,
    };
  });

  return result;
};

const sortByName = (fullData?: PokemonAPIResponse) => {
  if (!fullData) return;

  // Hacky array shallow clone
  const newResult = fullData.results.slice();

  // Strangely the .sort mutate the original array :(
  // Let's leave it like this
  newResult.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  return { ...fullData, results: newResult };
};

const cleanPageQuery = (queryPage?: string | null) => {
  if (!queryPage || isNaN(parseInt(queryPage))) return 0;

  return parseInt(queryPage);
};

const cleanSortBy = (querySortBy?: string | null) => {
  if (!querySortBy) return 'name';

  if (querySortBy === 'name' || querySortBy === 'id') {
    return querySortBy;
  }
  return 'name';
};

const useHome = (data?: PokemonAPIResponse) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayingData, setDisplayingData] = useState<PokemonInfo[]>();
  const [sortOption, setSortOption] = useState<SortOptionState>('name');

  const searchParam = useSearchQuery();

  const [, setSearchParams] = useSearchParams();

  //Won't memo until it's too slow
  const nameSortedData = sortByName(data);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ page: `${currentPage}`, sortBy: event.target.value });
    setSortOption(event.target.value as SortOptionState);
  };

  useEffect(() => {
    const queryCurrentPage = cleanPageQuery(searchParam.get('page'));
    const sortBy = cleanSortBy(searchParam.get('sortBy'));

    setSortOption(sortBy);

    if (data) {
      setCurrentPage(queryCurrentPage);
      const MAP = {
        id: data,
        name: nameSortedData,
      };

      const parsedPokemon = pokemonAPIResponseAdapter(
        MAP[sortOption] ?? data,
        queryCurrentPage
      );

      setDisplayingData(parsedPokemon);
    }
  }, [searchParam, data, currentPage, sortOption]);

  const ids = displayingData?.map((datum) => datum.id || '') ?? [];

  const maxPage = Math.floor(
    (data?.results?.length || 0) / MAX_POKEMON_DISPLAY
  );

  const goNext = () => {
    searchParam.set('page', `${currentPage + 1}`);
    setSearchParams({ page: `${currentPage + 1}`, sortBy: sortOption });
    setCurrentPage((p) => p + 1);
  };

  const goBack = () => {
    searchParam.set('page', `${currentPage - 1}`);
    setSearchParams({ page: `${currentPage - 1}`, sortBy: sortOption });
    setCurrentPage((p) => p - 1);
  };

  return {
    sortOption,
    ids,
    currentPage,
    maxPage,
    handleOptionChange,
    goBack,
    goNext,
  };
};

export default useHome;
