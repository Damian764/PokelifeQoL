// ==UserScript==
// @name         Pokelife QoL
// @namespace    Pokelife
// @version      1.2.1
// @license      MIT
// @homepageURL  https://github.com/Damian764/PokelifeQoL
// @updateURL    https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol.user.js
// @downloadURL  https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol.user.js
// @supportURL   https://github.com/Damian764/PokelifeQoL/issues
// @description  Custom quality of life improvements for Pokelife game.
// @author       Damian Gęsicki
// @tag          QoL
// @tags         QoL
// @match        https://*.pokelife.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokelife.pl
// @grant        none
// ==/UserScript==

const global = {
	className: 'QoL-modified',
}

// Utility Functions
const removeElements = (removable) => {
	if (!removable) return
	if ('length' in removable) {
		Array.from(removable).forEach((element) => element.remove())
	} else {
		removable.remove()
	}
}

const clearModifiedClass = () => {
	document.querySelector(`.${global.className}`)?.classList.remove(global.className)
}

const createIcon = (text, className) => {
	const icon = document.createElement('b')
	icon.textContent = text
	icon.classList.add(className)
	return icon
}

// Screen Check Functions
const isPokemonSelectionScreen = () => {
	const titleNode = document.querySelector('#glowne_okno center')
	return titleNode?.innerText.toLowerCase().includes('wybierz pokemona') ?? false
}

const isPokemonMarketScreen = () => {
	const titleNode = document.querySelector('#glowne_okno .panel-heading')
	return titleNode?.innerText.toLowerCase().includes('hodowla') ?? false
}

// DOM Manipulation Functions
const generateStyleSheet = () => {
	const style = document.createElement('style')
	style.innerHTML = `
        .QoL-better-pokemon-details {
            font-size: 1.2rem;
            font-weight: bold;
            text-wrap: balance;
        }
        .QoL-better-pokemon-btn > button {
            height: 100%;
            display: grid;
            grid-template-rows: auto auto 20px 20px;
        }
        .QoL-better-display {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
        :not(.shopItem) > [aria-label*='balle'] div {
            width: 100%;
            border-bottom: 1px solid #595959;
            background: #404040;
            border-radius: 4px 4px 0 0;
        }
        .btn-sort {
            margin-top: 10px;
        }
        .btn-sort > b {
            display: none
        }
        [sort-direction='asc'] .btn-sort .asc-ico {
            display: inline;
        }
        [sort-direction='desc'] .btn-sort .desc-ico {
            display: inline;
        }
    `
	return style
}

const generateNameElement = (name) => {
	const nameElement = document.createElement('p')
	nameElement.classList.add('QoL-better-pokemon-details')
	nameElement.innerText = name
	return nameElement
}

const generateSortButton = () => {
	const button = document.createElement('button')
	button.innerText = 'Sortuj według wartości'
	button.append(createIcon(' ↑', 'asc-ico'), createIcon(' ↓', 'desc-ico'))
	button.classList.add('btn', 'btn-success', 'col-xs-12', 'btn-sort')
	button.addEventListener('click', (event) => {
		event.preventDefault()
		sortPokemonByValue()
	})

	return button
}

// Data Fetching Functions
const fetchPokemonDetails = (id) => {
	const sidebar = document.querySelector('.stan-pokemon').closest('tbody')
	const pokemonElement = sidebar.querySelector(`tr:nth-child(${id + 1}) > td:nth-child(2)`)
	const pokemonName = pokemonElement.querySelector('b').innerText
	const [pokemonHP, pokemonEXP] = [...pokemonElement.querySelectorAll('.progress')]
	return { pokemonName, pokemonHP, pokemonEXP }
}

const fetchBattleReadyPokemon = () => {
	return document
		.querySelector('#glowne_okno .panel-body .btn-wybor_pokemona')
		.closest("div[style='row']")
		.querySelectorAll(':scope > div')
}

const fetchPokemonCost = (element) => {
	return parseInt(element.textContent.split(' ')[1].split('\t').pop())
}

