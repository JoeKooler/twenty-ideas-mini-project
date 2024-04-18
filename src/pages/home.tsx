import { useEffect, useState } from 'react';
import { useGetAllPokemon } from '../hooks/queries/useGetAllPokemon';
import PokeCards from '../components/PokeCards';
import useSearchQuery from '../hooks/routers/useSearchQuery';
import { PokemonAPIResponse } from '../types/PokemonAPIResponse';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

type PokemonInfo = {
  id: string;
  name: string;
};

type SortOptionState = 'name' | 'id';

const MAX_POKEMON_DISPLAY = 12;

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

const HomePage = () => {
  const { data, isLoading } = useGetAllPokemon();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayingData, setDisplayingData] = useState<PokemonInfo[]>();
  const [sortOption, setSortOption] = useState<SortOptionState>('name');

  const queryClient = useQueryClient();

  const searchParam = useSearchQuery();

  console.log('Data ', data);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const nameSortedData = sortByName(data);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ page: `${currentPage}`, sortBy: event.target.value });
    setSortOption(event.target.value as SortOptionState);
  };

  useEffect(() => {
    const queryCurrentPage = searchParam.get('page');
    if (queryCurrentPage && data) {
      const parsedPage = parseInt(queryCurrentPage);
      setCurrentPage(parsedPage);
      const MAP = {
        id: data,
        name: nameSortedData,
      };

      const parsedPokemon = pokemonAPIResponseAdapter(
        MAP[sortOption] ?? data,
        parsedPage
      );

      setDisplayingData(parsedPokemon);
    }
  }, [searchParam, data, currentPage, sortOption]);

  console.log('Search ', searchParam.get('page'));
  console.log('Search ', searchParam.get('sortBy'));

  const ids = displayingData?.map((datum) => datum.id || '') ?? [];
  const maxPage = Math.floor(
    (data?.results?.length || 0) / MAX_POKEMON_DISPLAY
  );
  console.log('Max ', currentPage >= maxPage);

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

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="flex flex-col p-12 space-y-4 bg-[rgba(246,246,247,1)] w-screen min-h-screen">
        <div className="flex justify-between">
          <h1>All the Pokemon!</h1>
          <div className="flex">
            <label className="flex px-4 py-[0.625rem]">
              <input
                type="radio"
                value="name"
                checked={sortOption === 'name'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort Name
            </label>

            <label className="flex px-4 py-[0.625rem]">
              <input
                type="radio"
                value="id"
                checked={sortOption === 'id'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort ID
            </label>
          </div>
        </div>
        <div>
          <PokeCards ids={ids} />
        </div>

        <div className="w-full flex flex-grow items-end">
          <div className="flex w-full justify-between">
            {currentPage > 0 ? (
              <button
                className="px-3 py-2 border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded"
                onClick={() => goBack()}
              >
                Previous {MAX_POKEMON_DISPLAY}
              </button>
            ) : (
              <div></div>
            )}

            {currentPage < maxPage ? (
              <button
                className="px-3 py-2 border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded"
                onClick={() => goNext()}
              >
                Next {MAX_POKEMON_DISPLAY}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
