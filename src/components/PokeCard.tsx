export type PokeCardProps = {
  id: string;
  name: string;
  spriteUri?: string;
};

const PokeCard = ({ id, name, spriteUri }: PokeCardProps) => {
  return (
    <div className="rounded-xl p-4 flex bg-white items-center space-x-3 border-[1px] border-[rgba(227,225,229,1)] basis-[19.5rem]">
      <div className="rounded-full bg-[rgba(0,0,0,0.07)] w-[4.5rem] h-[4.5rem]">
        <img src={spriteUri}></img>
      </div>
      <h1>{name}</h1>
    </div>
  );
};

export default PokeCard;
