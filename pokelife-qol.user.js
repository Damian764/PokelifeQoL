// ==UserScript==
// @name         Pokelife QoL
// @namespace    Pokelife
// @version      1.4.0
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
	className: 'pokelife-QoL',
}

const SELECTORS = {
	mainElement: '#glowne_okno',
	pokemonSelectionTitle: '#glowne_okno center',
	pokemonMarketTitle: '#glowne_okno .panel-heading',
	pokemonButtonContainer: '.panel-body .btn-wybor_pokemona',
	pokemonMarketContainer: '#glowne_okno form[action*="sprzedaj&zaznaczone"]',
	pokemonMarket: '#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body div[data-toggle="buttons"]',
	totalPriceElement: 'div.text-center',
	sortButtonWrapper: '#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body .row',
}

// Utility Functions

/**
 * Removes elements from the DOM.
 * @param {NodeList|Element} removable - The elements to remove.
 */
const removeElements = (removable) => {
	if (!removable) return
	const elements = 'length' in removable ? Array.from(removable) : [removable]
	elements.forEach((element) => element.remove())
}

/**
 * Creates an icon element.
 * @param {string} text - The text content of the icon.
 * @param {string} className - The class name to add to the icon.
 * @returns {HTMLElement} The created icon element.
 */
const createIcon = (text, className) => {
	const icon = document.createElement('b')
	icon.textContent = text
	icon.classList.add(className)
	return icon
}

/**
 * Adds a QoL class to an element.
 * @param {HTMLElement} element - The element to add the class to.
 * @param {string} className - The class name to add.
 */
const addQoLClass = (element, className) => {
	element.classList.add(`${global.className}-${className}`)
}

// Screen Check Functions
const isPokemonSelectionScreen = () => {
	const titleNode = document.querySelector(SELECTORS.pokemonSelectionTitle)
	return titleNode?.innerText.toLowerCase().includes('wybierz pokemona') ?? false
}

const isPokemonMarketScreen = () => {
	const titleNode = document.querySelector(SELECTORS.pokemonMarketTitle)
	return titleNode?.innerText.toLowerCase().includes('hodowla') ?? false
}

// DOM Manipulation Functions
const generateStyleSheet = () => {
	const style = document.createElement('style')
	style.innerHTML = `
        .${global.className}-pokemon-details {
            font-size: 1.2rem;
            font-weight: bold;
            text-wrap: balance;
        }
        .${global.className}-pokemon-btn > button {
            height: 100%;
            display: grid;
            grid-template-rows: auto auto 20px 20px;
        }
        .${global.className}-enhanced-display {
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
        .${global.className}-btn-sort {
            margin-top: 5px;
        }
        .${global.className}-btn-sort > b {
            display: none
        }
        [sort-direction='asc'] .${global.className}-btn-sort.active .asc-ico {
            display: inline;
        }
        [sort-direction='desc'] .${global.className}-btn-sort.active .desc-ico {
            display: inline;
        }
            .row[data-toggle="buttons"] {
            display: flex;
            flex-wrap: wrap;
        }
        .btn-hodowla b {
            display: block;
            border-bottom: 1px solid;
        }
    `
	return style
}

const generateNameElement = (name) => {
	const nameElement = document.createElement('p')
	addQoLClass(nameElement, 'pokemon-details')
	nameElement.innerText = name
	return nameElement
}

const generateSortButton = (label, sortBy) => {
	const button = document.createElement('button')
	button.innerText = label
	button.append(createIcon(' ↑', 'asc-ico'), createIcon(' ↓', 'desc-ico'))
	button.classList.add('btn', 'btn-success', 'col-xs-6')
	addQoLClass(button, 'btn-sort')
	button.addEventListener('click', (event) => {
		event.preventDefault()
		document.querySelector(`.${global.className}-btn-sort.active`)?.classList.remove('active')
		console.log(document.querySelector(`.${global.className}-btn-sort.active`))
		event.target.classList.add('active')
		sortPokemonBy(sortBy)
	})
	return button
}

const addIndexToPokemon = () => {
	const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer)
	const pokemonElements = Array.from(wrapper.querySelectorAll('label'))
	pokemonElements.forEach((elem, index) => {
		if (!elem.hasAttribute('data-original-index')) {
			elem.setAttribute('data-original-index', index)
		}
	})
}

// Data Fetching Functions
const fetchPokemonDetails = (id) => {
	try {
		const sidebar = document.querySelector('.stan-pokemon').closest('tbody')
		const pokemonElement = sidebar.querySelector(`tr:nth-child(${id + 1}) > td:nth-child(2)`)
		const pokemonName = pokemonElement.querySelector('b').innerText
		const [pokemonHP, pokemonEXP] = [...pokemonElement.querySelectorAll('.progress')]
		return { pokemonName, pokemonHP, pokemonEXP }
	} catch (error) {
		console.error('Error fetching Pokémon details:', error)
		return {}
	}
}

