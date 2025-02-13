import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
                name: 'Pokelife QoL',
                namespace: 'npm/vite-plugin-monkey',
                version: '2.0.0',
                homepageURL: 'https://github.com/Damian764/PokelifeQoL',
                updateURL: 'https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol/dist/pokelife-qol.user.js',
                downloadURL: 'https://github.com/Damian764/PokelifeQoL/raw/refs/heads/main/pokelife-qol/dist/pokelife-qol.user.js',
                supportURL: 'https://github.com/Damian764/PokelifeQoL/issues',
                description: 'Custom quality of life improvements for Pokelife game.',
                author: "Damian Gesicki",
                tag: 'QoL',
                match: ['https://gra.pokelife.pl/*'],
                icon: 'https://www.google.com/s2/favicons?sz=64&domain=pokelife.pl',
            },
            build: {
                externalGlobals: {
                    react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
                    'react-dom': cdn.jsdelivr(
                        'ReactDOM',
                        'umd/react-dom.production.min.js',
                    ),
                },
            },
        }),
    ],
});
