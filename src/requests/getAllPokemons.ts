import pokeAPI from '../services/pokeAPI';

export const getAllPokemons = async () => {
  const result = await pokeAPI.get('/pokemon?limit=100000&offset=0');
  return result.data;
};
