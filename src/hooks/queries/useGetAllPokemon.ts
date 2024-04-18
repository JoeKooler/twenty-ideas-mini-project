import { useQuery } from '@tanstack/react-query';
import { getAllPokemons } from '../../requests/getAllPokemons';
import { daysToMs } from '../../utils/time';
import { PokemonAPIResponse } from '../../types/PokemonAPIResponse';

/**
 * Get All the pokemons from the pokeapi
 * Cache invalidation every 24 hours
 */
export const useGetAllPokemon = () => {
  return useQuery<PokemonAPIResponse>({
    queryKey: ['getAllPokemon'],
    queryFn: () => getAllPokemons(),
    staleTime: daysToMs(1),
  });
};
