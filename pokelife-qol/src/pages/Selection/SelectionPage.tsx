import { isPokemonSelectionScreen } from "../../utils/screenChecks";
import selectionEnhancments from "./selectionEnhancments";

const SelectionPage = () => {
    if (!isPokemonSelectionScreen()) return
    selectionEnhancments();
}

export default SelectionPage;