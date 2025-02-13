import { SELECTORS } from "../constants"
import { fetchPokemonCost, fetchPokemonLevel, fetchPokemonName } from "../services/api/fetch";
import { removeElements } from "./domUtils";

const sortPokemonBy = (sortBy: string) => {
    const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer)
    if (!wrapper) {
        console.error('Pokemon market container not found');
        return;
    }
    const pokemonContainer = wrapper.querySelector('div[data-toggle="buttons"]')
    const pokemonElements = Array.from(wrapper.querySelectorAll('label'))

    // Get current settings
    const currentSortBy = wrapper.getAttribute('sort-by')
    const sortDirection =
        currentSortBy === sortBy ? (wrapper.getAttribute('sort-direction') === 'desc' ? 'asc' : 'desc') : 'desc'

    // Sort Pokémon elements based on sortBy parameter
    switch (sortBy) {
        case 'value':
            pokemonElements.sort((a, b) => {
                const costA = fetchPokemonCost(a)
                const costB = fetchPokemonCost(b)
                const diff = costA - costB
                if (diff === 0) {
                    // If values are equal, sort by the original index (assuming it is stored as a data attribute)
                    return (
                        parseInt(a.getAttribute('data-original-index') || '0') -
                        parseInt(b.getAttribute('data-original-index') || '0')
                    )
                }
                return sortDirection === 'asc' ? diff : -diff
            })
            break
        case 'name':
            pokemonElements.sort((a, b) => {
                const nameA = fetchPokemonName(a)
                const nameB = fetchPokemonName(b)
                const diff = nameA.localeCompare(nameB)
                if (diff === 0) {
                    // If names are equal, sort by the original index (assuming it is stored as a data attribute)
                    return (
                        parseInt(a.getAttribute('data-original-index') || '0') -
                        parseInt(b.getAttribute('data-original-index') || '0')
                    )
                }
                return sortDirection === 'asc' ? diff : -diff
            })
            break
        case 'level':
            pokemonElements.sort((a, b) => {
                const levelA = fetchPokemonLevel(a)
                const levelB = fetchPokemonLevel(b)
                const diff = levelA - levelB
                if (diff === 0) {
                    // If levels are equal, sort by the original index (assuming it is stored as a data attribute)
                    return (
                        parseInt(a.getAttribute('data-original-index') || '0') -
                        parseInt(b.getAttribute('data-original-index') || '0')
                    )
                }
                return sortDirection === 'asc' ? diff : -diff
            })
            break
        case 'date':
        default:
            pokemonElements.sort((a, b) => {
                return sortDirection === 'asc'
                    ? (parseInt(a.getAttribute('data-original-index') || '0') - parseInt(b.getAttribute('data-original-index') || '0'))
                    : (parseInt(b.getAttribute('data-original-index') || '0') - parseInt(a.getAttribute('data-original-index') || '0'))
            })
            break
    }

    // Update attributes to reflect the new sort settings
    wrapper.setAttribute('sort-direction', sortDirection)
    wrapper.setAttribute('sort-by', sortBy)

    const fragment = document.createDocumentFragment()
    pokemonElements.forEach((pokemon) => fragment.appendChild(pokemon.cloneNode(true)))

    removeElements(pokemonElements)
    if (pokemonContainer) {
        pokemonContainer.appendChild(fragment)
    } else {
        console.error('Pokemon container not found');
    }
}

export default sortPokemonBy