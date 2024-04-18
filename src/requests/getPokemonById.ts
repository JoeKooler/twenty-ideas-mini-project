import pokeAPI from '../services/pokeAPI';

export const getPokemonById = async (id: string) => {
  const result = await pokeAPI.get(`/pokemon/${id}`);
  return result.data;
};
