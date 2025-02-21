import { SELECTORS } from "../constants"


export const isPokemonSelectionScreen = (): boolean => {
    const titleNode = document.querySelector(SELECTORS.pokemonSelectionTitle) as HTMLElement;
    return titleNode?.innerText.toLowerCase().includes('wybierz pokemona') || false;
}

export const isPokemonMarketScreen = () => {
    const titleNode = document.querySelector(SELECTORS.pokemonMarketTitle) as HTMLElement
    return titleNode?.innerText.toLowerCase().includes('hodowla') || false
}

export const isPokemonBackpackScreen = () => {
    const titleNode = document.querySelector(SELECTORS.pokemonBackpackTitle) as HTMLElement
    return titleNode?.innerText.toLowerCase().includes('plecak') || false
}