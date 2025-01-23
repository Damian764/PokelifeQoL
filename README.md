# Pokelife QoL UserScript

## Overview

The Pokelife QoL (Quality of Life) UserScript is designed to enhance the user experience on the Pokelife game website. It provides various improvements to the game's interface, making it more user-friendly and efficient.

## Features

- **Enhanced Pokémon Selection Screen**: Displays additional information about Pokémon, such as experience points, directly on the selection screen.
- **Market Screen Enhancements**: Adds total price display and sorting functionality to the Pokémon market screen.
- **Custom Styles**: Applies custom styles to improve the visual presentation of the game interface.

## Installation

To use this UserScript, you need a browser extension that supports UserScripts, such as Tampermonkey or Greasemonkey. Once you have the extension installed, follow these steps:

1. Open [RAW file](https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol.user.js) in your browser
2. Install the script using your browser extension

Alternatively, you can

1. Open the UserScript manager in your browser.
2. Create a new script and paste the contents of the `pokelife-qol.user.js` file into the editor.
3. Save the script and ensure it is enabled.

## Usage

Once installed, the script will automatically run on the Pokelife game website. It will enhance the interface by adding new features and improving existing ones. The script includes the following enhancements:

- **Pokémon Selection Screen**: Automatically displays experience points and other details for each Pokémon.
- **Market Screen**: Adds a button to sort Pokémon by price and displays the total selling price.

## Development

### Code Structure

- **Utility Functions**: Helper functions for common tasks, such as removing elements and clearing classes.
- **Screen Check Functions**: Functions to determine the current screen context (e.g., Pokémon selection or market screen).
- **DOM Manipulation Functions**: Functions to create and apply custom styles and elements.
- **Data Fetching Functions**: Functions to retrieve Pokémon details and costs.
- **UI Enhancement Functions**: Functions to enhance the user interface with additional information and controls.

### Key Functions

- `removeElements`: Removes specified elements from the DOM.
- `isPokemonSelectionScreen`: Checks if the current screen is the Pokémon selection screen.
- `generateStyleSheet`: Creates and returns a stylesheet for custom styles.
- `fetchPokemonDetails`: Retrieves details for a specific Pokémon.
- `sortPokemonByValue`: Sorts Pokémon by their market value using a Document Fragment for efficient DOM updates.

## Contributing

Contributions to this project are welcome. If you have suggestions for improvements or new features, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact Damian Gęsicki at [damiang764@gmail.com](mailto:damiang764@gmail.com?subject=PokelifeQoL).