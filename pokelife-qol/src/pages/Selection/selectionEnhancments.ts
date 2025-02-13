import React from "react"
import { createRoot } from "react-dom/client"
import { SELECTORS } from "../../constants"
import { fetchBattleReadyPokemon, fetchPokemonDetails } from "../../services/api/fetch"
import { addQoLClass, setPokemonElementClass } from "../../utils/domUtils"
import { PokemonName } from "../../components/PokemonName"

const improveSelectionUI = (availablePokemon: [HTMLElement]) => {
    availablePokemon.forEach((pokemonElement, index) => {
        addQoLClass(pokemonElement, 'pokemon-btn')
        const { pokemonName, pokemonHP, pokemonEXP } = fetchPokemonDetails(index)
        const pokemonButton = pokemonElement.querySelector('button')
        if (!pokemonButton) throw new Error('Pokemon button not found')

        const pokemonNameContaioner = document.createElement('div');
        const root = createRoot(pokemonNameContaioner);
        root.render(React.createElement(PokemonName, {pokemonName: pokemonName || ''} , 'help'));
        pokemonButton.prepend(pokemonNameContaioner)
        pokemonButton.append(pokemonHP as HTMLElement, pokemonEXP as HTMLElement)
    })
}
const selectionEnhancments = () => {
    const mainElement = document.querySelector(SELECTORS.mainElement)
    const availablePokemon = [...fetchBattleReadyPokemon()]
    setPokemonElementClass(mainElement as HTMLElement)
    improveSelectionUI(availablePokemon as [HTMLElement])
}

export default selectionEnhancments