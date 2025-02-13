import { CLASSNAMES, SELECTORS } from "../constants"

export const removeElements = (removable: Iterable<HTMLElement> | ArrayLike<HTMLElement>) => {
    if (!removable) return
    const elements = 'length' in removable ? Array.from(removable) : [removable]
    elements.forEach((element) => (element as HTMLElement).remove())
}

export const addQoLClass = (element: HTMLElement, className: string) => {
    element.classList.add(`${CLASSNAMES.default}-${className}`)
}

export const setPokemonElementClass = (mainElement: HTMLElement) => {
    const pokemonButtonContainer = mainElement
        .querySelector(SELECTORS.pokemonButtonContainer)
    if (!pokemonButtonContainer) throw new Error('Pokemon button container not found')
    const closestDiv = pokemonButtonContainer.closest("div[style='row']")

    if (!closestDiv) throw new Error('Closest div not found')
    addQoLClass(closestDiv as HTMLElement, 'enhanced-display')
}