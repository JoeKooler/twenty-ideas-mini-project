import PokeCard from '../components/PokeCard';
import useGetShowingPokemons from '../hooks/query/useGetShowingPokemons';
import { firstLetterToUpperCase } from '../utils/string';

type PokeCardsProps = {
  ids: string[];
};

// const MAX_POKEMON_DISPLAY = 12;

const PokeCards = ({ ids }: PokeCardsProps) => {
  const { data, isLoading } = useGetShowingPokemons(ids);

  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <></>;

  return (
    <>
      <div className="flex h-full flex-wrap flex-grow gap-4">
        {data?.map((datum) => (
          <PokeCard
            id={datum.id.toString()}
            name={firstLetterToUpperCase(datum.name)}
            spriteUri={datum.sprites.front_default}
            key={datum.id}
          ></PokeCard>
        ))}
      </div>
    </>
  );
};

export default PokeCards;