// UI Enhancement Functions
const displayXPInformation = () => {
	if (!isPokemonSelectionScreen()) return
	const mainElement = document.querySelector('#glowne_okno')
	const availablePokemon = [...fetchBattleReadyPokemon()]
	setPokemonElementClass(mainElement)
	improveSelectionUI(availablePokemon)
	mainElement.classList.add(global.className)
}

const setPokemonElementClass = (mainElement) => {
	const pokemonButtonContainer = mainElement
		.querySelector('.panel-body .btn-wybor_pokemona')
		.closest("div[style='row']")
	pokemonButtonContainer.classList.add('QoL-better-display')
}

const improveSelectionUI = (availablePokemon) => {
	availablePokemon.forEach((pokemonElement, index) => {
		pokemonElement.classList.add('QoL-better-pokemon-btn')
		const { pokemonName, pokemonHP, pokemonEXP } = fetchPokemonDetails(index)
		const pokemonButton = pokemonElement.querySelector('button')
		pokemonButton.prepend(generateNameElement(pokemonName))
		pokemonButton.append(pokemonHP, pokemonEXP)
	})
}

const displayTotalPrice = () => {
	if (!isPokemonMarketScreen()) return
	const mainElement = document.querySelector('#glowne_okno')
	const pokemonMarket = document.querySelector(
		'#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body div[data-toggle="buttons"]'
	)
	if (!pokemonMarket) return
	const pokemonTotalPriceElement = pokemonMarket.querySelector('div.text-center')
	if (!pokemonTotalPriceElement) return
	pokemonMarket.prepend(pokemonTotalPriceElement)
	mainElement.classList.add(global.className)
}

const sortPokemonByValue = () => {
	const wrapper = document.querySelector('#glowne_okno form[action*="sprzedaj&zaznaczone"]')
	const pokemonContainer = wrapper.querySelector('div[data-toggle="buttons"]')
	const pokemonElements = Array.from(wrapper.querySelectorAll('label'))
	const sortDirection = wrapper.getAttribute('sort-direction') === 'desc' ? 'asc' : 'desc'

	// Sort Pokémon elements based on cost
	const sortedPokemons = pokemonElements.sort((a, b) => {
		return sortDirection === 'asc'
			? fetchPokemonCost(a) - fetchPokemonCost(b)
			: fetchPokemonCost(b) - fetchPokemonCost(a)
	})

	// Update sort direction attribute
	wrapper.setAttribute('sort-direction', sortDirection)

	// Create a Document Fragment to batch DOM updates
	const fragment = document.createDocumentFragment()

	// Append sorted elements to the fragment
	sortedPokemons.forEach((pokemon) => fragment.appendChild(pokemon.cloneNode(true)))

	// Clear existing elements and append the fragment
	removeElements(pokemonElements)
	pokemonContainer.appendChild(fragment)
}

const insertSortButton = () => {
	const wrapper = document.querySelector(
		'#glowne_okno form[action*="sprzedaj&zaznaczone"] button[href*="sprzedaj&wszystkie"]'
	)
	wrapper.after(generateSortButton())
}

// Enhancement Functions for Specific Screens

const marketScreenEnhancements = () => {
	if (!isPokemonMarketScreen()) return
	displayTotalPrice()
	insertSortButton()
}

const pokemonSelectionScreenEnhancements = () => {
	if (!isPokemonSelectionScreen()) return
	displayXPInformation()
}
// Initialization
const initializeScript = () => {
	const mainWindow = document.querySelector('#glowne_okno')
	if (mainWindow.classList.contains(global.className)) {
		return clearModifiedClass()
	}
	document.head.append(generateStyleSheet())
	pokemonSelectionScreenEnhancements()
	marketScreenEnhancements()
}

;(function () {
	'use strict'
	const mainElement = document.querySelector('#glowne_okno')
	if (!mainElement) return
	const config = { childList: true, subtree: false, attributes: false }
	const observer = new MutationObserver(initializeScript)
	observer.observe(mainElement, config)
})()
