import React from "react";
import { createRoot } from "react-dom/client";
import { SELECTORS } from "../../constants"
import { SortButton } from "../../components/SortButton";

const displayTotalPrice = (): void => {
    const pokemonMarket = document.querySelector(SELECTORS.pokemonMarket);
    const pokemonTotalPriceElement = pokemonMarket?.querySelector(SELECTORS.totalPriceElement);
    if (pokemonMarket && pokemonTotalPriceElement) {
        pokemonMarket.prepend(pokemonTotalPriceElement);
    }
};
const addIndexToPokemon = () => {
    const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer)
    if (wrapper) {
        const pokemonElements = Array.from(wrapper.querySelectorAll('label'))
        pokemonElements.forEach((elem, index) => {
            if (!elem.hasAttribute('data-original-index')) {
                elem.setAttribute('data-original-index', index.toString())
            }
        })
    }
}

const insertSortButtons = () => {
    const wrapper = document.querySelector(SELECTORS.sortButtonWrapper)
    if (!wrapper) return

    const config = [
        { label: 'Sortuj po dacie', sortBy: 'date' },
        { label: 'Sortuj po wartości', sortBy: 'value' },
        { label: 'Sortuj po nazwie', sortBy: 'name' },
        { label: 'Sortuj po poziomie', sortBy: 'level' },
    ]

    config.forEach(({ label, sortBy }) => {
        const buttonContainer = document.createElement('div');
        const root = createRoot(buttonContainer);
        root.render(React.createElement(SortButton, { label, sortBy }));
        wrapper.appendChild(buttonContainer);
    })
}

export { displayTotalPrice, addIndexToPokemon, insertSortButtons }