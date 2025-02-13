import { IconProps } from "../../types"


const Icon: React.FC<IconProps> = ({text, classes}) => {
  return (
    <b className={classes}>{text}</b>
  )
}

export default Icon