import { useGetAllPokemon } from '../../hooks/queries/useGetAllPokemon';
import PokeCards from '../../components/PokeCard/PokeCards';
import useHome from './useHome';

const MAX_POKEMON_DISPLAY = 12;

const HomePage = () => {
  const { data } = useGetAllPokemon();
  const {
    sortOption,
    ids,
    currentPage,
    maxPage,
    handleOptionChange,
    goBack,
    goNext,
  } = useHome(data);

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="flex flex-col p-12 space-y-4 bg-[rgba(246,246,247,1)] w-screen min-h-screen">
        <div className="flex justify-between">
          <h1 className="font-encode text-[2rem] font-medium">
            All the Pokemon!
          </h1>
          <div className="flex">
            <label className="flex px-4 py-[0.625rem] font-roboto text-[1.25rem]">
              <input
                type="radio"
                value="name"
                checked={sortOption === 'name'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort Name
            </label>

            <label className="flex px-4 py-[0.625rem] font-roboto text-[1.25rem]">
              <input
                type="radio"
                value="id"
                checked={sortOption === 'id'}
                onChange={(e) => handleOptionChange(e)}
              />
              <div className="pl-4" />
              Sort ID
            </label>
          </div>
        </div>
        <div>
          <PokeCards ids={ids} />
        </div>

        <div className="w-full flex flex-grow items-end">
          <div className="flex w-full justify-between">
            {currentPage > 0 ? (
              <button
                className="px-3 py-2 font-roboto text-[1rem] border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded"
                onClick={() => goBack()}
              >
                Previous {MAX_POKEMON_DISPLAY}
              </button>
            ) : (
              <div></div>
            )}

            {currentPage < maxPage ? (
              <button
                className="px-3 py-2 font-roboto text-[1rem] border-[1px] border-[rgba(2,78,116,1)] text-[rgba(2,78,116,1)] rounded"
                onClick={() => goNext()}
              >
                Next {MAX_POKEMON_DISPLAY}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
