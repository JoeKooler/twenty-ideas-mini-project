import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard';
import { useGetAllPokemon } from '../hooks/query/useGetAllPokemon';
import PokeCards from '../components/PokeCards';

type PokemonInfo = {
  id: string;
  name: string;
  spriteUri: string;
};

type SortOptionState = 'SORT_NAME' | 'SORT_ID';

const MAX_POKEMON_DISPLAY = 12;

const HomePage = () => {
  const { data: allPokemons, isLoading: allPokemonsLoading } =
    useGetAllPokemon();

  const [sortOption, setSortOption] = useState<SortOptionState>('SORT_NAME');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value as SortOptionState);
  };

  return (
    <>
      <div className="flex flex-col p-12 space-y-4 bg-[rgba(246,246,247,1)] w-screen min-h-screen">
        <div className="flex justify-between">
          <h1>All the Pokemon!</h1>
          <div className="flex">
            <label className="flex px-4 py-[0.625rem]">
              <input
                type="radio"
                value="SORT_NAME"
                checked={sortOption === 'SORT_NAME'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort Name
            </label>

            <label className="flex px-4 py-[0.625rem]">
              <input
                type="radio"
                value="SORT_ID"
                checked={sortOption === 'SORT_ID'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort ID
            </label>
          </div>
        </div>
        <PokeCards
          ids={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
        />

        <div className="w-full flex flex-grow items-end">
          <div className="flex w-full justify-between">
            <button className="px-3 py-2 border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded">
              Previous 12
            </button>
            <button className="px-3 py-2 border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded">
              Next 12
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
