import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../requests/getPokemonById';
import { PokemonInfoAPIResponse } from '../../types/PokemonInfoAPIResponse';

const useGetShowingPokemons = (ids: string[]) => {
  const queryFn = async () => {
    const promises = ids.map((id) => getPokemonById(id));
    const pokemonData = await Promise.all(promises);
    return pokemonData;
  };

  return useQuery<PokemonInfoAPIResponse[]>({
    queryKey: ['pokemons', ids],
    queryFn,
    enabled: !!ids.length,
  });
};

export default useGetShowingPokemons;
