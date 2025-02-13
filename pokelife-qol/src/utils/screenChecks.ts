import { SELECTORS } from "../constants"


const isPokemonSelectionScreen = (): boolean => {
    const titleNode = document.querySelector(SELECTORS.pokemonSelectionTitle) as HTMLElement;
    return titleNode?.innerText.toLowerCase().includes('wybierz pokemona') || false;
}

const isPokemonMarketScreen = () => {
    const titleNode = document.querySelector(SELECTORS.pokemonMarketTitle) as HTMLElement
    return titleNode?.innerText.toLowerCase().includes('hodowla') || false
}

export { isPokemonSelectionScreen, isPokemonMarketScreen }