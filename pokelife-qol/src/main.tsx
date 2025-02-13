import ReactDOM from 'react-dom/client';
import DomManipulator from './DomManipulator';
import './index.css';

ReactDOM.createRoot(
    (() => {
        const app = document.createElement('div');
        document.body.append(app);
        return app;
    })(),
).render(
    <DomManipulator />
);