const fetchBattleReadyPokemon = () => {
	try {
		return document
			.querySelector('#glowne_okno .panel-body .btn-wybor_pokemona')
			.closest("div[style='row']")
			.querySelectorAll(':scope > div')
	} catch (error) {
		console.error('Error fetching battle-ready Pokémon:', error)
		return []
	}
}

const fetchPokemonCost = (element) => {
	try {
		return parseInt(element.textContent.split(' ')[1].split('\t').pop())
	} catch (error) {
		console.error('Error fetching Pokémon cost:', error)
		return 0
	}
}
const fetchPokemonName = (element) => {
	try {
		return element.querySelector('b').innerText
	} catch (error) {
		console.error('Error fetching Pokémon name:', error)
		return ''
	}
}
const fetchPokemonLevel = (element) => {
	try {
		return parseInt(element.textContent.split(' ')[1].split('poz')[0])
	} catch (error) {
		console.error('Error fetching Pokémon level:', error)
		return 0
	}
}

// UI Enhancement Functions
const displayXPInformation = () => {
	if (!isPokemonSelectionScreen()) return
	const mainElement = document.querySelector(SELECTORS.mainElement)
	const availablePokemon = [...fetchBattleReadyPokemon()]
	setPokemonElementClass(mainElement)
	improveSelectionUI(availablePokemon)
}

const setPokemonElementClass = (mainElement) => {
	const pokemonButtonContainer = mainElement
		.querySelector(SELECTORS.pokemonButtonContainer)
		.closest("div[style='row']")
	addQoLClass(pokemonButtonContainer, 'enhanced-display')
}

const improveSelectionUI = (availablePokemon) => {
	availablePokemon.forEach((pokemonElement, index) => {
		addQoLClass(pokemonElement, 'pokemon-btn')
		const { pokemonName, pokemonHP, pokemonEXP } = fetchPokemonDetails(index)
		const pokemonButton = pokemonElement.querySelector('button')
		pokemonButton.prepend(generateNameElement(pokemonName))
		pokemonButton.append(pokemonHP, pokemonEXP)
	})
}

const displayTotalPrice = () => {
	if (!isPokemonMarketScreen()) return
	const pokemonMarket = document.querySelector(SELECTORS.pokemonMarket)
	if (!pokemonMarket) return
	const pokemonTotalPriceElement = pokemonMarket.querySelector(SELECTORS.totalPriceElement)
	if (!pokemonTotalPriceElement) return
	pokemonMarket.prepend(pokemonTotalPriceElement)
}
const sortPokemonBy = (sortBy) => {
	const wrapper = document.querySelector(SELECTORS.pokemonMarketContainer)
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
						parseInt(a.getAttribute('data-original-index')) -
						parseInt(b.getAttribute('data-original-index'))
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
						parseInt(a.getAttribute('data-original-index')) -
						parseInt(b.getAttribute('data-original-index'))
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
						parseInt(a.getAttribute('data-original-index')) -
						parseInt(b.getAttribute('data-original-index'))
					)
				}
				return sortDirection === 'asc' ? diff : -diff
			})
			break
		case 'date':
		default:
			pokemonElements.sort((a, b) => {
				return sortDirection === 'asc'
					? a.getAttribute('data-original-index') - b.getAttribute('data-original-index')
					: b.getAttribute('data-original-index') - a.getAttribute('data-original-index')
			})
			break
	}

	// Update attributes to reflect the new sort settings
	wrapper.setAttribute('sort-direction', sortDirection)
	wrapper.setAttribute('sort-by', sortBy)

	const fragment = document.createDocumentFragment()
	pokemonElements.forEach((pokemon) => fragment.appendChild(pokemon.cloneNode(true)))

	removeElements(pokemonElements)
	pokemonContainer.appendChild(fragment)
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
		const button = generateSortButton(label, sortBy)
		wrapper.appendChild(button)
	})
}

// Enhancement Functions for Specific Screens

const marketScreenEnhancements = () => {
	if (!isPokemonMarketScreen()) return
	displayTotalPrice()
	addIndexToPokemon()
	insertSortButtons()
}

const pokemonSelectionScreenEnhancements = () => {
	if (!isPokemonSelectionScreen()) return
	displayXPInformation()
}
// Initialization
const initializeScript = () => {
	pokemonSelectionScreenEnhancements()
	marketScreenEnhancements()
}

;(function () {
	'use strict'
	const mainElement = document.querySelector('#glowne_okno')
	if (!mainElement) return
	document.head.append(generateStyleSheet())
	addQoLClass(document.body, 'initialized')
	const config = { childList: true, subtree: false, attributes: false }
	const observer = new MutationObserver(initializeScript)
	observer.observe(mainElement, config)
})()
