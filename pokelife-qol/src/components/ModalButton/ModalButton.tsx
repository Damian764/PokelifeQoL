import { ModalButtonProps } from "../../types"

const handleClick = (amount: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const parent = (event.currentTarget as HTMLElement).parentElement
    if (!parent) return
    const previousSibling = parent.previousSibling as HTMLInputElement
    if (!previousSibling || previousSibling.tagName !== 'INPUT') return console.error('No sibling found')
    const form = parent.closest('form')
    if (!form) return
    const submit = form.querySelector('button[type="submit"]') as HTMLButtonElement
    if (!submit) return
    previousSibling.value = String(amount)
    submit.click()
}


const ModalButton = ({ amount }: ModalButtonProps) => {
    return (
        <button className="btn btn-warning" onClick={handleClick(amount)}>
            Użyj wszystkich ({amount})
        </button>
    )
}

export default ModalButton