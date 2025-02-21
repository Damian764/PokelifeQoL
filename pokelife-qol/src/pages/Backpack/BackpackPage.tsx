import { isPokemonBackpackScreen } from "../../utils/screenChecks"
import { addMaxValueToInputFields } from "./backpackEnhancments"

const BackpackPage = () => {
    if (!isPokemonBackpackScreen()) return
    addMaxValueToInputFields()
    return null
}

export default BackpackPage