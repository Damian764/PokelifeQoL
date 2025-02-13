import { CLASSNAMES } from "../../constants"
import sortPokemonBy from "../../utils/sortPokemon"
import { SortButtonProps } from "../../types"
import Icon from "../Icon/Icon"

const handleClick = (sortBy: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.querySelector(`.${CLASSNAMES.default}-btn-sort.active`)?.classList.remove('active')
    event.currentTarget.classList.add('active')
    sortPokemonBy(sortBy)
}

const SortButton: React.FC<SortButtonProps> = ({label, sortBy}) => {
    return (
        <button className={`btn btn-success col-xs-12 col-sm-6 ${CLASSNAMES.default}-btn-sort`} onClick={handleClick(sortBy)}>{label} <Icon text="↑" classes="asc-ico" /><Icon text="↓" classes="desc-ico" /></button>
    )
}

export default SortButton