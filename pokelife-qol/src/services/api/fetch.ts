export const fetchPokemonDetails = (id: number) => {
    try {
        const sidebarElement = document.querySelector('.stan-pokemon');
        if (!sidebarElement) {
            throw new Error('Sidebar element not found');
        }
        const sidebar = sidebarElement.closest('tbody');
        if (!sidebar) {
            throw new Error('Sidebar closest tbody not found');
        }
        const pokemonElement = sidebar.querySelector(`tr:nth-child(${id + 1}) > td:nth-child(2)`)
        if (!pokemonElement) {
            throw new Error('Pokemon element not found');
        }
        const pokemonNameElement = pokemonElement.querySelector('b');
        if (!pokemonNameElement) {
            throw new Error('Pokemon name element not found');
        }
        const pokemonName = pokemonNameElement.innerText;
        const [pokemonHP, pokemonEXP] = [...pokemonElement.querySelectorAll('.progress')]
        return { pokemonName, pokemonHP, pokemonEXP }
    } catch (error) {
        console.error('Error fetching Pokémon details:', error)
        return {}
    }
}

export const fetchBattleReadyPokemon = () => {
    try {
        const btnElement = document.querySelector('#glowne_okno .panel-body .btn-wybor_pokemona');
        if (!btnElement) {
            throw new Error('Button element not found');
        }
        const closestDiv = btnElement.closest("div[style='row']");
        if (!closestDiv) {
            throw new Error('Closest div not found');
        }
        return closestDiv.querySelectorAll(':scope > div');
    } catch (error) {
        console.error('Error fetching battle-ready Pokémon:', error)
        return []
    }
}

export const fetchPokemonCost = (element: HTMLLabelElement): number | Error => {
    try {
        const textContent = element.textContent;
        if (!textContent) throw new Error('Element text content is null');
        const costString = textContent.split(' ')[1].split('\t').pop();
        return parseInt(costString || '0');
    } catch (error) {
        throw new Error(`Error fetching Pokémon cost: ${error}`)
    }
}

export const fetchPokemonName = (element: HTMLLabelElement): string | Error => {
    try {
        const nameElement = element.querySelector('b');
        if (!nameElement) throw new Error('Name element not found')
        return nameElement.textContent || '';
    } catch (error) {
        throw new Error(`Error fetching Pokémon name: ${error}`)
    }
}
export const fetchPokemonLevel = (element: HTMLLabelElement): number | Error => {
    try {
        const textContent = element.textContent;
        if (!textContent) throw new Error('Element text content is null')
        return parseInt(textContent.split(' ')[1].split('poz')[0])
    } catch (error) {
        throw new Error(`Error fetching Pokémon level: ${error}`)
    }
}
