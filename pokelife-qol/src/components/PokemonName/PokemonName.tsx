import { CLASSNAMES } from "../../constants"
import { PokemonNameProps } from "../../types/pokemonTypes"



const PokemonName = ({ pokemonName }: PokemonNameProps) => {
  return (
      <p className={`${CLASSNAMES.default}-pokemon-details`}>{pokemonName}</p>
  )
}

export default PokemonName
