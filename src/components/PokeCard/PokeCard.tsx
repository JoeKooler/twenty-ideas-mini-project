export type PokeCardProps = {
  id: string;
  name: string;
  spriteUri?: string;
};

/**
 * A PokeCard for displaying a Pokemon with an Avatar Image on the left side
 * , and A name on the right side
 */
const PokeCard = ({ name, spriteUri }: PokeCardProps) => {
  return (
    <div className="rounded-xl p-4 flex bg-white items-center space-x-3 border-[1px] border-[rgba(227,225,229,1)]">
      <div className="flex flex-shrink-0 justify-center items-center rounded-full bg-[rgba(0,0,0,0.07)] w-[4.5rem] h-[4.5rem]">
        {spriteUri ? (
          <img src={spriteUri} alt="pokemonAvatar" />
        ) : (
          <h1 className="font-bold">{name[0]}</h1>
        )}
      </div>
      <h1 className="font-encode font-medium text-[1.25rem]">{name}</h1>
    </div>
  );
};

export default PokeCard;
