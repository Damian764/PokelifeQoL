import { createRoot } from "react-dom/client"
import { SELECTORS } from "../../constants"
import React from "react"
import { ModalButton } from "../../components/ModalButton"

export const addMaxValueToInputFields = () => {
    const buttons = document.querySelectorAll(SELECTORS.pokemonBackpackButtons)
    if (!buttons) return console.error('No backpack buttons found')
    buttons.forEach((button) => {
        const target = button.getAttribute('data-target')
        if (!target) return
        const caption = button.querySelector('.caption')
        if (!caption) return
        const amount = caption.textContent?.match(/\d+/)?.[0]
        if (!amount || isNaN(Number(amount))) return
        const modal = document.querySelector(target)
        if (!modal) return
        const input = modal.querySelector('input.form-control')
        if (!input) return
        input.setAttribute('max', amount)
        const buttonContainer = document.createElement('span')
        const root = createRoot(buttonContainer)
        buttonContainer.classList.add('input-group-btn')
        root.render(React.createElement(ModalButton, { amount: Number(amount) }))
        input.after(buttonContainer)
    })
}