import useGetShowingPokemons from '../../hooks/queries/useGetShowingPokemons';
import { firstLetterToUpperCase } from '../../utils/string';
import PokeCard from './PokeCard';

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
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
