import { useEffect } from 'react';
import { initialize } from './services/api/initialize';

const DomManipulator = () => {
    useEffect(() => {
        const mainElement = document.querySelector('#glowne_okno')
        if (!mainElement) return
        initialize()
        const config = { childList: true, subtree: false, attributes: false }
        const observer = new MutationObserver(initialize)
        observer.observe(mainElement, config)
    }, []);

    return null; // This component doesn't render anything
};

export default DomManipulator;