// ==UserScript==
// @name         Pokelife QoL
// @namespace    Pokelife
// @version      1.3.1
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

// Utility Functions
const removeElements = (removable) => {
	if (!removable) return
	const elements = 'length' in removable ? Array.from(removable) : [removable]
	elements.forEach((element) => element.remove())
}

const createIcon = (text, className) => {
	const icon = document.createElement('b')
	icon.textContent = text
	icon.classList.add(className)
	return icon
}

const addQoLClass = (element, className) => {
	element.classList.add(`${global.className}-${className}`)
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
        [sort-direction='asc'] .${global.className}-btn-sort .asc-ico {
            display: inline;
        }
        [sort-direction='desc'] .${global.className}-btn-sort .desc-ico {
            display: inline;
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

const generateSortButton = () => {
	const button = document.createElement('button')
	button.innerText = 'Sortuj według wartości'
	button.append(createIcon(' ↑', 'asc-ico'), createIcon(' ↓', 'desc-ico'))
	button.classList.add('btn', 'btn-success', 'col-xs-12')
	addQoLClass(button, 'btn-sort')
	button.addEventListener('click', (event) => {
		event.preventDefault()
		sortPokemonByValue()
	})

	return button
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

// UI Enhancement Functions
const displayXPInformation = () => {
	if (!isPokemonSelectionScreen()) return
	const mainElement = document.querySelector('#glowne_okno')
	const availablePokemon = [...fetchBattleReadyPokemon()]
	setPokemonElementClass(mainElement)
	improveSelectionUI(availablePokemon)
}

const setPokemonElementClass = (mainElement) => {
	const pokemonButtonContainer = mainElement
		.querySelector('.panel-body .btn-wybor_pokemona')
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
	const pokemonMarket = document.querySelector(
		'#glowne_okno form[action*="sprzedaj&zaznaczone"] .panel-body div[data-toggle="buttons"]'
	)
	if (!pokemonMarket) return
	const pokemonTotalPriceElement = pokemonMarket.querySelector('div.text-center')
	if (!pokemonTotalPriceElement) return
	pokemonMarket.prepend(pokemonTotalPriceElement)
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
