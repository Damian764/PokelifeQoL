import { addIndexToPokemon, displayTotalPrice, insertSortButtons } from "./marketEnhancments"
import { isPokemonMarketScreen } from "../../utils/screenChecks"

const MarketPage = () => {
    if (!isPokemonMarketScreen()) return
    addIndexToPokemon()
    displayTotalPrice()
    insertSortButtons()
}

export default MarketPage