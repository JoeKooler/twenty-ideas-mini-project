import useGetShowingPokemons from '../../hooks/queries/useGetShowingPokemons';
import { firstLetterToUpperCase } from '../../utils/string';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PokeCard from './PokeCard';

type PokeCardsProps = {
  ids: string[];
};

/**
 * A PokeCard List with grid layout
 */
const PokeCards = ({ ids }: PokeCardsProps) => {
  const { data, isLoading } = useGetShowingPokemons(ids);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
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
