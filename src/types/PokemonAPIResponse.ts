type result = {
  name: string;
  url: string;
};

export type PokemonAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<result>;
};
